import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    version: '1.3.7',                                                              // ← bump
    download_url: 'https://www.nandann.com/api/pixlify/download',
    homepage: 'https://www.nandann.com/pixlify-image-optimizer',
    requires: '5.8',
    tested: '6.9',                                                                 // ← fixed
    requires_php: '7.4',
    sections: {
      description: 'Converts images to WebP and AVIF automatically.',
      changelog: '<h4>1.3.7</h4><ul><li>Bug fixes and improvements</li></ul><h4>1.3.6</h4><ul><li>Bug fixes and improvements</li></ul>',    // ← bump
    },
  });
}