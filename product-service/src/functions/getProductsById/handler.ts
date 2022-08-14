import { response, ValidatedEventAPIGatewayProxyEvent, StatusCode } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import connection from 'src/db/db';

import { Product } from 'src/db/models/product';
import { Stock } from 'src/db/models/stock';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connection.sync();

  try {
    const { productId } = event.pathParameters;
    const product = await Product.findByPk(productId, { 
      include: [{model: Stock, attributes: [''], required: true }],
      raw: true,
      attributes: ['id', 'title', 'description', 'price', 'stock.count'],
    });
    
    if(!product) {
      return response[StatusCode.Success]({product});
    }
    return response[StatusCode.NotFound](null);
  } catch (err) {
    return response[StatusCode.InternalServerError]({err});
  }
};

export const main = middyfy(getProductsById);
