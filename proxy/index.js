"use strict";

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(
  "/**",
  createProxyMiddleware({
    target: "https://ftx.com",
    changeOrigin: true,
    logLevel: "debug",
    headers: {
      Connection: "keep-alive",
    },
  })
);
app.listen(process.env.PORT || 8080);
