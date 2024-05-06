// import {Kafka, KafkaConfig, Message, Producer, ProducerRecord} from "kafkajs";
// import {logger} from "../utils/LogglyClient";
// import {APP_NAME} from "../constants/envConfig";
// import {CONFLUENT_CONFIG} from "../constants/AppConstant";
//
// export let confluentProducer : KafkaProducer;
//
// export const confluentKafkaConfig : KafkaConfig  = {
//     clientId : APP_NAME,
//     brokers : [CONFLUENT_CONFIG.Host || ""],
//     ssl : CONFLUENT_CONFIG.SslOptions,
//     sasl : {
//         mechanism : "plain",
//         username : CONFLUENT_CONFIG.SaslOptions.username,
//         password : CONFLUENT_CONFIG.SaslOptions.password
//     },
//     retry : {
//         initialRetryTime : 500,
//         retries : 8
//     },
//     connectionTimeout: CONFLUENT_CONFIG.ConnectionTimeout
// };
//
// export async function initializeConfluentProducer(){
//     const kafka = new Kafka(confluentKafkaConfig);
//     confluentProducer = await KafkaProducer.getConfluentInstance(kafka);
// }
//
// export class KafkaProducer {
//     private static instance : KafkaProducer;
//     private static confluentInstance: KafkaProducer;
//     private producer : Producer;
//
//
//     private constructor() {}
//
//     public static async getConfluentInstance(kafka: Kafka) {
//         if (this.confluentInstance != null) {
//             return this.confluentInstance;
//         }
//         this.confluentInstance = new KafkaProducer();
//         await this.confluentInstance.initialize(kafka);
//         return this.confluentInstance;
//     }
//
//     private async initialize(kafka : Kafka){
//         this.producer = kafka.producer({
//             retry: {
//                 initialRetryTime: 500,
//                 retries: 8
//             }
//         });
//
//         await this.producer.connect();
//
//         this.producer.on('producer.connect', () => {
//             logger.info('kafkajs producer connected ', kafka);
//         });
//
//         this.producer.on('producer.disconnect', (err : any) => {
//             logger.info('kafkajs producer disconnected ', err);
//         });
//     }
//
//     public static async getInstance(kafka : Kafka){
//         if(this.instance != null){
//             return this.instance;
//         }
//
//         this.instance = new KafkaProducer();
//         await this.instance.initialize(kafka);
//         return this.instance;
//     }
//
//     public async send(topic : string, message : object[] | object, key? : string) {
//         const producerRecord: ProducerRecord = this.getProducerRecord(topic, message, key);
//         try{
//             await this.producer.send(producerRecord);
//         }
//         catch (err : any) {
//             logger.error(`KafkaJS produce error in ${topic} `, err);
//         }
//     }
//
//     private getProducerRecord(topic : string, message : object[] | object, key? : string) : ProducerRecord {
//         const messages : Message[] = [];
//         if (message instanceof Array) {
//             for (const m of message) {
//                 messages.push(this.transformMessage(m, key));
//             }
//         } else {
//             messages.push(this.transformMessage(message, key));
//         }
//
//         const producerRecord : ProducerRecord = {
//             topic : topic,
//             messages : messages,
//             acks : 1
//         }
//         return producerRecord;
//     }
//
//     private transformMessage(obj : object, key? : string) : Message {
//         const message : Message = {
//             value : JSON.stringify(obj)
//         }
//         if(key){
//             message.key = key;
//         }
//         return message;
//     }
// }


// import {Service} from "typedi";
// import {confluentProducer, KafkaProducer} from "../services/WKafkaProducer";
//
// @Service()
// export class KafkaClient {
//
//     async publish(message : any, topic : string) {
//         const producer: KafkaProducer = confluentProducer;
//         await producer.send(topic, message);
//     }
// }