# Use an official Node.js runtime as a parent image
FROM node:lts-alpine3.16

# Set the working directory to /app
WORKDIR /app

# Copy source code
COPY . /app

# Allow volumes to be mapped
VOLUME /app/config

# Install any needed dependencies
RUN apk update && apk add python3 && apk add build-base

# Install packages
RUN yarn install

# Build the NestJS app
RUN yarn build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app when the container starts
CMD [ "yarn", "start:prod" ]
