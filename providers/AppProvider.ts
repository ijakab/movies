import { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  public static needsApplication: boolean = true;

  constructor (protected app: ApplicationContract) {}

  public async register (): Promise<void> {
    // Register your own bindings
  }

  public async boot (): Promise<void> {
    // IoC container is ready
  }

  public async ready (): Promise<void> {
    // App is ready
  }

  public async shutdown (): Promise<void> {
    // Cleanup, since app is going down
  }
}
