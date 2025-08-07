import { useRouteLoaderData } from 'react-router';
import { invariant } from './utils';
import type { Route } from '../+types/root';

export function useRequestInfo() {
  const data = useRouteLoaderData<Route.ComponentProps['loaderData']>('root');

  invariant(data?.requestInfo, 'No requestInfo found in root loader');

  return data.requestInfo;
}
