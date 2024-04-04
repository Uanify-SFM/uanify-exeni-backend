import { PassThrough, Readable } from 'stream';

import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { S3Actions, S3ExpirationTimes } from '@enums/enums';
import {
  BackendCustomException,
  S3DeletingObjectException,
  S3GettingObjectException,
  S3UploadingObjectException,
} from '@helpers/ExceptionsHelper';
import { s3Client, S3_WEBSITE_BUCKET } from '@helpers/ProjectSetup';

export async function getS3SignedUrl(
  key: string,
  action: S3Actions,
  expirationTime: S3ExpirationTimes,
  contentType = ''
): Promise<string> {
  const commonCommandOptions = {
    Bucket: S3_WEBSITE_BUCKET,
    Key: key,
  };

  const commandOptions =
    action === S3Actions.GET_OBJECT
      ? {
          ...commonCommandOptions,
        }
      : {
          ...commonCommandOptions,
          ContentType: contentType,
        };

  const command =
    action === S3Actions.GET_OBJECT
      ? new GetObjectCommand(commandOptions)
      : new PutObjectCommand(commandOptions);

  return await getSignedUrl(s3Client, command, { expiresIn: expirationTime });
}

export async function deleteS3File(
  key: string
): Promise<DeleteObjectCommandOutput> {
  const command = new DeleteObjectCommand({
    Bucket: S3_WEBSITE_BUCKET,
    Key: key,
  });

  try {
    return await s3Client.send(command);
  } catch (error) {
    const err = BackendCustomException.transformErrorToException(error);
    throw new S3DeletingObjectException(err.message, err.error);
  }
}

export async function uploadS3File(
  key: string,
  body: string | Readable | Blob | Uint8Array | Buffer | PassThrough,
  contentType: string,
  isZipFile = false
): Promise<void> {
  try {
    const params: PutObjectCommandInput = {
      Bucket: S3_WEBSITE_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    };
    if (isZipFile) {
      await new Upload({
        client: s3Client,
        params,
      }).done();
    } else {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
    }
  } catch (error) {
    const err = BackendCustomException.transformErrorToException(error);
    throw new S3UploadingObjectException(err.message, err.error);
  }
}

export async function getS3File(
  s3Key: string,
  bucket: string = S3_WEBSITE_BUCKET,
  readContent = false
): Promise<Buffer | Readable> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: s3Key,
  });
  try {
    const file = (await s3Client.send(command)).Body as Readable;
    if (file) {
      if (readContent) {
        const chunks = [];
        for await (const chunk of file) {
          chunks.push(chunk);
        }
        return Buffer.concat(chunks);
      }
      return file;
    } else {
      throw new S3GettingObjectException();
    }
  } catch (error) {
    const err = BackendCustomException.transformErrorToException(error);
    throw new S3GettingObjectException(err.message, err.error);
  }
}

// Split string by slashes into an array and take only the last element (filename)
export function getFilenameFromKey(key: string): string {
  return key.split('/').pop() || key;
}
