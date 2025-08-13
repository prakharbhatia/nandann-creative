import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Nandann Creative';
  const subtitle = searchParams.get('subtitle') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#0ea5e9,#8b5cf6)',
          padding: '60px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.15), transparent 50%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 70, color: 'white', fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          {subtitle && (
            <div style={{ fontSize: 34, marginTop: 20, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{subtitle}</div>
          )}
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', color: 'white', fontSize: 28 }}>
            <img
              src='https://www.nandann.com/images/Nandann-logo-new.png'
              style={{ width: 64, height: 'auto', marginRight: 16, objectFit: 'contain' }}
            />
            Nandann Creative Agency
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

