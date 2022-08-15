import { StatusCode, response } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import connection from '../..//db/db';

import { Product } from '../../db/models/product';


const createProduct = async (event: any) => {
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

export default middyfy(createProduct);
