# Use a Node.js base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies without running prepare script
RUN npm ci --ignore-scripts

# Copy source files
COPY src ./src
COPY tsconfig.json ./

# Install TypeScript globally and build
RUN npm install -g typescript@5.3.3
RUN tsc --version
RUN tsc

# Set permissions on the built index.js
RUN chmod +x build/index.js

# Use a smaller image for the runtime
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy the build output and dependencies from the builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port that the MCP server will run on
EXPOSE 8080

# Define the command to run the application
CMD ["node", "build/index.js"]
