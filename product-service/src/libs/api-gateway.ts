import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const headers = {
  // Required for CORS support to work
  'Access-Control-Allow-Origin': '*',
  // Required for cookies, authorization headers with HTTPS
  'Access-Control-Allow-Credentials': true,
};

enum StatusCode {
  NotFound = 404,
  InternalServerError = 500,
  Success = 200
}


export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: StatusCode.Success,
    headers,
    body: JSON.stringify(response)
  }
}

export const formatJSONResponseError = (response: Record<string, unknown>) => {
  return {
    statusCode: StatusCode.InternalServerError,
    headers,
    body: JSON.stringify(response)
  }
}

export const formatJSONResponseNotFound = (response: Record<string, unknown>) => {
  return {
    statusCode: StatusCode.NotFound,
    headers,
    body: JSON.stringify(response)
  }
}


