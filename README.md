# Selenium + Percy starter

This project uses Selenium WebDriver with Percy to snapshot a list of URLs defined in `urls.json`. 
Each snapshot is taken at 1600 pixels width. You can run in Chrome, Firefox, Edge, and Safari.

## Setup

1. Install Node 20 or newer.
2. Install dependencies:
   ```bash
   npm i
   ```
3. Create a Percy project and copy the project token. Set it in your shell:
   ```bash
   export PERCY_TOKEN=<your-percy-project-token>
   ```
4. (macOS only for Safari) Enable SafariDriver once:
   ```bash
   safaridriver --enable
   ```

## Run locally

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge      # requires Microsoft Edge installed
npm run test:safari    # macOS only
npm run test:all       # runs the four in sequence
```

Edit `urls.json` to add or rename items. The `name` field becomes the snapshot name in Percy.

## CI with GitHub Actions

This repo includes a workflow at `.github/workflows/percy-selenium.yml`:
- Linux job runs Chrome and Firefox
- macOS job runs Safari
- Edge is commented and can be added on a Windows runner with Edge installed

Create the repository secrets:
- `PERCY_TOKEN`
