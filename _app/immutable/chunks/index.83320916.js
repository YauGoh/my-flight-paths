function v(){}function H(t,n){for(const e in n)t[e]=n[e];return t}function O(t){return t()}function M(){return Object.create(null)}function x(t){t.forEach(O)}function P(t){return typeof t=="function"}function ot(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function I(t){return Object.keys(t).length===0}function T(t,...n){if(t==null)return v;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function st(t){let n;return T(t,e=>n=e)(),n}function lt(t,n,e){t.$$.on_destroy.push(T(n,e))}function ft(t,n,e,i){if(t){const r=B(t,n,e,i);return t[0](r)}}function B(t,n,e,i){return t[1]&&i?H(e.ctx.slice(),t[1](i(n))):e.ctx}function at(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],c=Math.max(n.dirty.length,r.length);for(let o=0;o<c;o+=1)l[o]=n.dirty[o]|r[o];return l}return n.dirty|r}return n.dirty}function dt(t,n,e,i,r,l){if(r){const c=B(n,e,i,l);t.p(c,r)}}function _t(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let E=!1;function W(){E=!0}function G(){E=!1}function J(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function K(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let s=0;s<n.length;s++){const a=n[s];a.claim_order!==void 0&&u.push(a)}n=u}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let u=0;u<n.length;u++){const s=n[u].claim_order,a=(r>0&&n[e[r]].claim_order<=s?r+1:J(1,r,b=>n[e[b]].claim_order,s))-1;i[u]=e[a]+1;const f=a+1;e[f]=u,r=Math.max(f,r)}const l=[],c=[];let o=n.length-1;for(let u=e[r]+1;u!=0;u=i[u-1]){for(l.push(n[u-1]);o>=u;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);l.reverse(),c.sort((u,s)=>u.claim_order-s.claim_order);for(let u=0,s=0;u<c.length;u++){for(;s<l.length&&c[u].claim_order>=l[s].claim_order;)s++;const a=s<l.length?l[s]:null;t.insertBefore(c[u],a)}}function Q(t,n){if(E){for(K(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function ht(t,n,e){E&&!e?Q(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function R(t){t.parentNode&&t.parentNode.removeChild(t)}function mt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function U(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function pt(){return C(" ")}function yt(){return C("")}function gt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function xt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function V(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,n,e,i,r=!1){X(t);const l=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const u=e(o);return u===void 0?t.splice(c,1):t[c]=u,r||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const u=e(o);return u===void 0?t.splice(c,1):t[c]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function Y(t,n,e,i){return D(t,r=>r.nodeName===n,r=>{const l=[];for(let c=0;c<r.attributes.length;c++){const o=r.attributes[c];e[o.name]||l.push(o.name)}l.forEach(c=>r.removeAttribute(c))},()=>i(n))}function bt(t,n,e){return Y(t,n,e,U)}function Z(t,n){return D(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>C(n),!0)}function $t(t){return Z(t," ")}function vt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Et(t,n){t.value=n??""}function wt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function Nt(t,n,e){t.classList[e?"add":"remove"](n)}function tt(t,n,{bubbles:e=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,i,n),r}function kt(t,n){return new t(n)}let g;function y(t){g=t}function p(){if(!g)throw new Error("Function called outside component initialization");return g}function jt(t){p().$$.on_mount.push(t)}function Ct(t){p().$$.after_update.push(t)}function At(t){p().$$.on_destroy.push(t)}function St(){const t=p();return(n,e,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[n];if(r){const l=tt(n,e,{cancelable:i});return r.slice().forEach(c=>{c.call(t,l)}),!l.defaultPrevented}return!0}}function Mt(t,n){return p().$$.context.set(t,n),n}function Lt(t){return p().$$.context.get(t)}const h=[],L=[];let m=[];const N=[],q=Promise.resolve();let k=!1;function z(){k||(k=!0,q.then(F))}function Ot(){return z(),q}function j(t){m.push(t)}function Pt(t){N.push(t)}const w=new Set;let _=0;function F(){if(_!==0)return;const t=g;do{try{for(;_<h.length;){const n=h[_];_++,y(n),nt(n.$$)}}catch(n){throw h.length=0,_=0,n}for(y(null),h.length=0,_=0;L.length;)L.pop()();for(let n=0;n<m.length;n+=1){const e=m[n];w.has(e)||(w.add(e),e())}m.length=0}while(h.length);for(;N.length;)N.pop()();k=!1,w.clear(),y(t)}function nt(t){if(t.fragment!==null){t.update(),x(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(j)}}function et(t){const n=[],e=[];m.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),m=n}const $=new Set;let d;function Tt(){d={r:0,c:[],p:d}}function Bt(){d.r||x(d.c),d=d.p}function it(t,n){t&&t.i&&($.delete(t),t.i(n))}function Dt(t,n,e,i){if(t&&t.o){if($.has(t))return;$.add(t),d.c.push(()=>{$.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function qt(t,n){const e={},i={},r={$$scope:1};let l=t.length;for(;l--;){const c=t[l],o=n[l];if(o){for(const u in c)u in o||(i[u]=1);for(const u in o)r[u]||(e[u]=o[u],r[u]=1);t[l]=o}else for(const u in c)r[u]=1}for(const c in i)c in e||(e[c]=void 0);return e}function zt(t){return typeof t=="object"&&t!==null?t:{}}function Ft(t,n,e){const i=t.$$.props[n];i!==void 0&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function Ht(t){t&&t.c()}function It(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(n,e),i||j(()=>{const c=t.$$.on_mount.map(O).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...c):x(c),t.$$.on_mount=[]}),l.forEach(j)}function ct(t,n){const e=t.$$;e.fragment!==null&&(et(e.after_update),x(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ut(t,n){t.$$.dirty[0]===-1&&(h.push(t),z(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Wt(t,n,e,i,r,l,c,o=[-1]){const u=g;y(t);const s=t.$$={fragment:null,ctx:[],props:l,update:v,not_equal:r,bound:M(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(u?u.$$.context:[])),callbacks:M(),dirty:o,skip_bound:!1,root:n.target||u.$$.root};c&&c(s.root);let a=!1;if(s.ctx=e?e(t,n.props||{},(f,b,...A)=>{const S=A.length?A[0]:b;return s.ctx&&r(s.ctx[f],s.ctx[f]=S)&&(!s.skip_bound&&s.bound[f]&&s.bound[f](S),a&&ut(t,f)),b}):[],s.update(),a=!0,x(s.before_update),s.fragment=i?i(s.ctx):!1,n.target){if(n.hydrate){W();const f=V(n.target);s.fragment&&s.fragment.l(f),f.forEach(R)}else s.fragment&&s.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),G(),F()}y(u)}class Gt{$destroy(){ct(this,1),this.$destroy=v}$on(n,e){if(!P(e))return v;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!I(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{rt as A,ct as B,mt as C,lt as D,Nt as E,Q as F,gt as G,qt as H,zt as I,H as J,ft as K,dt as L,_t as M,at as N,v as O,Ft as P,Pt as Q,Et as R,Gt as S,St as T,Lt as U,Mt as V,At as W,x as X,st as Y,pt as a,ht as b,$t as c,Dt as d,yt as e,Bt as f,it as g,R as h,Wt as i,Ct as j,U as k,bt as l,V as m,xt as n,jt as o,wt as p,C as q,Z as r,ot as s,Ot as t,vt as u,Tt as v,L as w,kt as x,Ht as y,It as z};
