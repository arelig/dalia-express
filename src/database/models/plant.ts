import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "plants",
})
export class Plant extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image!: string;
}