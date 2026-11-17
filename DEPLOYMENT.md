# Deploying MoveMantra for free

**Recommended host: Cloudflare Pages.**

- **Free plan allows commercial sites.** Vercel's free Hobby plan is for non-commercial personal use only, and a physiotherapy business site counts as commercial.
- **Unlimited bandwidth and requests** for static sites like this one.
- **Fast in India**, because Cloudflare has data centres in Kolkata, Mumbai, Delhi, Chennai and other Indian cities.
- **Automatic deploys** each time you push to GitHub, plus free HTTPS.
- **SPA routing works out of the box.** Links like `/contact` and `/services/pain-management` load correctly when opened directly or refreshed.

The main free-plan limit is 500 builds a month, which is far more than a small site needs. You can check current limits at <https://developers.cloudflare.com/pages/platform/limits/>.

---

## Step 0 – What you need

1. A **GitHub** account: <https://github.com/signup>
2. A **Cloudflare** account: <https://dash.cloudflare.com/sign-up> (free, no card needed)
3. **Git** installed on your computer. Check by running `git --version` in a terminal. If it is not installed, download it from <https://git-scm.com/download/win>.

## Step 1 – Final check before uploading

In `src/data/siteConfig.js`:

- Replace the placeholder **email** (`hello@movemantra.example`) with your real address.
- Check the **hours**.
- Leave `siteUrl` as it is for now. You will update it in Step 5, once you know your live address.

Then confirm that the site builds:

```bash
cd C:\Users\TAPALINA\movemantra
npm run build
```

It should finish with `✓ built in …`.

## Step 2 – Put the code on GitHub

1. Go to <https://github.com/new>.
   - **Repository name:** `movemantra`
   - Visibility: either works. Choose **Private** if you would rather not share the code.
   - **Do not** tick "Add a README", ".gitignore" or "license". The project already has these.
   - Click **Create repository**.

2. In a terminal, run the commands below. Replace `YOUR-USERNAME` with your GitHub username.

   ```bash
   cd C:\Users\TAPALINA\movemantra
   git init
   git add .
   git commit -m "Initial MoveMantra website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/movemantra.git
   git push -u origin main
   ```

   The first time you push, a browser window asks you to sign in to GitHub. Approve it.

   If Git asks who you are, run these two commands and then repeat the `git commit` line:

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```

3. Refresh the repository page on GitHub. You should see `src/`, `public/`, `package.json` and the other files. You should **not** see `node_modules/` or `dist/`, because `.gitignore` excludes them.

## Step 3 – Connect Cloudflare Pages

1. Log in at <https://dash.cloudflare.com>.
2. In the left sidebar, open **Workers & Pages**, then click **Create**.
3. Choose the **Pages** tab and click **Connect to Git** (it may be labelled "Import an existing Git repository").
   If Cloudflare shows you the *Workers* creation screen first, look for the **Pages** option or the link "Looking to deploy Pages? Get started".
4. Click **Connect GitHub** and authorise Cloudflare. You can limit access to just the `movemantra` repository.
5. Select the `movemantra` repository and click **Begin setup**.
6. Fill in the build settings:

   | Setting                | Value                                                         |
   | ---------------------- | ------------------------------------------------------------- |
   | Project name           | `movemantra` (this becomes `movemantra.pages.dev` if it is free) |
   | Production branch      | `main`                                                        |
   | Framework preset       | **React (Vite)**, or **None**                                 |
   | Build command          | `npm run build`                                               |
   | Build output directory | `dist`                                                        |

   Under **Environment variables (advanced)**, add:

   | Variable name  | Value |
   | -------------- | ----- |
   | `NODE_VERSION` | `20`  |

7. Click **Save and Deploy**. The first build takes about 1–2 minutes.

When it finishes, Cloudflare shows your live address, such as **`https://movemantra.pages.dev`**. If that name was taken, the address will have a suffix.

## Step 4 – Test the live site

Check these on your phone and on a computer:

- [ ] Home page loads with the logo and images.
- [ ] Open `https://<your-site>.pages.dev/contact` directly and refresh it. It should load the Contact page, not an error.
- [ ] The floating WhatsApp button opens a chat with **+91 60335 43736** and the prefilled message.
- [ ] "Call" buttons dial **+91 87875 74657**.
- [ ] The map shows South Kolkata.
- [ ] The mobile menu opens and closes.

## Step 5 – Set the real site address (important for SEO)

1. In `src/data/siteConfig.js`, set `siteUrl` to your live address, with no trailing slash:

   ```js
   siteUrl: 'https://movemantra.pages.dev',
   ```

2. Save the file, then push the change:

   ```bash
   git add .
   git commit -m "Set live site URL"
   git push
   ```

Cloudflare rebuilds and redeploys automatically within a couple of minutes. `sitemap.xml`, `robots.txt`, canonical links and social-share previews will all use the correct address.

**From now on, every `git push` to `main` updates the live site.** Nothing else is needed.

## Step 6 – Get found on Google (free, recommended)

1. **Google Search Console** (<https://search.google.com/search-console>)
   - Add a property using the **URL prefix** option and your live address.
   - Verify it using the **HTML tag** method. To do that, paste the tag into `index.html` inside `<head>`, then push.
   - Open **Sitemaps** and submit `sitemap.xml`.
2. **Google Business Profile** (<https://business.google.com>)
   - Create a profile for MoveMantra as a *service-area business* covering South Kolkata. Add your phone, WhatsApp, hours and website link.
   - This is the single most effective free step for appearing in "physiotherapy at home near me" searches.

## Step 7 (optional) – Use your own domain

The `pages.dev` address is free forever. If you later buy a domain such as `movemantra.in`, which costs roughly ₹500–900 a year from any registrar:

1. In Cloudflare, go to **Workers & Pages → movemantra → Custom domains → Set up a custom domain**, and follow the prompts.
2. Update `siteUrl` to the new domain and push.

---

## Troubleshooting

| Problem                                          | Fix                                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Build fails with an engine or Node version error | Make sure the `NODE_VERSION = 20` variable is set (Settings → Variables), then retry the deployment. |
| Site shows a blank page                          | Check the build output directory is `dist`, not `build` or `/`.                           |
| `git push` is rejected                           | You probably ticked "Add a README" when creating the repo. Run `git pull origin main --allow-unrelated-histories`, then push again. |
| Changes do not appear                            | Look in Cloudflare → your project → **Deployments** for the latest build. Hard-refresh the browser with Ctrl+F5. |
| Map does not appear                              | Some ad-blockers block Google Maps. The site shows an "Open in Google Maps" link instead. |

## Other free options (for reference)

- **Netlify:** good alternative with a similar setup. Add a file `public/_redirects` containing `/* /index.html 200` so direct links work. Its free plan now uses monthly usage credits.
- **Vercel:** excellent, but its free Hobby plan does **not** allow commercial use.
- **GitHub Pages:** free, but it does not support this site's clean URLs without workarounds. Not recommended.
