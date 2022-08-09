import React from 'react';
import loadable, { LoadableComponent } from '@loadable/component';
import { callAPI } from '../home/Home';

// These will create separate JS bundles
const Home = loadable(() => import('../home/Home'));
const Csr = loadable(() => import('../csr/csr'));
const SSRSkeleton = loadable(() => import('../ssr/ssr-skeleton'));
const SSRReactQuery = loadable(() => import('../ssr/ssr-react-query'));

type Route = {
  path: string;
  element: React.ReactNode;
  loadableChunk: LoadableComponent<Record<string, unknown>>;
  exact?: boolean;
  cacheExpirySeconds?: number;
  isABEnabled?: boolean;
};

type Routes = Route[];

export const paths = {
  HOME: '/',
  CSR: '/csr',
  SSRSkeleton: '/ssr-skeleton',
  SSRReactQuery: '/ssr-react-query',
};

const HOUR = 60 * 60;

export const routes: Routes = [
  {
    path: paths.HOME,
    element: <Home />,
    loadableChunk: Home,
    cacheExpirySeconds: 1 * HOUR,
    isABEnabled: true,
    fetchData: (queryClient) => queryClient.prefetchQuery(['product'], callAPI),
  },
  {
    path: paths.CSR,
    element: <Csr />,
    loadableChunk: Csr,
    cacheExpirySeconds: 24 * HOUR,
  },
  {
    path: paths.SSRSkeleton,
    element: <SSRSkeleton />,
    loadableChunk: SSRSkeleton,
    cacheExpirySeconds: 24 * HOUR,
  },
  // {
  //   path: paths.SSRReactQuery,
  //   element: <SSRReactQuery />,
  //   loadableChunk: SSRReactQuery,
  //   cacheExpirySeconds: 24 * HOUR,
  // },
];
