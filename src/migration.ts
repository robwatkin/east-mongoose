import { model, Schema, Document } from 'mongoose';

export interface IMigration extends Document {
  name: string;
}

const MigrationSchema = new Schema({
  name: { type: String, index: true, required: true }
});

export const Migration = model<IMigration>('_Migration', MigrationSchema);
