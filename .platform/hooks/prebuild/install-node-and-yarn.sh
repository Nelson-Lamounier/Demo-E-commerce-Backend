#!/bin/bash

# Define the desired Node.js version
NODE_VERSION=16

# Install the specified version of Node.js
echo "Installing Node.js version $NODE_VERSION..."
curl -fsSL https://rpm.nodesource.com/setup_$NODE_VERSION.x | bash -
yum install -y nodejs

# Install Yarn globally
echo "Installing Yarn..."
npm install -g yarn@1.22.0

# Verify installations
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"
