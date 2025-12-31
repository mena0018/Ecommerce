# Development Dockerfile for Medusa
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Copy package files and npm config
COPY package.json pnpm-lock.yaml ./

# Install all dependencies using pnpm
RUN npm install -g pnpm 
RUN pnpm install

# Copy source code
COPY . .

# Expose the port Medusa runs on
EXPOSE 9000

# Start with migrations and then the development server
CMD ["./docker-start.sh"]