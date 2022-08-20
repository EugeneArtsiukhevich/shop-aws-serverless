import csv = require('csv-parser');
import logger from './utils/logger';
import {S3, SQS} from 'aws-sdk';

export const importFileParser = ({
  s3,
  sqs
}: {s3: S3, sqs: SQS}) => async (event: any) => {
  try {
    for(const record of event.Records) {
      await new Promise((res, rej) => {
        const s3Stream = s3.getObject({
          Bucket: `${process.env.BUCKET}`,
          Key: record.s3.object.key
        }).createReadStream();
        s3Stream
        .on('error', (error) => {
          logger.error(error);
          rej('error');
        })
        .pipe(csv())
        .on('data', async (data: any) => {
          console.log('XXX-url', process.env.SQS_URL);
          await sqs.sendMessage({
            QueueUrl: process.env.SQS_URL || '',
            MessageBody: JSON.stringify(data),
          }, (err, resp) => {
            if(err) {
              logger.error(err);
            }
            logger.info(`Send sqs message with ${resp}`);
          }).promise();
        })
        .on('end', async() => {
          logger.info(`Copy from ${process.env.BUCKET}/${record.s3.object.key}`);
          res('success');
        })
      });

      await s3.copyObject({
        Bucket: `${process.env.BUCKET}`,
        CopySource: `${process.env.BUCKET}/${record.s3.object.key}`,
        Key: record.s3.object.key.replace('uploaded', 'parsed')
      }).promise();

      logger.info(`Copy is done into ${record.s3.object.key.replace('uploaded', 'parsed')}`);

      await s3.deleteObject({
        Bucket: `${process.env.BUCKET}`,
        Key: record.s3.object.key
      }).promise();

    }

  } catch(err) {
    logger.error(err);
    throw err;
  }

};