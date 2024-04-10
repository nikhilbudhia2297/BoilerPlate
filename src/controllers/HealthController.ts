import {Get, Res, JsonController} from "routing-controllers";
import {Response} from "express";

@JsonController("/health")
export class HealthController{

    constructor() {
    }

    @Get()
    getServerHealth(@Res() res : Response){
        return res.status(200).send("All fine here");
    }
}