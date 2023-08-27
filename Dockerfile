# Use the official Node.js image as base
FROM node:16

# Set the working directory to /src
WORKDIR /src

# Copy enviroment variables
COPY .env ./

# Copy package.json
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Bundle app source
COPY . .

# RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Start the app
CMD [ "npm", "start" ]
