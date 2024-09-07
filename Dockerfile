# Use official Node.js image
FROM node:18-alpine

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++ 

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which the Next.js app will run (3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
