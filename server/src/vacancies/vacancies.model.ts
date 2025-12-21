import {Column, DataType, Model, Table} from "sequelize-typescript";

interface vacancyCreationAttrs {
    jobName: string;
    description: string;
}

@Table({tableName: 'vacancies'})
export class Vacancy extends Model<Vacancy, vacancyCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    jobName: string;

    @Column({type: DataType.TEXT, allowNull: false})
    description: string;
}