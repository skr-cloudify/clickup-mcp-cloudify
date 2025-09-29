#!/bin/bash
# This script completely prevents Docker usage
echo "Removing any Docker files..."
find . -name "Dockerfile*" -delete 2>/dev/null || true
find . -name "*.dockerfile" -delete 2>/dev/null || true
find . -name "docker-compose*" -delete 2>/dev/null || true
echo "Docker files removed. Using Node.js runtime."
