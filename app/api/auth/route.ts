import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "decap_oauth_state";

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "Server is missing OAUTH_GITHUB_CLIENT_ID. Set it in your environment and redeploy.",
      { status: 500 },
    );
  }

  const state = crypto.randomUUID();
  const redirectUri = `${request.nextUrl.origin}/api/callback`;

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/api",
  });

  return response;
}
