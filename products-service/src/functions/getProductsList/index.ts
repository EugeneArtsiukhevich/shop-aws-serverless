import { StatusCode, response } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import connection from '../../db/db';

import { Product } from '../../db/models/product';
import { Stock } from '../../db/models/stock';


const getProductsList = async () => {
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

export default middyfy(getProductsList);
