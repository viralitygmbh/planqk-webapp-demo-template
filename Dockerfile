# Use an official Node runtime as a parent image
FROM node:14-alpine

# Copy the webapp
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

# Expose the port that the node-script is reachable on
EXPOSE 8080

# Start the planqk-proxy
CMD ["/start.sh"]
