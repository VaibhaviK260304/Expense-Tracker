# --- STAGE 1: Build the React Application ---
# We use node:lts-alpine as it is slightly different from 18-alpine and might avoid the cert issue.
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# Use 'npm ci' for clean installs in automated environments
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build


# Use the official Nginx image 
FROM nginx:alpine

# Copy the build output from the builder stage to the Nginx serving path
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# The default command runs Nginx, which serves the frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
