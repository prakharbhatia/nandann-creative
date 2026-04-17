import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.json({
    version: '1.1.0',
    download_url: 'https://www.nandann.com/api/hungry-file-manager/download?version=1.1.0',
    homepage: 'https://www.nandann.com/hungry-file-manager',
    requires: '6.2',
    tested: '6.9',
    requires_php: '7.4',
    sections: {
      description: 'The comprehensive, modern file manager for WordPress. Edit, upload, and manage files with a beautiful VS Code-like interface.',
      changelog: '<h4>1.1.0</h4><ul><li>Bumped version and fixed metadata alignment</li><li>Added self-hosted update functionality</li><li>Integrated remote update checker</li><li>Visual refinements for VS Code theme</li></ul><h4>1.0.1</h4><ul><li>Bug fixes and update system preparation</li></ul><h4>1.0.0</h4><ul><li>Initial release</li><li>Monaco Editor integration</li></ul>',
    },
  });
}
