import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./product";

@Table({
  timestamps: false,
  tableName: 'stocks',
})
export class Stock extends Model {
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  product_id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  count!: number;
}

