import Route from "@ioc:Adonis/Core/Route";
import { bindModuleController } from './bindModuleController';

Route.group(() => {
  bindModuleController(`get`, `/`, `Movie`, `comment`, `index`);
  bindModuleController(`post`, `/`, `Movie`, `comment`, `create`);
}).prefix(`comments`);
