FROM node:lts-alpine AS build

# Install system packages needed for native modules (like bcrypt)


WORKDIR /app


# Enable and prepare Yarn 4
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the app
COPY . .

# Build Node.js app
RUN yarn build

EXPOSE 5000
CMD ["node", "dist/app.js"]