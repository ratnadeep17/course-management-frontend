# Step 1: Build the React app
FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve the app with a lightweight web server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
