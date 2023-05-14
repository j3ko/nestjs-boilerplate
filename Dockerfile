# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies
RUN yarn install

# Build the NestJS app
RUN yarn build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app when the container starts
CMD [ "yarn", "start:prod" ]
