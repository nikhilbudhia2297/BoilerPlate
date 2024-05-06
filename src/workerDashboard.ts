// import Arena from "bull-arena";
// import Bull from "bull";
// import express from "express";
// import http from "http";
// import { queues } from "./constants/WorkerConstant";
// import { redisHost } from "./constants/envConfig";
//
// const queuesConfig = [];
// for (const queue in queues) {
//     queuesConfig.push({
//         name: queues[queue],
//         hostId: "worker",
//         url: redisHost
//         // redis: { host: "localhost", port: 6379 }
//         // redis: { host: "gameserver-staging-redis.880gru.0001.aps1.cache.amazonaws.com", port: 6379 }
//         // redis: { host: "tournament-prod.880gru.ng.0001.aps1.cache.amazonaws.com", port: 6379 }
//     });
// }
//
// const arenaConfig = Arena({
//     Bull,
//     queues: queuesConfig
// }, {
//     basePath: "/",
//     disableListen: true,
// });
//
// const app = express();
//
// const DASHBOARD_PORT = parseInt(process.env.PORT || process.argv[2] || "7001", 10);
// const server = http.createServer(app);
//
// app.use("/", arenaConfig);
//
// server.listen(DASHBOARD_PORT, () =>
//     console.log(
//         `Worker dashboard is running http://localhost:${DASHBOARD_PORT}...`
//     )
// );
