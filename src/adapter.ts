import { Adapter } from "east";
import path from "path";
import { Connection, connect, connection, disconnect } from "mongoose";

import { Migration } from "./migration"

interface Props {
  mongooseConnection: Connection;
}

class MongooseAdapter implements Adapter<Props> {
  options: Record<string, unknown>;
  url: string;
  db: Connection | null;

  constructor({ url, options }: { url: string, options: Record<string, unknown> }) {
    this.url = url;
    this.options = { useNewUrlParser: true, useUnifiedTopology: true, ...options };
    this.db = null;
  }

  getTemplatePath(fileExtension: string): string {
    if (!['js', 'mjs', 'ts'].includes(fileExtension)) {
      throw new Error(
        `Adapter doesn't provide template ".${fileExtension}" source files`
      );
    }
    return path.join(__dirname, 'migrationTemplates', `async.${fileExtension}`);
  }

  connect(): Promise<Props> {
    return new Promise((resolve, reject) => {
      try {
        connect(this.url, this.options);
        const db = connection;

        db.on("error", (e: Error) => {
          console.log("MongooseAdapter error", e);
        });

        db.once("open", async () => {
          console.log("MongooseAdapter connected");
          this.db = db;
          resolve({ mongooseConnection: db });
        });
      } catch (error) {
        console.log("MongooseAdapter error", error);
        reject(error);
      }
    });
  }

  disconnect(): Promise<void> {
    return Promise.resolve()
      .then(() => {
        if (this.db) {
          disconnect();
          this.db = null;
          console.log("MongooseAdapter disconnected");
        }
      });
  }

  getExecutedMigrationNames(): Promise<string[]> {
    return Promise.resolve()
      .then(async () => Migration.find())
      .then((items) => items.map((item) => item.name))
  }

  markExecuted(name: string): Promise<void> {
    return Promise.resolve()
      .then(() => Migration.replaceOne({ name: name }, { name: name }, { upsert: true }))
      .then(result => console.log("result", result))
  }

  unmarkExecuted(name: string): Promise<void> {
    return Promise.resolve()
      .then(() => Migration.deleteOne({ name: name }))
      .then(result => console.log("result", result));
  }
}

export = MongooseAdapter;