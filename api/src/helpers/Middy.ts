import validator from '@bits-cr/middy-joi-validator';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { Handler } from 'aws-lambda';
import Joi, { AnySchema } from 'joi';

import {
  BackendCustomException,
  BadRequestException,
} from '@helpers/ExceptionsHelper';
import { InternalResponse } from '@helpers/InternalResponse';
import { LambdaResponse } from '@helpers/LambdaResponse';
import { logger } from '@helpers/ProjectSetup';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const middify = <T>(
  handler: Handler,
  inputSchema: AnySchema<T> = Joi.any()
) => {
  const middleware = middy()
    .handler(handler)
    .use(jsonBodyParser())
    .use(validator({ inputSchema }))
    .use(apiGatewayResponse())
    .use(errorLogger());

  return middleware;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const apiGatewayResponse = () => {
  return {
    onError: (request: any) => {
      // Handling CustomExceptions
      if (request.error instanceof BackendCustomException) {
        request.response = new LambdaResponse(
          InternalResponse.buildErrorResponse(request.error)
        );
      } else {
        //Handling InternalResponse Errors
        if (request.error.isError) {
          request.response = new LambdaResponse(request.error);
        } else {
          //Handling BadRequest Errors
          if (request.error.name === 'BadRequestError') {
            request.response = new LambdaResponse(
              InternalResponse.buildErrorResponse(new BadRequestException())
            );

            //Handling Unknow Errors
          } else {
            request.response = new LambdaResponse(
              InternalResponse.buildErrorResponse(
                new BackendCustomException('Unknown Error', request.error)
              )
            );
          }
        }
      }
    },
    after: (request: any) => {
      request.response = new LambdaResponse(request.response);
    },
  };
};

export const errorLogger = () => {
  return {
    onError: (request: any) => {
      logger.error(request.error);
    },
    after: (request: any) => {
      if (request.response instanceof InternalResponse) {
        if (request.response.isError) {
          logger.error(request.response);
        }
      }
    },
  };
};
/* eslint-disable @typescript-eslint/no-explicit-any */
