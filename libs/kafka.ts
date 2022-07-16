import { Kafka, Producer } from "kafkajs";
import "reflect-metadata";
import Container, { Service } from "typedi";

@Service()
export class KafkaService {
    private _client: Kafka = new Kafka({
        clientId: "my-app",
        brokers: [
            process.env.NODE_ENV === "production"
                ? "kafka:9092"
                : "localhost:9092",
        ],
    });

    get client() {
        return this._client;
    }
}
