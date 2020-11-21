import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get(`/`, `MoviesController.index`);
}).prefix(`movies`);
