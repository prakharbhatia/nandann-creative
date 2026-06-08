import type { NextApiRequest, NextApiResponse } from 'next';
import { isUpdatesDisabled } from '../../../lib/pixlify/db';

const FULL_RESPONSE = {
  version: '1.3.17',
  download_url: 'https://www.nandann.com/api/pixlify/download',
  homepage: 'https://www.nandann.com/pixlify-image-optimizer',
  requires: '5.8',
  tested: '6.9',
  requires_php: '7.4',
  sections: {
    description: 'Converts images to WebP and AVIF automatically.',
    changelog: '<h4>1.3.17</h4><ul><li>Fixed filename collision bug: source files sharing the same base name but different extensions (e.g. photo.jpg and photo.png) no longer overwrite each other\'s AVIF/WebP conversion — converted files are now named photo.jpg.avif instead of photo.avif</li><li>Existing conversions continue to be served without re-running the optimizer (automatic legacy fallback)</li></ul><h4>1.3.13</h4><ul><li>Per-key update control: admin can now disable update notifications for specific keys from the nandann admin panel</li><li>Fixed critical bug: trial keys activated by older plugin versions stored no expiry date, causing WebP to keep serving indefinitely after trial ended</li><li>Page cache (WPEngine, WP Rocket, W3TC, LiteSpeed) now purged automatically when license expires or plugin is deactivated</li></ul><h4>1.3.11</h4><ul><li>Activating an expired key now saves it — License page shows Expired status with Check for Updates button instead of a plain error</li></ul><h4>1.3.10</h4><ul><li>License key is now retained when expired or revoked — key stays visible on the License page so you can renew or replace it</li><li>Check for Updates button now visible on License page even when trial has expired</li></ul><h4>1.3.9</h4><ul><li>Grace update path: sites on 1.3.8 with an expired trial can now receive this update</li><li>Blacklisted expired keys are still denied updates</li></ul><h4>1.3.8</h4><ul><li>License validation now server-side — key verified by nandann.com on every activation</li><li>Blacklist support: revoked keys deactivate automatically within 24h</li><li>Fixed WebP/AVIF serving persisting after license expiry</li></ul>',
  },
};

/**
 * GET /api/pixlify/update-info?key=PXLF-...
 *
 * Returns the current plugin manifest. If a key is provided and that key is
 * on the no-updates list, returns an empty manifest so the plugin sees no
 * update available — useful for freezing sites on a specific version without
 * fully blacklisting them.
 *
 * Cache headers are NOT set when a key is in the query string — per-key
 * responses must not be cached by Vercel's edge or any intermediate proxy.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = typeof req.query.key === 'string' ? req.query.key.trim() : '';

  if (key) {
    // Per-key request — no edge caching, every check hits this function fresh.
    res.setHeader('Cache-Control', 'no-store');

    if (await isUpdatesDisabled(key)) {
      // Return manifest with no version → plugin's check_update() bails out
      // at `if (! $remote || empty( $remote->version ))`.
      return res.json({
        download_url: FULL_RESPONSE.download_url,
        homepage:     FULL_RESPONSE.homepage,
        requires:     FULL_RESPONSE.requires,
        tested:       FULL_RESPONSE.tested,
        requires_php: FULL_RESPONSE.requires_php,
      });
    }

    return res.json(FULL_RESPONSE);
  }

  // No key → public manifest, fine to cache aggressively
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json(FULL_RESPONSE);
}
