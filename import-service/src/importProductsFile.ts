import { StatusCode, response } from "./utils/api-gateway";
import logger from './utils/logger';

export const importProductsFile = ({
  s3
}: any) => async (event: any) => {
  try {
    const params = {
      Bucket: process.env.BUCKET,
      Key: `uploaded/${event.queryStringParameters.name}`,
      Expires: 60,
      ContentType: 'text/csv'
    };

    const url = await s3.getSignedUrlPromise('putObject', params);
    logger.info(`Signed url${url}`)
    return response[StatusCode.Success](url);
  } catch(err) {
    return response[StatusCode.InternalServerError]({err});
  }
};
  