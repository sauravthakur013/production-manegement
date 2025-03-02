// ./middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "js-cookie";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
  const isLoggedIn = request.cookies.get("token")?.value ? true : false; // Adjust cookie name and value as needed
  const pathname = request.nextUrl.pathname;
  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(pathname);

  // Scenario 1: User is logged in and trying to access a public page (/login, /register)
  if (isPublicPath && isLoggedIn) {
    console.log("Redirecting from public page to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  // Scenario 2: User is NOT logged in and trying to access a protected page.
  if (!isPublicPath && !isLoggedIn) {
    console.log("Redirecting from protected page to login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Scenario 3: User IS logged in and trying to access the dashboard.  Allow access.  No redirect needed.
  if (pathname === "/dashboard" && isLoggedIn) {
    console.log("User is logged in and accessing dashboard. Allowing access.");
    return NextResponse.next(); // Allow access. No redirect needed.
  }

  // Scenario 4: User is NOT logged in and trying to access the home page ("/"). Redirect to login.
  if (pathname === "/" && !isLoggedIn) {
    console.log(
      "User is NOT logged in and accessing home page. Redirecting to login."
    );
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/profile", "/login", "/register", "/"], // Add all protected routes
};
