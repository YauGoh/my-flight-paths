import{w as h}from"./index.4b11e5be.js";import{Y as l}from"./index.83320916.js";const i={stack:[],dismissed:[]},s=h(i),d=(e,t,a)=>{const o={shown:!1,component:e,title:t,props:a};s.update(n=>({...n,stack:[...n.stack,o]})),setTimeout(()=>c(o))},f=(e,t,a)=>{const o={shown:!1,component:e,title:t,props:a};s.update(n=>({...n,stack:[...n.stack.map(r=>({...r,shown:!1})),o]})),setTimeout(()=>c(o))},k=()=>{const{stack:e}=l(s),t=e.filter(a=>a.shown);if(t.length!==0)return t[t.length-1]},w=e=>{e.shown=!1,s.update(t=>({...t,stack:[...t.stack]}))},c=e=>{e.shown=!0,s.update(t=>({...t,stack:[...t.stack]}))},m=s;export{d as a,w as d,k as g,f as p,m as s};