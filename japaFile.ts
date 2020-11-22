import 'reflect-metadata';
import { join } from 'path';
import getPort from 'get-port';
import { configure } from 'japa';
import sourceMapSupport from 'source-map-support';

process.env.NODE_ENV = `testing`;
process.env.ADONIS_ACE_CWD = join(__dirname);
sourceMapSupport.install({ handleUncaughtExceptions: false });

async function startHttpServer (): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Ignitor } = await import(`@adonisjs/core/build/src/Ignitor`);
  process.env.PORT = String(await getPort());
  await new Ignitor(__dirname).httpServer().start();
}

// Normally, we would also use different database, run migrations before and drop after, so that tests have separate data
// But that would be overkill for this sample project :) maybe in the future
configure({
  files: [`**/*.spec.ts`],
  before: [startHttpServer],
});
