import { Table, Model, Column, DataType, HasOne } from "sequelize-typescript";
import { Stock } from "./stock";

@Table({
  timestamps: false,
  tableName: 'products',
})
export class Product extends Model {
  @HasOne(() => Stock)
  stock: Stock;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  price!: number;
}
