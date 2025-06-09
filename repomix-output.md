This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
.repomixignore
eslint.config.js
index.html
package.json
public/vite.svg
README.md
repomix.config.json
src/App.css
src/App.jsx
src/assets/react.svg
src/components/admin/AdminProfile/AdminProfile.css
src/components/admin/AdminProfile/AdminProfile.jsx
src/components/admin/GalleryManagement/GalleryManagement.css
src/components/admin/GalleryManagement/GalleryManagement.jsx
src/components/admin/OfferManagement/OfferManagement.css
src/components/admin/OfferManagement/OfferManagement.jsx
src/components/admin/UserManagement/UserManagement.css
src/components/admin/UserManagement/UserManagement.jsx
src/components/buyer/BuyerProfile/BuyerProfile.css
src/components/buyer/BuyerProfile/BuyerProfile.jsx
src/components/common/AuthModal/AuthModal.css
src/components/common/AuthModal/AuthModal.jsx
src/components/common/Footer/Footer.css
src/components/common/Footer/Footer.jsx
src/components/common/Navbar/Navbar.css
src/components/common/Navbar/Navbar.jsx
src/components/common/SearchFilterBar/SearchFilterBar.css
src/components/common/SearchFilterBar/SearchFilterBar.jsx
src/components/common/Sidebar/Sidebar.css
src/components/common/Sidebar/Sidebar.jsx
src/components/farmer/FarmerGallery/FarmerGallery.css
src/components/farmer/FarmerGallery/FarmerGallery.jsx
src/components/farmer/FarmerOffers/FarmerOffers.css
src/components/farmer/FarmerOffers/FarmerOffers.jsx
src/components/farmer/FarmerProfile/FarmerProfile.css
src/components/farmer/FarmerProfile/FarmerProfile.jsx
src/components/home/HeroSection/HeroSection.css
src/components/home/HeroSection/HeroSection.jsx
src/components/home/ItemsGrid/ItemsGrid.css
src/components/home/ItemsGrid/ItemsGrid.jsx
src/components/home/SearchFilter/SearchFilter.css
src/components/home/SearchFilter/SearchFilter.jsx
src/components/home/SeasonInfo/SeasonInfo.css
src/components/home/SeasonInfo/SeasonInfo.jsx
src/context/AuthContext.jsx
src/index.css
src/main.jsx
src/pages/AdminDashboard.css
src/pages/AdminDashboard.jsx
src/pages/BuyerDashboard.css
src/pages/BuyerDashboard.jsx
src/pages/FarmerDashboard.css
src/pages/FarmerDashboard.jsx
src/pages/Home.css
src/pages/Home.jsx
src/utils/api.js
src/utils/supabaseClient.js
vite.config.js
```

# Files

## File: src/utils/supabaseClient.js
```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage bucket configuration
export const STORAGE_BUCKET = "images";

// Helper function for uploading images
export const uploadImage = async (file, folder = "gallery") => {
  try {
    // Validate file
    if (!file) throw new Error("No file provided");

    // Check file size (max 5MB)
    if (file.size > 20 * 1024 * 1024) {
      throw new Error("File size should be less than 20MB");
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG, PNG, and WebP images are allowed");
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

    return {
      url: publicUrl,
      path: fileName,
      success: true,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Helper function for deleting images
export const deleteImage = async (imagePath) => {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([imagePath]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
```

## File: .gitignore
```
node_modules
package-lock.json
.env
```

## File: .repomixignore
```
# Add patterns to ignore here, one per line
# Example:
# *.log
# tmp/
```

## File: eslint.config.js
```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: package.json
```json
{
  "name": "aswanna-project-frontendd",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.50.0",
    "axios": "^1.9.0",
    "bootstrap": "^5.3.6",
    "lucide-react": "^0.511.0",
    "react": "^19.1.0",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.6.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "vite": "^6.3.5"
  }
}
```

## File: public/vite.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
```

## File: README.md
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```

## File: repomix.config.json
```json
{
  "$schema": "https://repomix.com/schemas/latest/schema.json",
  "input": {
    "maxFileSize": 52428800
  },
  "output": {
    "filePath": "repomix-output.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "files": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "copyToClipboard": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": false
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
```

## File: src/App.css
```css
/* src/App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  width: 100%;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
}

/* Loading Screen */
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  width: 100%;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-screen p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Global Styles */
button {
  cursor: pointer;
  transition: all 0.3s ease;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

input,
select,
textarea {
  font-family: inherit;
}

/* Scrollbar Styles */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Focus Styles */
*:focus {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .loading-screen {
    padding: 1rem;
  }
}
```

## File: src/App.jsx
```javascript
// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <FarmerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Root App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

## File: src/assets/react.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/components/admin/AdminProfile/AdminProfile.css
```css
/* src/components/admin/AdminProfile/AdminProfile.css */
.admin-profile {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Profile Header */
.profile-header {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #3498db;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-upload-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.avatar-upload-btn:hover {
  background: #2980b9;
}

.admin-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #3498db;
  font-size: 0.9rem;
  font-weight: 600;
}

.profile-info h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.profile-email {
  color: #bdc3c7;
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
}

.profile-role {
  color: #3498db;
  font-weight: 600;
  margin: 0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  justify-content: center;
}

.edit-btn {
  background: #3498db;
  color: white;
}

.edit-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.save-btn {
  background: #27ae60;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #219a52;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background: #c0392b;
}

.edit-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Message */
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-weight: bold;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.info-icon {
  color: #3498db;
}

.info-value {
  color: #666;
  font-size: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #3498db;
}

.info-input {
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.info-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid #3498db;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.users {
  background: linear-gradient(45deg, #3498db, #2980b9);
}

.stat-icon.farmers {
  background: linear-gradient(45deg, #27ae60, #219a52);
}

.stat-icon.buyers {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.stat-icon.pending {
  background: linear-gradient(45deg, #f39c12, #e67e22);
}

.stat-icon.gallery {
  background: linear-gradient(45deg, #9b59b6, #8e44ad);
}

.stat-icon.offers {
  background: linear-gradient(45deg, #e91e63, #c2185b);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

/* Privileges Grid */
.privileges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.privilege-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border-left: 4px solid #27ae60;
}

.privilege-icon {
  color: #27ae60;
  margin-top: 0.25rem;
}

.privilege-content h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.privilege-content p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Loading */
.loading-container {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-profile {
    padding: 1rem;
  }

  .profile-header-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .privileges-grid {
    grid-template-columns: 1fr;
  }

  .edit-actions {
    flex-direction: row;
  }
}

@media (max-width: 480px) {
  .profile-header {
    padding: 1.5rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .privilege-item {
    padding: 1rem;
  }
}
```

## File: src/components/admin/AdminProfile/AdminProfile.jsx
```javascript
// src/components/admin/AdminProfile/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    img: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFarmers: 0,
    totalBuyers: 0,
    pendingApprovals: 0,
    totalGalleryItems: 0,
    totalOffers: 0,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        img: user.img || "",
      });
      fetchAdminStats();
    }
  }, [user]);

  const fetchAdminStats = async () => {
    try {
      const [usersRes, galleryRes, offersRes] = await Promise.all([
        api.get("/api/users"),
        api.get("/api/gallery/admin/items"),
        api.get("/api/offers/admin/all"),
      ]);

      const users = usersRes.data.users || [];
      const galleryItems = galleryRes.data || [];
      const offers = offersRes.data || [];

      setStats({
        totalUsers: users.length,
        totalFarmers: users.filter((u) => u.type === "farmer").length,
        totalBuyers: users.filter((u) => u.type === "buyer").length,
        pendingApprovals: users.filter((u) => !u.emailVerified).length,
        totalGalleryItems: galleryItems.length,
        totalOffers: offers.length,
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(`/api/users/${user.id}`, profileData);

      setMessage("Profile updated successfully!");
      setIsEditing(false);

      // Update local storage
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      img: user.img || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="admin-profile">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img
                  src={
                    profileData.img ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Admin Avatar"
                />
                {isEditing && (
                  <div className="avatar-overlay">
                    <label
                      htmlFor="avatar-upload"
                      className="avatar-upload-btn"
                    >
                      <Camera size={20} />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="admin-badge">
                <Shield size={16} />
                <span>Administrator</span>
              </div>
            </div>

            <div className="profile-info">
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-role">System Administrator</p>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  First Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.firstName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  Last Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.lastName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Mail className="info-icon" size={18} />
                  Email
                </div>
                <div className="info-value">{profileData.email}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Phone className="info-icon" size={18} />
                  Phone
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="info-value">
                    {profileData.phone || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <MapPin className="info-icon" size={18} />
                  Location
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.location}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Calendar className="info-icon" size={18} />
                  Member Since
                </div>
                <div className="info-value">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Admin Statistics */}
          <div className="profile-section">
            <h2 className="section-title">System Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <User size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalUsers}</div>
                  <div className="stat-label">Total Users</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon farmers">
                  <User size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalFarmers}</div>
                  <div className="stat-label">Farmers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon buyers">
                  <User size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalBuyers}</div>
                  <div className="stat-label">Buyers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.pendingApprovals}</div>
                  <div className="stat-label">Pending Approvals</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon gallery">
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalGalleryItems}</div>
                  <div className="stat-label">Gallery Items</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon offers">
                  <Calendar size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalOffers}</div>
                  <div className="stat-label">Special Offers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Privileges */}
          <div className="profile-section">
            <h2 className="section-title">Administrator Privileges</h2>
            <div className="privileges-grid">
              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>User Management</h4>
                  <p>Approve, manage, and delete user accounts</p>
                </div>
              </div>

              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>Content Moderation</h4>
                  <p>Review and approve gallery items and offers</p>
                </div>
              </div>

              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>System Analytics</h4>
                  <p>Access to system statistics and reports</p>
                </div>
              </div>

              <div className="privilege-item">
                <Shield className="privilege-icon" size={20} />
                <div className="privilege-content">
                  <h4>Platform Control</h4>
                  <p>Full administrative control over the platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
```

## File: src/components/admin/GalleryManagement/GalleryManagement.css
```css
/* src/components/admin/GalleryManagement/GalleryManagement.css */
.gallery-management {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.section-header p {
  color: #666;
  margin: 0;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-bar,
.filter-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar {
  flex: 1;
  min-width: 300px;
}

.search-icon,
.filter-icon {
  position: absolute;
  left: 1rem;
  color: #666;
  z-index: 1;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-bar select {
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.loading-container {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.item-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.status-badge.pending {
  background: #ff9800;
}

.status-badge.approved {
  background: #4caf50;
}

.item-content {
  padding: 1.5rem;
}

.item-content h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.item-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #4caf50;
  margin: 0 0 1rem 0;
}

.item-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.item-category,
.item-location {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
}

.item-category {
  background: #e8f5e8;
  color: #4caf50;
}

.item-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.item-date {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
}

.view-btn,
.approve-btn,
.delete-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
}

.view-btn {
  background: #3498db;
  color: white;
}

.view-btn:hover {
  background: #2980b9;
}

.approve-btn {
  background: #4caf50;
  color: white;
}

.approve-btn:hover {
  background: #45a049;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-items {
  text-align: center;
  padding: 4rem 0;
  color: #666;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  background: #3498db;
  color: white;
  padding: 1.5rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 2rem;
}

.item-detail-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.item-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details h4 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
}

.detail-value {
  color: #666;
}

.status-pending {
  color: #ff9800;
  font-weight: 600;
}

.status-approved {
  color: #4caf50;
  font-weight: 600;
}

.description-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.description-section strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

.description-section p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .gallery-management {
    padding: 1rem;
  }

  .controls {
    flex-direction: column;
  }

  .search-bar {
    min-width: auto;
  }

  .items-grid {
    grid-template-columns: 1fr;
  }

  .item-actions {
    flex-direction: column;
  }
}
/* Add to both GalleryManagement.css and OfferManagement.css */

.message {
  position: relative;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
}

.conditions-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.conditions-section strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

.conditions-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conditions-section li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.conditions-section li:last-child {
  border-bottom: none;
}

.modal-offer-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
}
/* Add to both GalleryManagement.css and OfferManagement.css */

.refresh-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: linear-gradient(45deg, #2980b9, #21618c);
  transform: translateY(-2px);
}
```

## File: src/components/admin/GalleryManagement/GalleryManagement.jsx
```javascript
// src/components/admin/GalleryManagement/GalleryManagement.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Eye, Check, Trash2 } from "lucide-react";
import SearchFilterBar from "../../common/SearchFilterBar/SearchFilterBar";
import "./GalleryManagement.css";

const GalleryManagement = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, filterStatus]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log("Fetching gallery items from backend...");

      const response = await api.get("/api/gallery/admin/items");
      let itemsData = response.data || [];
      console.log("Raw API response:", itemsData);

      if (!Array.isArray(itemsData)) {
        if (itemsData && typeof itemsData === "object") {
          itemsData =
            itemsData.items || itemsData.data || itemsData.galleryItems || [];
        } else {
          itemsData = [];
        }
      }

      console.log("Processed items data:", itemsData);
      setItems(itemsData);

      if (itemsData.length === 0) {
        setMessage(
          "No gallery items found. Make sure farmers have uploaded items and backend is running."
        );
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      setMessage(
        `Failed to connect to backend server. Error: ${error.message}`
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (!Array.isArray(items)) {
      setFilteredItems([]);
      return;
    }

    let filtered = [...items];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    setFilteredItems(filtered);
  };

  const approveItem = async (itemId) => {
    try {
      console.log("Approving item:", itemId);
      await api.put(`/api/gallery/approve/${itemId}`);
      setMessage("Item approved successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error approving item:", error);
      setMessage(`Failed to approve item: ${error.message}`);
    }
  };

  const deleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        console.log("Deleting item:", itemId);
        await api.delete(`/api/gallery/delete/${itemId}`);
        setMessage("Item deleted successfully!");
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        setMessage(`Failed to delete item: ${error.message}`);
      }
    }
  };

  const viewItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const filterOptions = [
    { value: "all", label: `All Items (${items.length})` },
    {
      value: "pending",
      label: `Pending (${items.filter((i) => i.status === "pending").length})`,
    },
    {
      value: "approved",
      label: `Approved (${
        items.filter((i) => i.status === "approved").length
      })`,
    },
  ];

  if (loading) {
    return (
      <div className="gallery-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery items from backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-management">
      <div className="section-header">
        <h2>Gallery Management</h2>
        <p>Manage farmer gallery items ({items.length} total items)</p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
          <button onClick={() => setMessage("")} className="message-close">
            ×
          </button>
        </div>
      )}

      {/* Enhanced Search & Filter */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterValue={filterStatus}
        setFilterValue={setFilterStatus}
        filterOptions={filterOptions}
        onRefresh={fetchItems}
        placeholder="Search by name, category, or location..."
      />

      <div className="items-grid">
        {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id || item.id} className="item-card">
              <div className="item-image">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className={`status-badge ${item.status}`}>
                  {item.status?.toUpperCase()}
                </div>
              </div>

              <div className="item-content">
                <h3>{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <div className="item-meta">
                  <span className="item-category">{item.category}</span>
                  <span className="item-location">{item.location}</span>
                </div>
                <p className="item-description">
                  {item.description && item.description.length > 80
                    ? `${item.description.substring(0, 80)}...`
                    : item.description}
                </p>
                <div className="item-date">
                  <strong>Harvest:</strong>{" "}
                  {item.harvestDay
                    ? new Date(item.harvestDay).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>

              <div className="item-actions">
                <button className="view-btn" onClick={() => viewItem(item)}>
                  <Eye size={16} />
                  View
                </button>

                {item.status === "pending" && (
                  <button
                    className="approve-btn"
                    onClick={() => approveItem(item.itemId || item._id)}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.itemId || item._id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items">
            <h3>No items found</h3>
            <p>
              {items.length === 0
                ? "No gallery items available. Please ensure backend server is running on http://localhost:5000 and farmers have uploaded items."
                : "No gallery items match your search criteria"}
            </p>
          </div>
        )}
      </div>

      {/* Modal code remains the same */}
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Gallery Item Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="item-detail-image">
                <img src={selectedItem.image} alt={selectedItem.name} />
              </div>
              <div className="item-details">
                <h4>{selectedItem.name}</h4>
                <div className="detail-row">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">Rs. {selectedItem.price}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{selectedItem.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedItem.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Harvest Date:</span>
                  <span className="detail-value">
                    {selectedItem.harvestDay
                      ? new Date(selectedItem.harvestDay).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value status-${selectedItem.status}`}
                  >
                    {selectedItem.status?.toUpperCase()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Item ID:</span>
                  <span className="detail-value">
                    {selectedItem.itemId || selectedItem._id}
                  </span>
                </div>
                <div className="description-section">
                  <strong>Description:</strong>
                  <p>{selectedItem.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
```

## File: src/components/admin/OfferManagement/OfferManagement.css
```css
/* src/components/admin/OfferManagement/OfferManagement.css */
.offer-management {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.section-header p {
  color: #666;
  margin: 0;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-bar,
.filter-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar {
  flex: 1;
  min-width: 300px;
}

.search-icon,
.filter-icon {
  position: absolute;
  left: 1rem;
  color: #666;
  z-index: 1;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-bar select {
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.loading-container {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #e74c3c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.offer-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #e74c3c;
}

.offer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(231, 76, 60, 0.2);
}

.offer-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.offer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.status-badge.pending {
  background: #ff9800;
}

.status-badge.approved {
  background: #4caf50;
}

.offer-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

.offer-content {
  padding: 1.5rem;
}

.offer-content h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.offer-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 1rem 0;
}

.offer-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.offer-category,
.offer-location {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
}

.offer-category {
  background: #ffebee;
  color: #e74c3c;
}

.offer-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.offer-conditions {
  background: #fff3e0;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 3px solid #ff9800;
}

.offer-conditions strong {
  color: #e65100;
  font-size: 0.9rem;
}

.offer-conditions ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}

.offer-conditions li {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.offer-date {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.offer-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
}

.view-btn,
.approve-btn,
.delete-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
}

.view-btn {
  background: #3498db;
  color: white;
}

.view-btn:hover {
  background: #2980b9;
}

.approve-btn {
  background: #4caf50;
  color: white;
}

.approve-btn:hover {
  background: #45a049;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-offers {
  text-align: center;
  padding: 4rem 0;
  color: #666;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 1.5rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 2rem;
}

.offer-detail-image {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.offer-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-offer-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
}

.offer-details h4 {
  font-size: 1.5rem;
}
/* Add to both GalleryManagement.css and OfferManagement.css */

.message {
  position: relative;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
}

.conditions-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.conditions-section strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 0.5rem;
}

.conditions-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conditions-section li {
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.conditions-section li:last-child {
  border-bottom: none;
}

.modal-offer-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
}
/* Add to both GalleryManagement.css and OfferManagement.css */

.refresh-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: linear-gradient(45deg, #2980b9, #21618c);
  transform: translateY(-2px);
}
```

## File: src/components/buyer/BuyerProfile/BuyerProfile.css
```css
/* src/components/buyer/BuyerProfile/BuyerProfile.css */
.buyer-profile {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Profile Header */
.profile-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #3498db;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-upload-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.avatar-upload-btn:hover {
  background: #2980b9;
}

.buyer-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #3498db;
  font-size: 0.9rem;
  font-weight: 600;
}

.profile-info h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.profile-email {
  color: #d5e8f7;
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
}

.profile-role {
  color: #3498db;
  font-weight: 600;
  margin: 0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  justify-content: center;
}

.edit-btn {
  background: #3498db;
  color: white;
}

.edit-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.save-btn {
  background: #27ae60;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #2ecc71;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background: #c0392b;
}

.edit-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Message */
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-weight: bold;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.info-icon {
  color: #3498db;
}

.info-value {
  color: #666;
  font-size: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #3498db;
}

.info-input {
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.info-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* Buyer Information */
.buyer-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.buyer-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border-left: 4px solid #3498db;
}

.buyer-icon {
  color: #3498db;
  margin-top: 0.25rem;
}

.buyer-content h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.buyer-content p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Tips Grid */
.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #3498db;
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.tip-card h4 {
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
}

.tip-card p {
  color: #666;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

/* Loading */
.loading-container {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .buyer-profile {
    padding: 1rem;
  }

  .profile-header-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .buyer-info {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .edit-actions {
    flex-direction: row;
  }
}

@media (max-width: 480px) {
  .profile-header {
    padding: 1.5rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .buyer-item {
    padding: 1rem;
  }

  .tip-card {
    padding: 1rem;
  }
}
```

## File: src/components/buyer/BuyerProfile/BuyerProfile.jsx
```javascript
// src/components/buyer/BuyerProfile/BuyerProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  ShoppingBag,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import "./BuyerProfile.css";

const BuyerProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    img: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        img: user.img || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(`/api/users/${user.id}`, profileData);

      setMessage("Profile updated successfully!");
      setIsEditing(false);

      // Update local storage
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      img: user.img || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="buyer-profile">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img
                  src={
                    profileData.img ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Buyer Avatar"
                />
                {isEditing && (
                  <div className="avatar-overlay">
                    <label
                      htmlFor="avatar-upload"
                      className="avatar-upload-btn"
                    >
                      <Camera size={20} />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="buyer-badge">
                <ShoppingBag size={16} />
                <span>Buyer</span>
              </div>
            </div>

            <div className="profile-info">
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-role">Product Buyer</p>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  First Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.firstName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  Last Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.lastName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Mail className="info-icon" size={18} />
                  Email
                </div>
                <div className="info-value">{profileData.email}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Phone className="info-icon" size={18} />
                  Phone
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="info-value">
                    {profileData.phone || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <MapPin className="info-icon" size={18} />
                  Location
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.location}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Calendar className="info-icon" size={18} />
                  Member Since
                </div>
                <div className="info-value">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="profile-section">
            <h2 className="section-title">Buyer Information</h2>
            <div className="buyer-info">
              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Fresh Products</h4>
                  <p>
                    Access to fresh, organic products directly from local
                    farmers
                  </p>
                </div>
              </div>

              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Quality Assurance</h4>
                  <p>
                    All products are verified and approved by our quality team
                  </p>
                </div>
              </div>

              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Direct Connection</h4>
                  <p>
                    Connect directly with farmers for the best prices and
                    freshness
                  </p>
                </div>
              </div>

              <div className="buyer-item">
                <ShoppingBag className="buyer-icon" size={20} />
                <div className="buyer-content">
                  <h4>Support Local</h4>
                  <p>
                    Support local farmers and contribute to sustainable
                    agriculture
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Tips */}
          <div className="profile-section">
            <h2 className="section-title">Shopping Tips</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <h4>🌱 Seasonal Shopping</h4>
                <p>
                  Buy seasonal products for the best quality and prices. Check
                  our seasonal guide for optimal harvest times.
                </p>
              </div>

              <div className="tip-card">
                <h4>📍 Local Sourcing</h4>
                <p>
                  Choose products from your local area to reduce transportation
                  time and support nearby farmers.
                </p>
              </div>

              <div className="tip-card">
                <h4>🏷️ Special Offers</h4>
                <p>
                  Keep an eye on special offers from farmers for bulk purchases
                  and promotional deals.
                </p>
              </div>

              <div className="tip-card">
                <h4>📞 Direct Contact</h4>
                <p>
                  Contact farmers directly for custom orders, bulk purchases, or
                  specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
```

## File: src/components/common/AuthModal/AuthModal.css
```css
/* src/components/common/AuthModal/AuthModal.css */
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.auth-modal {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-modal-header {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 1.5rem;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.auth-form {
  padding: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.message {
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.auth-submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.auth-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auth-toggle {
  padding: 1rem 2rem 2rem;
  text-align: center;
  border-top: 1px solid #eee;
}

.auth-toggle p {
  margin: 0;
  color: #666;
}

.toggle-btn {
  background: none;
  border: none;
  color: #4caf50;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.toggle-btn:hover {
  color: #45a049;
}

@media (max-width: 768px) {
  .auth-modal {
    width: 95%;
    margin: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .auth-form {
    padding: 1.5rem;
  }
}
/* src/components/common/AuthModal/AuthModal.css */
/* Existing styles remain the same, add these new styles: */

/* Profile Image Upload Styles */
.profile-image-section {
  margin-bottom: 1.5rem;
  text-align: center;
}

.profile-image-label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.profile-image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-image-preview {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #4caf50;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.profile-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-profile-image {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.remove-profile-image:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.profile-image-placeholder {
  width: 100px;
  height: 100px;
  border: 2px dashed #ddd;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.profile-image-placeholder:hover {
  border-color: #4caf50;
  color: #4caf50;
  background: #f0f8f0;
}

.profile-image-placeholder p {
  margin: 0.25rem 0 0 0;
  font-size: 0.8rem;
  font-weight: 500;
}

.profile-upload-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.profile-upload-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .profile-image-preview,
  .profile-image-placeholder {
    width: 80px;
    height: 80px;
  }

  .profile-upload-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}
```

## File: src/components/common/AuthModal/AuthModal.jsx
```javascript
// src/components/common/AuthModal/AuthModal.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { uploadImage } from "../../../utils/supabaseClient";
import { Camera, X } from "lucide-react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    type: "buyer",
    img: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 20 * 1024 * 1024) {
        setMessage("Image size should be less than 20MB");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPEG, PNG, and WebP images are allowed");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setMessage(""); // Clear any previous error messages
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, img: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onClose();
          // Redirect based on user type
          const dashboardPath = getDashboardPath(result.user.type);
          window.location.href = dashboardPath;
        } else {
          setMessage(result.message);
        }
      } else {
        let imageUrl = "";

        // Upload image to Supabase if file is selected
        if (imageFile) {
          setUploading(true);
          setMessage("Uploading profile image...");

          try {
            const uploadResult = await uploadImage(imageFile, "profiles");
            imageUrl = uploadResult.url;
            setMessage("Profile image uploaded successfully!");
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            setMessage(
              "Image upload failed, but registration will continue without image."
            );
          }

          setUploading(false);
        }

        // Create registration data
        const registrationData = {
          ...formData,
          ...(imageUrl && { img: imageUrl }),
        };

        const result = await register(registrationData);
        setMessage(result.message);
        if (result.success) {
          setIsLogin(true);
          setFormData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            location: "",
            type: "buyer",
            img: "",
          });
          setImageFile(null);
          setImagePreview(null);
        }
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const getDashboardPath = (userType) => {
    switch (userType) {
      case "admin":
        return "/admin-dashboard";
      case "farmer":
        return "/farmer-dashboard";
      case "buyer":
        return "/buyer-dashboard";
      default:
        return "/";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              {/* Profile Image Upload Section */}
              <div className="profile-image-section">
                <label className="profile-image-label">
                  Profile Picture (Optional)
                </label>
                <div className="profile-image-upload">
                  {imagePreview ? (
                    <div className="profile-image-preview">
                      <img src={imagePreview} alt="Profile Preview" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-profile-image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="profile-image-placeholder">
                      <Camera size={32} />
                      <p>Add Profile Picture</p>
                    </div>
                  )}
                  <label
                    htmlFor="profile-image-input"
                    className="profile-upload-btn"
                  >
                    <Camera size={16} />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="profile-image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Account Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="buyer">Buyer</option>
                  <option value="farmer">Farmer</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {message && (
            <div
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading || uploading}
          >
            {uploading
              ? "Uploading Image..."
              : loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
```

## File: src/components/common/Footer/Footer.css
```css
/* src/components/common/Footer/Footer.css */
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: #ecf0f1;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  gap: 3rem;
  padding: 4rem 0 2rem;
}

/* Brand Section */
.brand-section {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.logo-icon {
  color: #4caf50;
  font-size: 2rem;
}

.footer-logo h2 {
  color: #ecf0f1;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.brand-description {
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link.facebook {
  background: #3b5998;
}

.social-link.instagram {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
}

.social-link.twitter {
  background: #1da1f2;
}

.social-link.youtube {
  background: #ff0000;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Footer Sections */
.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  color: #4caf50;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
}

.footer-title::after {
  content: "";
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 30px;
  height: 2px;
  background: #4caf50;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: block;
  padding: 0.25rem 0;
}

.footer-links a:hover {
  color: #4caf50;
  padding-left: 0.5rem;
}

/* Contact Section */
.contact-section {
  max-width: 280px;
}

.contact-info {
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.contact-icon {
  color: #4caf50;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.contact-item div p {
  margin: 0;
  color: #bdc3c7;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Newsletter */
.newsletter {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.newsletter h4 {
  color: #4caf50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.newsletter p {
  color: #bdc3c7;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.newsletter-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.newsletter-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: translateY(-2px);
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright p {
  margin: 0;
  color: #95a5a6;
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-bottom-links a {
  color: #95a5a6;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: #4caf50;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr 2fr;
    gap: 2rem;
  }

  .footer-content .footer-section:nth-child(3) {
    grid-column: 1 / 3;
  }

  .footer-content .footer-section:nth-child(4) {
    grid-column: 3 / 5;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 3rem 0 2rem;
  }

  .brand-section {
    grid-column: 1 / -1;
    max-width: none;
    text-align: center;
    margin-bottom: 1rem;
  }

  .contact-section {
    grid-column: 1 / -1;
    max-width: none;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .footer-bottom-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-btn {
    width: 100%;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  .social-links {
    justify-content: center;
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer-section {
  animation: fadeInUp 0.6s ease-out;
}

.footer-section:nth-child(1) {
  animation-delay: 0.1s;
}
.footer-section:nth-child(2) {
  animation-delay: 0.2s;
}
.footer-section:nth-child(3) {
  animation-delay: 0.3s;
}
.footer-section:nth-child(4) {
  animation-delay: 0.4s;
}
.footer-section:nth-child(5) {
  animation-delay: 0.5s;
}
```

## File: src/components/common/Footer/Footer.jsx
```javascript
// src/components/common/Footer/Footer.jsx
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Leaf,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <Leaf className="logo-icon" />
              <h2>අස්වැන්න</h2>
            </div>
            <p className="brand-description">
              Connect directly with local farmers and get the freshest produce
              delivered to your doorstep. Supporting Sri Lankan agriculture with
              quality organic products.
            </p>
            <div className="social-links">
              <a
                href="#"
                className="social-link facebook"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="social-link instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link youtube" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/farmers">Our Farmers</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <ul className="footer-links">
              <li>
                <a href="/category/vegetables">Vegetables</a>
              </li>
              <li>
                <a href="/category/fruits">Fruits</a>
              </li>
              <li>
                <a href="/category/grains">Grains</a>
              </li>
              <li>
                <a href="/category/herbs">Herbs</a>
              </li>
              <li>
                <a href="/category/dairy">Dairy</a>
              </li>
              <li>
                <a href="/category/seeds">Seeds</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li>
                <a href="/help">Help Center</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/shipping">Shipping Info</a>
              </li>
              <li>
                <a href="/returns">Returns</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" size={18} />
                <div>
                  <p>123 Farm Street</p>
                  <p>Colombo 07, Sri Lanka</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={18} />
                <div>
                  <p>+94 11 234 5678</p>
                  <p>+94 77 123 4567</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={18} />
                <div>
                  <p>info@aswanna.lk</p>
                  <p>support@aswanna.lk</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="newsletter">
              <h4>Subscribe to our Newsletter</h4>
              <p>Get updates on fresh products and special offers</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} අස්වැන්න. All rights reserved.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## File: src/components/common/Navbar/Navbar.css
```css
/* src/components/common/Navbar/Navbar.css */
.navbar {
  background: linear-gradient(135deg, #4caf50, #45a049);
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.navbar-brand {
  cursor: pointer;
  user-select: none;
}

.navbar-brand h2 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-user,
.navbar-guest {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  color: white;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

.navbar-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}

.login-btn,
.dashboard-btn {
  background: white;
  color: #4caf50;
}

.login-btn:hover,
.dashboard-btn:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid white;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
  }

  .navbar-brand h2 {
    font-size: 1.5rem;
  }

  .navbar-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .user-greeting {
    display: none;
  }
}

@media (max-width: 480px) {
  .navbar-menu {
    gap: 0.5rem;
  }

  .navbar-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
}
```

## File: src/components/common/Navbar/Navbar.jsx
```javascript
// src/components/common/Navbar/Navbar.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const getDashboardPath = () => {
    if (!user) return "/";
    switch (user.type) {
      case "admin":
        return "/admin-dashboard";
      case "farmer":
        return "/farmer-dashboard";
      case "buyer":
        return "/buyer-dashboard";
      default:
        return "/";
    }
  };

  const handleDashboardClick = () => {
    if (user) {
      window.location.href = getDashboardPath();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={handleHomeClick}>
            <h2>අස්වැන්න</h2>
          </div>

          <div className="navbar-menu">
            {user ? (
              <div className="navbar-user">
                <span className="user-greeting">Hello, {user.firstName}</span>
                <button
                  className="navbar-btn dashboard-btn"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
                <button className="navbar-btn logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-guest">
                <button
                  className="navbar-btn login-btn"
                  onClick={() => setShowAuthModal(true)}
                >
                  Login
                </button>
                <button
                  className="navbar-btn dashboard-btn"
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
```

## File: src/components/common/SearchFilterBar/SearchFilterBar.css
```css
/* src/components/common/SearchFilterBar/SearchFilterBar.css */
.search-filter-bar {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8ecef;
}

.search-filter-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

/* Enhanced Search Bar */
.enhanced-search-bar {
  flex: 1;
  min-width: 300px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.search-input-wrapper:hover {
  border-color: #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input-wrapper:focus-within {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  background: white;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #6c757d;
  z-index: 1;
  transition: color 0.3s ease;
}

.search-input-wrapper:focus-within .search-icon {
  color: #4caf50;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #495057;
  outline: none;
  font-weight: 500;
}

.search-input::placeholder {
  color: #adb5bd;
  font-weight: 400;
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.clear-search-btn:hover {
  background: #495057;
  opacity: 1;
  transform: scale(1.1);
}

/* Enhanced Filter Bar */
.enhanced-filter-bar {
  min-width: 200px;
}

.filter-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.filter-wrapper:hover {
  border-color: #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-wrapper:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  background: white;
}

.filter-icon {
  position: absolute;
  left: 1rem;
  color: #6c757d;
  z-index: 1;
  transition: color 0.3s ease;
}

.filter-wrapper:focus-within .filter-icon {
  color: #007bff;
}

.filter-select {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #495057;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
  padding-right: 3rem;
}

.clear-filter-btn {
  position: absolute;
  right: 2.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.clear-filter-btn:hover {
  background: #495057;
  opacity: 1;
  transform: scale(1.1);
}

/* Custom Filters */
.custom-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.custom-filter {
  background: #e9ecef;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #495057;
  border: 1px solid #dee2e6;
}

/* Refresh Button */
.refresh-btn {
  background: linear-gradient(135deg, #17a2b8, #138496);
  color: white;
  border: none;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(23, 162, 184, 0.2);
}

.refresh-btn:hover {
  background: linear-gradient(135deg, #138496, #117a8b);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.refresh-btn:active {
  transform: translateY(0);
}

/* Active Filters */
.active-filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 600;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
}

.filter-tag button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.filter-tag button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .enhanced-search-bar,
  .enhanced-filter-bar {
    min-width: auto;
  }

  .refresh-btn {
    justify-content: center;
  }

  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .search-filter-bar {
    padding: 1rem;
  }

  .search-input,
  .filter-select {
    font-size: 0.9rem;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
  }

  .search-icon,
  .filter-icon {
    left: 0.75rem;
  }
}
```

## File: src/components/common/SearchFilterBar/SearchFilterBar.jsx
```javascript
// src/components/common/SearchFilterBar/SearchFilterBar.jsx
import React from "react";
import { Search, Filter, X, RefreshCw } from "lucide-react";
import "./SearchFilterBar.css";

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  filterValue,
  setFilterValue,
  filterOptions,
  onRefresh,
  placeholder = "Search...",
  showRefresh = true,
  customFilters = [],
}) => {
  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilter = () => {
    setFilterValue("all");
  };

  return (
    <div className="search-filter-bar">
      <div className="search-filter-container">
        {/* Enhanced Search Bar */}
        <div className="enhanced-search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="enhanced-filter-bar">
          <div className="filter-wrapper">
            <Filter className="filter-icon" size={20} />
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="filter-select"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {filterValue !== "all" && (
              <button
                className="clear-filter-btn"
                onClick={clearFilter}
                aria-label="Clear filter"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Custom Filters */}
        {customFilters.length > 0 && (
          <div className="custom-filters">
            {customFilters.map((filter, index) => (
              <div key={index} className="custom-filter">
                {filter}
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        {showRefresh && (
          <button
            className="refresh-btn"
            onClick={onRefresh}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(searchTerm || filterValue !== "all") && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          {searchTerm && (
            <div className="filter-tag">
              <span>Search: "{searchTerm}"</span>
              <button onClick={clearSearch}>
                <X size={12} />
              </button>
            </div>
          )}
          {filterValue !== "all" && (
            <div className="filter-tag">
              <span>
                Status:{" "}
                {filterOptions.find((opt) => opt.value === filterValue)?.label}
              </span>
              <button onClick={clearFilter}>
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
```

## File: src/components/common/Sidebar/Sidebar.css
```css
/* src/components/common/Sidebar/Sidebar.css */
.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298, #3498db);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
}

.sidebar-header h2 {
  font-size: 1.4rem;
  margin: 0 0 1.5rem 0;
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #ecf0f1, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.user-avatar {
  width: 100px; /* ඔයාට අවශ්ය size එක select කරන්න */
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #3498db;
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  transition: all 0.3s ease;
  position: relative;
}

.user-avatar::before {
  content: "";
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: linear-gradient(45deg, #3498db, #2ecc71, #f39c12);
  z-index: -1;
  animation: rotate 3s linear infinite;
}

.user-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.6);
}

.user-avatar img {
  width: 120%;
  height: 120%;
  object-fit: cover;
  transition: all 0.3s ease;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.3px;
}

.user-type-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(
    45deg,
    rgba(52, 152, 219, 0.3),
    rgba(46, 204, 113, 0.3)
  );
  padding: 0.4rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(52, 152, 219, 0.5);
  font-size: 0.85rem;
  font-weight: 600;
  color: #3498db;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
  backdrop-filter: blur(5px);
}

.back-to-home-btn {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.back-to-home-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.back-to-home-btn:hover::before {
  left: 100%;
}

.back-to-home-btn:hover {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(46, 204, 113, 0.4);
}

.back-to-home-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(46, 204, 113, 0.3);
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow-y: auto;
}

.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.nav-item {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  padding: 1.2rem 1.5rem;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
  position: relative;
  margin: 0 0.5rem;
  border-radius: 0 15px 15px 0;
}

.nav-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
  border-radius: 0 15px 15px 0;
}

.nav-item:hover::before {
  width: 4px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(8px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
}

.nav-item.active {
  background: linear-gradient(
    45deg,
    rgba(52, 152, 219, 0.3),
    rgba(46, 204, 113, 0.2)
  );
  color: white;
  border-left-color: #3498db;
  box-shadow: inset 0 0 15px rgba(52, 152, 219, 0.3);
  transform: translateX(8px);
  font-weight: 600;
}

.nav-item.active::before {
  width: 4px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
}

.nav-item svg {
  transition: all 0.3s ease;
}

.nav-item:hover svg,
.nav-item.active svg {
  transform: scale(1.1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logout-btn {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
  transition: all 0.3s ease;
  margin: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.logout-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.logout-btn:hover::before {
  left: 100%;
}

.logout-btn:hover {
  background: linear-gradient(45deg, #c0392b, #a93226);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

.logout-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(231, 76, 60, 0.3);
}

.logout-btn svg {
  transition: all 0.3s ease;
}

.logout-btn:hover svg {
  transform: rotate(15deg) scale(1.1);
}

/* Decorative Elements */
.sidebar::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #3498db, #2ecc71, #f39c12, #e74c3c);
  opacity: 0.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
  }

  .user-avatar {
    width: 60px;
    height: 60px;
  }

  .user-type-badge {
    font-size: 0.75rem;
    padding: 0.3rem 0.8rem;
  }

  .sidebar-header h2 {
    font-size: 1.2rem;
  }

  .nav-item {
    padding: 1rem;
    font-size: 0.9rem;
    margin: 0;
    border-radius: 0;
  }

  .nav-item:hover {
    transform: none;
  }

  .nav-item.active {
    transform: none;
  }

  .back-to-home-btn,
  .logout-btn {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .sidebar-header {
    padding: 1rem;
  }

  .user-info {
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.8rem;
  }

  .nav-item {
    padding: 0.8rem 1rem;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
  }

  .sidebar-header h2 {
    font-size: 1.1rem;
  }
}

/* Loading Animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.sidebar.loading {
  animation: pulse 2s infinite;
}

/* Smooth Transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## File: src/components/common/Sidebar/Sidebar.jsx
```javascript
// src/components/common/Sidebar/Sidebar.jsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Home,
  User,
  Users,
  Image,
  Gift,
  LogOut,
  Settings,
  ShoppingBag,
  Shield,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection, userType }) => {
  const { user, logout } = useAuth();

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const getMenuItems = () => {
    switch (userType || user?.type) {
      case "admin":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "users", label: "User Management", icon: Users },
          { id: "gallery", label: "Gallery Management", icon: Image },
          { id: "offers", label: "Offer Management", icon: Gift },
        ];
      case "farmer":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "gallery", label: "My Gallery", icon: Image },
          { id: "offers", label: "My Offers", icon: Gift },
        ];
      case "buyer":
        return [
          { id: "profile", label: "Profile", icon: User },
          { id: "orders", label: "My Orders", icon: ShoppingBag },
          { id: "favorites", label: "Favorites", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const getUserTypeIcon = () => {
    switch (userType || user?.type) {
      case "admin":
        return <Shield size={16} />;
      case "farmer":
        return <Image size={16} />;
      case "buyer":
        return <ShoppingBag size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getUserTypeBadge = () => {
    switch (userType || user?.type) {
      case "admin":
        return "Administrator";
      case "farmer":
        return "Farmer";
      case "buyer":
        return "Buyer";
      default:
        return "User";
    }
  };

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>අස්වැන්න Dashboard</h2>

        <div className="user-info">
          <div className="user-avatar">
            <img
              src={user.img || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="User Avatar"
            />
          </div>
          <div className="user-details">
            <div className="user-name">
              {user.firstName} {user.lastName}
            </div>
            <div className="user-type-badge">
              {getUserTypeIcon()}
              <span>{getUserTypeBadge()}</span>
            </div>
          </div>
        </div>

        <button className="back-to-home-btn" onClick={handleBackToHome}>
          <Home size={16} />
          Back to Home
        </button>
      </div>

      <nav className="sidebar-nav">
        {getMenuItems().map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${
                activeSection === item.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <IconComponent size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
```

## File: src/components/farmer/FarmerProfile/FarmerProfile.css
```css
/* src/components/farmer/FarmerProfile/FarmerProfile.css */
.farmer-profile {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.profile-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Profile Header */
.profile-header {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.profile-header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
}

.profile-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #2ecc71;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-upload-btn {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.avatar-upload-btn:hover {
  background: #27ae60;
}

.farmer-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(46, 204, 113, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #2ecc71;
  font-size: 0.9rem;
  font-weight: 600;
}

.profile-info h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.profile-email {
  color: #d5f4e6;
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
}

.profile-role {
  color: #2ecc71;
  font-weight: 600;
  margin: 0;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-btn,
.save-btn,
.cancel-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  justify-content: center;
}

.edit-btn {
  background: #2ecc71;
  color: white;
}

.edit-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
}

.save-btn {
  background: #3498db;
  color: white;
}

.save-btn:hover:not(:disabled) {
  background: #2980b9;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background: #c0392b;
}

.edit-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Message */
.message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-weight: bold;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.info-icon {
  color: #27ae60;
}

.info-value {
  color: #666;
  font-size: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #27ae60;
}

.info-input {
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.info-input:focus {
  outline: none;
  border-color: #27ae60;
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid #27ae60;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.gallery {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
}

.stat-icon.approved {
  background: linear-gradient(45deg, #2ecc71, #58d68d);
}

.stat-icon.pending {
  background: linear-gradient(45deg, #f39c12, #e67e22);
}

.stat-icon.offers {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.stat-icon.approved-offers {
  background: linear-gradient(45deg, #3498db, #2980b9);
}

.stat-icon.pending-offers {
  background: linear-gradient(45deg, #9b59b6, #8e44ad);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

/* Farming Information */
.farming-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.farming-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border-left: 4px solid #27ae60;
}

.farming-icon {
  color: #27ae60;
  margin-top: 0.25rem;
}

.farming-content h4 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.farming-content p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Loading */
.loading-container {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .farmer-profile {
    padding: 1rem;
  }

  .profile-header-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  .farming-info {
    grid-template-columns: 1fr;
  }

  .edit-actions {
    flex-direction: row;
  }
}

@media (max-width: 480px) {
  .profile-header {
    padding: 1.5rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .farming-item {
    padding: 1rem;
  }
}
```

## File: src/components/farmer/FarmerProfile/FarmerProfile.jsx
```javascript
// src/components/farmer/FarmerProfile/FarmerProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Leaf,
  Edit,
  Save,
  X,
  Camera,
} from "lucide-react";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    img: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    totalGalleryItems: 0,
    approvedGalleryItems: 0,
    pendingGalleryItems: 0,
    totalOffers: 0,
    approvedOffers: 0,
    pendingOffers: 0,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        img: user.img || "",
      });
      fetchFarmerStats();
    }
  }, [user]);

  const fetchFarmerStats = async () => {
    try {
      const [galleryRes, offersRes] = await Promise.all([
        api.get("/api/gallery/my-items"),
        api.get("/api/offers/my-offers"),
      ]);

      const galleryItems = galleryRes.data.galleryItems || [];
      const offers = offersRes.data.offers || [];

      setStats({
        totalGalleryItems: galleryItems.length,
        approvedGalleryItems: galleryItems.filter(
          (item) => item.status === "approved"
        ).length,
        pendingGalleryItems: galleryItems.filter(
          (item) => item.status === "pending"
        ).length,
        totalOffers: offers.length,
        approvedOffers: offers.filter((offer) => offer.status === "approved")
          .length,
        pendingOffers: offers.filter((offer) => offer.status === "pending")
          .length,
      });
    } catch (error) {
      console.error("Error fetching farmer stats:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(`/api/users/${user.id}`, profileData);

      setMessage("Profile updated successfully!");
      setIsEditing(false);

      // Update local storage
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      location: user.location || "",
      img: user.img || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="farmer-profile">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img
                  src={
                    profileData.img ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Farmer Avatar"
                />
                {isEditing && (
                  <div className="avatar-overlay">
                    <label
                      htmlFor="avatar-upload"
                      className="avatar-upload-btn"
                    >
                      <Camera size={20} />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className="farmer-badge">
                <Leaf size={16} />
                <span>Farmer</span>
              </div>
            </div>

            <div className="profile-info">
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="profile-email">{profileData.email}</p>
              <p className="profile-role">Agricultural Producer</p>
            </div>

            <div className="profile-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  First Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.firstName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <User className="info-icon" size={18} />
                  Last Name
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.lastName}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Mail className="info-icon" size={18} />
                  Email
                </div>
                <div className="info-value">{profileData.email}</div>
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Phone className="info-icon" size={18} />
                  Phone
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="info-input"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="info-value">
                    {profileData.phone || "Not provided"}
                  </div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <MapPin className="info-icon" size={18} />
                  Location
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="info-input"
                  />
                ) : (
                  <div className="info-value">{profileData.location}</div>
                )}
              </div>

              <div className="info-item">
                <div className="info-label">
                  <Calendar className="info-icon" size={18} />
                  Member Since
                </div>
                <div className="info-value">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Farmer Statistics */}
          <div className="profile-section">
            <h2 className="section-title">My Farm Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon gallery">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalGalleryItems}</div>
                  <div className="stat-label">Total Gallery Items</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon approved">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {stats.approvedGalleryItems}
                  </div>
                  <div className="stat-label">Approved Gallery</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.pendingGalleryItems}</div>
                  <div className="stat-label">Pending Gallery</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon offers">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalOffers}</div>
                  <div className="stat-label">Total Offers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon approved-offers">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.approvedOffers}</div>
                  <div className="stat-label">Approved Offers</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending-offers">
                  <Leaf size={24} />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{stats.pendingOffers}</div>
                  <div className="stat-label">Pending Offers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Farming Information */}
          <div className="profile-section">
            <h2 className="section-title">Farming Information</h2>
            <div className="farming-info">
              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Organic Farming</h4>
                  <p>Committed to sustainable and organic farming practices</p>
                </div>
              </div>

              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Fresh Produce</h4>
                  <p>Providing fresh, high-quality agricultural products</p>
                </div>
              </div>

              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Local Community</h4>
                  <p>Supporting local community with farm-fresh products</p>
                </div>
              </div>

              <div className="farming-item">
                <Leaf className="farming-icon" size={20} />
                <div className="farming-content">
                  <h4>Seasonal Crops</h4>
                  <p>
                    Growing seasonal crops for optimal quality and nutrition
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
```

## File: src/components/home/HeroSection/HeroSection.css
```css
/* src/components/home/HeroSection/HeroSection.css */
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 4rem 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  color: #2c3e50;
  line-height: 1.2;
  margin: 0;
}

.hero-subtitle {
  color: #4caf50;
  font-size: 2.2rem;
}

.hero-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.hero-features {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #333;
}

.feature-icon {
  font-size: 1.5rem;
}

.hero-image {
  text-align: center;
}

.hero-image img {
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.8rem;
  }

  .hero-features {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-image img {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}
```

## File: src/components/home/HeroSection/HeroSection.jsx
```javascript
// src/components/home/HeroSection/HeroSection.jsx
import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Fresh Farm Products
            <br />
            <span className="hero-subtitle">
              Direct from Sri Lankan Farmers
            </span>
          </h1>
          <p className="hero-description">
            Connect directly with local farmers and get the freshest produce
            delivered to your doorstep. Support local agriculture while enjoying
            organic, high-quality fruits and vegetables.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🌱</span>
              <span>Fresh & Organic</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <span>Direct Delivery</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👨‍🌾</span>
              <span>Support Farmers</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600"
            alt="Sri Lankan Farmer"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

## File: src/components/home/SearchFilter/SearchFilter.css
```css
/* src/components/home/SearchFilter/SearchFilter.css */
.search-filter {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(248, 249, 250, 0.95)
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  max-width: 1000px;
}

.search-filter::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #4caf50, #2ecc71, #27ae60, #4caf50);
  background-size: 200% 100%;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.search-filter-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Search Section */
.search-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-title {
  text-align: center;
  margin-bottom: 1rem;
}

.search-title h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  background: linear-gradient(45deg, #2c3e50, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-title p {
  color: #666;
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
}

/* Enhanced Search Bar */
.search-bar-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 3px solid #e9ecef;
  border-radius: 50px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.search-bar:hover {
  border-color: #4caf50;
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.15);
  transform: translateY(-2px);
}

.search-bar:focus-within {
  border-color: #4caf50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1),
    0 8px 30px rgba(76, 175, 80, 0.2);
  transform: translateY(-2px);
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  color: #6c757d;
  z-index: 2;
  transition: all 0.3s ease;
  pointer-events: none;
}

.search-bar:focus-within .search-icon {
  color: #4caf50;
  transform: scale(1.1);
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem 1rem 4rem;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #2c3e50;
  outline: none;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.search-input::placeholder {
  color: #adb5bd;
  font-weight: 400;
  transition: all 0.3s ease;
}

.search-bar:focus-within .search-input::placeholder {
  color: #dee2e6;
  transform: translateX(5px);
}

.clear-search-btn {
  position: absolute;
  right: 4.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;
  z-index: 2;
}

.clear-search-btn:hover {
  background: #c0392b;
  opacity: 1;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.search-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border-radius: 0 50px 50px 0;
  position: relative;
  overflow: hidden;
}

.search-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.search-btn:hover::before {
  left: 100%;
}

.search-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.search-btn:active {
  transform: scale(0.98);
}

/* Filter Section */
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-title {
  text-align: center;
}

.filter-title h4 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  background: linear-gradient(45deg, #2c3e50, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.filter-title p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Filter Controls */
.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.filter-icon {
  color: #4caf50;
}

/* Enhanced Select Styling */
.filter-select {
  position: relative;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-select:hover {
  border-color: #4caf50;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
  transform: translateY(-1px);
}

.filter-select:focus-within {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  transform: translateY(-1px);
}

.filter-select select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #2c3e50;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234caf50' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.2rem;
  padding-right: 3rem;
}

.filter-select select option {
  padding: 0.5rem;
  background: white;
  color: #2c3e50;
}

/* Price Range Styling */
.price-range {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.price-input {
  flex: 1;
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: #2c3e50;
  outline: none;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.price-input:hover {
  border-color: #4caf50;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
}

.price-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.price-separator {
  color: #666;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Filter Actions */
.filter-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn,
.clear-filters-btn {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.filter-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.filter-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.filter-btn:hover::before {
  left: 100%;
}

.filter-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.clear-filters-btn {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.clear-filters-btn:hover {
  background: linear-gradient(45deg, #c0392b, #a93226);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

/* Active Filters Display */
.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.active-filters-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-tag button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.filter-tag button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Loading State */
.search-filter.loading {
  pointer-events: none;
  opacity: 0.7;
}

.search-filter.loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-filter {
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 15px;
  }

  .search-title h3 {
    font-size: 1.5rem;
  }

  .search-bar {
    border-radius: 15px;
  }

  .search-btn {
    border-radius: 0 15px 15px 0;
    padding: 1rem 1.5rem;
  }

  .filter-controls {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .price-range {
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-btn,
  .clear-filters-btn {
    justify-content: center;
  }

  .active-filters {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .search-filter {
    padding: 1rem;
  }

  .search-input {
    font-size: 1rem;
    padding: 0.875rem 1rem 0.875rem 3.5rem;
  }

  .search-icon {
    left: 1rem;
  }

  .clear-search-btn {
    right: 3.5rem;
    width: 28px;
    height: 28px;
  }

  .search-btn {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }

  .filter-select select,
  .price-input {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .filter-btn,
  .clear-filters-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}

/* Animation for smooth transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
.search-input:focus,
.filter-select select:focus,
.price-input:focus,
.filter-btn:focus,
.clear-filters-btn:focus,
.search-btn:focus {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}

/* Hover effects for better UX */
.filter-group:hover .filter-label {
  color: #4caf50;
}

.filter-group:hover .filter-icon {
  transform: scale(1.1);
}

/* Enhanced visual feedback */
.search-bar-container:hover .search-icon {
  color: #4caf50;
  transform: scale(1.05);
}

/* Smooth color transitions */
.search-filter * {
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
```

## File: src/components/home/SearchFilter/SearchFilter.jsx
```javascript
// src/components/home/SearchFilter/SearchFilter.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import "./SearchFilter.css";

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const categories = [
    "vegetables",
    "fruits",
    "grains",
    "herbs",
    "dairy",
    "seeds",
  ];
  const locations = [
    "Colombo",
    "Kandy",
    "Galle",
    "Matara",
    "Kurunegala",
    "Anuradhapura",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      name: "",
      category: "",
      location: "",
      minPrice: "",
      maxPrice: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="search-filter-section">
      <div className="search-filter-container">
        <h2 className="section-title">Find Fresh Products</h2>

        <div className="search-bar">
          <input
            type="text"
            name="name"
            placeholder="Search by product name..."
            value={filters.name}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>

        <div className="filter-bar">
          <div className="filter-group">
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <div className="price-filter">
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleInputChange}
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleInputChange}
                className="price-input"
              />
            </div>

            <button onClick={clearFilters} className="clear-btn">
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
```

## File: src/components/home/SeasonInfo/SeasonInfo.css
```css
/* src/components/home/SeasonInfo/SeasonInfo.css */
.season-info {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.season-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.season-header {
  text-align: center;
  margin-bottom: 3rem;
}

.season-header h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-weight: 700;
  background: linear-gradient(45deg, #2c3e50, #27ae60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.season-header p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

/* Current Season Highlight */
.current-season-highlight {
  margin-bottom: 3rem;
}

.current-season-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 3px solid #27ae60;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.current-season-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #27ae60, #2ecc71, #4caf50);
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.current-season-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(39, 174, 96, 0.2);
  border-color: #2ecc71;
}

.current-season-card .season-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.current-season-card .season-icon {
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.current-season-card h3 {
  color: #27ae60;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.current-season-card h4 {
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
}

.season-sinhala {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.season-months {
  color: #27ae60;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.season-stats {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-weight: 500;
}

.click-indicator {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Seasons Grid */
.seasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.season-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.season-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #27ae60;
}

.season-card.active {
  border-color: #27ae60;
  background: linear-gradient(135deg, #f8fff8, #ffffff);
}

.season-card .season-icon {
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.season-card:hover .season-icon {
  transform: scale(1.1);
}

.season-card h4 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.season-card .season-sinhala {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.season-card .season-months {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.season-preview {
  color: #666;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Modal Styles */
.season-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.season-modal {
  background: white;
  border-radius: 20px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  color: white;
  padding: 2rem;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.modal-header .season-sinhala {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 0.25rem 0;
}

.modal-header .season-months {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Modal Content */
.modal-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal-content h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

/* Weather Section */
.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.weather-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #27ae60;
}

.weather-item svg {
  color: #27ae60;
  flex-shrink: 0;
}

.weather-item .label {
  display: block;
  color: #666;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.weather-item .value {
  display: block;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.weather-description {
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

/* Crops Section */
.crops-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.crop-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #27ae60;
  transition: all 0.3s ease;
}

.crop-card:hover {
  background: #f0f8f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.1);
}

.crop-header {
  margin-bottom: 1rem;
}

.crop-header h5 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.crop-sinhala {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.crop-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.crop-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.crop-info svg {
  color: #27ae60;
  flex-shrink: 0;
}

.crop-regions {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #666;
  font-size: 0.8rem;
}

.crop-regions svg {
  color: #27ae60;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

/* Tips Section */
.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #27ae60;
}

.tip-number {
  background: #27ae60;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

/* Description Section */
.description-section h4 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.description-section p {
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .season-container {
    padding: 0 1rem;
  }

  .season-header h2 {
    font-size: 2rem;
  }

  .current-season-card {
    padding: 1.5rem;
  }

  .current-season-card h4 {
    font-size: 1.5rem;
  }

  .season-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .seasons-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .modal-content {
    padding: 1rem;
  }

  .weather-grid {
    grid-template-columns: 1fr;
  }

  .crops-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .season-modal {
    width: 95%;
    margin: 1rem;
  }

  .modal-header {
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .modal-header h3 {
    font-size: 1.5rem;
  }
}
```

## File: src/components/home/SeasonInfo/SeasonInfo.jsx
```javascript
// src/components/home/SeasonInfo/SeasonInfo.jsx
import React, { useState } from "react";
import {
  Calendar,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  X,
  MapPin,
  Clock,
  TrendingUp,
  Leaf,
} from "lucide-react";
import "./SeasonInfo.css";

const SeasonInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 12 || month <= 2) return "winter";
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    return "autumn";
  };

  const seasons = {
    winter: {
      name: "Winter Season",
      sinhala: "ශීත කාලය",
      months: "December - February",
      icon: <Cloud size={40} />,
      color: "#3498db",
      temperature: "20°C - 28°C",
      rainfall: "Low to Moderate",
      humidity: "60% - 75%",
      description: "Cool and dry season with pleasant weather conditions",
      crops: [
        {
          name: "Tomatoes",
          sinhala: "තක්කාලි",
          season: "Peak harvest",
          price: "Rs. 150-200/kg",
          regions: ["Nuwara Eliya", "Badulla", "Kandy"],
        },
        {
          name: "Carrots",
          sinhala: "කැරට්",
          season: "Best quality",
          price: "Rs. 120-180/kg",
          regions: ["Nuwara Eliya", "Bandarawela"],
        },
        {
          name: "Cabbage",
          sinhala: "ගෝවා",
          season: "Peak harvest",
          price: "Rs. 80-120/kg",
          regions: ["Nuwara Eliya", "Welimada"],
        },
        {
          name: "Potatoes",
          sinhala: "අල",
          season: "Fresh harvest",
          price: "Rs. 100-150/kg",
          regions: ["Nuwara Eliya", "Badulla"],
        },
      ],
      tips: [
        "Best time for highland vegetable cultivation",
        "Ideal weather for leafy greens",
        "Good season for root vegetables",
        "Perfect for cool-season crops",
      ],
      weatherPattern:
        "Cool, dry northeast monsoon period with minimal rainfall",
    },
    spring: {
      name: "Spring Season",
      sinhala: "වසන්ත කාලය",
      months: "March - May",
      icon: <Sun size={40} />,
      color: "#f39c12",
      temperature: "25°C - 32°C",
      rainfall: "Moderate",
      humidity: "65% - 80%",
      description:
        "Warm season with increasing temperatures and occasional showers",
      crops: [
        {
          name: "Mangoes",
          sinhala: "අඹ",
          season: "Peak season",
          price: "Rs. 200-400/kg",
          regions: ["Jaffna", "Anuradhapura", "Kurunegala"],
        },
        {
          name: "Watermelon",
          sinhala: "කොමඩු",
          season: "Best quality",
          price: "Rs. 80-120/kg",
          regions: ["Hambantota", "Monaragala"],
        },
        {
          name: "Pineapple",
          sinhala: "අන්නාසි",
          season: "Sweet variety",
          price: "Rs. 150-250/piece",
          regions: ["Gampaha", "Kurunegala"],
        },
        {
          name: "Green Beans",
          sinhala: "බෝංචි",
          season: "Fresh harvest",
          price: "Rs. 180-250/kg",
          regions: ["Kandy", "Matale"],
        },
      ],
      tips: [
        "Great season for tropical fruits",
        "Ideal for summer vegetables",
        "Good time for irrigation crops",
        "Perfect for fruit tree cultivation",
      ],
      weatherPattern: "Inter-monsoon period with hot, humid conditions",
    },
    summer: {
      name: "Summer Season",
      sinhala: "ග්‍රීෂ්ම කාලය",
      months: "June - August",
      icon: <CloudRain size={40} />,
      color: "#27ae60",
      temperature: "24°C - 30°C",
      rainfall: "High",
      humidity: "75% - 90%",
      description:
        "Monsoon season with heavy rainfall and lush green landscapes",
      crops: [
        {
          name: "Rice",
          sinhala: "සහල්",
          season: "Yala season",
          price: "Rs. 120-180/kg",
          regions: ["Polonnaruwa", "Anuradhapura", "Ampara"],
        },
        {
          name: "Coconut",
          sinhala: "පොල්",
          season: "Peak harvest",
          price: "Rs. 80-120/piece",
          regions: ["Gampaha", "Kalutara", "Puttalam"],
        },
        {
          name: "Banana",
          sinhala: "කෙසෙල්",
          season: "Year-round",
          price: "Rs. 150-200/dozen",
          regions: ["Kegalle", "Ratnapura"],
        },
        {
          name: "Papaya",
          sinhala: "පැපොල්",
          season: "Abundant",
          price: "Rs. 100-150/kg",
          regions: ["Puttalam", "Hambantota"],
        },
      ],
      tips: [
        "Southwest monsoon brings abundant water",
        "Perfect for rice cultivation",
        "Ideal for water-loving crops",
        "Good season for coconut and spices",
      ],
      weatherPattern:
        "Southwest monsoon with heavy rainfall and cooler temperatures",
    },
    autumn: {
      name: "Autumn Season",
      sinhala: "සරත් කාලය",
      months: "September - November",
      icon: <Wind size={40} />,
      color: "#e67e22",
      temperature: "23°C - 29°C",
      rainfall: "Moderate to High",
      humidity: "70% - 85%",
      description:
        "Post-monsoon season with retreating rains and pleasant weather",
      crops: [
        {
          name: "Onions",
          sinhala: "ලූණු",
          season: "Maha season prep",
          price: "Rs. 200-300/kg",
          regions: ["Anuradhapura", "Polonnaruwa"],
        },
        {
          name: "Chili",
          sinhala: "මිරිස්",
          season: "Peak harvest",
          price: "Rs. 400-600/kg",
          regions: ["Matale", "Kurunegala"],
        },
        {
          name: "Eggplant",
          sinhala: "වම්බටු",
          season: "Good quality",
          price: "Rs. 120-180/kg",
          regions: ["Kandy", "Matale"],
        },
        {
          name: "Okra",
          sinhala: "බණ්ඩක්කා",
          season: "Fresh harvest",
          price: "Rs. 150-220/kg",
          regions: ["Kurunegala", "Puttalam"],
        },
      ],
      tips: [
        "Preparation time for Maha season",
        "Good for spice cultivation",
        "Ideal for vegetable farming",
        "Perfect for land preparation",
      ],
      weatherPattern: "Second inter-monsoon with decreasing rainfall",
    },
  };

  const currentSeason = getCurrentSeason();
  const currentSeasonData = seasons[currentSeason];

  const openSeasonModal = (seasonKey) => {
    setSelectedSeason(seasons[seasonKey]);
    setShowModal(true);
  };

  return (
    <div className="season-info">
      <div className="season-container">
        <div className="season-header">
          <h2>Sri Lankan Agricultural Seasons</h2>
          <p>Discover the best crops and farming practices for each season</p>
        </div>

        <div className="current-season-highlight">
          <div
            className="current-season-card"
            onClick={() => openSeasonModal(currentSeason)}
          >
            <div
              className="season-icon"
              style={{ color: currentSeasonData.color }}
            >
              {currentSeasonData.icon}
            </div>
            <div className="season-content">
              <h3>Current Season</h3>
              <h4>{currentSeasonData.name}</h4>
              <p className="season-sinhala">{currentSeasonData.sinhala}</p>
              <p className="season-months">{currentSeasonData.months}</p>
              <div className="season-stats">
                <div className="stat">
                  <Thermometer size={16} />
                  <span>{currentSeasonData.temperature}</span>
                </div>
                <div className="stat">
                  <Droplets size={16} />
                  <span>{currentSeasonData.rainfall}</span>
                </div>
              </div>
            </div>
            <div className="click-indicator">
              <span>Click for details</span>
            </div>
          </div>
        </div>

        <div className="seasons-grid">
          {Object.entries(seasons).map(([key, season]) => (
            <div
              key={key}
              className={`season-card ${key === currentSeason ? "active" : ""}`}
              onClick={() => openSeasonModal(key)}
            >
              <div className="season-icon" style={{ color: season.color }}>
                {season.icon}
              </div>
              <h4>{season.name}</h4>
              <p className="season-sinhala">{season.sinhala}</p>
              <p className="season-months">{season.months}</p>
              <div className="season-preview">
                <span>{season.crops.length} crops in season</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Season Modal */}
      {showModal && selectedSeason && (
        <div
          className="season-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="season-modal" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-header"
              style={{
                background: `linear-gradient(135deg, ${selectedSeason.color}, ${selectedSeason.color}dd)`,
              }}
            >
              <div className="header-content">
                <div className="header-icon">{selectedSeason.icon}</div>
                <div>
                  <h3>{selectedSeason.name}</h3>
                  <p className="season-sinhala">{selectedSeason.sinhala}</p>
                  <p className="season-months">{selectedSeason.months}</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              {/* Weather Information */}
              <div className="weather-section">
                <h4>
                  <Cloud size={20} />
                  Weather Conditions
                </h4>
                <div className="weather-grid">
                  <div className="weather-item">
                    <Thermometer size={18} />
                    <div>
                      <span className="label">Temperature</span>
                      <span className="value">
                        {selectedSeason.temperature}
                      </span>
                    </div>
                  </div>
                  <div className="weather-item">
                    <CloudRain size={18} />
                    <div>
                      <span className="label">Rainfall</span>
                      <span className="value">{selectedSeason.rainfall}</span>
                    </div>
                  </div>
                  <div className="weather-item">
                    <Droplets size={18} />
                    <div>
                      <span className="label">Humidity</span>
                      <span className="value">{selectedSeason.humidity}</span>
                    </div>
                  </div>
                </div>
                <p className="weather-description">
                  {selectedSeason.weatherPattern}
                </p>
              </div>

              {/* Seasonal Crops */}
              <div className="crops-section">
                <h4>
                  <Leaf size={20} />
                  Seasonal Crops & Prices
                </h4>
                <div className="crops-grid">
                  {selectedSeason.crops.map((crop, index) => (
                    <div key={index} className="crop-card">
                      <div className="crop-header">
                        <h5>{crop.name}</h5>
                        <span className="crop-sinhala">{crop.sinhala}</span>
                      </div>
                      <div className="crop-details">
                        <div className="crop-info">
                          <Clock size={14} />
                          <span>{crop.season}</span>
                        </div>
                        <div className="crop-info">
                          <TrendingUp size={14} />
                          <span>{crop.price}</span>
                        </div>
                        <div className="crop-regions">
                          <MapPin size={14} />
                          <span>{crop.regions.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farming Tips */}
              <div className="tips-section">
                <h4>
                  <Sun size={20} />
                  Farming Tips
                </h4>
                <div className="tips-list">
                  {selectedSeason.tips.map((tip, index) => (
                    <div key={index} className="tip-item">
                      <span className="tip-number">{index + 1}</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Season Description */}
              <div className="description-section">
                <h4>Season Overview</h4>
                <p>{selectedSeason.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonInfo;
```

## File: src/context/AuthContext.jsx
```javascript
// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        userData
      );
      return {
        success: true,
        message: "Registration successful! Please wait for admin approval.",
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

## File: src/index.css
```css
/* src/index.css */
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light;
  color: #213547;
  background-color: #ffffff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  color: #333;
  overflow-x: hidden;
  width: 100%;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #f9f9f9;
  color: #213547;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
```

## File: src/main.jsx
```javascript
// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## File: src/pages/AdminDashboard.css
```css
/* src/pages/AdminDashboard.css */
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
  width: 100%;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: calc(100vw - 280px);
  max-width: calc(100vw - 280px);
  overflow-x: hidden;
}

.dashboard-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e1e5e9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.breadcrumb .separator {
  color: #999;
}

.breadcrumb .current {
  color: #3498db;
  font-weight: 500;
}

.content-area {
  flex: 1;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: #f8f9fa;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 0;
    width: 100vw;
    max-width: 100vw;
  }

  .dashboard-header {
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }
}
```

## File: src/pages/AdminDashboard.jsx
```javascript
// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import UserManagement from "../components/admin/UserManagement/UserManagement";
import GalleryManagement from "../components/admin/GalleryManagement/GalleryManagement";
import OfferManagement from "../components/admin/OfferManagement/OfferManagement";
import AdminProfile from "../components/admin/AdminProfile/AdminProfile";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("users");

  // Redirect if not admin
  if (!user || user.type !== "admin") {
    window.location.href = "/";
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "gallery":
        return <GalleryManagement />;
      case "offers":
        return <OfferManagement />;
      case "profile":
        return <AdminProfile />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userType="admin"
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="separator">›</span>
            <span className="current">
              {activeSection === "users" && "User Management"}
              {activeSection === "gallery" && "Gallery Management"}
              {activeSection === "offers" && "Offer Management"}
              {activeSection === "profile" && "Profile"}
            </span>
          </div>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
```

## File: src/pages/BuyerDashboard.css
```css
/* src/pages/BuyerDashboard.css */
.buyer-dashboard {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.dashboard-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e1e5e9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.breadcrumb .separator {
  color: #999;
}

.breadcrumb .current {
  color: #3498db;
  font-weight: 500;
}

.content-area {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 0;
  }

  .dashboard-header {
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }
}
```

## File: src/pages/BuyerDashboard.jsx
```javascript
// src/pages/BuyerDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import BuyerProfile from "../components/buyer/BuyerProfile/BuyerProfile";
import "./BuyerDashboard.css";

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");

  // Redirect if not buyer
  if (!user || user.type !== "buyer") {
    window.location.href = "/";
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <BuyerProfile />;
      default:
        return <BuyerProfile />;
    }
  };

  return (
    <div className="buyer-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userType="buyer"
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Buyer Dashboard</h1>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="separator">›</span>
            <span className="current">
              {activeSection === "profile" && "Profile"}
            </span>
          </div>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
```

## File: src/pages/FarmerDashboard.css
```css
/* src/pages/FarmerDashboard.css */
.farmer-dashboard {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
  width: 100%;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: calc(100vw - 280px);
  max-width: calc(100vw - 280px);
  overflow-x: hidden;
}

.dashboard-header {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #e1e5e9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.breadcrumb .separator {
  color: #999;
}

.breadcrumb .current {
  color: #27ae60;
  font-weight: 500;
}

.content-area {
  flex: 1;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: #f8f9fa;
  padding: 0;
  box-sizing: border-box;
}

/* Approval Pending Styles */
.approval-pending {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.approval-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.approval-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.approval-content h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.approval-content > p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.approval-info {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: left;
}

.approval-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.approval-info ul {
  list-style: none;
  padding: 0;
}

.approval-info li {
  padding: 0.5rem 0;
  color: #666;
  position: relative;
  padding-left: 1.5rem;
}

.approval-info li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: bold;
}

.back-home-btn {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-home-btn:hover {
  background: linear-gradient(45deg, #2ecc71, #58d68d);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .dashboard-content {
    margin-left: 0;
    width: 100vw;
    max-width: 100vw;
  }

  .dashboard-header {
    padding: 1rem;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }

  .approval-content {
    padding: 2rem;
  }

  .approval-content h2 {
    font-size: 1.5rem;
  }
}
```

## File: src/pages/Home.css
```css
/* src/pages/Home.css */
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.home-main {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.home-page > * {
  flex-shrink: 0;
  width: 100%;
}
```

## File: src/pages/Home.jsx
```javascript
// src/pages/Home.jsx
import React, { useState } from "react";
import Navbar from "../components/common/Navbar/Navbar";
import HeroSection from "../components/home/HeroSection/HeroSection";
import SearchFilter from "../components/home/SearchFilter/SearchFilter";
import ItemsGrid from "../components/home/ItemsGrid/ItemsGrid";
import SeasonInfo from "../components/home/SeasonInfo/SeasonInfo";
import Footer from "../components/common/Footer/Footer";
import "./Home.css";

const Home = () => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="home-main">
        <HeroSection />
        <SearchFilter onFilterChange={handleFilterChange} />
        <ItemsGrid filters={filters} />
        <SeasonInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
```

## File: src/utils/api.js
```javascript
// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || "http://localhost:5000",
  timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(
      `API Error: ${error.config?.url}`,
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
// Gallery API calls
export const galleryAPI = {
  // Add new gallery item
  addItem: async (itemData) => {
    try {
      const response = await api.post("/api/gallery/add", itemData);
      return response.data;
    } catch (error) {
      console.error("Error adding gallery item:", error);
      throw error;
    }
  },

  // Get farmer's gallery items
  getFarmerItems: async (farmerId) => {
    try {
      const response = await api.get(`/api/gallery/farmer/${farmerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching farmer gallery items:", error);
      throw error;
    }
  },
};
```

## File: vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

## File: src/components/admin/UserManagement/UserManagement.css
```css
/* src/components/admin/UserManagement/UserManagement.css */
.user-management {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.section-header p {
  color: #666;
  margin: 0;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-bar,
.filter-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-bar {
  flex: 1;
  min-width: 300px;
}

.search-icon,
.filter-icon {
  position: absolute;
  left: 1rem;
  color: #666;
  z-index: 1;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.filter-bar select {
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.loading-container {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.user-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #3498db;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.user-info h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.75rem 0;
}

.user-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.user-type {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.user-type.farmer {
  background: #e8f5e8;
  color: #4caf50;
}

.user-type.buyer {
  background: #e3f2fd;
  color: #2196f3;
}

.user-type.admin {
  background: #fff3e0;
  color: #ff9800;
}

.user-location {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
}

.user-phone {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.user-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.view-btn,
.approve-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
}

.view-btn {
  background: #3498db;
  color: white;
}

.view-btn:hover {
  background: #2980b9;
}

.approve-btn {
  background: #4caf50;
  color: white;
}

.approve-btn:hover {
  background: #45a049;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-users {
  text-align: center;
  padding: 4rem 0;
  color: #666;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  background: #3498db;
  color: white;
  padding: 1.5rem;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-body {
  padding: 2rem;
}

.user-detail-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 2rem;
  border: 4px solid #3498db;
}

.user-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
}

.detail-value {
  color: #666;
}

.detail-value.verified {
  color: #4caf50;
  font-weight: 600;
}

.detail-value.pending {
  color: #ff9800;
  font-weight: 600;
}

@media (max-width: 768px) {
  .user-management {
    padding: 1rem;
  }

  .controls {
    flex-direction: column;
  }

  .search-bar {
    min-width: auto;
  }

  .users-grid {
    grid-template-columns: 1fr;
  }

  .user-actions {
    flex-direction: column;
  }
}
/* Add to UserManagement.css */
.message {
  position: relative;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 500;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.approved {
  background: #d4edda;
  color: #155724;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
}

.user-detail-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 2rem;
  border: 4px solid #3498db;
}

.user-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-detail-info {
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
}

.detail-value {
  color: #666;
}

.detail-value.status-approved {
  color: #4caf50;
  font-weight: 600;
}

.detail-value.status-pending {
  color: #ff9800;
  font-weight: 600;
}

.approval-status {
  margin-top: 0.5rem;
  text-align: center;
}
```

## File: src/components/admin/UserManagement/UserManagement.jsx
```javascript
// src/components/admin/UserManagement/UserManagement.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Eye, Check, Trash2 } from "lucide-react";
import SearchFilterBar from "../../common/SearchFilterBar/SearchFilterBar";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterType]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((user) => user.type === filterType);
    }

    setFilteredUsers(filtered);
  };

  const approveUser = async (userId) => {
    try {
      console.log("Approving user:", userId);

      const response = await api.put(`/api/users/approve/${userId}`);

      if (response.data.success) {
        setMessage("User approved successfully!");
        fetchUsers();
      } else {
        setMessage("Failed to approve user");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      setMessage(
        `Failed to approve user: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/users/${userId}`);
        setMessage("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        setMessage("Failed to delete user");
      }
    }
  };

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filterOptions = [
    { value: "all", label: `All Users (${users.length})` },
    {
      value: "farmer",
      label: `Farmers (${users.filter((u) => u.type === "farmer").length})`,
    },
    {
      value: "buyer",
      label: `Buyers (${users.filter((u) => u.type === "buyer").length})`,
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>User Management</h2>
        <p>Manage farmers and buyers registration</p>
      </div>

      {/* FIXED: Add message display */}
      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
          <button onClick={() => setMessage("")} className="message-close">
            ×
          </button>
        </div>
      )}

      {/* Enhanced Search & Filter */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterValue={filterType}
        setFilterValue={setFilterType}
        filterOptions={filterOptions}
        onRefresh={fetchUsers}
        placeholder="Search by name or email..."
      />

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-avatar">
              <img
                src={user.img || "https://via.placeholder.com/150"}
                alt={user.firstName}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>

            <div className="user-info">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p className="user-email">{user.email}</p>
              <div className="user-meta">
                <span className={`user-type ${user.type}`}>
                  {user.type.toUpperCase()}
                </span>
                <span className="user-location">{user.location}</span>
              </div>
              {user.phone && <p className="user-phone">{user.phone}</p>}

              {/* FIXED: Add approval status display */}
              <div className="approval-status">
                <span
                  className={`status-badge ${
                    user.approvalStatus ||
                    (user.emailVerified ? "approved" : "pending")
                  }`}
                >
                  {user.approvalStatus ||
                    (user.emailVerified ? "Approved" : "Pending")}
                </span>
              </div>
            </div>

            <div className="user-actions">
              <button className="view-btn" onClick={() => viewUser(user)}>
                <Eye size={16} />
                View
              </button>

              {/* FIXED: Better approval status check */}
              {(!user.emailVerified || user.approvalStatus === "pending") && (
                <button
                  className="approve-btn"
                  onClick={() => approveUser(user._id)}
                  disabled={loading}
                >
                  <Check size={16} />
                  Approve
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
                disabled={loading}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-users">
          <h3>No users found</h3>
          <p>No users match your search criteria</p>
        </div>
      )}

      {/* FIXED: Complete User Detail Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>User Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-detail-image">
                <img
                  src={selectedUser.img || "https://via.placeholder.com/150"}
                  alt={selectedUser.firstName}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
              <div className="user-detail-info">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedUser.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{selectedUser.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedUser.location}</span>
                </div>
                {selectedUser.phone && (
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedUser.phone}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value status-${
                      selectedUser.approvalStatus ||
                      (selectedUser.emailVerified ? "approved" : "pending")
                    }`}
                  >
                    {selectedUser.approvalStatus ||
                      (selectedUser.emailVerified ? "Approved" : "Pending")}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Joined:</span>
                  <span className="detail-value">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">User ID:</span>
                  <span className="detail-value">{selectedUser._id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
```

## File: src/components/farmer/FarmerGallery/FarmerGallery.css
```css
/* src/components/farmer/FarmerGallery/FarmerGallery.css */
.farmer-gallery {
  padding: 2rem;
  background: #f8f9fa;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.header-content h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.header-content p {
  color: #666;
  margin: 0;
}

.create-btn {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.create-btn:hover {
  background: linear-gradient(45deg, #2ecc71, #58d68d);
  transform: translateY(-2px);
}

/* Message */
.message {
  position: relative;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.message-close {
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
}

/* Enhanced Search & Filter Bar */
.search-filter-bar {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8ecef;
}

.search-filter-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.enhanced-search-bar {
  flex: 1;
  min-width: 300px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.search-input-wrapper:hover {
  border-color: #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input-wrapper:focus-within {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  background: white;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #6c757d;
  z-index: 1;
  transition: color 0.3s ease;
}

.search-input-wrapper:focus-within .search-icon {
  color: #4caf50;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #495057;
  outline: none;
  font-weight: 500;
}

.search-input::placeholder {
  color: #adb5bd;
  font-weight: 400;
}

.clear-search-btn {
  position: absolute;
  right: 0.75rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.clear-search-btn:hover {
  background: #495057;
  opacity: 1;
  transform: scale(1.1);
}

.enhanced-filter-bar {
  min-width: 200px;
}

.filter-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.filter-wrapper:hover {
  border-color: #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-wrapper:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  background: white;
}

.filter-icon {
  position: absolute;
  left: 1rem;
  color: #6c757d;
  z-index: 1;
  transition: color 0.3s ease;
}

.filter-wrapper:focus-within .filter-icon {
  color: #007bff;
}

.filter-select {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #495057;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
  padding-right: 3rem;
}

.clear-filter-btn {
  position: absolute;
  right: 2.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.clear-filter-btn:hover {
  background: #495057;
  opacity: 1;
  transform: scale(1.1);
}

.refresh-btn {
  background: linear-gradient(135deg, #17a2b8, #138496);
  color: white;
  border: none;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(23, 162, 184, 0.2);
}

.refresh-btn:hover {
  background: linear-gradient(135deg, #138496, #117a8b);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
}

.active-filters {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  flex-wrap: wrap;
}

.active-filters-label {
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 600;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
}

.filter-tag button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.filter-tag button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.item-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #27ae60;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(39, 174, 96, 0.2);
}

.item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  width: 100%;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.status-badge.pending {
  background: #ff9800;
}

.status-badge.approved {
  background: #4caf50;
}

/* Gallery Badge */
.gallery-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(39, 174, 96, 0.4);
  z-index: 2;
}

.item-content {
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.item-content h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.item-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #27ae60;
  margin: 0 0 1rem 0;
}

.item-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.item-category,
.item-location {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
}

.item-category {
  background: #e8f5e8;
  color: #27ae60;
}

.item-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.item-date {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.view-btn,
.edit-btn,
.delete-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
}

.view-btn {
  background: #3498db;
  color: white;
}

.view-btn:hover {
  background: #2980b9;
}

.edit-btn {
  background: #f39c12;
  color: white;
}

.edit-btn:hover {
  background: #e67e22;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
}

/* No Items */
.no-items {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.no-items h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.create-first-btn {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.create-first-btn:hover {
  background: linear-gradient(45deg, #2ecc71, #58d68d);
  transform: translateY(-2px);
}

/* Loading */
.loading-container {
  text-align: center;
  padding: 4rem 0;
  width: 100%;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

/* Enhanced Modal Styles for Gallery */
.create-modal {
  max-width: 900px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 100%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-content h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.header-content p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.85rem;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Enhanced Form Styles */
.enhanced-modal-form {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Image Upload Section */
.image-upload-section {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
}

.image-preview {
  position: relative;
  width: 150px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  border: 2px solid #e9ecef;
  flex-shrink: 0;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  text-align: center;
}

.image-placeholder p {
  margin: 0.5rem 0 0 0;
  font-weight: 600;
  font-size: 0.9rem;
}

.upload-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.upload-btn {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.upload-controls small {
  color: #6c757d;
  font-size: 0.8rem;
  text-align: center;
}

.form-help {
  color: #6c757d;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 0.5rem;
}

/* Image Upload Styles */
.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(231, 76, 60, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  z-index: 2;
}

.remove-image-btn:hover {
  background: #e74c3c;
  transform: scale(1.1);
}

.current-image-label {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 2;
}

/* Gallery Badge Preview */
.gallery-badge-preview {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
  z-index: 2;
}

/* Gallery Overlay */
.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(39, 174, 96, 0.1),
    rgba(46, 204, 113, 0.1)
  );
  pointer-events: none;
}

/* Form Sections */
.form-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.85rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.7rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #27ae60;
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
  background: white;
}

.char-count {
  text-align: right;
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.2rem;
}

/* Quality Badges */
.quality-badges {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.quality-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(45deg, #e8f5e8, #d4edda);
  color: #27ae60;
  padding: 0.6rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  border: 2px solid #c3e6cb;
  font-size: 0.85rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 2px solid #f8f9fa;
}

.submit-btn {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  min-width: 150px;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #2ecc71, #58d68d);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cancel-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

/* View Modal */
.view-modal {
  max-width: 700px;
}

.view-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.view-image {
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
}

.view-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.view-details h4 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  text-align: center;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.85rem;
}

.detail-value {
  color: #666;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #27ae60;
}

.description-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.description-section h5 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description-section p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.item-id-section {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
}

/* View Modal Gallery Badge */
.modal-gallery-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(45deg, #27ae60, #2ecc71);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 3px 10px rgba(39, 174, 96, 0.4);
  z-index: 2;
}

/* Gallery Highlights */
.gallery-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #e8f5e8, #d4edda);
  padding: 0.75rem;
  border-radius: 12px;
  border: 2px solid #c3e6cb;
  color: #27ae60;
  font-weight: 500;
  text-align: center;
  justify-content: center;
}

/* Gallery Actions */
.gallery-actions {
  background: linear-gradient(45deg, #e8f5e8, #d4edda);
  padding: 1.5rem;
  border-radius: 0 0 12px 12px;
  border-top: 2px solid #c3e6cb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .farmer-gallery {
    padding: 1rem;
  }

  .gallery-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .search-filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .enhanced-search-bar,
  .enhanced-filter-bar {
    min-width: auto;
  }

  .items-grid {
    grid-template-columns: 1fr;
  }

  .item-actions {
    flex-direction: column;
  }

  .create-modal {
    width: 95%;
    max-height: 90vh;
  }

  .enhanced-modal-form {
    padding: 1rem;
  }

  .image-upload-section {
    flex-direction: column;
    text-align: center;
  }

  .image-preview {
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .gallery-highlights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .modal-header {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 0.3rem;
  }

  .header-icon {
    width: 35px;
    height: 35px;
  }

  .close-btn {
    top: 0.5rem;
    right: 0.5rem;
    width: 30px;
    height: 30px;
  }

  .gallery-highlights {
    grid-template-columns: 1fr;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animation for smooth transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles for accessibility */
.search-input:focus,
.filter-select:focus,
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus,
.submit-btn:focus,
.cancel-btn:focus {
  outline: 2px solid #27ae60;
  outline-offset: 2px;
}

/* Hover effects for better UX */
.form-group:hover label {
  color: #27ae60;
}

/* Enhanced visual feedback */
.search-bar-container:hover .search-icon {
  color: #27ae60;
  transform: scale(1.05);
}

/* Smooth color transitions */
.farmer-gallery * {
  transition: color 0.3s ease, background-color 0.3s ease,
    border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
```

## File: src/components/farmer/FarmerOffers/FarmerOffers.css
```css
/* src/components/farmer/FarmerOffers/FarmerOffers.css */
.farmer-offers {
  padding: 2rem;
  background: #f8f9fa;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.offers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.header-content h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.header-content p {
  color: #666;
  margin: 0;
}

/* Offers Grid */
.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.offer-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #e74c3c;
  width: 100%;
  box-sizing: border-box;
}

.offer-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(231, 76, 60, 0.2);
}

.offer-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  width: 100%;
}

.offer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.offer-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

.offer-content {
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

.offer-content h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.offer-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 1rem 0;
}

.offer-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.offer-category,
.offer-location {
  background: #f8f9fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #666;
}

.offer-category {
  background: #ffebee;
  color: #e74c3c;
}

.offer-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.offer-conditions {
  background: #fff3e0;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 3px solid #ff9800;
}

.offer-conditions strong {
  color: #e65100;
  font-size: 0.9rem;
}

.offer-conditions ul {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
}

.offer-conditions li {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.offer-date {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}

.offer-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

/* No Offers */
.no-offers {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
}

.no-offers h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

/* Enhanced Modal Styles for Offers - Smaller & Wider */
.offer-modal .modal-header {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.offer-preview {
  border: 2px solid #e74c3c;
}

.offer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}

.offer-badge-preview {
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: bold;
}

.offer-upload {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.offer-upload:hover {
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.offer-title {
  color: #e74c3c;
}

.offer-form .form-group input:focus,
.offer-form .form-group select:focus,
.offer-form .form-group textarea:focus {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}
.form-help {
  color: #6c757d;
  font-size: 0.8rem;
  text-align: center;
}
.price-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.price-label {
  position: absolute;
  right: 0.8rem;
  color: #6c757d;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Conditions Input */
.conditions-input-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.condition-input-wrapper {
  display: flex;
  gap: 0.5rem;
}

.condition-input-wrapper input {
  flex: 1;
}

.add-condition-btn {
  background: linear-gradient(45deg, #17a2b8, #138496);
  color: white;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-condition-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #138496, #117a8b);
  transform: translateY(-2px);
}

.add-condition-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.conditions-list h5 {
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
}

.condition-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff3e0;
  border: 1px solid #ffcc02;
  padding: 0.6rem;
  border-radius: 8px;
  margin-bottom: 0.4rem;
}

.remove-condition {
  background: #e74c3c;
  color: white;
  border: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-condition:hover {
  background: #c0392b;
  transform: scale(1.1);
}

/* Offer Highlights */
.offer-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #ffebee, #fce4ec);
  color: #e74c3c;
  padding: 0.8rem;
  border-radius: 10px;
  font-weight: 500;
  border: 2px solid #f8bbd9;
  font-size: 0.85rem;
}

/* Form Actions for Offers */
.offer-actions .form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 2px solid #f8f9fa;
}

.offer-submit {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
}

.offer-submit:hover:not(:disabled) {
  background: linear-gradient(45deg, #c0392b, #a93226);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

/* View Modal for Offers */
.modal-offer-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.conditions-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.conditions-section h5 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.conditions-view-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conditions-view-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #666;
  border-bottom: 1px solid #eee;
}

.conditions-view-list li:last-child {
  border-bottom: none;
}

.offer-id-section {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .farmer-offers {
    padding: 1rem;
  }

  .offers-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .offers-grid {
    grid-template-columns: 1fr;
  }

  .offer-actions {
    flex-direction: column;
  }

  .condition-input-wrapper {
    flex-direction: column;
  }

  .offer-highlights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .offer-highlights {
    grid-template-columns: 1fr;
  }
}
/* Offer-specific Image Upload Styles */
.offer-preview {
  position: relative;
  overflow: hidden;
}

.offer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 193, 7, 0.1),
    rgba(255, 152, 0, 0.1)
  );
  pointer-events: none;
}

.offer-badge-preview {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(45deg, #ff9800, #ff5722);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
  z-index: 2;
}

.offer-upload {
  background: linear-gradient(45deg, #ff9800, #ff5722);
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.offer-upload:hover {
  background: linear-gradient(45deg, #f57c00, #e64a19);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
}

/* Offer Form Styling */
.offer-modal {
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
}

.offer-title {
  color: #ff9800;
  border-bottom: 2px solid #ff9800;
  padding-bottom: 8px;
}

.price-input-wrapper {
  position: relative;
}

.price-label {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(45deg, #ff9800, #ff5722);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

/* Conditions Styling */
.conditions-input-section {
  background: #fff8e1;
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #ffcc02;
}

.condition-input-wrapper {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.condition-input-wrapper input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ffcc02;
  border-radius: 8px;
  background: white;
}

.add-condition-btn {
  background: #ff9800;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.add-condition-btn:hover:not(:disabled) {
  background: #f57c00;
  transform: translateY(-1px);
}

.add-condition-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.conditions-list {
  margin-top: 1rem;
}

.conditions-list h5 {
  color: #ff9800;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.condition-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 2px solid #ff9800;
  color: #ff9800;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.remove-condition {
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transition: all 0.2s ease;
}

.remove-condition:hover {
  background: #d32f2f;
  transform: scale(1.1);
}

/* Offer Highlights */
.offer-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #fff3e0, #ffcc02);
  padding: 0.75rem;
  border-radius: 12px;
  border: 2px solid #ffcc02;
  color: #e65100;
  font-weight: 500;
  text-align: center;
  justify-content: center;
}

/* Offer Card Specific Styles */
.offer-card .offer-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(45deg, #ff9800, #ff5722);
  color: white;
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(255, 152, 0, 0.4);
  z-index: 2;
}

.offer-conditions {
  background: #fff8e1;
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
  margin: 0.5rem 0;
}

.offer-conditions strong {
  color: #ff9800;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.offer-conditions ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1rem;
  list-style: none;
}

.offer-conditions li {
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: #666;
}

.offer-conditions li:before {
  content: "•";
  color: #ff9800;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* Offer Submit Button */
.offer-submit {
  background: linear-gradient(45deg, #ff9800, #ff5722);
  border: none;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.offer-submit:hover:not(:disabled) {
  background: linear-gradient(45deg, #f57c00, #e64a19);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
}

/* View Modal Offer Badge */
.modal-offer-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(45deg, #ff9800, #ff5722);
  color: white;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 3px 10px rgba(255, 152, 0, 0.4);
  z-index: 2;
}

/* Conditions View List */
.conditions-view-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.conditions-view-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #fff8e1;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border-left: 4px solid #ff9800;
  font-size: 0.9rem;
  color: #666;
}

.conditions-view-list li svg {
  color: #ff9800;
  flex-shrink: 0;
}

/* Offer Actions */
.offer-actions {
  background: linear-gradient(45deg, #fff3e0, #ffcc02);
  padding: 1.5rem;
  border-radius: 0 0 12px 12px;
  border-top: 2px solid #ffcc02;
}

/* Loading Spinner for Offers */
.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

/* Responsive Design for Offers */
@media (max-width: 768px) {
  .offer-modal {
    max-width: 95vw;
    margin: 1rem;
  }

  .offer-highlights {
    grid-template-columns: 1fr;
  }

  .condition-input-wrapper {
    flex-direction: column;
  }

  .price-label {
    position: static;
    transform: none;
    display: inline-block;
    margin-top: 0.5rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

## File: src/components/home/ItemsGrid/ItemsGrid.css
```css
.items-grid-section {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 3rem 0;
  min-height: 70vh;
}

.items-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.items-header {
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
}

.items-header::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #2ecc71);
  border-radius: 2px;
}

.items-header h3 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  background: linear-gradient(45deg, #2c3e50, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.items-header p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.items-loading {
  text-align: center;
  padding: 4rem 0;
  background: white;
  border-radius: 20px;
  margin: 2rem 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.items-loading p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.item-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(76, 175, 80, 0.1);
  cursor: pointer;
  max-width: 320px;
}

.item-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(76, 175, 80, 0.15);
  border-color: rgba(76, 175, 80, 0.3);
}

.item-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #2ecc71, #27ae60);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item-card:hover::before {
  opacity: 1;
}

.item-image-container {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.item-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
}

.item-card:hover .item-image-container img {
  transform: scale(1.1);
}

.item-image-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1),
    rgba(46, 204, 113, 0.1)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item-card:hover .item-image-container::after {
  opacity: 1;
}

.item-type-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.item-type-badge.gallery {
  background: linear-gradient(45deg, #3498db, #2980b9);
}

.item-type-badge.offer {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.item-content {
  padding: 1.2rem;
  position: relative;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.4rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: #27ae60;
  margin: 0 0 0.8rem 0;
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.item-price::before {
  content: "Rs.";
  font-size: 1rem;
  opacity: 0.8;
}

.item-price::after {
  content: "/kg";
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.6rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  border: 1px solid #e9ecef;
}

.item-category,
.item-location {
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.item-category {
  background: linear-gradient(45deg, #e8f5e8, #d4edda);
  color: #27ae60;
  border: 1px solid #c3e6cb;
}

.item-location {
  background: linear-gradient(45deg, #e3f2fd, #bbdefb);
  color: #1976d2;
  border: 1px solid #90caf9;
}

.item-description {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.farmer-preview {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.4rem 0;
  padding: 0.4rem;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 8px;
  font-size: 0.8rem;
  color: #666;
  border-left: 3px solid #4caf50;
  transition: all 0.3s ease;
}

.farmer-preview:hover {
  background: rgba(76, 175, 80, 0.1);
  transform: translateX(5px);
}

.farmer-preview svg {
  color: #4caf50;
  flex-shrink: 0;
}

.item-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
}

.view-btn,
.farmer-btn {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
}

.view-btn::before,
.farmer-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.view-btn:hover::before,
.farmer-btn:hover::before {
  left: 100%;
}

.view-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.view-btn:hover {
  background: linear-gradient(45deg, #2980b9, #21618c);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
}

.farmer-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.farmer-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

.load-more-container {
  text-align: center;
  margin-top: 3rem;
}

.load-more-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  position: relative;
  overflow: hidden;
}

.load-more-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.load-more-btn:hover::before {
  left: 100%;
}

.load-more-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.no-items,
.no-items-message {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
}

.no-items h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.no-items p,
.no-items-message p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
}

.item-modal-overlay,
.farmer-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.item-modal,
.farmer-modal {
  background: white;
  border-radius: 20px;
  max-width: 1100px;
  width: 95%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.farmer-header {
  background: linear-gradient(135deg, #4caf50, #45a049);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.modal-close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modal-content {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem;
  min-height: 500px;
  max-height: 75vh;
  overflow: hidden;
  align-items: flex-start;
}

.modal-image {
  position: relative;
  width: 300px;
  min-width: 300px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 3px solid #4caf50;
  order: 1;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: block;
}

.modal-image:hover img {
  transform: scale(1.05);
}

.modal-offer-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  z-index: 10;
  animation: pulse 2s infinite;
}

.modal-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  overflow-y: auto;
  padding-right: 1rem;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  order: 2;
  max-height: 100%;
}

.modal-details::-webkit-scrollbar {
  width: 10px;
}

.modal-details::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

.modal-details::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #4caf50, #45a049);
  border-radius: 5px;
  border: 2px solid #f1f1f1;
}

.modal-details::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
}

.modal-details h4 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(45deg, #2c3e50, #4caf50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-price {
  font-size: 1.8rem;
  font-weight: 900;
  color: #4caf50;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
  border-radius: 12px;
  border-left: 5px solid #4caf50;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
}

.modal-price::before {
  content: "Rs.";
  font-size: 1.3rem;
  opacity: 0.8;
  color: #27ae60;
}

.modal-price::after {
  content: "/kg";
  font-size: 1.1rem;
  color: #666;
  font-weight: 600;
}

.product-info-section,
.description-section,
.conditions-section,
.quick-farmer-info {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 15px;
  padding: 1.5rem;
  border-left: 5px solid #4caf50;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.product-info-section:hover,
.description-section:hover,
.conditions-section:hover,
.quick-farmer-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.1);
}

.product-info-section h5,
.description-section h5,
.conditions-section h5,
.quick-farmer-info h5 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.product-info-section h5 svg,
.description-section h5 svg,
.conditions-section h5 svg,
.quick-farmer-info h5 svg {
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.3rem;
  border-radius: 50%;
  width: 24px;
  height: 24px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  background: rgba(76, 175, 80, 0.05);
  border-radius: 10px;
  color: #666;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(76, 175, 80, 0.1);
  transform: translateX(5px);
}

.detail-item svg {
  color: #4caf50;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background: white;
  padding: 0.2rem;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
}

.detail-item strong {
  color: #2c3e50;
  margin-right: 0.5rem;
  min-width: 100px;
  font-size: 0.9rem;
  font-weight: 600;
}

.description-section p {
  color: #666;
  line-height: 1.7;
  margin: 0;
  font-size: 1rem;
  text-align: justify;
}

.conditions-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.conditions-section li {
  padding: 1rem;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 10px;
  margin-bottom: 0.8rem;
  border-left: 4px solid #4caf50;
  color: #666;
  font-size: 0.9rem;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.conditions-section li:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
}

.conditions-section li::before {
  content: "✓";
  position: absolute;
  left: -2px;
  top: 50%;
  transform: translateY(-50%);
  background: #4caf50;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.farmer-quick-details {
  background: linear-gradient(135deg, #ffffff, #f0f8f0);
  padding: 1.2rem;
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
}

.farmer-quick-details p {
  margin: 0.6rem 0;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.farmer-quick-details p strong {
  color: #2c3e50;
  font-weight: 600;
}

.view-full-farmer-btn {
  background: linear-gradient(45deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  position: relative;
  overflow: hidden;
}

.view-full-farmer-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.view-full-farmer-btn:hover::before {
  left: 100%;
}

.view-full-farmer-btn:hover {
  background: linear-gradient(45deg, #45a049, #3d8b40);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.farmer-profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-bottom: 1px solid #eee;
}

.farmer-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #4caf50;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.farmer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.farmer-basic-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
}

.farmer-type {
  color: #4caf50;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.farmer-item-info {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.farmer-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 2rem;
}

.farmer-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 3px solid #4caf50;
  transition: all 0.3s ease;
}

.farmer-detail-item:hover {
  background: rgba(76, 175, 80, 0.05);
  transform: translateY(-2px);
}

.farmer-detail-item svg {
  color: #4caf50;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.farmer-detail-item strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.farmer-detail-item p {
  margin: 0;
  color: #666;
  word-break: break-word;
}

.farmer-contact-actions {
  padding: 0 2rem 2rem;
}

.farmer-contact-actions h5 {
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.contact-buttons {
  display: flex;
  gap: 1rem;
}

.contact-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.contact-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.contact-btn:hover::before {
  left: 100%;
}

.email-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.email-btn:hover {
  background: linear-gradient(45deg, #2980b9, #21618c);
  transform: translateY(-2px);
  color: white;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(52, 152, 219, 0.4);
}

.phone-btn {
  background: linear-gradient(45deg, #27ae60, #219a52);
  color: white;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.phone-btn:hover {
  background: linear-gradient(45deg, #219a52, #1e8449);
  transform: translateY(-2px);
  color: white;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
}

@media (min-width: 769px) {
  .modal-content {
    display: flex !important;
    flex-direction: row !important;
  }

  .modal-image {
    order: 1 !important;
    width: 300px !important;
    min-width: 300px !important;
  }

  .modal-details {
    order: 2 !important;
    flex: 1 !important;
  }
}

@media (max-width: 768px) {
  .items-container {
    padding: 0 1rem;
  }

  .items-header h3 {
    font-size: 2rem;
  }

  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .item-content {
    padding: 1rem;
  }

  .item-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-image-container {
    height: 160px;
  }

  .modal-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-height: 85vh;
  }

  .modal-image {
    width: 100%;
    min-width: auto;
    height: 200px;
    order: -1;
  }

  .modal-details {
    max-height: 400px;
    padding: 1rem;
    order: 1;
  }

  .modal-details h4 {
    font-size: 1.5rem;
  }

  .modal-price {
    font-size: 1.4rem;
  }

  .farmer-profile-section {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }

  .farmer-details-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .contact-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .items-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .item-content {
    padding: 0.8rem;
  }

  .item-name {
    font-size: 1rem;
  }

  .item-price {
    font-size: 1.2rem;
  }

  .item-image-container {
    height: 150px;
  }

  .item-meta {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .items-header h3 {
    font-size: 1.8rem;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-image {
    height: 180px;
  }

  .modal-details {
    max-height: 350px;
  }

  .product-info-section,
  .description-section,
  .conditions-section,
  .quick-farmer-info {
    padding: 1rem;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }

  .detail-item strong {
    min-width: auto;
  }
}

.items-grid.compact {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.items-grid.compact .item-card {
  max-width: 250px;
}

.items-grid.compact .item-image-container {
  height: 140px;
}

.items-grid.compact .item-content {
  padding: 1rem;
}

.items-grid.compact .item-name {
  font-size: 1rem;
}

.items-grid.compact .item-price {
  font-size: 1.2rem;
}

.item-card {
  animation: fadeInUp 0.6s ease-out;
}

.item-card:nth-child(1) {
  animation-delay: 0.1s;
}
.item-card:nth-child(2) {
  animation-delay: 0.2s;
}
.item-card:nth-child(3) {
  animation-delay: 0.3s;
}
.item-card:nth-child(4) {
  animation-delay: 0.4s;
}
.item-card:nth-child(5) {
  animation-delay: 0.5s;
}
.item-card:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-btn:focus,
.farmer-btn:focus,
.load-more-btn:focus,
.contact-btn:focus {
  outline: 3px solid rgba(76, 175, 80, 0.3);
  outline-offset: 2px;
}

.item-card:active {
  transform: translateY(-4px) scale(1.01);
}

.view-btn:active,
.farmer-btn:active {
  transform: translate;
}
```

## File: src/pages/FarmerDashboard.jsx
```javascript
// src/pages/FarmerDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/common/Sidebar/Sidebar";
import FarmerProfile from "../components/farmer/FarmerProfile/FarmerProfile";
import FarmerGallery from "../components/farmer/FarmerGallery/FarmerGallery";
import FarmerOffers from "../components/farmer/FarmerOffers/FarmerOffers";
import api from "../utils/api";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if not farmer
  if (!user || user.type !== "farmer") {
    window.location.href = "/";
    return null;
  }

  // Check if farmer is approved
  if (!user.emailVerified) {
    return (
      <div className="farmer-dashboard">
        <div className="approval-pending">
          <div className="approval-content">
            <div className="approval-icon">⏳</div>
            <h2>Account Pending Approval</h2>
            <p>
              Your farmer account is currently under review by our
              administrators. You will be able to access your dashboard and
              upload items once your account is approved.
            </p>
            <div className="approval-info">
              <h3>What happens next?</h3>
              <ul>
                <li>Our team will review your registration details</li>
                <li>You'll receive an email notification once approved</li>
                <li>After approval, you can start uploading your products</li>
              </ul>
            </div>
            <button
              className="back-home-btn"
              onClick={() => (window.location.href = "/")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Gallery item create function
  const handleCreateGalleryItem = async (formData) => {
    try {
      setLoading(true);
      setMessage("");

      // Image field optional කරන්න
      const galleryData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        harvestDay: formData.harvestDay,
        // Image optional - only include if provided
        ...(formData.image && { image: formData.image }),
      };

      console.log("Creating gallery item:", galleryData);

      const response = await api.post("/api/gallery/create", galleryData);

      setMessage("Gallery item created successfully!");

      // Refresh gallery items if needed
      if (window.refreshGalleryItems) {
        window.refreshGalleryItems();
      }
    } catch (error) {
      console.error("Error creating gallery item:", error);
      setMessage(
        error.response?.data?.message || "Failed to create gallery item"
      );
    } finally {
      setLoading(false);
    }
  };

  // Offer create function
  const handleCreateOffer = async (formData) => {
    try {
      setLoading(true);
      setMessage("");

      // Image field optional කරන්න
      const offerData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        harvestDay: formData.harvestDay,
        condition: formData.conditions || [], // if applicable
        // Image optional - only include if provided
        ...(formData.image && { image: formData.image }),
      };

      console.log("Creating offer:", offerData);

      const response = await api.post("/api/offers", offerData);

      setMessage("Offer created successfully!");

      // Refresh offers if needed
      if (window.refreshOffers) {
        window.refreshOffers();
      }
    } catch (error) {
      console.error("Error creating offer:", error);
      setMessage(error.response?.data?.message || "Failed to create offer");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <FarmerProfile />;
      case "gallery":
        return (
          <FarmerGallery
            onCreateItem={handleCreateGalleryItem}
            loading={loading}
            message={message}
            setMessage={setMessage}
          />
        );
      case "offers":
        return (
          <FarmerOffers
            onCreateOffer={handleCreateOffer}
            loading={loading}
            message={message}
            setMessage={setMessage}
          />
        );
      default:
        return <FarmerProfile />;
    }
  };

  return (
    <div className="farmer-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        userType="farmer"
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Farmer Dashboard</h1>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="separator">›</span>
            <span className="current">
              {activeSection === "profile" && "Profile"}
              {activeSection === "gallery" && "Gallery Items"}
              {activeSection === "offers" && "Special Offers"}
            </span>
          </div>
        </div>
        <div className="content-area">{renderContent()}</div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
```

## File: src/components/admin/OfferManagement/OfferManagement.jsx
```javascript
// src/components/admin/OfferManagement/OfferManagement.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import { Eye, Check, Trash2 } from "lucide-react";
import SearchFilterBar from "../../common/SearchFilterBar/SearchFilterBar";
import "./OfferManagement.css";

const OfferManagement = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm, filterStatus]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      console.log("Fetching offers from backend...");

      const response = await api.get("/api/offers/admin/all");
      let offersData = response.data || [];
      console.log("Raw offers API response:", offersData);

      if (!Array.isArray(offersData)) {
        if (offersData && typeof offersData === "object") {
          offersData =
            offersData.offers || offersData.data || offersData.items || [];
        } else {
          offersData = [];
        }
      }

      console.log("Processed offers data:", offersData);
      setOffers(offersData);

      if (offersData.length === 0) {
        setMessage(
          "No offers found. Make sure farmers have created offers and backend is running."
        );
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
      setMessage(
        `Failed to connect to backend server. Error: ${error.message}`
      );
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    if (!Array.isArray(offers)) {
      setFilteredOffers([]);
      return;
    }

    let filtered = [...offers];

    if (searchTerm) {
      filtered = filtered.filter(
        (offer) =>
          offer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((offer) => offer.status === filterStatus);
    }

    setFilteredOffers(filtered);
  };

  const approveOffer = async (itemId) => {
    try {
      console.log("Approving offer:", itemId);
      await api.put(`/api/offers/approve/${itemId}`);
      setMessage("Offer approved successfully!");
      fetchOffers();
    } catch (error) {
      console.error("Error approving offer:", error);
      setMessage(`Failed to approve offer: ${error.message}`);
    }
  };

  // src/components/admin/OfferManagement/OfferManagement.jsx
  // Update the deleteOffer function

  const deleteOffer = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        console.log("Deleting offer:", itemId);

        // FIXED: Use the correct API endpoint
        await api.delete(`/api/offers/delete/${itemId}`);

        setMessage("Offer deleted successfully!");
        fetchOffers();
      } catch (error) {
        console.error("Error deleting offer:", error);
        setMessage(
          `Failed to delete offer: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  const viewOffer = async (offer) => {
    try {
      console.log("Viewing offer:", offer);

      // You can either use the local offer data or fetch fresh data from backend
      setSelectedOffer(offer);
      setShowModal(true);

      // Optional: Fetch fresh data from backend
      // const response = await api.get(`/api/offers/${offer.itemId || offer._id}`);
      // if (response.data.success) {
      //   setSelectedOffer(response.data.offer);
      // }
    } catch (error) {
      console.error("Error viewing offer:", error);
      setMessage(`Failed to view offer: ${error.message}`);
    }
  };

  const filterOptions = [
    { value: "all", label: `All Offers (${offers.length})` },
    {
      value: "pending",
      label: `Pending (${offers.filter((o) => o.status === "pending").length})`,
    },
    {
      value: "approved",
      label: `Approved (${
        offers.filter((o) => o.status === "approved").length
      })`,
    },
  ];

  if (loading) {
    return (
      <div className="offer-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading offers from backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="offer-management">
      <div className="section-header">
        <h2>Offer Management</h2>
        <p>Manage farmer special offers ({offers.length} total offers)</p>
      </div>
      {/* Message */}
      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
          <button onClick={() => setMessage("")} className="message-close">
            ×
          </button>
        </div>
      )}

      {showModal && selectedOffer && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Special Offer Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="offer-detail-image">
                <img
                  src={
                    selectedOffer.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
                  }
                  alt={selectedOffer.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className="modal-offer-badge">SPECIAL OFFER</div>
              </div>
              <div className="offer-details">
                <h4>{selectedOffer.name}</h4>
                <div className="detail-row">
                  <span className="detail-label">Special Price:</span>
                  <span className="detail-value">
                    Rs. {selectedOffer.price}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{selectedOffer.category}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedOffer.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Harvest Date:</span>
                  <span className="detail-value">
                    {selectedOffer.harvestDay
                      ? new Date(selectedOffer.harvestDay).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`detail-value status-${selectedOffer.status}`}
                  >
                    {selectedOffer.status?.toUpperCase()}
                  </span>
                </div>
                <div className="description-section">
                  <strong>Description:</strong>
                  <p>{selectedOffer.description}</p>
                </div>
                {selectedOffer.condition &&
                  Array.isArray(selectedOffer.condition) &&
                  selectedOffer.condition.length > 0 && (
                    <div className="conditions-section">
                      <strong>Offer Conditions:</strong>
                      <ul>
                        {selectedOffer.condition.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                <div className="offer-id-section">
                  <strong>Offer ID:</strong>{" "}
                  {selectedOffer.itemId || selectedOffer._id}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Enhanced Search & Filter */}
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterValue={filterStatus}
        setFilterValue={setFilterStatus}
        filterOptions={filterOptions}
        onRefresh={fetchOffers}
        placeholder="Search by offer name, category, or location..."
      />
      <div className="offers-grid">
        {Array.isArray(filteredOffers) && filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div key={offer._id || offer.id} className="offer-card">
              <div className="offer-image">
                <img
                  src={offer.image}
                  alt={offer.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className={`status-badge ${offer.status}`}>
                  {offer.status?.toUpperCase()}
                </div>
                <div className="offer-badge">SPECIAL OFFER</div>
              </div>

              <div className="offer-content">
                <h3>{offer.name}</h3>
                <p className="offer-price">Rs. {offer.price}</p>
                <div className="offer-meta">
                  <span className="offer-category">{offer.category}</span>
                  <span className="offer-location">{offer.location}</span>
                </div>
                <p className="offer-description">
                  {offer.description && offer.description.length > 80
                    ? `${offer.description.substring(0, 80)}...`
                    : offer.description}
                </p>
                {offer.condition &&
                  Array.isArray(offer.condition) &&
                  offer.condition.length > 0 && (
                    <div className="offer-conditions">
                      <strong>Conditions:</strong>
                      <ul>
                        {offer.condition.slice(0, 2).map((cond, index) => (
                          <li key={index}>{cond}</li>
                        ))}
                        {offer.condition.length > 2 && (
                          <li>+{offer.condition.length - 2} more...</li>
                        )}
                      </ul>
                    </div>
                  )}
                <div className="offer-date">
                  <strong>Harvest:</strong>{" "}
                  {offer.harvestDay
                    ? new Date(offer.harvestDay).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>

              <div className="offer-actions">
                <button className="view-btn" onClick={() => viewOffer(offer)}>
                  <Eye size={16} />
                  View
                </button>

                {offer.status === "pending" && (
                  <button
                    className="approve-btn"
                    onClick={() => approveOffer(offer.itemId || offer._id)}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteOffer(offer.itemId || offer._id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-offers">
            <h3>No offers found</h3>
            <p>
              {offers.length === 0
                ? "No special offers available. Please ensure backend server is running on http://localhost:5000 and farmers have created offers."
                : "No offers match your search criteria"}
            </p>
          </div>
        )}
      </div>
      {/* Modal remains the same */}
    </div>
  );
};

export default OfferManagement;
```

## File: src/components/farmer/FarmerGallery/FarmerGallery.jsx
```javascript
// src/components/farmer/FarmerGallery/FarmerGallery.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import { uploadImage, deleteImage } from "../../../utils/supabaseClient";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  RefreshCw,
  Save,
  Camera,
  Package,
  Tag,
  DollarSign,
  Grid,
  MapPin,
  Calendar,
  FileText,
  Award,
  Leaf,
  Droplets,
  Shield,
  Sun,
} from "lucide-react";
import "./FarmerGallery.css";

const FarmerGallery = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    location: "",
    description: "",
    harvestDay: "",
  });

  const categories = [
    "vegetables",
    "fruits",
    "grains",
    "herbs",
    "dairy",
    "seeds",
  ];

  const defaultImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

  useEffect(() => {
    fetchMyItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, filterStatus]);

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/gallery/my-items");
      setItems(response.data.galleryItems || []);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      setMessage("Failed to fetch gallery items");
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    setFilteredItems(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilter = () => {
    setFilterStatus("all");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 20 * 1024 * 1024) {
        setMessage("Image size should be less than 20MB");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPEG, PNG, and WebP images are allowed");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      setMessage(""); // Clear any previous error messages
    } else {
      // Clear image if no file selected
      setImageFile(null);
      setImagePreview(null);
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      price: "",
      category: "",
      location: "",
      description: "",
      harvestDay: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Required fields validation (image නැතිව)
    const { name, price, category, location, description, harvestDay } =
      formData;

    if (
      !name ||
      !price ||
      !category ||
      !location ||
      !description ||
      !harvestDay
    ) {
      setMessage("Please fill in all required fields (image is optional)");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = "";
      let imagePath = "";

      // Upload image to Supabase if file is selected
      if (imageFile) {
        setUploading(true);
        setMessage("Uploading image...");

        const uploadResult = await uploadImage(imageFile, "gallery");
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;

        setMessage("Image uploaded successfully!");
      }

      // Create form data object
      const submitData = {
        name,
        price,
        category,
        location,
        description,
        harvestDay,
        ...(imageUrl && { image: imageUrl }),
        ...(imagePath && { imagePath: imagePath }),
      };

      await api.post("/api/gallery/create", submitData);
      setMessage(
        "Gallery item created successfully! Waiting for admin approval."
      );
      setShowCreateModal(false);
      resetForm();
      fetchMyItems();
    } catch (error) {
      console.error("Error creating gallery item:", error);

      // If backend fails but image was uploaded, try to delete the image
      if (imagePath && error.response?.status >= 400) {
        try {
          await deleteImage(imagePath);
          console.log("Cleaned up uploaded image due to backend error");
        } catch (deleteError) {
          console.error("Failed to cleanup image:", deleteError);
        }
      }

      // Better error message for duplicate itemId
      if (error.response?.data?.error === "Duplicate itemId generated") {
        setMessage("Please try again. System is generating a new ID.");
      } else {
        setMessage(
          error.response?.data?.message || "Failed to create gallery item"
        );
      }
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    // Required fields validation (image නැතිව)
    const { name, price, category, location, description, harvestDay } =
      formData;

    if (
      !name ||
      !price ||
      !category ||
      !location ||
      !description ||
      !harvestDay
    ) {
      setMessage("Please fill in all required fields (image is optional)");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = formData.image; // Keep existing image URL
      let imagePath = "";

      // Upload new image to Supabase if file is selected
      if (imageFile) {
        setUploading(true);
        setMessage("Uploading new image...");

        const uploadResult = await uploadImage(imageFile, "gallery");
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;

        setMessage("New image uploaded successfully!");
      }

      // Create form data object
      const submitData = {
        name,
        price,
        category,
        location,
        description,
        harvestDay,
        ...(imageUrl && { image: imageUrl }),
        ...(imagePath && { imagePath: imagePath }),
      };

      await api.put(`/api/gallery/update/${selectedItem.itemId}`, submitData);
      setMessage(
        "Gallery item updated successfully! Waiting for admin approval."
      );
      setShowEditModal(false);
      resetForm();
      fetchMyItems();
    } catch (error) {
      console.error("Update error:", error);

      // If backend fails but new image was uploaded, try to delete the image
      if (imagePath && error.response?.status >= 400) {
        try {
          await deleteImage(imagePath);
          console.log("Cleaned up uploaded image due to backend error");
        } catch (deleteError) {
          console.error("Failed to cleanup image:", deleteError);
        }
      }

      setMessage("Failed to update gallery item. Please try again.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/api/gallery/my-items/${itemId}`);
        setMessage("Gallery item deleted successfully!");
        fetchMyItems();
      } catch (error) {
        setMessage("Failed to delete gallery item. Please try again.");
        console.error("Delete error:", error);
      }
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      image: item.image,
      price: item.price,
      category: item.category,
      location: item.location,
      description: item.description,
      harvestDay: item.harvestDay ? item.harvestDay.split("T")[0] : "",
    });
    setImageFile(null);
    setImagePreview(null);
    setShowEditModal(true);
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  if (loading && items.length === 0) {
    return (
      <div className="farmer-gallery">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="farmer-gallery">
      <div className="gallery-header">
        <div className="header-content">
          <h2>My Gallery Items</h2>
          <p>Manage your agricultural products</p>
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
          <button onClick={() => setMessage("")} className="message-close">
            ×
          </button>
        </div>
      )}

      {/* Enhanced Search & Filter */}
      <div className="search-filter-bar">
        <div className="search-filter-container">
          {/* Enhanced Search Bar */}
          <div className="enhanced-search-bar">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Filter Bar */}
          <div className="enhanced-filter-bar">
            <div className="filter-wrapper">
              <Filter className="filter-icon" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Items ({items.length})</option>
                <option value="pending">
                  Pending ({items.filter((i) => i.status === "pending").length})
                </option>
                <option value="approved">
                  Approved (
                  {items.filter((i) => i.status === "approved").length})
                </option>
              </select>
              {filterStatus !== "all" && (
                <button
                  className="clear-filter-btn"
                  onClick={clearFilter}
                  aria-label="Clear filter"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Refresh Button */}
          <button
            className="refresh-btn"
            onClick={fetchMyItems}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="active-filters">
            <span className="active-filters-label">Active filters:</span>
            {searchTerm && (
              <div className="filter-tag">
                <span>Search: "{searchTerm}"</span>
                <button onClick={clearSearch}>
                  <X size={12} />
                </button>
              </div>
            )}
            {filterStatus !== "all" && (
              <div className="filter-tag">
                <span>Status: {filterStatus}</span>
                <button onClick={clearFilter}>
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item._id} className="item-card">
            <div className="item-image">
              <img
                src={item.image || defaultImage}
                alt={item.name}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className={`status-badge ${item.status}`}>
                {item.status.toUpperCase()}
              </div>
            </div>

            <div className="item-content">
              <h3>{item.name}</h3>
              <p className="item-price">Rs. {item.price}</p>
              <div className="item-meta">
                <span className="item-category">{item.category}</span>
                <span className="item-location">{item.location}</span>
              </div>
              <p className="item-description">
                {item.description.length > 80
                  ? `${item.description.substring(0, 80)}...`
                  : item.description}
              </p>
              <div className="item-date">
                <strong>Harvest:</strong>{" "}
                {new Date(item.harvestDay).toLocaleDateString()}
              </div>
            </div>

            <div className="item-actions">
              <button className="view-btn" onClick={() => openViewModal(item)}>
                <Eye size={16} />
                View
              </button>

              <button className="edit-btn" onClick={() => openEditModal(item)}>
                <Edit size={16} />
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item.itemId)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <h3>No gallery items found</h3>
          <p>
            {items.length === 0
              ? "Create your first gallery item to get started!"
              : "No gallery items match your search criteria"}
          </p>
          {items.length === 0 && (
            <button
              className="create-first-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              Create First Item
            </button>
          )}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="modal-content create-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="header-content">
                <div className="header-icon">
                  <Plus size={24} />
                </div>
                <div>
                  <h3>Create Gallery Item</h3>
                  <p>Add your fresh produce to the gallery</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="enhanced-modal-form">
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview">
                  {imagePreview ? (
                    <div className="preview-container">
                      <img src={imagePreview} alt="Preview" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-image-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <p>Upload Product Image (Optional)</p>
                      <small>You can add an image later if needed</small>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label htmlFor="image-upload" className="upload-btn">
                    <Camera size={20} />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <small className="form-help">
                    {uploading
                      ? "Uploading..."
                      : "Max size: 10MB (JPEG, PNG, WebP)"}
                  </small>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-sections">
                {/* Basic Information */}
                <div className="form-section">
                  <h4 className="section-title">
                    <Package size={20} />
                    Basic Information
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <Tag size={16} />
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Fresh Organic Tomatoes"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <DollarSign size={16} />
                        Price per KG (Rs.) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="250"
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Grid size={16} />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <MapPin size={16} />
                        Farm Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Kandy, Sri Lanka"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Calendar size={16} />
                        Harvest Date *
                      </label>
                      <input
                        type="date"
                        name="harvestDay"
                        value={formData.harvestDay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Product Description */}
                <div className="form-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Product Description
                  </h4>
                  <div className="form-group full-width">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Describe your product quality, farming methods, freshness, etc..."
                      required
                    />
                    <div className="char-count">
                      {formData.description.length}/500 characters
                    </div>
                  </div>
                </div>

                {/* Quality Indicators */}
                <div className="form-section">
                  <h4 className="section-title">
                    <Award size={20} />
                    Quality Assurance
                  </h4>
                  <div className="quality-badges">
                    <div className="quality-badge">
                      <Leaf size={16} />
                      <span>Organic</span>
                    </div>
                    <div className="quality-badge">
                      <Droplets size={16} />
                      <span>Fresh</span>
                    </div>
                    <div className="quality-badge">
                      <Shield size={16} />
                      <span>Pesticide Free</span>
                    </div>
                    <div className="quality-badge">
                      <Sun size={16} />
                      <span>Farm Fresh</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading || uploading}
                >
                  {uploading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Uploading Image...
                    </>
                  ) : loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Create Gallery Item
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-content create-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="header-content">
                <div className="header-icon">
                  <Edit size={24} />
                </div>
                <div>
                  <h3>Edit Gallery Item</h3>
                  <p>Update your product information</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEdit} className="enhanced-modal-form">
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview">
                  {imagePreview ? (
                    <div className="preview-container">
                      <img src={imagePreview} alt="Preview" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-image-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : formData.image ? (
                    <div className="preview-container">
                      <img src={formData.image} alt="Current" />
                      <div className="current-image-label">Current Image</div>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <p>Upload Product Image (Optional)</p>
                      <small>Leave empty to keep current image</small>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label htmlFor="edit-image-upload" className="upload-btn">
                    <Camera size={20} />
                    Change Image
                  </label>
                  <input
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <small>
                    {uploading
                      ? "Uploading..."
                      : "Optional: Leave empty to keep current image"}
                  </small>
                </div>
              </div>

              {/* Form Fields - Same as create modal */}
              <div className="form-sections">
                <div className="form-section">
                  <h4 className="section-title">
                    <Package size={20} />
                    Basic Information
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <Tag size={16} />
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <DollarSign size={16} />
                        Price per KG (Rs.) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Grid size={16} />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <MapPin size={16} />
                        Farm Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Calendar size={16} />
                        Harvest Date *
                      </label>
                      <input
                        type="date"
                        name="harvestDay"
                        value={formData.harvestDay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title">
                    <FileText size={20} />
                    Product Description
                  </h4>
                  <div className="form-group full-width">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    />
                    <div className="char-count">
                      {formData.description.length}/500 characters
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading || uploading}
                >
                  {uploading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Uploading Image...
                    </>
                  ) : loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Update Gallery Item
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div
            className="modal-content view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Gallery Item Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="view-content">
              <div className="view-image">
                <img
                  src={selectedItem.image || defaultImage}
                  alt={selectedItem.name}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
                <div className={`status-badge ${selectedItem.status}`}>
                  {selectedItem.status.toUpperCase()}
                </div>
              </div>

              <div className="view-details">
                <h4>{selectedItem.name}</h4>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Price</span>
                    <span className="detail-value">
                      Rs. {selectedItem.price}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">
                      {selectedItem.category}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {selectedItem.location}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Harvest Date</span>
                    <span className="detail-value">
                      {new Date(selectedItem.harvestDay).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="description-section">
                  <h5>Description</h5>
                  <p>{selectedItem.description}</p>
                </div>

                <div className="item-id-section">
                  <strong>Item ID:</strong> {selectedItem.itemId}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerGallery;
```

## File: src/components/home/ItemsGrid/ItemsGrid.jsx
```javascript
// src/components/home/ItemsGrid/ItemsGrid.jsx
import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import {
  User,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  DollarSign,
} from "lucide-react";
import "./ItemsGrid.css";

const ItemsGrid = ({ filters }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const itemsPerPage = 12;
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      console.log("Fetching items from backend...");

      // FIXED: Use correct API endpoints
      const [galleryResponse, offersResponse] = await Promise.all([
        api.get("/api/gallery/approved"), // Fixed endpoint
        api.get("/api/offers/approved"), // Fixed endpoint
      ]);

      console.log("Gallery API response:", galleryResponse.data);
      console.log("Offers API response:", offersResponse.data);

      // Process gallery items
      let galleryItems = [];
      if (galleryResponse.data && galleryResponse.data.success) {
        galleryItems = galleryResponse.data.data || [];
      }

      // Process offers
      let offerItems = [];
      if (offersResponse.data && offersResponse.data.success) {
        offerItems = offersResponse.data.data || [];
      }

      // Add type identifier to items
      const processedGalleryItems = galleryItems.map((item) => ({
        ...item,
        type: "gallery",
      }));

      const processedOfferItems = offerItems.map((item) => ({
        ...item,
        type: "offer",
      }));

      // Combine and shuffle items
      const allItems = [...processedGalleryItems, ...processedOfferItems];
      const shuffledItems = allItems.sort(() => Math.random() - 0.5);

      console.log(
        `Total items loaded: ${allItems.length} (${galleryItems.length} gallery + ${offerItems.length} offers)`
      );

      setItems(shuffledItems);

      if (allItems.length === 0) {
        setMessage(
          "No approved items available. Please check if farmers have uploaded items and admin has approved them."
        );
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage(`Failed to load items: ${error.message}`);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    return (
      (!filters.name ||
        item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.location || item.location === filters.location) &&
      (!filters.minPrice ||
        parseInt(item.price) >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || parseInt(item.price) <= parseInt(filters.maxPrice))
    );
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(0, currentPage * itemsPerPage);

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // NEW: Handle farmer details view
  const handleViewFarmer = (item) => {
    if (item.userId) {
      setSelectedFarmer({
        ...item.userId,
        itemName: item.name,
        itemType: item.type,
      });
      setShowFarmerModal(true);
    } else {
      alert("Farmer information not available for this item.");
    }
  };

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="items-loading">
        <div className="loading-spinner"></div>
        <p>Loading fresh products...</p>
      </div>
    );
  }

  return (
    <div className="items-grid-section">
      <div className="items-container">
        <div className="items-header">
          <h3>Available Products ({filteredItems.length})</h3>
        </div>

        {/* FIXED: Add message display */}
        {message && (
          <div className="no-items-message">
            <p>{message}</p>
          </div>
        )}

        <div className="items-grid">
          {currentItems.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-image-container">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
                  }
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                <div className={`item-type-badge ${item.type}`}>
                  {item.type === "gallery" ? "Gallery" : "Special Offer"}
                </div>
              </div>

              <div className="item-content">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-price">Rs. {item.price}</p>

                <div className="item-meta">
                  <span className="item-category">{item.category}</span>
                  <span className="item-location">{item.location}</span>
                </div>

                <p className="item-description">
                  {item.description && item.description.length > 80
                    ? `${item.description.substring(0, 80)}...`
                    : item.description}
                </p>

                {/* ENHANCED: Show farmer info preview */}
                {item.userId && (
                  <div className="farmer-preview">
                    <User size={14} />
                    <span>Farmer : {item.owner.name}</span>
                  </div>
                )}
                {item.userId && (
                  <div className="farmer-preview">
                    <User size={14} />
                    <span>Phone : {item.owner.phone}</span>
                  </div>
                )}
                {item.userId && (
                  <div className="farmer-preview">
                    <User size={14} />
                    <span>Location : {item.owner.location}</span>
                  </div>
                )}

                {/* ENHANCED: Updated action buttons */}
                <div className="item-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleViewItem(item)}
                  >
                    <Eye size={16} />
                    View Product
                  </button>

                  {/* NEW: Farmer details button */}
                  {item.userId && (
                    <button
                      className="farmer-btn"
                      onClick={() => handleViewFarmer(item)}
                    >
                      <User size={16} />
                      View Farmer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentPage * itemsPerPage < filteredItems.length && (
          <div className="load-more-container">
            <button onClick={loadMore} className="load-more-btn">
              Show More ({filteredItems.length - currentItems.length} remaining)
            </button>
          </div>
        )}

        {filteredItems.length === 0 && !message && (
          <div className="no-items">
            <h3>No products found</h3>
            <p>
              Try adjusting your search filters or check back later for new
              products
            </p>
          </div>
        )}
      </div>

      {/* EXISTING: Item Details Modal */}
      {showModal && selectedItem && (
        <div className="item-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Product Details</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-image">
                <img
                  src={
                    selectedItem.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
                  }
                  alt={selectedItem.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";
                  }}
                />
                {selectedItem.type === "offer" && (
                  <div className="modal-offer-badge">SPECIAL OFFER</div>
                )}
              </div>

              <div className="modal-details">
                <h4>{selectedItem.name}</h4>
                <p className="modal-price">Rs. {selectedItem.price}</p>

                {/* Product Information */}
                <div className="product-info-section">
                  <h5>Product Information</h5>
                  <div className="detail-item">
                    <Tag size={16} />
                    <strong>Category:</strong> {selectedItem.category}
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <strong>Location:</strong> {selectedItem.location}
                  </div>
                  <div className="detail-item">
                    <Calendar size={16} />
                    <strong>Harvest Date:</strong>{" "}
                    {selectedItem.harvestDay
                      ? new Date(selectedItem.harvestDay).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <strong>Type:</strong>{" "}
                    {selectedItem.type === "gallery"
                      ? "Gallery Item"
                      : "Special Offer"}
                  </div>
                </div>

                {/* Product Description */}
                <div className="description-section">
                  <h5>Description</h5>
                  <p>{selectedItem.description}</p>
                </div>

                {/* FIXED: Add conditions display for offers */}
                {selectedItem.condition &&
                  Array.isArray(selectedItem.condition) &&
                  selectedItem.condition.length > 0 && (
                    <div className="conditions-section">
                      <h5>Offer Conditions</h5>
                      <ul>
                        {selectedItem.condition.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Quick Farmer Info */}
                {selectedItem.userId && (
                  <div className="quick-farmer-info">
                    <h5>Farmer Information</h5>
                    <div className="farmer-quick-details">
                      <p>
                        <strong>Name:</strong> {selectedItem.userId.firstName}{" "}
                        {selectedItem.userId.lastName}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {selectedItem.userId.location}
                      </p>
                      <button
                        className="view-full-farmer-btn"
                        onClick={() => {
                          setShowModal(false);
                          handleViewFarmer(selectedItem);
                        }}
                      >
                        <User size={16} />
                        View Full Farmer Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Farmer Details Modal */}
      {showFarmerModal && selectedFarmer && (
        <div
          className="farmer-modal-overlay"
          onClick={() => setShowFarmerModal(false)}
        >
          <div className="farmer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header farmer-header">
              <h3>Farmer Details</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowFarmerModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              <div className="farmer-profile-section">
                <div className="farmer-avatar">
                  <img
                    src={
                      selectedFarmer.img ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt={selectedFarmer.firstName}
                    onError={(e) => {
                      e.target.src =
                        "https://www.w3schools.com/howto/img_avatar.png";
                    }}
                  />
                </div>
                <div className="farmer-basic-info">
                  <h4>
                    {selectedFarmer.firstName} {selectedFarmer.lastName}
                  </h4>
                  <p className="farmer-type">Local Farmer</p>
                  <p className="farmer-item-info">
                    Creator of: <strong>{selectedFarmer.itemName}</strong> (
                    {selectedFarmer.itemType})
                  </p>
                </div>
              </div>

              <div className="farmer-details-grid">
                <div className="farmer-detail-item">
                  <Mail size={16} />
                  <div>
                    <strong>Email:</strong>
                    <p>{selectedFarmer.email}</p>
                  </div>
                </div>

                {selectedFarmer.phone && (
                  <div className="farmer-detail-item">
                    <Phone size={16} />
                    <div>
                      <strong>Phone:</strong>
                      <p>{selectedFarmer.phone}</p>
                    </div>
                  </div>
                )}

                <div className="farmer-detail-item">
                  <MapPin size={16} />
                  <div>
                    <strong>Farm Location:</strong>
                    <p>{selectedFarmer.location}</p>
                  </div>
                </div>

                <div className="farmer-detail-item">
                  <Calendar size={16} />
                  <div>
                    <strong>Farmer Since:</strong>
                    <p>
                      {new Date(selectedFarmer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="farmer-contact-actions">
                <h5>Contact This Farmer</h5>
                <div className="contact-buttons">
                  <a
                    href={`mailto:${selectedFarmer.email}?subject=Inquiry about ${selectedFarmer.itemName}`}
                    className="contact-btn email-btn"
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                  {selectedFarmer.phone && (
                    <a
                      href={`tel:${selectedFarmer.phone}`}
                      className="contact-btn phone-btn"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsGrid;
```

## File: src/components/farmer/FarmerOffers/FarmerOffers.jsx
```javascript
// src/components/farmer/FarmerOffers/FarmerOffers.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import { uploadImage, deleteImage } from "../../../utils/supabaseClient";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  X,
  RefreshCw,
  Save,
  Camera,
  Package,
  Tag,
  DollarSign,
  Grid,
  MapPin,
  Calendar,
  FileText,
  Award,
  Leaf,
  Droplets,
  Shield,
  Sun,
} from "lucide-react";
import "./FarmerOffers.css";

const FarmerOffers = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
    location: "",
    description: "",
    harvestDay: "",
    conditions: [],
    newCondition: "",
  });

  const categories = [
    "vegetables",
    "fruits",
    "grains",
    "herbs",
    "dairy",
    "seeds",
  ];

  const defaultImage =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400";

  useEffect(() => {
    fetchMyOffers();
  }, []);

  useEffect(() => {
    filterOffers();
  }, [offers, searchTerm, filterStatus]);

  const fetchMyOffers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/offers/my-offers");
      setOffers(response.data.offers || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setMessage("Failed to fetch offers");
    } finally {
      setLoading(false);
    }
  };

  const filterOffers = () => {
    let filtered = offers;

    if (searchTerm) {
      filtered = filtered.filter(
        (offer) =>
          offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((offer) => offer.status === filterStatus);
    }

    setFilteredOffers(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilter = () => {
    setFilterStatus("all");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 20 * 1024 * 1024) {
        setMessage("Image size should be less than 20MB");
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPEG, PNG, and WebP images are allowed");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      setMessage(""); // Clear any previous error messages
    } else {
      // Clear image if no file selected
      setImageFile(null);
      setImagePreview(null);
      setFormData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const addCondition = () => {
    if (formData.newCondition.trim()) {
      setFormData((prev) => ({
        ...prev,
        conditions: [...prev.conditions, prev.newCondition.trim()],
        newCondition: "",
      }));
    }
  };

  const removeCondition = (index) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      price: "",
      category: "",
      location: "",
      description: "",
      harvestDay: "",
      conditions: [],
      newCondition: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Required fields validation (image නැතිව)
    const { name, price, category, location, description, harvestDay } =
      formData;

    if (
      !name ||
      !price ||
      !category ||
      !location ||
      !description ||
      !harvestDay
    ) {
      setMessage("Please fill in all required fields (image is optional)");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = "";
      let imagePath = "";

      // Upload image to Supabase if file is selected
      if (imageFile) {
        setUploading(true);
        setMessage("Uploading image...");

        const uploadResult = await uploadImage(imageFile, "offers");
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;

        setMessage("Image uploaded successfully!");
      }

      // Create form data object
      const submitData = {
        name,
        price,
        category,
        location,
        description,
        harvestDay,
        condition: formData.conditions,
        ...(imageUrl && { image: imageUrl }),
        ...(imagePath && { imagePath: imagePath }),
      };

      await api.post("/api/offers", submitData);
      setMessage(
        "Special offer created successfully! Waiting for admin approval."
      );
      setShowCreateModal(false);
      resetForm();
      fetchMyOffers();
    } catch (error) {
      console.error("Error creating offer:", error);

      // If backend fails but image was uploaded, try to delete the image
      if (imagePath && error.response?.status >= 400) {
        try {
          await deleteImage(imagePath);
          console.log("Cleaned up uploaded image due to backend error");
        } catch (deleteError) {
          console.error("Failed to cleanup image:", deleteError);
        }
      }

      setMessage(error.response?.data?.message || "Failed to create offer");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    // Required fields validation (image නැතිව)
    const { name, price, category, location, description, harvestDay } =
      formData;

    if (
      !name ||
      !price ||
      !category ||
      !location ||
      !description ||
      !harvestDay
    ) {
      setMessage("Please fill in all required fields (image is optional)");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = formData.image; // Keep existing image URL
      let imagePath = "";

      // Upload new image to Supabase if file is selected
      if (imageFile) {
        setUploading(true);
        setMessage("Uploading new image...");

        const uploadResult = await uploadImage(imageFile, "offers");
        imageUrl = uploadResult.url;
        imagePath = uploadResult.path;

        setMessage("New image uploaded successfully!");
      }

      // Create form data object
      const submitData = {
        name,
        price,
        category,
        location,
        description,
        harvestDay,
        condition: formData.conditions,
        ...(imageUrl && { image: imageUrl }),
        ...(imagePath && { imagePath: imagePath }),
      };

      await api.put(`/api/offers/update/${selectedOffer.itemId}`, submitData);
      setMessage("Offer updated successfully! Waiting for admin approval.");
      setShowEditModal(false);
      resetForm();
      fetchMyOffers();
    } catch (error) {
      console.error("Update error:", error);

      // If backend fails but new image was uploaded, try to delete the image
      if (imagePath && error.response?.status >= 400) {
        try {
          await deleteImage(imagePath);
          console.log("Cleaned up uploaded image due to backend error");
        } catch (deleteError) {
          console.error("Failed to cleanup image:", deleteError);
        }
      }

      setMessage("Failed to update offer. Please try again.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await api.delete(`/api/offers/my-offers/${itemId}`);
        setMessage("Offer deleted successfully!");
        fetchMyOffers();
      } catch (error) {
        setMessage("Failed to delete offer. Please try again.");
        console.error("Delete error:", error);
      }
    }
  };

  const openEditModal = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      name: offer.name,
      image: offer.image,
      price: offer.price,
      category: offer.category,
      location: offer.location,
      description: offer.description,
      harvestDay: offer.harvestDay ? offer.harvestDay.split("T")[0] : "",
      conditions: offer.condition || [],
      newCondition: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setShowEditModal(true);
  };

  const openViewModal = (offer) => {
    setSelectedOffer(offer);
    setShowViewModal(true);
  };

  if (loading && offers.length === 0) {
    return (
      <div className="farmer-offers">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="farmer-offers">
      <div className="offers-header">
        <div className="header-content">
          <h2>My Special Offers</h2>
          <p>Create and manage your special promotional offers</p>
        </div>
        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Create Special Offer
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
          <button onClick={() => setMessage("")} className="message-close">
            ×
          </button>
        </div>
      )}

      {/* Enhanced Search & Filter */}
      <div className="search-filter-bar">
        <div className="search-filter-container">
          {/* Enhanced Search Bar */}
          <div className="enhanced-search-bar">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Filter Bar */}
          <div className="enhanced-filter-bar">
            <div className="filter-wrapper">
              <Filter className="filter-icon" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Offers ({offers.length})</option>
                <option value="pending">
                  Pending ({offers.filter((o) => o.status === "pending").length}
                  )
                </option>
                <option value="approved">
                  Approved (
                  {offers.filter((o) => o.status === "approved").length})
                </option>
              </select>
              {filterStatus !== "all" && (
                <button
                  className="clear-filter-btn"
                  onClick={clearFilter}
                  aria-label="Clear filter"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Refresh Button */}
          <button
            className="refresh-btn"
            onClick={fetchMyOffers}
            aria-label="Refresh data"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || filterStatus !== "all") && (
          <div className="active-filters">
            <span className="active-filters-label">Active filters:</span>
            {searchTerm && (
              <div className="filter-tag">
                <span>Search: "{searchTerm}"</span>
                <button onClick={clearSearch}>
                  <X size={12} />
                </button>
              </div>
            )}
            {filterStatus !== "all" && (
              <div className="filter-tag">
                <span>Status: {filterStatus}</span>
                <button onClick={clearFilter}>
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Offers Grid */}
      <div className="offers-grid">
        {filteredOffers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-image">
              <img
                src={offer.image || defaultImage}
                alt={offer.name}
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
              <div className={`status-badge ${offer.status}`}>
                {offer.status.toUpperCase()}
              </div>
              <div className="offer-badge">SPECIAL OFFER</div>
            </div>

            <div className="offer-content">
              <h3>{offer.name}</h3>
              <p className="offer-price">Rs. {offer.price}</p>
              <div className="offer-meta">
                <span className="offer-category">{offer.category}</span>
                <span className="offer-location">{offer.location}</span>
              </div>
              <p className="offer-description">
                {offer.description.length > 80
                  ? `${offer.description.substring(0, 80)}...`
                  : offer.description}
              </p>
              {offer.condition && offer.condition.length > 0 && (
                <div className="offer-conditions">
                  <strong>Conditions:</strong>
                  <ul>
                    {offer.condition.slice(0, 2).map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                    {offer.condition.length > 2 && (
                      <li>+{offer.condition.length - 2} more...</li>
                    )}
                  </ul>
                </div>
              )}
              <div className="offer-date">
                <strong>Harvest:</strong>{" "}
                {new Date(offer.harvestDay).toLocaleDateString()}
              </div>
            </div>

            <div className="offer-actions">
              <button className="view-btn" onClick={() => openViewModal(offer)}>
                <Eye size={16} />
                View
              </button>

              <button className="edit-btn" onClick={() => openEditModal(offer)}>
                <Edit size={16} />
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(offer.itemId)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="no-offers">
          <h3>No special offers found</h3>
          <p>
            {offers.length === 0
              ? "Create your first special offer to attract more buyers!"
              : "No offers match your search criteria"}
          </p>
          {offers.length === 0 && (
            <button
              className="create-first-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus size={20} />
              Create First Offer
            </button>
          )}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="modal-content offer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="header-content">
                <div className="header-icon">
                  <Plus size={24} />
                </div>
                <div>
                  <h3>Create Special Offer</h3>
                  <p>Create an attractive promotional offer</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="offer-form">
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview offer-preview">
                  {imagePreview ? (
                    <div className="preview-container">
                      <img src={imagePreview} alt="Preview" />
                      <div className="offer-overlay"></div>
                      <div className="offer-badge-preview">SPECIAL OFFER</div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-image-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <p>Upload Offer Image (Optional)</p>
                      <small>
                        Make your offer more attractive with an image
                      </small>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label
                    htmlFor="offer-image-upload"
                    className="upload-btn offer-upload"
                  >
                    <Camera size={20} />
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="offer-image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <small className="form-help">
                    {uploading
                      ? "Uploading..."
                      : "Max size: 10MB (JPEG, PNG, WebP)"}
                  </small>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-sections">
                {/* Basic Information */}
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Package size={20} />
                    Offer Information
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <Tag size={16} />
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Premium Organic Tomatoes"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <DollarSign size={16} />
                        Special Price per KG (Rs.) *
                      </label>
                      <div className="price-input-wrapper">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="200"
                          min="1"
                          required
                        />
                        <span className="price-label">Special Price</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <Grid size={16} />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <MapPin size={16} />
                        Farm Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Kandy, Sri Lanka"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Calendar size={16} />
                        Harvest Date *
                      </label>
                      <input
                        type="date"
                        name="harvestDay"
                        value={formData.harvestDay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Offer Description */}
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <FileText size={20} />
                    Offer Description
                  </h4>
                  <div className="form-group full-width">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Describe your special offer, quality, freshness, and why buyers should choose this deal..."
                      required
                    />
                    <div className="char-count">
                      {formData.description.length}/500 characters
                    </div>
                  </div>
                </div>

                {/* Offer Conditions */}
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Award size={20} />
                    Offer Conditions (Optional)
                  </h4>
                  <div className="conditions-input-section">
                    <div className="condition-input-wrapper">
                      <input
                        type="text"
                        value={formData.newCondition}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            newCondition: e.target.value,
                          }))
                        }
                        placeholder="e.g., Minimum order 10kg, Valid until stock lasts"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCondition();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addCondition}
                        className="add-condition-btn"
                        disabled={!formData.newCondition.trim()}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    {formData.conditions.length > 0 && (
                      <div className="conditions-list">
                        <h5>Offer Conditions:</h5>
                        {formData.conditions.map((condition, index) => (
                          <div key={index} className="condition-tag">
                            <span>{condition}</span>
                            <button
                              type="button"
                              onClick={() => removeCondition(index)}
                              className="remove-condition"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Offer Highlights */}
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Award size={20} />
                    Offer Highlights
                  </h4>
                  <div className="offer-highlights">
                    <div className="highlight-item">
                      <Leaf size={16} />
                      <span>Special Price</span>
                    </div>
                    <div className="highlight-item">
                      <Droplets size={16} />
                      <span>Fresh Quality</span>
                    </div>
                    <div className="highlight-item">
                      <Shield size={16} />
                      <span>Limited Time</span>
                    </div>
                    <div className="highlight-item">
                      <Sun size={16} />
                      <span>Farm Direct</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="offer-actions">
                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn offer-submit"
                    disabled={loading || uploading}
                  >
                    {uploading ? (
                      <>
                        <div className="loading-spinner-small"></div>
                        Uploading Image...
                      </>
                    ) : loading ? (
                      <>
                        <div className="loading-spinner-small"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Create Special Offer
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-content offer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="header-content">
                <div className="header-icon">
                  <Edit size={24} />
                </div>
                <div>
                  <h3>Edit Special Offer</h3>
                  <p>Update your promotional offer</p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleEdit} className="offer-form">
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview offer-preview">
                  {imagePreview ? (
                    <div className="preview-container">
                      <img src={imagePreview} alt="Preview" />
                      <div className="offer-overlay"></div>
                      <div className="offer-badge-preview">SPECIAL OFFER</div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="remove-image-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : formData.image ? (
                    <div className="preview-container">
                      <img src={formData.image} alt="Current" />
                      <div className="offer-overlay"></div>
                      <div className="offer-badge-preview">SPECIAL OFFER</div>
                      <div className="current-image-label">Current Image</div>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <Camera size={48} />
                      <p>Upload Offer Image (Optional)</p>
                      <small>Leave empty to keep current image</small>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label
                    htmlFor="edit-offer-image-upload"
                    className="upload-btn offer-upload"
                  >
                    <Camera size={20} />
                    Change Image
                  </label>
                  <input
                    id="edit-offer-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <small>
                    {uploading
                      ? "Uploading..."
                      : "Optional: Leave empty to keep current image"}
                  </small>
                </div>
              </div>

              {/* Form Fields - Same as create modal */}
              <div className="form-sections">
                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Package size={20} />
                    Offer Information
                  </h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <Tag size={16} />
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <DollarSign size={16} />
                        Special Price per KG (Rs.) *
                      </label>
                      <div className="price-input-wrapper">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                        <span className="price-label">Special Price</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <Grid size={16} />
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        <MapPin size={16} />
                        Farm Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <Calendar size={16} />
                        Harvest Date *
                      </label>
                      <input
                        type="date"
                        name="harvestDay"
                        value={formData.harvestDay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <FileText size={20} />
                    Offer Description
                  </h4>
                  <div className="form-group full-width">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    />
                    <div className="char-count">
                      {formData.description.length}/500 characters
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4 className="section-title offer-title">
                    <Award size={20} />
                    Offer Conditions (Optional)
                  </h4>
                  <div className="conditions-input-section">
                    <div className="condition-input-wrapper">
                      <input
                        type="text"
                        value={formData.newCondition}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            newCondition: e.target.value,
                          }))
                        }
                        placeholder="Add new condition"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCondition();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={addCondition}
                        className="add-condition-btn"
                        disabled={!formData.newCondition.trim()}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                    {formData.conditions.length > 0 && (
                      <div className="conditions-list">
                        <h5>Offer Conditions:</h5>
                        {formData.conditions.map((condition, index) => (
                          <div key={index} className="condition-tag">
                            <span>{condition}</span>
                            <button
                              type="button"
                              onClick={() => removeCondition(index)}
                              className="remove-condition"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="offer-actions">
                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn offer-submit"
                    disabled={loading || uploading}
                  >
                    {uploading ? (
                      <>
                        <div className="loading-spinner-small"></div>
                        Uploading Image...
                      </>
                    ) : loading ? (
                      <>
                        <div className="loading-spinner-small"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Update Special Offer
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowEditModal(false)}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedOffer && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div
            className="modal-content view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Special Offer Details</h3>
              <button
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="view-content">
              <div className="view-image">
                <img
                  src={selectedOffer.image || defaultImage}
                  alt={selectedOffer.name}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
                <div className={`status-badge ${selectedOffer.status}`}>
                  {selectedOffer.status.toUpperCase()}
                </div>
                <div className="modal-offer-badge">SPECIAL OFFER</div>
              </div>

              <div className="view-details">
                <h4>{selectedOffer.name}</h4>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Special Price</span>
                    <span className="detail-value">
                      Rs. {selectedOffer.price}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">
                      {selectedOffer.category}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {selectedOffer.location}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Harvest Date</span>
                    <span className="detail-value">
                      {new Date(selectedOffer.harvestDay).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="description-section">
                  <h5>Description</h5>
                  <p>{selectedOffer.description}</p>
                </div>

                {selectedOffer.condition &&
                  selectedOffer.condition.length > 0 && (
                    <div className="conditions-section">
                      <h5>Offer Conditions</h5>
                      <ul className="conditions-view-list">
                        {selectedOffer.condition.map((condition, index) => (
                          <li key={index}>
                            <Award size={14} />
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="offer-id-section">
                  <strong>Offer ID:</strong> {selectedOffer.itemId}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOffers;
```
