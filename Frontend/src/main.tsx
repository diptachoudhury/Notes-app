// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Audience = import.meta.env.VITE_AUTH0_AUDIENCE; 
if (!auth0Domain || !auth0ClientId || !auth0Audience) {
  throw new Error("Auth0 environment variables are not set. Please check your .env file.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Auth0Provider
        // Use the environment variables here
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
           audience: auth0Audience,
        }}
      >
        <App />
      </Auth0Provider>
  </React.StrictMode>
);