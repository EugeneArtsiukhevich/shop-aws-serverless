import { ValidatedEventAPIGatewayProxyEvent, StatusCode, response } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// import { Client } from 'pg';

import schema from './schema';

import connection from 'src/db/db';

import { Product } from 'src/db/models/product';
import { Stock } from 'src/db/models/stock';


// const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
//   const query = {
//     name: 'fetch-products',
//     text: `SELECT * 
//             from products as p
//             inner join
//             stocks as s
//             on p.id = s.product_id; `,
//     values: [],
//   }
//   const client = new Client(DB_OPTIONS);
//   client.connect();
//   try {
//     const result = await client.query(query);
//     return formatJSONResponse({products: result.rows});
//   } catch (err) {
//     return formatJSONResponseError({err});
//   } finally {
//     client.end();
//   }
// };

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  await connection.sync();

  try {
    const products = await Product.findAll({ 
      include: [{model: Stock, attributes: [], required: true }],
      raw: true,
      attributes: ['id', 'title', 'description', 'price', 'stock.count'],
    });
    return response[StatusCode.Success]({products})
  } catch (err) {
    return response[StatusCode.InternalServerError]({err})
  }
};

export const main = middyfy(getProductsList);
