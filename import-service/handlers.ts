import AWS from 'aws-sdk';
import * as handlers from './src';

const s3 = new AWS.S3({ region: 'eu-west-1'});

export const importProductsFile = handlers.importProductsFile({s3});
export const importFileParser = handlers.importFileParser({s3});;
