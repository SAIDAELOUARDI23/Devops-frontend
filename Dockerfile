# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json /app

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./app

# Expose the port on which the app will run (default for React is 3000)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run","start"]
