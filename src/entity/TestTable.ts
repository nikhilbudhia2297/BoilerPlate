import {BaseEntity} from "./BaseEntity";
import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TestTable extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;
}