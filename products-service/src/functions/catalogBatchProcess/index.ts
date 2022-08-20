import { middyfy } from '../../libs/lambda';
import {SNS} from 'aws-sdk';

import connection from '../../db/db';

import { Product } from '../../db/models/product';
import logger from '../../libs/logger';

const catalogBatchProcess = async (event: any) => {
  const sns = new SNS({ region: 'eu-west-1'});

  await connection.sync();

  const products = event.Records.map(({body}) => JSON.parse(body));
  logger.info('XXX-event', event);
  logger.info('XXX-products', products);
  try {
    await Product.bulkCreate(products);
    console.log('Products have been saved: ', products);
    await sns.publish({
      Subject: 'Test sns AWS',
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN
      },
      (err, res) => {
        if(err) {
          console.log('Error while sending sns message: ', err);
        } else {
          console.log('SNS is successfully sent ', res);
        }
    }).promise();
  } catch (err) {
    console.log('Error while saving products: ', err);
  }
};

export default middyfy(catalogBatchProcess);
