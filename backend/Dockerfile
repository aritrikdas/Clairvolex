# Stage 1: Build
FROM node:20 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Stage 2: Run
FROM node:20

WORKDIR /usr/src/app

# Copy built node modules and binaries without including the rest of the app's source code
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run your app
CMD [ "npm", "start" ]