const SEARCHES=[
 "new corporate office interior fit out project India",
 "hotel renovation interior furnishing project India",
 "commercial office furniture tender India",
 "new showroom interior project India"
];
export default {
 async scheduled(event,env,ctx){
  if(!env.TAVILY_API_KEY||!env.DB){console.error("Scheduled lead hunt skipped: missing TAVILY_API_KEY or DB binding");return;}
  const query=SEARCHES[(new Date().getUTCDate())%SEARCHES.length];
  const resp=await fetch("https://api.tavily.com/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:env.TAVILY_API_KEY,query,search_depth:"advanced",max_results:8})});
  if(!resp.ok){console.error("Tavily search failed",resp.status);return;}
  const data=await resp.json();
  for(const result of data.results||[]){
   if(!result.url)continue;
   const score=Math.max(25,Math.min(85,50+Math.round((result.score||0)*30)));
   const company=(result.title||"Public project signal").slice(0,240);
   const notes=(result.content||"").slice(0,900);
   try{
    await env.DB.prepare("INSERT OR IGNORE INTO leads (id,company,title,location,source,stage,score,email,phone,url,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
     .bind(crypto.randomUUID(),company,"Public web project signal","Location pending verification","Scheduled Tavily public search","New",score,"","",result.url,notes).run();
   }catch(err){console.error("Lead insert error",err);}
  }
  console.log("Scheduled hunt completed",query,"results:",data.results?.length||0);
 }
};