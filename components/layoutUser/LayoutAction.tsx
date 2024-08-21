"use server";
import { lucia, validateRequest } from "@/auth/auth";
import { cookies } from "next/headers";

export const logout = async () => {
    const { session } = await validateRequest();
    if (!session) {
      return {
        error: "Unauthorized"
      };
    }
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return {status : 200};
}
