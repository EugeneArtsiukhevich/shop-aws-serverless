import { Sequelize } from "sequelize-typescript";
import { Product } from './models/product';
import { Stock } from './models/stock';
import * as pg from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const connection = new Sequelize(
    PG_DATABASE,
    PG_USERNAME,
    PG_PASSWORD,
    {
      dialect: 'postgres',
      host: PG_HOST,
      port: Number(PG_PORT),
      dialectModule: pg
    },
);

connection.addModels([Product, Stock]);

export default connection;