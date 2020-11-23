# Movie library

This is a testing project, built on top of [Adonis 5](https://preview.adonisjs.com/guides/quick-start) and postgres

## Installation

1. Clone this repository and enter it

1. Make sure nothing is running on ports 5432 and 8000

#### The easiest way:

run `docker-compose up -d`

App should be served on port 8000

#### Manual way:

1. run `npm i`

1. Have postgres up and running and prepare a clean database

1. run `cp .env.example .env` and edit environmental variables, such as database name

1. run `node ace migration:run` to migrate database

1. run `node ace serve` to serve application on port specified in .env

## Additional instructions

There are multiple Readme.md files in code, and comments trying to explain what is being done.

## General architecture

Code is split into modules and common module. Each module will provide specific logic while common will hold common logic to be reused.

### Context-dependent provisioner

Request first comes to request handlers - middleware and controllers. These are HttpContext dependent, so we do not write any logic there - they will delegate work elsewhere.

Controllers need to be treated simply as a way for a world to communicate with logic, never have logic itself. Any logic must be context-independent, in order to work when context changes.

In other words, if we build a specific logic on Http controllers, we would have a hard time running it on custom event, as a response to other action, custom command etc, scheduled job etc.

Those communicators with the world I call "context-dependent" provisioner, and they can naver provide logic.

### Logic provisioners (Services)

Services sit in between context-dependent provisioner (in this case, http controllers) and models, and provide most of the logic. They also use validators to decouple validation logic.

Services must always remain context independent - if they need some outside input, it will be passed as argument, not the state. That way we ensure reusability, in case code ever needs to run outside of (in this case) http lifecycle - e.g. cron job

Services can have a state, which defines a single service instance. IN this app, service state is database transaction - all operations will use a single database transaction. This is an example but it can grow to - permission scopes, validation scopes etc.

All states need to be modifiable and even need to be able to turn off - e.g. service should work weather or not it is provided database transaction.

Service caller (context dependent provisioners) are responsible for defining service state - service does not know when a single "something" (be it request or event or something else) is over, therefore it cannot commit database transaction

### Database models

Models are directly tied to database, and provide abstraction for common database operations, relationship loading, data serialization etc.

However, they are consistet mostly of static functions, and it would not be easy to implement logic provider states, therefore they are not used directly, but rather wrapped inside services, that can be instantiated whenever context provider needs it, and different instances will not collide with each other.

In simpler words, we need services as they can be instantiated, and two different requests will use different service instance.

## Why adonis

While not perfect, in my opinion best of node.js frameworks. Some key benefits over NestJS

- Lucid orm is both simpler (read more easily reusable) then TypeORM 
    - no need for aliases (but possible)
    - binding from function params instead from :key string part, reduces chance for sql injection and eliminates a problem when using same key multiple times in single query builder
    - much better performant when serializing queries (typeorm would often destroy the cpu on bigger data chunks).
        - That is because it handles queries differently. It does come at a cost - ordering by a field nested in a relation can be tricky.
- Much faster boot time - explained in routes/Readme
