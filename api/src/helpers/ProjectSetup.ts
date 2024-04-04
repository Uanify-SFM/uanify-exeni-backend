import { S3Client } from '@aws-sdk/client-s3';
import { LambdaLog } from 'lambda-log';
import 'reflect-metadata';

// Env Variables
export const {
  ENVIRONMENT,
  POSTGRES_DATABASE,
  POSTGRES_DEFAULT_SCHEMA,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  PUBLIC_KEYS,
  REGION,
  S3_WEBSITE_BUCKET,
  OPENAI_API_KEY,
  ACCOUNT_SID_TWILIO,
  AUTH_TOKEN_TWILIO,
  TWILIO_PHONE_NUMBER,
} = process.env as {
  [key: string]: string;
};

// LambdaLog Global Configuration
export const logger = new LambdaLog({ debug: true });

export const pgConfig = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

export const openAICofig = {
  apiKey: OPENAI_API_KEY,
};

// S3 Global Configuration
export const s3Client = new S3Client({ region: REGION });

// Regular Expressions
export const passwordRegEx =
  /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;

export const phoneRegEx =
  /^[\+]{1}[0-9]{1,3}[-\s]?[(]?[0-9]{1,3}[)]?[-\s]?[0-9]{3,4}[-\s]?[0-9]{2,4}[-\s]?[0-9]{2,7}$/;

export const noWhitespaceRegEx = /^(\S+\s{1}){0,}\S+$/;

export const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
