import { model, Schema, Model, Document } from 'mongoose';

export interface IMigration extends Document {
  name: string;
}

const MigrationSchema: Schema = new Schema({
  name: { type: String, required: true }
});

export const Migration: Model<IMigration> = model('_Migration', MigrationSchema);
