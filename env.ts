/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env';

// we disable lint convention naming, as we do want to enforce camelCase variable naming, but env vars should be uppercase
export default Env.rules({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  HOST: Env.schema.string({ format: `host` }),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PORT: Env.schema.number(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  APP_KEY: Env.schema.string(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  APP_NAME: Env.schema.string(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NODE_ENV: Env.schema.enum([`development`, `production`, `testing`] as const),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DB_NAME: Env.schema.string(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DB_DEBUG: Env.schema.boolean(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  OMDB_API_KEY: Env.schema.string(),
});
