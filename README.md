<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

# Folder Structure

The project follows the following folder structure:

```
├── serverless-files/
│   ├── serverless-functions-definitions-http.yml
│   └──  serverless-functions-definitions-triggers.yml
├── src/
│   ├── common/
│   │   ├── api-interfaces/
│   │   │   ├── type-files/
│   │   │   └── IRequest.d.ts
│   │   ├── interfaces/
│   │   │   ├── IControllerResponse.d.ts
│   │   │   └── IUser.ts
│   │   ├── entities/
│   │   │   └── CognitoJwtData.ts
│   │   └── enums/
│   │       └── enums.ts
│   ├── data/
│   │   └── user-data.ts    
│   ├── controllers/
│   │   └── user-controller.ts
│   ├── handlers/
│   │   ├── user-handler.ts
│   ├── helpers/
│   │   ├── middy.ts
|   │   └── ProjectSetup.ts
|   ├── scripts/
|   │    └── writeFileTypes.ts
|   └── validations/
|   |   └── user-validation.ts
|   └── types/
|       └── environment.d.ts 
```

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```


### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
