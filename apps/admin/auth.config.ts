import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith("/");
      const isOnAuthPage = nextUrl.pathname.startsWith("/auth");

      if (isOnAdminPanel) {
        if (isLoggedIn && auth.user.role === "ADMIN") return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isOnAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      return true;
    },
  },
  providers: [], // Add providers in auth.ts
};