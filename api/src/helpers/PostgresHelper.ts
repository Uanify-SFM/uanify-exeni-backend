import { Pool, PoolClient } from 'pg';

import { PostgresDatabaseConnectionError } from '@helpers/ExceptionsHelper';
import { pgConfig, POSTGRES_DEFAULT_SCHEMA } from '@helpers/ProjectSetup';

export class PostgresHelper {
  static instance: PostgresHelper;
  private readonly pgPool = new Pool(pgConfig);

  constructor() {
    this.pgPool.on('error', this.handlePoolError);
    if (!PostgresHelper.instance) {
      PostgresHelper.instance = this;
    }

    return PostgresHelper.instance;
  }

  private handlePoolError(error: Error) {
    throw new PostgresDatabaseConnectionError(
      'Database connection error',
      error
    );
  }

  async createConnection(): Promise<PoolClient> {
    const db = await new PostgresHelper().pgPool.connect();
    try {
      await db.query(`SET search_path TO ${POSTGRES_DEFAULT_SCHEMA}`);
      return db;
    } catch (error) {
      db.release();
      throw this.handlePoolError(error as Error);
    }
  }
}
