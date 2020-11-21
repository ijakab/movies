## Migrations

Migrations are used to manually provide database migration instructions. Each migration file gets executed once, and adonis stores information on previously run migrations in adonis_schema.

One of the biggest difference from typeorm is that there is no option for auto migration. That does add some manual work, however automatic migrations are not recommended on production anyway.

Additional benefits is that we get a built-in way of executing code once. Often times we need to migrate data (not just structure) on change request - e.g. one-to-many relation became many-to-many. Running those once manually on multiple environments (dev, test, production) can be a lot of work, but migrations can be a part of auto deployment and will take care that code executes once by default.
