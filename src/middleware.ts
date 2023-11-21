import { NextResponse } from "next/server";
import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";

const middleware = (request: NextRequestWithAuth) => {
  const isPrivateRoutes = request.nextUrl.pathname.startsWith("/dashboard");
  const isAdmin = request.nextauth.token?.role === "admin";

  if (isPrivateRoutes && !isAdmin) {
    return NextResponse.rewrite(new URL("/denied", request.url));
  }
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: "/dashboard",
};
