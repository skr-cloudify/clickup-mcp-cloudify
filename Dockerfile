# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (skip prepare script since we're copying pre-built files)
RUN npm ci --only=production --ignore-scripts

# Copy the pre-built application
COPY build ./build

# Expose the desired port (SSE server runs on port 3231 by default)
EXPOSE 3231

# Define the command to run the application
CMD ["node", "build/index.js"]
