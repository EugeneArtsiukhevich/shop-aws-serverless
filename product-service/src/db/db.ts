import { Sequelize } from "sequelize-typescript";
import { Product } from './models/product';
import { Stock } from './models/stock';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

import 'pg';

const connection = new Sequelize(
    PG_DATABASE,
    PG_USERNAME,
    PG_PASSWORD,
    {
      dialect: 'postgres',
      host: PG_HOST,
      port: Number(PG_PORT)
    },
);

connection.addModels([Product, Stock]);

export default connection;