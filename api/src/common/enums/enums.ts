export enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export enum Environments {
  DEV = 'dev',
}

export enum TokenTypes {
  JWT_TOKEN = 'JWT_TOKEN',
  BASIC_TOKEN = 'BASIC_TOKEN',
  ADMIN_TOKEN = 'ADMIN_TOKEN',
}

export enum PostgresErrorCodes {
  POSTGRES_PROCEDURE_ERROR = 0,
  POSTGRES_UNIQUE_VIOLATION = '-23505',
}

export enum S3Actions {
  GET_OBJECT = 'getObject',
  PUT_OBJECT = 'putObject',
}

export enum S3ExpirationTimes {
  LOGO = 86400, // 86400 seconds = 24 hours
  DEFAULT = 900, // 900 seconds = 15 mins
}

export enum CognitoTriggerEvents {
  SIGN_UP = 'CustomMessage_SignUp',
  ADMIN_SIGN_UP = 'CustomMessage_AdminCreateUser',
}

export enum CognitoAttributes {
  EMAIL = 'email',
  USERNAME = 'cognito:username',
  COMPLETED_ACCOUNT = 'custom:completed_account',
  SUB = 'sub',
  EMAIL_VERIFIED = 'email_verified',
}

export enum CognitoCompletedAccount {
  FALSE = '0',
  TRUE = '1',
}

export enum CognitoEmailVerified {
  FALSE = 'False',
  TRUE = 'True',
}

export enum CognitoAuthFlows {
  USER_PASSWORD_AUTH = 'USER_PASSWORD_AUTH',
  USER_SRP_AUTH = 'USER_SRP_AUTH',
  REFRESH_TOKEN_AUTH = 'REFRESH_TOKEN_AUTH',
}

export enum CognitoChallengeNames {
  NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
}

export enum UserGroups {
  ADMINISTRATOR = 1,
}

export enum FileExtensions {
  PDF = 'pdf',
  ZIP = 'zip',
}

export enum MimeTypes {
  PDF = 'application/pdf',
  FORM_URLENCODED = 'application/x-www-form-urlencoded',
  ZIP = 'application/zip',
}

export enum AuthorizerEffects {
  ALLOW = 'Allow',
  DENY = 'Deny',
  UNAUTHORIZED = 'Unauthorized',
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum openAIModels {
  GPT_3_5_TURBO_0914 = 'gpt-3.5-turbo-instruct-0914',
}
