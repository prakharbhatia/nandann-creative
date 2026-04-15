import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    version: '1.3.8',                                                              // ← bump
    download_url: 'https://www.nandann.com/api/pixlify/download',
    homepage: 'https://www.nandann.com/pixlify-image-optimizer',
    requires: '5.8',
    tested: '6.9',                                                                 // ← fixed
    requires_php: '7.4',
    sections: {
      description: 'Converts images to WebP and AVIF automatically.',
      changelog: '<h4>1.3.8</h4><ul><li>License validation now server-side — key verified by nandann.com on every activation</li><li>Blacklist support: revoked keys deactivate automatically within 24h</li><li>Fixed WebP/AVIF serving persisting after license removal</li></ul><h4>1.3.7</h4><ul><li>Bug fixes and improvements</li></ul>',    // ← bump
    },
  });
}