# ORTHOS Frontend Deployment Guide

This guide explains how to deploy the ORTHOS frontend application to production.

## Prerequisites

- Node.js 16+ and npm
- Access to your Vercel account (or another hosting platform)
- The ORTHOS backend API already deployed and running

## Local Build and Testing

Before deploying to production, it's recommended to build and test locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your backend API URL:
   ```
   VITE_API_URL=http://135.181.111.246:8000
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Preview the built application:
   ```bash
   npm run preview
   ```

5. Verify everything works correctly with your backend

## Deployment Options

### 1. Vercel (Recommended)

Vercel is the simplest way to deploy the frontend:

1. Push your code to a GitHub repository
2. Sign in to [Vercel](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Configure the project:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment Variables: Add `VITE_API_URL` with your backend URL
5. Click "Deploy"

### 2. GitHub Pages

To deploy to GitHub Pages:

1. Update your `vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/Orthos/', // Use your repository name
   })
   ```

2. Install the GitHub Pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### 3. Traditional Web Server

To deploy to a traditional web server:

1. Build the project:
   ```bash
   npm run build
   ```

2. Transfer the contents of the `dist` folder to your web server using FTP or SSH
3. Configure your web server (Apache/Nginx) to serve the files and handle client-side routing

#### Nginx Configuration Example

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/dist;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

#### Apache Configuration Example

Create a `.htaccess` file in your `dist` folder:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

The following environment variables need to be set:

- `VITE_API_URL`: The URL of your backend API server

## Post-Deployment Verification

After deployment, verify:

1. The application loads correctly
2. Login and registration work
3. API calls are functioning (predictions, data management)
4. Admin features work for admin users

## Troubleshooting Common Issues

### API Connection Issues

If the frontend can't connect to the backend:
- Check that CORS is properly configured on the backend
- Verify the `VITE_API_URL` environment variable is set correctly
- Check browser console for error messages

### Routing Issues

If pages don't load on direct URL access:
- Ensure your server is configured to redirect all requests to index.html
- Check if base path is correctly set in the Vite configuration

### Build Failures

If the build process fails:
- Check for dependency issues with `npm ls`
- Make sure all required environment variables are set
- Look for syntax errors or broken imports in your code

## Maintenance

For ongoing maintenance:

1. When updating the application:
   - Test changes locally
   - Build and verify
   - Deploy using the same method as initial deployment

2. Monitor for:
   - JavaScript errors in browser console
   - API connection issues
   - Performance problems

## Support

If you encounter issues with deployment, contact the development team or refer to the GitHub repository.
