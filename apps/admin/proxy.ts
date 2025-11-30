import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Define protected routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  // const isWebRoute = nextUrl.pathname.startsWith("/");
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
  }

  // Protect web routes (optional - if you want authentication required)
  // if (isWebRoute && !isLoggedIn) {
  //   return NextResponse.redirect(new URL("/auth/signin?callbackUrl=/web", nextUrl));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};