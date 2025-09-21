/**
 * SPDX-FileCopyrightText: © 2025 Shiva Kumar <shivakumar@domain.com>
 * SPDX-License-Identifier: MIT
 *
 * Smithery Entry Point
 * 
 * This file creates a Smithery-compatible entry point that wraps our existing
 * MCP server implementation to work with the new Smithery deployment format.
 */

import { configureServer, server } from './server.js';
import config from './config.js';
import { z } from 'zod';

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
    process.env.ENABLE_SSE = 'true'; // Enable SSE for Smithery
  }

  // Configure our existing server
  configureServer();
  
  // Return the configured server instance
  return server;
}
