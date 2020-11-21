import Route, { RouteContract } from '@ioc:Adonis/Core/Route';

export function bindModuleController (
  route: string,
  module: string,
  controller: string,
  method: string
): RouteContract {
  // This is a temporary fix. Adonis seems to append App/Controller/Http path before anything we send, as it is standard adonis dir structure
  // However, having modular structure is really useful in bigger projects. So this ../.. negates Controller/Http
  // Also remove Http part as I find it useless - WS controllers will probably be on separate project because they need to be deployed and scaled differently
  // Protocols other than http will usually not be supported on serverless and are probably anti pattern
  return Route.get(route, `../../Modules/${module}/Controllers/${controller}.controller.${method}`);
}
