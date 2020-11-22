declare module '@ioc:Adonis/Core/Request' {
  import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';

  interface RequestContract {
    databaseTransaction?: TransactionClientContract;
  }
}
