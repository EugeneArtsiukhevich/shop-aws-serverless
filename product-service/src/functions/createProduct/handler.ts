import { response, ValidatedEventAPIGatewayProxyEvent, StatusCode } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import connection from 'src/db/db';

import { Product } from 'src/db/models/product';

import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connection.sync();

  try {
    const product = await Product.create({...event.body});
    return response[StatusCode.Created]({product});
  } catch (err) {
    if(err.name === 'SequelizeValidationError') {
      return response[StatusCode.BadRequest]({err});
    }
    return response[StatusCode.InternalServerError]({err});
  }
};

export const main = middyfy(createProduct);
