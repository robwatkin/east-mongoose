import { Connection } from "mongoose";

export const tags = [];

export const migrate = async ({ db }: { db: Connection }): Promise<void> => {
  console.log(db); // delete me

  return Promise.resolve();
};

exports.rollback = async ({ db }: { db: Connection }): Promise<void> => {
  console.log(db); // delete me

  return Promise.resolve();
};
