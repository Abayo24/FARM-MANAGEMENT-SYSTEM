# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]