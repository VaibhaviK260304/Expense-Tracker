# Use the official Node.js image as the base image for stability and security
FROM node:20-slim

# Create the working directory inside the container for the application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first.
# This step is cached, so Docker won't re-run npm install unless these files change.
COPY package*.json ./

# Install application dependencies
# This creates the node_modules directory inside the container
RUN npm install

# Copy the rest of the application code into the container.
# This includes index.js, the controllers, models, and the crucial .env file.
COPY . .

# Expose the port the app runs on (5000, as defined in index.js)
EXPOSE 5000

# Command to run the application when the container starts.
# We use 'node' directly, NOT 'nodemon', for production environments.
CMD [ "node", "index.js" ]
