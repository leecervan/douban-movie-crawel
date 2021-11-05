import * as mongoose from 'mongoose';

// 主演
export type UserDocument = mongoose.Document & {
  uid: string;
  name: string;
}

export const userSchema = new mongoose.Schema<UserDocument>(
  {

  },
  { timestamps: true }
)

export const User = mongoose.model<UserDocument>('actor', userSchema)
