import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    version: '1.3.13',
    download_url: 'https://www.nandann.com/api/pixlify/download',
    homepage: 'https://www.nandann.com/pixlify-image-optimizer',
    requires: '5.8',
    tested: '6.9',                                                                 // ← fixed
    requires_php: '7.4',
    sections: {
      description: 'Converts images to WebP and AVIF automatically.',
      changelog: '<h4>1.3.13</h4><ul><li>Fixed critical bug: trial keys activated by older plugin versions stored no expiry date, causing WebP to keep serving indefinitely after trial ended — now detected and forces server re-validation</li><li>Page cache (WPEngine, WP Rocket, W3TC, LiteSpeed) now purged automatically when license expires or plugin is deactivated</li></ul><h4>1.3.11</h4><ul><li>Activating an expired key now saves it — License page shows Expired status with Check for Updates button instead of a plain error</li></ul><h4>1.3.10</h4><ul><li>License key is now retained when expired or revoked — key stays visible on the License page so you can renew or replace it</li><li>Check for Updates button now visible on License page even when trial has expired</li></ul><h4>1.3.9</h4><ul><li>Grace update path: sites on 1.3.8 with an expired trial can now receive this update</li><li>Blacklisted expired keys are still denied updates</li></ul><h4>1.3.8</h4><ul><li>License validation now server-side — key verified by nandann.com on every activation</li><li>Blacklist support: revoked keys deactivate automatically within 24h</li><li>Fixed WebP/AVIF serving persisting after license expiry</li></ul>',
    },
  });
}