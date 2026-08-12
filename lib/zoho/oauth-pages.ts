import "server-only";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; color: #112136; line-height: 1.5; }
    h1 { font-size: 1.25rem; margin-bottom: 0.75rem; }
    p { margin: 0.75rem 0; }
    textarea { width: 100%; min-height: 6rem; font-family: ui-monospace, monospace; font-size: 0.85rem; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
    .ok { color: #0f766e; }
    .err { color: #b91c1c; }
    .note { font-size: 0.875rem; color: #475569; }
  </style>
</head>
<body>
  ${body}
</body>
</html>`;
}

export function zohoOAuthErrorPage(message: string): string {
  return layout(
    "Zoho OAuth Error",
    `<h1 class="err">Zoho OAuth failed</h1><p>${escapeHtml(message)}</p><p class="note">No authorization code or token details are shown here.</p>`,
  );
}

export function zohoOAuthSuccessPage(options: {
  showRefreshToken: boolean;
  refreshToken?: string;
}): string {
  if (options.showRefreshToken && options.refreshToken) {
    return layout(
      "Zoho OAuth Success",
      `<h1 class="ok">Refresh token generated</h1>
<p>Copy the value below into <code>ZOHO_REFRESH_TOKEN</code> in Vercel and your local <code>.env.local</code>.</p>
<p class="note"><strong>Important:</strong> This page is shown once. Do not share this value. Do not commit it to git.</p>
<label for="refresh-token">ZOHO_REFRESH_TOKEN</label>
<textarea id="refresh-token" readonly>${escapeHtml(options.refreshToken)}</textarea>
<p class="note">After saving the token, remove or rotate <code>ZOHO_OAUTH_SETUP_SECRET</code> if no longer needed.</p>`,
    );
  }

  return layout(
    "Zoho OAuth Success",
    `<h1 class="ok">Authorization complete</h1>
<p>The authorization code was exchanged successfully.</p>
<p class="note">If you expected a refresh token here, restart bootstrap from <code>/api/zoho/oauth/start</code> with your setup secret while the bootstrap cookie is set.</p>`,
  );
}
