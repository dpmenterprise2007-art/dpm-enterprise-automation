import React, { useEffect, useMemo, useState } from "react";
import { Activity, Building2, Search, ShieldCheck, Mail, Phone, Plus, RefreshCw, ArrowUpRight, LayoutDashboard, Settings, Target, CircleCheck, Clock3 } from "lucide-react";

const stages = ["New", "Verified", "Contact Ready", "Contacted", "Follow-up", "Won", "Closed"];
const starterLeads = [
  { id:"demo-1", company:"Sample Corporate Office Project", title:"Office interior fit-out", location:"Mumbai, Maharashtra", source:"Demo data", stage:"New", score:78, email:"", phone:"", url:"", notes:"Replace demo record with live leads." },
  { id:"demo-2", company:"Sample Hospitality Project", title:"Hotel renovation / furniture", location:"Pune, Maharashtra", source:"Demo data", stage:"Verified", score:66, email:"", phone:"", url:"", notes:"Demo record only; not a real prospect." },
];

export default function App(){
  const [leads,setLeads]=useState(starterLeads);
  const [loading,setLoading]=useState(false);
  const [notice,setNotice]=useState("Demo workspace — connect search and outreach keys to enable live automation.");
  const [query,setQuery]=useState("corporate office interior project India tender");
  const [filter,setFilter]=useState("All");
  const [newLead,setNewLead]=useState({company:"",title:"Interior / furniture project",location:"",url:"",email:"",phone:""});
  const [showAdd,setShowAdd]=useState(false);
  useEffect(()=>{ fetch("/api/leads").then(r=>r.ok?r.json():null).then(d=>{if(d?.leads?.length)setLeads(d.leads)}).catch(()=>{}); },[]);
  const stats=useMemo(()=>({total:leads.length,verified:leads.filter(l=>["Verified","Contact Ready","Contacted","Follow-up","Won"].includes(l.stage)).length,ready:leads.filter(l=>["Contact Ready","Contacted","Follow-up"].includes(l.stage)).length,won:leads.filter(l=>l.stage==="Won").length}),[leads]);
  const visible=filter==="All"?leads:leads.filter(l=>l.stage===filter);
  async function hunt(){
    setLoading(true);setNotice("Searching public project signals and screening results…");
    try{const r=await fetch("/api/hunt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Search service not configured");if(d.leads?.length){setLeads(old=>[...d.leads,...old]);setNotice(`Search completed: ${d.leads.length} candidate leads found. Verify before outreach.`)}else setNotice(d.message||"Search completed; no candidates found.");}
    catch(e){setNotice(e.message+" (Configure TAVILY_API_KEY in Cloudflare Pages environment variables.)")}
    finally{setLoading(false)}
  }
  async function saveLead(e){e.preventDefault();const l={...newLead,id:crypto.randomUUID(),stage:"New",score:50,source:"Manual",notes:"Manually captured; verification pending."};setLeads(old=>[l,...old]);setShowAdd(false);setNewLead({company:"",title:"Interior / furniture project",location:"",url:"",email:"",phone:""});try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})}catch{}}
  async function changeStage(id,stage){setLeads(old=>old.map(l=>l.id===id?{...l,stage}:l));try{await fetch("/api/leads/"+encodeURIComponent(id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({stage})})}catch{}}
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark">D</div><div><b>DPM ENTERPRISE</b><small>Automation Workspace</small></div></div>
      <div className="nav-label">WORKSPACE</div><div className="nav active"><LayoutDashboard size={18}/> Dashboard</div><div className="nav"><Target size={18}/> Lead Hunting</div><div className="nav"><Building2 size={18}/> Pipeline</div><div className="nav"><Mail size={18}/> Outreach Queue</div><div className="nav"><Activity size={18}/> Activity & Reports</div>
      <div className="nav-label">SYSTEM</div><div className="nav"><Settings size={18}/> Settings & Integrations</div>
      <div className="side-footer"><ShieldCheck size={17}/><span>Approval-first outreach<br/><small>Review before sending/calling</small></span></div>
    </aside>
    <main className="main"><header><div><span className="eyebrow">DPM ENTERPRISE PRIVATE LIMITED</span><h1>Project lead automation</h1><p>Discover public project opportunities, verify buyers, manage pipeline, and prepare outreach.</p></div><button className="primary" onClick={()=>setShowAdd(true)}><Plus size={17}/> Add lead</button></header>
    <div className="notice"><Activity size={17}/><span>{notice}</span></div>
    <section className="stats"><Stat icon={<Search/>} label="Candidate leads" value={stats.total}/><Stat icon={<ShieldCheck/>} label="Verified pipeline" value={stats.verified}/><Stat icon={<Mail/>} label="Outreach ready" value={stats.ready}/><Stat icon={<CircleCheck/>} label="Won" value={stats.won}/></section>
    <section className="hunt"><div className="hunt-head"><div><h2>Opportunity Hunter</h2><p>Search public signals for interior, furniture, office fit-out and renovation projects.</p></div><span className="live-pill"><span/> Public-source search</span></div><div className="search-row"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search project signals…"/><button className="primary" disabled={loading} onClick={hunt}>{loading?<RefreshCw className="spin" size={17}/>:<Search size={17}/>} {loading?"Searching…":"Hunt leads"}</button></div><small className="hint">Live search uses an API key. Search results are candidates, not automatically verified buyers.</small></section>
    <section className="pipeline"><div className="section-head"><div><h2>Lead pipeline</h2><p>Move each opportunity forward after checking source and buyer details.</p></div><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option>{stages.map(s=><option key={s}>{s}</option>)}</select></div>
    <div className="lead-list">{visible.map(l=><article className="lead" key={l.id}><div className="lead-main"><div className="company-icon"><Building2 size={20}/></div><div><b>{l.company}</b><span>{l.title||"Project opportunity"}</span><small>{l.location||"Location not specified"} · {l.source||"Source"}</small>{l.url&&<a href={l.url} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={13}/></a>}</div></div><div className="lead-score"><span className="score">{l.score||0}</span><small>Lead score</small></div><div className="stage-box"><label>Stage</label><select value={l.stage||"New"} onChange={e=>changeStage(l.id,e.target.value)}>{stages.map(s=><option key={s}>{s}</option>)}</select></div><div className="lead-contact">{l.email&&<a href={"mailto:"+l.email}><Mail size={15}/>{l.email}</a>}{l.phone&&<a href={"tel:"+l.phone}><Phone size={15}/>{l.phone}</a>}{!l.email&&!l.phone&&<span><Clock3 size={15}/>Contact not yet verified</span>}</div></article>)}</div></section>
    <footer>Automation does not send unsolicited emails or place calls without human approval. Buyer identity, source, contact permission, and tender status must be reviewed.</footer>
    </main>
    {showAdd&&<div className="modal-bg" onClick={()=>setShowAdd(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={saveLead}><h2>Add project lead</h2><p>Manual entry · verification pending</p>{Object.entries(newLead).map(([key,val])=><label key={key}>{key==="company"?"Company / Buyer":key==="title"?"Project type":key.charAt(0).toUpperCase()+key.slice(1)}<input value={val} required={key==="company"} onChange={e=>setNewLead({...newLead,[key]:e.target.value})} placeholder={key==="url"?"Source URL":""}/></label>)}<div className="modal-actions"><button type="button" onClick={()=>setShowAdd(false)}>Cancel</button><button className="primary">Save lead</button></div></form></div>}
  </div>
}
function Stat({icon,label,value}){return <div className="stat"><div className="stat-icon">{icon}</div><div><strong>{value}</strong><span>{label}</span></div></div>}