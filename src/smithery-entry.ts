/**
 * SPDX-FileCopyrightText: © 2025 Shiva Kumar <shivakumar@domain.com>
 * SPDX-License-Identifier: MIT
 *
 * Smithery Entry Point
 *
 * This file creates a Smithery-compatible entry point that wraps our existing
 * MCP server implementation to work with the new Smithery deployment format.
 */

import { configureServer, server } from "./server.js";
import config, { validateConfig } from "./config.js";
import { z } from "zod";

// Export configuration schema for Smithery
export const configSchema = z.object({
  clickupApiKey: z.string().describe("Your ClickUp API key"),
  clickupTeamId: z.string().describe("Your ClickUp Team ID"),
});

// Export default function that Smithery expects
export default function createServer({ config: smitheryConfig }) {
  // Set environment variables from Smithery config
  if (smitheryConfig) {
    process.env.CLICKUP_API_KEY = smitheryConfig.clickupApiKey;
    process.env.CLICKUP_TEAM_ID = smitheryConfig.clickupTeamId;
    process.env.ENABLE_SSE = "true"; // Enable SSE for Smithery
  }

  // Validate configuration after setting environment variables
  const currentConfig = {
    clickupApiKey: config.clickupApiKey,
    clickupTeamId: config.clickupTeamId,
    enableSponsorMessage: config.enableSponsorMessage,
    documentSupport: config.documentSupport,
    logLevel: config.logLevel,
    disabledTools: config.disabledTools,
    enabledTools: config.enabledTools,
    enableSSE: config.enableSSE,
    ssePort: config.ssePort,
    enableStdio: config.enableStdio,
    port: config.port,
    enableSecurityFeatures: config.enableSecurityFeatures,
    enableOriginValidation: config.enableOriginValidation,
    enableRateLimit: config.enableRateLimit,
    enableCors: config.enableCors,
    allowedOrigins: config.allowedOrigins,
    rateLimitMax: config.rateLimitMax,
    rateLimitWindowMs: config.rateLimitWindowMs,
    maxRequestSize: config.maxRequestSize,
    enableHttps: config.enableHttps,
    httpsPort: config.httpsPort,
    sslKeyPath: config.sslKeyPath,
    sslCertPath: config.sslCertPath,
    sslCaPath: config.sslCaPath,
  };
  
  validateConfig(currentConfig);

  // Configure our existing server
  configureServer();

  // Return the configured server instance
  return server;
}
