# Automated Test Suite

Playwright and TypeScript end-to-end test for a standard purchase flow on the public SauceDemo sample application.

[Playwright tests](https://github.com/Ibrahim-56/Automated_Test_Suite/actions/workflows/playwright.yml)

## Scenario

1. Sign in with the standard sample account.
2. Select three products.
3. Add them to the cart and verify the cart contains three items.
4. Enter checkout information.
5. Complete checkout and verify the confirmation message.

## Requirements

- Node.js 20 or later
- npm

## Run locally

```bash
npm install
npx playwright install chromium
npx playwright test
```

Show the browser while tests run:

```bash
npx playwright test --headed
```

The GitHub Actions workflow runs the suite on pushes and pull requests targeting `main`, then uploads the HTML report when available.

## Scope

This repository demonstrates a basic happy-path checkout test against a public demo application. It does not represent testing against a live retailer or a production payment system. The current test uses the sample account and test-only checkout details.
