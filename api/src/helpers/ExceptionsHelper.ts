import { StatusCodes } from '@enums/enums';

type ApiError = {
  error: Error;
  message: string;
  name: string;
};

export class BackendCustomException extends Error {
  public originalError: unknown;
  public errorCode: number;
  public httpStatus: StatusCodes;
  public clientMessage: string;
  public internalMessage: string;

  constructor(msg = '', originalError: Error = new Error()) {
    super(msg);
    this.originalError = originalError;
    this.errorCode = 500;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = 'Something went wrong';
    this.internalMessage = msg;
  }

  static transformErrorToException(error: unknown): ApiError {
    const err = error as Error;
    return {
      error: err,
      message: err.message,
      name: err.name,
    };
  }
}

/**
 * General Bad request exceptions (400.x)
 */
export class BadRequestException extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Bad Request.'
  ) {
    super(msg, originalError);
    this.errorCode = 400;
    this.httpStatus = StatusCodes.BAD_REQUEST;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

/**
 * General Connection Errors (503.x)
 */
export class PostgresDatabaseConnectionError extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error connecting database pool.'
  ) {
    super(msg, originalError);
    this.errorCode = 503.1;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

export class OpenIAConnectionError extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error connecting to OpenIA API.'
  ) {
    super(msg, originalError);
    this.errorCode = 503.2;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}
