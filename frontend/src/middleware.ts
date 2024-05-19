import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const verify = async (request: NextRequest) => {
  // const admin = getAuth(firebaseAdminApp);
  const token = request.cookies.get("token")?.value;
  if (!token) return false;
  const response = await fetch("http://localhost:3000/api/verifyToken", {
    method: "GET",
    headers: {
      cookie: `token=${token}; Secure;`,
    },
  });
  return response.ok;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = await verify(request);

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname === "/signin" || pathname === "/signup") {
    return isAuth
      ? NextResponse.redirect(new URL("/work", request.url))
      : NextResponse.next();
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
