import { APIGatewayEvent } from 'aws-lambda';

export interface CustomBody<T> extends Omit<APIGatewayEvent, 'body'> {
  body: T;
}

export interface CustomPathParams<T>
  extends Omit<APIGatewayEvent, 'pathParameters'> {
  pathParameters: T;
}

export interface CustomBodyAndPathParams<Body, PathParams>
  extends Omit<APIGatewayEvent, 'body' | 'pathParameters'> {
  body: Body;
  pathParameters: PathParams;
}
