const defaultSearches=["corporate office interior fit out project India","hotel renovation interior furniture project India","office furniture supply tender India","commercial interior design project upcoming India"];
export async function onRequestPost({request,env}){
 if(!env.TAVILY_API_KEY)return Response.json({error:"Live search is not configured. Add TAVILY_API_KEY in Cloudflare Pages environment variables."},{status:503});
 const body=await request.json().catch(()=>({}));
 const query=String(body.query||defaultSearches.join(" OR ")).slice(0,500);
 try{
  const resp=await fetch("https://api.tavily.com/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({api_key:env.TAVILY_API_KEY,query,search_depth:"advanced",max_results:10,include_answer:false})});
  if(!resp.ok)throw new Error("Search provider error "+resp.status);
  const data=await resp.json();
  const leads=(data.results||[]).map(r=>({id:crypto.randomUUID(),company:r.title||"Untitled source",title:"Public project signal — review required",location:"India / verify location",source:"Tavily public web search",stage:"New",score:Math.max(20,Math.min(90,50+Math.round((r.score||0)*40))),email:"",phone:"",url:r.url,notes:(r.content||"").slice(0,600)}));
  if(env.DB){for(const l of leads){if(!l.url)continue;await env.DB.prepare("INSERT OR IGNORE INTO leads (id,company,title,location,source,stage,score,email,phone,url,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(l.id,l.company,l.title,l.location,l.source,l.stage,l.score,l.email,l.phone,l.url,l.notes).run();}}
  return Response.json({leads,message:leads.length+" candidates returned"+(env.DB?" and saved to the lead database":"")+". Verify buyer, project, contact, and procurement status before outreach."});
 }catch(e){return Response.json({error:e.message},{status:502});}
}