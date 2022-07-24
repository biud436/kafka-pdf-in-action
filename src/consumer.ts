import Container, { Service } from "typedi";
import { KafkaConsumer } from "../libs/kafka.consumer";
import { KafkaProducer } from "../libs/kafka.producer";
import { MyLogger } from "./logger";
import { PdfService } from "./pdf";

@Service()
export class PdfConsumer {
    private _kafkaConsumer: KafkaConsumer = Container.get(KafkaConsumer);
    private _kafkaProducer: KafkaProducer = Container.get(KafkaProducer);
    private _pdfService: PdfService = Container.get(PdfService);
    private _logger: MyLogger = Container.get(MyLogger);

    async start() {
        // 메시지 구독
        await this._kafkaConsumer.connect();
        await this._kafkaConsumer.subscribe("my-topic");
        this._logger.log("1");
        await this._kafkaConsumer.run(async (message: string) => {
            await this._pdfService.toPDF(message, {
                format: "A4",
            });

            this._logger.log("PDF 생성 완료");

            setTimeout(async () => {
                await this._kafkaProducer.connect();
                await this._kafkaProducer.send({
                    topic: "my-topic-done",
                    messages: [
                        {
                            value: "PDF 생성 완료 [메시징]",
                        },
                    ],
                });
                await this._kafkaProducer.disconnect();
                await this._kafkaConsumer.disconnect();
            }, 0);
        });
    }
}

const app = Container.get(PdfConsumer);
app.start();
