import { Consumer } from "kafkajs";
import Container, { Service } from "typedi";
import { KafkaService } from "./kafka";

@Service()
export class KafkaConsumer {
    private service: KafkaService = Container.get(KafkaService);

    private consumer: Consumer = this.service.client.consumer({
        groupId: "my-group",
    });

    async connect() {
        try {
            await this.consumer.connect();
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async subscribe(topic: string) {
        await this.consumer.subscribe({
            topics: [topic],
        });
    }

    async run(cb: (...args: any[]) => void) {
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }: any) => {
                const content = message.value.toString();
                console.log(`${content}`);
                await cb(content);
            },
        });
    }
}
