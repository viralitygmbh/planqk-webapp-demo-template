# Use an official Node runtime as a parent image
FROM node:14-alpine

# Copy the webapp to the Nginx serve directory
WORKDIR /app/webapp
COPY ./webapp/ .

# Set working directory for the planqk-proxy
WORKDIR /app/planqk-proxy

# Copy the package.json file and install dependencies
COPY ./planqk-proxy/package.json ./
RUN npm install

# Copy the rest of the planqk-proxy code
COPY ./planqk-proxy/ .

# Copy the startup script
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

# Expose the port Nginx is reachable on
EXPOSE 8080

# Start Nginx and the planqk-proxy
CMD ["/start.sh"]
