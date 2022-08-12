/* eslint-disable @typescript-eslint/no-use-before-define */
import path from 'path';
import React from 'react';
import ErrorBoundary from '@razorpay/universe-cli/errorService/ErrorBoundary';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextFunction, query, Request, Response } from 'express';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom/server';
import { matchRoutes } from 'react-router-dom';
import { HelmetProvider, HelmetContext } from 'react-helmet-async';
import { ServerStyleSheet } from 'styled-components';
import isEmpty from '@razorpay/universe-cli/isEmpty';
import {
  dehydrate,
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { callAPI } from '../../home/Home';

import HTML from '../components/HTML';
import App from '../../app';
import { routes } from '../routes';
import { GlobalStyles } from '../../styles';

import * as redisService from './redisService';

// This path is resolved from build/server where the webpack bundle is created
const statsFile = path.join(__dirname, '../browser/loadable-stats.json');

const generatePage = async (requestURL: string): string => {
  const extractor = new ChunkExtractor({
    statsFile,
  });

  const helmetContext: HelmetContext = {};
  const queryClient = new QueryClient();
  const matchedRoutes = matchRoutes(routes, requestURL);
  if (matchedRoutes === null) {
    return 'Invalid path';
  }
  // await queryClient.prefetchQuery(['product'], matchedRoutes[0].route.fetchData());
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (matchedRoutes[0].route.fetchData) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await matchedRoutes[0].route.fetchData(queryClient);
  }

  const dehydratedState = dehydrate(queryClient);
  const app = extractor.collectChunks(
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <StaticRouter location={requestURL}>
              <App />
            </StaticRouter>
            <GlobalStyles />
          </Hydrate>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>,
  );
  const sheet = new ServerStyleSheet();

  const scriptTags = [
    ...extractor.getScriptElements(),
    generateReactQueryScriptElement(dehydratedState),
  ];
  const linkTags = extractor.getLinkElements();
  // const styleTags = extractor.getStyleElements();

  // serializing the app populates helmetContext with all head meta information
  const serializedApp = renderToString(sheet.collectStyles(app));

  return `<!doctype html>
  ${renderToStaticMarkup(
    // eslint-disable-next-line react/jsx-pascal-case
    <HTML
      scriptTags={scriptTags}
      linkTags={linkTags}
      styleTags={sheet.getStyleElement()}
      helmetContext={helmetContext}
    >
      {serializedApp}
    </HTML>,
  )}`;
};

type ExpressMiddleware = () => (req: Request, res: Response, next: NextFunction) => void;

const renderMiddleware: ExpressMiddleware =
  () =>
  async (req, res): void => {
    // let serverResponse: string | null;
    // if (await redisService.isPageCached(req.path)) {
    //   // Cache Hit
    //   serverResponse = await redisService.getPageFromCache(req.path);
    //   if (isEmpty(serverResponse)) {
    //     // if error, return page from server
    //     serverResponse = generatePage(req.path);
    //   }
    // } else {
    //   // Server Hit
    //   serverResponse = generatePage(req.path);
    //   redisService.storePageInCache(req.path, serverResponse);
    // }
    const serverResponse = await generatePage(req.path);
    res.send(serverResponse);
  };

export default renderMiddleware;

function generateReactQueryScriptElement(dehydratedState: DehydratedState): JSX.Element {
  return (
    // Ignoring semgrep check - this is intentional and standard way of writing plain html in react components
    // nosemgrep
    <script
      key="react-query"
      dangerouslySetInnerHTML={{
        __html: `window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};`,
      }}
    />
  );
}
