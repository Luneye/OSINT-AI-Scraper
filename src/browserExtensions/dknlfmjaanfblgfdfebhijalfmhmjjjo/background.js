(()=>{{let e="1";async function t(){return new Promise(n=>{chrome.scripting.getRegisteredContentScripts().then(a=>{n(a.map(c=>c.id))})})}let o=chrome.runtime.getManifest().content_scripts.filter(n=>n.js.includes("eventhook.js")).map(n=>n.matches);t().then(n=>{n.includes(e)||chrome.scripting.registerContentScripts([{id:e,matches:o.flat(),js:["eventhook/loader.js"],runAt:"document_start",allFrames:!0,world:"MAIN"}])})}var i=chrome;var x="https://api.nopecha.com",s="https://www.nopecha.com",j="https://developers.nopecha.com",g={doc:{url:j,automation:{url:`${j}/guides/extension_advanced/#automation-build`}},api:{url:x,recognition:{url:`${x}/recognition`},status:{url:`${x}/status`}},www:{url:s,annoucement:{url:`${s}/json/announcement.json`},demo:{url:`${s}/captcha`,recaptcha:{url:`${s}/captcha/recaptcha`},funcaptcha:{url:`${s}/captcha/funcaptcha`},awscaptcha:{url:`${s}/captcha/awscaptcha`},textcaptcha:{url:`${s}/captcha/textcaptcha`},turnstile:{url:`${s}/captcha/turnstile`},perimeterx:{url:`${s}/captcha/perimeterx`},geetest:{url:`${s}/captcha/geetest`},lemincaptcha:{url:`${s}/captcha/lemincaptcha`}},manage:{url:`${s}/manage`},pricing:{url:`${s}/pricing`},setup:{url:`${s}/setup`}},discord:{url:`${s}/discord`},github:{url:`${s}/github`,release:{url:`${s}/github/release`}}};var te="en",re="en";{let e=function(t,r,o,n){return{id:n,priority:1,action:{type:"redirect",redirect:{transform:{queryTransform:{addOrReplaceParams:[{key:t,value:r}]}}}},condition:{regexFilter:o,resourceTypes:["sub_frame"]}}};i.declarativeNetRequest.updateDynamicRules({addRules:[e("hl",te,"^https?://[^\\.]*\\.(google\\.com|recaptcha\\.net)/recaptcha",1),e("lang",re,"^https?://[^\\.]*\\.(funcaptcha\\.com?|arkoselabs\\.c(om|n)|arkose\\.com\\.cn)/fc/gc/",2)],removeRuleIds:[1,2]})}var p=new Map;chrome.tabs.onUpdated.addListener((e,t)=>{p.has(e)&&!("url"in t)||p.set(e,new Set)});chrome.tabs.onRemoved.addListener(e=>{p.delete(e)});async function U([e],t){let r=t.tab?.id;if(!r)return console.warn("[@nope/background/tabs] unable to figure out tabId");p.has(r)||p.set(r,new Set),p.get(r).add(e)}async function q(){let e=await new Promise(t=>{i.tabs.query({active:!0,currentWindow:!0},([r])=>{t(r)})});return p.has(e.id)?[...p.get(e.id)]:[]}var y={version:18,key:"",keys:[],enabled:!0,disabled_hosts:[],awscaptcha_auto_open:!1,awscaptcha_auto_solve:!1,awscaptcha_solve_delay_time:1e3,awscaptcha_solve_delay:!0,geetest_auto_open:!1,geetest_auto_solve:!1,geetest_solve_delay_time:1e3,geetest_solve_delay:!0,funcaptcha_auto_open:!0,funcaptcha_auto_solve:!0,funcaptcha_solve_delay_time:1e3,funcaptcha_solve_delay:!0,hcaptcha_auto_open:!0,hcaptcha_auto_solve:!0,hcaptcha_solve_delay_time:3e3,hcaptcha_solve_delay:!0,lemincaptcha_auto_open:!1,lemincaptcha_auto_solve:!1,lemincaptcha_solve_delay_time:1e3,lemincaptcha_solve_delay:!0,perimeterx_auto_solve:!1,perimeterx_solve_delay_time:1e3,perimeterx_solve_delay:!0,recaptcha_auto_open:!0,recaptcha_auto_solve:!0,recaptcha_solve_delay_time:2e3,recaptcha_solve_delay:!0,textcaptcha_auto_solve:!1,textcaptcha_image_selector:"",textcaptcha_input_selector:"",textcaptcha_solve_delay_time:100,textcaptcha_solve_delay:!0,turnstile_auto_solve:!0,turnstile_solve_delay_time:1e3,turnstile_solve_delay:!0};var v=i.action,R=!0;function P(e){if(e===R)return;R=e;let t=e?"":"g",r=[new Promise(o=>{v.setIcon({path:Object.fromEntries([16,32,48,128].map(n=>[n,`/icon/${n}${t}.png`]))},o)})];return w&&r.push(new Promise(o=>{v.setBadgeText({text:e?w:""},o)})),Promise.all(r)}var w="";function k(e,t){if(e!==w)return w=e,Promise.all([new Promise(r=>{if(!R)return r();v.setBadgeText({text:e},r)}),new Promise(r=>{v.setBadgeBackgroundColor({color:t},r)})])}function N(e,t){return t.tab.url}function B(){return new Promise(e=>{i.tabs.query({active:!0,currentWindow:!0},([t])=>e(t))})}async function m(){return(await B()).id}async function J(){let e=await B();return e&&e.url&&new URL(e.url).href}async function M(){let e=await B();return JSON.stringify(e)}var I=new Set,A=new Set;i.runtime.onConnect.addListener(e=>{e.name==="stream"?(I.add(e),e.onDisconnect.addListener(()=>{I.delete(e)})):e.name==="broadcast"&&(A.add(e),e.onDisconnect.addListener(()=>{A.delete(e)}))});function O(e){I.forEach(t=>t.postMessage(e))}async function F(e){let t=await m();e={data:e,event:"broadcast"},A.forEach(r=>{r.sender?.tab?.id!==void 0&&t===r.sender?.tab?.id&&r.postMessage(e)})}var L=new Promise(e=>{i.storage.local.get("settings",t=>{if(!t?.settings)return e(y);let{settings:r}=t;r.version!==y.version&&(r={...y,key:r.key}),r.enabled||P(!1),e(r)})});function f(){return L}async function E(e){let t={...await L,...e};return P(t.enabled),new Promise(r=>{i.storage.local.set({settings:t},()=>{L=Promise.resolve(t),O({event:"settingsUpdate",settings:e}),r(null)})})}var S="2";async function ne(){return new Promise(e=>{chrome.scripting.getRegisteredContentScripts().then(t=>{e(t.map(r=>r.id))})})}async function H(){let e=await f(),t=await ne();if(e.turnstile_auto_solve){if(t.includes(S))return;chrome.scripting.registerContentScripts([{id:S,matches:["*://challenges.cloudflare.com/*"],js:["captcha/turnstile.js"],runAt:"document_start",allFrames:!0,world:"MAIN"}])}else{if(!t.includes(S))return;chrome.scripting.unregisterContentScripts({ids:[S]})}}H();chrome.storage.onChanged.addListener(H);function V(){let e;return t=>e||(e=t().finally(()=>e=void 0),e)}var W,oe=V();function T(){return oe(()=>se())}async function G(){return W}var ae=i.runtime.getManifest().version;async function se(){let e=new URLSearchParams;e.append("v",ae);let t=(await f()).key;t&&e.append("key",t);let r=`${g.api.status.url}?${e.toString()}`,o,n=null;try{n=await fetch(r),o=await n.json()}catch(a){console.error("[@nope/background/api/status] failed to fetch status",n,a),o={error:-1,message:n?n.status===522?"Server not responding":n.status===502?"Server has routing issues":`Unknown server error: ${n.status}`:"Server connection failure."}}return n&&!n.ok&&(!o||!("error"in o))&&(console.error("[@nope/background/api/status] received non 2xx",n,o),o={error:-1,message:`Server error: ${n.status}`}),W=o,"error"in o?k("ERR","#FDE047"):typeof o.credit=="number"&&typeof o.quota=="number"?k(o.credit>=9999?`${Math.floor(o.credit/o.quota*100)}`:o.credit.toString(),o.credit?"#0a95ff":"#FB7185"):k("","#fff0"),o}T();function h(e){return new Promise(t=>setTimeout(t,e))}function $(e,t=2166136261){let r=t;for(let o of e)r^=o,r+=r<<1;return r>>>0}var ie=30,_=[];function C(e,t){let r;if(!t.method||t.method==="GET"){let n=new URLSearchParams(e.split("?")[1]).get("id");if(!n)return;let a=_.find(c=>{let u=c.postres[c.postres.length-1];return!u?.responseBody||!("data"in u.responseBody)?!1:u?.responseBody?.data===n});a&&(r=a.id,a.getreq={time:+new Date,url:e,options:t})}else for(r=""+[+new Date,performance.now(),Math.random()],_.push({id:r,postreq:{time:+new Date,url:e,options:t},getreq:{time:0,url:"",options:{}},postres:[],getres:[]});_.length>ie;)_.shift();return r}function b(e,t){let r=_.find(o=>o.id===e);r&&(r.getreq.time?(r.getres.push({time:+new Date,...t}),t.responseBody&&"data"in t.responseBody&&(r.answer=t.responseBody.data)):r.postres.push({time:+new Date,...t}))}function K(){return JSON.stringify(_)}var ce=[15,16,12,10,17];async function X(e){let t=new Headers;t.append("accept","application/json"),t.append("content-type","application/json");let r=typeof e.v=="string"?$(e.v.split("").map(c=>c.charCodeAt(0))):-1;e.key&&e.key!=="undefined"&&t.append("authorization",`Bearer ${e.key}`);let o;for(let c=30;c>0&&r===2860377017;c--){let u=C(g.api.url,{method:"POST",headers:t,body:e}),l=await fetch(g.api.url,{method:"POST",headers:t,body:JSON.stringify(e)});if(l.status>=500){b(u,{response:l,attempts:c}),await h(1e3);continue}let d=await l.json();if(b(u,{response:l,responseBody:d,attempts:c}),"error"in d){if(ce.includes(d.error))return d;d.error!==11&&console.warn("[@nope/background/api/recognition] unknown error",d),await h(1e3)}else{o=d.data;break}}if(!o)return{error:-1,message:"Server timeout"};t.delete("content-type");let n,a=`${g.api.url}?id=${o}&key=${e.key}`;for(let c=60;c>0;c--){n=C(a,{headers:t});let u=await fetch(a,{headers:t});if(u.status>=500){b(n,{response:u,attempts:c}),await h(1e3);continue}let l=await u.json();if(b(n,{response:u,responseBody:l,attempts:c}),"error"in l)l.error!==14&&console.warn("[@nope/background/api/recognition] unknown error",l),await h(1e3);else return l}return n&&b(n,{failed:!0}),{error:-1,message:"Server timeout"}}async function z([e,t]){let r=await fetch(e,t);return{headers:Object.fromEntries(r.headers.entries()),status:r.status,ok:r.ok,text:await r.text()}}async function Q([e,t]){let r=await fetch(e,t),o=await r.blob(),n=new FileReader;return await new Promise(a=>{n.addEventListener("load",a),n.readAsDataURL(o)}),{headers:Object.fromEntries(r.headers.entries()),status:r.status,ok:r.ok,data:n.result}}function D(e){let t=("60a8b3778b5b01f87ccc8129cd88bf0f6ec61feb879c88908365771cfcadc232"+e).split("").map(r=>r.charCodeAt(0));return Z(t)}var Y=new Uint32Array(256);for(let e=256;e--;){let t=e;for(let r=8;r--;)t=t&1?3988292384^t>>>1:t>>>1;Y[e]=t}function Z(e){let t=-1;for(let r of e)t=t>>>8^Y[t&255^r];return(t^-1)>>>0}async function ee(e){!e&&(e=await m(),!e)||chrome.scripting.executeScript({target:{tabId:e,allFrames:!0},files:["lib/selector.js","locate.js"],world:"ISOLATED",injectImmediately:!0})}var ue={"echo::sender":(e,t)=>t,"log::getLogs":K,"settings::get":f,"settings::update":([e])=>E(e),"api::fetchStatus":T,"api::getCachedStatus":G,"api::recognition":([e])=>X(e),"tab::getCurrentId":m,"tab::getCurrentJSON":M,"tab::getCurrentURL":J,"tab::getURL":N,"tab::registerDetectedCaptcha":U,"tab::getDetectedCaptchas":q,"fetch::universalFetch":z,"fetch::asData":Q,"tab::broadcast":([e])=>F(e),"locator::inject":(e,t)=>ee(t?.tab?.id)};i.runtime.onMessage.addListener((e,t,r)=>{let o=e[1],n=ue[o];return Promise.resolve(n(e.slice(2),t)).then(a=>{r([D(e[0]),a])}).catch(a=>{console.error(`[@nope/background/rpc] [${o}] errored!`,e.slice(2),a),r([D(e[0]),""+a])}),!0});})();