import {Get, Res, JsonController} from "routing-controllers";
import {Response} from "express";
import {getCustomRepository} from "typeorm";
import {TestTableRepository} from "../repository/TestTableRepository";

@JsonController("/health")
export class HealthController{

    constructor() {
    }

    @Get()
    getServerHealth(@Res() res : Response){
        return res.status(200).send("All fine here");
    }

    @Get('/test')
    async getTestTable(@Res() res : Response){
        const repo = getCustomRepository(TestTableRepository);
        const data = await repo.getTableData();
        return res.status(200).send(data);
    }
}