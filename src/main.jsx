import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Auth0Provider
    domain="dev-f85xk6ze5c6jlblx.us.auth0.com"
    clientId="c1cdMZKEhNTQoR7BZ8tV300UAmWkhFBo"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  </StrictMode>,
)
