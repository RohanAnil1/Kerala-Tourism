const assert=require('node:assert/strict');
const {NextRequest}=require('next/server');
const {load}=require('./catalog-loader.cjs');
const {GET}=load('src/app/api/travel/route.ts');
const actualFetch=global.fetch;
const request=query=>new NextRequest('http://localhost:3000/api/travel?'+query);
(async()=>{
  try {
    let calls=0;
    global.fetch=async()=>{calls++;throw new Error('Provider unavailable');};
    assert.equal((await GET(request('kind=weather&stops=unknown'))).status,400);
    assert.equal((await GET(request('kind=unknown&stops=kochi'))).status,400);
    assert.equal((await GET(request('kind=roads&stops=https://example.com'))).status,400);
    assert.equal(calls,0,'Invalid places must never reach a remote provider');
    const failed=await GET(request('kind=weather&stops=munnar'));
    assert.equal(failed.status,502);
    assert.match((await failed.json()).error,/unavailable/i);
    global.fetch=async()=>({ok:true,json:async()=>({code:'NoRoute'})});
    assert.equal((await GET(request('kind=roads&stops=kochi,munnar'))).status,502);
    global.fetch=async()=>({ok:true,json:async()=>({daily:{time:['2026-10-27'],temperature_2m_max:[28],temperature_2m_min:[20],precipitation_probability_max:[60],weather_code:[61]}})});
    const weather=await(await GET(request('kind=weather&stops=munnar'))).json();
    assert.deepEqual(weather.forecasts,[{date:'2026-10-27',high:28,low:20,rain:60,code:61}]);
    global.fetch=async()=>({ok:true,json:async()=>({code:'Ok',routes:[{legs:[{distance:132500,duration:8400}]}]})});
    const roads=await(await GET(request('kind=roads&stops=kochi,munnar'))).json();
    assert.deepEqual(roads.legs,[{from:'kochi',to:'munnar',km:133,minutes:140}]);
    assert.match(roads.note,/No live traffic/);
    console.log('Travel API checks passed: input bounds, no arbitrary endpoints, provider failure, missing routes, and forecast/road response handling.');
  } finally {global.fetch=actualFetch;}
})().catch(error=>{console.error(error);process.exitCode=1;});
