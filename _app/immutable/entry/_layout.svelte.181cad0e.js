import{S as _e,i as ve,s as Se,k as g,l as _,m as v,h as f,n as M,b as se,g as V,v as be,f as ye,d as G,C as ke,D as we,x as de,q as b,a as k,y as ee,r as y,c as w,z as $e,E as ue,F as t,A as te,G as Ee,u as Te,H as Ae,I as Ie,B as ae,J as De,K as Me,L as Pe,M as Ce,N as je}from"../chunks/index.83320916.js";import{s as Ne,d as Le}from"../chunks/searchAircraft.svelte_svelte_type_style_lang.f98c96c8.js";function me(p,e,i){const o=p.slice();return o[2]=e[i],o}function ge(p){let e,i,o,a=p[2].title+"",d,n,r,s,T,l,A,I,j,C;const N=[p[2].props];var E=p[2].component;function D(u){let h={};for(let S=0;S<N.length;S+=1)h=De(h,N[S]);return{props:h}}return E&&(l=de(E,D())),{c(){e=g("div"),i=g("div"),o=g("h2"),d=b(a),n=k(),r=g("button"),s=b("x"),T=k(),l&&ee(l.$$.fragment),A=k(),this.h()},l(u){e=_(u,"DIV",{class:!0});var h=v(e);i=_(h,"DIV",{class:!0});var S=v(i);o=_(S,"H2",{class:!0});var P=v(o);d=y(P,a),P.forEach(f),n=w(S),r=_(S,"BUTTON",{class:!0});var W=v(r);s=y(W,"x"),W.forEach(f),S.forEach(f),T=w(h),l&&$e(l.$$.fragment,h),A=w(h),h.forEach(f),this.h()},h(){M(o,"class","sheet__title svelte-478hlt"),M(r,"class","sheet__dismiss-button svelte-478hlt"),M(i,"class","sheet__header svelte-478hlt"),M(e,"class","sheet svelte-478hlt"),ue(e,"sheet--hidden",!p[2].shown)},m(u,h){se(u,e,h),t(e,i),t(i,o),t(o,d),t(i,n),t(i,r),t(r,s),t(e,T),l&&te(l,e,null),t(e,A),I=!0,j||(C=Ee(r,"click",p[1]),j=!0)},p(u,h){(!I||h&1)&&a!==(a=u[2].title+"")&&Te(d,a);const S=h&1?Ae(N,[Ie(u[2].props)]):{};if(h&1&&E!==(E=u[2].component)){if(l){be();const P=l;G(P.$$.fragment,1,0,()=>{ae(P,1)}),ye()}E?(l=de(E,D()),ee(l.$$.fragment),V(l.$$.fragment,1),te(l,e,A)):l=null}else E&&l.$set(S);(!I||h&1)&&ue(e,"sheet--hidden",!u[2].shown)},i(u){I||(l&&V(l.$$.fragment,u),I=!0)},o(u){l&&G(l.$$.fragment,u),I=!1},d(u){u&&f(e),l&&ae(l),j=!1,C()}}}function Ve(p){let e,i,o=p[0].stack,a=[];for(let n=0;n<o.length;n+=1)a[n]=ge(me(p,o,n));const d=n=>G(a[n],1,1,()=>{a[n]=null});return{c(){e=g("div");for(let n=0;n<a.length;n+=1)a[n].c();this.h()},l(n){e=_(n,"DIV",{class:!0});var r=v(e);for(let s=0;s<a.length;s+=1)a[s].l(r);r.forEach(f),this.h()},h(){M(e,"class","sheet-container svelte-478hlt")},m(n,r){se(n,e,r);for(let s=0;s<a.length;s+=1)a[s]&&a[s].m(e,null);i=!0},p(n,[r]){if(r&3){o=n[0].stack;let s;for(s=0;s<o.length;s+=1){const T=me(n,o,s);a[s]?(a[s].p(T,r),V(a[s],1)):(a[s]=ge(T),a[s].c(),V(a[s],1),a[s].m(e,null))}for(be(),s=o.length;s<a.length;s+=1)d(s);ye()}},i(n){if(!i){for(let r=0;r<o.length;r+=1)V(a[r]);i=!0}},o(n){a=a.filter(Boolean);for(let r=0;r<a.length;r+=1)G(a[r]);i=!1},d(n){n&&f(e),ke(a,n)}}}function We(p,e,i){let o;return we(p,Ne,d=>i(0,o=d)),[o,()=>Le()]}class Be extends _e{constructor(e){super(),ve(this,e,We,Ve,Se,{})}}function Fe(p){let e,i,o,a,d,n,r,s,T,l,A,I,j,C,N,E,D,u,h,S,P,W,H,R,z,J,K,x,B,Q,F,X,Y,L,O;const Z=p[1].default,$=Me(Z,p,p[0],null);return L=new Be({}),{c(){e=g("div"),i=g("h1"),o=b("My Flight Tracker"),a=k(),d=g("p"),n=b(`A simple Svelte wrapper on the popular\r
		`),r=g("a"),s=b("Three.js 3D Javascript library"),T=b("."),l=k(),A=g("p"),I=b(`My hack-a-thon idea hopes to demonstrate a declarative approach to building a 3D scene using\r
		Svelte bindings to manipulate the objects and transformations of the scene. The simple scene\r
		consists of a sphere to represent the Planet Earth; and transformations and cones to represent\r
		aircrafts and their flight current flight paths.`),j=k(),C=g("p"),N=b(`The lib\\sceneGraph folder contains the simple Svelte wrapper against the Three.js 3D Javascript\r
		library. We start with the Scene context and we add Transformations (Groups); Shapes; Lights and\r
		Cameras elements as nested elements to our Scene. We can also build higher level components by\r
		composition and add those components to our Scene, see aircraftElement.svelte;\r
		planetElement.svelte and sphericalTransformation.svelte in the lib\\copmonents folder.`),E=k(),D=g("p"),u=b("Each aircraft flight path is obtained using a mocked response from the "),h=g("a"),S=b("OpenSky Network."),P=b(` For more details checkout Matthias Schäfer, Martin Strohmeier, Vincent Lenders, Ivan Martinovic\r
		and Matthias Wilhelm: "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research". In\r
		Proceedings of the 13th IEEE/ACM International Symposium on Information Processing in Sensor Networks\r
		(IPSN), pages 83-94, April 2014. The response from the Opensky Api gives use useful information we\r
		can use to animate the movement of all returned aircrafts, including their starting position, altitude,\r
		direction they are facing, and speed they are travelling.`),W=k(),H=g("p"),R=b(`The aircraft state is stored using Svelte's writeable stores. The javascript api call\r
		requestAnimationFrame is used to update the position of each aircraft in the store. We bind the\r
		aircraft position element's properties in our 3d scene graph to animate them.`),z=k(),J=g("p"),K=b(`Each scene graph element also responds to pointer events, ie. Hovering over an Aircraft will\r
		change it's colour, clicking on an Aircraft will select the airacrft and display some details\r
		about the aircraft. If will also trigger the camera to start tracking the aircraft.`),x=k(),B=g("div"),$&&$.c(),Q=k(),F=g("div"),X=b("Somthing"),Y=k(),ee(L.$$.fragment),this.h()},l(m){e=_(m,"DIV",{class:!0});var c=v(e);i=_(c,"H1",{});var ne=v(i);o=y(ne,"My Flight Tracker"),ne.forEach(f),a=w(c),d=_(c,"P",{});var q=v(d);n=y(q,`A simple Svelte wrapper on the popular\r
		`),r=_(q,"A",{href:!0});var re=v(r);s=y(re,"Three.js 3D Javascript library"),re.forEach(f),T=y(q,"."),q.forEach(f),l=w(c),A=_(c,"P",{});var oe=v(A);I=y(oe,`My hack-a-thon idea hopes to demonstrate a declarative approach to building a 3D scene using\r
		Svelte bindings to manipulate the objects and transformations of the scene. The simple scene\r
		consists of a sphere to represent the Planet Earth; and transformations and cones to represent\r
		aircrafts and their flight current flight paths.`),oe.forEach(f),j=w(c),C=_(c,"P",{});var ie=v(C);N=y(ie,`The lib\\sceneGraph folder contains the simple Svelte wrapper against the Three.js 3D Javascript\r
		library. We start with the Scene context and we add Transformations (Groups); Shapes; Lights and\r
		Cameras elements as nested elements to our Scene. We can also build higher level components by\r
		composition and add those components to our Scene, see aircraftElement.svelte;\r
		planetElement.svelte and sphericalTransformation.svelte in the lib\\copmonents folder.`),ie.forEach(f),E=w(c),D=_(c,"P",{});var U=v(D);u=y(U,"Each aircraft flight path is obtained using a mocked response from the "),h=_(U,"A",{href:!0});var le=v(h);S=y(le,"OpenSky Network."),le.forEach(f),P=y(U,` For more details checkout Matthias Schäfer, Martin Strohmeier, Vincent Lenders, Ivan Martinovic\r
		and Matthias Wilhelm: "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research". In\r
		Proceedings of the 13th IEEE/ACM International Symposium on Information Processing in Sensor Networks\r
		(IPSN), pages 83-94, April 2014. The response from the Opensky Api gives use useful information we\r
		can use to animate the movement of all returned aircrafts, including their starting position, altitude,\r
		direction they are facing, and speed they are travelling.`),U.forEach(f),W=w(c),H=_(c,"P",{});var ce=v(H);R=y(ce,`The aircraft state is stored using Svelte's writeable stores. The javascript api call\r
		requestAnimationFrame is used to update the position of each aircraft in the store. We bind the\r
		aircraft position element's properties in our 3d scene graph to animate them.`),ce.forEach(f),z=w(c),J=_(c,"P",{});var he=v(J);K=y(he,`Each scene graph element also responds to pointer events, ie. Hovering over an Aircraft will\r
		change it's colour, clicking on an Aircraft will select the airacrft and display some details\r
		about the aircraft. If will also trigger the camera to start tracking the aircraft.`),he.forEach(f),x=w(c),B=_(c,"DIV",{class:!0});var pe=v(B);$&&$.l(pe),pe.forEach(f),Q=w(c),F=_(c,"DIV",{class:!0});var fe=v(F);X=y(fe,"Somthing"),fe.forEach(f),Y=w(c),$e(L.$$.fragment,c),c.forEach(f),this.h()},h(){M(r,"href","https://threejs.org/"),M(h,"href","https://opensky-network.org"),M(B,"class","layout__body svelte-457flo"),M(F,"class","layout__footer"),M(e,"class","layout svelte-457flo")},m(m,c){se(m,e,c),t(e,i),t(i,o),t(e,a),t(e,d),t(d,n),t(d,r),t(r,s),t(d,T),t(e,l),t(e,A),t(A,I),t(e,j),t(e,C),t(C,N),t(e,E),t(e,D),t(D,u),t(D,h),t(h,S),t(D,P),t(e,W),t(e,H),t(H,R),t(e,z),t(e,J),t(J,K),t(e,x),t(e,B),$&&$.m(B,null),t(e,Q),t(e,F),t(F,X),t(e,Y),te(L,e,null),O=!0},p(m,[c]){$&&$.p&&(!O||c&1)&&Pe($,Z,m,m[0],O?je(Z,m[0],c,null):Ce(m[0]),null)},i(m){O||(V($,m),V(L.$$.fragment,m),O=!0)},o(m){G($,m),G(L.$$.fragment,m),O=!1},d(m){m&&f(e),$&&$.d(m),ae(L)}}}function Oe(p,e,i){let{$$slots:o={},$$scope:a}=e;return p.$$set=d=>{"$$scope"in d&&i(0,a=d.$$scope)},[a,o]}class Je extends _e{constructor(e){super(),ve(this,e,Oe,Fe,Se,{})}}export{Je as default};