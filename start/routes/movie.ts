import Route from "@ioc:Adonis/Core/Route";
import { bindModuleController } from './bindModuleController';

Route.group(() => {
  bindModuleController(`/`, `Movie`, `movie`, `index`);
}).prefix(`movies`);
