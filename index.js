"use strict";

const cctx = require("ccxt");

const ftx = new cctx.ftx({
  apiKey: process.env.FTX_API_KEY,
  secret: process.env.FTX_SECRET,
});

ftx
  .privateGetSpotMarginLendingInfo()
  .then(function ({ result }) {
    const updatingOffers = result
      .filter(({ lendable }) => lendable)
      .map(function ({ coin, lendable }) {
        return ftx.privatePostSpotMarginOffers({
          coin,
          size: lendable,
          rate: 1e-6,
        });
      });
    return Promise.all(updatingOffers);
  });
