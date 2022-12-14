const headers = {
  // Required for CORS support to work
  'Access-Control-Allow-Origin': '*',
  // Required for cookies, authorization headers with HTTPS
  'Access-Control-Allow-Credentials': true,
};

export enum StatusCode {
  NotFound = 404,
  BadRequest = 400,
  InternalServerError = 500,
  Success = 200,
  Created = 201
}

const formatJSONResponse = (response: Record<string, unknown> | null, statusCode: StatusCode) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(response)
  }
}

export const response = {
  [StatusCode.Success]: (response: Record<string, unknown>) =>  formatJSONResponse(response, StatusCode.Success),
  [StatusCode.BadRequest]: (response: Record<string, unknown>) =>  formatJSONResponse(response, StatusCode.BadRequest),
  [StatusCode.Created]: (response: Record<string, unknown>) => formatJSONResponse(response, StatusCode.Created),
  [StatusCode.NotFound]: (response: Record<string, unknown>) => formatJSONResponse(response, StatusCode.NotFound),
  [StatusCode.InternalServerError]: (response: Record<string, unknown>) => formatJSONResponse(response, StatusCode.InternalServerError),
}
