import {Connection, createConnection} from "typeorm";

export async function createDBConnection(){
    return await DbConnection.getInstance();
}

class DbConnection {
    private static instance: DbConnection;
    dbConnection : Connection;
    private constructor() {
    }

    public static async getInstance(){
        if(!DbConnection.instance){
            DbConnection.instance = new DbConnection();
            await DbConnection.instance.connectToDb();
            console.log(`db connection established`);
        }
        return DbConnection.instance;
    }


    private async connectToDb(){
        this.dbConnection = await createConnection();
    }
}