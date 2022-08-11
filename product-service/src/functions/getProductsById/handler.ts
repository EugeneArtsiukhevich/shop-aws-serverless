import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, formatJSONResponseError, formatJSONResponseNotFound } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products } from 'src/mock/products';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const product = products.find(product => product.id === productId);

    if(!product) {
      return formatJSONResponseNotFound(null);
    }

    return formatJSONResponse({...product});
  } catch(err) {
    return formatJSONResponseError({err});
  }
};

export const main = middyfy(getProductsById);
