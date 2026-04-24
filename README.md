# HBWA Website

The official website for the Honey Brook Water Association.

## Table of Contents

- [For Non-Developers: Updating Site Content](#for-non-developers-updating-site-content)
  - [Configuration Guide →](docs/configs.md)
- [For Developers: Setup & Architecture](#for-developers-setup--architecture)

---

## For Non-Developers: Updating Site Content

Website content is managed through the **Decap CMS admin panel** — no coding required.

**📖 [Content Management Guide →](docs/configs.md)**

### Quick Start

1. Go to [https://hbbawater.com/admin](https://hbbawater.com/admin)
2. Log in with your Netlify Identity account
3. Select the section you want to edit and save your changes
4. The site redeploys automatically (usually 1–2 minutes)

See the **[Content Management Guide](docs/configs.md)** for a full walkthrough.

---

## For Developers: Setup & Architecture

### Tech Stack

- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Zod 4** - Runtime validation
- **pnpm** - Package manager

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start dev server + Decap CMS proxy (for local CMS editing)
pnpm dev:cms

# Validate all config files
pnpm validate

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Architecture

This project uses a **JSON-as-CMS** approach — 7 JSON files in `public/` store all site content, and **Decap CMS** provides a web UI for editing them without touching code.

#### Key Components

1. **Config Files** (`public/*.json`)
   - 7 JSON files store all site content
   - Served as static assets
   - Edited by non-developers via the Decap CMS admin UI

2. **Decap CMS** (`public/admin/`)
   - `index.html` + `config.yml` define the admin UI
   - Uses git-gateway backend — saves directly to the repo
   - Accessible at `/admin` in production, or locally via `pnpm dev:cms`
   - Requires Netlify Identity + Git Gateway enabled in Netlify dashboard

3. **Zod Schemas** (`src/config/*.ts`)
   - Define and validate the structure of each config file
   - Provide TypeScript types
   - Located in: `siteConfig.ts`, `metaConfig.ts`, `alertsConfig.ts`, etc.

4. **JSON Schemas** (`schemas/*.json`)
   - JSON Schema files for IDE autocomplete when editing JSON directly
   - VS Code integration via `.vscode/settings.json`

5. **Config Hooks** (`src/hooks/`)
   - `useJsonConfig<T>` - Generic hook for loading and validating configs
   - 7 specialized hooks delegate to `useJsonConfig`:
     - `useSiteConfig()`, `useMetaConfig()`, `useAlertsConfig()`, etc.
   - Some use adapters to transform the data

6. **Validation Script** (`scripts/validate-configs.ts`)
   - Validates all 7 config files against Zod schemas
   - Runs before build in CI/CD: `pnpm validate && pnpm build`
   - Prevents invalid configs from being deployed

#### Path Alias

The project uses `@/*` as an alias for `src/*`:

```typescript
// Instead of:
import { useSiteConfig } from "../../hooks/useSiteConfig";

// You can write:
import { useSiteConfig } from "@/hooks/useSiteConfig";
```

Configured in `tsconfig.app.json` and `vite.config.ts`.

#### Zod 4 Notes

- Import: `import { z } from "zod"` or `import { email } from "zod"`
- `safeParse()` returns: `{ success, data, error }`
- Error structure: `error.issues[]` with `path` and `message`
- Use top-level `email()` function for email validation

### Project Structure

```
hbwa-website/
├── public/
│   ├── *.json                 # Config files (CMS layer)
│   ├── admin/                 # Decap CMS admin UI
│   │   ├── index.html
│   │   └── config.yml         # CMS collections & field definitions
│   ├── docs/                  # Downloadable PDFs
│   └── images/                # Gallery images
├── schemas/
│   └── *.json                 # JSON Schema files for IDE support
├── scripts/
│   └── validate-configs.ts    # Config validation script
├── src/
│   ├── components/            # React components
│   ├── config/                # Zod schemas
│   ├── hooks/                 # React hooks (including useJsonConfig)
│   └── pages/                 # Page components
├── .vscode/
│   └── settings.json          # VS Code JSON schema associations
└── netlify.toml               # Netlify deployment config
```

### CI/CD

**GitHub Actions** runs automated checks on every PR and push to main:

- Config validation (`pnpm validate`)
- TypeScript type checking (`tsc -b`)
- Linting (`pnpm lint`)
- Format checking (`pnpm format:check`)
- Build test (`pnpm build`)

**Netlify** handles deployment:

1. Push to the `main` branch
2. Netlify runs: `pnpm validate && pnpm build`
3. If validation fails, the build is aborted
4. If successful, the site is deployed

### Adding New Config Files

To add a new config file:

1. Create the JSON file in `public/`
2. Define a Zod schema in `src/config/`
3. Create a custom hook or use `useJsonConfig` directly
4. Add validation to `scripts/validate-configs.ts`
5. Add a collection to `public/admin/config.yml`
6. Optionally add a JSON Schema file in `schemas/` and register it in `.vscode/settings.json` for IDE autocomplete

### Contributing

1. Make your changes
2. Run quality checks locally:
   ```bash
   pnpm validate       # Validate config files
   pnpm lint          # Check for linting errors
   pnpm format:check  # Check code formatting
   pnpm build         # Ensure the build works
   ```
3. Test locally with `pnpm preview`
4. Create a pull request (CI will run all checks automatically)
5. Once approved and checks pass, merge to main

---

## License

MIT License - see LICENSE file for details
