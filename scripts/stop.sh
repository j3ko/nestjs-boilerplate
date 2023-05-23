#!/bin/bash
set -x

echo "stopping docker at $PWD"

# Stop any existing container
docker container stop nestjs-boilerplate

echo "removing container"

docker container rm --force --volumes nestjs-boilerplate