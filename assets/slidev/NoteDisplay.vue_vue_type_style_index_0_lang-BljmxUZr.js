import{m as H}from"../modules/unplugin-icons-DKGwFFba.js";import{d as A,z as x,o as m,b as f,e as d,l as T,B as z,F as B,x as C,ag as F,ae as P,af as V,i as k,h as D,p as K,a as R,t as E,E as q,n as j,K as U,D as X}from"../modules/vue-Dxc2MuZf.js";import{q as G,r as J,C as I,_ as O}from"../index-2pPdbWY-.js";const N=h=>(K("data-v-2d545019"),h=h(),R(),h),Q=["title"],W={class:"flex gap-0.2 items-center min-w-16 font-mono mr1"},Y=N(()=>d("div",{"flex-auto":""},null,-1)),Z={"text-primary":""},ee=N(()=>d("span",{op25:"","text-sm":""},"/",-1)),te={op50:"","text-sm":""},oe={key:1,op50:"","flex-auto":"",pl1:""},se={relative:"","flex-auto":"",h5:"","font-mono":"",flex:"~"},le=["min","max"],ne=A({__name:"ClicksSlider",props:{clicksContext:{},readonly:{type:Boolean},active:{type:Boolean,default:!0}},setup(h){const p=h,t=x(()=>p.clicksContext.total),_=x(()=>G(0,p.clicksContext.clicksStart,t.value)),v=x(()=>t.value-_.value+1),r=x({get(){return p.clicksContext.current>t.value?-1:p.clicksContext.current},set(c){p.clicksContext.current=c}}),g=x(()=>J(_.value,t.value+1));function i(){p.readonly||(r.value<0||r.value>t.value)&&(r.value=0)}return(c,u)=>{const w=H;return m(),f("div",{class:k(["flex gap-1 items-center select-none",v.value&&p.clicksContext.isMounted?"":"op50"]),title:`Clicks in this slide: ${v.value}`},[d("div",W,[T(w,{"text-sm":"",op50:""}),r.value>=0&&r.value!==z(I)&&c.active?(m(),f(B,{key:0},[Y,d("span",Z,C(r.value),1),ee,d("span",te,C(t.value),1)],64)):(m(),f("div",oe,C(t.value),1))]),d("div",se,[(m(!0),f(B,null,F(g.value,l=>(m(),f("div",{key:l,border:"y main","of-hidden":"",relative:"",class:k([l===0?"rounded-l border-l":"",l===t.value?"rounded-r border-r":""]),style:D({width:v.value>0?`${1/v.value*100}%`:"100%"})},[d("div",{absolute:"","inset-0":"",class:k(l<=r.value&&c.active?"bg-primary op15":"")},null,2),d("div",{class:k([+l==+r.value&&c.active?"text-primary font-bold op100 border-primary":"op30 border-main",l===0?"rounded-l":"",l===t.value?"rounded-r":"border-r-2"]),"w-full":"","h-full":"","text-xs":"",flex:"","items-center":"","justify-center":"","z-1":""},C(l),3)],6))),128)),P(d("input",{"onUpdate:modelValue":u[0]||(u[0]=l=>r.value=l),class:k(["range",c.readonly?"pointer-events-none":""]),type:"range",min:_.value,max:t.value,step:1,absolute:"","inset-0":"","z-10":"",op0:"",style:D({"--thumb-width":`${1/(v.value+1)*100}%`}),onMousedown:i,onFocus:u[1]||(u[1]=l=>{var y;return(y=l.currentTarget)==null?void 0:y.blur()})},null,46,le),[[V,r.value]])])],10,Q)}}}),pe=O(ne,[["__scopeId","data-v-2d545019"]]),ae=["innerHTML"],re=["textContent"],ie=["textContent"],L="slidev-note-fade",b="slidev-note-click-mark",ve=A({__name:"NoteDisplay",props:{class:{},noteHtml:{},note:{},highlight:{type:Boolean,default:!0},placeholder:{},clicksContext:{},autoScroll:{type:Boolean}},emits:["markerDblclick","markerClick"],setup(h,{emit:p}){const t=h,_=x(()=>{var i;return t.clicksContext!=null&&((i=t.noteHtml)==null?void 0:i.includes("slidev-note-click-mark"))}),v=E(null);function r(){var y,$;if(!v.value||!_.value)return;const i=Array.from(v.value.querySelectorAll(`.${b}`)),c=new Map,u=new Map;let w=0;for(const n of i){const s=Number(n.dataset.clicks);c.set(n,s);let o=n,e=n.parentElement;for(;e&&o!==v.value;)u.has(e)||u.set(e,[[null,w]]),u.get(e).push([o,s]),o=e,e=e.parentElement;w=s}const l=new Map;for(const[n,s]of u){let o=!1,e=0;for(const a of Array.from(n.childNodes)){let S=!1;for(;a===((y=s[e+1])==null?void 0:y[0]);)S=!0,e++;if(S)continue;let M=a;if(a.nodeType===3){if(!(($=a.textContent)!=null&&$.trim()))continue;M=document.createElement("span"),M.textContent=a.textContent,n.insertBefore(M,a),a.remove()}o||(o=e===0),l.set(M,s[e][1])}o||(s[0][1]=-1)}return n=>{const s=t.highlight;for(const[o,e]of u)o.classList.toggle(L,s&&!e.some(([a,S])=>S===n));for(const[o,e]of l)o.classList.toggle(L,s&&e!==n);for(const[o,e]of c)o.classList.remove(L),o.classList.toggle(`${b}-past`,s&&e<n),o.classList.toggle(`${b}-active`,s&&e===n),o.classList.toggle(`${b}-next`,s&&e===n+1),o.classList.toggle(`${b}-future`,s&&e>n+1),o.ondblclick=s?a=>{p("markerDblclick",a,e),!a.defaultPrevented&&(t.clicksContext.current=e,a.stopPropagation(),a.stopImmediatePropagation())}:null,o.onclick=s?a=>{p("markerClick",a,e)}:null,s&&t.autoScroll&&e===n&&o.scrollIntoView({block:"center",behavior:"smooth"})}}const g=E();return q(()=>[t.noteHtml,t.highlight],()=>{j(()=>{g.value=r()})},{immediate:!0}),U(()=>{r()}),X(()=>{var c,u;const i=((c=t.clicksContext)==null?void 0:c.current)??I;(u=g.value)==null||u.call(g,i)}),(i,c)=>i.noteHtml?(m(),f("div",{key:0,ref_key:"noteDisplay",ref:v,class:k(["prose overflow-auto outline-none slidev-note",[t.class,_.value?"slidev-note-with-clicks":""]]),innerHTML:i.noteHtml},null,10,ae)):i.note?(m(),f("div",{key:1,class:k(["prose overflow-auto outline-none slidev-note",t.class])},[d("p",{textContent:C(i.note)},null,8,re)],2)):(m(),f("div",{key:2,class:k(["prose overflow-auto outline-none opacity-50 italic select-none slidev-note",t.class])},[d("p",{textContent:C(t.placeholder||"No notes.")},null,8,ie)],2))}});export{pe as C,ve as _};