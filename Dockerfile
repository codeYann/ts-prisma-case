FROM node:20.11-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying package.json and package-lock.json to working directory
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying source files
COPY . .

# Exposing port 4000
EXPOSE 4000

# Running the app
CMD ["npm", "start"]
