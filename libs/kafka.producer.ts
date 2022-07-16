import { Producer, ProducerRecord } from "kafkajs";
import Container, { Service } from "typedi";
import { KafkaService } from "./kafka";

@Service()
export class KafkaProducer {
    private service: KafkaService = Container.get(KafkaService);

    private producer: Producer = this.service.client.producer();

    async connect() {
        try {
            await this.producer.connect();
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async send(record: ProducerRecord) {
        await this.producer.send(record);
    }

    async disconnect() {
        await this.producer.disconnect();
    }
}
