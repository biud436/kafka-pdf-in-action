import Container, { Service } from "typedi";
import { KafkaConsumer } from "../libs/kafka.consumer";
import { KafkaProducer } from "../libs/kafka.producer";
import { PdfService } from "./pdf";

@Service()
export class ProducerApplication {
    private _kafkaConsumer: KafkaConsumer = Container.get(KafkaConsumer);
    private _kafkaProducer: KafkaProducer = Container.get(KafkaProducer);

    async start() {
        await this._kafkaProducer.connect();
        await this._kafkaProducer.send({
            topic: "my-topic",
            messages: [
                {
                    value: `<!DOCTYPE html>
            <html lang="ko">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body>
                    <p>눈물이 마를때까지</p>
                </body>
            </html>
            `,
                },
            ],
        });
        await this._kafkaProducer.disconnect();
        await this._kafkaConsumer.connect();
        await this._kafkaConsumer.subscribe("my-topic-done");
        await this._kafkaConsumer.run(async (message: string) => {
            console.log(message);
        });
        await this._kafkaConsumer.disconnect();
    }
}

const app = Container.get(ProducerApplication);
app.start();
