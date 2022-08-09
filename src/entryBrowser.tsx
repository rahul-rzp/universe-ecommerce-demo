import React from 'react';
import { render } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import errorService from '@razorpay/universe-cli/errorService';
import ErrorBoundary from '@razorpay/universe-cli/errorService/ErrorBoundary';
import hydrateApp from './shared/services/hydrateApp';
import env from './env';

import App from './app';

if (env.STAGE !== 'development' && env.UNIVERSE_PUBLIC_SENTRY_DSN) {
  errorService.init({
    dsn: env.UNIVERSE_PUBLIC_SENTRY_DSN,
    environment: env.STAGE,
    version: `${__APP_NAME__}@${__VERSION__}`,
  });
}

const root = document.getElementById('root');
const app = (
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>
);

if (module.hot) {
  render(app, root);
  module.hot.accept();
} else {
  loadableReady(() => {
    hydrateApp(app, root);
  });
}
