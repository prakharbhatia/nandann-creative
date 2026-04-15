import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    version: '1.3.4',
    download_url: 'https://www.nandann.com/downloads/pixlify-image-optimizer-1.3.4.zip',
    homepage: 'https://www.nandann.com/pixlify-image-optimizer',
    requires: '5.8',
    tested: '6.7',
    requires_php: '7.4',
    sections: {
      description: 'Converts images to WebP and AVIF automatically.',
      changelog: '<h4>1.3.4</h4><ul><li>Self-hosted update system</li><li>License gating</li></ul>',
    },
  });
}
