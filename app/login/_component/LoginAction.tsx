"use server";
import { lucia } from "@/auth/auth";
import dbConnect from "@/db/db";
import { User } from "@/model/model";
import { cookies } from "next/headers";

export const login = async (data: any) => {
  const {username, password} = data;

  await dbConnect();
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return {error: "Incorrect username or password"};
  }

  const validPassword = await new (await import("oslo/password")).Argon2id().verify(existingUser.password, password);
  if (!validPassword) {
    return {error: "Incorrect username or password"};
  }

  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  //for http
  sessionCookie.attributes = {
    ...sessionCookie.attributes,
    secure: false
  };
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  await lucia.deleteExpiredSessions();
  return {status: 200};
}