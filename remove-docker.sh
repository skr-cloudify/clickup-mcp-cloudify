#!/bin/bash
# This script prevents Docker usage except for our error Dockerfile
echo "Checking for Docker files..."
find . -name "Dockerfile.*" -delete 2>/dev/null || true
find . -name "*.dockerfile" -delete 2>/dev/null || true
find . -name "docker-compose*" -delete 2>/dev/null || true
echo "Unwanted Docker files removed. Dockerfile remains to show error message."
