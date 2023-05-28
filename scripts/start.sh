#!/bin/bash
set -x

# Build the Docker image
docker build -t nestjs-boilerplate .

echo "running docker at $PWD"

# Run the Docker container
docker run -d --name nestjs-boilerplate --restart unless-stopped -p 3000:3000 -v /full/path/to/host/config:/app/config nestjs-boilerplate

# Prune unused images
docker image prune -a --force
