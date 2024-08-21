import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";

interface IUser {
  password: string;
  username: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

interface ISession {
	_id: string;
  user_id: string;
  expires_at: Date;
}

export const SessionSchema = new mongoose.Schema<ISession>({
  user_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

export const User =  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export const Session =  mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export const adapter = new MongodbAdapter(
	mongoose.connection.collection("sessions"),
	mongoose.connection.collection("users")
);