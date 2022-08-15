import { StatusCode, response } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

import connection from '../../db/db';

import { Product } from '../../db/models/product';
import { Stock } from '../../db/models/stock';


const getProductsById = async (event: any) => {
  await connection.sync();

  try {
    const { productId } = event.pathParameters;
    const product = await Product.findByPk(productId, { 
      include: [{model: Stock, attributes: [], required: true }],
      raw: true,
      attributes: ['id', 'title', 'description', 'price', 'stock.count'],
    });
    
    if(!product) {
      return response[StatusCode.NotFound]({});
    }
    return response[StatusCode.Success]({product});
  } catch (err) {
    return response[StatusCode.InternalServerError]({err});
  }
};

export default middyfy(getProductsById);
