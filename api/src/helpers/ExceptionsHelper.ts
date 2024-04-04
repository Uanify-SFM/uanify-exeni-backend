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

/**
 * S3 exceptions (511.x)
 */

export class S3ConnectionError extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error connecting to S3.'
  ) {
    super(msg, originalError);
    this.errorCode = 511;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

export class S3DeletingObjectException extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error trying to delete object.'
  ) {
    super(msg, originalError);
    this.errorCode = 511.1;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

export class S3GettingObjectException extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error trying to fetch object.'
  ) {
    super(msg, originalError);
    this.errorCode = 511.2;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

export class S3SignedUrlException extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error trying to get presigned URL.'
  ) {
    super(msg, originalError);
    this.errorCode = 511.3;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

export class S3TriggerException extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error trying triggering.'
  ) {
    super(msg, originalError);
    this.errorCode = 511.4;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}

export class S3UploadingObjectException extends BackendCustomException {
  constructor(
    msg = '',
    originalError: Error = new Error(),
    clientMessage = 'Error trying to upload the object.'
  ) {
    super(msg, originalError);
    this.errorCode = 511.5;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = clientMessage;
    this.internalMessage = msg;
  }
}
