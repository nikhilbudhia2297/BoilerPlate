import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import express from "express";
import "reflect-metadata"; // this shim is required

useContainer(Container);

const app: express.Application = createExpressServer({
    cors: {
        origin: ["http://localhost:3001"],
        methods: "GET,POST,PATCH, DELETE",
        credentials: true,
    },
    defaultErrorHandler: false,
    controllers: [__dirname + "/controllers/**"]
});

app.use(express.json());


export default app;