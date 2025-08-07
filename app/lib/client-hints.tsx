/**
 * This file contains utilities for using client hints for user preference which
 * are needed by the server, but are only known by the browser.
 */
import { getHintUtils } from '@epic-web/client-hints';
import {
  clientHint as colorSchemeHint,
  subscribeToSchemeChange,
} from '@epic-web/client-hints/color-scheme';
import { useRevalidator } from 'react-router';
import { useEffect } from 'react';
import { useRequestInfo } from './request-info';

const hintsUtils = getHintUtils({
  theme: colorSchemeHint,
});

export const { getHints } = hintsUtils;

/**
 * @returns an object with the client hints and their values
 */
export function useHints() {
  const requestInfo = useRequestInfo();
  return requestInfo.hints;
}

/**
 * @returns A script element that validates client hints, creates cookies if missing,
 * and triggers a page reload if any cookie values were incorrect
 */
export function ClientHintCheck({ nonce }: { nonce: string }) {
  const { revalidate } = useRevalidator();

  useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate]);

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: hintsUtils.getClientHintCheckScript(),
      }}
    />
  );
}
