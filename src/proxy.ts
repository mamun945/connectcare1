
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/lib/auth";


export async function proxy(request: NextRequest) {
  // Get current session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If user is not logged in
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in
  return NextResponse.next();
}

export const config = {
  matcher: ["/add-events","/joineventpage","/manage-events"],
};
