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
  try {
    // Get real IP address from request headers
    const forwarded = req.headers['x-forwarded-for'];
    let realIP: string = 'unknown';
    
    if (typeof forwarded === 'string') {
      realIP = forwarded.split(',')[0].trim();
    } else if (typeof req.headers['x-real-ip'] === 'string') {
      realIP = req.headers['x-real-ip'];
    } else if (req.socket.remoteAddress) {
      realIP = req.socket.remoteAddress;
    }

    // Fetch geolocation data from ipapi.co
    const geoResponse = await fetch(`https://ipapi.co/${realIP}/json/`);
    const geoData = await geoResponse.json();

    // Return user info with IP as user_hash
    res.status(200).json({
      user_hash: realIP,
      country: geoData.country_name || 'Unknown',
      city: geoData.city || 'Unknown',
      region: geoData.region || 'Unknown',
      timezone: geoData.timezone || 'Unknown',
      isp: geoData.org || 'Unknown'
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    
    // Return fallback data if API fails
    res.status(200).json({
      user_hash: 'unknown',
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      timezone: 'Unknown',
      isp: 'Unknown'
    });
  }
}

