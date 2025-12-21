import {Column, DataType, Model, Table} from "sequelize-typescript";

interface memberCreationAttrs {
    fullName: string;
    jobName?: string;
    status?: string;
    section: string;
    email?: string;
    phone?: string;
    avatar?: string;
    jobPositionId: number;
}

@Table({tableName: 'members'})
export class Member extends Model<Member, memberCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    fullName: string;

    @Column({type: DataType.STRING, allowNull: true})
    jobName: string;

    @Column({type: DataType.STRING, allowNull: true})
    status: string;

    @Column({type: DataType.STRING, allowNull: false})
    section: string;

    @Column({type: DataType.STRING, allowNull: true})
    email: string;

    @Column({type: DataType.STRING, allowNull: true})
    phone: string;

    @Column({type: DataType.STRING, allowNull: true})
    avatar: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    position: number;
}