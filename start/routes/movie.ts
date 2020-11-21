import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get(`/`, `movie.controller.index`);
}).prefix(`movies`);
