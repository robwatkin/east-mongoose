import { Connection } from "mongoose";

export const tags = [];

export const migrate = ({ db }: { db: Connection }): Promise<void> => {
  console.log(db); // delete me

	return Promise.resolve();
};

exports.rollback = ({ db }: { db: Connection }): Promise<void> => {
  console.log(db); // delete me

	return Promise.resolve();
};
