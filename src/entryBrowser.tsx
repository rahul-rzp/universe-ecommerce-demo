import React from 'react';
import { render } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import errorService from '@razorpay/universe-cli/errorService';
import ErrorBoundary from '@razorpay/universe-cli/errorService/ErrorBoundary';
import hydrateApp from './shared/services/hydrateApp';
import env from './env';

import App from './app';
import './styles/global.css';
// import styles from '../static/global.css';
// console.log(styles, 'stylezzz');

if (env.STAGE !== 'development' && env.UNIVERSE_PUBLIC_SENTRY_DSN) {
  errorService.init({
    dsn: env.UNIVERSE_PUBLIC_SENTRY_DSN,
    environment: env.STAGE,
    version: `${__APP_NAME__}@${__VERSION__}`,
  });
}

const root = document.getElementById('root');
const queryClient = new QueryClient();
const helmetContext: HelmetContext = {};
hydrate(queryClient, window.__REACT_QUERY_STATE__);
const app = (
  <ErrorBoundary>
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
      {/* <Helmet>
        <link rel="stylesheet" href={styles} />
      </Helmet> */}
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
