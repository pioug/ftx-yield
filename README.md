**pioug/ftx-yield** is a repository calling FTX API every ~hour (using GitHub Actions) to compound yield.

[![compound](https://github.com/pioug/ftx-yield/actions/workflows/compound.yml/badge.svg)](https://github.com/pioug/ftx-yield/actions/workflows/compound.yml)

## Usage

Define the following [_secrets_](https://docs.github.com/en/actions/reference/encrypted-secrets) on GitHub:

- `FTX_API_KEY`

  - See [FTX.com API docs](https://help.ftx.com/hc/en-us/articles/360028807171-API-docs)

- `FTX_SECRET`

  - See [FTX.com API docs](https://help.ftx.com/hc/en-us/articles/360028807171-API-docs)

- `FTX_LENDABLE_COINS`

  - Example: `BNB GME USD`
  - Caveat: [Simple string search](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) is used so putting "USD" will include "USDT" too

- `FTX_STAKABLE_TOKENS`

  - Example: `RAY SOL`
  - Caveat: [Simple string search](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) is used
