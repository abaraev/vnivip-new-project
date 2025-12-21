import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {News} from "../news/news.model";

interface ParagraphCreationAttrs {
    newsId?: number;
    text?: string;
    img?: string;
    video?: string;
    videoPoster?: string;
    position?: number;
    alignText?: string;
    firstElement?: string;
}

@Table({tableName: 'paragraphs'})
export class Paragraph extends Model<Paragraph, ParagraphCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.TEXT, allowNull: true})
    text: string;

    @Column({type: DataType.STRING, allowNull: true})
    img: string;

    @Column({type: DataType.STRING, allowNull: true})
    video: string;

    @Column({type: DataType.STRING, allowNull: true})
    videoPoster: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    position: number;

    @Column({type: DataType.STRING, allowNull: false})
    firstElement: string;

    @Column({type: DataType.STRING, defaultValue: 'justify'})
    alignText: string;

    @ForeignKey(() => News)
    @Column({type: DataType.INTEGER, allowNull: false})
    newsId: number;
}