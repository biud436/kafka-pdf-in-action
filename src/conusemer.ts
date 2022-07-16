import Container, { Service } from "typedi";
import { KafkaConsumer } from "../libs/kafka.consumer";
import { KafkaProducer } from "../libs/kafka.producer";
import { PdfService } from "./pdf";

@Service()
export class PdfConsumer {
    private _kafkaConsumer: KafkaConsumer = Container.get(KafkaConsumer);
    private _pdfService: PdfService = Container.get(PdfService);

    async start() {
        // 메시지 구독
        await this._kafkaConsumer.connect();
        await this._kafkaConsumer.subscribe("my-topic");
        await this._kafkaConsumer.run(async (message: string) => {
            await this._pdfService.toPDF(message, {
                format: "A4",
            });
            console.log("PDF 변환 작업이 완료되었습니다.");
        });
    }
}

const app = Container.get(PdfConsumer);
app.start();
