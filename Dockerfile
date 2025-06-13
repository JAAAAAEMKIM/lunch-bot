FROM node:16.13.1-alpine

# Install bash
RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Make scripts executable
RUN chmod +x download.sh
RUN chmod +x cronjob.sh

# Set up environment variables from .env at build time
# The .env file should be in the build context
ARG ENV_FILE=.env
COPY ${ENV_FILE} /app/.env
RUN export $(cat /app/.env | xargs) && \
    echo "ID=$ID" > /app/.credentials && \
    echo "PASSWORD=$PASSWORD" >> /app/.credentials && \
    rm -f /app/.env

# Default command to run download.sh and copy the output
CMD ["bash", "-c", "source /app/.credentials && ./download.sh $ID $PASSWORD && cp -r /app/downloads/* /output/"]
