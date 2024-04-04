import { Environments, StatusCodes } from '@enums/enums';
import { InternalResponse } from '@helpers/InternalResponse';
import { ENVIRONMENT, logger } from '@helpers/ProjectSetup';

class FinalResponseWrapper<T = undefined> {
  message: string;
  code: number;
  payload: T;

  constructor(internalResponse: InternalResponse) {
    this.message = `${internalResponse.clientMessage} ( ${internalResponse.code} )`;
    this.code = internalResponse.code;
    this.payload = internalResponse.isError ? {} : internalResponse.payload;
  }
}

export class LambdaResponse {
  public statusCode: number;
  public body: string;
  public headers: unknown;

  constructor(internalResponse: InternalResponse) {
    if (ENVIRONMENT === Environments.DEV) {
      logger.debug('Coming Lambda Response', internalResponse);
    }
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': true,
    };
    this.body = JSON.stringify(new FinalResponseWrapper(internalResponse));

    switch (internalResponse.statusCode) {
      case 200:
        this.statusCode = StatusCodes.OK;
        break;
      case 400:
        this.statusCode = StatusCodes.BAD_REQUEST;
        break;
      case 401:
        this.statusCode = StatusCodes.UNAUTHORIZED;
        break;
      case 403:
        this.statusCode = StatusCodes.FORBIDDEN;
        break;
      case 404:
        this.statusCode = StatusCodes.NOT_FOUND;
        break;
      case 409:
        this.statusCode = StatusCodes.CONFLICT;
        break;
      default:
        this.statusCode = StatusCodes.SERVER_ERROR;
        break;
    }
  }
}
