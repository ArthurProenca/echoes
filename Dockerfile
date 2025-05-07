# Step 1: Use the official Node.js image as the base image
FROM node:22-alpine AS builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Create a production-ready image
FROM node:22-alpine

# Step 8: Set the working directory in the container
WORKDIR /app

# Step 9: Copy only the necessary files from the build stage
COPY --from=builder /app /app

# Step 10: Expose the port the app runs on
EXPOSE 3000

# Step 11: Run the app in production mode
CMD ["npm", "start"]
