# Use Node.js base image
FROM node:18-alpine

# Step 1: Set working directory
WORKDIR /app

# Step 2: Copy package.json and package-lock.json
COPY package*.json ./

# Step 3: Install dependencies (production only)
RUN npm install --production

# Step 4: Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose the port the app runs on (default 3000 for NestJS)
EXPOSE 3000

# Step 8: Define the command to run the app
CMD ["npm", "run", "start:prod"]
