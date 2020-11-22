// The problem in adonis currently, is that BaseModel does not implement LucidModel interface from typescript standpoint
// So a lot of generic arguments wont work. This goes to fix that

import * as LucidModelModule from '@ioc:Adonis/Lucid/Model';
import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
// eslint-disable-next-line @typescript-eslint/no-type-alias,@typescript-eslint/no-empty-interface
interface LucidModelTemp extends LucidModelModule.LucidModel {}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class LucidModelTemp extends BaseModel {}
export = LucidModelTemp;

