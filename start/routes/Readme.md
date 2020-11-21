## Routes

Routes are used to map controller actions to their api endpoint and register any middleware.

The key difference from NestJS is that adonis does not use decorator bindings to map controller to routes. Decorator approach is absolutely cleaner, and this is harder to maintain as endpoints are defined in two places (assuming controllers have no logic inside them other than passing requests to context independent parts).

However, this approach comes with a big benefit - and it is boot time. When using mid-sized nest app, you would wait about 30 s to boot in standard mode, and it would be almost unusable in debug mode. That happens because all controller are loaded on boot to map endpoints.

Adonis app, however will load almost instantly, even in debug mode, even when transpiling typescript on hot reload. That happens because routes (and most of adonis app) is not loaded on boot, but the first time a particular module is used. This adds some time runtime, but only on first few requests after boot.

Instead of importing controllers, we provide strings with controller and action name. It is more error-prone work, but ability to turn app in debug mode more than makes up for it. 
