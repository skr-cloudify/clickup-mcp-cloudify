# Use a Node.js base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY src ./src
COPY tsconfig.json ./

# Build the project
RUN npm run build

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
