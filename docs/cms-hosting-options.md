# CMS Hosting Options

Client has GoDaddy with cPanel access. Decap CMS's default `git-gateway` backend is Netlify-only, so we need an alternative approach. Two options explored:

---

## Option 1: GitHub Backend + PHP OAuth Proxy on cPanel

Swap Decap's backend from `git-gateway` to `github`. Decap talks directly to the GitHub API from the browser, but still needs a small server to handle the OAuth token exchange (the client secret can never be in the browser). That proxy lives on cPanel as a PHP script.

### How the auth flow works

```
Editor visits /admin
  → clicks "Login with GitHub"
  → browser redirects to github.com/login/oauth/authorize
  → user approves
  → GitHub redirects to yourdomain.com/oauth/callback?code=abc123
  → PHP script exchanges code + client_secret for access_token (server-side)
  → token passed back to Decap via postMessage
  → Decap uses token for all GitHub API calls directly
```

### Setup steps

1. **Register a GitHub OAuth App** at `github.com/settings/developers`
   - Set callback URL to `https://yourdomain.com/oauth/callback`
   - Note the `client_id` and `client_secret`

2. **Deploy PHP proxy to cPanel** — two files:
   - `/oauth/index.php` — redirects to GitHub's OAuth authorization URL
   - `/oauth/callback/index.php` — exchanges code for token, posts back to Decap

3. **Update `public/admin/config.yml`:**

```yaml
backend:
  name: github
  repo: your-org/your-repo
  branch: main
  base_url: https://yourdomain.com/oauth
```

### Pros / Cons

| Pros                                           | Cons                                             |
| ---------------------------------------------- | ------------------------------------------------ |
| Everything on client's existing infrastructure | Requires writing/maintaining PHP files on cPanel |
| No Netlify account needed                      | More initial setup than Option 2                 |
| No ongoing cost                                |                                                  |

---

## Option 2: Hybrid — GoDaddy Hosts the Site, Netlify Handles CMS Auth

Keep Netlify (free tier) purely for Netlify Identity + Git Gateway. The live site is served from GoDaddy. Editors log into the CMS via Netlify's URL or a subdomain CNAME'd to Netlify.

When an editor saves in Decap, it commits to GitHub. GitHub Actions picks up the commit, builds the project, and deploys to GoDaddy via FTP/SFTP.

### Architecture

```
Editor saves in Decap (on Netlify free tier)
  → commit pushed to GitHub
  → GitHub Actions: pnpm validate + pnpm build + FTP to GoDaddy
  → live site on GoDaddy updates (~2-3 min)
```

### Admin URL

You can't CNAME a path (`yourdomain.com/admin`) — DNS doesn't work at the path level. Options:

- Editors use `yoursite.netlify.app/admin` directly
- Set up `cms.yourdomain.com` as a CNAME to `yoursite.netlify.app` (cleaner)

### `public/.htaccess` (required for React Router on Apache/GoDaddy)

Create this file so GoDaddy doesn't 404 on client-side routes:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

This file lives in `public/` and gets copied into `dist/` on build automatically.

### GitHub Secrets to add

In GitHub repo → Settings → Secrets and variables → Actions:

| Secret         | Where to find it                                    |
| -------------- | --------------------------------------------------- |
| `FTP_HOST`     | cPanel → FTP Accounts, usually `ftp.yourdomain.com` |
| `FTP_USERNAME` | cPanel username or a dedicated FTP account          |
| `FTP_PASSWORD` | Password for that FTP account                       |

---

### Deploy Workflow — Option A: lftp (recommended, no third-party action)

`ubuntu-latest` has `lftp` available via apt. No external GitHub Actions needed — lower supply chain risk.

**If GoDaddy supports SFTP (preferred):**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GoDaddy

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run config validation
        run: pnpm validate

      - name: Build project
        run: pnpm build

      - name: Deploy via SFTP
        env:
          SFTP_HOST: ${{ secrets.FTP_HOST }}
          SFTP_USERNAME: ${{ secrets.FTP_USERNAME }}
          SFTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
        run: |
          sudo apt-get install -y sshpass lftp
          lftp -u "$SFTP_USERNAME","$SFTP_PASSWORD" sftp://"$SFTP_HOST" <<EOF
            set sftp:auto-confirm yes
            set net:max-retries 3
            mirror --reverse --delete --verbose ./dist/ /public_html/
          EOF
```

**If GoDaddy only has FTP (fallback):**

```yaml
- name: Deploy via FTPS
  env:
    FTP_HOST: ${{ secrets.FTP_HOST }}
    FTP_USERNAME: ${{ secrets.FTP_USERNAME }}
    FTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
  run: |
    sudo apt-get install -y lftp
    lftp -u "$FTP_USERNAME","$FTP_PASSWORD" ftps://"$FTP_HOST" <<EOF
      set ftp:ssl-force true
      set ssl:verify-certificate no
      set net:max-retries 3
      mirror --reverse --delete --verbose ./dist/ /public_html/
    EOF
```

---

### Deploy Workflow — Option B: SamKirkland/FTP-Deploy-Action (pinned)

More convenient but relies on a third-party action. If used, **always pin to a full commit SHA** — tags are mutable and can be overwritten in a supply chain attack.

```yaml
- name: Deploy to GoDaddy via FTP
  uses: SamKirkland/FTP-Deploy-Action@6d7d3c3e6a78b1a07c98b5be6e93f3fd8e06754d # v4.3.5
  with:
    server: ${{ secrets.FTP_HOST }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    local-dir: ./dist/
    server-dir: /public_html/
    protocol: ftps
    exclude: |
      **/.git*
      **/.git*/**
      **/node_modules/**
```

> **Note:** Verify the SHA above against the actual repo before using. The SHA shown is illustrative — grab the real one from github.com/SamKirkland/FTP-Deploy-Action/releases.

---

## Decision Factors

| Question                                                    | Points to                                               |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| Does client actually use cPanel features (email, PHP apps)? | Option 2 if yes, otherwise consider Netlify fully       |
| Want zero new services/accounts?                            | Option 1 (PHP proxy on existing cPanel)                 |
| Want simplest auth setup?                                   | Option 2 (Netlify Identity unchanged)                   |
| How often do editors publish?                               | Frequent = Option 1 (no FTP delay); Infrequent = either |
