// import {LocalCache} from "./cache/LocalCache";
// import {processCashfreeData} from "./consumers/processCashfreeData";
// import {processWalletRegIdsForKycStatus} from "./consumers/processKycData";
// import { processNewReferralFlow, processRakeMessage } from "./consumers/processRake";
// import {processUserAttributes} from "./consumers/processUserAttributes";
// import { createDBConnection } from "./utils/DbConnectionFactory";
// import {APP_NAME} from "./constants/envConfig";
// import { logger } from "./utils/LogglyClient";
// import {createRedisCacheClient} from "./cache/RedisCache";
// import {processUserDeviceRiskByKafka} from "./consumers/processUserDeviceRiskByKafka";
// import {EachMessagePayload, Kafka, Message} from "kafkajs";
// import {initializeConfluentProducer} from "./services/WKafkaProducer";
// import {APP_CLICK_DATA, CONFLUENT_CONFIG, PROCESS_REWARDABLE_ACTIONS} from "./constants/AppConstant";
// import {processUpdateReferralData} from "./consumers/processUpdateReferralData";
// import {processRewardableActions} from "./consumers/processRewardableActions";
// import {processClickStreamData} from "./consumers/processClickStreamData";
// import {enterWithUserAndSessionContext} from "./utils/RequestContextUtil";
//
//
// const topicsToConsume = ["rakeCollection_v1", "kycStatusCheck","triggerUserDeviceRiskCheck","PaymentUserDetail", "UserAttributes", "add_refer_details", PROCESS_REWARDABLE_ACTIONS, APP_CLICK_DATA];
//
// const confluentKafka = new Kafka({
//     // logLevel: logLevel.WARN,
//     clientId: APP_NAME,
//     brokers: [CONFLUENT_CONFIG.Host || ''],
//     ssl: CONFLUENT_CONFIG.SslOptions,
//     sasl: {
//         mechanism: 'plain',
//         username: CONFLUENT_CONFIG.SaslOptions.username || '',
//         password: CONFLUENT_CONFIG.SaslOptions.password || ''
//     },
//     retry: {
//         initialRetryTime: 500,
//         retries: 8
//     },
//     connectionTimeout: CONFLUENT_CONFIG.ConnectionTimeout,
// });
//
// const confluentConsumer = confluentKafka.consumer({
//     groupId: "LoyaltyService_CG",
// });
//
// export async function createConfluentConnection() {
//     await confluentConsumer.connect();
//     await confluentConsumer.subscribe({ topics: topicsToConsume })
//
//     confluentConsumer.on('consumer.connect', () => {
//         logger.info('confluent consumer connected ' + CONFLUENT_CONFIG.Host);
//     });
//
//     await confluentConsumer.run({
//         partitionsConsumedConcurrently: 5,
//         eachMessage: async (payload: EachMessagePayload) => {
//             await processKafkaMessage(payload);
//         }
//     });
// }
//
// async function processKafkaMessage(payload: EachMessagePayload) {
//     const message : Message = payload.message;
//     let parsedMessageValue;
//     try{
//         parsedMessageValue = JSON.parse(String(message.value));
//     } catch (err : any) {
//         logger.error(`Error parsing kafka message : ${message}, error :: ${err.message}`);
//     }
//
//     try{
//         switch (payload.topic) {
//             case "rakeCollection_v1":
//                 await processRakeMessage(JSON.stringify(parsedMessageValue));
//                 await processNewReferralFlow(JSON.stringify(parsedMessageValue));
//                 break;
//
//             case "kycStatusCheck":
//                 await enterWithUserAndSessionContext(processWalletRegIdsForKycStatus, [JSON.stringify(parsedMessageValue)],
//                     parsedMessageValue.user_id, parsedMessageValue.sessionToken);
//                 break
//
//             case  "PaymentUserDetail":
//                 await processCashfreeData(JSON.stringify(parsedMessageValue));
//                 break;
//             case "triggerUserDeviceRiskCheck":
//                 await processUserDeviceRiskByKafka(JSON.stringify(parsedMessageValue));
//                 break;
//             case "add_refer_details" :
//                 await processUpdateReferralData(JSON.stringify(parsedMessageValue));
//                 break;
//             case "UserAttributes":
//                 await processUserAttributes(JSON.stringify(parsedMessageValue));
//                 break;
//             case PROCESS_REWARDABLE_ACTIONS:
//                 await enterWithUserAndSessionContext(processRewardableActions, [JSON.stringify(parsedMessageValue)], parsedMessageValue.userId);
//                 break;
//             case APP_CLICK_DATA:
//                 await processClickStreamData(JSON.stringify(parsedMessageValue));
//                 break;
//         }
//     } catch (err : any) {
//         logger.error(`Error processing kafka message . TOPIC: ${payload.topic} | message: ${String(payload.message.value)} | Error: ` + JSON.stringify(err.message));
//     }
// }
//
// async function startConsumer() {
//     try {
//         await createDBConnection();
//         await createRedisCacheClient();
//         LocalCache.InitiateInstance();
//         await initializeConfluentProducer();
//         await createConfluentConnection();
//         await CurrencyConvertor.setupCronForCurrencyConversionUpdate();
//     } catch (err: any) {
//         logger.error(`failure in consumer: ${err.stack}`);
//     }
// }
//
// process.on("uncaughtException", (err) => {
//     let stackTrace = (err && err.stack && err.stack.split('\n').length > 1 && err.stack.split('\n')[1].trim()) || "stack trace not found";
//     logger.error("uncaughtException::message: " + err.message + " :: stack: " + stackTrace);
//     process.exit();
// });
//
// startConsumer();
//
// const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
// signalTraps.forEach(type => {
//     process.on(type, async () => {
//         try {
//             await confluentConsumer.disconnect();
//         } finally {
//             process.exit();
//         }
//     })
// });