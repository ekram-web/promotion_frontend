# Promo Frontend

## Deployment Instructions

### Prerequisites
- Node.js & npm
- (Optional) Docker

### Manual Deployment Steps

1. **Navigate to frontend directory:**
   ```sh
   cd frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file (if needed) for API URLs, e.g.:
     ```
     VITE_API_URL=http://localhost:8000/api
     ```
4. **Build the app:**
   ```sh
   npm run build
   ```
5. **Serve the build:**
   - For local testing:
     ```sh
     npm install -g serve
     serve -s dist
     ```
   - For production:  
     Deploy the `dist/` folder to your web server (e.g., Nginx, Apache, Vercel, Netlify).

### Docker Deployment (Optional)

**Create a `Dockerfile` in `frontend/`:**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**To build and run:**
```sh
docker build -t promo-frontend .
docker run -p 3000:80 promo-frontend
```
