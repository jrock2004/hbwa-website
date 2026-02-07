# HBWA Website

The official website for the Honey Brook Water Association.

## Table of Contents

- [For Non-Developers: Updating Site Content](#for-non-developers-updating-site-content)
  - [Configuration Guide →](docs/configs.md)
- [For Developers: Setup & Architecture](#for-developers-setup--architecture)

---

## For Non-Developers: Updating Site Content

The website content is managed through simple JSON configuration files. You can update these files to change what appears on the website—no coding knowledge required!

**📖 [Complete Configuration Guide →](docs/configs.md)**

### Quick Start

1. **Find the config files** in the `public/` folder
2. **Edit the file** you want to change (use VS Code for helpful autocomplete)
3. **Validate your changes** by running: `pnpm validate`
4. **Deploy** by committing and pushing to the main branch

### Available Configuration Files

- **`site.json`** - Basic site information (name, email, address)
- **`meta.json`** - Page titles & descriptions for SEO
- **`alerts.json`** - Homepage announcements and alerts
- **`rates.json`** - Water rates and fees
- **`governance.json`** - Board members and their roles
- **`links.json`** - Useful external links
- **`documents.json`** - Downloadable documents (bylaws, minutes, etc.)
- **`pictures.json`** - Photo gallery images

For detailed examples and editing tips, see the **[Configuration Guide](docs/configs.md)**

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

# Validate all config files
pnpm validate

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Architecture

This project uses a **JSON-as-CMS** approach, allowing non-developers to manage content through JSON configuration files.

#### Key Components

1. **Config Files** (`public/*.json`)
   - 8 JSON files store all site content
   - Served as static assets
   - Editable by non-developers

2. **Zod Schemas** (`src/config/*.ts`)
   - Define and validate the structure of each config file
   - Provide TypeScript types
   - Located in: `siteConfig.ts`, `metaConfig.ts`, `alertsConfig.ts`, etc.

3. **JSON Schemas** (`schemas/*.json`)
   - JSON Schema files for IDE autocomplete
   - VS Code integration via `.vscode/settings.json`

4. **Config Hooks** (`src/hooks/`)
   - `useJsonConfig<T>` - Generic hook for loading and validating configs
   - 7 specialized hooks delegate to `useJsonConfig`:
     - `useSiteConfig()`, `useMetaConfig()`, `useAlertsConfig()`, etc.
   - Some use adapters to transform the data

5. **Validation Script** (`scripts/validate-configs.ts`)
   - Validates all 8 config files against Zod schemas
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
│   ├── documents/             # Downloadable PDFs
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

### Deployment

The site is deployed on **Netlify**:

1. Push to the `main` branch
2. Netlify runs: `pnpm validate && pnpm build`
3. If validation fails, the build is aborted
4. If successful, the site is deployed

### Adding New Config Files

To add a new config file:

1. Create the JSON file in `public/`
2. Define a Zod schema in `src/config/`
3. Create a JSON Schema file in `schemas/` (optional, for IDE support)
4. Create a custom hook or use `useJsonConfig` directly
5. Add validation to `scripts/validate-configs.ts`
6. Update `.vscode/settings.json` for autocomplete

### Contributing

1. Make your changes
2. Run `pnpm validate` to check config files
3. Run `pnpm build` to ensure the build works
4. Test locally with `pnpm preview`
5. Commit and push

---

## License

MIT License - see LICENSE file for details
