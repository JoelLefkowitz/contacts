FROM node:14.9 AS build

# Setup environment
WORKDIR /contacts
ENV PATH /contacts/node_modules/.bin:$PATH

# Build and cache dependencies
COPY ./package.json /contacts/package.json
RUN npm i

# Copy source
COPY . /contacts/

# Build the application
RUN ng build --prod

# Move to nginx base
FROM nginx:1.18

# Copy nginx config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/common /etc/nginx/common

# Copy browser bundles
COPY --from=build contacts/dist/contacts/ /etc/nginx/html/
