import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { SiteConfigSchema } from "../src/config/siteConfig.ts";
import { MetaConfigSchema } from "../src/config/metaConfig.ts";
import { AlertsSchema } from "../src/config/alertsConfig.ts";
import { RatesConfigSchema } from "../src/config/ratesConfig.ts";
import { GovernanceConfigSchema } from "../src/config/governanceConfig.ts";
import { LinksSchema } from "../src/config/linksConfig.ts";
import { DocumentsSchema } from "../src/config/documentsConfig.ts";
import { PicturesConfigSchema } from "../src/config/picturesConfig.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const configs = [
  { file: "site.json", schema: SiteConfigSchema },
  { file: "meta.json", schema: MetaConfigSchema },
  { file: "alerts.json", schema: AlertsSchema },
  { file: "rates.json", schema: RatesConfigSchema },
  { file: "governance.json", schema: GovernanceConfigSchema },
  { file: "links.json", schema: LinksSchema },
  { file: "documents.json", schema: DocumentsSchema },
  { file: "pictures.json", schema: PicturesConfigSchema },
] as const;

let failed = false;

for (const { file, schema } of configs) {
  const filePath = resolve(publicDir, file);

  if (!existsSync(filePath)) {
    console.error(`FAIL  ${file} — does not exist in public/`);
    failed = true;
    continue;
  }

  const raw = readFileSync(filePath, "utf-8");

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    console.error(`FAIL  ${file} — not valid JSON, check for missing commas or brackets`);
    failed = true;
    continue;
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    console.error(`FAIL  ${file}`);
    for (const issue of result.error.issues) {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      console.error(`      → ${path}: ${issue.message}`);
    }
    failed = true;
    continue;
  }

  console.log(`  OK  ${file}`);
}

if (failed) {
  console.error("\nValidation failed. Fix the errors above before deploying.");
  process.exit(1);
} else {
  console.log("\nAll config files are valid.");
}
