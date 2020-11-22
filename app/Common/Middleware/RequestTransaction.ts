import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database, { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';

export default class RequestTransaction {
  public async handle ({request}: HttpContextContract, next: () => Promise<void>): Promise<void> {
    // code for middleware goes here. ABOVE THE NEXT CALL
    request.databaseTransaction = await Database.transaction();
    if (request.method() === `GET`) {
      return await next();
    }

    await Database.transaction(async (trx: TransactionClientContract) => {
      request.databaseTransaction = trx;
      return await next();
      // adonis will automatically rollback or commit transaction
    });
  }
}
