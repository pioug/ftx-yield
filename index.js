"use strict";

const cctx = require("ccxt");

const ftx = new cctx.ftx({
  apiKey: process.env.FTX_API_KEY,
  secret: process.env.FTX_SECRET,
});

if (process.env.PROXY) {
  ftx.proxy = function (url) {
    return url.replace("https://ftx.com", process.env.PROXY);
  };
}

const lendableCoins = process.env.FTX_LENDABLE_COINS ?? "";

ftx
  .privateGetSpotMarginLendingInfo()
  .then(function ({ result }) {
    const updatingOffers = result
      .filter(({ coin }) => lendableCoins.includes(coin))
      .map(function ({ coin, lendable }) {
        const PRECISION = 1_000_000;
        return ftx.privatePostSpotMarginOffers({
          coin,
          size: Math.floor(lendable * PRECISION) / PRECISION,
          rate: 1e-6,
        });
      });
    return Promise.all(updatingOffers);
  })
  .catch(function (error) {
    console.error(error);
    process.exitCode = 1;
  });

if (process.env.PROXY) {
  const stakableTokens = process.env.FTX_STAKABLE_TOKENS ?? "";

  ftx
    .privateGetWalletBalances()
    .then(function ({ result }) {
      const stakingRequests = result
        .filter(({ coin }) => stakableTokens.includes(coin))
        .filter(({ free }) => +free)
        .map(function ({ coin, free }) {
          return ftx.privatePostSrmStakesStakes({
            coin,
            size: free,
          });
        });
      return Promise.all(stakingRequests);
    })
    .catch(function (error) {
      console.error(error);
      process.exitCode = 1;
    });
}
