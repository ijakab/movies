import Route from "@ioc:Adonis/Core/Route";
import { bindModuleController } from './bindModuleController';

Route.group(() => {
  bindModuleController(`get`, `/`, `Movie`, `movie`, `index`);
  bindModuleController(`post`, `/`, `Movie`, `movie`, `create`);
}).prefix(`movies`);
