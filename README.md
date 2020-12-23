# East Mongoose

This is a [mogoose](https://mongoosejs.com/) adapter for the [east](https://github.com/okv/east) database migration tool. It has been influenced by the East [mongo](https://github.com/okv/east-mongo) adapter. This adapter is written and currently targets typescript projects.

Migrations receive an object with the following properties:
* `db` - an instance of Mongoose [Connection](https://mongoosejs.com/docs/api/connection.html)

There are also some Typescript [migration templates](migrationTemplates) which are not transpiled.


## Installation

```sh
yarn add east-mongoose
```

## Usage

Typescript migration
```ts
import { Connection } from "mongoose";
export const tags = [];
export const migrate = async ({ db }: { db: Connection }): Promise<void> => {
  return Promise.resolve();
};

exports.rollback = async ({ db }: { db: Connection }): Promise<void> => {
  return Promise.resolve();
};
```
## Licence
MIT
