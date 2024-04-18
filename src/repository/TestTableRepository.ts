import {EntityRepository, Repository} from "typeorm";
import {TestTable} from "../entity/TestTable";

@EntityRepository(TestTable)
export class TestTableRepository extends Repository<TestTable>{

    async getTableData(){
        return await this.find();
    }
}