# Configuration Files Guide

The website content is managed through simple JSON configuration files. You can update these files to change what appears on the website—no coding knowledge required!

## Table of Contents

- [How to Update Content](#how-to-update-content)
- [Configuration Files](#configuration-files)
  - [site.json](#sitejson---site-information--seo)
  - [alerts.json](#alertsjson---homepage-alerts)
  - [rates.json](#ratesjson---water-rates--fees)
  - [governance.json](#governancejson---board-members)
  - [links.json](#linksjson---useful-links)
  - [documents.json](#documentsjson---downloadable-documents)
  - [pictures.json](#picturesjson---photo-gallery)
- [Common Editing Tips](#common-editing-tips)
- [Getting Help](#getting-help)

---

## How to Update Content

1. **Locate the Configuration Files**
   - All configuration files are in the `public/` folder
   - Each file controls a different part of the website

2. **Edit the Files**
   - Open the file you want to edit in any text editor (VS Code recommended)
   - Make your changes carefully, preserving the file structure
   - Save the file

3. **Validate Your Changes**
   - Before deploying, run: `pnpm validate`
   - This checks that your changes are correct
   - If there are errors, the validation will tell you exactly what needs to be fixed

4. **Deploy Your Changes**
   - Commit your changes to git
   - Push to the main branch
   - Netlify will automatically build and deploy the updated website

---

## Configuration Files

### `site.json` - Site Information & SEO

Controls the main site details (name, email, address), homepage content (hero, quick links), and SEO metadata (page titles and descriptions for search engines).

**What's in this file:**

- `about` - About section highlights
- `ccr` - Consumer Confidence Report featured section
- `contact` - Contact information and address
- `hero` - Homepage hero section with title, tagline, and call-to-action buttons
- `meta` - SEO metadata including page titles and descriptions
  - `meta.defaults` - Default SEO settings for the entire site
  - `meta.routes` - Specific titles and descriptions for each page
- `notices` - Recent notices shown on homepage
- `quickLinks` - Quick navigation links
- `siteTitle` - Main site title

**Example (excerpt):**

```json
{
  "siteTitle": "Honey Brook Water Authority",
  "contact": {
    "email": "info@hbwaonline.com",
    "phone": "(610) 273-7830",
    "address": {
      "street": "91 Pequea Ave",
      "city": "Honey Brook",
      "state": "PA",
      "zip": "19344"
    }
  },
  "meta": {
    "defaults": {
      "siteName": "Honey Brook Water Authority",
      "titleTemplate": "%s | Honey Brook Water Authority",
      "description": "Official website for the Honey Brook Water Authority."
    },
    "routes": {
      "/": {
        "title": "Home",
        "description": "Welcome to the Honey Brook Water Authority."
      },
      "/alerts": {
        "title": "Alerts",
        "description": "Active notices and service updates."
      }
    }
  }
}
```

---

### `alerts.json` - Homepage Alerts

Displays important announcements at the top of the homepage.

**Example:**

```json
{
  "alerts": [
    {
      "id": "alert-1",
      "message": "Water main maintenance scheduled for March 15th",
      "type": "warning",
      "dismissible": true
    }
  ]
}
```

**Alert Types:**

- `"info"` - Blue background (general information)
- `"warning"` - Yellow background (important notices)
- `"error"` - Red background (urgent alerts)
- `"success"` - Green background (positive updates)

**Dismissible:**

- `true` - Users can close the alert
- `false` - Alert always shows

---

### `rates.json` - Water Rates & Fees

Lists all current water rates and fees.

**Example:**

```json
{
  "rates": [
    {
      "id": "rate-1",
      "category": "Quarterly Base Fee",
      "amount": "$150.00",
      "description": "Base service fee per quarter"
    },
    {
      "id": "rate-2",
      "category": "Usage Rate",
      "amount": "$0.50/gallon",
      "description": "Per gallon charge"
    }
  ]
}
```

---

### `governance.json` - Board Members

Lists current board members and their roles.

**Example:**

```json
{
  "boardMembers": [
    {
      "id": "member-1",
      "name": "John Smith",
      "position": "President",
      "email": "president@hbwaonline.com"
    }
  ]
}
```

---

### `links.json` - Useful Links

External links displayed on the website.

**Example:**

```json
{
  "links": [
    {
      "id": "link-1",
      "title": "NJ Water Quality Reports",
      "url": "https://example.com",
      "description": "View state water quality data"
    }
  ]
}
```

---

### `documents.json` - Downloadable Documents

Documents available for download (bylaws, meeting minutes, etc.).

**Example:**

```json
{
  "documents": [
    {
      "id": "doc-1",
      "title": "HBWA Bylaws",
      "category": "Governance",
      "fileUrl": "/documents/bylaws.pdf",
      "date": "2024-01-15",
      "description": "Official HBWA bylaws"
    }
  ]
}
```

**Note:** Upload the actual PDF/document files to the `public/documents/` folder.

---

### `pictures.json` - Photo Gallery

Photos displayed in the gallery section.

**Example:**

```json
{
  "pictures": [
    {
      "id": "pic-1",
      "title": "Water Treatment Facility",
      "imageUrl": "/images/facility.jpg",
      "caption": "Our main treatment facility",
      "category": "Facilities"
    }
  ]
}
```

**Note:** Upload the actual image files to the `public/images/` folder.

---

## Common Editing Tips

1. **Keep the Structure**
   - Don't remove commas, brackets, or quotes
   - Each item in a list needs a comma after it (except the last one)

2. **Use Valid JSON**
   - Strings must be in "double quotes"
   - Use `true` or `false` for boolean values (not "true" or "false")
   - Dates should be in format: `"YYYY-MM-DD"`

3. **Test Before Deploying**
   - Always run `pnpm validate` to check your changes
   - If you see errors, read the message carefully—it tells you the file, line, and what's wrong

4. **VS Code Helps You**
   - If you use VS Code, it will show you errors as you type
   - It will also suggest valid values based on the file structure

---

## Getting Help

If you encounter errors or have questions:

1. Check the error message from `pnpm validate`—it shows exactly what needs to be fixed
2. Make sure your JSON syntax is correct (commas, quotes, brackets)
3. Ask a developer for help if needed
