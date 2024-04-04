import { StatusCodes } from '@enums/enums';
import { BackendCustomException } from '@helpers/ExceptionsHelper';
import { logger } from '@helpers/ProjectSetup';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class InternalResponse {
  public isError: boolean;
  public payload: any;
  public code: number;
  public statusCode: StatusCodes;
  public clientMessage: string;
  public technicalMessage: string;

  constructor() {
    this.isError = false;
    this.payload = {};
    this.code = 200;
    this.statusCode = StatusCodes.OK;
    this.clientMessage = 'Success';
    this.technicalMessage = '';
  }

  setCustomError(error: BackendCustomException) {
    this.isError = true;
    this.payload = {};
    this.code = error.errorCode;
    this.statusCode = error.httpStatus;
    this.clientMessage = error.clientMessage;
    this.technicalMessage = error.internalMessage;
  }

  setError() {
    this.isError = true;
    this.payload = {};
    this.code = 500;
    this.statusCode = StatusCodes.SERVER_ERROR;
    this.clientMessage = 'Something went wrong';
    this.technicalMessage = '';
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  static buildErrorResponse(error: any): InternalResponse {
    logger.error(error);
    const instance = new InternalResponse();
    if (error instanceof BackendCustomException) {
      instance.setCustomError(error);
    } else {
      instance.setError();
      instance.technicalMessage = (error as Error).message;
      instance.payload = error;
    }
    return instance;
  }
}
