import Container, { Service } from "typedi";
import { KafkaProducer } from "../libs/kafka.producer";
import { PdfService } from "./pdf";

@Service()
export class ProducerApplication {
    private _kafkaProducer: KafkaProducer = Container.get(KafkaProducer);

    async start() {
        console.log("프로듀서를 실행합니다.");
        await this._kafkaProducer.connect();
        this._kafkaProducer.send({
            topic: "my-topic",
            messages: [
                {
                    value: `<!DOCTYPE html>
            <html lang="en">
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
    }
}

const app = Container.get(ProducerApplication);
app.start();
