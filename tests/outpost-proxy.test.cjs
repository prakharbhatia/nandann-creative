const {test}=require('node:test');
const assert=require('node:assert/strict');
const config=require('../next.config.js');
test('Outpost routing is opt-in and rejects a loop back to the website', async()=>{
 const previous=process.env.OUTPOST_ORIGIN;
 try {
  delete process.env.OUTPOST_ORIGIN;
  assert.deepEqual(await config.rewrites(),[]);
  process.env.OUTPOST_ORIGIN='https://outpost-example.vercel.app';
  assert.deepEqual(await config.rewrites(),{beforeFiles:[{source:'/admin/:path*',destination:'https://outpost-example.vercel.app/admin/:path*'}]});
  for(const origin of ['https://www.nandann.com','https://nandann.com','http://outpost-example.vercel.app','https://outpost-example.vercel.app/admin']){
   process.env.OUTPOST_ORIGIN=origin;
   await assert.rejects(config.rewrites());
  }
 } finally {
  if(previous===undefined) delete process.env.OUTPOST_ORIGIN;
  else process.env.OUTPOST_ORIGIN=previous;
 }
});
