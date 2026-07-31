import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "decap_oauth_state";

function renderHandshakePage(message: string) {
  // JSON.stringify safely escapes the payload for embedding in a script;
  // the `<` guard additionally prevents a "</script>" breakout.
  const safeMessage = JSON.stringify(message).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<html>
<head><meta charset="utf-8" /><title>Authorizing...</title></head>
<body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${safeMessage}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

  const response = new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  response.cookies.delete(STATE_COOKIE);
  return response;
}

function errorMessage(description: string) {
  return `authorization:github:error:${JSON.stringify({ message: description })}`;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const oauthError = params.get("error");

  if (oauthError) {
    return renderHandshakePage(
      errorMessage(params.get("error_description") || oauthError),
    );
  }

  const code = params.get("code");
  const state = params.get("state");
  const cookieState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !cookieState || state !== cookieState) {
    return renderHandshakePage(
      errorMessage("Invalid or expired login attempt. Please try again."),
    );
  }

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return renderHandshakePage(
      errorMessage(
        "Server is missing GitHub OAuth credentials (OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET).",
      ),
    );
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${request.nextUrl.origin}/api/callback`,
      }),
    },
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.access_token) {
    return renderHandshakePage(
      errorMessage(
        tokenData.error_description ||
          "GitHub did not return an access token.",
      ),
    );
  }

  return renderHandshakePage(
    `authorization:github:success:${JSON.stringify({
      token: tokenData.access_token,
      provider: "github",
    })}`,
  );
}
