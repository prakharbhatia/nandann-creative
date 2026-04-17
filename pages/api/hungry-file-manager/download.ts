import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * GET /api/hungry-file-manager/download?version=1.0.0
 *
 * Public download gate for Hungry File Manager plugin zip files.
 * Since this is a free plugin, we don't require license keys.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { version } = req.query;

  // Default to 1.1.0 if not specified, but validate format if it is
  let targetVersion = '1.1.0';
  if (version && typeof version === 'string') {
    if (/^\d+\.\d+\.\d+$/.test(version)) {
      targetVersion = version;
    } else {
      return res.status(400).json({ error: 'Invalid version format' });
    }
  }

  // Redirect to the static zip file
  // In the future, we can have multiple files like hungry-file-manager-1.0.1.zip
  const zipUrl = `https://www.nandann.com/downloads/hungry-file-manager-${targetVersion}.zip`;
  
  // For now, if someone asks for a version we don't have yet, we could fallback to the main one
  // but since we renamed it to include 1.0.0, the pattern works perfectly.
  
  res.redirect(302, zipUrl);
}
