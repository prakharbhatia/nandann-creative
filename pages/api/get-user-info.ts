import type { NextApiRequest, NextApiResponse } from 'next';

type UserInfo = {
  user_hash: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  isp: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfo>
) {
  // Return static data to prevent API rate limiting issues
  res.status(200).json({
    user_hash: 'static-user',
    country: 'United States',
    city: 'New York',
    region: 'NY',
    timezone: 'America/New_York',
    isp: 'Development'
  });
}

