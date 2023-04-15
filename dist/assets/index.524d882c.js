(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function Gs(s){const e=new Set;function t(l){e.add(l)}function n(l){e.delete(l)}const i={get(l,u){return u==="__subscribe"?t:u==="__unsubscribe"?n:typeof l[u]=="object"&&l[u]!==null&&!(l[u]instanceof HTMLElement)?new Proxy(l[u],i):l[u]},set(l,u,d){l[u]=d;for(const f of e)f.__update();return!0}};return new Proxy(s,i)}function kl(s){return Ul(new Uc(s))}function Ul(s){function e(n,i){return typeof n[i]!="function"&&typeof n[i]!="object"?n[i]:(i.startsWith("$")&&(i=i.substring(1)),typeof n[i]=="function"?function(...l){return n[i].apply(n,l)}.bind(this):new Proxy(n[i],{set:(l,u,d)=>(t.__handleEffect(t.__isReactive(d),()=>{l[u]=t.__handleFunction(d)}),!0),get:(l,u)=>e(l,u)}))}const t=new Proxy(s,{get:(n,i)=>{if(i in n)return n[i];if(i in n.__element)return e(n.__element,i)},set:(n,i,o)=>i in n?(n[i]=o,!0):(i.startsWith("$")&&(i=i.substring(1)),i=="style"?n.$set_style(o):i in n.__element&&n.$property(i,o),!0)});return t}class Uc{constructor(e){if(typeof e=="string")this.__element=document.createElement(e);else if(e instanceof HTMLElement)this.__element=e;else throw new Error("Invalid element name");this.__events=[],this.__children=[],this.__states=new Set,this.__unmounted_events=[],this.__mounted_events=[],this.__parent=null}__update(){for(const e of this.__events)e()}$click(){return this.__element.click(),this}$find(e){var t=[];this.__element.matches(e)&&t.push(Ul(this));for(const n of this.__children)t=t.concat(n.$find(e));return t}$update(){for(const e of this.__events)e();for(const e of this.__children)e.$update()}__parseInput(e){if(e&&e.key=="e0b8fc2b-fc7e-4786-bc05-b85187a8d065"){for(const t of e.elements)t&&t.__subscribe&&(this.__states.add(t),t.__subscribe(this));return e.expression}return e}__observeParent(){setTimeout(()=>{for(const t of this.__mounted_events)t()},0),new MutationObserver(t=>{for(const n of t){if(n.type==="childList"&&n.removedNodes.length){for(const i of n.removedNodes)if(i===this.__element){this.__unsubscribe();for(const o of this.__unmounted_events)o()}}if(n.type==="childList"&&n.addedNodes.length){for(const i of n.addedNodes)if(i===this.__element){this.__subscribe();for(const o of this.__mounted_events)o()}}}}).observe(this.__element.parentElement,{childList:!0})}__subscribe(){if(this.__states)for(const e of this.__states)e.__subscribe(this)}__unsubscribe(){for(const e of this.__children)e.__unsubscribe();if(this.__states)for(const e of this.__states)e.__unsubscribe(this)}__handleFunction(e){return typeof e=="function"?e():e}__handleEffect(e,t){e?(t(),this.__events.push(t)):t()}__isReactive(...e){for(const t of e)if(typeof t=="function")return!0;return!1}$if(e){return e=this.__parseInput(e),this.__handleEffect(this.__isReactive(e),()=>{const t=this.__handleFunction(e);this.$style("display",t?"":"none")}),this}$class(e,t=!0){e=this.__parseInput(e),t=this.__parseInput(t);var n=null;return this.__handleEffect(this.__isReactive(e,t),()=>{const i=this.__handleFunction(e);if(i)if(typeof i=="object")for(const o in i)i[o]?this.__element.classList.add(o):this.__element.classList.remove(o);else this.__handleFunction(t)?(this.__isReactive(e)&&(n&&this.__element.classList.remove(...n.split(" ").filter(o=>o.length>0)),n=i),this.__element.classList.add(...i.split(" ").filter(o=>o.length>0))):(this.__element.classList.remove(...i.split(" ").filter(o=>o.length>0)),n=null)}),this}get parentElement(){return this.__parent}$parent(e){return this.__parent=e,e.__element!==void 0?(e.__element.appendChild(this.__element),e.__children.push(this)):e.appendChild(this.__element),this.__observeParent(),this}$parentBefore(e){return this.__parent=e,e.__element!==void 0?e.__element.firstChild?e.__element.insertBefore(this.__element,e.__element.firstChild):e.__element.appendChild(this.__element):e.firstChild?e.insertBefore(this.__element,e.firstChild):e.appendChild(this.__element),this.__observeParent(),this}$on(e,t){return e==="mounted"?(this.__onMounted(t),this):e==="unmounted"?(this.__onUnmounted(t),this):e==="update"?(this.__onUpdate(t),this):(this.__element.addEventListener(e,t),this)}__onUpdate(e){return this.__events.push(e),this}__onMounted(e){this.__mounted_events.push(e)}__onUnmounted(e){this.__unmounted_events.push(e)}$property(e,t){return e=this.__parseInput(e),t=this.__parseInput(t),this.__handleEffect(this.__isReactive(e,t),()=>{this.__element[this.__handleFunction(e)]=this.__handleFunction(t)}),this}$style(e,t=null){return t?(this.__style(e,t),this):(e=this.__parseInput(e),this.__handleEffect(this.__isReactive(e),()=>{var n=this.__handleFunction(e);if(typeof n=="object")for(const i in n)this.__element.style[i]=n[i];else{const i=n.split(";").filter(o=>o.length>0);this.__element.style={};for(const o of i){const[l,u]=o.split(":");this.__element.style.setProperty(l,this.__handleFunction(u))}}}),this)}__style(e,t){return e=this.__parseInput(e),t=this.__parseInput(t),this.__handleEffect(this.__isReactive(e,t),()=>{this.__element.style[this.__handleFunction(e)]=this.__handleFunction(t)}),this}$get_computed_style(e){return window.getComputedStyle(this.__element).getPropertyValue(e)}$child(e){e=this.__parseInput(e);var t;this.__isReactive(e)?t=kl("span").$parent(this):t=this;var n=null;return this.__handleEffect(this.__isReactive(e),()=>{var i=this.__handleFunction(e);n&&n();const o=u=>u==null?()=>{}:u.__element!==void 0?(u.$parent(t),()=>u.$remove()):(u instanceof HTMLElement||(u=document.createTextNode(u)),t.__element.appendChild(u),()=>u.remove());if(Array.isArray(i)){var l=[];for(const u of i)l.push(o(u));n=()=>{for(const u of l)u()}}else n=o(i)}),this}$remove(){return this.__parent=null,this.__element.remove(),this}$model([e,t]){return this.$property("value",e),this.$on("input",n=>t(n.target.value)),this}}function Bc(s){return new Proxy({},{get:function(e,t){if(!!s){if(t.startsWith("$"))return Hc(s[t.substr(1)]);if(s[t])return Gc(s[t])}}})}function Gc(s){return s&&s.key=="e0b8fc2b-fc7e-4786-bc05-b85187a8d065"?s.expression():s}function Hc(s){return s&&s.key=="e0b8fc2b-fc7e-4786-bc05-b85187a8d065"?s.expression:()=>s}const Q=(s,e,...t)=>{var n,i=!1;if(typeof s=="function"){if(n=s(Bc(e),...t),n===void 0)return t;i=!0}else n=kl(s);const o={ref:u=>{u.__ref_object=n},style:u=>{n.$style(u)},class:u=>{n.$class(u)},parent:u=>{n.$parent(u)},if:u=>{n.$if(u)},model:([u,d])=>{n.$model([u,d])}},l={on:(u,d)=>{n.$on(u,d)}};if(e)for(const[u,d]of Object.entries(e)){const f=u.split(":");f.length==2?l[f[0]]&&l[f[0]](f[1],d):o[u]?o[u](d):i||n.$property(u,d)}if(t&&!i)for(const u of t)n.$child(u);return n};function Ge(s=null){var e=s;return new Proxy({},{get:(n,i)=>{if(e!=null)return typeof e[i]=="function"?function(...o){return e[i].apply(e,o)}.bind(this):e[i]},set:(n,i,o)=>(i==="__ref_object"&&(e=o),o!=null&&(e[i]=o),!0)})}function xr({options:s,name:e}){if(s===void 0&&console.error("DropDownMenu: options is undefined"),e===void 0){var e="[missing]";console.error("DropDownMenu: name is undefined")}var t=!1;const n=Ge(),i=Ge(),o=Q("div",{class:"drop-down-container"},Q("div",{class:"drop-down",ref:i},{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>e,elements:[typeof e<"u"?e:void 0]}),Q("div",{class:"drop-down-content",ref:n}));o.$class("drop-down-container-active",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>t,elements:[typeof t<"u"?t:void 0]});for(const l of s)if(l==null)Q("div",{class:"drop-down-separator"}).$parent(n);else if(l.action)Q("div",{class:"drop-down-menu-item","on:click":function(f){l.action(f),t=!1,o.$update()}},{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l.text,elements:[typeof l<"u"?l:void 0,typeof text<"u"?text:void 0]}).$parent(n);else if(l.options){let u=l.options[0];for(const d of l.options){const f=Ge(),h=Q("div",{class:"drop-down-menu-item"},Q("i",{class:"fa-regular",ref:f}),"\xA0",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>d,elements:[typeof d<"u"?d:void 0]});h.$class("button-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>d===u,elements:[typeof d<"u"?d:void 0,typeof u<"u"?u:void 0]}),f.$class("fa-circle",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>d!==u,elements:[typeof d<"u"?d:void 0,typeof u<"u"?u:void 0]}),f.$class("fa-circle-dot circle-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>d===u,elements:[typeof d<"u"?d:void 0,typeof u<"u"?u:void 0]}),h.$parent(n),h.$on("click",()=>{u=d,o.$update(),l.set(d)})}}else{let u=function(){l.active=!l.active,l.set(l.active),o.$update()};l.active=l.get();const d=Ge(),f=Q("div",{class:"drop-down-menu-item","on:click":u},Q("i",{class:"fa-regular",ref:d}),"\xA0",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l.text,elements:[typeof l<"u"?l:void 0,typeof text<"u"?text:void 0]});f.$class("drop-down-menu-item-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l.active,elements:[typeof l<"u"?l:void 0,typeof active<"u"?active:void 0]}),d.$class("fa-circle-check circle-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l.active,elements:[typeof l<"u"?l:void 0,typeof active<"u"?active:void 0]}),d.$class("fa-circle ",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>!l.active,elements:[typeof l<"u"?l:void 0,typeof active<"u"?active:void 0]}),f.$parent(n)}return i.$on("click",()=>{t=!t,o.$update()}),document.addEventListener("click",l=>{!n.contains(l.target)&&!i.contains(l.target)&&(t=!1,o.$update())}),o}function ba({options:s,$get:e,$set:t}){s===void 0&&(s=()=>[],console.error("DropDownMenu: options is undefined")),e===void 0&&(e=()=>{},console.error("DropDownMenu: get is undefined")),t===void 0&&(t=()=>{},console.error("DropDownMenu: set is undefined"));var n=e(),i=Q("div",{class:"row"});for(const l of s){let u=function(){t(l),n=l,i.$update()};const d=Ge();var o=Q("button",{class:"button","on:click":u},Q("i",{class:"fa-regular",ref:d})," ",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l,elements:[typeof l<"u"?l:void 0]});o.$class("button-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l===n,elements:[typeof l<"u"?l:void 0,typeof n<"u"?n:void 0]}),d.$class("fa-circle",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l!==n,elements:[typeof l<"u"?l:void 0,typeof n<"u"?n:void 0]}),d.$class("fa-circle-dot circle-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>l===n,elements:[typeof l<"u"?l:void 0,typeof n<"u"?n:void 0]}),o.$parent(i)}return i}function Ss({name:s,$get:e,$set:t}){s===void 0&&(s=()=>[],console.error("Toggle button: name is undefined")),e===void 0&&(e=()=>{},console.error("Toggle button: get is undefined")),t===void 0&&(set=()=>{},console.error("Toggle button: set is undefined"));var n=e();function i(){n=!n,t(n),l.$update()}const o=Ge();var l=Q("button",{class:"button","on:click":i},Q("i",{class:"fa-regular",ref:o})," ",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>s,elements:[typeof s<"u"?s:void 0]});return l.$class("button-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>n,elements:[typeof n<"u"?n:void 0]}),o.$class("fa-circle-check circle-selected",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>n,elements:[typeof n<"u"?n:void 0]}),o.$class("fa-circle ",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>!n,elements:[typeof n<"u"?n:void 0]}),l}function ws({min:s,max:e,step:t,$get:n,$set:i}){s===void 0&&(s=0,console.error("Slider: min is undefined")),e===void 0&&(e=10,console.error("Slider: max is undefined")),t===void 0&&(t=1,console.error("Slider: step is undefined")),n===void 0&&(n=()=>1,console.error("Slider: get is undefined")),i===void 0&&(i=()=>{},console.error("Slider: set is undefined"));var o=t.toString().split("."),l=0;o.length>1&&(l=o[1].length);var u=n();const d=Ge(),f=Ge(),h=Ge(),p=Ge();var m=Q("div",{class:"slider-container"},Q("input",{type:"text",class:"input slider-input",model:[{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>u,elements:[typeof u<"u"?u:void 0]},T=>u=T],ref:p}),Q("div",{class:"work-area",ref:h},Q("div",{class:"slider-dot-container",ref:f},Q("div",{class:"slider-dot",ref:d})))),y=!1,M=0;p.$on("input",T=>{x(T.target.value),m.$update()}),d.$on("mousedown",T=>{T.stopPropagation(),y=!0,M=T.clientX-Number(d.$get_computed_style("left").replace("px",""))});function _(T){var E=f.getBoundingClientRect();d.$style("left",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>T+"px",elements:[typeof T<"u"?T:void 0]});var w=s+(e-s)*(T/E.width);w=Math.round(w/t)*t,i(w),u=w.toFixed(l),m.$update(),p.$update()}function x(E){var E=Number(u);E<s&&(E=s),E>e&&(E=e),i(E);var w=f.getBoundingClientRect(),S=(E-s)/(e-s)*w.width;d.$style("left",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>S+"px",elements:[typeof S<"u"?S:void 0]}),u=E.toFixed(l),d.$update()}return h.$on("mousedown",T=>{y=!0;var E=f.getBoundingClientRect(),w=T.clientX-E.left;M=T.clientX-T.offsetX+10,w<0&&(w=0),w>E.width&&(w=E.width),_(w)}),document.addEventListener("mousemove",T=>{if(y){var E=T.clientX,w=f.getBoundingClientRect(),S=E-M;S<0&&(S=0),S>w.width&&(S=w.width),_(S)}}),document.addEventListener("mouseup",T=>{y=!1}),m.$on("mounted",()=>{x()}),m}var yr=1e3;function sa(s,e){const t=Ge(),n=Ge(),i=Q("div",{class:"modal-background","v-show":"visible"},Q("div",{class:"modal-prompt",ref:n},Q("span",{class:"close-button",ref:t,id:"close"},Q("i",{class:"fa-solid fa-xmark"})),{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>s,elements:[typeof s<"u"?s:void 0]}));n.$on("click",l=>l.stopPropagation()),i.$on("click",l=>{n.contains(l.target)||o()}),i.$style("z-index",{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>yr++,elements:[typeof yr<"u"?yr:void 0]});function o(){e&&e(),yr--,i.$remove()}return t.$on("click",o),i.$parent(document.body),{close:o}}const Z={palette_colors:[],scene_colors:{},layers:{},mode:"Sculpt",tool:"Pen",wireframeMode:"Wireframe selected",brushSize:1,background:{r:0,g:0,b:0,a:1},foreground:{r:255,g:255,b:255,a:1},mirrorX:!1,mirrorY:!1,mirrorZ:!1,mirror:null,colorDisplay:null,feather:0,shape:"Sphere"};function Vc({$color:s,$set:e}){const t=Ge();var n=Q("div",{class:"color-palette-container "},Q("div",{class:"color-palette"},Q("div",{class:"color-palette-item-container",ref:t},Q("div",{class:"color-item double-border","on:click":i,style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`background-color:rgba(${s().r},${s().g},${s().b},${s().a})`,elements:[typeof s<"u"?s:void 0,typeof r<"u"?r:void 0,typeof s<"u"?s:void 0,typeof g<"u"?g:void 0,typeof s<"u"?s:void 0,typeof b<"u"?b:void 0,typeof s<"u"?s:void 0,typeof a<"u"?a:void 0]}},Q("i",{class:"fa fa-plus add-color-icon"})))));n.$on("contextmenu",u=>{u.preventDefault(),u.stopPropagation()});function i(){var u=s();Z.palette_colors.push(u),l(u)}for(var o of Z.palette_colors)l(o);n.$on("update",u=>{});function l(u){var d=Q("div",{class:"color-item double-border",style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`background-color:rgba(${u.r},${u.g},${u.b},${u.a})`,elements:[typeof u<"u"?u:void 0,typeof r<"u"?r:void 0,typeof u<"u"?u:void 0,typeof g<"u"?g:void 0,typeof u<"u"?u:void 0,typeof b<"u"?b:void 0,typeof u<"u"?u:void 0,typeof a<"u"?a:void 0]}});d.$on("mousedown",f=>{f.preventDefault(),f.stopPropagation(),f.button===0?e(u):f.button===2&&(Z.palette_colors.splice(Z.palette_colors.indexOf(u),1),d.$remove())}),d.$parent(t)}return n.set=function(u){o=u,n.$update()},n}function Wc({$color:s,$set:e}){const t=Ge();var n=Q("div",{class:"color-palette-container "},Q("div",{class:"color-palette"},Q("div",{class:"color-palette-item-container",ref:t})));for(var i of Object.values(Z.scene_colors))o(i[0]);n.$on("update",l=>{});function o(l){var u=Q("div",{class:"color-item double-border",style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`background-color:rgba(${l.r},${l.g},${l.b},1)`,elements:[typeof l<"u"?l:void 0,typeof r<"u"?r:void 0,typeof l<"u"?l:void 0,typeof g<"u"?g:void 0,typeof l<"u"?l:void 0,typeof b<"u"?b:void 0]}});u.$on("mousedown",d=>{d.preventDefault(),d.stopPropagation(),d.button===0?e(l):d.button===2&&u.$remove()}),u.$on("contextmenu",d=>{d.preventDefault(),d.stopPropagation()}),u.$parent(t)}return n.set=function(l){i=l,n.$update()},n}function Ts(s,e){const t=Ge(),n=Ge(),i=Ge(),o=Ge(),l=Ge(),u=Ge(),d=Ge(),f=Ge(),h=Ge(),p=Ge(),m=Ge(),y=Ge(),M=Ge(),_=Ge();var x={r:0,g:0,b:0,a:1},T=Q("div",{class:"modal-regular color-picker-modal"},Q("div",{class:"row"},Q("div",{class:"color-picker-container"},Q("div",{class:"sb-box",ref:t},Q("div",{class:"sb-circle",ref:o})),Q("div",{class:"hue-box",ref:n},Q("div",{class:"hue-bar",ref:i}))),Q("div",{class:"row",style:"width:50%"},Q("div",{class:"col"},Q("div",{class:"input-group"},Q("label",null,"Hue"),Q("input",{type:"text",class:"input",ref:u})),Q("div",{class:"input-group"},Q("label",null,"Saturation"),Q("input",{type:"text",class:"input",ref:d})),Q("div",{class:"input-group"},Q("label",null,"Brightness"),Q("input",{type:"text",class:"input",ref:f}))),Q("div",{class:"col"},Q("div",{class:"input-group"},Q("label",null,"Red"),Q("input",{type:"text",class:"input",ref:h})),Q("div",{class:"input-group"},Q("label",null,"Green"),Q("input",{type:"text",class:"input",ref:p})),Q("div",{class:"input-group"},Q("label",null,"Blue"),Q("input",{type:"text",class:"input",ref:m}))),Q("div",{class:"input-group",style:"position:relative"},Q("label",null,"Hex"),Q("div",{class:"hashtag"},"#"),Q("input",{type:"text",class:"input",ref:l})),Q("div",{class:"input-group",style:"position:relative"},Q("label",null,"Alpha"),Q("input",{type:"text",class:"input",ref:_}))),Q("div",{class:"trackbar-container",ref:y,style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`width:calc(50% - 20px);margin:10px;--accent-color:${h.value},${p.value},${m.value}`,elements:[typeof h<"u"?h:void 0,typeof value<"u"?value:void 0,typeof p<"u"?p:void 0,typeof value<"u"?value:void 0,typeof m<"u"?m:void 0,typeof value<"u"?value:void 0]}},Q("div",{class:"trackbar-background"}),Q("div",{class:"trackbar-foreground"}),Q("div",{class:"alpha-bar",ref:M})),Q("div",{style:"width:50%"}),Q("div",{class:"row",style:"width:100%"},Q("div",{style:"width:50%;padding-right:20px;padding-left:10px;flex:1"},Q(Vc,{color:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>x,elements:[typeof x<"u"?x:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:U=>z(U),elements:[typeof c<"u"?c:void 0,typeof z<"u"?z:void 0,typeof c<"u"?c:void 0]}})),Q("div",{style:"width:50%"},Q(Wc,{set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:U=>z(U),elements:[typeof c<"u"?c:void 0,typeof z<"u"?z:void 0,typeof c<"u"?c:void 0]}})))));const E=Ma(s.r,s.g,s.b);var w=E.s,S=E.v,C=E.h,D=s.a*100,O=!1;function A(){P()}function P(){var U=jc(C,w,S),ee=Xc(U.r,U.g,U.b);return l.value=ee,u.value=(C*360).toFixed(0),d.value=(w*100).toFixed(0),f.value=(S*100).toFixed(0),h.value=U.r,p.value=U.g,m.value=U.b,_.value=D.toFixed(0),t.style.backgroundColor=`hsl(${C*360},100%,50%)`,x={r:U.r,g:U.g,b:U.b,a:D/100},T.$update(),{...U,a:D/100}}function z(U){h.value=U.r.toFixed(0),p.value=U.g.toFixed(0),m.value=U.b.toFixed(0),_.value=(U.a*100).toFixed(0),G()}T.$on("mounted",()=>{P(),k()}),l.$on("input",j),h.$on("input",G),p.$on("input",G),m.$on("input",G),u.$on("input",K),d.$on("input",K),f.$on("input",K),_.$on("input",G);function j(){var U=qc(l.value),ee=Ma(U.r,U.g,U.b);isNaN(ee.h)||isNaN(ee.s)||isNaN(ee.v)||(C=ee.h,w=ee.s,S=ee.v,k(),A())}function K(){C=parseInt(u.value)/360,w=parseInt(d.value)/100,S=parseInt(f.value)/100,!(isNaN(C)||isNaN(w)||isNaN(S))&&(C=Math.max(0,Math.min(1,C)),w=Math.max(0,Math.min(1,w)),S=Math.max(0,Math.min(1,S)),k(),A())}function G(){const U=parseInt(h.value),ee=parseInt(p.value),X=parseInt(m.value),J=parseInt(_.value),ne=Ma(U,ee,X);isNaN(ne.h)||isNaN(ne.s)||isNaN(ne.v)||(C=Math.max(0,Math.min(1,ne.h)),w=Math.max(0,Math.min(1,ne.s)),S=Math.max(0,Math.min(1,ne.v)),D=Math.max(0,Math.min(100,J)),k(),A())}function k(){var U=t.getBoundingClientRect(),ee=n.getBoundingClientRect();const X=y.getBoundingClientRect();o.style.left=w*U.width+"px",o.style.top=(1-S)*U.height+"px",i.style.top=(1-C)*ee.height+"px",M.style.left=D*X.width/100+"px"}t.$on("mousedown",U=>{O=!0,F(U)}),document.addEventListener("mouseup",U=>{O=!1}),document.addEventListener("mousemove",U=>{F(U),B(U)});function F(U){if(O){var ee=t.getBoundingClientRect(),X=U.clientX-ee.left,J=U.clientY-ee.top;X=Math.max(0,Math.min(X,ee.width)),J=Math.max(0,Math.min(J,ee.height)),o.style.left=X+"px",o.style.top=J+"px",w=X/ee.width,S=1-J/ee.height,A()}}var $=!1;n.$on("mousedown",U=>{$=!0,B(U)}),document.addEventListener("mouseup",U=>{$=!1});function B(U){if($){var ee=n.getBoundingClientRect(),X=U.clientY-ee.top;X=Math.max(0,Math.min(X,ee.height)),i.style.top=X+"px",C=1-X/ee.height,t.style.backgroundColor=`hsl(${C*360},100%,50%)`,A()}}let Y=!1;y.$on("mousedown",U=>{Y=!0,V(U)}),document.addEventListener("mouseup",U=>{Y=!1}),document.addEventListener("mousemove",U=>{V(U)});function V(U){if(Y){var ee=y.getBoundingClientRect(),X=U.clientX-ee.left;X=Math.max(0,Math.min(X,ee.width)),M.style.left=X+"px",D=X/ee.width*100,A()}}sa(T,()=>{const U=P();e({r:U.r,g:U.g,b:U.b,a:U.a})})}function jc(s,e,t){var n,i,o,l,u,d,f,h;switch(arguments.length===1&&(e=s.s,t=s.v,s=s.h),l=Math.floor(s*6),u=s*6-l,d=t*(1-e),f=t*(1-u*e),h=t*(1-(1-u)*e),l%6){case 0:n=t,i=h,o=d;break;case 1:n=f,i=t,o=d;break;case 2:n=d,i=t,o=h;break;case 3:n=d,i=f,o=t;break;case 4:n=h,i=d,o=t;break;case 5:n=t,i=d,o=f;break}return{r:Math.round(n*255),g:Math.round(i*255),b:Math.round(o*255)}}function Ma(s,e,t){arguments.length===1&&(e=s.g,t=s.b,s=s.r);var n=Math.max(s,e,t),i=Math.min(s,e,t),o=n-i,l,u=n===0?0:o/n,d=n/255;switch(n){case i:l=0;break;case s:l=e-t+o*(e<t?6:0),l/=6*o;break;case e:l=t-s+o*2,l/=6*o;break;case t:l=s-e+o*4,l/=6*o;break}return{h:l,s:u,v:d}}function Sa(s){var e=s.toString(16);return e.length==1?"0"+e:e}function qc(s){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}function Xc(s,e,t){return Sa(s)+Sa(e)+Sa(t)}function Yc({$get:s,$set:e}){s===void 0&&(s=()=>[{r:0,g:0,b:0,a:0},{r:255,g:255,b:255,a:1}]),e===void 0&&(e=(f,h)=>{});var[t,n]=s();const i=Ge();var o=Q("div",{class:"color-box-container"},Q("div",{class:"color-box",ref:i},Q("div",{class:"color-box-background color-box-item double-border","on:click":u},Q("div",{class:"color-box-grid"}),Q("div",{class:"color-box-color",style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`background-color:rgba(${t.r},${t.g},${t.b},${t.a})`,elements:[typeof t<"u"?t:void 0,typeof r<"u"?r:void 0,typeof t<"u"?t:void 0,typeof g<"u"?g:void 0,typeof t<"u"?t:void 0,typeof b<"u"?b:void 0,typeof t<"u"?t:void 0,typeof a<"u"?a:void 0]}})),Q("div",{class:"color-box-foreground color-box-item double-border","on:click":d},Q("div",{class:"color-box-grid"}),Q("div",{class:"color-box-color",style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`background-color:rgba(${n.r},${n.g},${n.b},${n.a})`,elements:[typeof n<"u"?n:void 0,typeof r<"u"?r:void 0,typeof n<"u"?n:void 0,typeof g<"u"?g:void 0,typeof n<"u"?n:void 0,typeof b<"u"?b:void 0,typeof n<"u"?n:void 0,typeof a<"u"?a:void 0]}}))),Q("i",{class:"fa-solid fa-arrows-rotate icon swap-icon","on:click":l}));o.$on("update",f=>{var[h,p]=s();t=h,n=p});function l(){var f=t;t=n,n=f,e(t,n),i.$update()}function u(){Ts(t,f=>{t=f,e(t,n),o.$update()})}function d(){Ts(n,f=>{n=f,e(t,n),o.$update()})}return o}function $c({$get:s,set:e}){s===void 0&&(s=()=>[255,255,255,1],console.error("DropDownMenu: get is undefined")),e===void 0&&(e=()=>{},console.error("DropDownMenu: set is undefined"));const t=Ge(),n=Ge();var i=Q("div",{class:"row"},Q("button",{class:"button",style:"margin:10px",ref:t},"Compute"),Q("div",{class:"color-palette-container "},Q("div",{class:"color-palette"},Q("div",{class:"color-palette-item-container",ref:n}))));return t.$on("click",o=>{Z.scene_colors={},n.innerHTML="";for(const l of Z.voxel.getVoxels()){const u=l.color,d=u.r+","+u.g+","+u.b;if(Z.scene_colors[d]===void 0){Z.scene_colors[d]=[];const f=Q("div",{class:"color-item double-border",style:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`background-color:rgba(${u.r},${u.g},${u.b},${1})`,elements:[typeof u<"u"?u:void 0,typeof r<"u"?r:void 0,typeof u<"u"?u:void 0,typeof g<"u"?g:void 0,typeof u<"u"?u:void 0,typeof b<"u"?b:void 0]}});f.$parent(n),f.$on("click",h=>{const p={...u};Ts(p,m=>{for(const y of Z.scene_colors[d])y.r=m.r,y.g=m.g,y.b=m.b;u.r=m.r,u.g=m.g,u.b=m.b,f.$update(),Z.voxel.forceUpdate(),Z.pushHistory()})})}Z.scene_colors[d].push(u)}}),i}function Zc(s){function e(){requestAnimationFrame(e),s()}e()}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hs="150",gi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},vi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kc=0,to=1,Qc=2,Bl=1,Gl=2,rr=3,Gn=0,qt=1,Cn=2,Ct=0,ki=1,no=2,io=3,ro=4,Hl=5,Un=100,Jc=101,eu=102,ao=103,so=104,Es=200,tu=201,nu=202,iu=203,Vl=204,Wl=205,jl=206,ru=207,ql=208,au=209,su=210,ou=0,lu=1,cu=2,As=3,uu=4,du=5,fu=6,hu=7,Xl=0,pu=1,mu=2,Dn=0,Yl=1,Cs=2,gu=3,vu=4,_u=5,$l=300,Bi=301,Gi=302,Ds=303,Ps=304,oa=306,ci=1e3,Ot=1001,Ls=1002,qe=1003,oo=1004,wa=1005,Qt=1006,xu=1007,ur=1008,ui=1009,yu=1010,bu=1011,Zl=1012,Mu=1013,ii=1014,jt=1015,dr=1016,Su=1017,wu=1018,si=1020,Tu=1021,Dt=1023,Kl=1024,Eu=1025,oi=1026,di=1027,Ql=1028,Au=1029,Cu=1030,Du=1031,Pu=1033,Ta=33776,Ea=33777,Aa=33778,Ca=33779,lo=35840,co=35841,uo=35842,fo=35843,Lu=36196,ho=37492,po=37496,mo=37808,go=37809,vo=37810,_o=37811,xo=37812,yo=37813,bo=37814,Mo=37815,So=37816,wo=37817,To=37818,Eo=37819,Ao=37820,Co=37821,Da=36492,Ru=36283,Do=36284,Po=36285,Lo=36286,pn=3e3,rt=3001,Iu=3200,zu=3201,Vs=0,Nu=1,dn="srgb",fr="srgb-linear",Jl="display-p3",Pa=7680,Fu=519,Ro=35044,Io="300 es",Rs=1035;class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let o=0,l=i.length;o<l;o++)i[o].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zo=1234567;const lr=Math.PI/180,ra=180/Math.PI;function Vi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Et[s&255]+Et[s>>8&255]+Et[s>>16&255]+Et[s>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]).toLowerCase()}function Ft(s,e,t){return Math.max(e,Math.min(t,s))}function Ws(s,e){return(s%e+e)%e}function Ou(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function ku(s,e,t){return s!==e?(t-s)/(e-s):0}function cr(s,e,t){return(1-t)*s+t*e}function Uu(s,e,t,n){return cr(s,e,1-Math.exp(-t*n))}function Bu(s,e=1){return e-Math.abs(Ws(s,e*2)-e)}function Gu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Hu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Vu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Wu(s,e){return s+Math.random()*(e-s)}function ju(s){return s*(.5-Math.random())}function qu(s){s!==void 0&&(zo=s);let e=zo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xu(s){return s*lr}function Yu(s){return s*ra}function Is(s){return(s&s-1)===0&&s!==0}function $u(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ec(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Zu(s,e,t,n,i){const o=Math.cos,l=Math.sin,u=o(t/2),d=l(t/2),f=o((e+n)/2),h=l((e+n)/2),p=o((e-n)/2),m=l((e-n)/2),y=o((n-e)/2),M=l((n-e)/2);switch(i){case"XYX":s.set(u*h,d*p,d*m,u*f);break;case"YZY":s.set(d*m,u*h,d*p,u*f);break;case"ZXZ":s.set(d*p,d*m,u*h,u*f);break;case"XZX":s.set(u*h,d*M,d*y,u*f);break;case"YXY":s.set(d*y,u*h,d*M,u*f);break;case"ZYZ":s.set(d*M,d*y,u*h,u*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ar(s,e){switch(e.constructor){case Float32Array:return s;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ut(s,e){switch(e.constructor){case Float32Array:return s;case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ku={DEG2RAD:lr,RAD2DEG:ra,generateUUID:Vi,clamp:Ft,euclideanModulo:Ws,mapLinear:Ou,inverseLerp:ku,lerp:cr,damp:Uu,pingpong:Bu,smoothstep:Gu,smootherstep:Hu,randInt:Vu,randFloat:Wu,randFloatSpread:ju,seededRandom:qu,degToRad:Xu,radToDeg:Yu,isPowerOfTwo:Is,ceilPowerOfTwo:$u,floorPowerOfTwo:ec,setQuaternionFromProperEuler:Zu,normalize:Ut,denormalize:ar};class Ne{constructor(e=0,t=0){Ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,l=this.y-e.y;return this.x=o*n-l*i+e.x,this.y=o*i+l*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,i,o,l,u,d,f){const h=this.elements;return h[0]=e,h[1]=i,h[2]=u,h[3]=t,h[4]=o,h[5]=d,h[6]=n,h[7]=l,h[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,l=n[0],u=n[3],d=n[6],f=n[1],h=n[4],p=n[7],m=n[2],y=n[5],M=n[8],_=i[0],x=i[3],T=i[6],E=i[1],w=i[4],S=i[7],C=i[2],D=i[5],O=i[8];return o[0]=l*_+u*E+d*C,o[3]=l*x+u*w+d*D,o[6]=l*T+u*S+d*O,o[1]=f*_+h*E+p*C,o[4]=f*x+h*w+p*D,o[7]=f*T+h*S+p*O,o[2]=m*_+y*E+M*C,o[5]=m*x+y*w+M*D,o[8]=m*T+y*S+M*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],l=e[4],u=e[5],d=e[6],f=e[7],h=e[8];return t*l*h-t*u*f-n*o*h+n*u*d+i*o*f-i*l*d}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],l=e[4],u=e[5],d=e[6],f=e[7],h=e[8],p=h*l-u*f,m=u*d-h*o,y=f*o-l*d,M=t*p+n*m+i*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/M;return e[0]=p*_,e[1]=(i*f-h*n)*_,e[2]=(u*n-i*l)*_,e[3]=m*_,e[4]=(h*t-i*d)*_,e[5]=(i*o-u*t)*_,e[6]=y*_,e[7]=(n*d-f*t)*_,e[8]=(l*t-n*o)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,l,u){const d=Math.cos(o),f=Math.sin(o);return this.set(n*d,n*f,-n*(d*l+f*u)+l+e,-i*f,i*d,-i*(-f*l+d*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(La.makeScale(e,t)),this}rotate(e){return this.premultiply(La.makeRotation(-e)),this}translate(e,t){return this.premultiply(La.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const La=new kt;function tc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function hr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}class fi{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,l,u){let d=n[i+0],f=n[i+1],h=n[i+2],p=n[i+3];const m=o[l+0],y=o[l+1],M=o[l+2],_=o[l+3];if(u===0){e[t+0]=d,e[t+1]=f,e[t+2]=h,e[t+3]=p;return}if(u===1){e[t+0]=m,e[t+1]=y,e[t+2]=M,e[t+3]=_;return}if(p!==_||d!==m||f!==y||h!==M){let x=1-u;const T=d*m+f*y+h*M+p*_,E=T>=0?1:-1,w=1-T*T;if(w>Number.EPSILON){const C=Math.sqrt(w),D=Math.atan2(C,T*E);x=Math.sin(x*D)/C,u=Math.sin(u*D)/C}const S=u*E;if(d=d*x+m*S,f=f*x+y*S,h=h*x+M*S,p=p*x+_*S,x===1-u){const C=1/Math.sqrt(d*d+f*f+h*h+p*p);d*=C,f*=C,h*=C,p*=C}}e[t]=d,e[t+1]=f,e[t+2]=h,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,i,o,l){const u=n[i],d=n[i+1],f=n[i+2],h=n[i+3],p=o[l],m=o[l+1],y=o[l+2],M=o[l+3];return e[t]=u*M+h*p+d*y-f*m,e[t+1]=d*M+h*m+f*p-u*y,e[t+2]=f*M+h*y+u*m-d*p,e[t+3]=h*M-u*p-d*m-f*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,o=e._z,l=e._order,u=Math.cos,d=Math.sin,f=u(n/2),h=u(i/2),p=u(o/2),m=d(n/2),y=d(i/2),M=d(o/2);switch(l){case"XYZ":this._x=m*h*p+f*y*M,this._y=f*y*p-m*h*M,this._z=f*h*M+m*y*p,this._w=f*h*p-m*y*M;break;case"YXZ":this._x=m*h*p+f*y*M,this._y=f*y*p-m*h*M,this._z=f*h*M-m*y*p,this._w=f*h*p+m*y*M;break;case"ZXY":this._x=m*h*p-f*y*M,this._y=f*y*p+m*h*M,this._z=f*h*M+m*y*p,this._w=f*h*p-m*y*M;break;case"ZYX":this._x=m*h*p-f*y*M,this._y=f*y*p+m*h*M,this._z=f*h*M-m*y*p,this._w=f*h*p+m*y*M;break;case"YZX":this._x=m*h*p+f*y*M,this._y=f*y*p+m*h*M,this._z=f*h*M-m*y*p,this._w=f*h*p-m*y*M;break;case"XZY":this._x=m*h*p-f*y*M,this._y=f*y*p-m*h*M,this._z=f*h*M+m*y*p,this._w=f*h*p+m*y*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],o=t[8],l=t[1],u=t[5],d=t[9],f=t[2],h=t[6],p=t[10],m=n+u+p;if(m>0){const y=.5/Math.sqrt(m+1);this._w=.25/y,this._x=(h-d)*y,this._y=(o-f)*y,this._z=(l-i)*y}else if(n>u&&n>p){const y=2*Math.sqrt(1+n-u-p);this._w=(h-d)/y,this._x=.25*y,this._y=(i+l)/y,this._z=(o+f)/y}else if(u>p){const y=2*Math.sqrt(1+u-n-p);this._w=(o-f)/y,this._x=(i+l)/y,this._y=.25*y,this._z=(d+h)/y}else{const y=2*Math.sqrt(1+p-n-u);this._w=(l-i)/y,this._x=(o+f)/y,this._y=(d+h)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,o=e._z,l=e._w,u=t._x,d=t._y,f=t._z,h=t._w;return this._x=n*h+l*u+i*f-o*d,this._y=i*h+l*d+o*u-n*f,this._z=o*h+l*f+n*d-i*u,this._w=l*h-n*u-i*d-o*f,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,o=this._z,l=this._w;let u=l*e._w+n*e._x+i*e._y+o*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=l,this._x=n,this._y=i,this._z=o,this;const d=1-u*u;if(d<=Number.EPSILON){const y=1-t;return this._w=y*l+t*this._w,this._x=y*n+t*this._x,this._y=y*i+t*this._y,this._z=y*o+t*this._z,this.normalize(),this._onChangeCallback(),this}const f=Math.sqrt(d),h=Math.atan2(f,u),p=Math.sin((1-t)*h)/f,m=Math.sin(t*h)/f;return this._w=l*p+this._w*m,this._x=n*p+this._x*m,this._y=i*p+this._y*m,this._z=o*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(o),n*Math.cos(o),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,n=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(No.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(No.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=e.elements,l=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*l,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*l,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*l,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,o=e.x,l=e.y,u=e.z,d=e.w,f=d*t+l*i-u*n,h=d*n+u*t-o*i,p=d*i+o*n-l*t,m=-o*t-l*n-u*i;return this.x=f*d+m*-o+h*-u-p*-l,this.y=h*d+m*-l+p*-o-f*-u,this.z=p*d+m*-u+f*-l-h*-o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,o=e.z,l=t.x,u=t.y,d=t.z;return this.x=i*d-o*u,this.y=o*l-n*d,this.z=n*u-i*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ra.copy(this).projectOnVector(e),this.sub(Ra)}reflect(e){return this.sub(Ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ra=new q,No=new fi;function Ui(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ia(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Qu=new kt().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Ju=new kt().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]),Bn=new q;function ed(s){return s.convertSRGBToLinear(),Bn.set(s.r,s.g,s.b).applyMatrix3(Ju),s.setRGB(Bn.x,Bn.y,Bn.z)}function td(s){return Bn.set(s.r,s.g,s.b).applyMatrix3(Qu),s.setRGB(Bn.x,Bn.y,Bn.z).convertLinearToSRGB()}const nd={[fr]:s=>s,[dn]:s=>s.convertSRGBToLinear(),[Jl]:ed},id={[fr]:s=>s,[dn]:s=>s.convertLinearToSRGB(),[Jl]:td},zt={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(s){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!s},get workingColorSpace(){return fr},set workingColorSpace(s){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=nd[e],i=id[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)}};let _i;class nc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_i===void 0&&(_i=hr("canvas")),_i.width=e.width,_i.height=e.height;const n=_i.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=_i}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let l=0;l<o.length;l++)o[l]=Ui(o[l]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ui(t[n]/255)*255):t[n]=Ui(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class ic{constructor(e=null){this.isSource=!0,this.uuid=Vi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let l=0,u=i.length;l<u;l++)i[l].isDataTexture?o.push(za(i[l].image)):o.push(za(i[l]))}else o=za(i);n.url=o}return t||(e.images[this.uuid]=n),n}}function za(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?nc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rd=0;class St extends pi{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=Ot,i=Ot,o=Qt,l=ur,u=Dt,d=ui,f=St.DEFAULT_ANISOTROPY,h=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Vi(),this.name="",this.source=new ic(e),this.mipmaps=[],this.mapping=t,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=l,this.anisotropy=f,this.format=u,this.internalFormat=null,this.type=d,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ci:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case Ls:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ci:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case Ls:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=$l;St.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,n=0,i=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=this.w,l=e.elements;return this.x=l[0]*t+l[4]*n+l[8]*i+l[12]*o,this.y=l[1]*t+l[5]*n+l[9]*i+l[13]*o,this.z=l[2]*t+l[6]*n+l[10]*i+l[14]*o,this.w=l[3]*t+l[7]*n+l[11]*i+l[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o;const d=e.elements,f=d[0],h=d[4],p=d[8],m=d[1],y=d[5],M=d[9],_=d[2],x=d[6],T=d[10];if(Math.abs(h-m)<.01&&Math.abs(p-_)<.01&&Math.abs(M-x)<.01){if(Math.abs(h+m)<.1&&Math.abs(p+_)<.1&&Math.abs(M+x)<.1&&Math.abs(f+y+T-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(f+1)/2,S=(y+1)/2,C=(T+1)/2,D=(h+m)/4,O=(p+_)/4,A=(M+x)/4;return w>S&&w>C?w<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(w),i=D/n,o=O/n):S>C?S<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(S),n=D/i,o=A/i):C<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(C),n=O/o,i=A/o),this.set(n,i,o,t),this}let E=Math.sqrt((x-M)*(x-M)+(p-_)*(p-_)+(m-h)*(m-h));return Math.abs(E)<.001&&(E=1),this.x=(x-M)/E,this.y=(p-_)/E,this.z=(m-h)/E,this.w=Math.acos((f+y+T-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bt extends pi{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const i={width:e,height:t,depth:1};this.texture=new St(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Qt,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ic(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rc extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=qe,this.minFilter=qe,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ad extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=qe,this.minFilter=qe,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vr{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,n=1/0,i=1/0,o=-1/0,l=-1/0,u=-1/0;for(let d=0,f=e.length;d<f;d+=3){const h=e[d],p=e[d+1],m=e[d+2];h<t&&(t=h),p<n&&(n=p),m<i&&(i=m),h>o&&(o=h),p>l&&(l=p),m>u&&(u=m)}return this.min.set(t,n,i),this.max.set(o,l,u),this}setFromBufferAttribute(e){let t=1/0,n=1/0,i=1/0,o=-1/0,l=-1/0,u=-1/0;for(let d=0,f=e.count;d<f;d++){const h=e.getX(d),p=e.getY(d),m=e.getZ(d);h<t&&(t=h),p<n&&(n=p),m<i&&(i=m),h>o&&(o=h),p>l&&(l=p),m>u&&(u=m)}return this.min.set(t,n,i),this.max.set(o,l,u),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0)if(t&&n.attributes!=null&&n.attributes.position!==void 0){const o=n.attributes.position;for(let l=0,u=o.count;l<u;l++)jn.fromBufferAttribute(o,l).applyMatrix4(e.matrixWorld),this.expandByPoint(jn)}else n.boundingBox===null&&n.computeBoundingBox(),Na.copy(n.boundingBox),Na.applyMatrix4(e.matrixWorld),this.union(Na);const i=e.children;for(let o=0,l=i.length;o<l;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qi),br.subVectors(this.max,qi),xi.subVectors(e.a,qi),yi.subVectors(e.b,qi),bi.subVectors(e.c,qi),Pn.subVectors(yi,xi),Ln.subVectors(bi,yi),qn.subVectors(xi,bi);let t=[0,-Pn.z,Pn.y,0,-Ln.z,Ln.y,0,-qn.z,qn.y,Pn.z,0,-Pn.x,Ln.z,0,-Ln.x,qn.z,0,-qn.x,-Pn.y,Pn.x,0,-Ln.y,Ln.x,0,-qn.y,qn.x,0];return!Fa(t,xi,yi,bi,br)||(t=[1,0,0,0,1,0,0,0,1],!Fa(t,xi,yi,bi,br))?!1:(Mr.crossVectors(Pn,Ln),t=[Mr.x,Mr.y,Mr.z],Fa(t,xi,yi,bi,br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new q,new q,new q,new q,new q,new q,new q,new q],jn=new q,Na=new vr,xi=new q,yi=new q,bi=new q,Pn=new q,Ln=new q,qn=new q,qi=new q,br=new q,Mr=new q,Xn=new q;function Fa(s,e,t,n,i){for(let o=0,l=s.length-3;o<=l;o+=3){Xn.fromArray(s,o);const u=i.x*Math.abs(Xn.x)+i.y*Math.abs(Xn.y)+i.z*Math.abs(Xn.z),d=e.dot(Xn),f=t.dot(Xn),h=n.dot(Xn);if(Math.max(-Math.max(d,f,h),Math.min(d,f,h))>u)return!1}return!0}const sd=new vr,Xi=new q,Oa=new q;class la{constructor(e=new q,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):sd.setFromPoints(e).getCenter(n);let i=0;for(let o=0,l=e.length;o<l;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xi.subVectors(e,this.center);const t=Xi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Xi,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xi.copy(e.center).add(Oa)),this.expandByPoint(Xi.copy(e.center).sub(Oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new q,ka=new q,Sr=new q,Rn=new q,Ua=new q,wr=new q,Ba=new q;class js{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ka.copy(e).add(t).multiplyScalar(.5),Sr.copy(t).sub(e).normalize(),Rn.copy(this.origin).sub(ka);const o=e.distanceTo(t)*.5,l=-this.direction.dot(Sr),u=Rn.dot(this.direction),d=-Rn.dot(Sr),f=Rn.lengthSq(),h=Math.abs(1-l*l);let p,m,y,M;if(h>0)if(p=l*d-u,m=l*u-d,M=o*h,p>=0)if(m>=-M)if(m<=M){const _=1/h;p*=_,m*=_,y=p*(p+l*m+2*u)+m*(l*p+m+2*d)+f}else m=o,p=Math.max(0,-(l*m+u)),y=-p*p+m*(m+2*d)+f;else m=-o,p=Math.max(0,-(l*m+u)),y=-p*p+m*(m+2*d)+f;else m<=-M?(p=Math.max(0,-(-l*o+u)),m=p>0?-o:Math.min(Math.max(-o,-d),o),y=-p*p+m*(m+2*d)+f):m<=M?(p=0,m=Math.min(Math.max(-o,-d),o),y=m*(m+2*d)+f):(p=Math.max(0,-(l*o+u)),m=p>0?o:Math.min(Math.max(-o,-d),o),y=-p*p+m*(m+2*d)+f);else m=l>0?-o:o,p=Math.max(0,-(l*m+u)),y=-p*p+m*(m+2*d)+f;return n&&n.copy(this.origin).addScaledVector(this.direction,p),i&&i.copy(ka).addScaledVector(Sr,m),y}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),i=vn.dot(vn)-n*n,o=e.radius*e.radius;if(i>o)return null;const l=Math.sqrt(o-i),u=n-l,d=n+l;return d<0?null:u<0?this.at(d,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,l,u,d;const f=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,m=this.origin;return f>=0?(n=(e.min.x-m.x)*f,i=(e.max.x-m.x)*f):(n=(e.max.x-m.x)*f,i=(e.min.x-m.x)*f),h>=0?(o=(e.min.y-m.y)*h,l=(e.max.y-m.y)*h):(o=(e.max.y-m.y)*h,l=(e.min.y-m.y)*h),n>l||o>i||((o>n||isNaN(n))&&(n=o),(l<i||isNaN(i))&&(i=l),p>=0?(u=(e.min.z-m.z)*p,d=(e.max.z-m.z)*p):(u=(e.max.z-m.z)*p,d=(e.min.z-m.z)*p),n>d||u>i)||((u>n||n!==n)&&(n=u),(d<i||i!==i)&&(i=d),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,i,o){Ua.subVectors(t,e),wr.subVectors(n,e),Ba.crossVectors(Ua,wr);let l=this.direction.dot(Ba),u;if(l>0){if(i)return null;u=1}else if(l<0)u=-1,l=-l;else return null;Rn.subVectors(this.origin,e);const d=u*this.direction.dot(wr.crossVectors(Rn,wr));if(d<0)return null;const f=u*this.direction.dot(Ua.cross(Rn));if(f<0||d+f>l)return null;const h=-u*Rn.dot(Ba);return h<0?null:this.at(h/l,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,i,o,l,u,d,f,h,p,m,y,M,_,x){const T=this.elements;return T[0]=e,T[4]=t,T[8]=n,T[12]=i,T[1]=o,T[5]=l,T[9]=u,T[13]=d,T[2]=f,T[6]=h,T[10]=p,T[14]=m,T[3]=y,T[7]=M,T[11]=_,T[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Mi.setFromMatrixColumn(e,0).length(),o=1/Mi.setFromMatrixColumn(e,1).length(),l=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*l,t[9]=n[9]*l,t[10]=n[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,o=e.z,l=Math.cos(n),u=Math.sin(n),d=Math.cos(i),f=Math.sin(i),h=Math.cos(o),p=Math.sin(o);if(e.order==="XYZ"){const m=l*h,y=l*p,M=u*h,_=u*p;t[0]=d*h,t[4]=-d*p,t[8]=f,t[1]=y+M*f,t[5]=m-_*f,t[9]=-u*d,t[2]=_-m*f,t[6]=M+y*f,t[10]=l*d}else if(e.order==="YXZ"){const m=d*h,y=d*p,M=f*h,_=f*p;t[0]=m+_*u,t[4]=M*u-y,t[8]=l*f,t[1]=l*p,t[5]=l*h,t[9]=-u,t[2]=y*u-M,t[6]=_+m*u,t[10]=l*d}else if(e.order==="ZXY"){const m=d*h,y=d*p,M=f*h,_=f*p;t[0]=m-_*u,t[4]=-l*p,t[8]=M+y*u,t[1]=y+M*u,t[5]=l*h,t[9]=_-m*u,t[2]=-l*f,t[6]=u,t[10]=l*d}else if(e.order==="ZYX"){const m=l*h,y=l*p,M=u*h,_=u*p;t[0]=d*h,t[4]=M*f-y,t[8]=m*f+_,t[1]=d*p,t[5]=_*f+m,t[9]=y*f-M,t[2]=-f,t[6]=u*d,t[10]=l*d}else if(e.order==="YZX"){const m=l*d,y=l*f,M=u*d,_=u*f;t[0]=d*h,t[4]=_-m*p,t[8]=M*p+y,t[1]=p,t[5]=l*h,t[9]=-u*h,t[2]=-f*h,t[6]=y*p+M,t[10]=m-_*p}else if(e.order==="XZY"){const m=l*d,y=l*f,M=u*d,_=u*f;t[0]=d*h,t[4]=-p,t[8]=f*h,t[1]=m*p+_,t[5]=l*h,t[9]=y*p-M,t[2]=M*p-y,t[6]=u*h,t[10]=_*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(od,e,ld)}lookAt(e,t,n){const i=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),In.crossVectors(n,Vt),In.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),In.crossVectors(n,Vt)),In.normalize(),Tr.crossVectors(Vt,In),i[0]=In.x,i[4]=Tr.x,i[8]=Vt.x,i[1]=In.y,i[5]=Tr.y,i[9]=Vt.y,i[2]=In.z,i[6]=Tr.z,i[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,l=n[0],u=n[4],d=n[8],f=n[12],h=n[1],p=n[5],m=n[9],y=n[13],M=n[2],_=n[6],x=n[10],T=n[14],E=n[3],w=n[7],S=n[11],C=n[15],D=i[0],O=i[4],A=i[8],P=i[12],z=i[1],j=i[5],K=i[9],G=i[13],k=i[2],F=i[6],$=i[10],B=i[14],Y=i[3],V=i[7],U=i[11],ee=i[15];return o[0]=l*D+u*z+d*k+f*Y,o[4]=l*O+u*j+d*F+f*V,o[8]=l*A+u*K+d*$+f*U,o[12]=l*P+u*G+d*B+f*ee,o[1]=h*D+p*z+m*k+y*Y,o[5]=h*O+p*j+m*F+y*V,o[9]=h*A+p*K+m*$+y*U,o[13]=h*P+p*G+m*B+y*ee,o[2]=M*D+_*z+x*k+T*Y,o[6]=M*O+_*j+x*F+T*V,o[10]=M*A+_*K+x*$+T*U,o[14]=M*P+_*G+x*B+T*ee,o[3]=E*D+w*z+S*k+C*Y,o[7]=E*O+w*j+S*F+C*V,o[11]=E*A+w*K+S*$+C*U,o[15]=E*P+w*G+S*B+C*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],l=e[1],u=e[5],d=e[9],f=e[13],h=e[2],p=e[6],m=e[10],y=e[14],M=e[3],_=e[7],x=e[11],T=e[15];return M*(+o*d*p-i*f*p-o*u*m+n*f*m+i*u*y-n*d*y)+_*(+t*d*y-t*f*m+o*l*m-i*l*y+i*f*h-o*d*h)+x*(+t*f*p-t*u*y-o*l*p+n*l*y+o*u*h-n*f*h)+T*(-i*u*h-t*d*p+t*u*m+i*l*p-n*l*m+n*d*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],l=e[4],u=e[5],d=e[6],f=e[7],h=e[8],p=e[9],m=e[10],y=e[11],M=e[12],_=e[13],x=e[14],T=e[15],E=p*x*f-_*m*f+_*d*y-u*x*y-p*d*T+u*m*T,w=M*m*f-h*x*f-M*d*y+l*x*y+h*d*T-l*m*T,S=h*_*f-M*p*f+M*u*y-l*_*y-h*u*T+l*p*T,C=M*p*d-h*_*d-M*u*m+l*_*m+h*u*x-l*p*x,D=t*E+n*w+i*S+o*C;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/D;return e[0]=E*O,e[1]=(_*m*o-p*x*o-_*i*y+n*x*y+p*i*T-n*m*T)*O,e[2]=(u*x*o-_*d*o+_*i*f-n*x*f-u*i*T+n*d*T)*O,e[3]=(p*d*o-u*m*o-p*i*f+n*m*f+u*i*y-n*d*y)*O,e[4]=w*O,e[5]=(h*x*o-M*m*o+M*i*y-t*x*y-h*i*T+t*m*T)*O,e[6]=(M*d*o-l*x*o-M*i*f+t*x*f+l*i*T-t*d*T)*O,e[7]=(l*m*o-h*d*o+h*i*f-t*m*f-l*i*y+t*d*y)*O,e[8]=S*O,e[9]=(M*p*o-h*_*o-M*n*y+t*_*y+h*n*T-t*p*T)*O,e[10]=(l*_*o-M*u*o+M*n*f-t*_*f-l*n*T+t*u*T)*O,e[11]=(h*u*o-l*p*o-h*n*f+t*p*f+l*n*y-t*u*y)*O,e[12]=C*O,e[13]=(h*_*i-M*p*i+M*n*m-t*_*m-h*n*x+t*p*x)*O,e[14]=(M*u*i-l*_*i-M*n*d+t*_*d+l*n*x-t*u*x)*O,e[15]=(l*p*i-h*u*i+h*n*d-t*p*d-l*n*m+t*u*m)*O,this}scale(e){const t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),o=1-n,l=e.x,u=e.y,d=e.z,f=o*l,h=o*u;return this.set(f*l+n,f*u-i*d,f*d+i*u,0,f*u+i*d,h*u+n,h*d-i*l,0,f*d-i*u,h*d+i*l,o*d*d+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,l){return this.set(1,n,o,0,e,1,l,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,o=t._x,l=t._y,u=t._z,d=t._w,f=o+o,h=l+l,p=u+u,m=o*f,y=o*h,M=o*p,_=l*h,x=l*p,T=u*p,E=d*f,w=d*h,S=d*p,C=n.x,D=n.y,O=n.z;return i[0]=(1-(_+T))*C,i[1]=(y+S)*C,i[2]=(M-w)*C,i[3]=0,i[4]=(y-S)*D,i[5]=(1-(m+T))*D,i[6]=(x+E)*D,i[7]=0,i[8]=(M+w)*O,i[9]=(x-E)*O,i[10]=(1-(m+_))*O,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let o=Mi.set(i[0],i[1],i[2]).length();const l=Mi.set(i[4],i[5],i[6]).length(),u=Mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],tn.copy(this);const f=1/o,h=1/l,p=1/u;return tn.elements[0]*=f,tn.elements[1]*=f,tn.elements[2]*=f,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=p,tn.elements[9]*=p,tn.elements[10]*=p,t.setFromRotationMatrix(tn),n.x=o,n.y=l,n.z=u,this}makePerspective(e,t,n,i,o,l){const u=this.elements,d=2*o/(t-e),f=2*o/(n-i),h=(t+e)/(t-e),p=(n+i)/(n-i),m=-(l+o)/(l-o),y=-2*l*o/(l-o);return u[0]=d,u[4]=0,u[8]=h,u[12]=0,u[1]=0,u[5]=f,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=y,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,n,i,o,l){const u=this.elements,d=1/(t-e),f=1/(n-i),h=1/(l-o),p=(t+e)*d,m=(n+i)*f,y=(l+o)*h;return u[0]=2*d,u[4]=0,u[8]=0,u[12]=-p,u[1]=0,u[5]=2*f,u[9]=0,u[13]=-m,u[2]=0,u[6]=0,u[10]=-2*h,u[14]=-y,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new q,tn=new lt,od=new q(0,0,0),ld=new q(1,1,1),In=new q,Tr=new q,Vt=new q,Fo=new lt,Oo=new fi;class ca{constructor(e=0,t=0,n=0,i=ca.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,o=i[0],l=i[4],u=i[8],d=i[1],f=i[5],h=i[9],p=i[2],m=i[6],y=i[10];switch(t){case"XYZ":this._y=Math.asin(Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-h,y),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(m,f),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(u,y),this._z=Math.atan2(d,f)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,y),this._z=Math.atan2(-l,f)):(this._y=0,this._z=Math.atan2(d,o));break;case"ZYX":this._y=Math.asin(-Ft(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,y),this._z=Math.atan2(d,o)):(this._x=0,this._z=Math.atan2(-l,f));break;case"YZX":this._z=Math.asin(Ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-h,f),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(u,y));break;case"XZY":this._z=Math.asin(-Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(m,f),this._y=Math.atan2(u,o)):(this._x=Math.atan2(-h,y),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ca.DEFAULT_ORDER="XYZ";class qs{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cd=0;const ko=new q,Si=new fi,_n=new lt,Er=new q,Yi=new q,ud=new q,dd=new fi,Uo=new q(1,0,0),Bo=new q(0,1,0),Go=new q(0,0,1),fd={type:"added"},Ho={type:"removed"};class Tt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Tt.DEFAULT_UP.clone();const e=new q,t=new ca,n=new fi,i=new q(1,1,1);function o(){n.setFromEuler(t,!1)}function l(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new lt},normalMatrix:{value:new kt}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=Tt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new qs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(Uo,e)}rotateY(e){return this.rotateOnAxis(Bo,e)}rotateZ(e){return this.rotateOnAxis(Go,e)}translateOnAxis(e,t){return ko.copy(e).applyQuaternion(this.quaternion),this.position.add(ko.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Uo,e)}translateY(e){return this.translateOnAxis(Bo,e)}translateZ(e){return this.translateOnAxis(Go,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Er.copy(e):Er.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(Yi,Er,this.up):_n.lookAt(Er,Yi,this.up),this.quaternion.setFromRotationMatrix(_n),i&&(_n.extractRotation(i.matrixWorld),Si.setFromRotationMatrix(_n),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(fd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ho)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Ho)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const l=this.children[n].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,o=this.children.length;i<o;i++){const l=this.children[i].getObjectsByProperty(e,t);l.length>0&&(n=n.concat(l))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,ud),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,dd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let o=0,l=i.length;o<l;o++){const u=i[o];u.matrixWorldAutoUpdate===!0&&u.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function o(u,d){return u[d.uuid]===void 0&&(u[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const d=u.shapes;if(Array.isArray(d))for(let f=0,h=d.length;f<h;f++){const p=d[f];o(e.shapes,p)}else o(e.shapes,d)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let d=0,f=this.material.length;d<f;d++)u.push(o(e.materials,this.material[d]));i.material=u}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let u=0;u<this.children.length;u++)i.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let u=0;u<this.animations.length;u++){const d=this.animations[u];i.animations.push(o(e.animations,d))}}if(t){const u=l(e.geometries),d=l(e.materials),f=l(e.textures),h=l(e.images),p=l(e.shapes),m=l(e.skeletons),y=l(e.animations),M=l(e.nodes);u.length>0&&(n.geometries=u),d.length>0&&(n.materials=d),f.length>0&&(n.textures=f),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),y.length>0&&(n.animations=y),M.length>0&&(n.nodes=M)}return n.object=i,n;function l(u){const d=[];for(const f in u){const h=u[f];delete h.metadata,d.push(h)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Tt.DEFAULT_UP=new q(0,1,0);Tt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Tt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new q,xn=new q,Ga=new q,yn=new q,wi=new q,Ti=new q,Vo=new q,Ha=new q,Va=new q,Wa=new q;class An{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),nn.subVectors(e,t),i.cross(nn);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){nn.subVectors(i,t),xn.subVectors(n,t),Ga.subVectors(e,t);const l=nn.dot(nn),u=nn.dot(xn),d=nn.dot(Ga),f=xn.dot(xn),h=xn.dot(Ga),p=l*f-u*u;if(p===0)return o.set(-2,-1,-1);const m=1/p,y=(f*d-u*h)*m,M=(l*h-u*d)*m;return o.set(1-y-M,M,y)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,yn),yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getUV(e,t,n,i,o,l,u,d){return this.getBarycoord(e,t,n,i,yn),d.set(0,0),d.addScaledVector(o,yn.x),d.addScaledVector(l,yn.y),d.addScaledVector(u,yn.z),d}static isFrontFacing(e,t,n,i){return nn.subVectors(n,t),xn.subVectors(e,t),nn.cross(xn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),nn.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,o){return An.getUV(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,o=this.c;let l,u;wi.subVectors(i,n),Ti.subVectors(o,n),Ha.subVectors(e,n);const d=wi.dot(Ha),f=Ti.dot(Ha);if(d<=0&&f<=0)return t.copy(n);Va.subVectors(e,i);const h=wi.dot(Va),p=Ti.dot(Va);if(h>=0&&p<=h)return t.copy(i);const m=d*p-h*f;if(m<=0&&d>=0&&h<=0)return l=d/(d-h),t.copy(n).addScaledVector(wi,l);Wa.subVectors(e,o);const y=wi.dot(Wa),M=Ti.dot(Wa);if(M>=0&&y<=M)return t.copy(o);const _=y*f-d*M;if(_<=0&&f>=0&&M<=0)return u=f/(f-M),t.copy(n).addScaledVector(Ti,u);const x=h*M-y*p;if(x<=0&&p-h>=0&&y-M>=0)return Vo.subVectors(o,i),u=(p-h)/(p-h+(y-M)),t.copy(i).addScaledVector(Vo,u);const T=1/(x+_+m);return l=_*T,u=m*T,t.copy(n).addScaledVector(wi,l).addScaledVector(Ti,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let hd=0;class mi extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=Vi(),this.name="",this.type="Material",this.blending=ki,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Vl,this.blendDst=Wl,this.blendEquation=Un,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pa,this.stencilZFail=Pa,this.stencilZPass=Pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const i=this[t];if(i===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(n.blending=this.blending),this.side!==Gn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const l=[];for(const u in o){const d=o[u];delete d.metadata,l.push(d)}return l}if(t){const o=i(e.textures),l=i(e.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ac={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rn={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function ja(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=zt.workingColorSpace){return this.r=e,this.g=t,this.b=n,zt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=zt.workingColorSpace){if(e=Ws(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,l=2*n-o;this.r=ja(l,o,e+1/3),this.g=ja(l,o,e),this.b=ja(l,o,e-1/3)}return zt.toWorkingColorSpace(this,i),this}setStyle(e,t=dn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const l=i[1],u=i[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return this.r=Math.min(255,parseInt(o[1],10))/255,this.g=Math.min(255,parseInt(o[2],10))/255,this.b=Math.min(255,parseInt(o[3],10))/255,zt.toWorkingColorSpace(this,t),n(o[4]),this;if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return this.r=Math.min(100,parseInt(o[1],10))/100,this.g=Math.min(100,parseInt(o[2],10))/100,this.b=Math.min(100,parseInt(o[3],10))/100,zt.toWorkingColorSpace(this,t),n(o[4]),this;break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u)){const d=parseFloat(o[1])/360,f=parseFloat(o[2])/100,h=parseFloat(o[3])/100;return n(o[4]),this.setHSL(d,f,h,t)}break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=i[1],l=o.length;if(l===3)return this.r=parseInt(o.charAt(0)+o.charAt(0),16)/255,this.g=parseInt(o.charAt(1)+o.charAt(1),16)/255,this.b=parseInt(o.charAt(2)+o.charAt(2),16)/255,zt.toWorkingColorSpace(this,t),this;if(l===6)return this.r=parseInt(o.charAt(0)+o.charAt(1),16)/255,this.g=parseInt(o.charAt(2)+o.charAt(3),16)/255,this.b=parseInt(o.charAt(4)+o.charAt(5),16)/255,zt.toWorkingColorSpace(this,t),this;console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dn){const n=ac[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dn){return zt.fromWorkingColorSpace(At.copy(this),e),Ft(At.r*255,0,255)<<16^Ft(At.g*255,0,255)<<8^Ft(At.b*255,0,255)<<0}getHexString(e=dn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zt.workingColorSpace){zt.fromWorkingColorSpace(At.copy(this),t);const n=At.r,i=At.g,o=At.b,l=Math.max(n,i,o),u=Math.min(n,i,o);let d,f;const h=(u+l)/2;if(u===l)d=0,f=0;else{const p=l-u;switch(f=h<=.5?p/(l+u):p/(2-l-u),l){case n:d=(i-o)/p+(i<o?6:0);break;case i:d=(o-n)/p+2;break;case o:d=(n-i)/p+4;break}d/=6}return e.h=d,e.s=f,e.l=h,e}getRGB(e,t=zt.workingColorSpace){return zt.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=dn){zt.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,i=At.b;return e!==dn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${t*255|0},${n*255|0},${i*255|0})`}offsetHSL(e,t,n){return this.getHSL(rn),rn.h+=e,rn.s+=t,rn.l+=n,this.setHSL(rn.h,rn.s,rn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(rn),e.getHSL(Ar);const n=cr(rn.h,Ar.h,t),i=cr(rn.s,Ar.s,t),o=cr(rn.l,Ar.l,t);return this.setHSL(n,i,o),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Je;Je.NAMES=ac;class ua extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new q,Cr=new Ne;class gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ro,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),i=Ut(i,this.array),o=Ut(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class sc extends gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class oc extends gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class en extends gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let pd=0;const $t=new lt,qa=new Tt,Ei=new q,Wt=new vr,$i=new vr,bt=new q;class Xt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tc(e)?oc:sc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new kt().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return qa.lookAt(e),qa.updateMatrix(),this.applyMatrix4(qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new en(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const o=t[n];Wt.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new la);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new q,1/0);return}if(e){const n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let o=0,l=t.length;o<l;o++){const u=t[o];$i.setFromBufferAttribute(u),this.morphTargetsRelative?(bt.addVectors(Wt.min,$i.min),Wt.expandByPoint(bt),bt.addVectors(Wt.max,$i.max),Wt.expandByPoint(bt)):(Wt.expandByPoint($i.min),Wt.expandByPoint($i.max))}Wt.getCenter(n);let i=0;for(let o=0,l=e.count;o<l;o++)bt.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(bt));if(t)for(let o=0,l=t.length;o<l;o++){const u=t[o],d=this.morphTargetsRelative;for(let f=0,h=u.count;f<h;f++)bt.fromBufferAttribute(u,f),d&&(Ei.fromBufferAttribute(e,f),bt.add(Ei)),i=Math.max(i,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,o=t.normal.array,l=t.uv.array,u=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gt(new Float32Array(4*u),4));const d=this.getAttribute("tangent").array,f=[],h=[];for(let z=0;z<u;z++)f[z]=new q,h[z]=new q;const p=new q,m=new q,y=new q,M=new Ne,_=new Ne,x=new Ne,T=new q,E=new q;function w(z,j,K){p.fromArray(i,z*3),m.fromArray(i,j*3),y.fromArray(i,K*3),M.fromArray(l,z*2),_.fromArray(l,j*2),x.fromArray(l,K*2),m.sub(p),y.sub(p),_.sub(M),x.sub(M);const G=1/(_.x*x.y-x.x*_.y);!isFinite(G)||(T.copy(m).multiplyScalar(x.y).addScaledVector(y,-_.y).multiplyScalar(G),E.copy(y).multiplyScalar(_.x).addScaledVector(m,-x.x).multiplyScalar(G),f[z].add(T),f[j].add(T),f[K].add(T),h[z].add(E),h[j].add(E),h[K].add(E))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let z=0,j=S.length;z<j;++z){const K=S[z],G=K.start,k=K.count;for(let F=G,$=G+k;F<$;F+=3)w(n[F+0],n[F+1],n[F+2])}const C=new q,D=new q,O=new q,A=new q;function P(z){O.fromArray(o,z*3),A.copy(O);const j=f[z];C.copy(j),C.sub(O.multiplyScalar(O.dot(j))).normalize(),D.crossVectors(A,j);const G=D.dot(h[z])<0?-1:1;d[z*4]=C.x,d[z*4+1]=C.y,d[z*4+2]=C.z,d[z*4+3]=G}for(let z=0,j=S.length;z<j;++z){const K=S[z],G=K.start,k=K.count;for(let F=G,$=G+k;F<$;F+=3)P(n[F+0]),P(n[F+1]),P(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let m=0,y=n.count;m<y;m++)n.setXYZ(m,0,0,0);const i=new q,o=new q,l=new q,u=new q,d=new q,f=new q,h=new q,p=new q;if(e)for(let m=0,y=e.count;m<y;m+=3){const M=e.getX(m+0),_=e.getX(m+1),x=e.getX(m+2);i.fromBufferAttribute(t,M),o.fromBufferAttribute(t,_),l.fromBufferAttribute(t,x),h.subVectors(l,o),p.subVectors(i,o),h.cross(p),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,_),f.fromBufferAttribute(n,x),u.add(h),d.add(h),f.add(h),n.setXYZ(M,u.x,u.y,u.z),n.setXYZ(_,d.x,d.y,d.z),n.setXYZ(x,f.x,f.y,f.z)}else for(let m=0,y=t.count;m<y;m+=3)i.fromBufferAttribute(t,m+0),o.fromBufferAttribute(t,m+1),l.fromBufferAttribute(t,m+2),h.subVectors(l,o),p.subVectors(i,o),h.cross(p),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(u,d){const f=u.array,h=u.itemSize,p=u.normalized,m=new f.constructor(d.length*h);let y=0,M=0;for(let _=0,x=d.length;_<x;_++){u.isInterleavedBufferAttribute?y=d[_]*u.data.stride+u.offset:y=d[_]*h;for(let T=0;T<h;T++)m[M++]=f[y++]}return new gt(m,h,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,n=this.index.array,i=this.attributes;for(const u in i){const d=i[u],f=e(d,n);t.setAttribute(u,f)}const o=this.morphAttributes;for(const u in o){const d=[],f=o[u];for(let h=0,p=f.length;h<p;h++){const m=f[h],y=e(m,n);d.push(y)}t.morphAttributes[u]=d}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let u=0,d=l.length;u<d;u++){const f=l[u];t.addGroup(f.start,f.count,f.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const f in d)d[f]!==void 0&&(e[f]=d[f]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const d in n){const f=n[d];e.data.attributes[d]=f.toJSON(e.data)}const i={};let o=!1;for(const d in this.morphAttributes){const f=this.morphAttributes[d],h=[];for(let p=0,m=f.length;p<m;p++){const y=f[p];h.push(y.toJSON(e.data))}h.length>0&&(i[d]=h,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const f in i){const h=i[f];this.setAttribute(f,h.clone(t))}const o=e.morphAttributes;for(const f in o){const h=[],p=o[f];for(let m=0,y=p.length;m<y;m++)h.push(p[m].clone(t));this.morphAttributes[f]=h}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let f=0,h=l.length;f<h;f++){const p=l[f];this.addGroup(p.start,p.count,p.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new lt,cn=new js,Dr=new la,jo=new q,Zi=new q,Ki=new q,Qi=new q,Xa=new q,Pr=new q,Lr=new Ne,Rr=new Ne,Ir=new Ne,Ya=new q,zr=new q;class Pt extends Tt{constructor(e=new Xt,t=new ua){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=i.length;o<l;o++){const u=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=o}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const u=this.morphTargetInfluences;if(o&&u){Pr.set(0,0,0);for(let d=0,f=o.length;d<f;d++){const h=u[d],p=o[d];h!==0&&(Xa.fromBufferAttribute(p,e),l?Pr.addScaledVector(Xa,h):Pr.addScaledVector(Xa.sub(t),h))}t.add(Pr)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const n=this.geometry,i=this.material,o=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(o),cn.copy(e.ray).recast(e.near),Dr.containsPoint(cn.origin)===!1&&(cn.intersectSphere(Dr,jo)===null||cn.origin.distanceToSquared(jo)>(e.far-e.near)**2))||(Wo.copy(o).invert(),cn.copy(e.ray).applyMatrix4(Wo),n.boundingBox!==null&&cn.intersectsBox(n.boundingBox)===!1))return;let l;const u=n.index,d=n.attributes.position,f=n.attributes.uv,h=n.attributes.uv2,p=n.groups,m=n.drawRange;if(u!==null)if(Array.isArray(i))for(let y=0,M=p.length;y<M;y++){const _=p[y],x=i[_.materialIndex],T=Math.max(_.start,m.start),E=Math.min(u.count,Math.min(_.start+_.count,m.start+m.count));for(let w=T,S=E;w<S;w+=3){const C=u.getX(w),D=u.getX(w+1),O=u.getX(w+2);l=Nr(this,x,e,cn,f,h,C,D,O),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=_.materialIndex,t.push(l))}}else{const y=Math.max(0,m.start),M=Math.min(u.count,m.start+m.count);for(let _=y,x=M;_<x;_+=3){const T=u.getX(_),E=u.getX(_+1),w=u.getX(_+2);l=Nr(this,i,e,cn,f,h,T,E,w),l&&(l.faceIndex=Math.floor(_/3),t.push(l))}}else if(d!==void 0)if(Array.isArray(i))for(let y=0,M=p.length;y<M;y++){const _=p[y],x=i[_.materialIndex],T=Math.max(_.start,m.start),E=Math.min(d.count,Math.min(_.start+_.count,m.start+m.count));for(let w=T,S=E;w<S;w+=3){const C=w,D=w+1,O=w+2;l=Nr(this,x,e,cn,f,h,C,D,O),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=_.materialIndex,t.push(l))}}else{const y=Math.max(0,m.start),M=Math.min(d.count,m.start+m.count);for(let _=y,x=M;_<x;_+=3){const T=_,E=_+1,w=_+2;l=Nr(this,i,e,cn,f,h,T,E,w),l&&(l.faceIndex=Math.floor(_/3),t.push(l))}}}}function md(s,e,t,n,i,o,l,u){let d;if(e.side===qt?d=n.intersectTriangle(l,o,i,!0,u):d=n.intersectTriangle(i,o,l,e.side===Gn,u),d===null)return null;zr.copy(u),zr.applyMatrix4(s.matrixWorld);const f=t.ray.origin.distanceTo(zr);return f<t.near||f>t.far?null:{distance:f,point:zr.clone(),object:s}}function Nr(s,e,t,n,i,o,l,u,d){s.getVertexPosition(l,Zi),s.getVertexPosition(u,Ki),s.getVertexPosition(d,Qi);const f=md(s,e,t,n,Zi,Ki,Qi,Ya);if(f){i&&(Lr.fromBufferAttribute(i,l),Rr.fromBufferAttribute(i,u),Ir.fromBufferAttribute(i,d),f.uv=An.getUV(Ya,Zi,Ki,Qi,Lr,Rr,Ir,new Ne)),o&&(Lr.fromBufferAttribute(o,l),Rr.fromBufferAttribute(o,u),Ir.fromBufferAttribute(o,d),f.uv2=An.getUV(Ya,Zi,Ki,Qi,Lr,Rr,Ir,new Ne));const h={a:l,b:u,c:d,normal:new q,materialIndex:0};An.getNormal(Zi,Ki,Qi,h.normal),f.face=h}return f}class _r extends Xt{constructor(e=1,t=1,n=1,i=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:l};const u=this;i=Math.floor(i),o=Math.floor(o),l=Math.floor(l);const d=[],f=[],h=[],p=[];let m=0,y=0;M("z","y","x",-1,-1,n,t,e,l,o,0),M("z","y","x",1,-1,n,t,-e,l,o,1),M("x","z","y",1,1,e,n,t,i,l,2),M("x","z","y",1,-1,e,n,-t,i,l,3),M("x","y","z",1,-1,e,t,n,i,o,4),M("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(d),this.setAttribute("position",new en(f,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(p,2));function M(_,x,T,E,w,S,C,D,O,A,P){const z=S/O,j=C/A,K=S/2,G=C/2,k=D/2,F=O+1,$=A+1;let B=0,Y=0;const V=new q;for(let U=0;U<$;U++){const ee=U*j-G;for(let X=0;X<F;X++){const J=X*z-K;V[_]=J*E,V[x]=ee*w,V[T]=k,f.push(V.x,V.y,V.z),V[_]=0,V[x]=0,V[T]=D>0?1:-1,h.push(V.x,V.y,V.z),p.push(X/O),p.push(1-U/A),B+=1}}for(let U=0;U<A;U++)for(let ee=0;ee<O;ee++){const X=m+ee+F*U,J=m+ee+F*(U+1),ne=m+(ee+1)+F*(U+1),W=m+(ee+1)+F*U;d.push(X,J,W),d.push(J,ne,W),Y+=6}u.addGroup(y,Y,P),y+=Y,m+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Nt(s){const e={};for(let t=0;t<s.length;t++){const n=Hi(s[t]);for(const i in n)e[i]=n[i]}return e}function gd(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function lc(s){return s.getRenderTarget()===null&&s.outputEncoding===rt?dn:fr}const Ni={clone:Hi,merge:Nt};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Lt extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=gd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const l=this.uniforms[i].value;l&&l.isTexture?t.uniforms[i]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[i]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[i]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[i]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[i]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[i]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[i]={type:"m4",value:l.toArray()}:t.uniforms[i]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class cc extends Tt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Jt extends cc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ra*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ra*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,o,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i;const l=this.view;if(this.view!==null&&this.view.enabled){const d=l.fullWidth,f=l.fullHeight;o+=l.offsetX*i/d,t-=l.offsetY*n/f,i*=l.width/d,n*=l.height/f}const u=this.filmOffset;u!==0&&(o+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ai=-90,Ci=1;class xd extends Tt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new Jt(Ai,Ci,e,t);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const o=new Jt(Ai,Ci,e,t);o.layers=this.layers,o.up.set(0,1,0),o.lookAt(-1,0,0),this.add(o);const l=new Jt(Ai,Ci,e,t);l.layers=this.layers,l.up.set(0,0,-1),l.lookAt(0,1,0),this.add(l);const u=new Jt(Ai,Ci,e,t);u.layers=this.layers,u.up.set(0,0,1),u.lookAt(0,-1,0),this.add(u);const d=new Jt(Ai,Ci,e,t);d.layers=this.layers,d.up.set(0,1,0),d.lookAt(0,0,1),this.add(d);const f=new Jt(Ai,Ci,e,t);f.layers=this.layers,f.up.set(0,1,0),f.lookAt(0,0,-1),this.add(f)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,o,l,u,d,f]=this.children,h=e.getRenderTarget(),p=e.toneMapping,m=e.xr.enabled;e.toneMapping=Dn,e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,o),e.setRenderTarget(n,2),e.render(t,l),e.setRenderTarget(n,3),e.render(t,u),e.setRenderTarget(n,4),e.render(t,d),n.texture.generateMipmaps=y,e.setRenderTarget(n,5),e.render(t,f),e.setRenderTarget(h),e.toneMapping=p,e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class uc extends St{constructor(e,t,n,i,o,l,u,d,f,h){e=e!==void 0?e:[],t=t!==void 0?t:Bi,super(e,t,n,i,o,l,u,d,f,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yd extends Bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new uc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new _r(5,5,5),o=new Lt({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Ct});o.uniforms.tEquirect.value=t;const l=new Pt(i,o),u=t.minFilter;return t.minFilter===ur&&(t.minFilter=Qt),new xd(1,10,this).update(e,l),t.minFilter=u,l.geometry.dispose(),l.material.dispose(),this}clear(e,t,n,i){const o=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,n,i);e.setRenderTarget(o)}}const $a=new q,bd=new q,Md=new kt;class En{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=$a.subVectors(n,t).cross(bd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta($a),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Md.getNormalMatrix(e),i=this.coplanarPoint($a).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new la,Fr=new q;class Xs{constructor(e=new En,t=new En,n=new En,i=new En,o=new En,l=new En){this.planes=[e,t,n,i,o,l]}set(e,t,n,i,o,l){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(i),u[4].copy(o),u[5].copy(l),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,i=n[0],o=n[1],l=n[2],u=n[3],d=n[4],f=n[5],h=n[6],p=n[7],m=n[8],y=n[9],M=n[10],_=n[11],x=n[12],T=n[13],E=n[14],w=n[15];return t[0].setComponents(u-i,p-d,_-m,w-x).normalize(),t[1].setComponents(u+i,p+d,_+m,w+x).normalize(),t[2].setComponents(u+o,p+f,_+y,w+T).normalize(),t[3].setComponents(u-o,p-f,_-y,w-T).normalize(),t[4].setComponents(u-l,p-h,_-M,w-E).normalize(),t[5].setComponents(u+l,p+h,_+M,w+E).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Fr.x=i.normal.x>0?e.max.x:e.min.x,Fr.y=i.normal.y>0?e.max.y:e.min.y,Fr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Fr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dc(){let s=null,e=!1,t=null,n=null;function i(o,l){t(o,l),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){s=o}}}function Sd(s,e){const t=e.isWebGL2,n=new WeakMap;function i(f,h){const p=f.array,m=f.usage,y=s.createBuffer();s.bindBuffer(h,y),s.bufferData(h,p,m),f.onUploadCallback();let M;if(p instanceof Float32Array)M=5126;else if(p instanceof Uint16Array)if(f.isFloat16BufferAttribute)if(t)M=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else M=5123;else if(p instanceof Int16Array)M=5122;else if(p instanceof Uint32Array)M=5125;else if(p instanceof Int32Array)M=5124;else if(p instanceof Int8Array)M=5120;else if(p instanceof Uint8Array)M=5121;else if(p instanceof Uint8ClampedArray)M=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:y,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:f.version}}function o(f,h,p){const m=h.array,y=h.updateRange;s.bindBuffer(p,f),y.count===-1?s.bufferSubData(p,0,m):(t?s.bufferSubData(p,y.offset*m.BYTES_PER_ELEMENT,m,y.offset,y.count):s.bufferSubData(p,y.offset*m.BYTES_PER_ELEMENT,m.subarray(y.offset,y.offset+y.count)),y.count=-1),h.onUploadCallback()}function l(f){return f.isInterleavedBufferAttribute&&(f=f.data),n.get(f)}function u(f){f.isInterleavedBufferAttribute&&(f=f.data);const h=n.get(f);h&&(s.deleteBuffer(h.buffer),n.delete(f))}function d(f,h){if(f.isGLBufferAttribute){const m=n.get(f);(!m||m.version<f.version)&&n.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}f.isInterleavedBufferAttribute&&(f=f.data);const p=n.get(f);p===void 0?n.set(f,i(f,h)):p.version<f.version&&(o(p.buffer,f,h),p.version=f.version)}return{get:l,remove:u,update:d}}class li extends Xt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const o=e/2,l=t/2,u=Math.floor(n),d=Math.floor(i),f=u+1,h=d+1,p=e/u,m=t/d,y=[],M=[],_=[],x=[];for(let T=0;T<h;T++){const E=T*m-l;for(let w=0;w<f;w++){const S=w*p-o;M.push(S,-E,0),_.push(0,0,1),x.push(w/u),x.push(1-T/d)}}for(let T=0;T<d;T++)for(let E=0;E<u;E++){const w=E+f*T,S=E+f*(T+1),C=E+1+f*(T+1),D=E+1+f*T;y.push(w,S,D),y.push(S,C,D)}this.setIndex(y),this.setAttribute("position",new en(M,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.width,e.height,e.widthSegments,e.heightSegments)}}var wd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Td=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ed=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Dd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pd="vec3 transformed = vec3( position );",Ld=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rd=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Id=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Vd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Wd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Yd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kd=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ef=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,of=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,uf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,pf=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,mf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,yf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,bf=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,wf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ef=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Df=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,If=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ff=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Uf=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,jf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$f=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Zf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,th=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,ih=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ah=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,lh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ch=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,uh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ph=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,mh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,gh=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,vh=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,_h=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,xh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,yh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,bh=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Mh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wh=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Th=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Eh=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Ah=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ch=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Dh=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ph=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Lh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ih=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Nh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Oh=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,kh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$h=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jh=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,tp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,he={alphamap_fragment:wd,alphamap_pars_fragment:Td,alphatest_fragment:Ed,alphatest_pars_fragment:Ad,aomap_fragment:Cd,aomap_pars_fragment:Dd,begin_vertex:Pd,beginnormal_vertex:Ld,bsdfs:Rd,iridescence_fragment:Id,bumpmap_pars_fragment:zd,clipping_planes_fragment:Nd,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Od,clipping_planes_vertex:kd,color_fragment:Ud,color_pars_fragment:Bd,color_pars_vertex:Gd,color_vertex:Hd,common:Vd,cube_uv_reflection_fragment:Wd,defaultnormal_vertex:jd,displacementmap_pars_vertex:qd,displacementmap_vertex:Xd,emissivemap_fragment:Yd,emissivemap_pars_fragment:$d,encodings_fragment:Zd,encodings_pars_fragment:Kd,envmap_fragment:Qd,envmap_common_pars_fragment:Jd,envmap_pars_fragment:ef,envmap_pars_vertex:tf,envmap_physical_pars_fragment:pf,envmap_vertex:nf,fog_vertex:rf,fog_pars_vertex:af,fog_fragment:sf,fog_pars_fragment:of,gradientmap_pars_fragment:lf,lightmap_fragment:cf,lightmap_pars_fragment:uf,lights_lambert_fragment:df,lights_lambert_pars_fragment:ff,lights_pars_begin:hf,lights_toon_fragment:mf,lights_toon_pars_fragment:gf,lights_phong_fragment:vf,lights_phong_pars_fragment:_f,lights_physical_fragment:xf,lights_physical_pars_fragment:yf,lights_fragment_begin:bf,lights_fragment_maps:Mf,lights_fragment_end:Sf,logdepthbuf_fragment:wf,logdepthbuf_pars_fragment:Tf,logdepthbuf_pars_vertex:Ef,logdepthbuf_vertex:Af,map_fragment:Cf,map_pars_fragment:Df,map_particle_fragment:Pf,map_particle_pars_fragment:Lf,metalnessmap_fragment:Rf,metalnessmap_pars_fragment:If,morphcolor_vertex:zf,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:kf,normal_fragment_maps:Uf,normal_pars_fragment:Bf,normal_pars_vertex:Gf,normal_vertex:Hf,normalmap_pars_fragment:Vf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:jf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Xf,output_fragment:Yf,packing:$f,premultiplied_alpha_fragment:Zf,project_vertex:Kf,dithering_fragment:Qf,dithering_pars_fragment:Jf,roughnessmap_fragment:eh,roughnessmap_pars_fragment:th,shadowmap_pars_fragment:nh,shadowmap_pars_vertex:ih,shadowmap_vertex:rh,shadowmask_pars_fragment:ah,skinbase_vertex:sh,skinning_pars_vertex:oh,skinning_vertex:lh,skinnormal_vertex:ch,specularmap_fragment:uh,specularmap_pars_fragment:dh,tonemapping_fragment:fh,tonemapping_pars_fragment:hh,transmission_fragment:ph,transmission_pars_fragment:mh,uv_pars_fragment:gh,uv_pars_vertex:vh,uv_vertex:_h,uv2_pars_fragment:xh,uv2_pars_vertex:yh,uv2_vertex:bh,worldpos_vertex:Mh,background_vert:Sh,background_frag:wh,backgroundCube_vert:Th,backgroundCube_frag:Eh,cube_vert:Ah,cube_frag:Ch,depth_vert:Dh,depth_frag:Ph,distanceRGBA_vert:Lh,distanceRGBA_frag:Rh,equirect_vert:Ih,equirect_frag:zh,linedashed_vert:Nh,linedashed_frag:Fh,meshbasic_vert:Oh,meshbasic_frag:kh,meshlambert_vert:Uh,meshlambert_frag:Bh,meshmatcap_vert:Gh,meshmatcap_frag:Hh,meshnormal_vert:Vh,meshnormal_frag:Wh,meshphong_vert:jh,meshphong_frag:qh,meshphysical_vert:Xh,meshphysical_frag:Yh,meshtoon_vert:$h,meshtoon_frag:Zh,points_vert:Kh,points_frag:Qh,shadow_vert:Jh,shadow_frag:ep,sprite_vert:tp,sprite_frag:np},ye={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new kt},uv2Transform:{value:new kt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new kt}}},fn={basic:{uniforms:Nt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:he.meshbasic_vert,fragmentShader:he.meshbasic_frag},lambert:{uniforms:Nt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Je(0)}}]),vertexShader:he.meshlambert_vert,fragmentShader:he.meshlambert_frag},phong:{uniforms:Nt([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:he.meshphong_vert,fragmentShader:he.meshphong_frag},standard:{uniforms:Nt([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag},toon:{uniforms:Nt([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Je(0)}}]),vertexShader:he.meshtoon_vert,fragmentShader:he.meshtoon_frag},matcap:{uniforms:Nt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:he.meshmatcap_vert,fragmentShader:he.meshmatcap_frag},points:{uniforms:Nt([ye.points,ye.fog]),vertexShader:he.points_vert,fragmentShader:he.points_frag},dashed:{uniforms:Nt([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:he.linedashed_vert,fragmentShader:he.linedashed_frag},depth:{uniforms:Nt([ye.common,ye.displacementmap]),vertexShader:he.depth_vert,fragmentShader:he.depth_frag},normal:{uniforms:Nt([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:he.meshnormal_vert,fragmentShader:he.meshnormal_frag},sprite:{uniforms:Nt([ye.sprite,ye.fog]),vertexShader:he.sprite_vert,fragmentShader:he.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:he.background_vert,fragmentShader:he.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:he.backgroundCube_vert,fragmentShader:he.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:he.cube_vert,fragmentShader:he.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:he.equirect_vert,fragmentShader:he.equirect_frag},distanceRGBA:{uniforms:Nt([ye.common,ye.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:he.distanceRGBA_vert,fragmentShader:he.distanceRGBA_frag},shadow:{uniforms:Nt([ye.lights,ye.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:he.shadow_vert,fragmentShader:he.shadow_frag}};fn.physical={uniforms:Nt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null}}]),vertexShader:he.meshphysical_vert,fragmentShader:he.meshphysical_frag};const Or={r:0,b:0,g:0};function ip(s,e,t,n,i,o,l){const u=new Je(0);let d=o===!0?0:1,f,h,p=null,m=0,y=null;function M(x,T){let E=!1,w=T.isScene===!0?T.background:null;w&&w.isTexture&&(w=(T.backgroundBlurriness>0?t:e).get(w));const S=s.xr,C=S.getSession&&S.getSession();C&&C.environmentBlendMode==="additive"&&(w=null),w===null?_(u,d):w&&w.isColor&&(_(w,1),E=!0),(s.autoClear||E)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),w&&(w.isCubeTexture||w.mapping===oa)?(h===void 0&&(h=new Pt(new _r(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:Hi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,O,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.toneMapped=w.encoding!==rt,(p!==w||m!==w.version||y!==s.toneMapping)&&(h.material.needsUpdate=!0,p=w,m=w.version,y=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(f===void 0&&(f=new Pt(new li(2,2),new Lt({name:"BackgroundMaterial",uniforms:Hi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(f)),f.material.uniforms.t2D.value=w,f.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,f.material.toneMapped=w.encoding!==rt,w.matrixAutoUpdate===!0&&w.updateMatrix(),f.material.uniforms.uvTransform.value.copy(w.matrix),(p!==w||m!==w.version||y!==s.toneMapping)&&(f.material.needsUpdate=!0,p=w,m=w.version,y=s.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null))}function _(x,T){x.getRGB(Or,lc(s)),n.buffers.color.setClear(Or.r,Or.g,Or.b,T,l)}return{getClearColor:function(){return u},setClearColor:function(x,T=1){u.set(x),d=T,_(u,d)},getClearAlpha:function(){return d},setClearAlpha:function(x){d=x,_(u,d)},render:M}}function rp(s,e,t,n){const i=s.getParameter(34921),o=n.isWebGL2?null:e.get("OES_vertex_array_object"),l=n.isWebGL2||o!==null,u={},d=x(null);let f=d,h=!1;function p(k,F,$,B,Y){let V=!1;if(l){const U=_(B,$,F);f!==U&&(f=U,y(f.object)),V=T(k,B,$,Y),V&&E(k,B,$,Y)}else{const U=F.wireframe===!0;(f.geometry!==B.id||f.program!==$.id||f.wireframe!==U)&&(f.geometry=B.id,f.program=$.id,f.wireframe=U,V=!0)}Y!==null&&t.update(Y,34963),(V||h)&&(h=!1,A(k,F,$,B),Y!==null&&s.bindBuffer(34963,t.get(Y).buffer))}function m(){return n.isWebGL2?s.createVertexArray():o.createVertexArrayOES()}function y(k){return n.isWebGL2?s.bindVertexArray(k):o.bindVertexArrayOES(k)}function M(k){return n.isWebGL2?s.deleteVertexArray(k):o.deleteVertexArrayOES(k)}function _(k,F,$){const B=$.wireframe===!0;let Y=u[k.id];Y===void 0&&(Y={},u[k.id]=Y);let V=Y[F.id];V===void 0&&(V={},Y[F.id]=V);let U=V[B];return U===void 0&&(U=x(m()),V[B]=U),U}function x(k){const F=[],$=[],B=[];for(let Y=0;Y<i;Y++)F[Y]=0,$[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:$,attributeDivisors:B,object:k,attributes:{},index:null}}function T(k,F,$,B){const Y=f.attributes,V=F.attributes;let U=0;const ee=$.getAttributes();for(const X in ee)if(ee[X].location>=0){const ne=Y[X];let W=V[X];if(W===void 0&&(X==="instanceMatrix"&&k.instanceMatrix&&(W=k.instanceMatrix),X==="instanceColor"&&k.instanceColor&&(W=k.instanceColor)),ne===void 0||ne.attribute!==W||W&&ne.data!==W.data)return!0;U++}return f.attributesNum!==U||f.index!==B}function E(k,F,$,B){const Y={},V=F.attributes;let U=0;const ee=$.getAttributes();for(const X in ee)if(ee[X].location>=0){let ne=V[X];ne===void 0&&(X==="instanceMatrix"&&k.instanceMatrix&&(ne=k.instanceMatrix),X==="instanceColor"&&k.instanceColor&&(ne=k.instanceColor));const W={};W.attribute=ne,ne&&ne.data&&(W.data=ne.data),Y[X]=W,U++}f.attributes=Y,f.attributesNum=U,f.index=B}function w(){const k=f.newAttributes;for(let F=0,$=k.length;F<$;F++)k[F]=0}function S(k){C(k,0)}function C(k,F){const $=f.newAttributes,B=f.enabledAttributes,Y=f.attributeDivisors;$[k]=1,B[k]===0&&(s.enableVertexAttribArray(k),B[k]=1),Y[k]!==F&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,F),Y[k]=F)}function D(){const k=f.newAttributes,F=f.enabledAttributes;for(let $=0,B=F.length;$<B;$++)F[$]!==k[$]&&(s.disableVertexAttribArray($),F[$]=0)}function O(k,F,$,B,Y,V){n.isWebGL2===!0&&($===5124||$===5125)?s.vertexAttribIPointer(k,F,$,Y,V):s.vertexAttribPointer(k,F,$,B,Y,V)}function A(k,F,$,B){if(n.isWebGL2===!1&&(k.isInstancedMesh||B.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const Y=B.attributes,V=$.getAttributes(),U=F.defaultAttributeValues;for(const ee in V){const X=V[ee];if(X.location>=0){let J=Y[ee];if(J===void 0&&(ee==="instanceMatrix"&&k.instanceMatrix&&(J=k.instanceMatrix),ee==="instanceColor"&&k.instanceColor&&(J=k.instanceColor)),J!==void 0){const ne=J.normalized,W=J.itemSize,ce=t.get(J);if(ce===void 0)continue;const le=ce.buffer,ve=ce.type,me=ce.bytesPerElement;if(J.isInterleavedBufferAttribute){const xe=J.data,Ee=xe.stride,Le=J.offset;if(xe.isInstancedInterleavedBuffer){for(let Ie=0;Ie<X.locationSize;Ie++)C(X.location+Ie,xe.meshPerAttribute);k.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Ie=0;Ie<X.locationSize;Ie++)S(X.location+Ie);s.bindBuffer(34962,le);for(let Ie=0;Ie<X.locationSize;Ie++)O(X.location+Ie,W/X.locationSize,ve,ne,Ee*me,(Le+W/X.locationSize*Ie)*me)}else{if(J.isInstancedBufferAttribute){for(let xe=0;xe<X.locationSize;xe++)C(X.location+xe,J.meshPerAttribute);k.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let xe=0;xe<X.locationSize;xe++)S(X.location+xe);s.bindBuffer(34962,le);for(let xe=0;xe<X.locationSize;xe++)O(X.location+xe,W/X.locationSize,ve,ne,W*me,W/X.locationSize*xe*me)}}else if(U!==void 0){const ne=U[ee];if(ne!==void 0)switch(ne.length){case 2:s.vertexAttrib2fv(X.location,ne);break;case 3:s.vertexAttrib3fv(X.location,ne);break;case 4:s.vertexAttrib4fv(X.location,ne);break;default:s.vertexAttrib1fv(X.location,ne)}}}}D()}function P(){K();for(const k in u){const F=u[k];for(const $ in F){const B=F[$];for(const Y in B)M(B[Y].object),delete B[Y];delete F[$]}delete u[k]}}function z(k){if(u[k.id]===void 0)return;const F=u[k.id];for(const $ in F){const B=F[$];for(const Y in B)M(B[Y].object),delete B[Y];delete F[$]}delete u[k.id]}function j(k){for(const F in u){const $=u[F];if($[k.id]===void 0)continue;const B=$[k.id];for(const Y in B)M(B[Y].object),delete B[Y];delete $[k.id]}}function K(){G(),h=!0,f!==d&&(f=d,y(f.object))}function G(){d.geometry=null,d.program=null,d.wireframe=!1}return{setup:p,reset:K,resetDefaultState:G,dispose:P,releaseStatesOfGeometry:z,releaseStatesOfProgram:j,initAttributes:w,enableAttribute:S,disableUnusedAttributes:D}}function ap(s,e,t,n){const i=n.isWebGL2;let o;function l(f){o=f}function u(f,h){s.drawArrays(o,f,h),t.update(h,o,1)}function d(f,h,p){if(p===0)return;let m,y;if(i)m=s,y="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),y="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[y](o,f,h,p),t.update(h,o,p)}this.setMode=l,this.render=u,this.renderInstances=d}function sp(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(O){if(O==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";O="mediump"}return O==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const l=typeof WebGL2RenderingContext<"u"&&s instanceof WebGL2RenderingContext;let u=t.precision!==void 0?t.precision:"highp";const d=o(u);d!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",d,"instead."),u=d);const f=l||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,p=s.getParameter(34930),m=s.getParameter(35660),y=s.getParameter(3379),M=s.getParameter(34076),_=s.getParameter(34921),x=s.getParameter(36347),T=s.getParameter(36348),E=s.getParameter(36349),w=m>0,S=l||e.has("OES_texture_float"),C=w&&S,D=l?s.getParameter(36183):0;return{isWebGL2:l,drawBuffers:f,getMaxAnisotropy:i,getMaxPrecision:o,precision:u,logarithmicDepthBuffer:h,maxTextures:p,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:M,maxAttributes:_,maxVertexUniforms:x,maxVaryings:T,maxFragmentUniforms:E,vertexTextures:w,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:D}}function op(s){const e=this;let t=null,n=0,i=!1,o=!1;const l=new En,u=new kt,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const y=p.length!==0||m||n!==0||i;return i=m,n=p.length,y},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,m){t=h(p,m,0)},this.setState=function(p,m,y){const M=p.clippingPlanes,_=p.clipIntersection,x=p.clipShadows,T=s.get(p);if(!i||M===null||M.length===0||o&&!x)o?h(null):f();else{const E=o?0:n,w=E*4;let S=T.clippingState||null;d.value=S,S=h(M,m,w,y);for(let C=0;C!==w;++C)S[C]=t[C];T.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function f(){d.value!==t&&(d.value=t,d.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(p,m,y,M){const _=p!==null?p.length:0;let x=null;if(_!==0){if(x=d.value,M!==!0||x===null){const T=y+_*4,E=m.matrixWorldInverse;u.getNormalMatrix(E),(x===null||x.length<T)&&(x=new Float32Array(T));for(let w=0,S=y;w!==_;++w,S+=4)l.copy(p[w]).applyMatrix4(E,u),l.normal.toArray(x,S),x[S+3]=l.constant}d.value=x,d.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,x}}function lp(s){let e=new WeakMap;function t(l,u){return u===Ds?l.mapping=Bi:u===Ps&&(l.mapping=Gi),l}function n(l){if(l&&l.isTexture&&l.isRenderTargetTexture===!1){const u=l.mapping;if(u===Ds||u===Ps)if(e.has(l)){const d=e.get(l).texture;return t(d,l.mapping)}else{const d=l.image;if(d&&d.height>0){const f=new yd(d.height/2);return f.fromEquirectangularTexture(s,l),e.set(l,f),l.addEventListener("dispose",i),t(f.texture,l.mapping)}else return null}}return l}function i(l){const u=l.target;u.removeEventListener("dispose",i);const d=e.get(u);d!==void 0&&(e.delete(u),d.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class da extends cc{constructor(e=-1,t=1,n=1,i=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-e,l=n+e,u=i+t,d=i-t;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=f*this.view.offsetX,l=o+f*this.view.width,u-=h*this.view.offsetY,d=u-h*this.view.height}this.projectionMatrix.makeOrthographic(o,l,u,d,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Fi=4,qo=[.125,.215,.35,.446,.526,.582],ni=20,Za=new da,Xo=new Je;let Ka=null;const ti=(1+Math.sqrt(5))/2,Pi=1/ti,Yo=[new q(1,1,1),new q(-1,1,1),new q(1,1,-1),new q(-1,1,-1),new q(0,ti,Pi),new q(0,ti,-Pi),new q(Pi,0,ti),new q(-Pi,0,ti),new q(ti,Pi,0),new q(-ti,Pi,0)];class $o{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Ka=this._renderer.getRenderTarget(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,i,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ko(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ka),e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ka=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:dr,format:Dt,encoding:pn,depthBuffer:!1},i=Zo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zo(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cp(o)),this._blurMaterial=up(o,e,t)}return i}_compileMaterial(e){const t=new Pt(this._lodPlanes[0],e);this._renderer.compile(t,Za)}_sceneToCubeUV(e,t,n,i){const u=new Jt(90,1,t,n),d=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,m=h.toneMapping;h.getClearColor(Xo),h.toneMapping=Dn,h.autoClear=!1;const y=new ua({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),M=new Pt(new _r,y);let _=!1;const x=e.background;x?x.isColor&&(y.color.copy(x),e.background=null,_=!0):(y.color.copy(Xo),_=!0);for(let T=0;T<6;T++){const E=T%3;E===0?(u.up.set(0,d[T],0),u.lookAt(f[T],0,0)):E===1?(u.up.set(0,0,d[T]),u.lookAt(0,f[T],0)):(u.up.set(0,d[T],0),u.lookAt(0,0,f[T]));const w=this._cubeSize;kr(i,E*w,T>2?w:0,w,w),h.setRenderTarget(i),_&&h.render(M,u),h.render(e,u)}M.geometry.dispose(),M.material.dispose(),h.toneMapping=m,h.autoClear=p,e.background=x}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Bi||e.mapping===Gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ko());const o=i?this._cubemapMaterial:this._equirectMaterial,l=new Pt(this._lodPlanes[0],o),u=o.uniforms;u.envMap.value=e;const d=this._cubeSize;kr(t,0,0,3*d,2*d),n.setRenderTarget(t),n.render(l,Za)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const o=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),l=Yo[(i-1)%Yo.length];this._blur(e,i-1,i,o,l)}t.autoClear=n}_blur(e,t,n,i,o){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,n,i,"latitudinal",o),this._halfBlur(l,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,l,u){const d=this._renderer,f=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,p=new Pt(this._lodPlanes[i],f),m=f.uniforms,y=this._sizeLods[n]-1,M=isFinite(o)?Math.PI/(2*y):2*Math.PI/(2*ni-1),_=o/M,x=isFinite(o)?1+Math.floor(h*_):ni;x>ni&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ni}`);const T=[];let E=0;for(let O=0;O<ni;++O){const A=O/_,P=Math.exp(-A*A/2);T.push(P),O===0?E+=P:O<x&&(E+=2*P)}for(let O=0;O<T.length;O++)T[O]=T[O]/E;m.envMap.value=e.texture,m.samples.value=x,m.weights.value=T,m.latitudinal.value=l==="latitudinal",u&&(m.poleAxis.value=u);const{_lodMax:w}=this;m.dTheta.value=M,m.mipInt.value=w-n;const S=this._sizeLods[i],C=3*S*(i>w-Fi?i-w+Fi:0),D=4*(this._cubeSize-S);kr(t,C,D,3*S,2*S),d.setRenderTarget(t),d.render(p,Za)}}function cp(s){const e=[],t=[],n=[];let i=s;const o=s-Fi+1+qo.length;for(let l=0;l<o;l++){const u=Math.pow(2,i);t.push(u);let d=1/u;l>s-Fi?d=qo[l-s+Fi-1]:l===0&&(d=0),n.push(d);const f=1/(u-2),h=-f,p=1+f,m=[h,h,p,h,p,p,h,h,p,p,h,p],y=6,M=6,_=3,x=2,T=1,E=new Float32Array(_*M*y),w=new Float32Array(x*M*y),S=new Float32Array(T*M*y);for(let D=0;D<y;D++){const O=D%3*2/3-1,A=D>2?0:-1,P=[O,A,0,O+2/3,A,0,O+2/3,A+1,0,O,A,0,O+2/3,A+1,0,O,A+1,0];E.set(P,_*M*D),w.set(m,x*M*D);const z=[D,D,D,D,D,D];S.set(z,T*M*D)}const C=new Xt;C.setAttribute("position",new gt(E,_)),C.setAttribute("uv",new gt(w,x)),C.setAttribute("faceIndex",new gt(S,T)),e.push(C),i>Fi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Zo(s,e,t){const n=new Bt(s,e,t);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function kr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function up(s,e,t){const n=new Float32Array(ni),i=new q(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:ni,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ct,depthTest:!1,depthWrite:!1})}function Ko(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ct,depthTest:!1,depthWrite:!1})}function Qo(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ys(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ct,depthTest:!1,depthWrite:!1})}function Ys(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function dp(s){let e=new WeakMap,t=null;function n(u){if(u&&u.isTexture){const d=u.mapping,f=d===Ds||d===Ps,h=d===Bi||d===Gi;if(f||h)if(u.isRenderTargetTexture&&u.needsPMREMUpdate===!0){u.needsPMREMUpdate=!1;let p=e.get(u);return t===null&&(t=new $o(s)),p=f?t.fromEquirectangular(u,p):t.fromCubemap(u,p),e.set(u,p),p.texture}else{if(e.has(u))return e.get(u).texture;{const p=u.image;if(f&&p&&p.height>0||h&&p&&i(p)){t===null&&(t=new $o(s));const m=f?t.fromEquirectangular(u):t.fromCubemap(u);return e.set(u,m),u.addEventListener("dispose",o),m.texture}else return null}}}return u}function i(u){let d=0;const f=6;for(let h=0;h<f;h++)u[h]!==void 0&&d++;return d===f}function o(u){const d=u.target;d.removeEventListener("dispose",o);const f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:l}}function fp(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function hp(s,e,t,n){const i={},o=new WeakMap;function l(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const M in m.attributes)e.remove(m.attributes[M]);m.removeEventListener("dispose",l),delete i[m.id];const y=o.get(m);y&&(e.remove(y),o.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function u(p,m){return i[m.id]===!0||(m.addEventListener("dispose",l),i[m.id]=!0,t.memory.geometries++),m}function d(p){const m=p.attributes;for(const M in m)e.update(m[M],34962);const y=p.morphAttributes;for(const M in y){const _=y[M];for(let x=0,T=_.length;x<T;x++)e.update(_[x],34962)}}function f(p){const m=[],y=p.index,M=p.attributes.position;let _=0;if(y!==null){const E=y.array;_=y.version;for(let w=0,S=E.length;w<S;w+=3){const C=E[w+0],D=E[w+1],O=E[w+2];m.push(C,D,D,O,O,C)}}else{const E=M.array;_=M.version;for(let w=0,S=E.length/3-1;w<S;w+=3){const C=w+0,D=w+1,O=w+2;m.push(C,D,D,O,O,C)}}const x=new(tc(m)?oc:sc)(m,1);x.version=_;const T=o.get(p);T&&e.remove(T),o.set(p,x)}function h(p){const m=o.get(p);if(m){const y=p.index;y!==null&&m.version<y.version&&f(p)}else f(p);return o.get(p)}return{get:u,update:d,getWireframeAttribute:h}}function pp(s,e,t,n){const i=n.isWebGL2;let o;function l(m){o=m}let u,d;function f(m){u=m.type,d=m.bytesPerElement}function h(m,y){s.drawElements(o,y,u,m*d),t.update(y,o,1)}function p(m,y,M){if(M===0)return;let _,x;if(i)_=s,x="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),x="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[x](o,y,u,m*d,M),t.update(y,o,M)}this.setMode=l,this.setIndex=f,this.render=h,this.renderInstances=p}function mp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,u){switch(t.calls++,l){case 4:t.triangles+=u*(o/3);break;case 1:t.lines+=u*(o/2);break;case 3:t.lines+=u*(o-1);break;case 2:t.lines+=u*o;break;case 0:t.points+=u*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function i(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function gp(s,e){return s[0]-e[0]}function vp(s,e){return Math.abs(e[1])-Math.abs(s[1])}function _p(s,e,t){const n={},i=new Float32Array(8),o=new WeakMap,l=new Mt,u=[];for(let f=0;f<8;f++)u[f]=[f,0];function d(f,h,p){const m=f.morphTargetInfluences;if(e.isWebGL2===!0){const M=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=M!==void 0?M.length:0;let x=o.get(h);if(x===void 0||x.count!==_){let F=function(){G.dispose(),o.delete(h),h.removeEventListener("dispose",F)};var y=F;x!==void 0&&x.texture.dispose();const w=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,D=h.morphAttributes.position||[],O=h.morphAttributes.normal||[],A=h.morphAttributes.color||[];let P=0;w===!0&&(P=1),S===!0&&(P=2),C===!0&&(P=3);let z=h.attributes.position.count*P,j=1;z>e.maxTextureSize&&(j=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const K=new Float32Array(z*j*4*_),G=new rc(K,z,j,_);G.type=jt,G.needsUpdate=!0;const k=P*4;for(let $=0;$<_;$++){const B=D[$],Y=O[$],V=A[$],U=z*j*4*$;for(let ee=0;ee<B.count;ee++){const X=ee*k;w===!0&&(l.fromBufferAttribute(B,ee),K[U+X+0]=l.x,K[U+X+1]=l.y,K[U+X+2]=l.z,K[U+X+3]=0),S===!0&&(l.fromBufferAttribute(Y,ee),K[U+X+4]=l.x,K[U+X+5]=l.y,K[U+X+6]=l.z,K[U+X+7]=0),C===!0&&(l.fromBufferAttribute(V,ee),K[U+X+8]=l.x,K[U+X+9]=l.y,K[U+X+10]=l.z,K[U+X+11]=V.itemSize===4?l.w:1)}}x={count:_,texture:G,size:new Ne(z,j)},o.set(h,x),h.addEventListener("dispose",F)}let T=0;for(let w=0;w<m.length;w++)T+=m[w];const E=h.morphTargetsRelative?1:1-T;p.getUniforms().setValue(s,"morphTargetBaseInfluence",E),p.getUniforms().setValue(s,"morphTargetInfluences",m),p.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),p.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}else{const M=m===void 0?0:m.length;let _=n[h.id];if(_===void 0||_.length!==M){_=[];for(let S=0;S<M;S++)_[S]=[S,0];n[h.id]=_}for(let S=0;S<M;S++){const C=_[S];C[0]=S,C[1]=m[S]}_.sort(vp);for(let S=0;S<8;S++)S<M&&_[S][1]?(u[S][0]=_[S][0],u[S][1]=_[S][1]):(u[S][0]=Number.MAX_SAFE_INTEGER,u[S][1]=0);u.sort(gp);const x=h.morphAttributes.position,T=h.morphAttributes.normal;let E=0;for(let S=0;S<8;S++){const C=u[S],D=C[0],O=C[1];D!==Number.MAX_SAFE_INTEGER&&O?(x&&h.getAttribute("morphTarget"+S)!==x[D]&&h.setAttribute("morphTarget"+S,x[D]),T&&h.getAttribute("morphNormal"+S)!==T[D]&&h.setAttribute("morphNormal"+S,T[D]),i[S]=O,E+=O):(x&&h.hasAttribute("morphTarget"+S)===!0&&h.deleteAttribute("morphTarget"+S),T&&h.hasAttribute("morphNormal"+S)===!0&&h.deleteAttribute("morphNormal"+S),i[S]=0)}const w=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(s,"morphTargetBaseInfluence",w),p.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:d}}function xp(s,e,t,n){let i=new WeakMap;function o(d){const f=n.render.frame,h=d.geometry,p=e.get(d,h);return i.get(p)!==f&&(e.update(p),i.set(p,f)),d.isInstancedMesh&&(d.hasEventListener("dispose",u)===!1&&d.addEventListener("dispose",u),t.update(d.instanceMatrix,34962),d.instanceColor!==null&&t.update(d.instanceColor,34962)),p}function l(){i=new WeakMap}function u(d){const f=d.target;f.removeEventListener("dispose",u),t.remove(f.instanceMatrix),f.instanceColor!==null&&t.remove(f.instanceColor)}return{update:o,dispose:l}}const fc=new St,hc=new rc,pc=new ad,mc=new uc,Jo=[],el=[],tl=new Float32Array(16),nl=new Float32Array(9),il=new Float32Array(4);function Wi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let o=Jo[i];if(o===void 0&&(o=new Float32Array(i),Jo[i]=o),e!==0){n.toArray(o,0);for(let l=1,u=0;l!==e;++l)u+=t,s[l].toArray(o,u)}return o}function vt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function _t(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function fa(s,e){let t=el[e];t===void 0&&(t=new Int32Array(e),el[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function yp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function bp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2fv(this.addr,e),_t(t,e)}}function Mp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;s.uniform3fv(this.addr,e),_t(t,e)}}function Sp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4fv(this.addr,e),_t(t,e)}}function wp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(vt(t,n))return;il.set(n),s.uniformMatrix2fv(this.addr,!1,il),_t(t,n)}}function Tp(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(vt(t,n))return;nl.set(n),s.uniformMatrix3fv(this.addr,!1,nl),_t(t,n)}}function Ep(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(vt(t,n))return;tl.set(n),s.uniformMatrix4fv(this.addr,!1,tl),_t(t,n)}}function Ap(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Cp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2iv(this.addr,e),_t(t,e)}}function Dp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;s.uniform3iv(this.addr,e),_t(t,e)}}function Pp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4iv(this.addr,e),_t(t,e)}}function Lp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Rp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2uiv(this.addr,e),_t(t,e)}}function Ip(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;s.uniform3uiv(this.addr,e),_t(t,e)}}function zp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4uiv(this.addr,e),_t(t,e)}}function Np(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||fc,i)}function Fp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||pc,i)}function Op(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||mc,i)}function kp(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||hc,i)}function Up(s){switch(s){case 5126:return yp;case 35664:return bp;case 35665:return Mp;case 35666:return Sp;case 35674:return wp;case 35675:return Tp;case 35676:return Ep;case 5124:case 35670:return Ap;case 35667:case 35671:return Cp;case 35668:case 35672:return Dp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Rp;case 36295:return Ip;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return kp}}function Bp(s,e){s.uniform1fv(this.addr,e)}function Gp(s,e){const t=Wi(e,this.size,2);s.uniform2fv(this.addr,t)}function Hp(s,e){const t=Wi(e,this.size,3);s.uniform3fv(this.addr,t)}function Vp(s,e){const t=Wi(e,this.size,4);s.uniform4fv(this.addr,t)}function Wp(s,e){const t=Wi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function jp(s,e){const t=Wi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function qp(s,e){const t=Wi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Xp(s,e){s.uniform1iv(this.addr,e)}function Yp(s,e){s.uniform2iv(this.addr,e)}function $p(s,e){s.uniform3iv(this.addr,e)}function Zp(s,e){s.uniform4iv(this.addr,e)}function Kp(s,e){s.uniform1uiv(this.addr,e)}function Qp(s,e){s.uniform2uiv(this.addr,e)}function Jp(s,e){s.uniform3uiv(this.addr,e)}function e0(s,e){s.uniform4uiv(this.addr,e)}function t0(s,e,t){const n=this.cache,i=e.length,o=fa(t,i);vt(n,o)||(s.uniform1iv(this.addr,o),_t(n,o));for(let l=0;l!==i;++l)t.setTexture2D(e[l]||fc,o[l])}function n0(s,e,t){const n=this.cache,i=e.length,o=fa(t,i);vt(n,o)||(s.uniform1iv(this.addr,o),_t(n,o));for(let l=0;l!==i;++l)t.setTexture3D(e[l]||pc,o[l])}function i0(s,e,t){const n=this.cache,i=e.length,o=fa(t,i);vt(n,o)||(s.uniform1iv(this.addr,o),_t(n,o));for(let l=0;l!==i;++l)t.setTextureCube(e[l]||mc,o[l])}function r0(s,e,t){const n=this.cache,i=e.length,o=fa(t,i);vt(n,o)||(s.uniform1iv(this.addr,o),_t(n,o));for(let l=0;l!==i;++l)t.setTexture2DArray(e[l]||hc,o[l])}function a0(s){switch(s){case 5126:return Bp;case 35664:return Gp;case 35665:return Hp;case 35666:return Vp;case 35674:return Wp;case 35675:return jp;case 35676:return qp;case 5124:case 35670:return Xp;case 35667:case 35671:return Yp;case 35668:case 35672:return $p;case 35669:case 35673:return Zp;case 5125:return Kp;case 36294:return Qp;case 36295:return Jp;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return r0}}class s0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=Up(t.type)}}class o0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=a0(t.type)}}class l0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let o=0,l=i.length;o!==l;++o){const u=i[o];u.setValue(e,t[u.id],n)}}}const Qa=/(\w+)(\])?(\[|\.)?/g;function rl(s,e){s.seq.push(e),s.map[e.id]=e}function c0(s,e,t){const n=s.name,i=n.length;for(Qa.lastIndex=0;;){const o=Qa.exec(n),l=Qa.lastIndex;let u=o[1];const d=o[2]==="]",f=o[3];if(d&&(u=u|0),f===void 0||f==="["&&l+2===i){rl(t,f===void 0?new s0(u,s,e):new o0(u,s,e));break}else{let p=t.map[u];p===void 0&&(p=new l0(u),rl(t,p)),t=p}}}class na{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,35718);for(let i=0;i<n;++i){const o=e.getActiveUniform(t,i),l=e.getUniformLocation(t,o.name);c0(o,l,this)}}setValue(e,t,n,i){const o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,l=t.length;o!==l;++o){const u=t[o],d=n[u.id];d.needsUpdate!==!1&&u.setValue(e,d.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,o=e.length;i!==o;++i){const l=e[i];l.id in t&&n.push(l)}return n}}function al(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}let u0=0;function d0(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let l=i;l<o;l++){const u=l+1;n.push(`${u===e?">":" "} ${u}: ${t[l]}`)}return n.join(`
`)}function f0(s){switch(s){case pn:return["Linear","( value )"];case rt:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function sl(s,e,t){const n=s.getShaderParameter(e,35713),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const l=parseInt(o[1]);return t.toUpperCase()+`

`+i+`

`+d0(s.getShaderSource(e),l)}else return i}function h0(s,e){const t=f0(e);return"vec4 "+s+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function p0(s,e){let t;switch(e){case Yl:t="Linear";break;case Cs:t="Reinhard";break;case gu:t="OptimizedCineon";break;case vu:t="ACESFilmic";break;case _u:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function m0(s){return[s.extensionDerivatives||!!s.envMapCubeUVHeight||s.bumpMap||s.tangentSpaceNormalMap||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(sr).join(`
`)}function g0(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function v0(s,e){const t={},n=s.getProgramParameter(e,35721);for(let i=0;i<n;i++){const o=s.getActiveAttrib(e,i),l=o.name;let u=1;o.type===35674&&(u=2),o.type===35675&&(u=3),o.type===35676&&(u=4),t[l]={type:o.type,location:s.getAttribLocation(e,l),locationSize:u}}return t}function sr(s){return s!==""}function ol(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ll(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _0=/^[ \t]*#include +<([\w\d./]+)>/gm;function zs(s){return s.replace(_0,x0)}function x0(s,e){const t=he[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return zs(t)}const y0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cl(s){return s.replace(y0,b0)}function b0(s,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function ul(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function M0(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Gl?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===rr&&(e="SHADOWMAP_TYPE_VSM"),e}function S0(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Bi:case Gi:e="ENVMAP_TYPE_CUBE";break;case oa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function w0(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Gi:e="ENVMAP_MODE_REFRACTION";break}return e}function T0(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Xl:e="ENVMAP_BLENDING_MULTIPLY";break;case pu:e="ENVMAP_BLENDING_MIX";break;case mu:e="ENVMAP_BLENDING_ADD";break}return e}function E0(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function A0(s,e,t,n){const i=s.getContext(),o=t.defines;let l=t.vertexShader,u=t.fragmentShader;const d=M0(t),f=S0(t),h=w0(t),p=T0(t),m=E0(t),y=t.isWebGL2?"":m0(t),M=g0(o),_=i.createProgram();let x,T,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=[M].filter(sr).join(`
`),x.length>0&&(x+=`
`),T=[y,M].filter(sr).join(`
`),T.length>0&&(T+=`
`)):(x=[ul(t),"#define SHADER_NAME "+t.shaderName,M,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sr).join(`
`),T=[y,ul(t),"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dn?"#define TONE_MAPPING":"",t.toneMapping!==Dn?he.tonemapping_pars_fragment:"",t.toneMapping!==Dn?p0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",he.encodings_pars_fragment,h0("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(sr).join(`
`)),l=zs(l),l=ol(l,t),l=ll(l,t),u=zs(u),u=ol(u,t),u=ll(u,t),l=cl(l),u=cl(u),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,x=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,T=["#define varying in",t.glslVersion===Io?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Io?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const w=E+x+l,S=E+T+u,C=al(i,35633,w),D=al(i,35632,S);if(i.attachShader(_,C),i.attachShader(_,D),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_),s.debug.checkShaderErrors){const P=i.getProgramInfoLog(_).trim(),z=i.getShaderInfoLog(C).trim(),j=i.getShaderInfoLog(D).trim();let K=!0,G=!0;if(i.getProgramParameter(_,35714)===!1){K=!1;const k=sl(i,C,"vertex"),F=sl(i,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,35715)+`

Program Info Log: `+P+`
`+k+`
`+F)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(z===""||j==="")&&(G=!1);G&&(this.diagnostics={runnable:K,programLog:P,vertexShader:{log:z,prefix:x},fragmentShader:{log:j,prefix:T}})}i.deleteShader(C),i.deleteShader(D);let O;this.getUniforms=function(){return O===void 0&&(O=new na(i,_)),O};let A;return this.getAttributes=function(){return A===void 0&&(A=v0(i,_)),A},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.name=t.shaderName,this.id=u0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=D,this}let C0=0;class D0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new P0(e),t.set(e,n)),n}}class P0{constructor(e){this.id=C0++,this.code=e,this.usedTimes=0}}function L0(s,e,t,n,i,o,l){const u=new qs,d=new D0,f=[],h=i.isWebGL2,p=i.logarithmicDepthBuffer,m=i.vertexTextures;let y=i.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(A,P,z,j,K){const G=j.fog,k=K.geometry,F=A.isMeshStandardMaterial?j.environment:null,$=(A.isMeshStandardMaterial?t:e).get(A.envMap||F),B=!!$&&$.mapping===oa?$.image.height:null,Y=M[A.type];A.precision!==null&&(y=i.getMaxPrecision(A.precision),y!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",y,"instead."));const V=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,U=V!==void 0?V.length:0;let ee=0;k.morphAttributes.position!==void 0&&(ee=1),k.morphAttributes.normal!==void 0&&(ee=2),k.morphAttributes.color!==void 0&&(ee=3);let X,J,ne,W;if(Y){const Ee=fn[Y];X=Ee.vertexShader,J=Ee.fragmentShader}else X=A.vertexShader,J=A.fragmentShader,d.update(A),ne=d.getVertexShaderID(A),W=d.getFragmentShaderID(A);const ce=s.getRenderTarget(),le=A.alphaTest>0,ve=A.clearcoat>0,me=A.iridescence>0;return{isWebGL2:h,shaderID:Y,shaderName:A.type,vertexShader:X,fragmentShader:J,defines:A.defines,customVertexShaderID:ne,customFragmentShaderID:W,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:y,instancing:K.isInstancedMesh===!0,instancingColor:K.isInstancedMesh===!0&&K.instanceColor!==null,supportsVertexTextures:m,outputEncoding:ce===null?s.outputEncoding:ce.isXRRenderTarget===!0?ce.texture.encoding:pn,map:!!A.map,matcap:!!A.matcap,envMap:!!$,envMapMode:$&&$.mapping,envMapCubeUVHeight:B,lightMap:!!A.lightMap,aoMap:!!A.aoMap,emissiveMap:!!A.emissiveMap,bumpMap:!!A.bumpMap,normalMap:!!A.normalMap,objectSpaceNormalMap:A.normalMapType===Nu,tangentSpaceNormalMap:A.normalMapType===Vs,decodeVideoTexture:!!A.map&&A.map.isVideoTexture===!0&&A.map.encoding===rt,clearcoat:ve,clearcoatMap:ve&&!!A.clearcoatMap,clearcoatRoughnessMap:ve&&!!A.clearcoatRoughnessMap,clearcoatNormalMap:ve&&!!A.clearcoatNormalMap,iridescence:me,iridescenceMap:me&&!!A.iridescenceMap,iridescenceThicknessMap:me&&!!A.iridescenceThicknessMap,displacementMap:!!A.displacementMap,roughnessMap:!!A.roughnessMap,metalnessMap:!!A.metalnessMap,specularMap:!!A.specularMap,specularIntensityMap:!!A.specularIntensityMap,specularColorMap:!!A.specularColorMap,opaque:A.transparent===!1&&A.blending===ki,alphaMap:!!A.alphaMap,alphaTest:le,gradientMap:!!A.gradientMap,sheen:A.sheen>0,sheenColorMap:!!A.sheenColorMap,sheenRoughnessMap:!!A.sheenRoughnessMap,transmission:A.transmission>0,transmissionMap:!!A.transmissionMap,thicknessMap:!!A.thicknessMap,combine:A.combine,vertexTangents:!!A.normalMap&&!!k.attributes.tangent,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUvs:!!A.map||!!A.bumpMap||!!A.normalMap||!!A.specularMap||!!A.alphaMap||!!A.emissiveMap||!!A.roughnessMap||!!A.metalnessMap||!!A.clearcoatMap||!!A.clearcoatRoughnessMap||!!A.clearcoatNormalMap||!!A.iridescenceMap||!!A.iridescenceThicknessMap||!!A.displacementMap||!!A.transmissionMap||!!A.thicknessMap||!!A.specularIntensityMap||!!A.specularColorMap||!!A.sheenColorMap||!!A.sheenRoughnessMap,uvsVertexOnly:!(!!A.map||!!A.bumpMap||!!A.normalMap||!!A.specularMap||!!A.alphaMap||!!A.emissiveMap||!!A.roughnessMap||!!A.metalnessMap||!!A.clearcoatNormalMap||!!A.iridescenceMap||!!A.iridescenceThicknessMap||A.transmission>0||!!A.transmissionMap||!!A.thicknessMap||!!A.specularIntensityMap||!!A.specularColorMap||A.sheen>0||!!A.sheenColorMap||!!A.sheenRoughnessMap)&&!!A.displacementMap,fog:!!G,useFog:A.fog===!0,fogExp2:G&&G.isFogExp2,flatShading:!!A.flatShading,sizeAttenuation:A.sizeAttenuation,logarithmicDepthBuffer:p,skinning:K.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:ee,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:A.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:A.toneMapped?s.toneMapping:Dn,useLegacyLights:s.useLegacyLights,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Cn,flipSided:A.side===qt,useDepthPacking:!!A.depthPacking,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionDerivatives:A.extensions&&A.extensions.derivatives,extensionFragDepth:A.extensions&&A.extensions.fragDepth,extensionDrawBuffers:A.extensions&&A.extensions.drawBuffers,extensionShaderTextureLOD:A.extensions&&A.extensions.shaderTextureLOD,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:A.customProgramCacheKey()}}function x(A){const P=[];if(A.shaderID?P.push(A.shaderID):(P.push(A.customVertexShaderID),P.push(A.customFragmentShaderID)),A.defines!==void 0)for(const z in A.defines)P.push(z),P.push(A.defines[z]);return A.isRawShaderMaterial===!1&&(T(P,A),E(P,A),P.push(s.outputEncoding)),P.push(A.customProgramCacheKey),P.join()}function T(A,P){A.push(P.precision),A.push(P.outputEncoding),A.push(P.envMapMode),A.push(P.envMapCubeUVHeight),A.push(P.combine),A.push(P.vertexUvs),A.push(P.fogExp2),A.push(P.sizeAttenuation),A.push(P.morphTargetsCount),A.push(P.morphAttributeCount),A.push(P.numDirLights),A.push(P.numPointLights),A.push(P.numSpotLights),A.push(P.numSpotLightMaps),A.push(P.numHemiLights),A.push(P.numRectAreaLights),A.push(P.numDirLightShadows),A.push(P.numPointLightShadows),A.push(P.numSpotLightShadows),A.push(P.numSpotLightShadowsWithMaps),A.push(P.shadowMapType),A.push(P.toneMapping),A.push(P.numClippingPlanes),A.push(P.numClipIntersection),A.push(P.depthPacking)}function E(A,P){u.disableAll(),P.isWebGL2&&u.enable(0),P.supportsVertexTextures&&u.enable(1),P.instancing&&u.enable(2),P.instancingColor&&u.enable(3),P.map&&u.enable(4),P.matcap&&u.enable(5),P.envMap&&u.enable(6),P.lightMap&&u.enable(7),P.aoMap&&u.enable(8),P.emissiveMap&&u.enable(9),P.bumpMap&&u.enable(10),P.normalMap&&u.enable(11),P.objectSpaceNormalMap&&u.enable(12),P.tangentSpaceNormalMap&&u.enable(13),P.clearcoat&&u.enable(14),P.clearcoatMap&&u.enable(15),P.clearcoatRoughnessMap&&u.enable(16),P.clearcoatNormalMap&&u.enable(17),P.iridescence&&u.enable(18),P.iridescenceMap&&u.enable(19),P.iridescenceThicknessMap&&u.enable(20),P.displacementMap&&u.enable(21),P.specularMap&&u.enable(22),P.roughnessMap&&u.enable(23),P.metalnessMap&&u.enable(24),P.gradientMap&&u.enable(25),P.alphaMap&&u.enable(26),P.alphaTest&&u.enable(27),P.vertexColors&&u.enable(28),P.vertexAlphas&&u.enable(29),P.vertexUvs&&u.enable(30),P.vertexTangents&&u.enable(31),P.uvsVertexOnly&&u.enable(32),A.push(u.mask),u.disableAll(),P.fog&&u.enable(0),P.useFog&&u.enable(1),P.flatShading&&u.enable(2),P.logarithmicDepthBuffer&&u.enable(3),P.skinning&&u.enable(4),P.morphTargets&&u.enable(5),P.morphNormals&&u.enable(6),P.morphColors&&u.enable(7),P.premultipliedAlpha&&u.enable(8),P.shadowMapEnabled&&u.enable(9),P.useLegacyLights&&u.enable(10),P.doubleSided&&u.enable(11),P.flipSided&&u.enable(12),P.useDepthPacking&&u.enable(13),P.dithering&&u.enable(14),P.specularIntensityMap&&u.enable(15),P.specularColorMap&&u.enable(16),P.transmission&&u.enable(17),P.transmissionMap&&u.enable(18),P.thicknessMap&&u.enable(19),P.sheen&&u.enable(20),P.sheenColorMap&&u.enable(21),P.sheenRoughnessMap&&u.enable(22),P.decodeVideoTexture&&u.enable(23),P.opaque&&u.enable(24),A.push(u.mask)}function w(A){const P=M[A.type];let z;if(P){const j=fn[P];z=Ni.clone(j.uniforms)}else z=A.uniforms;return z}function S(A,P){let z;for(let j=0,K=f.length;j<K;j++){const G=f[j];if(G.cacheKey===P){z=G,++z.usedTimes;break}}return z===void 0&&(z=new A0(s,P,A,o),f.push(z)),z}function C(A){if(--A.usedTimes===0){const P=f.indexOf(A);f[P]=f[f.length-1],f.pop(),A.destroy()}}function D(A){d.remove(A)}function O(){d.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:w,acquireProgram:S,releaseProgram:C,releaseShaderCache:D,programs:f,dispose:O}}function R0(){let s=new WeakMap;function e(o){let l=s.get(o);return l===void 0&&(l={},s.set(o,l)),l}function t(o){s.delete(o)}function n(o,l,u){s.get(o)[l]=u}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function I0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function dl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function fl(){const s=[];let e=0;const t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function l(p,m,y,M,_,x){let T=s[e];return T===void 0?(T={id:p.id,object:p,geometry:m,material:y,groupOrder:M,renderOrder:p.renderOrder,z:_,group:x},s[e]=T):(T.id=p.id,T.object=p,T.geometry=m,T.material=y,T.groupOrder=M,T.renderOrder=p.renderOrder,T.z=_,T.group=x),e++,T}function u(p,m,y,M,_,x){const T=l(p,m,y,M,_,x);y.transmission>0?n.push(T):y.transparent===!0?i.push(T):t.push(T)}function d(p,m,y,M,_,x){const T=l(p,m,y,M,_,x);y.transmission>0?n.unshift(T):y.transparent===!0?i.unshift(T):t.unshift(T)}function f(p,m){t.length>1&&t.sort(p||I0),n.length>1&&n.sort(m||dl),i.length>1&&i.sort(m||dl)}function h(){for(let p=e,m=s.length;p<m;p++){const y=s[p];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:u,unshift:d,finish:h,sort:f}}function z0(){let s=new WeakMap;function e(n,i){const o=s.get(n);let l;return o===void 0?(l=new fl,s.set(n,[l])):i>=o.length?(l=new fl,o.push(l)):l=o[i],l}function t(){s=new WeakMap}return{get:e,dispose:t}}function N0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new Je};break;case"SpotLight":t={position:new q,direction:new q,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new q,halfWidth:new q,halfHeight:new q};break}return s[e.id]=t,t}}}function F0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let O0=0;function k0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function U0(s,e){const t=new N0,n=F0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new q);const o=new q,l=new lt,u=new lt;function d(h,p){let m=0,y=0,M=0;for(let j=0;j<9;j++)i.probe[j].set(0,0,0);let _=0,x=0,T=0,E=0,w=0,S=0,C=0,D=0,O=0,A=0;h.sort(k0);const P=p===!0?Math.PI:1;for(let j=0,K=h.length;j<K;j++){const G=h[j],k=G.color,F=G.intensity,$=G.distance,B=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)m+=k.r*F*P,y+=k.g*F*P,M+=k.b*F*P;else if(G.isLightProbe)for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(G.sh.coefficients[Y],F);else if(G.isDirectionalLight){const Y=t.get(G);if(Y.color.copy(G.color).multiplyScalar(G.intensity*P),G.castShadow){const V=G.shadow,U=n.get(G);U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,i.directionalShadow[_]=U,i.directionalShadowMap[_]=B,i.directionalShadowMatrix[_]=G.shadow.matrix,S++}i.directional[_]=Y,_++}else if(G.isSpotLight){const Y=t.get(G);Y.position.setFromMatrixPosition(G.matrixWorld),Y.color.copy(k).multiplyScalar(F*P),Y.distance=$,Y.coneCos=Math.cos(G.angle),Y.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),Y.decay=G.decay,i.spot[T]=Y;const V=G.shadow;if(G.map&&(i.spotLightMap[O]=G.map,O++,V.updateMatrices(G),G.castShadow&&A++),i.spotLightMatrix[T]=V.matrix,G.castShadow){const U=n.get(G);U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,i.spotShadow[T]=U,i.spotShadowMap[T]=B,D++}T++}else if(G.isRectAreaLight){const Y=t.get(G);Y.color.copy(k).multiplyScalar(F),Y.halfWidth.set(G.width*.5,0,0),Y.halfHeight.set(0,G.height*.5,0),i.rectArea[E]=Y,E++}else if(G.isPointLight){const Y=t.get(G);if(Y.color.copy(G.color).multiplyScalar(G.intensity*P),Y.distance=G.distance,Y.decay=G.decay,G.castShadow){const V=G.shadow,U=n.get(G);U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,U.shadowCameraNear=V.camera.near,U.shadowCameraFar=V.camera.far,i.pointShadow[x]=U,i.pointShadowMap[x]=B,i.pointShadowMatrix[x]=G.shadow.matrix,C++}i.point[x]=Y,x++}else if(G.isHemisphereLight){const Y=t.get(G);Y.skyColor.copy(G.color).multiplyScalar(F*P),Y.groundColor.copy(G.groundColor).multiplyScalar(F*P),i.hemi[w]=Y,w++}}E>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=m,i.ambient[1]=y,i.ambient[2]=M;const z=i.hash;(z.directionalLength!==_||z.pointLength!==x||z.spotLength!==T||z.rectAreaLength!==E||z.hemiLength!==w||z.numDirectionalShadows!==S||z.numPointShadows!==C||z.numSpotShadows!==D||z.numSpotMaps!==O)&&(i.directional.length=_,i.spot.length=T,i.rectArea.length=E,i.point.length=x,i.hemi.length=w,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=D,i.spotShadowMap.length=D,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=D+O-A,i.spotLightMap.length=O,i.numSpotLightShadowsWithMaps=A,z.directionalLength=_,z.pointLength=x,z.spotLength=T,z.rectAreaLength=E,z.hemiLength=w,z.numDirectionalShadows=S,z.numPointShadows=C,z.numSpotShadows=D,z.numSpotMaps=O,i.version=O0++)}function f(h,p){let m=0,y=0,M=0,_=0,x=0;const T=p.matrixWorldInverse;for(let E=0,w=h.length;E<w;E++){const S=h[E];if(S.isDirectionalLight){const C=i.directional[m];C.direction.setFromMatrixPosition(S.matrixWorld),o.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(o),C.direction.transformDirection(T),m++}else if(S.isSpotLight){const C=i.spot[M];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(T),C.direction.setFromMatrixPosition(S.matrixWorld),o.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(o),C.direction.transformDirection(T),M++}else if(S.isRectAreaLight){const C=i.rectArea[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(T),u.identity(),l.copy(S.matrixWorld),l.premultiply(T),u.extractRotation(l),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),_++}else if(S.isPointLight){const C=i.point[y];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(T),y++}else if(S.isHemisphereLight){const C=i.hemi[x];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(T),x++}}}return{setup:d,setupView:f,state:i}}function hl(s,e){const t=new U0(s,e),n=[],i=[];function o(){n.length=0,i.length=0}function l(p){n.push(p)}function u(p){i.push(p)}function d(p){t.setup(n,p)}function f(p){t.setupView(n,p)}return{init:o,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:d,setupLightsView:f,pushLight:l,pushShadow:u}}function B0(s,e){let t=new WeakMap;function n(o,l=0){const u=t.get(o);let d;return u===void 0?(d=new hl(s,e),t.set(o,[d])):l>=u.length?(d=new hl(s,e),u.push(d)):d=u[l],d}function i(){t=new WeakMap}return{get:n,dispose:i}}class G0 extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class H0 extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new q,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const V0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,W0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function j0(s,e,t){let n=new Xs;const i=new Ne,o=new Ne,l=new Mt,u=new G0({depthPacking:zu}),d=new H0,f={},h=t.maxTextureSize,p={[Gn]:qt,[qt]:Gn,[Cn]:Cn},m=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:V0,fragmentShader:W0}),y=m.clone();y.defines.HORIZONTAL_PASS=1;const M=new Xt;M.setAttribute("position",new gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Pt(M,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl,this.render=function(S,C,D){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||S.length===0)return;const O=s.getRenderTarget(),A=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),z=s.state;z.setBlending(Ct),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);for(let j=0,K=S.length;j<K;j++){const G=S[j],k=G.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const F=k.getFrameExtents();if(i.multiply(F),o.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/F.x),i.x=o.x*F.x,k.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/F.y),i.y=o.y*F.y,k.mapSize.y=o.y)),k.map===null){const B=this.type!==rr?{minFilter:qe,magFilter:qe}:{};k.map=new Bt(i.x,i.y,B),k.map.texture.name=G.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const $=k.getViewportCount();for(let B=0;B<$;B++){const Y=k.getViewport(B);l.set(o.x*Y.x,o.y*Y.y,o.x*Y.z,o.y*Y.w),z.viewport(l),k.updateMatrices(G,B),n=k.getFrustum(),w(C,D,k.camera,G,this.type)}k.isPointLightShadow!==!0&&this.type===rr&&T(k,D),k.needsUpdate=!1}x.needsUpdate=!1,s.setRenderTarget(O,A,P)};function T(S,C){const D=e.update(_);m.defines.VSM_SAMPLES!==S.blurSamples&&(m.defines.VSM_SAMPLES=S.blurSamples,y.defines.VSM_SAMPLES=S.blurSamples,m.needsUpdate=!0,y.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Bt(i.x,i.y)),m.uniforms.shadow_pass.value=S.map.texture,m.uniforms.resolution.value=S.mapSize,m.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(C,null,D,m,_,null),y.uniforms.shadow_pass.value=S.mapPass.texture,y.uniforms.resolution.value=S.mapSize,y.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(C,null,D,y,_,null)}function E(S,C,D,O,A,P){let z=null;const j=D.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(j!==void 0)z=j;else if(z=D.isPointLight===!0?d:u,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const K=z.uuid,G=C.uuid;let k=f[K];k===void 0&&(k={},f[K]=k);let F=k[G];F===void 0&&(F=z.clone(),k[G]=F),z=F}return z.visible=C.visible,z.wireframe=C.wireframe,P===rr?z.side=C.shadowSide!==null?C.shadowSide:C.side:z.side=C.shadowSide!==null?C.shadowSide:p[C.side],z.alphaMap=C.alphaMap,z.alphaTest=C.alphaTest,z.map=C.map,z.clipShadows=C.clipShadows,z.clippingPlanes=C.clippingPlanes,z.clipIntersection=C.clipIntersection,z.displacementMap=C.displacementMap,z.displacementScale=C.displacementScale,z.displacementBias=C.displacementBias,z.wireframeLinewidth=C.wireframeLinewidth,z.linewidth=C.linewidth,D.isPointLight===!0&&z.isMeshDistanceMaterial===!0&&(z.referencePosition.setFromMatrixPosition(D.matrixWorld),z.nearDistance=O,z.farDistance=A),z}function w(S,C,D,O,A){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&A===rr)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,S.matrixWorld);const j=e.update(S),K=S.material;if(Array.isArray(K)){const G=j.groups;for(let k=0,F=G.length;k<F;k++){const $=G[k],B=K[$.materialIndex];if(B&&B.visible){const Y=E(S,B,O,D.near,D.far,A);s.renderBufferDirect(D,null,j,Y,S,$)}}}else if(K.visible){const G=E(S,K,O,D.near,D.far,A);s.renderBufferDirect(D,null,j,G,S,null)}}const z=S.children;for(let j=0,K=z.length;j<K;j++)w(z[j],C,D,O,A)}}function q0(s,e,t){const n=t.isWebGL2;function i(){let H=!1;const ae=new Mt;let fe=null;const we=new Mt(0,0,0,0);return{setMask:function(De){fe!==De&&!H&&(s.colorMask(De,De,De,De),fe=De)},setLocked:function(De){H=De},setClear:function(De,it,xt,Rt,on){on===!0&&(De*=Rt,it*=Rt,xt*=Rt),ae.set(De,it,xt,Rt),we.equals(ae)===!1&&(s.clearColor(De,it,xt,Rt),we.copy(ae))},reset:function(){H=!1,fe=null,we.set(-1,0,0,0)}}}function o(){let H=!1,ae=null,fe=null,we=null;return{setTest:function(De){De?le(2929):ve(2929)},setMask:function(De){ae!==De&&!H&&(s.depthMask(De),ae=De)},setFunc:function(De){if(fe!==De){switch(De){case ou:s.depthFunc(512);break;case lu:s.depthFunc(519);break;case cu:s.depthFunc(513);break;case As:s.depthFunc(515);break;case uu:s.depthFunc(514);break;case du:s.depthFunc(518);break;case fu:s.depthFunc(516);break;case hu:s.depthFunc(517);break;default:s.depthFunc(515)}fe=De}},setLocked:function(De){H=De},setClear:function(De){we!==De&&(s.clearDepth(De),we=De)},reset:function(){H=!1,ae=null,fe=null,we=null}}}function l(){let H=!1,ae=null,fe=null,we=null,De=null,it=null,xt=null,Rt=null,on=null;return{setTest:function(ct){H||(ct?le(2960):ve(2960))},setMask:function(ct){ae!==ct&&!H&&(s.stencilMask(ct),ae=ct)},setFunc:function(ct,Yt,ln){(fe!==ct||we!==Yt||De!==ln)&&(s.stencilFunc(ct,Yt,ln),fe=ct,we=Yt,De=ln)},setOp:function(ct,Yt,ln){(it!==ct||xt!==Yt||Rt!==ln)&&(s.stencilOp(ct,Yt,ln),it=ct,xt=Yt,Rt=ln)},setLocked:function(ct){H=ct},setClear:function(ct){on!==ct&&(s.clearStencil(ct),on=ct)},reset:function(){H=!1,ae=null,fe=null,we=null,De=null,it=null,xt=null,Rt=null,on=null}}}const u=new i,d=new o,f=new l,h=new WeakMap,p=new WeakMap;let m={},y={},M=new WeakMap,_=[],x=null,T=!1,E=null,w=null,S=null,C=null,D=null,O=null,A=null,P=!1,z=null,j=null,K=null,G=null,k=null;const F=s.getParameter(35661);let $=!1,B=0;const Y=s.getParameter(7938);Y.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(Y)[1]),$=B>=1):Y.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),$=B>=2);let V=null,U={};const ee=s.getParameter(3088),X=s.getParameter(2978),J=new Mt().fromArray(ee),ne=new Mt().fromArray(X);function W(H,ae,fe){const we=new Uint8Array(4),De=s.createTexture();s.bindTexture(H,De),s.texParameteri(H,10241,9728),s.texParameteri(H,10240,9728);for(let it=0;it<fe;it++)s.texImage2D(ae+it,0,6408,1,1,0,6408,5121,we);return De}const ce={};ce[3553]=W(3553,3553,1),ce[34067]=W(34067,34069,6),u.setClear(0,0,0,1),d.setClear(1),f.setClear(0),le(2929),d.setFunc(As),Fe(!1),je(to),le(2884),ze(Ct);function le(H){m[H]!==!0&&(s.enable(H),m[H]=!0)}function ve(H){m[H]!==!1&&(s.disable(H),m[H]=!1)}function me(H,ae){return y[H]!==ae?(s.bindFramebuffer(H,ae),y[H]=ae,n&&(H===36009&&(y[36160]=ae),H===36160&&(y[36009]=ae)),!0):!1}function xe(H,ae){let fe=_,we=!1;if(H)if(fe=M.get(ae),fe===void 0&&(fe=[],M.set(ae,fe)),H.isWebGLMultipleRenderTargets){const De=H.texture;if(fe.length!==De.length||fe[0]!==36064){for(let it=0,xt=De.length;it<xt;it++)fe[it]=36064+it;fe.length=De.length,we=!0}}else fe[0]!==36064&&(fe[0]=36064,we=!0);else fe[0]!==1029&&(fe[0]=1029,we=!0);we&&(t.isWebGL2?s.drawBuffers(fe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(fe))}function Ee(H){return x!==H?(s.useProgram(H),x=H,!0):!1}const Le={[Un]:32774,[Jc]:32778,[eu]:32779};if(n)Le[ao]=32775,Le[so]=32776;else{const H=e.get("EXT_blend_minmax");H!==null&&(Le[ao]=H.MIN_EXT,Le[so]=H.MAX_EXT)}const Ie={[Es]:0,[tu]:1,[nu]:768,[Vl]:770,[su]:776,[ql]:774,[jl]:772,[iu]:769,[Wl]:771,[au]:775,[ru]:773};function ze(H,ae,fe,we,De,it,xt,Rt){if(H===Ct){T===!0&&(ve(3042),T=!1);return}if(T===!1&&(le(3042),T=!0),H!==Hl){if(H!==E||Rt!==P){if((w!==Un||D!==Un)&&(s.blendEquation(32774),w=Un,D=Un),Rt)switch(H){case ki:s.blendFuncSeparate(1,771,1,771);break;case no:s.blendFunc(1,1);break;case io:s.blendFuncSeparate(0,769,0,1);break;case ro:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case ki:s.blendFuncSeparate(770,771,1,771);break;case no:s.blendFunc(770,1);break;case io:s.blendFuncSeparate(0,769,0,1);break;case ro:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}S=null,C=null,O=null,A=null,E=H,P=Rt}return}De=De||ae,it=it||fe,xt=xt||we,(ae!==w||De!==D)&&(s.blendEquationSeparate(Le[ae],Le[De]),w=ae,D=De),(fe!==S||we!==C||it!==O||xt!==A)&&(s.blendFuncSeparate(Ie[fe],Ie[we],Ie[it],Ie[xt]),S=fe,C=we,O=it,A=xt),E=H,P=!1}function We(H,ae){H.side===Cn?ve(2884):le(2884);let fe=H.side===qt;ae&&(fe=!fe),Fe(fe),H.blending===ki&&H.transparent===!1?ze(Ct):ze(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.premultipliedAlpha),d.setFunc(H.depthFunc),d.setTest(H.depthTest),d.setMask(H.depthWrite),u.setMask(H.colorWrite);const we=H.stencilWrite;f.setTest(we),we&&(f.setMask(H.stencilWriteMask),f.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),f.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ke(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?le(32926):ve(32926)}function Fe(H){z!==H&&(H?s.frontFace(2304):s.frontFace(2305),z=H)}function je(H){H!==Kc?(le(2884),H!==j&&(H===to?s.cullFace(1029):H===Qc?s.cullFace(1028):s.cullFace(1032))):ve(2884),j=H}function Ue(H){H!==K&&($&&s.lineWidth(H),K=H)}function ke(H,ae,fe){H?(le(32823),(G!==ae||k!==fe)&&(s.polygonOffset(ae,fe),G=ae,k=fe)):ve(32823)}function tt(H){H?le(3089):ve(3089)}function et(H){H===void 0&&(H=33984+F-1),V!==H&&(s.activeTexture(H),V=H)}function N(H,ae,fe){fe===void 0&&(V===null?fe=33984+F-1:fe=V);let we=U[fe];we===void 0&&(we={type:void 0,texture:void 0},U[fe]=we),(we.type!==H||we.texture!==ae)&&(V!==fe&&(s.activeTexture(fe),V=fe),s.bindTexture(H,ae||ce[H]),we.type=H,we.texture=ae)}function L(){const H=U[V];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function re(){try{s.compressedTexImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function de(){try{s.texSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ge(){try{s.texSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function I(){try{s.texStorage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ue(){try{s.texStorage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _e(){try{s.texImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Se(){try{s.texImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Te(H){J.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),J.copy(H))}function Ae(H){ne.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),ne.copy(H))}function Be(H,ae){let fe=p.get(ae);fe===void 0&&(fe=new WeakMap,p.set(ae,fe));let we=fe.get(H);we===void 0&&(we=s.getUniformBlockIndex(ae,H.name),fe.set(H,we))}function Ke(H,ae){const we=p.get(ae).get(H);h.get(ae)!==we&&(s.uniformBlockBinding(ae,we,H.__bindingPointIndex),h.set(ae,we))}function Xe(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),m={},V=null,U={},y={},M=new WeakMap,_=[],x=null,T=!1,E=null,w=null,S=null,C=null,D=null,O=null,A=null,P=!1,z=null,j=null,K=null,G=null,k=null,J.set(0,0,s.canvas.width,s.canvas.height),ne.set(0,0,s.canvas.width,s.canvas.height),u.reset(),d.reset(),f.reset()}return{buffers:{color:u,depth:d,stencil:f},enable:le,disable:ve,bindFramebuffer:me,drawBuffers:xe,useProgram:Ee,setBlending:ze,setMaterial:We,setFlipSided:Fe,setCullFace:je,setLineWidth:Ue,setPolygonOffset:ke,setScissorTest:tt,activeTexture:et,bindTexture:N,unbindTexture:L,compressedTexImage2D:re,compressedTexImage3D:pe,texImage2D:_e,texImage3D:Se,updateUBOMapping:Be,uniformBlockBinding:Ke,texStorage2D:I,texStorage3D:ue,texSubImage2D:de,texSubImage3D:ge,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Me,scissor:Te,viewport:Ae,reset:Xe}}function X0(s,e,t,n,i,o,l){const u=i.isWebGL2,d=i.maxTextures,f=i.maxCubemapSize,h=i.maxTextureSize,p=i.maxSamples,m=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,y=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),M=new WeakMap;let _;const x=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(N,L){return T?new OffscreenCanvas(N,L):hr("canvas")}function w(N,L,re,pe){let de=1;if((N.width>pe||N.height>pe)&&(de=pe/Math.max(N.width,N.height)),de<1||L===!0)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap){const ge=L?ec:Math.floor,Ce=ge(de*N.width),Me=ge(de*N.height);_===void 0&&(_=E(Ce,Me));const I=re?E(Ce,Me):_;return I.width=Ce,I.height=Me,I.getContext("2d").drawImage(N,0,0,Ce,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+Ce+"x"+Me+")."),I}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),N;return N}function S(N){return Is(N.width)&&Is(N.height)}function C(N){return u?!1:N.wrapS!==Ot||N.wrapT!==Ot||N.minFilter!==qe&&N.minFilter!==Qt}function D(N,L){return N.generateMipmaps&&L&&N.minFilter!==qe&&N.minFilter!==Qt}function O(N){s.generateMipmap(N)}function A(N,L,re,pe,de=!1){if(u===!1)return L;if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ge=L;return L===6403&&(re===5126&&(ge=33326),re===5131&&(ge=33325),re===5121&&(ge=33321)),L===33319&&(re===5126&&(ge=33328),re===5131&&(ge=33327),re===5121&&(ge=33323)),L===6408&&(re===5126&&(ge=34836),re===5131&&(ge=34842),re===5121&&(ge=pe===rt&&de===!1?35907:32856),re===32819&&(ge=32854),re===32820&&(ge=32855)),(ge===33325||ge===33326||ge===33327||ge===33328||ge===34842||ge===34836)&&e.get("EXT_color_buffer_float"),ge}function P(N,L,re){return D(N,re)===!0||N.isFramebufferTexture&&N.minFilter!==qe&&N.minFilter!==Qt?Math.log2(Math.max(L.width,L.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?L.mipmaps.length:1}function z(N){return N===qe||N===oo||N===wa?9728:9729}function j(N){const L=N.target;L.removeEventListener("dispose",j),G(L),L.isVideoTexture&&M.delete(L)}function K(N){const L=N.target;L.removeEventListener("dispose",K),F(L)}function G(N){const L=n.get(N);if(L.__webglInit===void 0)return;const re=N.source,pe=x.get(re);if(pe){const de=pe[L.__cacheKey];de.usedTimes--,de.usedTimes===0&&k(N),Object.keys(pe).length===0&&x.delete(re)}n.remove(N)}function k(N){const L=n.get(N);s.deleteTexture(L.__webglTexture);const re=N.source,pe=x.get(re);delete pe[L.__cacheKey],l.memory.textures--}function F(N){const L=N.texture,re=n.get(N),pe=n.get(L);if(pe.__webglTexture!==void 0&&(s.deleteTexture(pe.__webglTexture),l.memory.textures--),N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let de=0;de<6;de++)s.deleteFramebuffer(re.__webglFramebuffer[de]),re.__webglDepthbuffer&&s.deleteRenderbuffer(re.__webglDepthbuffer[de]);else{if(s.deleteFramebuffer(re.__webglFramebuffer),re.__webglDepthbuffer&&s.deleteRenderbuffer(re.__webglDepthbuffer),re.__webglMultisampledFramebuffer&&s.deleteFramebuffer(re.__webglMultisampledFramebuffer),re.__webglColorRenderbuffer)for(let de=0;de<re.__webglColorRenderbuffer.length;de++)re.__webglColorRenderbuffer[de]&&s.deleteRenderbuffer(re.__webglColorRenderbuffer[de]);re.__webglDepthRenderbuffer&&s.deleteRenderbuffer(re.__webglDepthRenderbuffer)}if(N.isWebGLMultipleRenderTargets)for(let de=0,ge=L.length;de<ge;de++){const Ce=n.get(L[de]);Ce.__webglTexture&&(s.deleteTexture(Ce.__webglTexture),l.memory.textures--),n.remove(L[de])}n.remove(L),n.remove(N)}let $=0;function B(){$=0}function Y(){const N=$;return N>=d&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+d),$+=1,N}function V(N){const L=[];return L.push(N.wrapS),L.push(N.wrapT),L.push(N.wrapR||0),L.push(N.magFilter),L.push(N.minFilter),L.push(N.anisotropy),L.push(N.internalFormat),L.push(N.format),L.push(N.type),L.push(N.generateMipmaps),L.push(N.premultiplyAlpha),L.push(N.flipY),L.push(N.unpackAlignment),L.push(N.encoding),L.join()}function U(N,L){const re=n.get(N);if(N.isVideoTexture&&tt(N),N.isRenderTargetTexture===!1&&N.version>0&&re.__version!==N.version){const pe=N.image;if(pe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(pe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve(re,N,L);return}}t.bindTexture(3553,re.__webglTexture,33984+L)}function ee(N,L){const re=n.get(N);if(N.version>0&&re.__version!==N.version){ve(re,N,L);return}t.bindTexture(35866,re.__webglTexture,33984+L)}function X(N,L){const re=n.get(N);if(N.version>0&&re.__version!==N.version){ve(re,N,L);return}t.bindTexture(32879,re.__webglTexture,33984+L)}function J(N,L){const re=n.get(N);if(N.version>0&&re.__version!==N.version){me(re,N,L);return}t.bindTexture(34067,re.__webglTexture,33984+L)}const ne={[ci]:10497,[Ot]:33071,[Ls]:33648},W={[qe]:9728,[oo]:9984,[wa]:9986,[Qt]:9729,[xu]:9985,[ur]:9987};function ce(N,L,re){if(re?(s.texParameteri(N,10242,ne[L.wrapS]),s.texParameteri(N,10243,ne[L.wrapT]),(N===32879||N===35866)&&s.texParameteri(N,32882,ne[L.wrapR]),s.texParameteri(N,10240,W[L.magFilter]),s.texParameteri(N,10241,W[L.minFilter])):(s.texParameteri(N,10242,33071),s.texParameteri(N,10243,33071),(N===32879||N===35866)&&s.texParameteri(N,32882,33071),(L.wrapS!==Ot||L.wrapT!==Ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(N,10240,z(L.magFilter)),s.texParameteri(N,10241,z(L.minFilter)),L.minFilter!==qe&&L.minFilter!==Qt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const pe=e.get("EXT_texture_filter_anisotropic");if(L.magFilter===qe||L.minFilter!==wa&&L.minFilter!==ur||L.type===jt&&e.has("OES_texture_float_linear")===!1||u===!1&&L.type===dr&&e.has("OES_texture_half_float_linear")===!1)return;(L.anisotropy>1||n.get(L).__currentAnisotropy)&&(s.texParameterf(N,pe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,i.getMaxAnisotropy())),n.get(L).__currentAnisotropy=L.anisotropy)}}function le(N,L){let re=!1;N.__webglInit===void 0&&(N.__webglInit=!0,L.addEventListener("dispose",j));const pe=L.source;let de=x.get(pe);de===void 0&&(de={},x.set(pe,de));const ge=V(L);if(ge!==N.__cacheKey){de[ge]===void 0&&(de[ge]={texture:s.createTexture(),usedTimes:0},l.memory.textures++,re=!0),de[ge].usedTimes++;const Ce=de[N.__cacheKey];Ce!==void 0&&(de[N.__cacheKey].usedTimes--,Ce.usedTimes===0&&k(L)),N.__cacheKey=ge,N.__webglTexture=de[ge].texture}return re}function ve(N,L,re){let pe=3553;(L.isDataArrayTexture||L.isCompressedArrayTexture)&&(pe=35866),L.isData3DTexture&&(pe=32879);const de=le(N,L),ge=L.source;t.bindTexture(pe,N.__webglTexture,33984+re);const Ce=n.get(ge);if(ge.version!==Ce.__version||de===!0){t.activeTexture(33984+re),s.pixelStorei(37440,L.flipY),s.pixelStorei(37441,L.premultiplyAlpha),s.pixelStorei(3317,L.unpackAlignment),s.pixelStorei(37443,0);const Me=C(L)&&S(L.image)===!1;let I=w(L.image,Me,!1,h);I=et(L,I);const ue=S(I)||u,_e=o.convert(L.format,L.encoding);let Se=o.convert(L.type),Te=A(L.internalFormat,_e,Se,L.encoding,L.isVideoTexture);ce(pe,L,ue);let Ae;const Be=L.mipmaps,Ke=u&&L.isVideoTexture!==!0,Xe=Ce.__version===void 0||de===!0,H=P(L,I,ue);if(L.isDepthTexture)Te=6402,u?L.type===jt?Te=36012:L.type===ii?Te=33190:L.type===si?Te=35056:Te=33189:L.type===jt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),L.format===oi&&Te===6402&&L.type!==Zl&&L.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),L.type=ii,Se=o.convert(L.type)),L.format===di&&Te===6402&&(Te=34041,L.type!==si&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),L.type=si,Se=o.convert(L.type))),Xe&&(Ke?t.texStorage2D(3553,1,Te,I.width,I.height):t.texImage2D(3553,0,Te,I.width,I.height,0,_e,Se,null));else if(L.isDataTexture)if(Be.length>0&&ue){Ke&&Xe&&t.texStorage2D(3553,H,Te,Be[0].width,Be[0].height);for(let ae=0,fe=Be.length;ae<fe;ae++)Ae=Be[ae],Ke?t.texSubImage2D(3553,ae,0,0,Ae.width,Ae.height,_e,Se,Ae.data):t.texImage2D(3553,ae,Te,Ae.width,Ae.height,0,_e,Se,Ae.data);L.generateMipmaps=!1}else Ke?(Xe&&t.texStorage2D(3553,H,Te,I.width,I.height),t.texSubImage2D(3553,0,0,0,I.width,I.height,_e,Se,I.data)):t.texImage2D(3553,0,Te,I.width,I.height,0,_e,Se,I.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){Ke&&Xe&&t.texStorage3D(35866,H,Te,Be[0].width,Be[0].height,I.depth);for(let ae=0,fe=Be.length;ae<fe;ae++)Ae=Be[ae],L.format!==Dt?_e!==null?Ke?t.compressedTexSubImage3D(35866,ae,0,0,0,Ae.width,Ae.height,I.depth,_e,Ae.data,0,0):t.compressedTexImage3D(35866,ae,Te,Ae.width,Ae.height,I.depth,0,Ae.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?t.texSubImage3D(35866,ae,0,0,0,Ae.width,Ae.height,I.depth,_e,Se,Ae.data):t.texImage3D(35866,ae,Te,Ae.width,Ae.height,I.depth,0,_e,Se,Ae.data)}else{Ke&&Xe&&t.texStorage2D(3553,H,Te,Be[0].width,Be[0].height);for(let ae=0,fe=Be.length;ae<fe;ae++)Ae=Be[ae],L.format!==Dt?_e!==null?Ke?t.compressedTexSubImage2D(3553,ae,0,0,Ae.width,Ae.height,_e,Ae.data):t.compressedTexImage2D(3553,ae,Te,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?t.texSubImage2D(3553,ae,0,0,Ae.width,Ae.height,_e,Se,Ae.data):t.texImage2D(3553,ae,Te,Ae.width,Ae.height,0,_e,Se,Ae.data)}else if(L.isDataArrayTexture)Ke?(Xe&&t.texStorage3D(35866,H,Te,I.width,I.height,I.depth),t.texSubImage3D(35866,0,0,0,0,I.width,I.height,I.depth,_e,Se,I.data)):t.texImage3D(35866,0,Te,I.width,I.height,I.depth,0,_e,Se,I.data);else if(L.isData3DTexture)Ke?(Xe&&t.texStorage3D(32879,H,Te,I.width,I.height,I.depth),t.texSubImage3D(32879,0,0,0,0,I.width,I.height,I.depth,_e,Se,I.data)):t.texImage3D(32879,0,Te,I.width,I.height,I.depth,0,_e,Se,I.data);else if(L.isFramebufferTexture){if(Xe)if(Ke)t.texStorage2D(3553,H,Te,I.width,I.height);else{let ae=I.width,fe=I.height;for(let we=0;we<H;we++)t.texImage2D(3553,we,Te,ae,fe,0,_e,Se,null),ae>>=1,fe>>=1}}else if(Be.length>0&&ue){Ke&&Xe&&t.texStorage2D(3553,H,Te,Be[0].width,Be[0].height);for(let ae=0,fe=Be.length;ae<fe;ae++)Ae=Be[ae],Ke?t.texSubImage2D(3553,ae,0,0,_e,Se,Ae):t.texImage2D(3553,ae,Te,_e,Se,Ae);L.generateMipmaps=!1}else Ke?(Xe&&t.texStorage2D(3553,H,Te,I.width,I.height),t.texSubImage2D(3553,0,0,0,_e,Se,I)):t.texImage2D(3553,0,Te,_e,Se,I);D(L,ue)&&O(pe),Ce.__version=ge.version,L.onUpdate&&L.onUpdate(L)}N.__version=L.version}function me(N,L,re){if(L.image.length!==6)return;const pe=le(N,L),de=L.source;t.bindTexture(34067,N.__webglTexture,33984+re);const ge=n.get(de);if(de.version!==ge.__version||pe===!0){t.activeTexture(33984+re),s.pixelStorei(37440,L.flipY),s.pixelStorei(37441,L.premultiplyAlpha),s.pixelStorei(3317,L.unpackAlignment),s.pixelStorei(37443,0);const Ce=L.isCompressedTexture||L.image[0].isCompressedTexture,Me=L.image[0]&&L.image[0].isDataTexture,I=[];for(let ae=0;ae<6;ae++)!Ce&&!Me?I[ae]=w(L.image[ae],!1,!0,f):I[ae]=Me?L.image[ae].image:L.image[ae],I[ae]=et(L,I[ae]);const ue=I[0],_e=S(ue)||u,Se=o.convert(L.format,L.encoding),Te=o.convert(L.type),Ae=A(L.internalFormat,Se,Te,L.encoding),Be=u&&L.isVideoTexture!==!0,Ke=ge.__version===void 0||pe===!0;let Xe=P(L,ue,_e);ce(34067,L,_e);let H;if(Ce){Be&&Ke&&t.texStorage2D(34067,Xe,Ae,ue.width,ue.height);for(let ae=0;ae<6;ae++){H=I[ae].mipmaps;for(let fe=0;fe<H.length;fe++){const we=H[fe];L.format!==Dt?Se!==null?Be?t.compressedTexSubImage2D(34069+ae,fe,0,0,we.width,we.height,Se,we.data):t.compressedTexImage2D(34069+ae,fe,Ae,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?t.texSubImage2D(34069+ae,fe,0,0,we.width,we.height,Se,Te,we.data):t.texImage2D(34069+ae,fe,Ae,we.width,we.height,0,Se,Te,we.data)}}}else{H=L.mipmaps,Be&&Ke&&(H.length>0&&Xe++,t.texStorage2D(34067,Xe,Ae,I[0].width,I[0].height));for(let ae=0;ae<6;ae++)if(Me){Be?t.texSubImage2D(34069+ae,0,0,0,I[ae].width,I[ae].height,Se,Te,I[ae].data):t.texImage2D(34069+ae,0,Ae,I[ae].width,I[ae].height,0,Se,Te,I[ae].data);for(let fe=0;fe<H.length;fe++){const De=H[fe].image[ae].image;Be?t.texSubImage2D(34069+ae,fe+1,0,0,De.width,De.height,Se,Te,De.data):t.texImage2D(34069+ae,fe+1,Ae,De.width,De.height,0,Se,Te,De.data)}}else{Be?t.texSubImage2D(34069+ae,0,0,0,Se,Te,I[ae]):t.texImage2D(34069+ae,0,Ae,Se,Te,I[ae]);for(let fe=0;fe<H.length;fe++){const we=H[fe];Be?t.texSubImage2D(34069+ae,fe+1,0,0,Se,Te,we.image[ae]):t.texImage2D(34069+ae,fe+1,Ae,Se,Te,we.image[ae])}}}D(L,_e)&&O(34067),ge.__version=de.version,L.onUpdate&&L.onUpdate(L)}N.__version=L.version}function xe(N,L,re,pe,de){const ge=o.convert(re.format,re.encoding),Ce=o.convert(re.type),Me=A(re.internalFormat,ge,Ce,re.encoding);n.get(L).__hasExternalTextures||(de===32879||de===35866?t.texImage3D(de,0,Me,L.width,L.height,L.depth,0,ge,Ce,null):t.texImage2D(de,0,Me,L.width,L.height,0,ge,Ce,null)),t.bindFramebuffer(36160,N),ke(L)?m.framebufferTexture2DMultisampleEXT(36160,pe,de,n.get(re).__webglTexture,0,Ue(L)):(de===3553||de>=34069&&de<=34074)&&s.framebufferTexture2D(36160,pe,de,n.get(re).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ee(N,L,re){if(s.bindRenderbuffer(36161,N),L.depthBuffer&&!L.stencilBuffer){let pe=33189;if(re||ke(L)){const de=L.depthTexture;de&&de.isDepthTexture&&(de.type===jt?pe=36012:de.type===ii&&(pe=33190));const ge=Ue(L);ke(L)?m.renderbufferStorageMultisampleEXT(36161,ge,pe,L.width,L.height):s.renderbufferStorageMultisample(36161,ge,pe,L.width,L.height)}else s.renderbufferStorage(36161,pe,L.width,L.height);s.framebufferRenderbuffer(36160,36096,36161,N)}else if(L.depthBuffer&&L.stencilBuffer){const pe=Ue(L);re&&ke(L)===!1?s.renderbufferStorageMultisample(36161,pe,35056,L.width,L.height):ke(L)?m.renderbufferStorageMultisampleEXT(36161,pe,35056,L.width,L.height):s.renderbufferStorage(36161,34041,L.width,L.height),s.framebufferRenderbuffer(36160,33306,36161,N)}else{const pe=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let de=0;de<pe.length;de++){const ge=pe[de],Ce=o.convert(ge.format,ge.encoding),Me=o.convert(ge.type),I=A(ge.internalFormat,Ce,Me,ge.encoding),ue=Ue(L);re&&ke(L)===!1?s.renderbufferStorageMultisample(36161,ue,I,L.width,L.height):ke(L)?m.renderbufferStorageMultisampleEXT(36161,ue,I,L.width,L.height):s.renderbufferStorage(36161,I,L.width,L.height)}}s.bindRenderbuffer(36161,null)}function Le(N,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,N),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(L.depthTexture).__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),U(L.depthTexture,0);const pe=n.get(L.depthTexture).__webglTexture,de=Ue(L);if(L.depthTexture.format===oi)ke(L)?m.framebufferTexture2DMultisampleEXT(36160,36096,3553,pe,0,de):s.framebufferTexture2D(36160,36096,3553,pe,0);else if(L.depthTexture.format===di)ke(L)?m.framebufferTexture2DMultisampleEXT(36160,33306,3553,pe,0,de):s.framebufferTexture2D(36160,33306,3553,pe,0);else throw new Error("Unknown depthTexture format")}function Ie(N){const L=n.get(N),re=N.isWebGLCubeRenderTarget===!0;if(N.depthTexture&&!L.__autoAllocateDepthBuffer){if(re)throw new Error("target.depthTexture not supported in Cube render targets");Le(L.__webglFramebuffer,N)}else if(re){L.__webglDepthbuffer=[];for(let pe=0;pe<6;pe++)t.bindFramebuffer(36160,L.__webglFramebuffer[pe]),L.__webglDepthbuffer[pe]=s.createRenderbuffer(),Ee(L.__webglDepthbuffer[pe],N,!1)}else t.bindFramebuffer(36160,L.__webglFramebuffer),L.__webglDepthbuffer=s.createRenderbuffer(),Ee(L.__webglDepthbuffer,N,!1);t.bindFramebuffer(36160,null)}function ze(N,L,re){const pe=n.get(N);L!==void 0&&xe(pe.__webglFramebuffer,N,N.texture,36064,3553),re!==void 0&&Ie(N)}function We(N){const L=N.texture,re=n.get(N),pe=n.get(L);N.addEventListener("dispose",K),N.isWebGLMultipleRenderTargets!==!0&&(pe.__webglTexture===void 0&&(pe.__webglTexture=s.createTexture()),pe.__version=L.version,l.memory.textures++);const de=N.isWebGLCubeRenderTarget===!0,ge=N.isWebGLMultipleRenderTargets===!0,Ce=S(N)||u;if(de){re.__webglFramebuffer=[];for(let Me=0;Me<6;Me++)re.__webglFramebuffer[Me]=s.createFramebuffer()}else{if(re.__webglFramebuffer=s.createFramebuffer(),ge)if(i.drawBuffers){const Me=N.texture;for(let I=0,ue=Me.length;I<ue;I++){const _e=n.get(Me[I]);_e.__webglTexture===void 0&&(_e.__webglTexture=s.createTexture(),l.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(u&&N.samples>0&&ke(N)===!1){const Me=ge?L:[L];re.__webglMultisampledFramebuffer=s.createFramebuffer(),re.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,re.__webglMultisampledFramebuffer);for(let I=0;I<Me.length;I++){const ue=Me[I];re.__webglColorRenderbuffer[I]=s.createRenderbuffer(),s.bindRenderbuffer(36161,re.__webglColorRenderbuffer[I]);const _e=o.convert(ue.format,ue.encoding),Se=o.convert(ue.type),Te=A(ue.internalFormat,_e,Se,ue.encoding,N.isXRRenderTarget===!0),Ae=Ue(N);s.renderbufferStorageMultisample(36161,Ae,Te,N.width,N.height),s.framebufferRenderbuffer(36160,36064+I,36161,re.__webglColorRenderbuffer[I])}s.bindRenderbuffer(36161,null),N.depthBuffer&&(re.__webglDepthRenderbuffer=s.createRenderbuffer(),Ee(re.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(36160,null)}}if(de){t.bindTexture(34067,pe.__webglTexture),ce(34067,L,Ce);for(let Me=0;Me<6;Me++)xe(re.__webglFramebuffer[Me],N,L,36064,34069+Me);D(L,Ce)&&O(34067),t.unbindTexture()}else if(ge){const Me=N.texture;for(let I=0,ue=Me.length;I<ue;I++){const _e=Me[I],Se=n.get(_e);t.bindTexture(3553,Se.__webglTexture),ce(3553,_e,Ce),xe(re.__webglFramebuffer,N,_e,36064+I,3553),D(_e,Ce)&&O(3553)}t.unbindTexture()}else{let Me=3553;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(u?Me=N.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Me,pe.__webglTexture),ce(Me,L,Ce),xe(re.__webglFramebuffer,N,L,36064,Me),D(L,Ce)&&O(Me),t.unbindTexture()}N.depthBuffer&&Ie(N)}function Fe(N){const L=S(N)||u,re=N.isWebGLMultipleRenderTargets===!0?N.texture:[N.texture];for(let pe=0,de=re.length;pe<de;pe++){const ge=re[pe];if(D(ge,L)){const Ce=N.isWebGLCubeRenderTarget?34067:3553,Me=n.get(ge).__webglTexture;t.bindTexture(Ce,Me),O(Ce),t.unbindTexture()}}}function je(N){if(u&&N.samples>0&&ke(N)===!1){const L=N.isWebGLMultipleRenderTargets?N.texture:[N.texture],re=N.width,pe=N.height;let de=16384;const ge=[],Ce=N.stencilBuffer?33306:36096,Me=n.get(N),I=N.isWebGLMultipleRenderTargets===!0;if(I)for(let ue=0;ue<L.length;ue++)t.bindFramebuffer(36160,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+ue,36161,null),t.bindFramebuffer(36160,Me.__webglFramebuffer),s.framebufferTexture2D(36009,36064+ue,3553,null,0);t.bindFramebuffer(36008,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,Me.__webglFramebuffer);for(let ue=0;ue<L.length;ue++){ge.push(36064+ue),N.depthBuffer&&ge.push(Ce);const _e=Me.__ignoreDepthValues!==void 0?Me.__ignoreDepthValues:!1;if(_e===!1&&(N.depthBuffer&&(de|=256),N.stencilBuffer&&(de|=1024)),I&&s.framebufferRenderbuffer(36008,36064,36161,Me.__webglColorRenderbuffer[ue]),_e===!0&&(s.invalidateFramebuffer(36008,[Ce]),s.invalidateFramebuffer(36009,[Ce])),I){const Se=n.get(L[ue]).__webglTexture;s.framebufferTexture2D(36009,36064,3553,Se,0)}s.blitFramebuffer(0,0,re,pe,0,0,re,pe,de,9728),y&&s.invalidateFramebuffer(36008,ge)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),I)for(let ue=0;ue<L.length;ue++){t.bindFramebuffer(36160,Me.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+ue,36161,Me.__webglColorRenderbuffer[ue]);const _e=n.get(L[ue]).__webglTexture;t.bindFramebuffer(36160,Me.__webglFramebuffer),s.framebufferTexture2D(36009,36064+ue,3553,_e,0)}t.bindFramebuffer(36009,Me.__webglMultisampledFramebuffer)}}function Ue(N){return Math.min(p,N.samples)}function ke(N){const L=n.get(N);return u&&N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function tt(N){const L=l.render.frame;M.get(N)!==L&&(M.set(N,L),N.update())}function et(N,L){const re=N.encoding,pe=N.format,de=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||N.format===Rs||re!==pn&&(re===rt?u===!1?e.has("EXT_sRGB")===!0&&pe===Dt?(N.format=Rs,N.minFilter=Qt,N.generateMipmaps=!1):L=nc.sRGBToLinear(L):(pe!==Dt||de!==ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",re)),L}this.allocateTextureUnit=Y,this.resetTextureUnits=B,this.setTexture2D=U,this.setTexture2DArray=ee,this.setTexture3D=X,this.setTextureCube=J,this.rebindTextures=ze,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ke}function Y0(s,e,t){const n=t.isWebGL2;function i(o,l=null){let u;if(o===ui)return 5121;if(o===Su)return 32819;if(o===wu)return 32820;if(o===yu)return 5120;if(o===bu)return 5122;if(o===Zl)return 5123;if(o===Mu)return 5124;if(o===ii)return 5125;if(o===jt)return 5126;if(o===dr)return n?5131:(u=e.get("OES_texture_half_float"),u!==null?u.HALF_FLOAT_OES:null);if(o===Tu)return 6406;if(o===Dt)return 6408;if(o===Kl)return 6409;if(o===Eu)return 6410;if(o===oi)return 6402;if(o===di)return 34041;if(o===Rs)return u=e.get("EXT_sRGB"),u!==null?u.SRGB_ALPHA_EXT:null;if(o===Ql)return 6403;if(o===Au)return 36244;if(o===Cu)return 33319;if(o===Du)return 33320;if(o===Pu)return 36249;if(o===Ta||o===Ea||o===Aa||o===Ca)if(l===rt)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(o===Ta)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===Ea)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Aa)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Ca)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(o===Ta)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Ea)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Aa)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Ca)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===lo||o===co||o===uo||o===fo)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(o===lo)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===co)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===uo)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===fo)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===Lu)return u=e.get("WEBGL_compressed_texture_etc1"),u!==null?u.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===ho||o===po)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(o===ho)return l===rt?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(o===po)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===mo||o===go||o===vo||o===_o||o===xo||o===yo||o===bo||o===Mo||o===So||o===wo||o===To||o===Eo||o===Ao||o===Co)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(o===mo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===go)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===vo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===_o)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===xo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===yo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===bo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===Mo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===So)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===wo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===To)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Eo)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Ao)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Co)return l===rt?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Da)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(o===Da)return l===rt?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(o===Ru||o===Do||o===Po||o===Lo)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(o===Da)return u.COMPRESSED_RED_RGTC1_EXT;if(o===Do)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Po)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Lo)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===si?n?34042:(u=e.get("WEBGL_depth_texture"),u!==null?u.UNSIGNED_INT_24_8_WEBGL:null):s[o]!==void 0?s[o]:null}return{convert:i}}class $0 extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ur extends Tt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Z0={type:"move"};class Ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,l=null;const u=this._targetRay,d=this._grip,f=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(f&&e.hand){l=!0;for(const _ of e.hand.values()){const x=t.getJointPose(_,n),T=this._getHandJoint(f,_);x!==null&&(T.matrix.fromArray(x.transform.matrix),T.matrix.decompose(T.position,T.rotation,T.scale),T.jointRadius=x.radius),T.visible=x!==null}const h=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],m=h.position.distanceTo(p.position),y=.02,M=.005;f.inputState.pinching&&m>y+M?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&m<=y-M&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(d.matrix.fromArray(o.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),o.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(o.linearVelocity)):d.hasLinearVelocity=!1,o.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(o.angularVelocity)):d.hasAngularVelocity=!1));u!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(u.matrix.fromArray(i.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),i.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(i.linearVelocity)):u.hasLinearVelocity=!1,i.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(i.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Z0)))}return u!==null&&(u.visible=i!==null),d!==null&&(d.visible=o!==null),f!==null&&(f.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ur;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class gc extends St{constructor(e,t,n,i,o,l,u,d,f,h){if(h=h!==void 0?h:oi,h!==oi&&h!==di)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===oi&&(n=ii),n===void 0&&h===di&&(n=si),super(null,i,o,l,u,d,h,n,f),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=u!==void 0?u:qe,this.minFilter=d!==void 0?d:qe,this.flipY=!1,this.generateMipmaps=!1}}class K0 extends pi{constructor(e,t){super();const n=this;let i=null,o=1,l=null,u="local-floor",d=1,f=null,h=null,p=null,m=null,y=null,M=null;const _=t.getContextAttributes();let x=null,T=null;const E=[],w=[],S=new Set,C=new Map,D=new Jt;D.layers.enable(1),D.viewport=new Mt;const O=new Jt;O.layers.enable(2),O.viewport=new Mt;const A=[D,O],P=new $0;P.layers.enable(1),P.layers.enable(2);let z=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=E[X];return J===void 0&&(J=new Ja,E[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=E[X];return J===void 0&&(J=new Ja,E[X]=J),J.getGripSpace()},this.getHand=function(X){let J=E[X];return J===void 0&&(J=new Ja,E[X]=J),J.getHandSpace()};function K(X){const J=w.indexOf(X.inputSource);if(J===-1)return;const ne=E[J];ne!==void 0&&ne.dispatchEvent({type:X.type,data:X.inputSource})}function G(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",k);for(let X=0;X<E.length;X++){const J=w[X];J!==null&&(w[X]=null,E[X].disconnect(J))}z=null,j=null,e.setRenderTarget(x),y=null,m=null,p=null,i=null,T=null,ee.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){u=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||l},this.setReferenceSpace=function(X){f=X},this.getBaseLayer=function(){return m!==null?m:y},this.getBinding=function(){return p},this.getFrame=function(){return M},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",G),i.addEventListener("inputsourceschange",k),_.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:_.alpha,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:o};y=new XRWebGLLayer(i,t,J),i.updateRenderState({baseLayer:y}),T=new Bt(y.framebufferWidth,y.framebufferHeight,{format:Dt,type:ui,encoding:e.outputEncoding,stencilBuffer:_.stencil})}else{let J=null,ne=null,W=null;_.depth&&(W=_.stencil?35056:33190,J=_.stencil?di:oi,ne=_.stencil?si:ii);const ce={colorFormat:32856,depthFormat:W,scaleFactor:o};p=new XRWebGLBinding(i,t),m=p.createProjectionLayer(ce),i.updateRenderState({layers:[m]}),T=new Bt(m.textureWidth,m.textureHeight,{format:Dt,type:ui,depthTexture:new gc(m.textureWidth,m.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:_.stencil,encoding:e.outputEncoding,samples:_.antialias?4:0});const le=e.properties.get(T);le.__ignoreDepthValues=m.ignoreDepthValues}T.isXRRenderTarget=!0,this.setFoveation(d),f=null,l=await i.requestReferenceSpace(u),ee.setContext(i),ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function k(X){for(let J=0;J<X.removed.length;J++){const ne=X.removed[J],W=w.indexOf(ne);W>=0&&(w[W]=null,E[W].disconnect(ne))}for(let J=0;J<X.added.length;J++){const ne=X.added[J];let W=w.indexOf(ne);if(W===-1){for(let le=0;le<E.length;le++)if(le>=w.length){w.push(ne),W=le;break}else if(w[le]===null){w[le]=ne,W=le;break}if(W===-1)break}const ce=E[W];ce&&ce.connect(ne)}}const F=new q,$=new q;function B(X,J,ne){F.setFromMatrixPosition(J.matrixWorld),$.setFromMatrixPosition(ne.matrixWorld);const W=F.distanceTo($),ce=J.projectionMatrix.elements,le=ne.projectionMatrix.elements,ve=ce[14]/(ce[10]-1),me=ce[14]/(ce[10]+1),xe=(ce[9]+1)/ce[5],Ee=(ce[9]-1)/ce[5],Le=(ce[8]-1)/ce[0],Ie=(le[8]+1)/le[0],ze=ve*Le,We=ve*Ie,Fe=W/(-Le+Ie),je=Fe*-Le;J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(je),X.translateZ(Fe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const Ue=ve+Fe,ke=me+Fe,tt=ze-je,et=We+(W-je),N=xe*me/ke*Ue,L=Ee*me/ke*Ue;X.projectionMatrix.makePerspective(tt,et,N,L,Ue,ke)}function Y(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;P.near=O.near=D.near=X.near,P.far=O.far=D.far=X.far,(z!==P.near||j!==P.far)&&(i.updateRenderState({depthNear:P.near,depthFar:P.far}),z=P.near,j=P.far);const J=X.parent,ne=P.cameras;Y(P,J);for(let ce=0;ce<ne.length;ce++)Y(ne[ce],J);P.matrixWorld.decompose(P.position,P.quaternion,P.scale),X.matrix.copy(P.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale);const W=X.children;for(let ce=0,le=W.length;ce<le;ce++)W[ce].updateMatrixWorld(!0);ne.length===2?B(P,D,O):P.projectionMatrix.copy(D.projectionMatrix)},this.getCamera=function(){return P},this.getFoveation=function(){if(!(m===null&&y===null))return d},this.setFoveation=function(X){d=X,m!==null&&(m.fixedFoveation=X),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=X)},this.getPlanes=function(){return S};let V=null;function U(X,J){if(h=J.getViewerPose(f||l),M=J,h!==null){const ne=h.views;y!==null&&(e.setRenderTargetFramebuffer(T,y.framebuffer),e.setRenderTarget(T));let W=!1;ne.length!==P.cameras.length&&(P.cameras.length=0,W=!0);for(let ce=0;ce<ne.length;ce++){const le=ne[ce];let ve=null;if(y!==null)ve=y.getViewport(le);else{const xe=p.getViewSubImage(m,le);ve=xe.viewport,ce===0&&(e.setRenderTargetTextures(T,xe.colorTexture,m.ignoreDepthValues?void 0:xe.depthStencilTexture),e.setRenderTarget(T))}let me=A[ce];me===void 0&&(me=new Jt,me.layers.enable(ce),me.viewport=new Mt,A[ce]=me),me.matrix.fromArray(le.transform.matrix),me.projectionMatrix.fromArray(le.projectionMatrix),me.viewport.set(ve.x,ve.y,ve.width,ve.height),ce===0&&P.matrix.copy(me.matrix),W===!0&&P.cameras.push(me)}}for(let ne=0;ne<E.length;ne++){const W=w[ne],ce=E[ne];W!==null&&ce!==void 0&&ce.update(W,J,f||l)}if(V&&V(X,J),J.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:J.detectedPlanes});let ne=null;for(const W of S)J.detectedPlanes.has(W)||(ne===null&&(ne=[]),ne.push(W));if(ne!==null)for(const W of ne)S.delete(W),C.delete(W),n.dispatchEvent({type:"planeremoved",data:W});for(const W of J.detectedPlanes)if(!S.has(W))S.add(W),C.set(W,J.lastChangedTime),n.dispatchEvent({type:"planeadded",data:W});else{const ce=C.get(W);W.lastChangedTime>ce&&(C.set(W,W.lastChangedTime),n.dispatchEvent({type:"planechanged",data:W}))}}M=null}const ee=new dc;ee.setAnimationLoop(U),this.setAnimationLoop=function(X){V=X},this.dispose=function(){}}}function Q0(s,e){function t(_,x){x.color.getRGB(_.fogColor.value,lc(s)),x.isFog?(_.fogNear.value=x.near,_.fogFar.value=x.far):x.isFogExp2&&(_.fogDensity.value=x.density)}function n(_,x,T,E,w){x.isMeshBasicMaterial||x.isMeshLambertMaterial?i(_,x):x.isMeshToonMaterial?(i(_,x),h(_,x)):x.isMeshPhongMaterial?(i(_,x),f(_,x)):x.isMeshStandardMaterial?(i(_,x),p(_,x),x.isMeshPhysicalMaterial&&m(_,x,w)):x.isMeshMatcapMaterial?(i(_,x),y(_,x)):x.isMeshDepthMaterial?i(_,x):x.isMeshDistanceMaterial?(i(_,x),M(_,x)):x.isMeshNormalMaterial?i(_,x):x.isLineBasicMaterial?(o(_,x),x.isLineDashedMaterial&&l(_,x)):x.isPointsMaterial?u(_,x,T,E):x.isSpriteMaterial?d(_,x):x.isShadowMaterial?(_.color.value.copy(x.color),_.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function i(_,x){_.opacity.value=x.opacity,x.color&&_.diffuse.value.copy(x.color),x.emissive&&_.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(_.map.value=x.map),x.alphaMap&&(_.alphaMap.value=x.alphaMap),x.bumpMap&&(_.bumpMap.value=x.bumpMap,_.bumpScale.value=x.bumpScale,x.side===qt&&(_.bumpScale.value*=-1)),x.displacementMap&&(_.displacementMap.value=x.displacementMap,_.displacementScale.value=x.displacementScale,_.displacementBias.value=x.displacementBias),x.emissiveMap&&(_.emissiveMap.value=x.emissiveMap),x.normalMap&&(_.normalMap.value=x.normalMap,_.normalScale.value.copy(x.normalScale),x.side===qt&&_.normalScale.value.negate()),x.specularMap&&(_.specularMap.value=x.specularMap),x.alphaTest>0&&(_.alphaTest.value=x.alphaTest);const T=e.get(x).envMap;if(T&&(_.envMap.value=T,_.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=x.reflectivity,_.ior.value=x.ior,_.refractionRatio.value=x.refractionRatio),x.lightMap){_.lightMap.value=x.lightMap;const S=s.useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=x.lightMapIntensity*S}x.aoMap&&(_.aoMap.value=x.aoMap,_.aoMapIntensity.value=x.aoMapIntensity);let E;x.map?E=x.map:x.specularMap?E=x.specularMap:x.displacementMap?E=x.displacementMap:x.normalMap?E=x.normalMap:x.bumpMap?E=x.bumpMap:x.roughnessMap?E=x.roughnessMap:x.metalnessMap?E=x.metalnessMap:x.alphaMap?E=x.alphaMap:x.emissiveMap?E=x.emissiveMap:x.clearcoatMap?E=x.clearcoatMap:x.clearcoatNormalMap?E=x.clearcoatNormalMap:x.clearcoatRoughnessMap?E=x.clearcoatRoughnessMap:x.iridescenceMap?E=x.iridescenceMap:x.iridescenceThicknessMap?E=x.iridescenceThicknessMap:x.specularIntensityMap?E=x.specularIntensityMap:x.specularColorMap?E=x.specularColorMap:x.transmissionMap?E=x.transmissionMap:x.thicknessMap?E=x.thicknessMap:x.sheenColorMap?E=x.sheenColorMap:x.sheenRoughnessMap&&(E=x.sheenRoughnessMap),E!==void 0&&(E.isWebGLRenderTarget&&(E=E.texture),E.matrixAutoUpdate===!0&&E.updateMatrix(),_.uvTransform.value.copy(E.matrix));let w;x.aoMap?w=x.aoMap:x.lightMap&&(w=x.lightMap),w!==void 0&&(w.isWebGLRenderTarget&&(w=w.texture),w.matrixAutoUpdate===!0&&w.updateMatrix(),_.uv2Transform.value.copy(w.matrix))}function o(_,x){_.diffuse.value.copy(x.color),_.opacity.value=x.opacity}function l(_,x){_.dashSize.value=x.dashSize,_.totalSize.value=x.dashSize+x.gapSize,_.scale.value=x.scale}function u(_,x,T,E){_.diffuse.value.copy(x.color),_.opacity.value=x.opacity,_.size.value=x.size*T,_.scale.value=E*.5,x.map&&(_.map.value=x.map),x.alphaMap&&(_.alphaMap.value=x.alphaMap),x.alphaTest>0&&(_.alphaTest.value=x.alphaTest);let w;x.map?w=x.map:x.alphaMap&&(w=x.alphaMap),w!==void 0&&(w.matrixAutoUpdate===!0&&w.updateMatrix(),_.uvTransform.value.copy(w.matrix))}function d(_,x){_.diffuse.value.copy(x.color),_.opacity.value=x.opacity,_.rotation.value=x.rotation,x.map&&(_.map.value=x.map),x.alphaMap&&(_.alphaMap.value=x.alphaMap),x.alphaTest>0&&(_.alphaTest.value=x.alphaTest);let T;x.map?T=x.map:x.alphaMap&&(T=x.alphaMap),T!==void 0&&(T.matrixAutoUpdate===!0&&T.updateMatrix(),_.uvTransform.value.copy(T.matrix))}function f(_,x){_.specular.value.copy(x.specular),_.shininess.value=Math.max(x.shininess,1e-4)}function h(_,x){x.gradientMap&&(_.gradientMap.value=x.gradientMap)}function p(_,x){_.roughness.value=x.roughness,_.metalness.value=x.metalness,x.roughnessMap&&(_.roughnessMap.value=x.roughnessMap),x.metalnessMap&&(_.metalnessMap.value=x.metalnessMap),e.get(x).envMap&&(_.envMapIntensity.value=x.envMapIntensity)}function m(_,x,T){_.ior.value=x.ior,x.sheen>0&&(_.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),_.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(_.sheenColorMap.value=x.sheenColorMap),x.sheenRoughnessMap&&(_.sheenRoughnessMap.value=x.sheenRoughnessMap)),x.clearcoat>0&&(_.clearcoat.value=x.clearcoat,_.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(_.clearcoatMap.value=x.clearcoatMap),x.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap),x.clearcoatNormalMap&&(_.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),_.clearcoatNormalMap.value=x.clearcoatNormalMap,x.side===qt&&_.clearcoatNormalScale.value.negate())),x.iridescence>0&&(_.iridescence.value=x.iridescence,_.iridescenceIOR.value=x.iridescenceIOR,_.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(_.iridescenceMap.value=x.iridescenceMap),x.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=x.iridescenceThicknessMap)),x.transmission>0&&(_.transmission.value=x.transmission,_.transmissionSamplerMap.value=T.texture,_.transmissionSamplerSize.value.set(T.width,T.height),x.transmissionMap&&(_.transmissionMap.value=x.transmissionMap),_.thickness.value=x.thickness,x.thicknessMap&&(_.thicknessMap.value=x.thicknessMap),_.attenuationDistance.value=x.attenuationDistance,_.attenuationColor.value.copy(x.attenuationColor)),_.specularIntensity.value=x.specularIntensity,_.specularColor.value.copy(x.specularColor),x.specularIntensityMap&&(_.specularIntensityMap.value=x.specularIntensityMap),x.specularColorMap&&(_.specularColorMap.value=x.specularColorMap)}function y(_,x){x.matcap&&(_.matcap.value=x.matcap)}function M(_,x){_.referencePosition.value.copy(x.referencePosition),_.nearDistance.value=x.nearDistance,_.farDistance.value=x.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:n}}function J0(s,e,t,n){let i={},o={},l=[];const u=t.isWebGL2?s.getParameter(35375):0;function d(E,w){const S=w.program;n.uniformBlockBinding(E,S)}function f(E,w){let S=i[E.id];S===void 0&&(M(E),S=h(E),i[E.id]=S,E.addEventListener("dispose",x));const C=w.program;n.updateUBOMapping(E,C);const D=e.render.frame;o[E.id]!==D&&(m(E),o[E.id]=D)}function h(E){const w=p();E.__bindingPointIndex=w;const S=s.createBuffer(),C=E.__size,D=E.usage;return s.bindBuffer(35345,S),s.bufferData(35345,C,D),s.bindBuffer(35345,null),s.bindBufferBase(35345,w,S),S}function p(){for(let E=0;E<u;E++)if(l.indexOf(E)===-1)return l.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(E){const w=i[E.id],S=E.uniforms,C=E.__cache;s.bindBuffer(35345,w);for(let D=0,O=S.length;D<O;D++){const A=S[D];if(y(A,D,C)===!0){const P=A.__offset,z=Array.isArray(A.value)?A.value:[A.value];let j=0;for(let K=0;K<z.length;K++){const G=z[K],k=_(G);typeof G=="number"?(A.__data[0]=G,s.bufferSubData(35345,P+j,A.__data)):G.isMatrix3?(A.__data[0]=G.elements[0],A.__data[1]=G.elements[1],A.__data[2]=G.elements[2],A.__data[3]=G.elements[0],A.__data[4]=G.elements[3],A.__data[5]=G.elements[4],A.__data[6]=G.elements[5],A.__data[7]=G.elements[0],A.__data[8]=G.elements[6],A.__data[9]=G.elements[7],A.__data[10]=G.elements[8],A.__data[11]=G.elements[0]):(G.toArray(A.__data,j),j+=k.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(35345,P,A.__data)}}s.bindBuffer(35345,null)}function y(E,w,S){const C=E.value;if(S[w]===void 0){if(typeof C=="number")S[w]=C;else{const D=Array.isArray(C)?C:[C],O=[];for(let A=0;A<D.length;A++)O.push(D[A].clone());S[w]=O}return!0}else if(typeof C=="number"){if(S[w]!==C)return S[w]=C,!0}else{const D=Array.isArray(S[w])?S[w]:[S[w]],O=Array.isArray(C)?C:[C];for(let A=0;A<D.length;A++){const P=D[A];if(P.equals(O[A])===!1)return P.copy(O[A]),!0}}return!1}function M(E){const w=E.uniforms;let S=0;const C=16;let D=0;for(let O=0,A=w.length;O<A;O++){const P=w[O],z={boundary:0,storage:0},j=Array.isArray(P.value)?P.value:[P.value];for(let K=0,G=j.length;K<G;K++){const k=j[K],F=_(k);z.boundary+=F.boundary,z.storage+=F.storage}if(P.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,O>0){D=S%C;const K=C-D;D!==0&&K-z.boundary<0&&(S+=C-D,P.__offset=S)}S+=z.storage}return D=S%C,D>0&&(S+=C-D),E.__size=S,E.__cache={},this}function _(E){const w={boundary:0,storage:0};return typeof E=="number"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function x(E){const w=E.target;w.removeEventListener("dispose",x);const S=l.indexOf(w.__bindingPointIndex);l.splice(S,1),s.deleteBuffer(i[w.id]),delete i[w.id],delete o[w.id]}function T(){for(const E in i)s.deleteBuffer(i[E]);l=[],i={},o={}}return{bind:d,update:f,dispose:T}}function em(){const s=hr("canvas");return s.style.display="block",s}function ha(s={}){this.isWebGLRenderer=!0;const e=s.canvas!==void 0?s.canvas:em(),t=s.context!==void 0?s.context:null,n=s.depth!==void 0?s.depth:!0,i=s.stencil!==void 0?s.stencil:!0,o=s.antialias!==void 0?s.antialias:!1,l=s.premultipliedAlpha!==void 0?s.premultipliedAlpha:!0,u=s.preserveDrawingBuffer!==void 0?s.preserveDrawingBuffer:!1,d=s.powerPreference!==void 0?s.powerPreference:"default",f=s.failIfMajorPerformanceCaveat!==void 0?s.failIfMajorPerformanceCaveat:!1;let h;t!==null?h=t.getContextAttributes().alpha:h=s.alpha!==void 0?s.alpha:!1;let p=null,m=null;const y=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=pn,this.useLegacyLights=!0,this.toneMapping=Dn,this.toneMappingExposure=1;const _=this;let x=!1,T=0,E=0,w=null,S=-1,C=null;const D=new Mt,O=new Mt;let A=null,P=e.width,z=e.height,j=1,K=null,G=null;const k=new Mt(0,0,P,z),F=new Mt(0,0,P,z);let $=!1;const B=new Xs;let Y=!1,V=!1,U=null;const ee=new lt,X=new q,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ne(){return w===null?j:1}let W=t;function ce(R,ie){for(let se=0;se<R.length;se++){const te=R[se],oe=e.getContext(te,ie);if(oe!==null)return oe}return null}try{const R={alpha:!0,depth:n,stencil:i,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Hs}`),e.addEventListener("webglcontextlost",Se,!1),e.addEventListener("webglcontextrestored",Te,!1),e.addEventListener("webglcontextcreationerror",Ae,!1),W===null){const ie=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&ie.shift(),W=ce(ie,R),W===null)throw ce(ie)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let le,ve,me,xe,Ee,Le,Ie,ze,We,Fe,je,Ue,ke,tt,et,N,L,re,pe,de,ge,Ce,Me,I;function ue(){le=new fp(W),ve=new sp(W,le,s),le.init(ve),Ce=new Y0(W,le,ve),me=new q0(W,le,ve),xe=new mp,Ee=new R0,Le=new X0(W,le,me,Ee,ve,Ce,xe),Ie=new lp(_),ze=new dp(_),We=new Sd(W,ve),Me=new rp(W,le,We,ve),Fe=new hp(W,We,xe,Me),je=new xp(W,Fe,We,xe),pe=new _p(W,ve,Le),N=new op(Ee),Ue=new L0(_,Ie,ze,le,ve,Me,N),ke=new Q0(_,Ee),tt=new z0,et=new B0(le,ve),re=new ip(_,Ie,ze,me,je,h,l),L=new j0(_,je,ve),I=new J0(W,xe,ve,me),de=new ap(W,le,xe,ve),ge=new pp(W,le,xe,ve),xe.programs=Ue.programs,_.capabilities=ve,_.extensions=le,_.properties=Ee,_.renderLists=tt,_.shadowMap=L,_.state=me,_.info=xe}ue();const _e=new K0(_,W);this.xr=_e,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const R=le.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=le.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(R){R!==void 0&&(j=R,this.setSize(P,z,!1))},this.getSize=function(R){return R.set(P,z)},this.setSize=function(R,ie,se=!0){if(_e.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=R,z=ie,e.width=Math.floor(R*j),e.height=Math.floor(ie*j),se===!0&&(e.style.width=R+"px",e.style.height=ie+"px"),this.setViewport(0,0,R,ie)},this.getDrawingBufferSize=function(R){return R.set(P*j,z*j).floor()},this.setDrawingBufferSize=function(R,ie,se){P=R,z=ie,j=se,e.width=Math.floor(R*se),e.height=Math.floor(ie*se),this.setViewport(0,0,R,ie)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(k)},this.setViewport=function(R,ie,se,te){R.isVector4?k.set(R.x,R.y,R.z,R.w):k.set(R,ie,se,te),me.viewport(D.copy(k).multiplyScalar(j).floor())},this.getScissor=function(R){return R.copy(F)},this.setScissor=function(R,ie,se,te){R.isVector4?F.set(R.x,R.y,R.z,R.w):F.set(R,ie,se,te),me.scissor(O.copy(F).multiplyScalar(j).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(R){me.setScissorTest($=R)},this.setOpaqueSort=function(R){K=R},this.setTransparentSort=function(R){G=R},this.getClearColor=function(R){return R.copy(re.getClearColor())},this.setClearColor=function(){re.setClearColor.apply(re,arguments)},this.getClearAlpha=function(){return re.getClearAlpha()},this.setClearAlpha=function(){re.setClearAlpha.apply(re,arguments)},this.clear=function(R=!0,ie=!0,se=!0){let te=0;R&&(te|=16384),ie&&(te|=256),se&&(te|=1024),W.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Se,!1),e.removeEventListener("webglcontextrestored",Te,!1),e.removeEventListener("webglcontextcreationerror",Ae,!1),tt.dispose(),et.dispose(),Ee.dispose(),Ie.dispose(),ze.dispose(),je.dispose(),Me.dispose(),I.dispose(),Ue.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",fe),_e.removeEventListener("sessionend",we),U&&(U.dispose(),U=null),De.stop()};function Se(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const R=xe.autoReset,ie=L.enabled,se=L.autoUpdate,te=L.needsUpdate,oe=L.type;ue(),xe.autoReset=R,L.enabled=ie,L.autoUpdate=se,L.needsUpdate=te,L.type=oe}function Ae(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Be(R){const ie=R.target;ie.removeEventListener("dispose",Be),Ke(ie)}function Ke(R){Xe(R),Ee.remove(R)}function Xe(R){const ie=Ee.get(R).programs;ie!==void 0&&(ie.forEach(function(se){Ue.releaseProgram(se)}),R.isShaderMaterial&&Ue.releaseShaderCache(R))}this.renderBufferDirect=function(R,ie,se,te,oe,Re){ie===null&&(ie=J);const Oe=oe.isMesh&&oe.matrixWorld.determinant()<0,He=Nc(R,ie,se,te,oe);me.setMaterial(te,Oe);let Ve=se.index,Qe=1;te.wireframe===!0&&(Ve=Fe.getWireframeAttribute(se),Qe=2);const Ye=se.drawRange,$e=se.attributes.position;let ht=Ye.start*Qe,Gt=(Ye.start+Ye.count)*Qe;Re!==null&&(ht=Math.max(ht,Re.start*Qe),Gt=Math.min(Gt,(Re.start+Re.count)*Qe)),Ve!==null?(ht=Math.max(ht,0),Gt=Math.min(Gt,Ve.count)):$e!=null&&(ht=Math.max(ht,0),Gt=Math.min(Gt,$e.count));const mn=Gt-ht;if(mn<0||mn===1/0)return;Me.setup(oe,te,He,se,Ve);let Hn,pt=de;if(Ve!==null&&(Hn=We.get(Ve),pt=ge,pt.setIndex(Hn)),oe.isMesh)te.wireframe===!0?(me.setLineWidth(te.wireframeLinewidth*ne()),pt.setMode(1)):pt.setMode(4);else if(oe.isLine){let Ze=te.linewidth;Ze===void 0&&(Ze=1),me.setLineWidth(Ze*ne()),oe.isLineSegments?pt.setMode(1):oe.isLineLoop?pt.setMode(2):pt.setMode(3)}else oe.isPoints?pt.setMode(0):oe.isSprite&&pt.setMode(4);if(oe.isInstancedMesh)pt.renderInstances(ht,mn,oe.count);else if(se.isInstancedBufferGeometry){const Ze=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,va=Math.min(se.instanceCount,Ze);pt.renderInstances(ht,mn,va)}else pt.render(ht,mn)},this.compile=function(R,ie){function se(te,oe,Re){te.transparent===!0&&te.side===Cn&&te.forceSinglePass===!1?(te.side=qt,te.needsUpdate=!0,Yt(te,oe,Re),te.side=Gn,te.needsUpdate=!0,Yt(te,oe,Re),te.side=Cn):Yt(te,oe,Re)}m=et.get(R),m.init(),M.push(m),R.traverseVisible(function(te){te.isLight&&te.layers.test(ie.layers)&&(m.pushLight(te),te.castShadow&&m.pushShadow(te))}),m.setupLights(_.useLegacyLights),R.traverse(function(te){const oe=te.material;if(oe)if(Array.isArray(oe))for(let Re=0;Re<oe.length;Re++){const Oe=oe[Re];se(Oe,R,te)}else se(oe,R,te)}),M.pop(),m=null};let H=null;function ae(R){H&&H(R)}function fe(){De.stop()}function we(){De.start()}const De=new dc;De.setAnimationLoop(ae),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(R){H=R,_e.setAnimationLoop(R),R===null?De.stop():De.start()},_e.addEventListener("sessionstart",fe),_e.addEventListener("sessionend",we),this.render=function(R,ie){if(ie!==void 0&&ie.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),ie.parent===null&&ie.matrixWorldAutoUpdate===!0&&ie.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(ie),ie=_e.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,ie,w),m=et.get(R,M.length),m.init(),M.push(m),ee.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),B.setFromProjectionMatrix(ee),V=this.localClippingEnabled,Y=N.init(this.clippingPlanes,V),p=tt.get(R,y.length),p.init(),y.push(p),it(R,ie,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(K,G),Y===!0&&N.beginShadows();const se=m.state.shadowsArray;if(L.render(se,R,ie),Y===!0&&N.endShadows(),this.info.autoReset===!0&&this.info.reset(),re.render(p,R),m.setupLights(_.useLegacyLights),ie.isArrayCamera){const te=ie.cameras;for(let oe=0,Re=te.length;oe<Re;oe++){const Oe=te[oe];xt(p,R,Oe,Oe.viewport)}}else xt(p,R,ie);w!==null&&(Le.updateMultisampleRenderTarget(w),Le.updateRenderTargetMipmap(w)),R.isScene===!0&&R.onAfterRender(_,R,ie),Me.resetDefaultState(),S=-1,C=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function it(R,ie,se,te){if(R.visible===!1)return;if(R.layers.test(ie.layers)){if(R.isGroup)se=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(ie);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||B.intersectsSprite(R)){te&&X.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ee);const Oe=je.update(R),He=R.material;He.visible&&p.push(R,Oe,He,se,X.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(R.isSkinnedMesh&&R.skeleton.frame!==xe.render.frame&&(R.skeleton.update(),R.skeleton.frame=xe.render.frame),!R.frustumCulled||B.intersectsObject(R))){te&&X.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ee);const Oe=je.update(R),He=R.material;if(Array.isArray(He)){const Ve=Oe.groups;for(let Qe=0,Ye=Ve.length;Qe<Ye;Qe++){const $e=Ve[Qe],ht=He[$e.materialIndex];ht&&ht.visible&&p.push(R,Oe,ht,se,X.z,$e)}}else He.visible&&p.push(R,Oe,He,se,X.z,null)}}const Re=R.children;for(let Oe=0,He=Re.length;Oe<He;Oe++)it(Re[Oe],ie,se,te)}function xt(R,ie,se,te){const oe=R.opaque,Re=R.transmissive,Oe=R.transparent;m.setupLightsView(se),Y===!0&&N.setGlobalState(_.clippingPlanes,se),Re.length>0&&Rt(oe,ie,se),te&&me.viewport(D.copy(te)),oe.length>0&&on(oe,ie,se),Re.length>0&&on(Re,ie,se),Oe.length>0&&on(Oe,ie,se),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Rt(R,ie,se){const te=ve.isWebGL2;U===null&&(U=new Bt(1024,1024,{generateMipmaps:!0,type:le.has("EXT_color_buffer_half_float")?dr:ui,minFilter:ur,samples:te&&o===!0?4:0}));const oe=_.getRenderTarget();_.setRenderTarget(U),_.clear();const Re=_.toneMapping;_.toneMapping=Dn,on(R,ie,se),_.toneMapping=Re,Le.updateMultisampleRenderTarget(U),Le.updateRenderTargetMipmap(U),_.setRenderTarget(oe)}function on(R,ie,se){const te=ie.isScene===!0?ie.overrideMaterial:null;for(let oe=0,Re=R.length;oe<Re;oe++){const Oe=R[oe],He=Oe.object,Ve=Oe.geometry,Qe=te===null?Oe.material:te,Ye=Oe.group;He.layers.test(se.layers)&&ct(He,ie,se,Ve,Qe,Ye)}}function ct(R,ie,se,te,oe,Re){R.onBeforeRender(_,ie,se,te,oe,Re),R.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),oe.onBeforeRender(_,ie,se,te,R,Re),oe.transparent===!0&&oe.side===Cn&&oe.forceSinglePass===!1?(oe.side=qt,oe.needsUpdate=!0,_.renderBufferDirect(se,ie,te,oe,R,Re),oe.side=Gn,oe.needsUpdate=!0,_.renderBufferDirect(se,ie,te,oe,R,Re),oe.side=Cn):_.renderBufferDirect(se,ie,te,oe,R,Re),R.onAfterRender(_,ie,se,te,oe,Re)}function Yt(R,ie,se){ie.isScene!==!0&&(ie=J);const te=Ee.get(R),oe=m.state.lights,Re=m.state.shadowsArray,Oe=oe.state.version,He=Ue.getParameters(R,oe.state,Re,ie,se),Ve=Ue.getProgramCacheKey(He);let Qe=te.programs;te.environment=R.isMeshStandardMaterial?ie.environment:null,te.fog=ie.fog,te.envMap=(R.isMeshStandardMaterial?ze:Ie).get(R.envMap||te.environment),Qe===void 0&&(R.addEventListener("dispose",Be),Qe=new Map,te.programs=Qe);let Ye=Qe.get(Ve);if(Ye!==void 0){if(te.currentProgram===Ye&&te.lightsStateVersion===Oe)return ln(R,He),Ye}else He.uniforms=Ue.getUniforms(R),R.onBuild(se,He,_),R.onBeforeCompile(He,_),Ye=Ue.acquireProgram(He,Ve),Qe.set(Ve,Ye),te.uniforms=He.uniforms;const $e=te.uniforms;(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&($e.clippingPlanes=N.uniform),ln(R,He),te.needsLights=Oc(R),te.lightsStateVersion=Oe,te.needsLights&&($e.ambientLightColor.value=oe.state.ambient,$e.lightProbe.value=oe.state.probe,$e.directionalLights.value=oe.state.directional,$e.directionalLightShadows.value=oe.state.directionalShadow,$e.spotLights.value=oe.state.spot,$e.spotLightShadows.value=oe.state.spotShadow,$e.rectAreaLights.value=oe.state.rectArea,$e.ltc_1.value=oe.state.rectAreaLTC1,$e.ltc_2.value=oe.state.rectAreaLTC2,$e.pointLights.value=oe.state.point,$e.pointLightShadows.value=oe.state.pointShadow,$e.hemisphereLights.value=oe.state.hemi,$e.directionalShadowMap.value=oe.state.directionalShadowMap,$e.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,$e.spotShadowMap.value=oe.state.spotShadowMap,$e.spotLightMatrix.value=oe.state.spotLightMatrix,$e.spotLightMap.value=oe.state.spotLightMap,$e.pointShadowMap.value=oe.state.pointShadowMap,$e.pointShadowMatrix.value=oe.state.pointShadowMatrix);const ht=Ye.getUniforms(),Gt=na.seqWithValue(ht.seq,$e);return te.currentProgram=Ye,te.uniformsList=Gt,Ye}function ln(R,ie){const se=Ee.get(R);se.outputEncoding=ie.outputEncoding,se.instancing=ie.instancing,se.skinning=ie.skinning,se.morphTargets=ie.morphTargets,se.morphNormals=ie.morphNormals,se.morphColors=ie.morphColors,se.morphTargetsCount=ie.morphTargetsCount,se.numClippingPlanes=ie.numClippingPlanes,se.numIntersection=ie.numClipIntersection,se.vertexAlphas=ie.vertexAlphas,se.vertexTangents=ie.vertexTangents,se.toneMapping=ie.toneMapping}function Nc(R,ie,se,te,oe){ie.isScene!==!0&&(ie=J),Le.resetTextureUnits();const Re=ie.fog,Oe=te.isMeshStandardMaterial?ie.environment:null,He=w===null?_.outputEncoding:w.isXRRenderTarget===!0?w.texture.encoding:pn,Ve=(te.isMeshStandardMaterial?ze:Ie).get(te.envMap||Oe),Qe=te.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,Ye=!!te.normalMap&&!!se.attributes.tangent,$e=!!se.morphAttributes.position,ht=!!se.morphAttributes.normal,Gt=!!se.morphAttributes.color,mn=te.toneMapped?_.toneMapping:Dn,Hn=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,pt=Hn!==void 0?Hn.length:0,Ze=Ee.get(te),va=m.state.lights;if(Y===!0&&(V===!0||R!==C)){const Ht=R===C&&te.id===S;N.setState(te,R,Ht)}let yt=!1;te.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==va.state.version||Ze.outputEncoding!==He||oe.isInstancedMesh&&Ze.instancing===!1||!oe.isInstancedMesh&&Ze.instancing===!0||oe.isSkinnedMesh&&Ze.skinning===!1||!oe.isSkinnedMesh&&Ze.skinning===!0||Ze.envMap!==Ve||te.fog===!0&&Ze.fog!==Re||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==N.numPlanes||Ze.numIntersection!==N.numIntersection)||Ze.vertexAlphas!==Qe||Ze.vertexTangents!==Ye||Ze.morphTargets!==$e||Ze.morphNormals!==ht||Ze.morphColors!==Gt||Ze.toneMapping!==mn||ve.isWebGL2===!0&&Ze.morphTargetsCount!==pt)&&(yt=!0):(yt=!0,Ze.__version=te.version);let Vn=Ze.currentProgram;yt===!0&&(Vn=Yt(te,ie,oe));let Js=!1,ji=!1,_a=!1;const It=Vn.getUniforms(),Wn=Ze.uniforms;if(me.useProgram(Vn.program)&&(Js=!0,ji=!0,_a=!0),te.id!==S&&(S=te.id,ji=!0),Js||C!==R){if(It.setValue(W,"projectionMatrix",R.projectionMatrix),ve.logarithmicDepthBuffer&&It.setValue(W,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),C!==R&&(C=R,ji=!0,_a=!0),te.isShaderMaterial||te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshStandardMaterial||te.envMap){const Ht=It.map.cameraPosition;Ht!==void 0&&Ht.setValue(W,X.setFromMatrixPosition(R.matrixWorld))}(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial)&&It.setValue(W,"isOrthographic",R.isOrthographicCamera===!0),(te.isMeshPhongMaterial||te.isMeshToonMaterial||te.isMeshLambertMaterial||te.isMeshBasicMaterial||te.isMeshStandardMaterial||te.isShaderMaterial||te.isShadowMaterial||oe.isSkinnedMesh)&&It.setValue(W,"viewMatrix",R.matrixWorldInverse)}if(oe.isSkinnedMesh){It.setOptional(W,oe,"bindMatrix"),It.setOptional(W,oe,"bindMatrixInverse");const Ht=oe.skeleton;Ht&&(ve.floatVertexTextures?(Ht.boneTexture===null&&Ht.computeBoneTexture(),It.setValue(W,"boneTexture",Ht.boneTexture,Le),It.setValue(W,"boneTextureSize",Ht.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const xa=se.morphAttributes;if((xa.position!==void 0||xa.normal!==void 0||xa.color!==void 0&&ve.isWebGL2===!0)&&pe.update(oe,se,Vn),(ji||Ze.receiveShadow!==oe.receiveShadow)&&(Ze.receiveShadow=oe.receiveShadow,It.setValue(W,"receiveShadow",oe.receiveShadow)),te.isMeshGouraudMaterial&&te.envMap!==null&&(Wn.envMap.value=Ve,Wn.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),ji&&(It.setValue(W,"toneMappingExposure",_.toneMappingExposure),Ze.needsLights&&Fc(Wn,_a),Re&&te.fog===!0&&ke.refreshFogUniforms(Wn,Re),ke.refreshMaterialUniforms(Wn,te,j,z,U),na.upload(W,Ze.uniformsList,Wn,Le)),te.isShaderMaterial&&te.uniformsNeedUpdate===!0&&(na.upload(W,Ze.uniformsList,Wn,Le),te.uniformsNeedUpdate=!1),te.isSpriteMaterial&&It.setValue(W,"center",oe.center),It.setValue(W,"modelViewMatrix",oe.modelViewMatrix),It.setValue(W,"normalMatrix",oe.normalMatrix),It.setValue(W,"modelMatrix",oe.matrixWorld),te.isShaderMaterial||te.isRawShaderMaterial){const Ht=te.uniformsGroups;for(let ya=0,kc=Ht.length;ya<kc;ya++)if(ve.isWebGL2){const eo=Ht[ya];I.update(eo,Vn),I.bind(eo,Vn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Vn}function Fc(R,ie){R.ambientLightColor.needsUpdate=ie,R.lightProbe.needsUpdate=ie,R.directionalLights.needsUpdate=ie,R.directionalLightShadows.needsUpdate=ie,R.pointLights.needsUpdate=ie,R.pointLightShadows.needsUpdate=ie,R.spotLights.needsUpdate=ie,R.spotLightShadows.needsUpdate=ie,R.rectAreaLights.needsUpdate=ie,R.hemisphereLights.needsUpdate=ie}function Oc(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(R,ie,se){Ee.get(R.texture).__webglTexture=ie,Ee.get(R.depthTexture).__webglTexture=se;const te=Ee.get(R);te.__hasExternalTextures=!0,te.__hasExternalTextures&&(te.__autoAllocateDepthBuffer=se===void 0,te.__autoAllocateDepthBuffer||le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),te.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,ie){const se=Ee.get(R);se.__webglFramebuffer=ie,se.__useDefaultFramebuffer=ie===void 0},this.setRenderTarget=function(R,ie=0,se=0){w=R,T=ie,E=se;let te=!0,oe=null,Re=!1,Oe=!1;if(R){const Ve=Ee.get(R);Ve.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(36160,null),te=!1):Ve.__webglFramebuffer===void 0?Le.setupRenderTarget(R):Ve.__hasExternalTextures&&Le.rebindTextures(R,Ee.get(R.texture).__webglTexture,Ee.get(R.depthTexture).__webglTexture);const Qe=R.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Oe=!0);const Ye=Ee.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(oe=Ye[ie],Re=!0):ve.isWebGL2&&R.samples>0&&Le.useMultisampledRTT(R)===!1?oe=Ee.get(R).__webglMultisampledFramebuffer:oe=Ye,D.copy(R.viewport),O.copy(R.scissor),A=R.scissorTest}else D.copy(k).multiplyScalar(j).floor(),O.copy(F).multiplyScalar(j).floor(),A=$;if(me.bindFramebuffer(36160,oe)&&ve.drawBuffers&&te&&me.drawBuffers(R,oe),me.viewport(D),me.scissor(O),me.setScissorTest(A),Re){const Ve=Ee.get(R.texture);W.framebufferTexture2D(36160,36064,34069+ie,Ve.__webglTexture,se)}else if(Oe){const Ve=Ee.get(R.texture),Qe=ie||0;W.framebufferTextureLayer(36160,36064,Ve.__webglTexture,se||0,Qe)}S=-1},this.readRenderTargetPixels=function(R,ie,se,te,oe,Re,Oe){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=Ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Oe!==void 0&&(He=He[Oe]),He){me.bindFramebuffer(36160,He);try{const Ve=R.texture,Qe=Ve.format,Ye=Ve.type;if(Qe!==Dt&&Ce.convert(Qe)!==W.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const $e=Ye===dr&&(le.has("EXT_color_buffer_half_float")||ve.isWebGL2&&le.has("EXT_color_buffer_float"));if(Ye!==ui&&Ce.convert(Ye)!==W.getParameter(35738)&&!(Ye===jt&&(ve.isWebGL2||le.has("OES_texture_float")||le.has("WEBGL_color_buffer_float")))&&!$e){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ie>=0&&ie<=R.width-te&&se>=0&&se<=R.height-oe&&W.readPixels(ie,se,te,oe,Ce.convert(Qe),Ce.convert(Ye),Re)}finally{const Ve=w!==null?Ee.get(w).__webglFramebuffer:null;me.bindFramebuffer(36160,Ve)}}},this.copyFramebufferToTexture=function(R,ie,se=0){const te=Math.pow(2,-se),oe=Math.floor(ie.image.width*te),Re=Math.floor(ie.image.height*te);Le.setTexture2D(ie,0),W.copyTexSubImage2D(3553,se,0,0,R.x,R.y,oe,Re),me.unbindTexture()},this.copyTextureToTexture=function(R,ie,se,te=0){const oe=ie.image.width,Re=ie.image.height,Oe=Ce.convert(se.format),He=Ce.convert(se.type);Le.setTexture2D(se,0),W.pixelStorei(37440,se.flipY),W.pixelStorei(37441,se.premultiplyAlpha),W.pixelStorei(3317,se.unpackAlignment),ie.isDataTexture?W.texSubImage2D(3553,te,R.x,R.y,oe,Re,Oe,He,ie.image.data):ie.isCompressedTexture?W.compressedTexSubImage2D(3553,te,R.x,R.y,ie.mipmaps[0].width,ie.mipmaps[0].height,Oe,ie.mipmaps[0].data):W.texSubImage2D(3553,te,R.x,R.y,Oe,He,ie.image),te===0&&se.generateMipmaps&&W.generateMipmap(3553),me.unbindTexture()},this.copyTextureToTexture3D=function(R,ie,se,te,oe=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Re=R.max.x-R.min.x+1,Oe=R.max.y-R.min.y+1,He=R.max.z-R.min.z+1,Ve=Ce.convert(te.format),Qe=Ce.convert(te.type);let Ye;if(te.isData3DTexture)Le.setTexture3D(te,0),Ye=32879;else if(te.isDataArrayTexture)Le.setTexture2DArray(te,0),Ye=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(37440,te.flipY),W.pixelStorei(37441,te.premultiplyAlpha),W.pixelStorei(3317,te.unpackAlignment);const $e=W.getParameter(3314),ht=W.getParameter(32878),Gt=W.getParameter(3316),mn=W.getParameter(3315),Hn=W.getParameter(32877),pt=se.isCompressedTexture?se.mipmaps[0]:se.image;W.pixelStorei(3314,pt.width),W.pixelStorei(32878,pt.height),W.pixelStorei(3316,R.min.x),W.pixelStorei(3315,R.min.y),W.pixelStorei(32877,R.min.z),se.isDataTexture||se.isData3DTexture?W.texSubImage3D(Ye,oe,ie.x,ie.y,ie.z,Re,Oe,He,Ve,Qe,pt.data):se.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Ye,oe,ie.x,ie.y,ie.z,Re,Oe,He,Ve,pt.data)):W.texSubImage3D(Ye,oe,ie.x,ie.y,ie.z,Re,Oe,He,Ve,Qe,pt),W.pixelStorei(3314,$e),W.pixelStorei(32878,ht),W.pixelStorei(3316,Gt),W.pixelStorei(3315,mn),W.pixelStorei(32877,Hn),oe===0&&te.generateMipmaps&&W.generateMipmap(Ye),me.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?Le.setTextureCube(R,0):R.isData3DTexture?Le.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Le.setTexture2DArray(R,0):Le.setTexture2D(R,0),me.unbindTexture()},this.resetState=function(){T=0,E=0,w=null,me.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}Object.defineProperties(ha.prototype,{physicallyCorrectLights:{get:function(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights},set:function(s){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!s}}});class tm extends ha{}tm.prototype.isWebGL1Renderer=!0;class or extends Tt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Ns extends St{constructor(e=null,t=1,n=1,i,o,l,u,d,f=qe,h=qe,p,m){super(null,l,u,d,f,h,i,o,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $s extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pl=new q,ml=new q,gl=new lt,es=new js,Br=new la;class nm extends Tt{constructor(e=new Xt,t=new $s){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,o=t.count;i<o;i++)pl.fromBufferAttribute(t,i-1),ml.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=pl.distanceTo(ml);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(i),Br.radius+=o,e.ray.intersectsSphere(Br)===!1)return;gl.copy(i).invert(),es.copy(e.ray).applyMatrix4(gl);const u=o/((this.scale.x+this.scale.y+this.scale.z)/3),d=u*u,f=new q,h=new q,p=new q,m=new q,y=this.isLineSegments?2:1,M=n.index,x=n.attributes.position;if(M!==null){const T=Math.max(0,l.start),E=Math.min(M.count,l.start+l.count);for(let w=T,S=E-1;w<S;w+=y){const C=M.getX(w),D=M.getX(w+1);if(f.fromBufferAttribute(x,C),h.fromBufferAttribute(x,D),es.distanceSqToSegment(f,h,m,p)>d)continue;m.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(m);A<e.near||A>e.far||t.push({distance:A,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const T=Math.max(0,l.start),E=Math.min(x.count,l.start+l.count);for(let w=T,S=E-1;w<S;w+=y){if(f.fromBufferAttribute(x,w),h.fromBufferAttribute(x,w+1),es.distanceSqToSegment(f,h,m,p)>d)continue;m.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(m);D<e.near||D>e.far||t.push({distance:D,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=i.length;o<l;o++){const u=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=o}}}}}const vl=new q,_l=new q;class vc extends nm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,o=t.count;i<o;i+=2)vl.fromBufferAttribute(t,i),_l.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+vl.distanceTo(_l);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _c extends St{constructor(e,t,n,i,o,l,u,d,f){super(e,t,n,i,o,l,u,d,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class im extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vs,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rm extends mi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vs,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}const aa={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class am{constructor(e,t,n){const i=this;let o=!1,l=0,u=0,d;const f=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){u++,o===!1&&i.onStart!==void 0&&i.onStart(h,l,u),o=!0},this.itemEnd=function(h){l++,i.onProgress!==void 0&&i.onProgress(h,l,u),l===u&&(o=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return d?d(h):h},this.setURLModifier=function(h){return d=h,this},this.addHandler=function(h,p){return f.push(h,p),this},this.removeHandler=function(h){const p=f.indexOf(h);return p!==-1&&f.splice(p,2),this},this.getHandler=function(h){for(let p=0,m=f.length;p<m;p+=2){const y=f[p],M=f[p+1];if(y.global&&(y.lastIndex=0),y.test(h))return M}return null}}}const sm=new am;class Zs{constructor(e){this.manager=e!==void 0?e:sm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,o){n.load(e,i,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const bn={};class om extends Error{constructor(e,t){super(e),this.response=t}}class lm extends Zs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=aa.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(bn[e]!==void 0){bn[e].push({onLoad:t,onProgress:n,onError:i});return}bn[e]=[],bn[e].push({onLoad:t,onProgress:n,onError:i});const l=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),u=this.mimeType,d=this.responseType;fetch(l).then(f=>{if(f.status===200||f.status===0){if(f.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||f.body===void 0||f.body.getReader===void 0)return f;const h=bn[e],p=f.body.getReader(),m=f.headers.get("Content-Length")||f.headers.get("X-File-Size"),y=m?parseInt(m):0,M=y!==0;let _=0;const x=new ReadableStream({start(T){E();function E(){p.read().then(({done:w,value:S})=>{if(w)T.close();else{_+=S.byteLength;const C=new ProgressEvent("progress",{lengthComputable:M,loaded:_,total:y});for(let D=0,O=h.length;D<O;D++){const A=h[D];A.onProgress&&A.onProgress(C)}T.enqueue(S),E()}})}}});return new Response(x)}else throw new om(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`,f)}).then(f=>{switch(d){case"arraybuffer":return f.arrayBuffer();case"blob":return f.blob();case"document":return f.text().then(h=>new DOMParser().parseFromString(h,u));case"json":return f.json();default:if(u===void 0)return f.text();{const p=/charset="?([^;"\s]*)"?/i.exec(u),m=p&&p[1]?p[1].toLowerCase():void 0,y=new TextDecoder(m);return f.arrayBuffer().then(M=>y.decode(M))}}}).then(f=>{aa.add(e,f);const h=bn[e];delete bn[e];for(let p=0,m=h.length;p<m;p++){const y=h[p];y.onLoad&&y.onLoad(f)}}).catch(f=>{const h=bn[e];if(h===void 0)throw this.manager.itemError(e),f;delete bn[e];for(let p=0,m=h.length;p<m;p++){const y=h[p];y.onError&&y.onError(f)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class cm extends Zs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,l=aa.get(e);if(l!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(l),o.manager.itemEnd(e)},0),l;const u=hr("img");function d(){h(),aa.add(e,this),t&&t(this),o.manager.itemEnd(e)}function f(p){h(),i&&i(p),o.manager.itemError(e),o.manager.itemEnd(e)}function h(){u.removeEventListener("load",d,!1),u.removeEventListener("error",f,!1)}return u.addEventListener("load",d,!1),u.addEventListener("error",f,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(u.crossOrigin=this.crossOrigin),o.manager.itemStart(e),u.src=e,u}}class xc extends Zs{constructor(e){super(e)}load(e,t,n,i){const o=new St,l=new cm(this.manager);return l.setCrossOrigin(this.crossOrigin),l.setPath(this.path),l.load(e,function(u){o.image=u,o.needsUpdate=!0,t!==void 0&&t(o)},n,i),o}}class yc extends Tt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const ts=new lt,xl=new q,yl=new q;class um{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xs,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xl.setFromMatrixPosition(e.matrixWorld),t.position.copy(xl),yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yl),t.updateMatrixWorld(),ts.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ts),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ts)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class dm extends um{constructor(){super(new da(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fm extends yc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Tt.DEFAULT_UP),this.updateMatrix(),this.target=new Tt,this.shadow=new dm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class hm extends yc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class bc{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=bl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function bl(){return(typeof performance>"u"?Date:performance).now()}class pm{constructor(e,t,n=0,i=1/0){this.ray=new js(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new qs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Fs(e,this,n,t),n.sort(Ml),n}intersectObjects(e,t=!0,n=[]){for(let i=0,o=e.length;i<o;i++)Fs(e[i],this,n,t);return n.sort(Ml),n}}function Ml(s,e){return s.distance-e.distance}function Fs(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let o=0,l=i.length;o<l;o++)Fs(i[o],e,t,!0)}}class Sl{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hs}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hs);const wl={type:"change"},ns={type:"start"},Tl={type:"end"};class mm extends pi{constructor(e,t,n){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gi.ROTATE,MIDDLE:gi.DOLLY,RIGHT:gi.PAN},this.touches={ONE:vi.ROTATE,TWO:vi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return d.phi},this.getAzimuthalAngle=function(){return d.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",N),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",N),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(wl),i.update(),l=o.NONE},this.update=function(){const I=new q,ue=new fi().setFromUnitVectors(e.up,new q(0,1,0)),_e=ue.clone().invert(),Se=new q,Te=new fi,Ae=2*Math.PI;return function(){const Ke=i.object.position;I.copy(Ke).sub(i.target),I.applyQuaternion(ue),d.setFromVector3(I),i.autoRotate&&l===o.NONE&&z(A()),i.enableDamping?(d.theta+=f.theta*i.dampingFactor,d.phi+=f.phi*i.dampingFactor):(d.theta+=f.theta,d.phi+=f.phi);let Xe=i.minAzimuthAngle,H=i.maxAzimuthAngle;return isFinite(Xe)&&isFinite(H)&&(Xe<-Math.PI?Xe+=Ae:Xe>Math.PI&&(Xe-=Ae),H<-Math.PI?H+=Ae:H>Math.PI&&(H-=Ae),Xe<=H?d.theta=Math.max(Xe,Math.min(H,d.theta)):d.theta=d.theta>(Xe+H)/2?Math.max(Xe,d.theta):Math.min(H,d.theta)),d.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,d.phi)),d.makeSafe(),d.radius*=h,d.radius=Math.max(i.minDistance,Math.min(i.maxDistance,d.radius)),i.enableDamping===!0?i.target.addScaledVector(p,i.dampingFactor):i.target.add(p),I.setFromSpherical(d),I.applyQuaternion(_e),Ke.copy(i.target).add(I),i.object.lookAt(i.target),i.enableDamping===!0?(f.theta*=1-i.dampingFactor,f.phi*=1-i.dampingFactor,p.multiplyScalar(1-i.dampingFactor)):(f.set(0,0,0),p.set(0,0,0)),h=1,m||Se.distanceToSquared(i.object.position)>u||8*(1-Te.dot(i.object.quaternion))>u?(i.dispatchEvent(wl),Se.copy(i.object.position),Te.copy(i.object.quaternion),m=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",pe),i.domElement.removeEventListener("pointerdown",We),i.domElement.removeEventListener("pointercancel",Ue),i.domElement.removeEventListener("wheel",et),i.domElement.removeEventListener("pointermove",Fe),i.domElement.removeEventListener("pointerup",je),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",N),i._domElementKeyEvents=null)};const i=this,o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=o.NONE;const u=1e-6,d=new Sl,f=new Sl;let h=1;const p=new q;let m=!1;const y=new Ne,M=new Ne,_=new Ne,x=new Ne,T=new Ne,E=new Ne,w=new Ne,S=new Ne,C=new Ne,D=[],O={};function A(){return 2*Math.PI/60/60*i.autoRotateSpeed}function P(){return Math.pow(.95,i.zoomSpeed)}function z(I){f.theta-=I}function j(I){f.phi-=I}const K=function(){const I=new q;return function(_e,Se){I.setFromMatrixColumn(Se,0),I.multiplyScalar(-_e),p.add(I)}}(),G=function(){const I=new q;return function(_e,Se){i.screenSpacePanning===!0?I.setFromMatrixColumn(Se,1):(I.setFromMatrixColumn(Se,0),I.crossVectors(i.object.up,I)),I.multiplyScalar(_e),p.add(I)}}(),k=function(){const I=new q;return function(_e,Se){const Te=i.domElement;if(i.object.isPerspectiveCamera){const Ae=i.object.position;I.copy(Ae).sub(i.target);let Be=I.length();Be*=Math.tan(i.object.fov/2*Math.PI/180),K(2*_e*Be/Te.clientHeight,i.object.matrix),G(2*Se*Be/Te.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(K(_e*(i.object.right-i.object.left)/i.object.zoom/Te.clientWidth,i.object.matrix),G(Se*(i.object.top-i.object.bottom)/i.object.zoom/Te.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function F(I){i.object.isPerspectiveCamera?h/=I:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*I)),i.object.updateProjectionMatrix(),m=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function $(I){i.object.isPerspectiveCamera?h*=I:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/I)),i.object.updateProjectionMatrix(),m=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function B(I){y.set(I.clientX,I.clientY),n()}function Y(I){w.set(I.clientX,I.clientY),n()}function V(I){x.set(I.clientX,I.clientY),n()}function U(I){M.set(I.clientX,I.clientY),_.subVectors(M,y).multiplyScalar(i.rotateSpeed);const ue=i.domElement;z(2*Math.PI*_.x/ue.clientHeight),j(2*Math.PI*_.y/ue.clientHeight),y.copy(M),i.update(),n()}function ee(I){S.set(I.clientX,I.clientY),C.subVectors(S,w),C.y>0?F(P()):C.y<0&&$(P()),w.copy(S),i.update(),n()}function X(I){T.set(I.clientX,I.clientY),E.subVectors(T,x).multiplyScalar(i.panSpeed),k(E.x,E.y),x.copy(T),i.update(),n()}function J(I){I.deltaY<0?$(P()):I.deltaY>0&&F(P()),i.update(),n()}function ne(I){let ue=!1;switch(I.code){case i.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?j(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,i.keyPanSpeed),ue=!0;break;case i.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?j(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(0,-i.keyPanSpeed),ue=!0;break;case i.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(i.keyPanSpeed,0),ue=!0;break;case i.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):k(-i.keyPanSpeed,0),ue=!0;break}ue&&(I.preventDefault(),i.update())}function W(){if(D.length===1)y.set(D[0].pageX,D[0].pageY);else{const I=.5*(D[0].pageX+D[1].pageX),ue=.5*(D[0].pageY+D[1].pageY);y.set(I,ue)}}function ce(){if(D.length===1)x.set(D[0].pageX,D[0].pageY);else{const I=.5*(D[0].pageX+D[1].pageX),ue=.5*(D[0].pageY+D[1].pageY);x.set(I,ue)}}function le(){const I=D[0].pageX-D[1].pageX,ue=D[0].pageY-D[1].pageY,_e=Math.sqrt(I*I+ue*ue);w.set(0,_e)}function ve(){i.enableZoom&&le(),i.enablePan&&ce()}function me(){i.enableZoom&&le(),i.enableRotate&&W()}function xe(I){if(D.length==1)M.set(I.pageX,I.pageY);else{const _e=Me(I),Se=.5*(I.pageX+_e.x),Te=.5*(I.pageY+_e.y);M.set(Se,Te)}_.subVectors(M,y).multiplyScalar(i.rotateSpeed);const ue=i.domElement;z(2*Math.PI*_.x/ue.clientHeight),j(2*Math.PI*_.y/ue.clientHeight),y.copy(M)}function Ee(I){if(D.length===1)T.set(I.pageX,I.pageY);else{const ue=Me(I),_e=.5*(I.pageX+ue.x),Se=.5*(I.pageY+ue.y);T.set(_e,Se)}E.subVectors(T,x).multiplyScalar(i.panSpeed),k(E.x,E.y),x.copy(T)}function Le(I){const ue=Me(I),_e=I.pageX-ue.x,Se=I.pageY-ue.y,Te=Math.sqrt(_e*_e+Se*Se);S.set(0,Te),C.set(0,Math.pow(S.y/w.y,i.zoomSpeed)),F(C.y),w.copy(S)}function Ie(I){i.enableZoom&&Le(I),i.enablePan&&Ee(I)}function ze(I){i.enableZoom&&Le(I),i.enableRotate&&xe(I)}function We(I){i.enabled!==!1&&(D.length===0&&(i.domElement.setPointerCapture(I.pointerId),i.domElement.addEventListener("pointermove",Fe),i.domElement.addEventListener("pointerup",je)),de(I),I.pointerType==="touch"?L(I):ke(I))}function Fe(I){i.enabled!==!1&&(I.pointerType==="touch"?re(I):tt(I))}function je(I){ge(I),D.length===0&&(i.domElement.releasePointerCapture(I.pointerId),i.domElement.removeEventListener("pointermove",Fe),i.domElement.removeEventListener("pointerup",je)),i.dispatchEvent(Tl),l=o.NONE}function Ue(I){ge(I)}function ke(I){if(!I.ctrlKey)return;let ue;switch(I.button){case 0:ue=i.mouseButtons.LEFT;break;case 1:ue=i.mouseButtons.MIDDLE;break;case 2:ue=i.mouseButtons.RIGHT;break;default:ue=-1}switch(ue){case gi.DOLLY:if(i.enableZoom===!1)return;Y(I),l=o.DOLLY;break;case gi.ROTATE:if(i.enableRotate===!1)return;B(I),l=o.ROTATE;break;case gi.PAN:if(i.enablePan===!1)return;V(I),l=o.PAN;break;default:l=o.NONE}l!==o.NONE&&i.dispatchEvent(ns)}function tt(I){switch(l){case o.ROTATE:if(i.enableRotate===!1)return;U(I);break;case o.DOLLY:if(i.enableZoom===!1)return;ee(I);break;case o.PAN:if(i.enablePan===!1)return;X(I);break}}function et(I){i.enabled===!1||i.enableZoom===!1||l!==o.NONE||(I.preventDefault(),i.dispatchEvent(ns),J(I),i.dispatchEvent(Tl))}function N(I){i.enabled===!1||i.enablePan===!1||ne(I)}function L(I){switch(Ce(I),D.length){case 1:switch(i.touches.ONE){case vi.ROTATE:if(i.enableRotate===!1)return;W(),l=o.TOUCH_ROTATE;break;case vi.PAN:if(i.enablePan===!1)return;ce(),l=o.TOUCH_PAN;break;default:l=o.NONE}break;case 2:switch(i.touches.TWO){case vi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ve(),l=o.TOUCH_DOLLY_PAN;break;case vi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;me(),l=o.TOUCH_DOLLY_ROTATE;break;default:l=o.NONE}break;default:l=o.NONE}l!==o.NONE&&i.dispatchEvent(ns)}function re(I){switch(Ce(I),l){case o.TOUCH_ROTATE:if(i.enableRotate===!1)return;xe(I),i.update();break;case o.TOUCH_PAN:if(i.enablePan===!1)return;Ee(I),i.update();break;case o.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ie(I),i.update();break;case o.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;ze(I),i.update();break;default:l=o.NONE}}function pe(I){i.enabled!==!1&&I.preventDefault()}function de(I){D.push(I)}function ge(I){delete O[I.pointerId];for(let ue=0;ue<D.length;ue++)if(D[ue].pointerId==I.pointerId){D.splice(ue,1);return}}function Ce(I){let ue=O[I.pointerId];ue===void 0&&(ue=new Ne,O[I.pointerId]=ue),ue.set(I.pageX,I.pageY)}function Me(I){const ue=I.pointerId===D[0].pointerId?D[1]:D[0];return O[ue.pointerId]}i.domElement.addEventListener("contextmenu",pe),i.domElement.addEventListener("pointerdown",We),i.domElement.addEventListener("pointercancel",Ue),i.domElement.addEventListener("wheel",et,{passive:!1}),this.update()}}function gm(s){var e=[];function t(d){e.push(d)}var n=new Jt(45,window.innerWidth/window.innerHeight,1,1e3);n.position.set(20,20,20);var i=new mm(n,s,()=>{for(var d of e)d()}),o=40,l=new q;l.subVectors(n.position,i.target),l.setLength(o),n.position.copy(i.target).add(l),i.zoomSpeed=2,n.position.set(20,20,20),i.target.set(0,0,0);function u(){n.position.set(20,20,20),i.target.set(0,0,0),i.update();for(var d of e)d()}return{camera:n,controls:i,addCallback:t,reset:u}}function vm(s){const e=new $s({color:16777215}),t=new Xt,n=[];for(let i=-s;i<=s-1;i+=1)n.push(-s,-.001,i),n.push(s-1,-.001,i),n.push(i,-.001,-s),n.push(i,-.001,s-1),n.push(-s,.001,i),n.push(s-1,.001,i),n.push(i,.001,-s),n.push(i,.001,s-1);return t.setAttribute("position",new en(n,3)),new vc(t,e)}function _m(s,e){function t(){e(s.clientWidth,s.clientHeight)}t(),window.addEventListener("resize",()=>{t()})}const ia={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class pa{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const xm=new da(-1,1,1,-1,0,1),Ks=new Xt;Ks.setAttribute("position",new en([-1,3,0,-1,-1,0,3,-1,0],3));Ks.setAttribute("uv",new en([0,2,0,0,2,0],2));class Mc{constructor(e){this._mesh=new Pt(Ks,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,xm)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ym extends pa{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ni.clone(e.uniforms),this.material=new Lt({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Mc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class El extends pa{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let l,u;this.inverse?(l=0,u=1):(l=1,u=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),o.buffers.stencil.setFunc(i.ALWAYS,l,4294967295),o.buffers.stencil.setClear(u),o.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(i.EQUAL,1,4294967295),o.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),o.buffers.stencil.setLocked(!0)}}class bm extends pa{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Mm{constructor(e,t){if(this.renderer=e,t===void 0){const n=e.getSize(new Ne);this._pixelRatio=e.getPixelRatio(),this._width=n.width,this._height=n.height,t=new Bt(this._width*this._pixelRatio,this._height*this._pixelRatio),t.texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ym(ia),this.clock=new bc}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,o=this.passes.length;i<o;i++){const l=this.passes[i];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),l.needsSwap){if(n){const u=this.renderer.getContext(),d=this.renderer.state.buffers.stencil;d.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),d.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}El!==void 0&&(l instanceof El?n=!0:l instanceof bm&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Sm{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,n){return e[0]*t+e[1]*n}dot3(e,t,n,i){return e[0]*t+e[1]*n+e[2]*i}dot4(e,t,n,i,o){return e[0]*t+e[1]*n+e[2]*i+e[3]*o}noise(e,t){let n,i,o;const l=.5*(Math.sqrt(3)-1),u=(e+t)*l,d=Math.floor(e+u),f=Math.floor(t+u),h=(3-Math.sqrt(3))/6,p=(d+f)*h,m=d-p,y=f-p,M=e-m,_=t-y;let x,T;M>_?(x=1,T=0):(x=0,T=1);const E=M-x+h,w=_-T+h,S=M-1+2*h,C=_-1+2*h,D=d&255,O=f&255,A=this.perm[D+this.perm[O]]%12,P=this.perm[D+x+this.perm[O+T]]%12,z=this.perm[D+1+this.perm[O+1]]%12;let j=.5-M*M-_*_;j<0?n=0:(j*=j,n=j*j*this.dot(this.grad3[A],M,_));let K=.5-E*E-w*w;K<0?i=0:(K*=K,i=K*K*this.dot(this.grad3[P],E,w));let G=.5-S*S-C*C;return G<0?o=0:(G*=G,o=G*G*this.dot(this.grad3[z],S,C)),70*(n+i+o)}noise3d(e,t,n){let i,o,l,u;const d=.3333333333333333,f=(e+t+n)*d,h=Math.floor(e+f),p=Math.floor(t+f),m=Math.floor(n+f),y=1/6,M=(h+p+m)*y,_=h-M,x=p-M,T=m-M,E=e-_,w=t-x,S=n-T;let C,D,O,A,P,z;E>=w?w>=S?(C=1,D=0,O=0,A=1,P=1,z=0):E>=S?(C=1,D=0,O=0,A=1,P=0,z=1):(C=0,D=0,O=1,A=1,P=0,z=1):w<S?(C=0,D=0,O=1,A=0,P=1,z=1):E<S?(C=0,D=1,O=0,A=0,P=1,z=1):(C=0,D=1,O=0,A=1,P=1,z=0);const j=E-C+y,K=w-D+y,G=S-O+y,k=E-A+2*y,F=w-P+2*y,$=S-z+2*y,B=E-1+3*y,Y=w-1+3*y,V=S-1+3*y,U=h&255,ee=p&255,X=m&255,J=this.perm[U+this.perm[ee+this.perm[X]]]%12,ne=this.perm[U+C+this.perm[ee+D+this.perm[X+O]]]%12,W=this.perm[U+A+this.perm[ee+P+this.perm[X+z]]]%12,ce=this.perm[U+1+this.perm[ee+1+this.perm[X+1]]]%12;let le=.6-E*E-w*w-S*S;le<0?i=0:(le*=le,i=le*le*this.dot3(this.grad3[J],E,w,S));let ve=.6-j*j-K*K-G*G;ve<0?o=0:(ve*=ve,o=ve*ve*this.dot3(this.grad3[ne],j,K,G));let me=.6-k*k-F*F-$*$;me<0?l=0:(me*=me,l=me*me*this.dot3(this.grad3[W],k,F,$));let xe=.6-B*B-Y*Y-V*V;return xe<0?u=0:(xe*=xe,u=xe*xe*this.dot3(this.grad3[ce],B,Y,V)),32*(i+o+l+u)}noise4d(e,t,n,i){const o=this.grad4,l=this.simplex,u=this.perm,d=(Math.sqrt(5)-1)/4,f=(5-Math.sqrt(5))/20;let h,p,m,y,M;const _=(e+t+n+i)*d,x=Math.floor(e+_),T=Math.floor(t+_),E=Math.floor(n+_),w=Math.floor(i+_),S=(x+T+E+w)*f,C=x-S,D=T-S,O=E-S,A=w-S,P=e-C,z=t-D,j=n-O,K=i-A,G=P>z?32:0,k=P>j?16:0,F=z>j?8:0,$=P>K?4:0,B=z>K?2:0,Y=j>K?1:0,V=G+k+F+$+B+Y,U=l[V][0]>=3?1:0,ee=l[V][1]>=3?1:0,X=l[V][2]>=3?1:0,J=l[V][3]>=3?1:0,ne=l[V][0]>=2?1:0,W=l[V][1]>=2?1:0,ce=l[V][2]>=2?1:0,le=l[V][3]>=2?1:0,ve=l[V][0]>=1?1:0,me=l[V][1]>=1?1:0,xe=l[V][2]>=1?1:0,Ee=l[V][3]>=1?1:0,Le=P-U+f,Ie=z-ee+f,ze=j-X+f,We=K-J+f,Fe=P-ne+2*f,je=z-W+2*f,Ue=j-ce+2*f,ke=K-le+2*f,tt=P-ve+3*f,et=z-me+3*f,N=j-xe+3*f,L=K-Ee+3*f,re=P-1+4*f,pe=z-1+4*f,de=j-1+4*f,ge=K-1+4*f,Ce=x&255,Me=T&255,I=E&255,ue=w&255,_e=u[Ce+u[Me+u[I+u[ue]]]]%32,Se=u[Ce+U+u[Me+ee+u[I+X+u[ue+J]]]]%32,Te=u[Ce+ne+u[Me+W+u[I+ce+u[ue+le]]]]%32,Ae=u[Ce+ve+u[Me+me+u[I+xe+u[ue+Ee]]]]%32,Be=u[Ce+1+u[Me+1+u[I+1+u[ue+1]]]]%32;let Ke=.6-P*P-z*z-j*j-K*K;Ke<0?h=0:(Ke*=Ke,h=Ke*Ke*this.dot4(o[_e],P,z,j,K));let Xe=.6-Le*Le-Ie*Ie-ze*ze-We*We;Xe<0?p=0:(Xe*=Xe,p=Xe*Xe*this.dot4(o[Se],Le,Ie,ze,We));let H=.6-Fe*Fe-je*je-Ue*Ue-ke*ke;H<0?m=0:(H*=H,m=H*H*this.dot4(o[Te],Fe,je,Ue,ke));let ae=.6-tt*tt-et*et-N*N-L*L;ae<0?y=0:(ae*=ae,y=ae*ae*this.dot4(o[Ae],tt,et,N,L));let fe=.6-re*re-pe*pe-de*de-ge*ge;return fe<0?M=0:(fe*=fe,M=fe*fe*this.dot4(o[Be],re,pe,de,ge)),27*(h+p+m+y+M)}}const Gr={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Ne},cameraProjectionMatrix:{value:new lt},cameraInverseProjectionMatrix:{value:new lt},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );
			float viewZ = getViewZ( depth );

			vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
			vec3 viewNormal = getViewNormal( vUv );

			vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
			vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

			// compute matrix used to reorient a kernel vector

			vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
			vec3 bitangent = cross( viewNormal, tangent );
			mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

		 float occlusion = 0.0;

		 for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

				vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
				vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

				vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
				samplePointNDC /= samplePointNDC.w;

				vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

				float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
				float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
				float delta = sampleDepth - realDepth;

				if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

					occlusion += 1.0;

				}

			}

			occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

			gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

		}`},Hr={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Vr={uniforms:{tDiffuse:{value:null},resolution:{value:new Ne}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};class hn extends pa{constructor(e,t,n,i){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernelSize=32,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=new Map,this.generateSampleKernel(),this.generateRandomKernelRotations();const o=new gc;o.format=di,o.type=si,this.beautyRenderTarget=new Bt(this.width,this.height),this.normalRenderTarget=new Bt(this.width,this.height,{minFilter:qe,magFilter:qe,depthTexture:o}),this.ssaoRenderTarget=new Bt(this.width,this.height),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Lt({defines:Object.assign({},Gr.defines),uniforms:Ni.clone(Gr.uniforms),vertexShader:Gr.vertexShader,fragmentShader:Gr.fragmentShader,blending:Ct}),this.ssaoMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new rm,this.normalMaterial.blending=Ct,this.blurMaterial=new Lt({defines:Object.assign({},Vr.defines),uniforms:Ni.clone(Vr.uniforms),vertexShader:Vr.vertexShader,fragmentShader:Vr.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Lt({defines:Object.assign({},Hr.defines),uniforms:Ni.clone(Hr.uniforms),vertexShader:Hr.vertexShader,fragmentShader:Hr.fragmentShader,blending:Ct}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Lt({uniforms:Ni.clone(ia.uniforms),vertexShader:ia.vertexShader,fragmentShader:ia.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ql,blendDst:Es,blendEquation:Un,blendSrcAlpha:jl,blendDstAlpha:Es,blendEquationAlpha:Un}),this.fsQuad=new Mc(null),this.originalClearColor=new Je}dispose(){this.beautyRenderTarget.dispose(),this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t){switch(e.capabilities.isWebGL2===!1&&(this.noiseTexture.format=Kl),e.setRenderTarget(this.beautyRenderTarget),e.clear(),e.render(this.scene,this.camera),this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this.renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case hn.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Ct,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case hn.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Ct,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case hn.OUTPUT.Beauty:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=Ct,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case hn.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case hn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Ct,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case hn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.beautyRenderTarget.texture,this.copyMaterial.blending=Ct,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Hl,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}renderPass(e,t,n,i,o){e.getClearColor(this.originalClearColor);const l=e.getClearAlpha(),u=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i!=null&&(e.setClearColor(i),e.setClearAlpha(o||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=u,e.setClearColor(this.originalClearColor),e.setClearAlpha(l)}renderOverride(e,t,n,i,o){e.getClearColor(this.originalClearColor);const l=e.getClearAlpha(),u=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,i=t.clearColor||i,o=t.clearAlpha||o,i!=null&&(e.setClearColor(i),e.setClearAlpha(o||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=u,e.setClearColor(this.originalClearColor),e.setClearAlpha(l)}setSize(e,t){this.width=e,this.height=t,this.beautyRenderTarget.setSize(e,t),this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}generateSampleKernel(){const e=this.kernelSize,t=this.kernel;for(let n=0;n<e;n++){const i=new q;i.x=Math.random()*2-1,i.y=Math.random()*2-1,i.z=Math.random(),i.normalize();let o=n/e;o=Ku.lerp(.1,1,o*o),i.multiplyScalar(o),t.push(i)}}generateRandomKernelRotations(){const n=new Sm,i=4*4,o=new Float32Array(i);for(let l=0;l<i;l++){const u=Math.random()*2-1,d=Math.random()*2-1,f=0;o[l]=n.noise3d(u,d,f)}this.noiseTexture=new Ns(o,4,4,Ql,jt),this.noiseTexture.wrapS=ci,this.noiseTexture.wrapT=ci,this.noiseTexture.needsUpdate=!0}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){t.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(n){const i=t.get(n);n.visible=i}),t.clear()}}hn.OUTPUT={Default:0,SSAO:1,Blur:2,Beauty:3,Depth:4,Normal:5};function wm(s,e){const t=new ha({antialias:!0,canvas:s});t.shadowMap.enabled=!0,t.shadowMap.type=Gl,t.shadowMap.soft=!0,t.shadowMap.bias=-1e-4,t.shadowMap.darkness=1,t.shadowMap.width=2048,t.shadowMap.height=2048,t.setPixelRatio(window.devicePixelRatio),t.setClearColor(16777215,0);const n=new or;var i=new Mm(t);const o=new hn(n,e.camera,1e3,1e3);o.kernelRadius=2,o.minDistance=1e-10,o.maxDistance=.1,i.addPass(o),o.output=hn.OUTPUT.Default,_m(s,(d,f)=>{t.setSize(d,f),e.camera.aspect=d/f,e.camera.updateProjectionMatrix(),i.setSize(d,f),o.setSize(d,f)});function l(){i.render()}function u(d){n.add(d)}return{render:l,add:u}}function Tm(){var s=[],e=new hm(16777215,.6);s.push(e);const t=new fm(16777215,.2);return t.position.set(10,10,-10),t.castShadow=!0,t.shadow.camera.left=-100,t.shadow.camera.right=100,t.shadow.camera.top=100,t.shadow.camera.bottom=-100,t.shadow.mapSize.width=4096,t.shadow.mapSize.height=4096,s.push(t),s}var zn=new Int32Array(4096);function Em(s,e){if(s.length==0)return{geometry:{vertices:[],faces:[],normals:[]},edges:{vertices:[],faces:[]}};const t=Im(s),n=Sc(s),i=Cm(n),{texture:o,uvs:l}=Dm(i,t);i.faces=i.faces.map(Lm);for(var u=i.vertices.reduce((T,E)=>T+E.length,0),d=i.faces.reduce((T,E)=>T+E.length,0),f=i.normals.reduce((T,E)=>T+E.length,0),h=0,p=0,m=0,y=new Float32Array(u),M=new Uint32Array(d),_=new Float32Array(f),x=0;x<i.vertices.length;x++)y.set(i.vertices[x],h),h+=i.vertices[x].length;for(var x=0;x<i.faces.length;x++)M.set(i.faces[x],p),p+=i.faces[x].length;for(var x=0;x<i.normals.length;x++)_.set(i.normals[x],m),m+=i.normals[x].length;return i.vertices=y,i.faces=M,i.normals=_,i.uvs=l,{geometry:i,texture:o}}function Am(s){const e=Sc(s);return Pm(e)}function Cm({volume:s,dims:e,bounds:t}){const{min_x:n,min_y:i,min_z:o}=t;let{vertices:l,faces:u,normals:d,uvs:f}=Nm(s,e);for(var h=0;h<l.length;h++)l[h][0]+=n,l[h][1]+=i,l[h][2]+=o;return{vertices:l,faces:u,normals:d,uvs:f}}function Dm(s,e){const{normals:t,vertices:n,uvs:i}=s;for(var o=[],l=0;l<n.length;l+=4){var u=t[l],d=u[0]!=0?0:u[1]!=0?1:2,f=n[l],h=n[l+2],p=[Math.min(f[0],h[0]),Math.min(f[1],h[1]),Math.min(f[2],h[2])],m=[Math.max(f[0],h[0]),Math.max(f[1],h[1]),Math.max(f[2],h[2])];m[d]+=1;var y=[];o.push(y);for(var M=p[0];M<m[0];M++)for(var _=p[1];_<m[1];_++)for(var x=p[2];x<m[2];x++){var T=[M,_,x],E=u[d];E>0&&(T[d]-=E);var w=e[Rm(T)],S=T.map((V,U)=>V-p[U]);S.splice(d,1),u[2]==0&&(S=S.reverse()),y.push({color:w,position:S})}}for(var C=1,D=1,O=0,A=0,l=0;l<o.length;l++){var P=l*4,z=P+1,j=P+2,K=P+3,G=i[j][0],k=i[j][1];O+=G,A=Math.max(A,k)}O+=1+o.length*2,A+=2;var F=document.createElement("canvas");F.width=O,F.height=A;for(var $=F.getContext("2d"),B=$.createImageData(O,A),l=0;l<o.length;l++){var P=l*4,z=P+1,j=P+2,K=P+3,G=i[j][0],k=i[j][1];i[P][0]+=C,i[P][1]+=D,i[z][0]+=C,i[z][1]+=D,i[j][0]+=C,i[j][1]+=D,i[K][0]+=C,i[K][1]+=D;for(var M=0;M<o[l].length;M++){var w=o[l][M].color,S=o[l][M].position,P=(C+S[0])*4+(D+S[1])*4*O;B.data[P]=w.r,B.data[P+1]=w.g,B.data[P+2]=w.b,B.data[P+3]=255}C+=G+2}$.putImageData(B,0,0);function Y(V){var U=document.createElement("canvas");U.width=O,U.height=A;var ee=U.getContext("2d");return ee.drawImage(V,1,0),ee.drawImage(V,-1,0),ee.drawImage(V,0,1),ee.drawImage(V,0,-1),ee.drawImage(V,0,0),U}return{texture:Y(F),uvs:i}}function Pm({volume:s,dims:e,bounds:t}){const{min_x:n,min_y:i,min_z:o}=t;for(var{vertices:l,faces:u}=Fm(s,e),d=0;d<l.length;d+=3)l[d]+=n,l[d+1]+=i,l[d+2]+=o;for(var d=0;d<l.length;d+=12){var f=d,h=d+3,p=d+6,m=d+9,y=[(l[h+1]-l[f+1])*(l[p+2]-l[f+2])-(l[h+2]-l[f+2])*(l[p+1]-l[f+1]),(l[h+2]-l[f+2])*(l[p+0]-l[f+0])-(l[h+0]-l[f+0])*(l[p+2]-l[f+2]),(l[h+0]-l[f+0])*(l[p+1]-l[f+1])-(l[h+1]-l[f+1])*(l[p+0]-l[f+0])],M=.001;l[f+0]=l[f+0]+y[0]*M,l[f+1]=l[f+1]+y[1]*M,l[f+2]=l[f+2]+y[2]*M,l[h+0]=l[h+0]+y[0]*M,l[h+1]=l[h+1]+y[1]*M,l[h+2]=l[h+2]+y[2]*M,l[p+0]=l[p+0]+y[0]*M,l[p+1]=l[p+1]+y[1]*M,l[p+2]=l[p+2]+y[2]*M,l[m+0]=l[m+0]+y[0]*M,l[m+1]=l[m+1]+y[1]*M,l[m+2]=l[m+2]+y[2]*M}for(var _=[],d=0;d<l.length;d+=6)_.push(l[d]),_.push(l[d+1]),_.push(l[d+2]),_.push(l[d+3]),_.push(l[d+4]),_.push(l[d+5]),_.push(l[d+3]),_.push(l[d+4]),_.push(l[d+5]);return l=_,{vertices:l,faces:u}}function Sc(s){var e=zm(s);const{min_x:t,min_y:n,min_z:i,max_x:o,max_y:l,max_z:u}=e;for(var d=new Int32Array((o-t+1)*(l-n+1)*(u-i+1)),f=[o-t+1,l-n+1,u-i+1],h=0;h<s.length;h++){var p=s[h];d[p.x-t+(p.y-n)*f[0]+(p.z-i)*f[0]*f[1]]=1}return{volume:d,dims:f,bounds:e}}function Lm(s){return[s[0],s[1],s[2],s[0],s[2],s[3]]}function Rm(s){return s[0]+","+s[1]+","+s[2]}function Im(s,e){for(var t={},n=0;n<s.length;n++){var i=s[n];t[i.x+","+i.y+","+i.z]=s[n].color}return t}function zm(s){for(var e=s[0].x,t=s[0].x,n=s[0].y,i=s[0].y,o=s[0].z,l=s[0].z,u=1;u<s.length;u++){var d=s[u];d.x<e&&(e=d.x),d.x>t&&(t=d.x),d.y<n&&(n=d.y),d.y>i&&(i=d.y),d.z<o&&(o=d.z),d.z>l&&(l=d.z)}return{min_x:e,min_y:n,min_z:o,max_x:t,max_y:i,max_z:l}}function Nm(s,e){for(var t=[],n=[],i=[],o=[],l=[],u=e[0],d=e[1],f=u*d,h=0;h<3;++h){var p,m,y,M,_,x,T,E,w,S=(h+1)%3,C=(h+2)%3,D=[0,0,0],O=[0,0,0],A=[0,0,0],P=[0,0,0],z=e[h],j=e[S],K=e[C],G,k,F;for(zn.length<j*K&&(zn=new Int32Array(j*K)),O[h]=1,D[h]=-1,G=u*O[1],k=f*O[2];D[h]<z;){for(F=D[h],E=0,D[C]=0;D[C]<K;++D[C])for(D[S]=0;D[S]<j;++D[S],++E){var $=F>=0&&s[D[0]+u*D[1]+f*D[2]],B=F<z-1&&s[D[0]+O[0]+u*D[1]+G+f*D[2]+k];if($?B:!B){zn[E]=0;continue}zn[E]=$||-B}for(++D[h],E=0,m=0;m<K;++m)for(p=0;p<j;){let We=function(je,Ue,ke,tt){var et=Math.min(je[0],Ue[0],ke[0],tt[0]),N=Math.max(je[0],Ue[0],ke[0],tt[0]),L=Math.min(je[1],Ue[1],ke[1],tt[1]),re=Math.max(je[1],Ue[1],ke[1],tt[1]);return[et,N,L,re]},Fe=function(je,Ue){var ke=[...je];return ke.splice(Ue,1),ke};var Le=We,Ie=Fe;if(w=zn[E],!w){p++,E++;continue}for(_=1;w===zn[E+_]&&p+_<j;)_++;for(T=1;m+T<K;++T){for(y=0;y<_&&w===zn[E+y+T*j];)y++;if(y<_)break}A[h]=0,P[h]=0,D[S]=p,D[C]=m,w>0?(P[C]=T,P[S]=0,A[S]=_,A[C]=0):(w=-w,A[C]=T,A[S]=0,P[S]=_,P[C]=0);var Y=t.length;t.push([D[0],D[1],D[2]]),t.push([D[0]+A[0],D[1]+A[1],D[2]+A[2]]),t.push([D[0]+A[0]+P[0],D[1]+A[1]+P[1],D[2]+A[2]+P[2]]),t.push([D[0]+P[0],D[1]+P[1],D[2]+P[2]]),n.push([Y,Y+1,Y+2,Y+3,w]);var V=t[Y],U=t[Y+1],ee=t[Y+2],X=t[Y+3],J=[(U[1]-V[1])*(ee[2]-V[2])-(U[2]-V[2])*(ee[1]-V[1]),(U[2]-V[2])*(ee[0]-V[0])-(U[0]-V[0])*(ee[2]-V[2]),(U[0]-V[0])*(ee[1]-V[1])-(U[1]-V[1])*(ee[0]-V[0])],ne=0,W=0,l=0;if(J[0]!=0){var ce=Fe(V,0),le=Fe(U,0),ve=Fe(ee,0),me=Fe(X,0),xe=We(ce,le,ve,me);J[0]>0&&(l=-90),ne=xe[3]-xe[2],W=xe[1]-xe[0]}else if(J[1]!=0){var ce=Fe(V,1),le=Fe(U,1),ve=Fe(ee,1),me=Fe(X,1),xe=We(ce,le,ve,me);J[1]<0&&(l=-90),ne=xe[3]-xe[2],W=xe[1]-xe[0]}else if(J[2]!=0){var ce=Fe(V,2),le=Fe(U,2),ve=Fe(ee,2),me=Fe(X,2),xe=We(ce,le,ve,me);J[2]<0&&(l=-90),ne=xe[1]-xe[0],W=xe[3]-xe[2]}l==0?(o.push([0,0]),o.push([ne,0]),o.push([ne,W]),o.push([0,W])):l==-90&&(o.push([0,0]),o.push([0,W]),o.push([ne,W]),o.push([ne,0]));var Ee=Math.sqrt(J[0]*J[0]+J[1]*J[1]+J[2]*J[2]);for(J[0]/=Ee,J[1]/=Ee,J[2]/=Ee,i.push(J),i.push(J),i.push(J),i.push(J),x=E+_,M=0;M<T;++M)for(y=E;y<x;++y)zn[y+M*j]=0;p+=_,E+=_}}}return{vertices:t,faces:n,normals:i,uvs:o}}function Fm(s,e){for(var t=new Array(3),n=0;n<3;++n)t[n]=[[0,0,0],[0,0,0]],t[n][0][(n+1)%3]=1,t[n][1][(n+2)%3]=1;var i=[],o=[],l=[0,0,0],u=[[!1,!0],[!1,!0],[!1,!0]],d=-e[0]*e[1];for(u[2]=[!1,!0],l[2]=-1;l[2]<e[2];u[2]=[!0,++l[2]<e[2]-1])for(d-=e[0],u[1]=[!1,!0],l[1]=-1;l[1]<e[1];u[1]=[!0,++l[1]<e[1]-1])for(d-=1,u[0]=[!1,!0],l[0]=-1;l[0]<e[0];u[0]=[!0,++l[0]<e[0]-1],++d)for(var f=u[0][0]&&u[1][0]&&u[2][0]?s[d]:0,h=[u[0][1]&&u[1][0]&&u[2][0]?s[d+1]:0,u[0][0]&&u[1][1]&&u[2][0]?s[d+e[0]]:0,u[0][0]&&u[1][0]&&u[2][1]?s[d+e[0]*e[1]]:0],p=0;p<3;++p)if(!!f!=!!h[p]){var m=f?0:1,y=[l[0],l[1],l[2]],M=t[p][m],_=t[p][m^1];++y[p];var x=i.length;i.push(y[0],y[1],y[2]),i.push(y[0]+M[0],y[1]+M[1],y[2]+M[2]),i.push(y[0]+M[0]+_[0],y[1]+M[1]+_[1],y[2]+M[2]+_[2]),i.push(y[0]+_[0],y[1]+_[1],y[2]+_[2]),o.push(x,x+1,x+2,x+3,m?h[p]:f)}return{vertices:i,faces:o}}function Al(s=1){const t={},n=[];var i=new Xt,o=new im({color:16777215,polygonOffset:!0,polygonOffsetFactor:s}),l=new Xt,u=new $s({color:16777215,linewidth:0}),d=new vc(l,u),f=new Pt(i,o);f.receiveShadow=!0,f.castShadow=!0,j();function h(F,$){var B=[F];if(Z.mirrorX){var Y=[];for(var F of B){var V=JSON.parse(JSON.stringify(F));V.x=-F.x-1,Y.push(V)}B=B.concat(Y)}if(Z.mirrorY){var Y=[];for(var F of B){var V=JSON.parse(JSON.stringify(F));V.y=-F.y-1,Y.push(V)}B=B.concat(Y)}if(Z.mirrorZ){var Y=[];for(var F of B){var V=JSON.parse(JSON.stringify(F));V.z=-F.z-1,Y.push(V)}B=B.concat(Y)}return B}function p(F,$=!1,B=!1){if(!!Z.selected_layer.isVisible())for(var Y of F)if($){delete Y.i,Y.color={...Z.foreground},Y.layer=Z.selected_layer.id;for(var Y of h(Y))M(Y,B)}else M(Y,B)}function m(F){if(!!Z.selected_layer.isVisible())for(var $ of F)for(var $ of h($))x($)}function y(F){var $=Math.floor(F.x/19)+","+Math.floor(F.y/19)+","+Math.floor(F.z/19);return t[$]==null&&(t[$]={voxels:[],geometry:null,obj:{}}),t[$]}function M(F,$=!1){if(F.x==null||F.y==null||F.z==null)return;var B=F.x+","+F.y+","+F.z;const Y=y(F);Y.obj[B]==null&&(Y.obj[B]=Y.voxels.length,Y.voxels.push(F),Y.modified=!0,Y.modifiedAfterReplace=!0)}function _(){return Object.values(t).map(F=>F.voxels).flat()}function x(F){if(F.x==null||F.y==null||F.z==null)return;var $=F.x+","+F.y+","+F.z;const B=y(F);if(B.obj[$]!=null){var Y=B.obj[$];if(B.voxels[Y].layer==Z.selected_layer.id){delete B.obj[$];var V=B.voxels.pop();Y!=B.voxels.length&&(B.voxels[Y]=V,B.obj[V.x+","+V.y+","+V.z]=Y),B.modified=!0,B.modifiedAfterReplace=!0}}}function T(F){for(var $ of Object.keys(t)){var B=t[$],Y=B.voxels,V=[],U={};for(var ee of Y)ee.layer!=F.id&&(V.push(ee),U[ee.x+","+ee.y+","+ee.z]=V.length-1);B.voxels=V,B.obj=U,B.modified=!0,B.modifiedAfterReplace=!0}}function E(F,$=!1){for(var B of Object.keys(t))F[B]||delete t[B];for(var B of Object.keys(F))if(!(t[B]&&!t[B].modifiedAfterReplace&&!$)){var Y=F[B],V={};V.geometry=Y.geometry,V.edges=Y.edges,V.voxels=[];for(var U of Y.voxels){var ee={};ee.x=U.x,ee.y=U.y,ee.z=U.z,ee.color={...U.color},ee.layer=U.layer,V.voxels.push(ee)}V.obj={...Y.obj},V.texture=Y.texture,V.modifiedAfterReplace=!1,t[B]=V}}function w(){for(var F of Object.keys(t))delete t[F]}function S(){o.visible=!1,u.visible=!1}function C(){o.visible=!0,u.visible=!0}function D(){for(var F of _())delete F.originalColor}function O(F,$,B){var Y=parseFloat(Z.feather);if(Y>0)var V=F/Y;else var V=1;V>1&&(V=1);var U={};return U.r=$.r*(1-B.a*V)+B.r*B.a*V,U.g=$.g*(1-B.a*V)+B.g*B.a*V,U.b=$.b*(1-B.a*V)+B.b*B.a*V,U}function A(F,$){for(var B of F)for(var B of h(B)){if(B.x==null||B.y==null||B.z==null)continue;var Y=B.x+","+B.y+","+B.z;const le=y(B);if(le.obj[Y]!=null){var V=le.obj[Y];if(V!=null&&le.voxels[V].layer==Z.selected_layer.id){var U={...$};if(le.voxels[V].originalColor){var ee=le.voxels[V].originalColor;B.i==null&&(B.i=0);var X=O(1-B.i,ee,U),J={};J.r=Math.abs(X.r-U.r)<Math.abs(le.voxels[V].color.r-U.r)?X.r:le.voxels[V].color.r,J.g=Math.abs(X.g-U.g)<Math.abs(le.voxels[V].color.g-U.g)?X.g:le.voxels[V].color.g,J.b=Math.abs(X.b-U.b)<Math.abs(le.voxels[V].color.b-U.b)?X.b:le.voxels[V].color.b,le.voxels[V].color=J}else{var ne=le.voxels[V].color,W=O(1-B.i,ne,U);le.voxels[V].originalColor=le.voxels[V].color,le.voxels[V].color=W}le.modified=!0,le.modifiedAfterReplace=!0}}}}function P(F){var $=y(F),B=$.obj[F.x+","+F.y+","+F.z];if(B!=null)return $.voxels[B].color}function z(){for(var F of Object.values(t))F.modified=!0;j()}function j(){var F={vertices:[],faces:[],normals:[],uvs:[]},$=[],B=[],et=0,Y=[],V=0,U=0;for(var ee of Object.values(t)){if(ee.modified){for(var X=[],J={},ne=0;ne<ee.voxels.length;ne++){var W=Z.layers[ee.voxels[ne].layer];W.isVisible()&&(X.push(ee.voxels[ne]),J[ee.voxels[ne].x+","+ee.voxels[ne].y+","+ee.voxels[ne].z]=ne)}const{geometry:de,texture:ge}=Em(X);ee.geometry=de,ee.texture=ge;var ce=[];if(Z.wireframeMode=="Wireframe selected")for(var ne=0;ne<ee.voxels.length;ne++){var W=Z.layers[ee.voxels[ne].layer];W.isSelected()&&W.isVisible()&&ce.push(ee.voxels[ne])}else Z.wireframeMode=="Wireframe all"&&(ce=X);ce.length>0?ee.edges=Am(ce):ee.edges={vertices:[]},ee.modified=!1}ee.geometry==null||ee.geometry.vertices.length==0||(F.vertices.push(ee.geometry.vertices),F.faces.push(ee.geometry.faces.map(de=>de+et)),F.normals.push(ee.geometry.normals),$.push(ee.geometry.uvs),B.push(ee.edges.vertices),Y.push(ee.texture),U+=ee.texture.height,V=Math.max(V,ee.texture.width),et+=ee.geometry.vertices.length/3)}var le=document.createElement("canvas"),ve=le.getContext("2d"),me=0;le.width=V,le.height=U,F.uvs=[];for(var xe of Y){ve.drawImage(xe,0,me);for(var Ee=$.shift(),ne=0;ne<Ee.length;ne++)F.uvs.push(Ee[ne][0]/V),F.uvs.push(1-(Ee[ne][1]+me)/U);me+=xe.height}for(var Le=F.vertices.reduce((de,ge)=>de+ge.length,0),Ie=F.faces.reduce((de,ge)=>de+ge.length,0),ze=F.normals.reduce((de,ge)=>de+ge.length,0),We=B.reduce((de,ge)=>de+ge.length,0),Fe=new Float32Array(Le),je=new Uint32Array(Ie),Ue=new Float32Array(ze),ke=new Float32Array(We),tt=0,et=0,N=0,L=0,ne=0;ne<F.vertices.length;ne++)Fe.set(F.vertices[ne],tt),je.set(F.faces[ne],et),Ue.set(F.normals[ne],N),ke.set(B[ne],L),tt+=F.vertices[ne].length,et+=F.faces[ne].length,N+=F.normals[ne].length,L+=B[ne].length;i.setAttribute("position",new gt(new Float32Array(Fe),3)),i.setIndex(new gt(new Uint32Array(je),1)),i.setAttribute("normal",new gt(new Float32Array(Ue),3)),i.setAttribute("uv",new gt(new Float32Array(F.uvs),2)),i.computeBoundingSphere(),l.setAttribute("position",new gt(new Float32Array(ke),3));var re=new _c(le);re.magFilter=qe,re.minFilter=qe,o.map=re;for(var pe of n)pe()}function K({x:F,y:$,z:B}){var Y=y({x:F,y:$,z:B});return Y.obj[F+","+$+","+B]!=null}function G(F){return(...$)=>{F(...$),j()}}function k(F){n.push(F)}return{add:G(p),setColor:G(A),remove:G(m),clear:G(w),replace:G(E),getColor:P,getChuck:y,clear_layer:T,clearPaintIteration:D,getVoxels:_,hide:S,hasVoxelAt:K,show:C,update:j,forceUpdate:z,addCallback:k,chunks:t,mesh:f,geometry:i,material:o,wireframeMesh:d}}function Li({x:s,y:e,z:t},{x:n,y:i,z:o}){if(Math.sqrt(Math.pow(n-s,2)+Math.pow(i-e,2)+Math.pow(o-t,2))>1e3)return[];return l(s,e,t,n,i,o);function l(u,d,f,h,p,m){var y=[];y.push({c:u,y:d,z:f});const{abs:M}=Math;var _=M(h-u),x=M(p-d),T=M(m-f),E,w,S;if(h>u?E=1:E=-1,p>d?w=1:w=-1,m>f?S=1:S=-1,_>=x&&_>=T)for(var C=2*x-_,D=2*T-_;u!=h;)u+=E,C>=0&&(d+=w,C-=2*_),D>=0&&(f+=S,D-=2*_),C+=2*x,D+=2*T,y.push({x:u,y:d,z:f});else if(x>=_&&x>=T)for(var C=2*_-x,D=2*T-x;d!=p;)d+=w,C>=0&&(u+=E,C-=2*x),D>=0&&(f+=S,D-=2*x),C+=2*_,D+=2*T,y.push({x:u,y:d,z:f});else for(var C=2*x-T,D=2*_-T;f!=m;)f+=S,C>=0&&(d+=w,C-=2*T),D>=0&&(u+=E,D-=2*T),C+=2*x,D+=2*_,y.push({x:u,y:d,z:f});return y}}function Ri(s,e,t,n){n=new q(n.x,n.y,n.z);const i=new q,o=new En;i.x=e=="x"?0:t.position.x,i.y=e=="y"?0:t.position.y,i.z=e=="z"?0:t.position.z,o.setFromNormalAndCoplanarPoint(i,n);const l=new q;return s.ray.intersectPlane(o,l),e!="x"&&(l.x=0),e!="y"&&(l.y=0),e!="z"&&(l.z=0),l}function Om(s,e,t,n,i,o){e.addEventListener("mousedown",u),e.addEventListener("mousemove",d),e.addEventListener("mouseup",f);const l=new pm;function u(p){p.ctrlKey||(l.setFromCamera(h(p),s.camera),Cl(t,l,m=>n(p,{raycaster:l,...m})))}function d(p){p.ctrlKey||(l.setFromCamera(h(p),s.camera),Cl(t,l,m=>i(p,{raycaster:l,...m})))}function f(p){o(p)}function h(p){const m={};var y=Number(e.$get_computed_style("width").slice(0,-2)),M=Number(e.$get_computed_style("height").slice(0,-2));return m.x=p.offsetX/y*2-1,m.y=-(p.offsetY/M)*2+1,m}}const km=new q(0,1,0),Um=new q(0,0,0),Bm=new En().setFromNormalAndCoplanarPoint(km,Um);function Cl(s,e,t){const n=e.intersectObjects(s);if(n.length>0){var l=n[0].point,i=n[0].face.normal.clone(),o=n[0].object;i.transformDirection(o.matrixWorld);var l=n[0].point.clone(),u=n[0].point.clone();l.addScaledVector(i,.5),u.addScaledVector(i,-.5);var d=is(l),f=is(u);t({point:d,origin:f,axis:Gm(i),normal_direction:Hm(i)})}else{const h=new q;e.ray.intersectPlane(Bm,h),h.y+=.1;var d=is(h);t({point:d,origin:null,axis:"y",normal_direction:1})}}function is(s){return s.x=Math.floor(s.x),s.y=Math.floor(s.y),s.z=Math.floor(s.z),s}function Gm(s){return s.x!=0?"x":s.y!=0?"y":s.z!=0?"z":null}function Hm(s){if(s.x>0||s.y>0||s.z>0)return 1;if(s.x<0||s.y<0||s.z<0)return-1}function un(s,e,t){if(e-=1,e==0)return[{x:s.x,y:s.y,z:s.z,i:0}];if(Z.shape=="Sphere")return Vm(s,e);if(Z.shape=="Cube")return Wm(s,e);if(Z.shape=="Circle")return jm(s,e,t);if(Z.shape=="Square")return qm(s,e,t)}function Vm(s,e){const t=[];for(let n=s.x-e;n<=s.x+e;n++)for(let i=s.y-e;i<=s.y+e;i++)for(let o=s.z-e;o<=s.z+e;o++){const l=Math.sqrt(Math.pow(n-s.x,2)+Math.pow(i-s.y,2)+Math.pow(o-s.z,2));l<=e&&t.push({x:n,y:i,z:o,i:l/e})}return t}function Wm(s,e){const t=[];for(let i=s.x-e;i<=s.x+e;i++)for(let o=s.y-e;o<=s.y+e;o++)for(let l=s.z-e;l<=s.z+e;l++){var n=Math.max(Math.abs(i-s.x),Math.abs(o-s.y),Math.abs(l-s.z));t.push({x:i,y:o,z:l,i:n/e})}return t}function jm(s,e,t){const n=[];var i,o,l;t=="x"?(i="y",o="z",l="x"):t=="y"?(i="x",o="z",l="y"):t=="z"&&(i="x",o="y",l="z");for(let d=s[i]-e;d<=s[i]+e;d++)for(let f=s[o]-e;f<=s[o]+e;f++){const h=Math.sqrt(Math.pow(d-s[i],2)+Math.pow(f-s[o],2));if(h<=e){var u={};u[i]=d,u[o]=f,u[l]=s[l],u.i=h/e,n.push(u)}}return n}function qm(s,e,t){const n=[];var i,o,l;t=="x"?(i="y",o="z",l="x"):t=="y"?(i="x",o="z",l="y"):t=="z"&&(i="x",o="y",l="z");for(let f=s[i]-e;f<=s[i]+e;f++)for(let h=s[o]-e;h<=s[o]+e;h++){var u=Math.max(Math.abs(f-s[i]),Math.abs(h-s[o])),d={};d[i]=f,d[o]=h,d[l]=s[l],d.i=u/e,n.push(d)}return n}function an({x:s,y:e,z:t},{x:n,y:i,z:o}){var l=[];s>n&&([s,n]=[n,s]),e>i&&([e,i]=[i,e]),t>o&&([t,o]=[o,t]);for(var u=s;u<=n;u++)for(var d=e;d<=i;d++)for(var f=t;f<=o;f++)l.push({x:u,y:d,z:f});return l}function Xm(s){var e={};s.setMirror=function(n){e[n]()};function t(n){var i=new li(25,25,32),o=new ua({color:16777215,side:Cn,transparent:!0,opacity:.1}),l=new Pt(i,o);n=="x"?l.rotation.y=Math.PI/2:n=="y"&&(l.rotation.x=Math.PI/2),o.visible=!1;var u=!1;return e[n]=()=>{u=!u,u?o.visible=!0:o.visible=!1,u?s["mirror"+n.toUpperCase()]=!0:s["mirror"+n.toUpperCase()]=!1},l}return[t("x"),t("y"),t("z")]}function Ym(s,e,t){var n=[];const i=new Set;return o(s),n;function o(l){var u=l.x+","+l.y+","+l.z;if(!(!Z.voxel.hasVoxelAt(l)||i.has(u))){i.add(u),n.push(l);var d={...l};d[e]+=t,e!="x"&&(Z.voxel.hasVoxelAt({x:d.x+1,y:d.y,z:d.z})||o({x:l.x+1,y:l.y,z:l.z}),Z.voxel.hasVoxelAt({x:d.x-1,y:d.y,z:d.z})||o({x:l.x-1,y:l.y,z:l.z})),e!="y"&&(Z.voxel.hasVoxelAt({x:d.x,y:d.y+1,z:d.z})||o({x:l.x,y:l.y+1,z:l.z}),Z.voxel.hasVoxelAt({x:d.x,y:d.y-1,z:d.z})||o({x:l.x,y:l.y-1,z:l.z})),e!="z"&&(Z.voxel.hasVoxelAt({x:d.x,y:d.y,z:d.z+1})||o({x:l.x,y:l.y,z:l.z+1}),Z.voxel.hasVoxelAt({x:d.x,y:d.y,z:d.z-1})||o({x:l.x,y:l.y,z:l.z-1}))}}}let wt=0,nt=[],ri=[],ai=[],Wr=[],Nn,Pe,Yn=null,Mn=null,ut=0,dt=0,Sn=!1,sn=new q,Fn=new q,$n=new q,Zn=new q,at=new q,jr=new q,Dl=new q,Pl=new q,Zt=new q;new q;let Ji=new q,er=new q,tr=new q,nr=new q,be,st,wn,Tn,On,rs,ft,qr,Xr,Yr,Kt,$r,Kn,Qn,as,ss,os,ls,cs,us,Ll,Rl,ds,Zr=4;function ir(){this.idSelf=0,this.idPrimitive=-1,this.idRightChild=0,this.idParent=0,this.minCorner=new q,this.maxCorner=new q}function fs(s,e,t){if(Sn=!1,sn.set(1/0,1/0,1/0),Fn.set(-1/0,-1/0,-1/0),!(s.length<1)){if(s.length==1){be=s[0];let n=new ir;n.idSelf=nt.length,n.idPrimitive=be,n.idRightChild=-1,n.idParent=e,n.minCorner.set(Pe[9*be+0],Pe[9*be+1],Pe[9*be+2]),n.maxCorner.set(Pe[9*be+3],Pe[9*be+4],Pe[9*be+5]),nt.push(n),t&&(nt[e].idRightChild=n.idSelf);return}else if(s.length==2){for(let l=0;l<2;l++)be=s[l],$n.set(Pe[9*be+0],Pe[9*be+1],Pe[9*be+2]),Zn.set(Pe[9*be+3],Pe[9*be+4],Pe[9*be+5]),sn.min($n),Fn.max(Zn);let n=new ir;n.idSelf=nt.length,n.idPrimitive=-1,n.idRightChild=nt.length+2,n.idParent=e,n.minCorner.copy(sn),n.maxCorner.copy(Fn),nt.push(n),t&&(nt[e].idRightChild=n.idSelf),be=s[0];let i=new ir;i.idSelf=nt.length,i.idPrimitive=be,i.idRightChild=-1,i.idParent=n.idSelf,i.minCorner.set(Pe[9*be+0],Pe[9*be+1],Pe[9*be+2]),i.maxCorner.set(Pe[9*be+3],Pe[9*be+4],Pe[9*be+5]),nt.push(i),be=s[1];let o=new ir;o.idSelf=nt.length,o.idPrimitive=be,o.idRightChild=-1,o.idParent=n.idSelf,o.minCorner.set(Pe[9*be+0],Pe[9*be+1],Pe[9*be+2]),o.maxCorner.set(Pe[9*be+3],Pe[9*be+4],Pe[9*be+5]),nt.push(o);return}else if(s.length>2){Dl.set(1/0,1/0,1/0),Pl.set(-1/0,-1/0,-1/0),Zt.set(0,0,0);for(let i=0;i<s.length;i++)be=s[i],$n.set(Pe[9*be+0],Pe[9*be+1],Pe[9*be+2]),Zn.set(Pe[9*be+3],Pe[9*be+4],Pe[9*be+5]),jr.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),sn.min($n),Fn.max(Zn),Dl.min(jr),Pl.max(jr),Zt.add(jr);Zt.divideScalar(s.length);let n=new ir;n.idSelf=nt.length,n.idPrimitive=-1,n.idRightChild=0,n.idParent=e,n.minCorner.copy(sn),n.maxCorner.copy(Fn),nt.push(n),t&&(nt[e].idRightChild=n.idSelf),wn=Fn.x-sn.x,Tn=Fn.y-sn.y,On=Fn.z-sn.z,rs=s.length*(wn*Tn+Tn*On+On*wn),Yn=null,Mn=null;for(let i=0;i<3;i++){i==0?(ft=sn.x,qr=wn/Zr):i==1?(ft=sn.y,qr=Tn/Zr):(ft=sn.z,qr=On/Zr);for(let o=1;o<Zr;o++){ft+=qr,Ji.set(1/0,1/0,1/0),er.set(-1/0,-1/0,-1/0),tr.set(1/0,1/0,1/0),nr.set(-1/0,-1/0,-1/0),Xr=0,Yr=0;for(let l=0;l<s.length;l++)be=s[l],$n.set(Pe[9*be+0],Pe[9*be+1],Pe[9*be+2]),Zn.set(Pe[9*be+3],Pe[9*be+4],Pe[9*be+5]),at.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),i==0?st=at.x:i==1?st=at.y:st=at.z,st<ft?(Ji.min($n),er.max(Zn),Xr++):(tr.min($n),nr.max(Zn),Yr++);Xr<1||Yr<1||(as=er.x-Ji.x,ss=er.y-Ji.y,os=er.z-Ji.z,ls=nr.x-tr.x,cs=nr.y-tr.y,us=nr.z-tr.z,Ll=as*ss+ss*os+os*as,Rl=ls*cs+cs*us+us*ls,ds=Ll*Xr+Rl*Yr,ds<rs&&(rs=ds,Yn=ft,Mn=i,Sn=!0))}}}if(!Sn){wn>=Tn&&wn>=On?($r=0,Tn>=On?(Kn=1,Qn=2):(Kn=2,Qn=1)):Tn>=wn&&Tn>=On?($r=1,wn>=On?(Kn=0,Qn=2):(Kn=2,Qn=0)):($r=2,wn>=Tn?(Kn=0,Qn=1):(Kn=1,Qn=0)),Kt=$r,ut=0,dt=0;for(let n=0;n<s.length;n++)be=s[n],at.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),Kt==0?(st=at.x,ft=Zt.x):Kt==1?(st=at.y,ft=Zt.y):(st=at.z,ft=Zt.z),st<ft?ut++:dt++;if(ut>0&&dt>0&&(Yn=ft,Mn=Kt,Sn=!0),!Sn){Kt=Kn,ut=0,dt=0;for(let n=0;n<s.length;n++)be=s[n],at.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),Kt==0?(st=at.x,ft=Zt.x):Kt==1?(st=at.y,ft=Zt.y):(st=at.z,ft=Zt.z),st<ft?ut++:dt++;ut>0&&dt>0&&(Yn=ft,Mn=Kt,Sn=!0)}if(!Sn){Kt=Qn,ut=0,dt=0;for(let n=0;n<s.length;n++)be=s[n],at.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),Kt==0?(st=at.x,ft=Zt.x):Kt==1?(st=at.y,ft=Zt.y):(st=at.z,ft=Zt.z),st<ft?ut++:dt++;ut>0&&dt>0&&(Yn=ft,Mn=Kt,Sn=!0)}}if(ut=0,dt=0,!Sn){for(let n=0;n<s.length;n++)n%2==0?ut++:dt++;ri[wt]=new Uint32Array(ut),ai[wt]=new Uint32Array(dt),ut=0,dt=0;for(let n=0;n<s.length;n++)be=s[n],n%2==0?(ri[wt][ut]=be,ut++):(ai[wt][dt]=be,dt++);return}ut=0,dt=0;for(let n=0;n<s.length;n++)be=s[n],at.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),Mn==0?st=at.x:Mn==1?st=at.y:st=at.z,st<Yn?ut++:dt++;ri[wt]=new Uint32Array(ut),ai[wt]=new Uint32Array(dt),ut=0,dt=0;for(let n=0;n<s.length;n++)be=s[n],at.set(Pe[9*be+6],Pe[9*be+7],Pe[9*be+8]),Mn==0?st=at.x:Mn==1?st=at.y:st=at.z,st<Yn?(ri[wt][ut]=be,ut++):(ai[wt][dt]=be,dt++)}}function $m(s,e){for(Nn=s,Pe=new Float32Array(e),nt=[],ri=[],ai=[],Wr=[],wt=0,Wr.push(-1),fs(Nn,-1,!1);wt>-1;)Nn=ri[wt],Nn!=null?(ri[wt]=null,wt++,Wr.push(nt.length-1),fs(Nn,nt.length-1,!1)):(Nn=ai[wt],Nn!=null?(ai[wt]=null,wt++,fs(Nn,Wr.pop(),!0)):wt--);for(let t=0;t<nt.length;t++)e[8*t+0]=nt[t].idPrimitive,e[8*t+1]=nt[t].minCorner.x,e[8*t+2]=nt[t].minCorner.y,e[8*t+3]=nt[t].minCorner.z,e[8*t+4]=nt[t].idRightChild,e[8*t+5]=nt[t].maxCorner.x,e[8*t+6]=nt[t].maxCorner.y,e[8*t+7]=nt[t].maxCorner.z}async function Zm(s=null){var e={add:o,Build:i};if(!s){const l=document.createElement("canvas");l.width=1,l.height=1;const u=l.getContext("2d");u.fillStyle="rgb(80, 128, 255)",u.fillRect(0,0,1,1),s=new _c(l)}s.encoding=pn,s.minFilter=qe,s.magFilter=qe,s.flipY=!0;var t=null,n=null;async function i(){const l=await Jm(t!=null?t:[],n!=null?n:[]);Km(l,s,e.pathTracingUniforms),e.AlphaGeometry=t}function o(l){t=l.map(u=>u.geometry),n=l.map(u=>u.albedo),i()}return e}function Km({triangleDataTexture:s,aabbDataTexture:e,uniqueMaterialTextures:t},n,i){let o=500,l=2,u=[1,.98,.92];i.tTriangleTexture={value:s},i.tAABBTexture={value:e},i.tHDRTexture={value:n},i.tAlbedoTextures={value:t},i.uSkyLightIntensity={value:o},i.uSunLightIntensity={value:l},i.uSunColor={value:new Je().fromArray(u.map(d=>d))},i.uSunDirection={value:new q}}function Qm(s){const e=new Xt;var t=new Uint32Array(s.length);let n=0,i=0,o=0;for(let _=0;_<s.length;_++)n+=s[_].attributes.position.array.length,i+=s[_].index.array.length,o+=s[_].attributes.uv.array.length;const l=new Float32Array(n),u=new Float32Array(n),d=new Float32Array(o),f=new Uint32Array(i);let h=0,p=0,m=0,y=0;for(let _=0;_<s.length;_++){const x=s[_];l.set(x.attributes.position.array,h),u.set(x.attributes.normal.array,h),d.set(x.attributes.uv.array,m),f.set(x.index.array,p);for(let T=0;T<x.index.array.length;T++)f[p+T]+=h/3;var M=x.index.array.length/3;y+=M,t[_]=y,h+=x.attributes.position.array.length,p+=x.index.array.length,m+=x.attributes.uv.array.length}return e.setAttribute("position",new gt(l,3)),e.setAttribute("normal",new gt(u,3)),e.setAttribute("uv",new gt(d,2)),e.setIndex(new gt(f,1)),{mergedGeometry:e,material_start_offset:t}}async function Jm(s,e){let t=new q(0,0,0);const{mergedGeometry:n,material_start_offset:i}=Qm(s);let o=new Pt(n);o.geometry.index&&(o.geometry=o.geometry.toNonIndexed());let l=o.geometry.attributes.position.array.length/9,u=new Uint32Array(l),d=new Float32Array(2048*2048*4);const f=new Float32Array(2048*2048*4),h=1;var p=new q,m=new q,y=new q,M=new Float32Array(o.geometry.attributes.position.array);o.geometry.attributes.normal===void 0&&o.geometry.computeVertexNormals();var _=new Float32Array(o.geometry.attributes.normal.array),x=!1;if(o.geometry.attributes.uv!==void 0){var T=new Float32Array(o.geometry.attributes.uv.array);x=!0}var E=0;for(let A=0;A<l;A++){A>=i[E]&&E++;var w=A*6,S=A*9,C=A*32;p.set(1/0,1/0,1/0),m.set(-1/0,-1/0,-1/0);let P=new q,z=new q,j=new q;x?(P.set(T[w+0],T[w+1]),z.set(T[w+2],T[w+3]),j.set(T[w+4],T[w+5])):(P.set(-1,-1),z.set(-1,-1),j.set(-1,-1));let K=new q(_[S+0],_[S+1],_[S+2]).normalize(),G=new q(_[S+3],_[S+4],_[S+5]).normalize(),k=new q(_[S+6],_[S+7],_[S+8]).normalize(),F=new q(M[S+0],M[S+1],M[S+2]),$=new q(M[S+3],M[S+4],M[S+5]),B=new q(M[S+6],M[S+7],M[S+8]);F.multiplyScalar(h),$.multiplyScalar(h),B.multiplyScalar(h),F.add(t),$.add(t),B.add(t),d[C+0]=F.x,d[C+1]=F.y,d[C+2]=F.z,d[C+3]=$.x,d[C+4]=$.y,d[C+5]=$.z,d[C+6]=B.x,d[C+7]=B.y,d[C+8]=B.z,d[C+9]=K.x,d[C+10]=K.y,d[C+11]=K.z,d[C+12]=G.x,d[C+13]=G.y,d[C+14]=G.z,d[C+15]=k.x,d[C+16]=k.y,d[C+17]=k.z,d[C+18]=P.x,d[C+19]=P.y,d[C+20]=z.x,d[C+21]=z.y,d[C+22]=j.x,d[C+23]=j.y,d[C+24]=0,d[C+25]=0,d[C+26]=0,d[C+27]=0,d[C+28]=E,d[C+29]=1,d[C+30]=1,d[C+31]=2,p.copy(p.min(F)),m.copy(m.max(F)),p.copy(p.min($)),m.copy(m.max($)),p.copy(p.min(B)),m.copy(m.max(B)),y.copy(p).add(m).multiplyScalar(.5),f[S+0]=p.x,f[S+1]=p.y,f[S+2]=p.z,f[S+3]=m.x,f[S+4]=m.y,f[S+5]=m.z,f[S+6]=y.x,f[S+7]=y.y,f[S+8]=y.z,u[A]=A}$m(u,f);const D=new Ns(d,2048,2048,Dt,jt,St.DEFAULT_MAPPING,Ot,Ot,qe,qe,1,pn);D.flipY=!1,D.generateMipmaps=!1,D.needsUpdate=!0;const O=new Ns(f,2048,2048,Dt,jt,St.DEFAULT_MAPPING,Ot,Ot,qe,qe,1,pn);return O.flipY=!1,O.generateMipmaps=!1,O.needsUpdate=!0,{triangleDataTexture:D,aabbDataTexture:O,uniqueMaterialTextures:e}}he.pathtracing_uniforms_and_defines=`
uniform sampler2D tPreviousTexture;
uniform sampler2D tBlueNoiseTexture;
uniform mat4 uCameraMatrix;
uniform vec2 uResolution;
uniform vec2 uRandomVec2;
uniform float uEPS_intersect;
uniform float uTime;
uniform float uSampleCounter;
uniform float uFrameCounter;
uniform float uULen;
uniform float uVLen;
uniform float uApertureSize;
uniform float uFocusDistance;
uniform float uPreviousSampleCount;
uniform bool uCameraIsMoving;
uniform bool uUseOrthographicCamera;

in vec2 vUv;

#define PI               3.14159265358979323
#define TWO_PI           6.28318530717958648
#define FOUR_PI          12.5663706143591729
#define ONE_OVER_PI      0.31830988618379067
#define ONE_OVER_TWO_PI  0.15915494309
#define ONE_OVER_FOUR_PI 0.07957747154594767
#define PI_OVER_TWO      1.57079632679489662
#define ONE_OVER_THREE   0.33333333333333333
#define E                2.71828182845904524
#define INFINITY         1000000.0
#define QUADRIC_EPSILON  0.00001
#define SPOT_LIGHT -2
#define POINT_LIGHT -1
#define LIGHT 0
#define DIFF 1
#define REFR 2
#define SPEC 3
#define COAT 4
#define CARCOAT 5
#define TRANSLUCENT 6
#define SPECSUB 7
#define CHECK 8
#define WATER 9
#define PBR_MATERIAL 10
#define WOOD 11
#define SEAFLOOR 12
#define TERRAIN 13
#define CLOTH 14
#define LIGHTWOOD 15
#define DARKWOOD 16
#define PAINTING 17
#define METALCOAT 18
#define TRUE 1
#define FALSE 0
`;he.pathtracing_skymodel_defines=`
#define TURBIDITY 1.0
#define RAYLEIGH_COEFFICIENT 3.0
#define MIE_COEFFICIENT 0.03
#define MIE_DIRECTIONAL_G 0.76
// constants for atmospheric scattering
#define THREE_OVER_SIXTEENPI 0.05968310365946075
#define ONE_OVER_FOURPI 0.07957747154594767
// wavelength of used primaries, according to preetham
#define LAMBDA vec3( 680E-9, 550E-9, 450E-9 )
#define TOTAL_RAYLEIGH vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 )
// mie stuff
// K coefficient for the primaries
#define K vec3(0.686, 0.678, 0.666)
#define MIE_V 4.0
#define MIE_CONST vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 )
// optical length at zenith for molecules
#define RAYLEIGH_ZENITH_LENGTH 8400.0
#define MIE_ZENITH_LENGTH 1250.0
#define UP_VECTOR vec3(0.0, 1.0, 0.0)
#define SUN_POWER 1000.0
// 66 arc seconds -> degrees, and the cosine of that
#define SUN_ANGULAR_DIAMETER_COS 0.9998 //0.9999566769
#define CUTOFF_ANGLE 1.6110731556870734
#define STEEPNESS 1.5
`;he.pathtracing_plane_intersect=`
//-----------------------------------------------------------------------
float PlaneIntersect( vec4 pla, vec3 rayOrigin, vec3 rayDirection )
//-----------------------------------------------------------------------
{
	vec3 n = pla.xyz;
	float denom = dot(n, rayDirection);
	
        vec3 pOrO = (pla.w * n) - rayOrigin; 
        float result = dot(pOrO, n) / denom;
	return (result > 0.0) ? result : INFINITY;
}
`;he.pathtracing_single_sided_plane_intersect=`
//----------------------------------------------------------------------------
float SingleSidedPlaneIntersect( vec4 pla, vec3 rayOrigin, vec3 rayDirection )
//----------------------------------------------------------------------------
{
	vec3 n = pla.xyz;
	float denom = dot(n, rayDirection);
	if (denom > 0.0) return INFINITY;
	
        vec3 pOrO = (pla.w * n) - rayOrigin; 
        float result = dot(pOrO, n) / denom;
	return (result > 0.0) ? result : INFINITY;
}
`;he.pathtracing_disk_intersect=`
//-------------------------------------------------------------------------------------------
float DiskIntersect( float radius, vec3 pos, vec3 normal, vec3 rayOrigin, vec3 rayDirection )
//-------------------------------------------------------------------------------------------
{
	vec3 pOrO = pos - rayOrigin;
	float denom = dot(-normal, rayDirection);
	// use the following for one-sided disk
	//if (denom <= 0.0) return INFINITY;
	
        float result = dot(pOrO, -normal) / denom;
	if (result < 0.0) return INFINITY;
        vec3 intersectPos = rayOrigin + rayDirection * result;
	vec3 v = intersectPos - pos;
	float d2 = dot(v,v);
	float radiusSq = radius * radius;
	if (d2 > radiusSq)
		return INFINITY;
		
	return result;
}
`;he.pathtracing_rectangle_intersect=`
//----------------------------------------------------------------------------------------------------------------
float RectangleIntersect( vec3 pos, vec3 normal, float radiusU, float radiusV, vec3 rayOrigin, vec3 rayDirection )
//----------------------------------------------------------------------------------------------------------------
{
	float dt = dot(-normal, rayDirection);
	// use the following for one-sided rectangle
	if (dt < 0.0) return INFINITY;

	float t = dot(-normal, pos - rayOrigin) / dt;
	if (t < 0.0) return INFINITY;
	
	vec3 hit = rayOrigin + rayDirection * t;
	vec3 vi = hit - pos;
	vec3 U = normalize( cross( abs(normal.y) < 0.9 ? vec3(0, 1, 0) : vec3(0, 0, 1), normal ) );
	vec3 V = cross(normal, U);
	return (abs(dot(U, vi)) > radiusU || abs(dot(V, vi)) > radiusV) ? INFINITY : t;
}
`;he.pathtracing_slab_intersect=`
//---------------------------------------------------------------------------------------------
float SlabIntersect( float radius, vec3 normal, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//---------------------------------------------------------------------------------------------
{
	n = dot(normal, rayDirection) < 0.0 ? normal : -normal;
	float rad = dot(rayOrigin, n) > radius ? radius : -radius; 
	float denom = dot(n, rayDirection);
	vec3 pOrO = (rad * n) - rayOrigin; 
	float t = dot(pOrO, n) / denom;
	return t > 0.0 ? t : INFINITY;
}
`;he.pathtracing_sphere_intersect=`
/* int solveQuadratic(float A, float B, float C, out float t0, out float t1)
{
	float discrim = B * B - 4.0 * A * C;
    
	if (discrim < 0.0)
        	return FALSE;
    
	float rootDiscrim = sqrt(discrim);
	float Q = (B > 0.0) ? -0.5 * (B + rootDiscrim) : -0.5 * (B - rootDiscrim); 
	// float t_0 = Q / A; 
	// float t_1 = C / Q;
	// t0 = min( t_0, t_1 );
	// t1 = max( t_0, t_1 );
	t1 = Q / A; 
	t0 = C / Q;
	
	return TRUE;
} */
// optimized algorithm for solving quadratic equations developed by Dr. Po-Shen Loh -> https://youtu.be/XKBX0r3J-9Y
// Adapted to root finding (ray t0/t1) for all quadric shapes (sphere, ellipsoid, cylinder, cone, etc.) by Erich Loftis
void solveQuadratic(float A, float B, float C, out float t0, out float t1)
{
	float invA = 1.0 / A;
	B *= invA;
	C *= invA;
	float neg_halfB = -B * 0.5;
	float u2 = neg_halfB * neg_halfB - C;
	float u = u2 < 0.0 ? neg_halfB = 0.0 : sqrt(u2);
	t0 = neg_halfB - u;
	t1 = neg_halfB + u;
}

//-----------------------------------------------------------------------------
float SphereIntersect( float rad, vec3 pos, vec3 rayOrigin, vec3 rayDirection )
//-----------------------------------------------------------------------------
{
	float t0, t1;
	vec3 L = rayOrigin - pos;
	float a = dot( rayDirection, rayDirection );
	float b = 2.0 * dot( rayDirection, L );
	float c = dot( L, L ) - (rad * rad);
	solveQuadratic(a, b, c, t0, t1);
	return t0 > 0.0 ? t0 : t1 > 0.0 ? t1 : INFINITY;
}
`;he.pathtracing_unit_bounding_sphere_intersect=`

float UnitBoundingSphereIntersect( vec3 ro, vec3 rd, out int insideSphere )
{
	float t0, t1;
	float a = dot(rd, rd);
	float b = 2.0 * dot(rd, ro);
	float c = dot(ro, ro) - (1.01 * 1.01); // - (rad * rad) = - (1.0 * 1.0) = - 1.0 
	solveQuadratic(a, b, c, t0, t1);
	if (t0 > 0.0)
	{
		insideSphere = FALSE;
		return t0;
	}
	if (t1 > 0.0)
	{
		insideSphere = TRUE;
		return t1;
	}

	return INFINITY;
}
`;he.pathtracing_unit_sphere_intersect=`

float UnitSphereIntersect( vec3 ro, vec3 rd, out vec3 n )
{
	vec3 hitPoint;
	float t0, t1;
	float a = dot(rd, rd);
	float b = 2.0 * dot(rd, ro);
	float c = dot(ro, ro) - 1.0;// radius * radius = 1.0 * 1.0 = 1.0 
	solveQuadratic(a, b, c, t0, t1);
	
	// first, try t0
	if (t0 > 0.0)
	{
		hitPoint = ro + rd * t0;
		n = hitPoint;
		return t0;
	}
	// if t0 was invalid, try t1
	if (t1 > 0.0)
	{
		hitPoint = ro + rd * t1;
		n = hitPoint;
		return t1;
	}

	return 0.0;
}
`;he.pathtracing_unit_cylinder_intersect=`

float UnitCylinderIntersect( vec3 ro, vec3 rd, out vec3 n )
{
	vec3 hitPoint;
	float t0, t1;
	float a = rd.x * rd.x + rd.z * rd.z;
	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z);
	float c = (ro.x * ro.x + ro.z * ro.z) - 0.99;// 0.99 prevents clipping at cylinder walls 
	solveQuadratic(a, b, c, t0, t1);
	
	// first, try t0
	hitPoint = ro + rd * t0;
	if (t0 > 0.0 && abs(hitPoint.y) <= 1.0)
	{
		n = vec3(hitPoint.x, 0.0, hitPoint.z);
		return t0;
	}
	// if t0 was invalid, try t1
	hitPoint = ro + rd * t1;
	if (t1 > 0.0 && abs(hitPoint.y) <= 1.0)
	{
		n = vec3(hitPoint.x, 0.0, hitPoint.z);
		return t1;
	}

	return 0.0;
}
`;he.pathtracing_unit_cone_intersect=`

float UnitConeIntersect( vec3 ro, vec3 rd, out vec3 n )
{
	// the '(ro.y - h)' parts below truncate the top half of the double-cone, leaving a single cone with apex at top
	vec3 hitPoint;
	float t0, t1;
	float h = 1.0;	      // 0.25 makes the circular base of cone end up as radius of 1, unit length
	float a = rd.x * rd.x - (0.25 * rd.y * rd.y) + rd.z * rd.z;
	float b = 2.0 * (rd.x * ro.x - (0.25 * rd.y * (ro.y - h)) + rd.z * ro.z);
	float c = ro.x * ro.x - (0.25 * (ro.y - h) * (ro.y - h)) + ro.z * ro.z;
	solveQuadratic(a, b, c, t0, t1);
	
	// first, try t0
	hitPoint = ro + rd * t0;
	if (t0 > 0.0 && abs(hitPoint.y) <= 1.0)
	{
		n = vec3(hitPoint.x, (h - hitPoint.y) * 0.25, hitPoint.z);
		return t0;
	}
	// if t0 was invalid, try t1
	hitPoint = ro + rd * t1;
	if (t1 > 0.0 && abs(hitPoint.y) <= 1.0)
	{
		n = vec3(hitPoint.x, (h - hitPoint.y) * 0.25, hitPoint.z);
		return t1;
	}

	return 0.0;
}
`;he.pathtracing_unit_paraboloid_intersect=`

float UnitParaboloidIntersect( vec3 ro, vec3 rd, out vec3 n )
{
	vec3 hitPoint;
	float t0, t1;
	float k = 0.5;
	float a = rd.x * rd.x + rd.z * rd.z;
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z) + k * rd.y;
    	float c = ro.x * ro.x + (k * (ro.y - 1.0)) + ro.z * ro.z; 
	solveQuadratic(a, b, c, t0, t1);
	
	// first, try t0
	hitPoint = ro + rd * t0;
	if (t0 > 0.0 && abs(hitPoint.y) <= 1.0)
	{
		n = vec3(2.0 * hitPoint.x, k, 2.0 * hitPoint.z);
		return t0;
	}
	// if t0 was invalid, try t1
	hitPoint = ro + rd * t1;
	if (t1 > 0.0 && abs(hitPoint.y) <= 1.0)
	{
		n = vec3(2.0 * hitPoint.x, k, 2.0 * hitPoint.z);
		return t1;
	}

	return 0.0;
}
`;he.pathtracing_unit_box_intersect=`

float UnitBoxIntersect( vec3 ro, vec3 rd, out vec3 n )
{
	vec3 invDir = 1.0 / rd;
	vec3 near = (vec3(-1) - ro) * invDir; // unit radius box: vec3(-1,-1,-1) min corner
	vec3 far  = (vec3( 1) - ro) * invDir;  // unit radius box: vec3(+1,+1,+1) max corner
	
	vec3 tmin = min(near, far);
	vec3 tmax = max(near, far);
	float t0 = max( max(tmin.x, tmin.y), tmin.z);
	float t1 = min( min(tmax.x, tmax.y), tmax.z);

	if (t0 > t1) // test for invalid intersection
		return 0.0;

	if (t0 > 0.0)
	{
		n = -sign(rd) * step(tmin.yzx, tmin) * step(tmin.zxy, tmin);
		return t0;
	}
	if (t1 > 0.0)
	{
		n = -sign(rd) * step(tmax, tmax.yzx) * step(tmax, tmax.zxy);
		return t1;
	}
	
	return 0.0;
}
`;he.pathtracing_quadric_intersect=`

/*
The Quadric shape Parameters (A-J) are stored in a 4x4 matrix (a 'mat4' in GLSL).
Following the technique found in the 2004 paper, "Ray Tracing Arbitrary Objects on the GPU" by Wood, et al.,
the parameter layout is:
mat4 shape = mat4(A, B, C, D,
		  B, E, F, G,
		  C, F, H, I,
		  D, G, I, J);
*/

float QuadricIntersect(mat4 shape, vec4 ro, vec4 rd) 
{
	vec4 rda = shape * rd;
    	vec4 roa = shape * ro;
	vec3 hitPoint;
    
    	// quadratic coefficients
    	float a = dot(rd, rda);
    	float b = dot(ro, rda) + dot(rd, roa);
    	float c = dot(ro, roa);
	
	float t0, t1;
	solveQuadratic(a, b, c, t0, t1);

	// restrict valid intersections to be inside unit bounding box vec3(-1,-1,-1) to vec3(+1,+1,+1)
	hitPoint = ro.xyz + rd.xyz * t0;
	if ( t0 > 0.0 && all(greaterThanEqual(hitPoint, vec3(-1.0 - QUADRIC_EPSILON))) && all(lessThanEqual(hitPoint, vec3(1.0 + QUADRIC_EPSILON))) )
		return t0;
		
	hitPoint = ro.xyz + rd.xyz * t1;
	if ( t1 > 0.0 && all(greaterThanEqual(hitPoint, vec3(-1.0 - QUADRIC_EPSILON))) && all(lessThanEqual(hitPoint, vec3(1.0 + QUADRIC_EPSILON))) )
		return t1;
	
	return INFINITY;
}

`;he.pathtracing_sphere_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Sphere_CSG_Intersect( vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	// implicit equation of a unit (radius of 1) sphere:
	// x^2 + y^2 + z^2 - 1 = 0
	float a = dot(rd, rd);
	float b = 2.0 * dot(rd, ro);
	float c = dot(ro, ro) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	n0 = vec3(2.0 * hit.x, 2.0 * hit.y, 2.0 * hit.z);
	hit = ro + rd * t1;
	n1 = vec3(2.0 * hit.x, 2.0 * hit.y, 2.0 * hit.z);
}
`;he.pathtracing_cylinder_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Cylinder_CSG_Intersect( vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d0, d1;
	d0 = d1 = 0.0;
	vec3 dn0, dn1;
	// implicit equation of a unit (radius of 1) cylinder, extending infinitely in the +Y and -Y directions:
	// x^2 + z^2 - 1 = 0
	float a = (rd.x * rd.x + rd.z * rd.z);
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z);
    	float c = (ro.x * ro.x + ro.z * ro.z) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (abs(hit.y) > 1.0) ? 0.0 : t0;
	n0 = vec3(2.0 * hit.x, 0.0, 2.0 * hit.z);
	hit = ro + rd * t1;
	t1 = (abs(hit.y) > 1.0) ? 0.0 : t1;
	n1 = vec3(2.0 * hit.x, 0.0, 2.0 * hit.z);
	// intersect top and bottom unit-radius disk caps
	if (rd.y < 0.0)
	{
		d0 = (ro.y - 1.0) / -rd.y;
		dn0 = vec3(0,1,0);
		d1 = (ro.y + 1.0) / -rd.y;
		dn1 = vec3(0,-1,0);
	}
	else
	{
		d1 = (ro.y - 1.0) / -rd.y;
		dn1 = vec3(0,1,0);
		d0 = (ro.y + 1.0) / -rd.y;
		dn0 = vec3(0,-1,0);
	}
	
	hit = ro + rd * d0;
	if (hit.x * hit.x + hit.z * hit.z <= 1.0) // unit radius disk
	{
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (hit.x * hit.x + hit.z * hit.z <= 1.0) // unit radius disk
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_cone_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Cone_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d0, d1, dr0, dr1;
	d0 = d1 = dr0 = dr1 = 0.0;
	vec3 dn0, dn1;
	// implicit equation of a double-cone extending infinitely in +Y and -Y directions
	// x^2 + z^2 - y^2 = 0
	// code below cuts off top cone, leaving bottom cone with apex at the top (+1.0), and circular base (radius of 1) at the bottom (-1.0)
	
	// valid range for k: 0.01 to 1.0 (1.0 being the default for cone with a sharp, pointed apex)
	k = clamp(k, 0.01, 1.0);
	
	float j = 1.0 / k;
	float h = j * 2.0 - 1.0;		   // (k * 0.25) makes the normal cone's bottom circular base have a unit radius of 1.0
	float a = j * rd.x * rd.x + j * rd.z * rd.z - (k * 0.25) * rd.y * rd.y;
    	float b = 2.0 * (j * rd.x * ro.x + j * rd.z * ro.z - (k * 0.25) * rd.y * (ro.y - h));
    	float c = j * ro.x * ro.x + j * ro.z * ro.z - (k * 0.25) * (ro.y - h) * (ro.y - h);
	solveQuadratic(a, b, c, t0, t1);
	
	hit = ro + rd * t0;
	t0 = (abs(hit.y) > 1.0) ? 0.0 : t0; // invalidate t0 if it's outside truncated cone's height bounds
	n0 = vec3(2.0 * hit.x * j, 2.0 * (h - hit.y) * (k * 0.25), 2.0 * hit.z * j);
	
	hit = ro + rd * t1;
	t1 = (abs(hit.y) > 1.0) ? 0.0 : t1; // invalidate t1 if it's outside truncated cone's height bounds
	n1 = vec3(2.0 * hit.x * j, 2.0 * (h - hit.y) * (k * 0.25), 2.0 * hit.z * j);
	// since the infinite double-cone is artificially cut off, if t0 intersection was invalidated, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	// intersect top and bottom disk caps
	if (rd.y < 0.0)
	{
		d0 = (ro.y - 1.0) / -rd.y;
		dn0 = vec3(0,1,0);
		d1 = (ro.y + 1.0) / -rd.y;
		dn1 = vec3(0,-1,0);
		dr0 = (1.0 - k) * (1.0 - k); // top cap's size is relative to k
		dr1 = 1.0; // bottom cap is unit radius
	}
	else
	{
		d1 = (ro.y - 1.0) / -rd.y;
		dn1 = vec3(0,1,0);
		d0 = (ro.y + 1.0) / -rd.y;
		dn0 = vec3(0,-1,0);
		dr0 = 1.0; // bottom cap is unit radius
		dr1 = (1.0 - k) * (1.0 - k);// top cap's size is relative to k
	}
	hit = ro + rd * d0;
	if (hit.x * hit.x + hit.z * hit.z <= dr0)
	{
		t1 = t0;
		n1 = n0;
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (hit.x * hit.x + hit.z * hit.z <= dr1)
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_conicalprism_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void ConicalPrism_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d0, d1, dr0, dr1;
	d0 = d1 = dr0 = dr1 = 0.0;
	vec3 dn0, dn1;
	// start with implicit equation of a double-cone extending infinitely in +Y and -Y directions
	// x^2 + z^2 - y^2 = 0
	// To obtain a conical prism along the Z axis, the Z component is simply removed, leaving:
	// x^2 - y^2 = 0
	// code below cuts off top cone of the double-cone, leaving bottom cone with apex at the top (+1.0), and base (radius of 1) at the bottom (-1.0)
	
	// valid range for k: 0.01 to 1.0 (1.0 being the default for cone with a sharp, pointed apex)
	k = clamp(k, 0.01, 1.0);
	
	float j = 1.0 / k;
	float h = j * 2.0 - 1.0;		   // (k * 0.25) makes the normal cone's bottom circular base have a unit radius of 1.0
	float a = j * rd.x * rd.x - (k * 0.25) * rd.y * rd.y;
    	float b = 2.0 * (j * rd.x * ro.x - (k * 0.25) * rd.y * (ro.y - h));
    	float c = j * ro.x * ro.x - (k * 0.25) * (ro.y - h) * (ro.y - h);
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (abs(hit.y) > 1.0 || abs(hit.z) > 1.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds
	n0 = vec3(2.0 * hit.x * j, 2.0 * (hit.y - h) * -(k * 0.25), 0.0);
	
	hit = ro + rd * t1;
	t1 = (abs(hit.y) > 1.0 || abs(hit.z) > 1.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds
	n1 = vec3(2.0 * hit.x * j, 2.0 * (hit.y - h) * -(k * 0.25), 0.0);
	
	// since the infinite double-cone shape is artificially cut off at the top and bottom,
	// if t0 intersection was invalidated above, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	// intersect top and bottom base rectangles
	if (rd.y < 0.0)
	{
		d0 = (ro.y - 1.0) / -rd.y;
		dn0 = vec3(0,1,0);
		d1 = (ro.y + 1.0) / -rd.y;
		dn1 = vec3(0,-1,0);
		dr0 = 1.0 - (k); // top cap's size is relative to k
		dr1 = 1.0; // bottom cap is unit radius
	}
	else
	{
		d1 = (ro.y - 1.0) / -rd.y;
		dn1 = vec3(0,1,0);
		d0 = (ro.y + 1.0) / -rd.y;
		dn0 = vec3(0,-1,0);
		dr0 = 1.0; // bottom cap is unit radius
		dr1 = 1.0 - (k);// top cap's size is relative to k
	}
	hit = ro + rd * d0;
	if (abs(hit.x) <= dr0 && abs(hit.z) <= 1.0)
	{
		t1 = t0;
		n1 = n0;
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (abs(hit.x) <= dr1 && abs(hit.z) <= 1.0)
	{
		t1 = d1;
		n1 = dn1;
	}
	// intersect conical-shaped front and back wall pieces
	if (rd.z < 0.0)
	{
		d0 = (ro.z - 1.0) / -rd.z;
		dn0 = vec3(0,0,1);
		d1 = (ro.z + 1.0) / -rd.z;
		dn1 = vec3(0,0,-1);
	}
	else
	{
		d1 = (ro.z - 1.0) / -rd.z;
		dn1 = vec3(0,0,1);
		d0 = (ro.z + 1.0) / -rd.z;
		dn0 = vec3(0,0,-1);
	}
	
	hit = ro + rd * d0;
	if (abs(hit.x) <= 1.0 && abs(hit.y) <= 1.0 && (j * hit.x * hit.x - k * 0.25 * (hit.y - h) * (hit.y - h)) <= 0.0) // y is a quadratic (conical) function of x
	{
		if (t0 != 0.0)
		{
			t1 = t0;
			n1 = n0;
		}
		
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (abs(hit.x) <= 1.0 && abs(hit.y) <= 1.0 && (j * hit.x * hit.x - k * 0.25 * (hit.y - h) * (hit.y - h)) <= 0.0) // y is a quadratic (conical) function of x
	{
		t1 = d1;
		n1 = dn1;
	}
	
}
`;he.pathtracing_paraboloid_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Paraboloid_CSG_Intersect( vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d = 0.0;
	vec3 dn;
	// implicit equation of a paraboloid (upside down rounded-v shape extending infinitely downward in the -Y direction):
	// x^2 + z^2 + y = 0
	// code below centers the paraboloid so that its rounded apex is at the top (+1.0) and 
	//   its circular base is of unit radius (1) and is located at the bottom (-1.0) where the shape is truncated 
	
	float k = 0.5;
	float a = rd.x * rd.x + rd.z * rd.z;
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z) + k * rd.y;
    	float c = ro.x * ro.x + ro.z * ro.z + k * (ro.y - 1.0);
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (abs(hit.y) > 1.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds
	n0 = vec3(2.0 * hit.x, 1.0 * k, 2.0 * hit.z);
	hit = ro + rd * t1;
	t1 = (abs(hit.y) > 1.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds
	n1 = vec3(2.0 * hit.x, 1.0 * k, 2.0 * hit.z);
	// since the infinite paraboloid is artificially cut off at the bottom,
	// if t0 intersection was invalidated, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	
	// now intersect unit-radius disk located at bottom base opening of unit paraboloid shape
	d = (ro.y + 1.0) / -rd.y;
	hit = ro + rd * d;
	if (hit.x * hit.x + hit.z * hit.z <= 1.0) // disk with unit radius
	{
		if (rd.y < 0.0)
		{
			t1 = d;
			n1 = vec3(0,-1,0);
		}
		else
		{
			t1 = t0;
			n1 = n0;
			t0 = d;
			n0 = vec3(0,-1,0);
		}
	}
}
`;he.pathtracing_parabolicprism_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void ParabolicPrism_CSG_Intersect( vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d, d0, d1;
	d = d0 = d1 = 0.0;
	vec3 dn, dn0, dn1;
	// start with implicit equation of a paraboloid (upside down rounded-v shape extending infinitely downward in the -Y direction):
	// x^2 + z^2 + y = 0
	// To obtain a parabolic prism along the Z axis, the Z component is simply removed, leaving:
	// x^2 + y = 0
	// code below centers the parabolic prism so that its rounded apex is at the top (+1.0) and 
	//   its square base is of unit radius (1) and is located at the bottom (-1.0) where the infinite parabola shape is truncated also
	
	float k = 0.5; // k:0.5 narrows the parabola to ensure that when the lower portion of the parabola reaches the cut-off at the base, it is 1 unit wide
	float a = rd.x * rd.x;
    	float b = 2.0 * (rd.x * ro.x) + k * rd.y;
    	float c = ro.x * ro.x + k * (ro.y - 1.0);
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (hit.y < -1.0 || abs(hit.z) > 1.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds
	n0 = vec3(2.0 * hit.x, 1.0 * k, 0.0);
	
	hit = ro + rd * t1;
	t1 = (hit.y < -1.0 || abs(hit.z) > 1.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds
	n1 = vec3(2.0 * hit.x, 1.0 * k, 0.0);
	
	// since the infinite parabolic shape is artificially cut off at the bottom,
	// if t0 intersection was invalidated above, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	
	// intersect unit-radius square located at bottom opening of unit paraboloid shape
	d = (ro.y + 1.0) / -rd.y;
	hit = ro + rd * d;
	if (abs(hit.x) <= 1.0 && abs(hit.z) <= 1.0) // square with unit radius
	{
		if (rd.y < 0.0)
		{
			t1 = d;
			n1 = vec3(0,-1,0);
		}
		else
		{
			t1 = t0;
			n1 = n0;
			t0 = d;
			n0 = vec3(0,-1,0);
		}
	}
	// intersect parabola-shaped front and back wall pieces
	if (rd.z < 0.0)
	{
		d0 = (ro.z - 1.0) / -rd.z;
		dn0 = vec3(0,0,1);
		d1 = (ro.z + 1.0) / -rd.z;
		dn1 = vec3(0,0,-1);
	}
	else
	{
		d1 = (ro.z - 1.0) / -rd.z;
		dn1 = vec3(0,0,1);
		d0 = (ro.z + 1.0) / -rd.z;
		dn0 = vec3(0,0,-1);
	}
	
	hit = ro + rd * d0;
	if (hit.y >= -1.0 && (hit.x * hit.x + k * (hit.y - 1.0)) <= 0.0) // y is a parabolic function of x
	{
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (hit.y >= -1.0 && (hit.x * hit.x + k * (hit.y - 1.0)) <= 0.0) // y is a parabolic function of x
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_hyperboloid1sheet_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Hyperboloid1Sheet_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d0, d1, dr0, dr1;
	d0 = d1 = dr0 = dr1 = 0.0;
	vec3 dn0, dn1;
	// implicit equation of a hyperboloid of 1 sheet (hourglass shape extending infinitely in the +Y and -Y directions):
	// x^2 + z^2 - y^2 - 1 = 0
	// for CSG purposes, we artificially truncate the hyperboloid at the middle, so that only the top half of the hourglass remains with added top/bottom caps...
	// This way, the total number of possible intersections will be 2 max (t0/t1), rather than possibly 4 (if we left it as a full hourglass with added top/bottom caps)
	
	ro.y += 0.5; // this places the top-to-middle portion of the shape closer to its own origin, so that it rotates smoothly around its own middle. 
	
	// conservative range of k: 1 to 100
	float j = k - 1.0;
	float a = k * rd.x * rd.x + k * rd.z * rd.z - j * rd.y * rd.y;
	float b = 2.0 * (k * rd.x * ro.x + k * rd.z * ro.z - j * rd.y * ro.y);
	float c = (k * ro.x * ro.x + k * ro.z * ro.z - j * ro.y * ro.y) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (hit.y > 1.0 || hit.y < 0.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds of top half
	n0 = vec3(2.0 * hit.x * k, 2.0 * -hit.y * j, 2.0 * hit.z * k);
	hit = ro + rd * t1;
	t1 = (hit.y > 1.0 || hit.y < 0.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds of top half
	n1 = vec3(2.0 * hit.x * k, 2.0 * -hit.y * j, 2.0 * hit.z * k);
	// since the infinite hyperboloid is artificially cut off at the top and bottom so that it has a unit radius top cap,
	// if t0 intersection was invalidated, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	if (rd.y < 0.0)
	{
		d0 = (ro.y - 1.0) / -rd.y;
		dn0 = vec3(0,1,0);
		d1 = (ro.y + 0.0) / -rd.y;
		dn1 = vec3(0,-1,0);
		dr0 = 1.0; // top cap is unit radius
		dr1 = 1.0 / k; // bottom cap is inverse size of k (smaller than 1)
	}
	else
	{
		d1 = (ro.y - 1.0) / -rd.y;
		dn1 = vec3(0,1,0);
		d0 = (ro.y + 0.0) / -rd.y;
		dn0 = vec3(0,-1,0);
		dr0 = 1.0 / k; // bottom cap is inverse size of k (smaller than 1)
		dr1 = 1.0; // top cap is unit radius
	}
	
	hit = ro + rd * d0;
	if (hit.x * hit.x + hit.z * hit.z <= dr0)
	{
		t1 = t0;
		n1 = n0;
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (hit.x * hit.x + hit.z * hit.z <= dr1)
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_hyperboloid2sheets_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Hyperboloid2Sheets_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d = 0.0;
	vec3 dn;
	// implicit equation of a hyperboloid of 2 sheets (2 rounded v shapes that are mirrored and pointing at each other)
	// -x^2 - z^2 + y^2 - 1 = 0
	// for CSG purposes, we artificially truncate the hyperboloid at the middle, so that only 1 sheet (the top sheet) of the 2 mirrored sheets remains...
	// This way, the total number of possible intersections will be 2 max (t0/t1), rather than possibly 4 (if we left it as 2 full sheets with added top/bottom caps)
	
	ro.y += 0.5; // this places the top-to-middle portion of the shape closer to its own origin, so that it rotates smoothly around its own middle. 
	
	// conservative range of k: 1 to 100
	float j = k + 1.0;
	float a = -k * rd.x * rd.x - k * rd.z * rd.z + j * rd.y * rd.y;
	float b = 2.0 * (-k * rd.x * ro.x - k * rd.z * ro.z + j * rd.y * ro.y);
	float c = (-k * ro.x * ro.x - k * ro.z * ro.z + j * ro.y * ro.y) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (hit.y > 1.0 || hit.y < 0.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds of top half
	n0 = vec3(2.0 * -hit.x * k, 2.0 * hit.y * j, 2.0 * -hit.z * k);
	hit = ro + rd * t1;
	t1 = (hit.y > 1.0 || hit.y < 0.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds of top half
	n1 = vec3(2.0 * -hit.x * k, 2.0 * hit.y * j, 2.0 * -hit.z * k);
	// since the infinite hyperboloid is artificially cut off at the top and bottom so that it has a unit radius top cap,
	// if t0 intersection was invalidated, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	// intersect unit-radius disk located at top opening of unit hyperboloid shape
	d = (ro.y - 1.0) / -rd.y;
	hit = ro + rd * d;
	if (hit.x * hit.x + hit.z * hit.z <= 1.0) // disk with unit radius
	{
		if (rd.y > 0.0)
		{
			t1 = d;
			n1 = vec3(0,1,0);
		}
		else
		{
			t1 = t0;
			n1 = n0;
			t0 = d;
			n0 = vec3(0,1,0);
		}
	}
	
}
`;he.pathtracing_hyperbolicprism1sheet_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void HyperbolicPrism1Sheet_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d0, d1, dr0, dr1;
	d0 = d1 = dr0 = dr1 = 0.0;
	vec3 dn0, dn1;
	// start with the implicit equation of a hyperboloid of 1 sheet (hourglass shape extending infinitely in the +Y and -Y directions):
	// x^2 + z^2 - y^2 - 1 = 0
	// To obtain a hyperbolic prism along the Z axis, the Z component is simply removed, leaving:
	// x^2 - y^2 - 1 = 0
	// for CSG purposes, we artificially truncate the hyperbolic prism at the middle, so that only the top half of the hourglass remains with added top/bottom caps...
	// This way, the total number of possible intersections will be 2 max (t0/t1), rather than possibly 4 (if we left it as a full hourglass with added top/bottom caps)
	
	ro.y += 0.5; // this places the top-to-middle portion of the shape closer to its own origin, so that it rotates smoothly around its own middle. 
	
	// conservative range of k: 1 to 100
	float j = k - 1.0;
	float a = k * rd.x * rd.x - j * rd.y * rd.y;
	float b = 2.0 * (k * rd.x * ro.x - j * rd.y * ro.y);
	float c = (k * ro.x * ro.x - j * ro.y * ro.y) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (hit.y > 1.0 || hit.y < 0.0 || abs(hit.z) > 1.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds of top half
	n0 = vec3(2.0 * hit.x * k, 2.0 * -hit.y * j, 0.0);
	hit = ro + rd * t1;
	t1 = (hit.y > 1.0 || hit.y < 0.0 || abs(hit.z) > 1.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds of top half
	n1 = vec3(2.0 * hit.x * k, 2.0 * -hit.y * j, 0.0);
	// since the infinite hyperbolic shape is artificially cut off at the top and bottom so that it has a unit radius top cap,
	// if t0 intersection was invalidated, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	// intersect top and bottom base rectangles
	if (rd.y < 0.0)
	{
		d0 = (ro.y - 1.0) / -rd.y;
		dn0 = vec3(0,1,0);
		d1 = (ro.y + 0.0) / -rd.y;
		dn1 = vec3(0,-1,0);
		dr0 = 1.0; // top cap is unit radius
		dr1 = 1.0 / sqrt(abs(k)); // bottom cap is related to k (smaller than 1)
	}
	else
	{
		d1 = (ro.y - 1.0) / -rd.y;
		dn1 = vec3(0,1,0);
		d0 = (ro.y + 0.0) / -rd.y;
		dn0 = vec3(0,-1,0);
		dr0 = 1.0 / sqrt(abs(k)); // bottom cap is related to k (smaller than 1)
		dr1 = 1.0; // top cap is unit radius
	}
	
	hit = ro + rd * d0;
	if (abs(hit.x) <= dr0 && abs(hit.z) <= 1.0)
	{
		if (t0 != 0.0)
		{
			t1 = t0;
			n1 = n0;
		}
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (abs(hit.x) <= dr1 && abs(hit.z) <= 1.0)
	{
		t1 = d1;
		n1 = dn1;
	}
	// intersect hyperbolic-shaped front and back wall pieces
	if (rd.z < 0.0)
	{
		d0 = (ro.z - 1.0) / -rd.z;
		dn0 = vec3(0,0,1);
		d1 = (ro.z + 1.0) / -rd.z;
		dn1 = vec3(0,0,-1);
	}
	else
	{
		d1 = (ro.z - 1.0) / -rd.z;
		dn1 = vec3(0,0,1);
		d0 = (ro.z + 1.0) / -rd.z;
		dn0 = vec3(0,0,-1);
	}
	
	hit = ro + rd * d0;
	if (abs(hit.x) <= 1.0 && hit.y >= 0.0 && hit.y <= 1.0 && (k * hit.x * hit.x - j * hit.y * hit.y - 1.0) <= 0.0) // y is a quadratic (hyperbolic) function of x
	{
		if (t0 != 0.0)
		{
			t1 = t0;
			n1 = n0;
		}
		
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (abs(hit.x) <= 1.0 && hit.y >= 0.0 && hit.y <= 1.0 && (k * hit.x * hit.x - j * hit.y * hit.y - 1.0) <= 0.0) // y is a quadratic (hyperbolic) function of x
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_hyperbolicprism2sheets_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void HyperbolicPrism2Sheets_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit;
	float d, d0, d1, dr0, dr1;
	d = d0 = d1 = dr0 = dr1 = 0.0;
	vec3 dn0, dn1;
	// start with the implicit equation of a hyperboloid of 2 sheets (2 rounded v shapes that are mirrored and pointing at each other)
	// -x^2 - z^2 + y^2 - 1 = 0
	// To obtain a hyperbolic prism along the Z axis, the Z component is simply removed, leaving:
	// -x^2 + y^2 - 1 = 0
	// for CSG purposes, we artificially truncate the hyperbolic prism at the middle, so that only 1 sheet (the top sheet) of the 2 mirrored sheets remains...
	// This way, the total number of possible intersections will be 2 max (t0/t1), rather than possibly 4 (if we left it as 2 full sheets with added top/bottom caps)
	
	ro.y += 0.5; // this places the top-to-middle portion of the shape closer to its own origin, so that it rotates smoothly around its own middle. 
	
	// conservative range of k: 1 to 100
	float j = k + 1.0;
	float a = -k * rd.x * rd.x + j * rd.y * rd.y;
	float b = 2.0 * (-k * rd.x * ro.x + j * rd.y * ro.y);
	float c = (-k * ro.x * ro.x + j * ro.y * ro.y) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (hit.y > 1.0 || hit.y < 0.0 || abs(hit.z) > 1.0) ? 0.0 : t0; // invalidate t0 if it's outside unit radius bounds of top half
	n0 = vec3(2.0 * -hit.x * k, 2.0 * hit.y * j, 0.0);
	hit = ro + rd * t1;
	t1 = (hit.y > 1.0 || hit.y < 0.0 || abs(hit.z) > 1.0) ? 0.0 : t1; // invalidate t1 if it's outside unit radius bounds of top half
	n1 = vec3(2.0 * -hit.x * k, 2.0 * hit.y * j, 0.0);
	// since the infinite hyperbolic shape is artificially cut off at the top and bottom so that it has a unit radius top cap,
	// if t0 intersection was invalidated, try t1
	if (t0 == 0.0)
	{
		t0 = t1;
		n0 = n1;
	}
	// intersect unit-radius square located at top opening of hyperbolic prism shape
	d = (ro.y - 1.0) / -rd.y;
	hit = ro + rd * d;
	if (abs(hit.x) <= 1.0 && abs(hit.z) <= 1.0) // square with unit radius
	{
		if (rd.y > 0.0)
		{
			t1 = d;
			n1 = vec3(0,1,0);
		}
		else
		{
			t1 = t0;
			n1 = n0;
			t0 = d;
			n0 = vec3(0,1,0);
		}
	}
	// intersect hyperbolic v-shaped front and back wall pieces
	if (rd.z < 0.0)
	{
		d0 = (ro.z - 1.0) / -rd.z;
		dn0 = vec3(0,0,1);
		d1 = (ro.z + 1.0) / -rd.z;
		dn1 = vec3(0,0,-1);
	}
	else
	{
		d1 = (ro.z - 1.0) / -rd.z;
		dn1 = vec3(0,0,1);
		d0 = (ro.z + 1.0) / -rd.z;
		dn0 = vec3(0,0,-1);
	}
	
	hit = ro + rd * d0;
	if (abs(hit.x) <= 1.0 && hit.y >= 0.0 && hit.y <= 1.0 && (-k * hit.x * hit.x + j * hit.y * hit.y - 1.0) >= 0.0) // y is a quadratic (hyperbolic) function of x
	{
		if (t0 != 0.0)
		{
			t1 = t0;
			n1 = n0;
		}
		
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (abs(hit.x) <= 1.0 && hit.y >= 0.0 && hit.y <= 1.0 && (-k * hit.x * hit.x + j * hit.y * hit.y - 1.0) >= 0.0) // y is a quadratic (hyperbolic) function of x
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_capsule_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Capsule_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit, s0n0, s0n1, s1n0, s1n1;
	float s0t0, s0t1, s1t0, s1t1;
	s0t0 = s0t1 = s1t0 = s1t1 = 0.0;
	// implicit equation of a unit (radius of 1) cylinder, extending infinitely in the +Y and -Y directions:
	// x^2 + z^2 - 1 = 0
	float a = (rd.x * rd.x + rd.z * rd.z);
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z);
    	float c = (ro.x * ro.x + ro.z * ro.z) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	hit = ro + rd * t0;
	t0 = (abs(hit.y) > k) ? 0.0 : t0;
	n0 = vec3(2.0 * hit.x, 0.0, 2.0 * hit.z);
	hit = ro + rd * t1;
	t1 = (abs(hit.y) > k) ? 0.0 : t1;
	n1 = vec3(2.0 * hit.x, 0.0, 2.0 * hit.z);
	// intersect unit-radius sphere located at top opening of cylinder
	vec3 s0pos = vec3(0, k, 0);
	vec3 L = ro - s0pos;
	a = dot(rd, rd);
	b = 2.0 * dot(rd, L);
	c = dot(L, L) - 1.0;
	solveQuadratic(a, b, c, s0t0, s0t1);
	hit = ro + rd * s0t0;
	s0n0 = vec3(2.0 * hit.x, 2.0 * (hit.y - s0pos.y), 2.0 * hit.z);
	s0t0 = (hit.y < k) ? 0.0 : s0t0;
	hit = ro + rd * s0t1;
	s0n1 = vec3(2.0 * hit.x, 2.0 * (hit.y - s0pos.y), 2.0 * hit.z);
	s0t1 = (hit.y < k) ? 0.0 : s0t1;
	// now intersect unit-radius sphere located at bottom opening of cylinder
	vec3 s1pos = vec3(0, -k, 0);
	L = ro - s1pos;
	a = dot(rd, rd);
	b = 2.0 * dot(rd, L);
	c = dot(L, L) - 1.0;
	solveQuadratic(a, b, c, s1t0, s1t1);
	hit = ro + rd * s1t0;
	s1n0 = vec3(2.0 * hit.x, 2.0 * (hit.y - s1pos.y), 2.0 * hit.z);
	s1t0 = (hit.y > -k) ? 0.0 : s1t0;
	hit = ro + rd * s1t1;
	s1n1 = vec3(2.0 * hit.x, 2.0 * (hit.y - s1pos.y), 2.0 * hit.z);
	s1t1 = (hit.y > -k) ? 0.0 : s1t1;
	if (s0t0 != 0.0)
	{
		t0 = s0t0;
		n0 = s0n0;
	}
	else if (s1t0 != 0.0)
	{
		t0 = s1t0;
		n0 = s1n0;
	}
	
	if (s0t1 != 0.0)
	{
		t1 = s0t1;
		n1 = s0n1;
	}
	else if (s1t1 != 0.0)
	{
		t1 = s1t1;
		n1 = s1n1;
	}
}
`;he.pathtracing_box_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void Box_CSG_Intersect( vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 invDir = 1.0 / rd;
	vec3 near = (vec3(-1) - ro) * invDir; // unit radius box: vec3(-1,-1,-1) min corner
	vec3 far  = (vec3(1) - ro) * invDir;  // unit radius box: vec3(+1,+1,+1) max corner
	
	vec3 tmin = min(near, far);
	vec3 tmax = max(near, far);
	t0 = max( max(tmin.x, tmin.y), tmin.z);
	t1 = min( min(tmax.x, tmax.y), tmax.z);
	n0 = -sign(rd) * step(tmin.yzx, tmin) * step(tmin.zxy, tmin);
	n1 = -sign(rd) * step(tmax, tmax.yzx) * step(tmax, tmax.zxy);
	if (t0 > t1) // invalid intersection
		t0 = t1 = 0.0;
}
`;he.pathtracing_convexpolyhedron_csg_intersect=`
// This convexPolyhedron routine works with any number of user-defined cutting planes - a plane is defined by its unit normal (vec3) and an offset distance (float) 
//  from the plane origin to the shape's origin.  Examples of shapes that can be made from a list of pure convex cutting planes: cube, frustum, 
//  triangular pyramid (tetrahedron), rectangular pyramid, triangular bipyramid (hexahedron), rectangular bipyramid (octahedron), and other polyhedra.

const int numPlanes = 8;
vec4 convex_planes[numPlanes];

//------------------------------------------------------------------------------------------------------------
float ConvexPolyhedron_Intersect( vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 n0, n1;
	float t;
	float t0 = -INFINITY;
	float t1 = INFINITY;
	float plane_dot_rayDir;

	// for triangular pyramid (tetrahedron), set numPlanes = 4 above
	// convex_planes[0] = vec4(normalize(vec3( 1, 0.45, 0.6)), -0.3);
	// convex_planes[1] = vec4(normalize(vec3(-1, 0.45, 0.6)), -0.3);
	// convex_planes[2] = vec4(normalize(vec3( 0,  0.3,  -1)), -0.3);
	// convex_planes[3] = vec4(normalize(vec3( 0,-1, 0)), -1.0);

	// for rectangular pyramid, set numPlanes = 5 above
	// convex_planes[0] = vec4(normalize(vec3( 1, 0.5, 0)), -0.4);
	// convex_planes[1] = vec4(normalize(vec3(-1, 0.5, 0)), -0.4);
	// convex_planes[2] = vec4(normalize(vec3( 0, 0.5, 1)), -0.4);
	// convex_planes[3] = vec4(normalize(vec3( 0, 0.5,-1)), -0.4);
	// convex_planes[4] = vec4(normalize(vec3( 0,-1, 0)), -1.0);

	// for triangular prism, set numPlanes = 5 above
	// convex_planes[0] = vec4(normalize(vec3( 0, 0, 1)), -0.5);
	// convex_planes[1] = vec4(normalize(vec3( 1, 0,-0.577)), -0.5);
	// convex_planes[2] = vec4(normalize(vec3(-1, 0,-0.577)), -0.5);
	// convex_planes[3] = vec4(normalize(vec3( 0, 1, 0)), -1.0);
	// convex_planes[4] = vec4(normalize(vec3( 0,-1, 0)), -1.0);

	// for cube, set numPlanes = 6 above
	// convex_planes[0] = vec4((vec3( 1, 0, 0)), -1.0);
	// convex_planes[1] = vec4((vec3(-1, 0, 0)), -1.0);
	// convex_planes[2] = vec4((vec3( 0, 1, 0)), -1.0);
	// convex_planes[3] = vec4((vec3( 0,-1, 0)), -1.0);
	// convex_planes[4] = vec4((vec3( 0, 0, 1)), -1.0);
	// convex_planes[5] = vec4((vec3( 0, 0,-1)), -1.0);

	// for frustum (rectangular pyramid with apex cut off), set numPlanes = 6 above
	// convex_planes[0] = vec4(normalize(vec3( 1, 0.35, 0)), -0.6);
	// convex_planes[1] = vec4(normalize(vec3(-1, 0.35, 0)), -0.6);
	// convex_planes[2] = vec4(normalize(vec3( 0, 0.35, 1)), -0.6);
	// convex_planes[3] = vec4(normalize(vec3( 0, 0.35,-1)), -0.6);
	// convex_planes[4] = vec4(normalize(vec3( 0,   1, 0)), -1.0);
	// convex_planes[5] = vec4(normalize(vec3( 0,  -1, 0)), -1.0);

	// for triangular bipyramid (hexahedron), set numPlanes = 6 above
	// convex_planes[0] = vec4(normalize(vec3( 1, 0.7, 0.6)), -0.5);
	// convex_planes[1] = vec4(normalize(vec3(-1, 0.7, 0.6)), -0.5);
	// convex_planes[2] = vec4(normalize(vec3( 0, 0.6,  -1)), -0.5);
	// convex_planes[3] = vec4(normalize(vec3( 1,-0.7, 0.6)), -0.5);
	// convex_planes[4] = vec4(normalize(vec3(-1,-0.7, 0.6)), -0.5);
	// convex_planes[5] = vec4(normalize(vec3( 0,-0.6,  -1)), -0.5);

	// for pentagonal prism, set numPlanes = 7 above
	// convex_planes[0] = vec4(normalize(vec3(cos(TWO_PI * 0.25), 0, sin(TWO_PI * 0.25))), -0.8);
	// convex_planes[1] = vec4(normalize(vec3(cos(TWO_PI * 0.45), 0, sin(TWO_PI * 0.45))), -0.8);
	// convex_planes[2] = vec4(normalize(vec3(cos(TWO_PI * 0.65), 0, sin(TWO_PI * 0.65))), -0.8);
	// convex_planes[3] = vec4(normalize(vec3(cos(TWO_PI * 0.85), 0, sin(TWO_PI * 0.85))), -0.8);
	// convex_planes[4] = vec4(normalize(vec3(cos(TWO_PI * 1.05), 0, sin(TWO_PI * 1.05))), -0.8);
	// convex_planes[5] = vec4(normalize(vec3( 0, 1, 0)), -1.0);
	// convex_planes[6] = vec4(normalize(vec3( 0,-1, 0)), -1.0);

	// for rectangular bipyramid (octahedron), set numPlanes = 8 above
	convex_planes[0] = vec4(normalize(vec3( 1, 0.75, 0)), -0.6);
	convex_planes[1] = vec4(normalize(vec3(-1, 0.75, 0)), -0.6);
	convex_planes[2] = vec4(normalize(vec3( 0, 0.75, 1)), -0.6);
	convex_planes[3] = vec4(normalize(vec3( 0, 0.75,-1)), -0.6);
	convex_planes[4] = vec4(normalize(vec3( 1,-0.75, 0)), -0.6);
	convex_planes[5] = vec4(normalize(vec3(-1,-0.75, 0)), -0.6);
	convex_planes[6] = vec4(normalize(vec3( 0,-0.75, 1)), -0.6);
	convex_planes[7] = vec4(normalize(vec3( 0,-0.75,-1)), -0.6);

	// for hexagonal prism, set numPlanes = 8 above
	// convex_planes[0] = vec4(normalize(vec3( 0, 0,     1)), -0.9);
	// convex_planes[1] = vec4(normalize(vec3( 0, 0,    -1)), -0.9);
	// convex_planes[2] = vec4(normalize(vec3( 1, 0, 0.577)), -0.9);
	// convex_planes[3] = vec4(normalize(vec3( 1, 0,-0.577)), -0.9);
	// convex_planes[4] = vec4(normalize(vec3(-1, 0, 0.577)), -0.9);
	// convex_planes[5] = vec4(normalize(vec3(-1, 0,-0.577)), -0.9);
	// convex_planes[6] = vec4(normalize(vec3( 0, 1, 0)), -1.0);
	// convex_planes[7] = vec4(normalize(vec3( 0,-1, 0)), -1.0);

	
	for (int i = 0; i < numPlanes; i++)
	{
		plane_dot_rayDir = dot(convex_planes[i].xyz, rd);
		if (plane_dot_rayDir == 0.0)
			continue;

		t = (-dot(convex_planes[i].xyz, ro) - convex_planes[i].w) / plane_dot_rayDir;

		if (plane_dot_rayDir < 0.0 && t > t0)
		{
			t0 = t;
			n0 = convex_planes[i].xyz;
		}	
	
		if (plane_dot_rayDir > 0.0 && t < t1)
		{
			t1 = t;
			n1 = convex_planes[i].xyz;
		}	
		
	}

	if (t0 > t1)
		return INFINITY;

	if (t0 > 0.0)
	{
		n = n0;
		return t0;
	}
	if (t1 > 0.0)
	{
		n = n1;
		return t1;
	}

	return INFINITY;
}

/*
//const int numPlanes = 8;
//vec4 convex_planes[numPlanes];
//------------------------------------------------------------------------------------------------------------
void ConvexPolyhedron_CSG_Intersect( vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	
}
*/

`;he.pathtracing_pyramidfrustum_csg_intersect=`
//------------------------------------------------------------------------------------------------------------
void PyramidFrustum_CSG_Intersect( float k, vec3 ro, vec3 rd, out float t0, out float t1, out vec3 n0, out vec3 n1 )
//------------------------------------------------------------------------------------------------------------
{
	vec3 hit, dn0, dn1, xn0, xn1, zn0, zn1;
	float d0, d1, dr0, dr1;
	float xt0, xt1, zt0, zt1;
	d0 = d1 = dr0 = dr1 = xt0 = xt1 = zt0 = zt1 = 0.0;
	// first, intersect left and right sides of pyramid/frustum
	// start with implicit equation of a double-cone extending infinitely in +Y and -Y directions
	// x^2 + z^2 - y^2 = 0
	// To obtain a conical prism along the Z axis, the Z component is simply removed, leaving:
	// x^2 - y^2 = 0
	// code below cuts off top cone of the double-cone, leaving bottom cone with apex at the top (+1.0), and base (radius of 1) at the bottom (-1.0)
	
	// valid range for k: 0.01 to 1.0 (1.0 being the default for cone with a sharp, pointed apex)
	k = clamp(k, 0.01, 1.0);
	
	float j = 1.0 / k;
	float h = j * 2.0 - 1.0; // (k * 0.25) makes the normal cone's bottom circular base have a unit radius of 1.0
	float a = j * rd.x * rd.x - (k * 0.25) * rd.y * rd.y;
    	float b = 2.0 * (j * rd.x * ro.x - (k * 0.25) * rd.y * (ro.y - h));
    	float c = j * ro.x * ro.x - (k * 0.25) * (ro.y - h) * (ro.y - h);
	solveQuadratic(a, b, c, xt0, xt1);
	hit = ro + rd * xt0;
	xt0 = (abs(hit.x) > 1.0 || abs(hit.z) > 1.0 || hit.y > 1.0 || (j * hit.z * hit.z - k * 0.25 * (hit.y - h) * (hit.y - h)) > 0.0) ? 0.0 : xt0;
	xn0 = vec3(2.0 * hit.x * j, 2.0 * (hit.y - h) * -(k * 0.25), 0.0);
	
	hit = ro + rd * xt1;
	xt1 = (abs(hit.x) > 1.0 || abs(hit.z) > 1.0 || hit.y > 1.0 || (j * hit.z * hit.z - k * 0.25 * (hit.y - h) * (hit.y - h)) > 0.0) ? 0.0 : xt1;
	xn1 = vec3(2.0 * hit.x * j, 2.0 * (hit.y - h) * -(k * 0.25), 0.0);
	
	// since the infinite double-cone shape is artificially cut off at the top and bottom,
	// if xt0 intersection was invalidated above, try xt1
	if (xt0 == 0.0)
	{
		xt0 = xt1;
		xn0 = xn1;
		xt1 = 0.0; // invalidate xt1 (see sorting algo below)
	}
	// now intersect front and back sides of pyramid/frustum
	// start with implicit equation of a double-cone extending infinitely in +Y and -Y directions
	// x^2 + z^2 - y^2 = 0
	// To obtain a conical prism along the X axis, the X component is simply removed, leaving:
	// z^2 - y^2 = 0
	a = j * rd.z * rd.z - (k * 0.25) * rd.y * rd.y;
    	b = 2.0 * (j * rd.z * ro.z - (k * 0.25) * rd.y * (ro.y - h));
    	c = j * ro.z * ro.z - (k * 0.25) * (ro.y - h) * (ro.y - h);
	solveQuadratic(a, b, c, zt0, zt1);
	hit = ro + rd * zt0;
	zt0 = (abs(hit.x) > 1.0 || abs(hit.z) > 1.0 || hit.y > 1.0 || (j * hit.x * hit.x - k * 0.25 * (hit.y - h) * (hit.y - h)) > 0.0) ? 0.0 : zt0;
	zn0 = vec3(0.0, 2.0 * (hit.y - h) * -(k * 0.25), 2.0 * hit.z * j);
	
	hit = ro + rd * zt1;
	zt1 = (abs(hit.x) > 1.0 || abs(hit.z) > 1.0 || hit.y > 1.0 || (j * hit.x * hit.x - k * 0.25 * (hit.y - h) * (hit.y - h)) > 0.0) ? 0.0 : zt1;
	zn1 = vec3(0.0, 2.0 * (hit.y - h) * -(k * 0.25), 2.0 * hit.z * j);
	// since the infinite double-cone shape is artificially cut off at the top and bottom,
	// if zt0 intersection was invalidated above, try zt1
	if (zt0 == 0.0)
	{
		zt0 = zt1;
		zn0 = zn1;
		zt1 = 0.0; // invalidate zt1 (see sorting algo below)
	}
	// sort valid intersections of 4 sides of pyramid/frustum thus far
	if (xt1 != 0.0) // the only way xt1 can be valid (not 0), is if xt0 was also valid (not 0) (see above)
	{
		t0 = xt0;
		n0 = xn0;
		t1 = xt1;
		n1 = xn1;
	}
	else if (zt1 != 0.0) // the only way zt1 can be valid (not 0), is if zt0 was also valid (not 0) (see above)
	{
		t0 = zt0;
		n0 = zn0;
		t1 = zt1;
		n1 = zn1;
	}
	else if (xt0 != 0.0)
	{
		if (zt0 == 0.0)
		{
			t0 = xt0;
			n0 = xn0;	
		}
		else if (zt0 < xt0)
		{
			t0 = zt0;
			n0 = zn0;
			t1 = xt0;
			n1 = xn0;
		}
		else
		{
			t0 = xt0;
			n0 = xn0;
			t1 = zt0;
			n1 = zn0;
		}
	}
	else if (xt0 == 0.0)
	{
		t0 = zt0;
		n0 = zn0;
	}
	
	// lastly, intersect top and bottom base squares (both are perfect squares)
	if (rd.y < 0.0)
	{
		d0 = (ro.y - 1.0) / -rd.y;
		dn0 = vec3(0,1,0);
		d1 = (ro.y + 1.0) / -rd.y;
		dn1 = vec3(0,-1,0);
		dr0 = 1.0 - k; // top square's size is relative to k
		dr1 = 1.0; // bottom square is unit radius
	}
	else
	{
		d1 = (ro.y - 1.0) / -rd.y;
		dn1 = vec3(0,1,0);
		d0 = (ro.y + 1.0) / -rd.y;
		dn0 = vec3(0,-1,0);
		dr0 = 1.0; // bottom square is unit radius
		dr1 = 1.0 - k;// top square's size is relative to k
	}
	hit = ro + rd * d0;
	if (abs(hit.x) <= dr0 && abs(hit.z) <= dr0)
	{
		t1 = t0;
		n1 = n0;
		t0 = d0;
		n0 = dn0;
	}
	hit = ro + rd * d1;
	if (abs(hit.x) <= dr1 && abs(hit.z) <= dr1)
	{
		t1 = d1;
		n1 = dn1;
	}
}
`;he.pathtracing_csg_operations=`
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
void CSG_Union_Operation( float A_t0, vec3 A_n0, int A_type0, vec3 A_color0, int A_objectID0, float A_t1, vec3 A_n1, int A_type1, vec3 A_color1, int A_objectID1, 
			  float B_t0, vec3 B_n0, int B_type0, vec3 B_color0, int B_objectID0, float B_t1, vec3 B_n1, int B_type1, vec3 B_color1, int B_objectID1, 
			  out float t0, out vec3 n0, out int type0, out vec3 color0, out int objectID0, out float t1, out vec3 n1, out int type1, out vec3 color1, out int objectID1 )
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{
	// CSG UNION OPERATION [A + B] (outside of shape A and outside of shape B are fused together into a single, new shape)
	// (hypothetically, the interior volume of the newly created union could be completely filled with water in one pass)
	
	vec3 temp_n0, temp_n1, temp_col0, temp_col1;
	float temp_t0, temp_t1;
	int temp_type0, temp_type1, temp_objectID0, temp_objectID1;
	// if shape B is closer than A, swap shapes
	if (B_t0 < A_t0)
	{
		temp_t0 = A_t0;
		temp_n0 = A_n0;
		temp_col0 = A_color0;
		temp_type0 = A_type0;
		temp_objectID0 = A_objectID0;
		
		temp_t1 = A_t1;
		temp_n1 = A_n1;
		temp_col1 = A_color1;
		temp_type1 = A_type1;
		temp_objectID1 = A_objectID1;


		A_t0 = B_t0;
		A_n0 = B_n0;
		A_color0 = B_color0;
		A_type0 = B_type0;
		A_objectID0 = B_objectID0;

		A_t1 = B_t1;
		A_n1 = B_n1;
		A_color1 = B_color1;
		A_type1 = B_type1;
		A_objectID1 = B_objectID1;


		B_t0 = temp_t0;
		B_n0 = temp_n0;
		B_color0 = temp_col0;
		B_type0 = temp_type0;
		B_objectID0 = temp_objectID0;

		B_t1 = temp_t1;
		B_n1 = temp_n1;
		B_color1 = temp_col1;
		B_type1 = temp_type1;
		B_objectID1 = temp_objectID1;
	}
	// shape A is always considered to be first
	t0 = A_t0;
	n0 = A_n0;
	type0 = A_type0;
	color0 = A_color0;
	objectID0 = A_objectID0;

	t1 = A_t1;
	n1 = A_n1;
	type1 = A_type1;
	color1 = A_color1;
	objectID1 = A_objectID1;
	
	// except for when the outside of shape B matches the outside of shape A
	if (B_t0 == A_t0)
	{
		t0 = B_t0;
		n0 = B_n0;
		type0 = B_type0;
		color0 = B_color0;
		objectID0 = B_objectID0;
	}
	// A is behind us and completely in front of B
	if (A_t1 <= 0.0 && A_t1 < B_t0)
	{
		t0 = B_t0;
		n0 = B_n0;
		type0 = B_type0;
		color0 = B_color0;
		objectID0 = B_objectID0;

		t1 = B_t1;
		n1 = B_n1;
		type1 = B_type1;
		color1 = B_color1;
		objectID1 = B_objectID1;
	}
	else if (B_t0 <= A_t1 && B_t1 > A_t1)
	{
		t1 = B_t1;
		n1 = B_n1;
		type1 = B_type1;
		color1 = B_color1;
		objectID1 = B_objectID1;
	}
	else if (B_t0 <= A_t1 && B_t1 <= A_t1)
	{
		t1 = A_t1;
		n1 = A_n1;
		type1 = A_type1;
		color1 = A_color1;
		objectID1 = A_objectID1;
	}
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
void CSG_Difference_Operation( float A_t0, vec3 A_n0, int A_type0, vec3 A_color0, int A_objectID0, float A_t1, vec3 A_n1, int A_type1, vec3 A_color1, int A_objectID1, 
			       float B_t0, vec3 B_n0, int B_type0, vec3 B_color0, int B_objectID0, float B_t1, vec3 B_n1, int B_type1, vec3 B_color1, int B_objectID1, 
			       out float t0, out vec3 n0, out int type0, out vec3 color0, out int objectID0, out float t1, out vec3 n1, out int type1, out vec3 color1, out int objectID1 )
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{
	// CSG DIFFERENCE OPERATION [A - B] (shape A is carved out with shape B where the two shapes overlap)
	
	if ((B_t0 < A_t0 && B_t1 < A_t0) || (B_t0 > A_t1 && B_t1 > A_t1))
	{
		t0 = A_t0;
		n0 = A_n0;
		type0 = A_type0;
		color0 = A_color0;
		objectID0 = A_objectID0;

		t1 = A_t1;
		n1 = A_n1;
		type1 = A_type1;
		color1 = A_color1;
		objectID1 = A_objectID1;
	}
	else if (B_t0 > 0.0 && B_t0 < A_t1 && B_t0 > A_t0)
	{
		t0 = A_t0;
		n0 = A_n0;
		type0 = A_type0;
		color0 = A_color0;
		objectID0 = A_objectID0;

		t1 = B_t0;
		n1 = B_n0;
		type1 = B_type0;
		color1 = B_color0;
		objectID1 = B_objectID0;
	}
	else if (B_t1 > A_t0 && B_t1 < A_t1)
	{
		t0 = B_t1;
		n0 = B_n1;
		type0 = B_type1;
		color0 = B_color1;
		objectID0 = B_objectID1;

		t1 = A_t1;
		n1 = A_n1;
		type1 = A_type1;
		color1 = A_color1;
		objectID1 = A_objectID1;
	}
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
void CSG_Intersection_Operation( float A_t0, vec3 A_n0, int A_type0, vec3 A_color0, int A_objectID0, float A_t1, vec3 A_n1, int A_type1, vec3 A_color1, int A_objectID1, 
			  	 float B_t0, vec3 B_n0, int B_type0, vec3 B_color0, int B_objectID0, float B_t1, vec3 B_n1, int B_type1, vec3 B_color1, int B_objectID1, 
			  	 out float t0, out vec3 n0, out int type0, out vec3 color0, out int objectID0, out float t1, out vec3 n1, out int type1, out vec3 color1, out int objectID1 )
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{
	// CSG INTERSECTION OPERATION [A ^ B] (Only valid where shape A overlaps shape B)
	// (ray must intersect both shape A and shape B)
	vec3 temp_n0, temp_n1, temp_col0, temp_col1;
	float temp_t0, temp_t1;
	int temp_type0, temp_type1, temp_objectID0, temp_objectID1;
	// if shape B is closer than A, swap shapes
	if (B_t0 < A_t0)
	{
		temp_t0 = A_t0;
		temp_n0 = A_n0;
		temp_col0 = A_color0;
		temp_type0 = A_type0;
		temp_objectID0 = A_objectID0;
		
		temp_t1 = A_t1;
		temp_n1 = A_n1;
		temp_col1 = A_color1;
		temp_type1 = A_type1;
		temp_objectID1 = A_objectID1;


		A_t0 = B_t0;
		A_n0 = B_n0;
		A_color0 = B_color0;
		A_type0 = B_type0;
		A_objectID0 = B_objectID0;

		A_t1 = B_t1;
		A_n1 = B_n1;
		A_color1 = B_color1;
		A_type1 = B_type1;
		A_objectID1 = B_objectID1;


		B_t0 = temp_t0;
		B_n0 = temp_n0;
		B_color0 = temp_col0;
		B_type0 = temp_type0;
		B_objectID0 = temp_objectID0;

		B_t1 = temp_t1;
		B_n1 = temp_n1;
		B_color1 = temp_col1;
		B_type1 = temp_type1;
		B_objectID1 = temp_objectID1;
	}
	if (B_t0 < A_t1)
	{
		t0 = B_t0;
		n0 = B_n0;
		// in surfaceA's space, so must use surfaceA's material
		type0 = A_type0; 
		color0 = A_color0;
		objectID0 = A_objectID0;
	}
	if (A_t1 > B_t0 && A_t1 < B_t1)
	{
		t1 = A_t1;
		n1 = A_n1;
		// in surfaceB's space, so must use surfaceB's material
		type1 = B_type0;
		color1 = B_color0;
		objectID1 = B_objectID0;
	}
	else if (B_t1 > A_t0 && B_t1 <= A_t1)
	{
		t1 = B_t1;
		n1 = B_n1;
		// in surfaceA's space, so must use surfaceA's material
		type1 = A_type0;
		color1 = A_color0;
		objectID1 = A_objectID0;
	}
}
`;he.pathtracing_ellipsoid_param_intersect=`
//------------------------------------------------------------------------------------------------------------
float EllipsoidParamIntersect( float yMinPercent, float yMaxPercent, float phiMaxRadians, vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 pHit;
	float t, t0, t1, phi;
	// implicit equation of a unit (radius of 1) sphere:
	// x^2 + y^2 + z^2 - 1 = 0
	float a = dot(rd, rd);
	float b = 2.0 * dot(rd, ro);
	float c = dot(ro, ro) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	if (t1 <= 0.0) return INFINITY;
	t = t0 > 0.0 ? t0 : INFINITY;
	pHit = ro + rd * t;
	phi = mod(atan(pHit.z, pHit.x), TWO_PI);
	if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
	{
		t = t1;
		pHit = ro + rd * t;
		phi = mod(atan(pHit.z, pHit.x), TWO_PI);
		if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
			t = INFINITY;
	}
	
	n = vec3(2.0 * pHit.x, 2.0 * pHit.y, 2.0 * pHit.z);
	n = dot(rd, n) < 0.0 ? n : -n; // flip normal if it is facing away from us
	return t;
}
`;he.pathtracing_cylinder_param_intersect=`
//------------------------------------------------------------------------------------------------------------
float CylinderParamIntersect( float yMinPercent, float yMaxPercent, float phiMaxRadians, vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 pHit;
	float t, t0, t1, phi;
	// implicit equation of a unit (radius of 1) cylinder, extending infinitely in the +Y and -Y directions:
	// x^2 + z^2 - 1 = 0
	float a = (rd.x * rd.x + rd.z * rd.z);
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z);
    	float c = (ro.x * ro.x + ro.z * ro.z) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	if (t1 <= 0.0) return INFINITY;
		
	t = t0 > 0.0 ? t0 : INFINITY;
	pHit = ro + rd * t;
	phi = mod(atan(pHit.z, pHit.x), TWO_PI);
	if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
	{
		t = t1;
		pHit = ro + rd * t;
		phi = mod(atan(pHit.z, pHit.x), TWO_PI);
		if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
			t = INFINITY;
	}
	
	n = vec3(2.0 * pHit.x, 0.0, 2.0 * pHit.z);
	n = dot(rd, n) < 0.0 ? n : -n; // flip normal if it is facing away from us
		
	return t;
}
`;he.pathtracing_cone_param_intersect=`
//------------------------------------------------------------------------------------------------------------
float ConeParamIntersect( float yMinPercent, float yMaxPercent, float phiMaxRadians, vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 pHit;
	float t, t0, t1, phi;
	// implicit equation of a double-cone extending infinitely in +Y and -Y directions
	// x^2 + z^2 - y^2 = 0
	// code below cuts off top cone, leaving bottom cone with apex at the top (+1.0), and circular base (radius of 1) at the bottom (-1.0)
	float k = 0.25;
	float a = rd.x * rd.x + rd.z * rd.z - k * rd.y * rd.y;
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z - k * rd.y * (ro.y - 1.0));
    	float c = ro.x * ro.x + ro.z * ro.z - k * (ro.y - 1.0) * (ro.y - 1.0);
	
	solveQuadratic(a, b, c, t0, t1);
	if (t1 <= 0.0) return INFINITY;
		
	t = t0 > 0.0 ? t0 : INFINITY;
	pHit = ro + rd * t;
	phi = mod(atan(pHit.z, pHit.x), TWO_PI);
	if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
	{
		t = t1;
		pHit = ro + rd * t;
		phi = mod(atan(pHit.z, pHit.x), TWO_PI);
		if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
			t = INFINITY;
	}
	n = vec3(2.0 * pHit.x, 2.0 * (1.0 - pHit.y) * k, 2.0 * pHit.z);
	n = dot(rd, n) < 0.0 ? n : -n; // flip normal if it is facing away from us
	return t;
}
`;he.pathtracing_paraboloid_param_intersect=`
//------------------------------------------------------------------------------------------------------------
float ParaboloidParamIntersect( float yMinPercent, float yMaxPercent, float phiMaxRadians, vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 pHit;
	float t, t0, t1, phi;
	// implicit equation of a paraboloid (bowl or vase-shape extending infinitely in the +Y direction):
	// x^2 + z^2 - y = 0
	ro.y += 1.0; // this essentially centers the paraboloid so that the bottom is at -1.0 and 
		     // the open circular top (radius of 1) is at +1.0
	float k = 0.5;
	float a = (rd.x * rd.x + rd.z * rd.z);
    	float b = 2.0 * (rd.x * ro.x + rd.z * ro.z) - k * rd.y;
    	float c = (ro.x * ro.x + ro.z * ro.z) - k * ro.y;
	solveQuadratic(a, b, c, t0, t1);
	if (t1 <= 0.0) return INFINITY;
	
	// this takes into account that we shifted the ray origin by +1.0
	yMaxPercent += 1.0;
	yMinPercent += 1.0;
	t = t0 > 0.0 ? t0 : INFINITY;
	pHit = ro + rd * t;
	phi = mod(atan(pHit.z, pHit.x), TWO_PI);
	if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
	{
		t = t1;
		pHit = ro + rd * t;
		phi = mod(atan(pHit.z, pHit.x), TWO_PI);
		if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
			t = INFINITY;
	}
	
	n = vec3(2.0 * pHit.x, -1.0 * k, 2.0 * pHit.z);
	n = dot(rd, n) < 0.0 ? n : -n; // flip normal if it is facing away from us
			
	return t;
}
`;he.pathtracing_hyperboloid_param_intersect=`
//------------------------------------------------------------------------------------------------------------
float HyperboloidParamIntersect( float k, float yMinPercent, float yMaxPercent, float phiMaxRadians, vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 pHit;
	float t, t0, t1, phi;
	// implicit equation of a hyperboloid of 1 sheet (hourglass shape extending infinitely in the +Y and -Y directions):
	// x^2 + z^2 - y^2 - 1 = 0
	// implicit equation of a hyperboloid of 2 sheets (2 mirrored opposing paraboloids, non-connecting, top extends infinitely in +Y, bottom in -Y):
	// x^2 + z^2 - y^2 + 1 = 0
	
	// if the k argument is negative, a 2-sheet hyperboloid is created
	float j = k - 1.0;
	
	float a = k * rd.x * rd.x + k * rd.z * rd.z - j * rd.y * rd.y;
	float b = 2.0 * (k * rd.x * ro.x + k * rd.z * ro.z - j * rd.y * ro.y);
	float c = (k * ro.x * ro.x + k * ro.z * ro.z - j * ro.y * ro.y) - 1.0;
	solveQuadratic(a, b, c, t0, t1);
	if (t1 <= 0.0) return INFINITY;
	
	t = t0 > 0.0 ? t0 : INFINITY;
	pHit = ro + rd * t;
	phi = mod(atan(pHit.z, pHit.x), TWO_PI);
	if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
	{
		t = t1;
		pHit = ro + rd * t;
		phi = mod(atan(pHit.z, pHit.x), TWO_PI);
		if (pHit.y > yMaxPercent || pHit.y < yMinPercent || phi > phiMaxRadians)
			t = INFINITY;
	}
	
	n = vec3(2.0 * pHit.x * k, 2.0 * -pHit.y * j, 2.0 * pHit.z * k);
	n = dot(rd, n) < 0.0 ? n : -n; // flip normal if it is facing away from us
		
	return t;
}
`;he.pathtracing_hyperbolic_paraboloid_param_intersect=`
//------------------------------------------------------------------------------------------------------------
float HyperbolicParaboloidParamIntersect( float yMinPercent, float yMaxPercent, float phiMaxRadians, vec3 ro, vec3 rd, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 pHit;
	float t, t0, t1, phi;
	// implicit equation of an infinite hyperbolic paraboloid (saddle shape):
	// x^2 - z^2 - y = 0
	float a = rd.x * rd.x - rd.z * rd.z;
	float b = 2.0 * (rd.x * ro.x - rd.z * ro.z) - rd.y;
	float c = (ro.x * ro.x - ro.z * ro.z) - ro.y;
	solveQuadratic(a, b, c, t0, t1);
	if (t1 <= 0.0) return INFINITY;
	t = t0 > 0.0 ? t0 : INFINITY;
	pHit = ro + rd * t;
	phi = mod(atan(pHit.z, pHit.x), TWO_PI);
	if (abs(pHit.x) > yMaxPercent || abs(pHit.y) > yMaxPercent || abs(pHit.z) > yMaxPercent || phi > phiMaxRadians)
	{
		t = t1;
		pHit = ro + rd * t;
		phi = mod(atan(pHit.z, pHit.x), TWO_PI);
		if (abs(pHit.x) > yMaxPercent || abs(pHit.y) > yMaxPercent || abs(pHit.z) > yMaxPercent || phi > phiMaxRadians)
			t = INFINITY;
	}
	
	n = vec3(2.0 * pHit.x, -1.0, -2.0 * pHit.z);
	n = dot(rd, n) < 0.0 ? n : -n; // flip normal if it is facing away from us
		
	return t;
}
`;he.pathtracing_ellipsoid_intersect=`
//---------------------------------------------------------------------------------
float EllipsoidIntersect( vec3 radii, vec3 pos, vec3 rayOrigin, vec3 rayDirection )
//---------------------------------------------------------------------------------
{
	float t0, t1;
	vec3 oc = rayOrigin - pos;
	vec3 oc2 = oc*oc;
	vec3 ocrd = oc*rayDirection;
	vec3 rd2 = rayDirection*rayDirection;
	vec3 invRad = 1.0/radii;
	vec3 invRad2 = invRad*invRad;

	// quadratic equation coefficients
	float a = dot(rd2, invRad2);
	float b = 2.0*dot(ocrd, invRad2);
	float c = dot(oc2, invRad2) - 1.0;
	solveQuadratic(a, b, c, t0, t1);

	return t0 > 0.0 ? t0 : t1 > 0.0 ? t1 : INFINITY;
}
`;he.pathtracing_opencylinder_intersect=`
//-------------------------------------------------------------------------------------------------------
float OpenCylinderIntersect( vec3 p0, vec3 p1, float rad, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//-------------------------------------------------------------------------------------------------------
{
	float r2=rad*rad;
	
	vec3 dp=p1-p0;
	vec3 dpt=dp/dot(dp,dp);
	
	vec3 ao=rayOrigin-p0;
	vec3 aoxab=cross(ao,dpt);
	vec3 vxab=cross(rayDirection,dpt);
	float ab2=dot(dpt,dpt);
	float a=2.0*dot(vxab,vxab);
	float ra=1.0/a;
	float b=2.0*dot(vxab,aoxab);
	float c=dot(aoxab,aoxab)-r2*ab2;
	
	float det=b*b-2.0*a*c;
	
	if (det<0.0) 
		return INFINITY;
	
	det=sqrt(det);
	
	float t0 = (-b-det)*ra;
	float t1 = (-b+det)*ra;
	
	vec3 ip;
	vec3 lp;
	float ct;
	if (t0 > 0.0)
	{
		ip=rayOrigin+rayDirection*t0;
		lp=ip-p0;
		ct=dot(lp,dpt);
		if((ct>0.0)&&(ct<1.0))
		{
			n=ip-(p0+dp*ct);
			return t0;
		}
	}
	
	if (t1 > 0.0)
	{
		ip=rayOrigin+rayDirection*t1;
		lp=ip-p0;
		ct=dot(lp,dpt);
		if((ct>0.0)&&(ct<1.0))
		{
		     	n=(p0+dp*ct)-ip;
			return t1;
		}
	}
	
	return INFINITY;
}
`;he.pathtracing_cappedcylinder_intersect=`
//---------------------------------------------------------------------------------------------------------
float CappedCylinderIntersect( vec3 p0, vec3 p1, float rad, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//---------------------------------------------------------------------------------------------------------
{
	float r2=rad*rad;
	
	vec3 dp=p1-p0;
	vec3 dpt=dp/dot(dp,dp);
	
	vec3 ao=rayOrigin-p0;
	vec3 aoxab=cross(ao,dpt);
	vec3 vxab=cross(rayDirection,dpt);
	float ab2=dot(dpt,dpt);
	float a=2.0*dot(vxab,vxab);
	float ra=1.0/a;
	float b=2.0*dot(vxab,aoxab);
	float c=dot(aoxab,aoxab)-r2*ab2;
	
	float det=b*b-2.0*a*c;
	
	if(det<0.0)
		return INFINITY;
	
	det=sqrt(det);
	
	float t0=(-b-det)*ra;
	float t1=(-b+det)*ra;
	
	vec3 ip;
	vec3 lp;
	float ct;
	float result = INFINITY;
	
	// Cylinder caps
	// disk0
	vec3 diskNormal = normalize(dp);
	float denom = dot(diskNormal, rayDirection);
	vec3 pOrO = p0 - rayOrigin;
	float tDisk0 = dot(pOrO, diskNormal) / denom;
	if (tDisk0 > 0.0)
	{
		vec3 intersectPos = rayOrigin + rayDirection * tDisk0;
		vec3 v = intersectPos - p0;
		float d2 = dot(v,v);
		if (d2 <= r2)
		{
			result = tDisk0;
			n = diskNormal;
		}
	}
	
	// disk1
	denom = dot(diskNormal, rayDirection);
	pOrO = p1 - rayOrigin;
	float tDisk1 = dot(pOrO, diskNormal) / denom;
	if (tDisk1 > 0.0)
	{
		vec3 intersectPos = rayOrigin + rayDirection * tDisk1;
		vec3 v = intersectPos - p1;
		float d2 = dot(v,v);
		if (d2 <= r2 && tDisk1 < result)
		{
			result = tDisk1;
			n = diskNormal;
		}
	}
	
	// Cylinder body
	if (t1 > 0.0)
	{
		ip=rayOrigin+rayDirection*t1;
		lp=ip-p0;
		ct=dot(lp,dpt);
		if(ct>0.0 && ct<1.0 && t1<result)
		{
			result = t1;
		     	n=(p0+dp*ct)-ip;
		}
	}
	
	if (t0 > 0.0)
	{
		ip=rayOrigin+rayDirection*t0;
		lp=ip-p0;
		ct=dot(lp,dpt);
		if(ct>0.0 && ct<1.0 && t0<result)
		{
			result = t0;
			n=ip-(p0+dp*ct);
		}
	}
	
	return result;
}
`;he.pathtracing_cone_intersect=`
//--------------------------------------------------------------------------------------------------------
float ConeIntersect( vec3 p0, float r0, vec3 p1, float r1, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//-------------------------------------------------------------------------------------------------------- 
{
	r0 += 0.1;
	vec3 locX;
	vec3 locY;
	vec3 locZ=-(p1-p0)/(1.0 - r1/r0);
	
	rayOrigin-=p0-locZ;
	
	if(abs(locZ.x)<abs(locZ.y))
		locX=vec3(1,0,0);
	else
		locX=vec3(0,1,0);
		
	float len=length(locZ);
	locZ=normalize(locZ)/len;
	locY=normalize(cross(locX,locZ))/r0;
	locX=normalize(cross(locY,locZ))/r0;
	
	mat3 tm;
	tm[0]=locX;
	tm[1]=locY;
	tm[2]=locZ;
	
	rayDirection*=tm;
	rayOrigin*=tm;
	
	float dx=rayDirection.x;
	float dy=rayDirection.y;
	float dz=rayDirection.z;
	
	float x0=rayOrigin.x;
	float y0=rayOrigin.y;
	float z0=rayOrigin.z;
	
	float x02=x0*x0;
	float y02=y0*y0;
	float z02=z0*z0;
	
	float dx2=dx*dx;
	float dy2=dy*dy;
	float dz2=dz*dz;
	
	float det=(
		-2.0*x0*dx*z0*dz
		+2.0*x0*dx*y0*dy
		-2.0*z0*dz*y0*dy
		+dz2*x02
		+dz2*y02
		+dx2*z02
		+dy2*z02
		-dy2*x02
		-dx2*y02
        );
	
	if(det<0.0)
		return INFINITY;
		
	float t0=(-x0*dx+z0*dz-y0*dy-sqrt(abs(det)))/(dx2-dz2+dy2);
	float t1=(-x0*dx+z0*dz-y0*dy+sqrt(abs(det)))/(dx2-dz2+dy2);
	vec3 pt0=rayOrigin+t0*rayDirection;
	vec3 pt1=rayOrigin+t1*rayDirection;
	
	if(t0>0.0 && pt0.z>r1/r0 && pt0.z<1.0)
	{
		n=pt0;
		n.z=0.0;
		n=normalize(n);
		n.z=-pt0.z/abs(pt0.z);
		n=normalize(n);
		n=tm*n;
		return t0;
	}
        if(t1>0.0 && pt1.z>r1/r0 && pt1.z<1.0)
	{
		n=pt1;
		n.z=0.0;
		n=normalize(n);
		n.z=-pt1.z/abs(pt1.z);
		n=normalize(n);
		n=tm*-n;
		return t1;
	}
	
	return INFINITY;	
}
`;he.pathtracing_capsule_intersect=`
//-----------------------------------------------------------------------------------------------------------
float CapsuleIntersect( vec3 p0, float r0, vec3 p1, float r1, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//-----------------------------------------------------------------------------------------------------------
{
	/*
	// used for ConeIntersect below, if different radius sphere end-caps are desired
	vec3 l  = p1-p0;
	float ld = length(l);
	l=l/ld;
	float d= r0-r1;
	float sa = d/ld;
	float h0 = r0*sa;
	float h1 = r1*sa;
	float cr0 = sqrt(r0*r0-h0*h0);
	float cr1 = sqrt(r1*r1-h1*h1);
	vec3 coneP0=p0+l*h0;
	vec3 coneP1=p1+l*h1;
	*/
	
	float t0=INFINITY;
	    
	float t1;
	vec3 uv1;
	vec3 n1;
	//t1 = ConeIntersect(coneP0,cr0,coneP1,cr1,rayOrigin, rayDirection,n1);
	t1 = OpenCylinderIntersect(p0,p1,r0,rayOrigin, rayDirection,n1);
	if(t1<t0)
	{
		t0=t1;
		n=n1;
	}
	t1 = SphereIntersect(r0,p0,rayOrigin, rayDirection);
	if(t1<t0)
	{
		t0=t1;
		n=(rayOrigin + rayDirection * t1) - p0;
	}
	t1 = SphereIntersect(r1,p1,rayOrigin, rayDirection);
	if(t1<t0)
	{
		t0=t1;
		n=(rayOrigin + rayDirection * t1) - p1;
	}
	    
	return t0;
}
`;he.pathtracing_paraboloid_intersect=`
//-----------------------------------------------------------------------------------------------------------
float ParaboloidIntersect( float rad, float height, vec3 pos, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//-----------------------------------------------------------------------------------------------------------
{
	vec3 rd = rayDirection;
	vec3 ro = rayOrigin - pos;
	float k = height / (rad * rad);
	
	// quadratic equation coefficients
	float a = k * (rd.x * rd.x + rd.z * rd.z);
	float b = k * 2.0 * (rd.x * ro.x + rd.z * ro.z) - rd.y;
	float c = k * (ro.x * ro.x + ro.z * ro.z) - ro.y;
	float t0, t1;
	solveQuadratic(a, b, c, t0, t1);
	
	vec3 ip;
	
	if (t0 > 0.0)
	{
		ip = ro + rd * t0;
		n = vec3( 2.0 * ip.x, -1.0 / k, 2.0 * ip.z );
		// flip normal if it is facing away from us
		n *= sign(-dot(rd, n)) * 2.0 - 1.0; // sign is 0 or 1, map it to -1 and +1
		
		if (ip.y < height)
			return t0;
				
	}
	if (t1 > 0.0)
	{	
		ip = ro + rd * t1;
		n = vec3( 2.0 * ip.x, -1.0 / k, 2.0 * ip.z );
		// flip normal if it is facing away from us
		n *= sign(-dot(rd, n)) * 2.0 - 1.0; // sign is 0 or 1, map it to -1 and +1
		
		if (ip.y < height)
			return t1;		
	}
	
	return INFINITY;	
}
`;he.pathtracing_hyperboloid_intersect=`
//------------------------------------------------------------------------------------------------------------
float HyperboloidIntersect( float rad, float height, vec3 pos, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//------------------------------------------------------------------------------------------------------------
{
	vec3 rd = rayDirection;
	vec3 ro = rayOrigin - pos;
	float k = height / (rad * rad);
	
	// quadratic equation coefficients
	float a = k * ((rd.x * rd.x) - (rd.y * rd.y) + (rd.z * rd.z));
	float b = k * 2.0 * ( (rd.x * ro.x) - (rd.y * ro.y) + (rd.z * ro.z) );
	float c = k * ((ro.x * ro.x) - (ro.y * ro.y) + (ro.z * ro.z)) - (rad * rad);
	
	float t0, t1;
	solveQuadratic(a, b, c, t0, t1);
	
	vec3 ip;
	
	if (t0 > 0.0)
	{
		ip = ro + rd * t0;
		n = vec3( 2.0 * ip.x, -2.0 * ip.y, 2.0 * ip.z );
		// flip normal if it is facing away from us
		n *= sign(-dot(rd, n)) * 2.0 - 1.0; // sign is 0 or 1, map it to -1 and +1
		
		if (abs(ip.y) < height)
			return t0;		
	}
	if (t1 > 0.0)
	{	
		ip = ro + rd * t1;
		n = vec3( 2.0 * ip.x, -2.0 * ip.y, 2.0 * ip.z );
		// flip normal if it is facing away from us
		n *= sign(-dot(rd, n)) * 2.0 - 1.0; // sign is 0 or 1, map it to -1 and +1
		
		if (abs(ip.y) < height)
			return t1;	
	}
	
	return INFINITY;	
}
`;he.pathtracing_hyperbolic_paraboloid_intersect=`
//---------------------------------------------------------------------------------------------------------------------
float HyperbolicParaboloidIntersect( float rad, float height, vec3 pos, vec3 rayOrigin, vec3 rayDirection, out vec3 n )
//---------------------------------------------------------------------------------------------------------------------
{
	vec3 rd = rayDirection;
	vec3 ro = rayOrigin - pos;
	float k = height / (rad * rad);
	
	// quadratic equation coefficients
	float a = k * (rd.x * rd.x - rd.z * rd.z);
	float b = k * 2.0 * (rd.x * ro.x - rd.z * ro.z) - rd.y;
	float c = k * (ro.x * ro.x - ro.z * ro.z) - ro.y;
	
	float t0, t1;
	solveQuadratic(a, b, c, t0, t1);
	
	vec3 ip;
	if (t0 > 0.0)
	{
		ip = ro + rd * t0;
		n = vec3( 2.0 * ip.x, -1.0 / k, -2.0 * ip.z );
		// flip normal if it is facing away from us
		n *= sign(-dot(rd, n)) * 2.0 - 1.0; // sign is 0 or 1, map it to -1 and +1
		
		if (abs(ip.x) < height && abs(ip.y) < height && abs(ip.z) < height)
			return t0;		
	}
	if (t1 > 0.0)
	{	
		ip = ro + rd * t1;
		n = vec3( 2.0 * ip.x, -1.0 / k, -2.0 * ip.z );
		// flip normal if it is facing away from us
		n *= sign(-dot(rd, n)) * 2.0 - 1.0; // sign is 0 or 1, map it to -1 and +1
		
		if (abs(ip.x) < height && abs(ip.y) < height && abs(ip.z) < height)
			return t1;		
	}
		
	return INFINITY;	
}
`;he.pathtracing_unit_torus_intersect=`

// The following Torus quartic solver algo/code is from https://www.shadertoy.com/view/ssc3Dn by Shadertoy user 'mla'

float sgn(float x) 
{
	return x < 0.0 ? -1.0 : 1.0; // Return 1.0 for x == 0.0
}

float evalquadratic(float x, float A, float B, float C) 
{
  	return (A * x + B) * x + C;
}

float evalcubic(float x, float A, float B, float C, float D) 
{
  	return ((A * x + B) * x + C) * x + D;
}

// Quadratic solver from Kahan
int quadratic(float A, float B, float C, out vec2 res) 
{
  	float b = -0.5 * B, b2 = b * b;
  	float q = b2 - A * C;
  	if (q < 0.0) return 0;
  	float r = b + sgn(b) * sqrt(q);
  	if (r == 0.0) 
	{
  		res[0] = C / A;
    		res[1] = -res[0];
  	} 
	else 
	{
    		res[0] = C / r;
    		res[1] = r / A;
  	}

  	return 2;
}

// Numerical Recipes algorithm for solving cubic equation
int cubic(float a, float b, float c, float d, out vec3 res) 
{
  	if (a == 0.0) 
  	{
    		return quadratic(b, c, d, res.xy);
  	}
  	if (d == 0.0) 
  	{
    		res.x = 0.0;
    		return 1 + quadratic(a, b, c, res.yz);
  	}
  	float tmp = a; a = b / tmp; b = c / tmp; c = d / tmp;
  	// solve x^3 + ax^2 + bx + c = 0
  	float Q = (a * a - 3.0 * b) / 9.0;
  	float R = (2.0 * a * a * a - 9.0 * a * b + 27.0 * c) / 54.0;
  	float R2 = R * R, Q3 = Q * Q * Q;
  	if (R2 < Q3) 
  	{
    		float X = clamp(R / sqrt(Q3), -1.0, 1.0);
    		float theta = acos(X);
    		float S = sqrt(Q); // Q must be positive since 0 <= R2 < Q3
    		res[0] = -2.0 *S *cos(theta / 3.0) - a / 3.0;
    		res[1] = -2.0 *S *cos((theta + 2.0 * PI) / 3.0) - a / 3.0;
    		res[2] = -2.0 *S *cos((theta + 4.0 * PI) / 3.0) - a / 3.0;
    		return 3;
  	} 
  	else 
  	{
    		float alpha = -sgn(R) * pow(abs(R) + sqrt(R2 - Q3), 0.3333);
    		float beta = alpha == 0.0 ? 0.0 : Q / alpha;
    		res[0] = alpha + beta - a / 3.0;
    		return 1;
  	}
}

/* float qcubic(float B, float C, float D) {
  vec3 roots;
  int nroots = cubic(1.0,B,C,D,roots);
  // Sort into descending order
  if (nroots > 1 && roots.x < roots.y) roots.xy = roots.yx;
  if (nroots > 2) {
    if (roots.y < roots.z) roots.yz = roots.zy;
    if (roots.x < roots.y) roots.xy = roots.yx;
  }
  // And select the largest
  float psi = roots[0];
  psi = max(1e-6,psi);
  // and give a quick polish with Newton-Raphson
  for (int i = 0; i < 3; i++) {
    float delta = evalcubic(psi,1.0,B,C,D)/evalquadratic(psi,3.0,2.0*B,C);
    psi -= delta;
  }
  return psi;
} */

float qcubic(float B, float C, float D) 
{
  	vec3 roots;
  	int nroots = cubic(1.0, B, C, D, roots);
  	// Select the largest
  	float psi = roots[0];
  	if (nroots > 1) psi = max(psi, roots[1]);
  	if (nroots > 2) psi = max(psi, roots[2]);
  
  	// Give a quick polish with Newton-Raphson
  	float delta;
	delta = evalcubic(psi, 1.0, B, C, D) / evalquadratic(psi, 3.0, 2.0 * B, C);
	psi -= delta;
	delta = evalcubic(psi, 1.0, B, C, D) / evalquadratic(psi, 3.0, 2.0 * B, C);
    	psi -= delta;
  
  	return psi;
}

// The Lanczos quartic method
int lquartic(float c1, float c2, float c3, float c4, out vec4 res) 
{
  	float alpha = 0.5 * c1;
  	float A = c2 - alpha * alpha;
  	float B = c3 - alpha * A;
  	float a, b, beta, psi;
  	psi = qcubic(2.0 * A - alpha * alpha, A * A + 2.0 * B * alpha - 4.0 * c4, -B * B);
  	// There _should_ be a root >= 0, but sometimes the cubic
  	// solver misses it (probably a double root around zero).
  	psi = max(0.0, psi);
  	a = sqrt(psi);
  	beta = 0.5 * (A + psi);
  	if (psi <= 0.0) 
  	{
    		b = sqrt(max(beta * beta - c4, 0.0));
  	} 
  	else 
  	{
    		b = 0.5 * a * (alpha - B / psi);
  	}

  	int resn = quadratic(1.0, alpha + a, beta + b, res.xy);
  	vec2 tmp;
  	if (quadratic(1.0, alpha - a, beta - b, tmp) != 0) 
  	{ 
    		res.zw = res.xy;
    		res.xy = tmp;
    		resn += 2;
  	}

  	return resn;
}

// Note: the parameter below is renamed '_E', because Euler's number 'E' is already defined in 'pathtracing_defines_and_uniforms'
int quartic(float A, float B, float C, float D, float _E, out vec4 roots) 
{
    	int nroots = lquartic(B / A, C / A, D / A, _E / A, roots);
  
  	return nroots;
}


float UnitTorusIntersect(vec3 ro, vec3 rd, float k, out vec3 n) 
{
	// Note: the vec3 'rd' might not be normalized to unit length of 1, 
	//  in order to allow for inverse transform of intersecting rays into Torus' object space
	k = mix(0.5, 1.0, k);
	float torus_R = max(0.0, k); // outer extent of the entire torus/ring
	float torus_r = max(0.01, 1.0 - k); // thickness of circular 'tubing' part of torus/ring
	float torusR2 = torus_R * torus_R;
	float torusr2 = torus_r * torus_r;
	
	float U = dot(rd, rd);
	float V = 2.0 * dot(ro, rd);
	float W = dot(ro, ro) - (torusR2 + torusr2);
	// A*t^4 + B*t^3 + C*t^2 + D*t + _E = 0
	float A = U * U;
	float B = 2.0 * U * V;
	float C = V * V + 2.0 * U * W + 4.0 * torusR2 * rd.z * rd.z;
	float D = 2.0 * V * W + 8.0 * torusR2 * ro.z * rd.z;
// Note: the float below is renamed '_E', because Euler's number 'E' is already defined in 'pathtracing_defines_and_uniforms'
	float _E = W * W + 4.0 * torusR2 * (ro.z * ro.z - torusr2);
	

	vec4 res = vec4(0);
	int nr = quartic(A, B, C, D, _E, res);
	if (nr == 0) return INFINITY;
  	// Sort the roots.
  	if (res.x > res.y) res.xy = res.yx; 
  	if (nr > 2) 
	{
    		if (res.y > res.z) res.yz = res.zy; 
    		if (res.x > res.y) res.xy = res.yx;
  	}
	if (nr > 3) 
	{
		if (res.z > res.w) res.zw = res.wz; 
		if (res.y > res.z) res.yz = res.zy; 
		if (res.x > res.y) res.xy = res.yx; 
	}
  
	float t = INFINITY;
	
	t = (res.w > 0.0) ? res.w : t;	
	t = (res.z > 0.0) ? res.z : t;
	t = (res.y > 0.0) ? res.y : t;	
	t = (res.x > 0.0) ? res.x : t;
		
	vec3 pos = ro + t * rd;
	n = pos * (dot(pos, pos) - torusr2 - torusR2 * vec3(1, 1,-1));

	// float kn = sqrt(torusR2 / dot(pos.xy, pos.xy));
	// pos.xy -= kn * pos.xy;
	// n = pos;
	
  	return t;
}

`;he.pathtracing_quad_intersect=`
float TriangleIntersect( vec3 v0, vec3 v1, vec3 v2, vec3 rayOrigin, vec3 rayDirection, int isDoubleSided )
{
	vec3 edge1 = v1 - v0;
	vec3 edge2 = v2 - v0;
	vec3 pvec = cross(rayDirection, edge2);
	float det = 1.0 / dot(edge1, pvec);
	if ( isDoubleSided == FALSE && det < 0.0 ) 
		return INFINITY;
	vec3 tvec = rayOrigin - v0;
	float u = dot(tvec, pvec) * det;
	vec3 qvec = cross(tvec, edge1);
	float v = dot(rayDirection, qvec) * det;
	float t = dot(edge2, qvec) * det;
	return (u < 0.0 || u > 1.0 || v < 0.0 || u + v > 1.0 || t <= 0.0) ? INFINITY : t;
}
//--------------------------------------------------------------------------------------------------------------
float QuadIntersect( vec3 v0, vec3 v1, vec3 v2, vec3 v3, vec3 rayOrigin, vec3 rayDirection, int isDoubleSided )
//--------------------------------------------------------------------------------------------------------------
{
	return min(TriangleIntersect(v0, v1, v2, rayOrigin, rayDirection, isDoubleSided), 
		   TriangleIntersect(v0, v2, v3, rayOrigin, rayDirection, isDoubleSided));
}
`;he.pathtracing_box_intersect=`
//-----------------------------------------------------------------------------------------------------------------------------
float BoxIntersect( vec3 minCorner, vec3 maxCorner, vec3 rayOrigin, vec3 rayDirection, out vec3 normal, out int isRayExiting )
//-----------------------------------------------------------------------------------------------------------------------------
{
	vec3 invDir = 1.0 / rayDirection;
	vec3 near = (minCorner - rayOrigin) * invDir;
	vec3 far  = (maxCorner - rayOrigin) * invDir;

	vec3 tmin = min(near, far);
	vec3 tmax = max(near, far);

	float t0 = max( max(tmin.x, tmin.y), tmin.z);
	float t1 = min( min(tmax.x, tmax.y), tmax.z);

	if (t0 > t1) return INFINITY;
	if (t0 > 0.0) // if we are outside the box
	{
		normal = -sign(rayDirection) * step(tmin.yzx, tmin) * step(tmin.zxy, tmin);
		isRayExiting = FALSE;
		return t0;
	}
	if (t1 > 0.0) // if we are inside the box
	{
		normal = -sign(rayDirection) * step(tmax, tmax.yzx) * step(tmax, tmax.zxy);
		isRayExiting = TRUE;
		return t1;
	}
	return INFINITY;
}
`;he.pathtracing_box_interior_intersect=`
//--------------------------------------------------------------------------------------------------------------
float BoxInteriorIntersect( vec3 minCorner, vec3 maxCorner, vec3 rayOrigin, vec3 rayDirection, out vec3 normal )
//--------------------------------------------------------------------------------------------------------------
{
	vec3 invDir = 1.0 / rayDirection;
	vec3 near = (minCorner - rayOrigin) * invDir;
	vec3 far  = (maxCorner - rayOrigin) * invDir;
	
	vec3 tmin = min(near, far);
	vec3 tmax = max(near, far);
	
	float t0 = max( max(tmin.x, tmin.y), tmin.z);
	float t1 = min( min(tmax.x, tmax.y), tmax.z);
	
	if (t0 > t1) return INFINITY;

	/*
	if (t0 > 0.0) // if we are outside the box
	{
		normal = -sign(rayDirection) * step(tmin.yzx, tmin) * step(tmin.zxy, tmin);
		return t0;	
	}
	*/

	if (t1 > 0.0) // if we are inside the box
	{
		normal = -sign(rayDirection) * step(tmax, tmax.yzx) * step(tmax, tmax.zxy);
		return t1;
	}

	return INFINITY;
}
`;he.pathtracing_boundingbox_intersect=`
//--------------------------------------------------------------------------------------
float BoundingBoxIntersect( vec3 minCorner, vec3 maxCorner, vec3 rayOrigin, vec3 invDir )
//--------------------------------------------------------------------------------------
{
	vec3 near = (minCorner - rayOrigin) * invDir;
	vec3 far  = (maxCorner - rayOrigin) * invDir;
	
	vec3 tmin = min(near, far);
	vec3 tmax = max(near, far);
	
	float t0 = max( max(tmin.x, tmin.y), tmin.z);
	float t1 = min( min(tmax.x, tmax.y), tmax.z);
	
	return max(t0, 0.0) > t1 ? INFINITY : t0;
}
`;he.pathtracing_bvhTriangle_intersect=`
//-------------------------------------------------------------------------------------------------------------------
float BVH_TriangleIntersect( vec3 v0, vec3 v1, vec3 v2, vec3 rayOrigin, vec3 rayDirection, out float u, out float v )
//-------------------------------------------------------------------------------------------------------------------
{
	vec3 edge1 = v1 - v0;
	vec3 edge2 = v2 - v0;
	vec3 pvec = cross(rayDirection, edge2);
	float det = 1.0 / dot(edge1, pvec);
	vec3 tvec = rayOrigin - v0;
	u = dot(tvec, pvec) * det;
	vec3 qvec = cross(tvec, edge1);
	v = dot(rayDirection, qvec) * det;
	float t = dot(edge2, qvec) * det;
	return (det < 0.0 || u < 0.0 || u > 1.0 || v < 0.0 || u + v > 1.0 || t <= 0.0) ? INFINITY : t;
}
`;he.pathtracing_bvhDoubleSidedTriangle_intersect=`
//------------------------------------------------------------------------------------------------------------------------------
float BVH_DoubleSidedTriangleIntersect( vec3 v0, vec3 v1, vec3 v2, vec3 rayOrigin, vec3 rayDirection, out float u, out float v )
//------------------------------------------------------------------------------------------------------------------------------
{
	vec3 edge1 = v1 - v0;
	vec3 edge2 = v2 - v0;
	vec3 pvec = cross(rayDirection, edge2);
	float det = 1.0 / dot(edge1, pvec);
	vec3 tvec = rayOrigin - v0;
	u = dot(tvec, pvec) * det;
	vec3 qvec = cross(tvec, edge1);
	v = dot(rayDirection, qvec) * det; 
	float t = dot(edge2, qvec) * det;
	return (u < 0.0 || u > 1.0 || v < 0.0 || u + v > 1.0 || t <= 0.0) ? INFINITY : t;
}
`;he.pathtracing_physical_sky_functions=`
float RayleighPhase(float cosTheta)
{
	return THREE_OVER_SIXTEENPI * (1.0 + (cosTheta * cosTheta));
}

float hgPhase(float cosTheta, float g)
{
        float g2 = g * g;
        float inverse = 1.0 / pow(max(0.0, 1.0 - 2.0 * g * cosTheta + g2), 1.5);
	return ONE_OVER_FOURPI * ((1.0 - g2) * inverse);
}

vec3 totalMie()
{
	float c = (0.2 * TURBIDITY) * 10E-18;
	return 0.434 * c * MIE_CONST;
}

float SunIntensity(float zenithAngleCos)
{
	zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
	return SUN_POWER * max( 0.0, 1.0 - pow( E, -( ( CUTOFF_ANGLE - acos( zenithAngleCos ) ) / STEEPNESS ) ) );
}

vec3 Get_Sky_Color(vec3 rayDir)
{
	vec3 viewDirection = normalize(rayDir);
	
	/* most of the following code is borrowed from the three.js shader file: SkyShader.js */
    	// Cosine angles
	float cosViewSunAngle = dot(viewDirection, uSunDirection);
    	float cosSunUpAngle = dot(UP_VECTOR, uSunDirection); // allowed to be negative: + is daytime, - is nighttime
    	float cosUpViewAngle = dot(UP_VECTOR, viewDirection);
	
        // Get sun intensity based on how high in the sky it is
    	float sunE = SunIntensity(cosSunUpAngle);
        
	// extinction (absorbtion + out scattering)
	// rayleigh coefficients
    	vec3 rayleighAtX = TOTAL_RAYLEIGH * RAYLEIGH_COEFFICIENT;
    
	// mie coefficients
	vec3 mieAtX = totalMie() * MIE_COEFFICIENT;  
    
	// optical length
	float zenithAngle = acos( max( 0.0, dot( UP_VECTOR, viewDirection ) ) );
	float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / PI ), -1.253 ) );
	float rayleighOpticalLength = RAYLEIGH_ZENITH_LENGTH * inverse;
	float mieOpticalLength = MIE_ZENITH_LENGTH * inverse;
	// combined extinction factor	
	vec3 Fex = exp(-(rayleighAtX * rayleighOpticalLength + mieAtX * mieOpticalLength));
	// in scattering
	vec3 betaRTheta = rayleighAtX * RayleighPhase(cosViewSunAngle * 0.5 + 0.5);
	vec3 betaMTheta = mieAtX * hgPhase(cosViewSunAngle, MIE_DIRECTIONAL_G);
	
	vec3 Lin = pow( sunE * ( ( betaRTheta + betaMTheta ) / ( rayleighAtX + mieAtX ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
	Lin *= mix( vec3( 1.0 ), pow( sunE * ( ( betaRTheta + betaMTheta ) / ( rayleighAtX + mieAtX ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - cosSunUpAngle, 5.0 ), 0.0, 1.0 ) );
	// nightsky
	float theta = acos( viewDirection.y ); // elevation --> y-axis, [-pi/2, pi/2]
	float phi = atan( viewDirection.z, viewDirection.x ); // azimuth --> x-axis [-pi/2, pi/2]
	vec2 uv = vec2( phi, theta ) / vec2( 2.0 * PI, PI ) + vec2( 0.5, 0.0 );
	vec3 L0 = vec3( 0.1 ) * Fex;
	// composition + solar disc
	float sundisk = smoothstep( SUN_ANGULAR_DIAMETER_COS, SUN_ANGULAR_DIAMETER_COS + 0.00002, cosViewSunAngle );
	L0 += ( sunE * 19000.0 * Fex ) * sundisk;
	vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );
	float sunfade = 1.0 - clamp( 1.0 - exp( ( uSunDirection.y / 450000.0 ) ), 0.0, 1.0 );
	vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * sunfade ) ) ) );
	return retColor;
}
`;he.pathtracing_random_functions=`
// globals used in rand() function
vec4 randVec4; // samples and holds the RGBA blueNoise texture value for this pixel
float randNumber; // the final randomly generated number (range: 0.0 to 1.0)
float counter; // will get incremented by 1 on each call to rand()
int channel; // the final selected color channel to use for rand() calc (range: 0 to 3, corresponds to R,G,B, or A)
float rand()
{
	counter++; // increment counter by 1 on every call to rand()
	// cycles through channels, if modulus is 1.0, channel will always be 0 (the R color channel)
	channel = int(mod(counter, 2.0)); 
	// but if modulus was 4.0, channel will cycle through all available channels: 0,1,2,3,0,1,2,3, and so on...
	randNumber = randVec4[channel]; // get value stored in channel 0:R, 1:G, 2:B, or 3:A
	return fract(randNumber); // we're only interested in randNumber's fractional value between 0.0 (inclusive) and 1.0 (non-inclusive)
	//return clamp(randNumber,0.0,0.999999999); // we're only interested in randNumber's fractional value between 0.0 (inclusive) and 1.0 (non-inclusive)
}
// from iq https://www.shadertoy.com/view/4tXyWN
// global seed used in rng() function
uvec2 seed;
float rng()
{
	seed += uvec2(1);
    	uvec2 q = 1103515245U * ( (seed >> 1U) ^ (seed.yx) );
    	uint  n = 1103515245U * ( (q.x) ^ (q.y >> 3U) );
	return float(n) * (1.0 / float(0xffffffffU));
}

vec3 randomSphereDirection()
{
    	float up = rng() * 2.0 - 1.0; // range: -1 to +1
	float over = sqrt( max(0.0, 1.0 - up * up) );
	float around = rng() * TWO_PI;
	return normalize(vec3(cos(around) * over, up, sin(around) * over));	
}

/* vec3 randomCosWeightedDirectionInHemisphere(vec3 nl)
{
	float r0 = sqrt(rng());
	float phi = rng() * TWO_PI;
	float x = r0 * cos(phi);
	float y = r0 * sin(phi);
	float z = sqrt(1.0 - r0 * r0);
	vec3 T = normalize(cross(nl.yzx, nl));
	vec3 B = cross(nl, T);
	return normalize(T * x + B * y + nl * z);
} */

//the following alternative skips the creation of tangent and bi-tangent vectors T and B
vec3 randomCosWeightedDirectionInHemisphere(vec3 nl)
{
	float z = rng() * 2.0 - 1.0;
	float phi = rng() * TWO_PI;
	float r = sqrt(1.0 - z * z);
    	return normalize(nl + vec3(r * cos(phi), r * sin(phi), z));
}

vec3 randomDirectionInSpecularLobe(vec3 reflectionDir, float roughness)
{
	float z = rng() * 2.0 - 1.0;
	float phi = rng() * TWO_PI;
	float r = sqrt(1.0 - z * z);
    	vec3 cosDiffuseDir = normalize(reflectionDir + vec3(r * cos(phi), r * sin(phi), z));
	return normalize( mix(reflectionDir, cosDiffuseDir, roughness * roughness) );
}

/* vec3 randomDirectionInPhongSpecular(vec3 reflectionDir, float shininess)
{
	float cosTheta = pow(rng(), 1.0 / (2.0 + shininess));
	float sinTheta = sqrt(1.0 - cosTheta * cosTheta);
	float phi = rng() * TWO_PI;
	float x = sinTheta * cos(phi);
	float y = sinTheta * sin(phi);
	vec3 T = normalize(cross(reflectionDir.yzx, reflectionDir));
	vec3 B = cross(reflectionDir, T);
	return normalize(T * x + B * y + reflectionDir * cosTheta);
} */

/* 
// this is my crude attempt at a Fibonacci-spiral sample point pattern on a hemisphere above a diffuse surface
#define N_POINTS 64.0 //64.0
vec3 randomCosWeightedDirectionInHemisphere(vec3 nl)
{
	float i = N_POINTS * rng();
			// the Golden angle in radians
	float phi = mod(i * 2.39996322972865332, TWO_PI);
	float r = sqrt(i / N_POINTS); // sqrt pushes points outward to prevent clumping in center of disk
	float x = r * cos(phi);
	float y = r * sin(phi);
	float z = sqrt(1.0 - r * r);
	
	vec3 U = normalize( cross( abs(nl.y) < 0.9 ? vec3(0, 1, 0) : vec3(0, 0, 1), nl ) );
	vec3 V = cross(nl, U);
	return normalize(x * U + y * V + z * nl);
} */

/* 
// like the function several functions above, 
// the following alternative skips the creation of tangent and bi-tangent vectors T and B 
vec3 randomCosWeightedDirectionInHemisphere(vec3 nl)
{
	float phi = rng() * TWO_PI;
	float theta = rng() * 2.0 - 1.0;
	return normalize(nl + vec3(sqrt(1.0 - theta * theta) * vec2(cos(phi), sin(phi)), theta));
} */

`;he.pathtracing_sample_sphere_light=`
vec3 sampleSphereLight(vec3 x, vec3 nl, Sphere light, out float weight)
{
	vec3 dirToLight = (light.position - x); // no normalize (for distance calc below)
	float cos_alpha_max = sqrt(1.0 - clamp((light.radius * light.radius) / dot(dirToLight, dirToLight), 0.0, 1.0));
	float r0 = rng();
	float cos_alpha = 1.0 - r0 + r0 * cos_alpha_max;//mix( cos_alpha_max, 1.0, rng() );
	// * 0.75 below ensures shadow rays don't miss smaller sphere lights, due to shader float precision
	float sin_alpha = sqrt(max(0.0, 1.0 - cos_alpha * cos_alpha)) * 0.75; 
	float phi = rng() * TWO_PI;
	dirToLight = normalize(dirToLight);
	
	vec3 U = normalize( cross( abs(dirToLight.y) < 0.9 ? vec3(0, 1, 0) : vec3(0, 0, 1), dirToLight ) );
	vec3 V = cross(dirToLight, U);
	
	vec3 sampleDir = normalize(U * cos(phi) * sin_alpha + V * sin(phi) * sin_alpha + dirToLight * cos_alpha);
	weight = clamp(2.0 * (1.0 - cos_alpha_max) * max(0.0, dot(nl, sampleDir)), 0.0, 1.0);
	
	return sampleDir;
}
`;he.pathtracing_sample_quad_light=`
vec3 sampleQuadLight(vec3 x, vec3 nl, Quad light, out float weight)
{
	vec3 randPointOnLight;
	randPointOnLight.x = mix(light.v0.x, light.v2.x, clamp(rng(), 0.1, 0.9));
	randPointOnLight.y = light.v0.y;
	randPointOnLight.z = mix(light.v0.z, light.v2.z, clamp(rng(), 0.1, 0.9));
	vec3 dirToLight = randPointOnLight - x;
	float r2 = distance(light.v0, light.v1) * distance(light.v0, light.v3);
	float d2 = dot(dirToLight, dirToLight);
	float cos_a_max = sqrt(1.0 - clamp( r2 / d2, 0.0, 1.0));
	dirToLight = normalize(dirToLight);
	float dotNlRayDir = max(0.0, dot(nl, dirToLight)); 
	weight =  2.0 * (1.0 - cos_a_max) * max(0.0, -dot(dirToLight, light.normal)) * dotNlRayDir; 
	weight = clamp(weight, 0.0, 1.0);
	return dirToLight;
}
`;he.pathtracing_calc_fresnel_reflectance=`
float calcFresnelReflectance(vec3 rayDirection, vec3 n, float etai, float etat, out float ratioIoR)
{
	float temp = etai;
	float cosi = clamp(dot(rayDirection, n), -1.0, 1.0);
	if (cosi > 0.0)
	{
		etai = etat;
		etat = temp;
	}
	
	ratioIoR = etai / etat;
	float sint2 = ratioIoR * ratioIoR * (1.0 - (cosi * cosi));
	if (sint2 >= 1.0) 
		return 1.0; // total internal reflection
	float cost = sqrt(1.0 - sint2);
	cosi = abs(cosi);
	float Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
	float Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
	return clamp( ((Rs * Rs) + (Rp * Rp)) * 0.5, 0.0, 1.0 );
}
`;he.pathtracing_main=`
// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
float tentFilter(float x) // input: x: a random float(0.0 to 1.0), output: a filtered float (-1.0 to +1.0)
{
	return (x < 0.5) ? sqrt(2.0 * x) - 1.0 : 1.0 - sqrt(2.0 - (2.0 * x));
}

void main( void )
{
	vec3 camRight   = vec3( uCameraMatrix[0][0],  uCameraMatrix[0][1],  uCameraMatrix[0][2]);
	vec3 camUp      = vec3( uCameraMatrix[1][0],  uCameraMatrix[1][1],  uCameraMatrix[1][2]);
	vec3 camForward = vec3(-uCameraMatrix[2][0], -uCameraMatrix[2][1], -uCameraMatrix[2][2]);
	// the following is not needed - three.js has a built-in uniform named cameraPosition
	//vec3 camPos   = vec3( uCameraMatrix[3][0],  uCameraMatrix[3][1],  uCameraMatrix[3][2]);

	// calculate unique seed for rng() function
	seed = uvec2(uFrameCounter, uFrameCounter + 1.0) * uvec2(gl_FragCoord);
	// initialize rand() variables
	counter = -1.0; // will get incremented by 1 on each call to rand()
	channel = 0; // the final selected color channel to use for rand() calc (range: 0 to 3, corresponds to R,G,B, or A)
	randNumber = 0.0; // the final randomly-generated number (range: 0.0 to 1.0)
	randVec4 = vec4(0); // samples and holds the RGBA blueNoise texture value for this pixel
	randVec4 = texelFetch(tBlueNoiseTexture, ivec2(mod(gl_FragCoord.xy + floor(uRandomVec2 * 256.0), 256.0)), 0);
	
	// rand() produces higher FPS and almost immediate convergence, but may have very slight jagged diagonal edges on higher frequency color patterns, i.e. checkerboards.
	// rng() has a little less FPS on mobile, and a little more noisy initially, but eventually converges on perfect anti-aliased edges - use this if 'beauty-render' is desired.
	vec2 pixelOffset = uFrameCounter < 150.0 ? vec2( tentFilter(rand()), tentFilter(rand()) ) :
					      	   vec2( tentFilter(rng()), tentFilter(rng()) );
	
	// we must map pixelPos into the range -1.0 to +1.0: (-1.0,-1.0) is bottom-left screen corner, (1.0,1.0) is top-right
	vec2 pixelPos = ((gl_FragCoord.xy + pixelOffset) / uResolution) * 2.0 - 1.0;

	vec3 rayDir = uUseOrthographicCamera ? camForward : 
					       normalize( pixelPos.x * camRight * uULen + pixelPos.y * camUp * uVLen + camForward );

	// depth of field
	vec3 focalPoint = uFocusDistance * rayDir;
	float randomAngle = rng() * TWO_PI; // pick random point on aperture
	float randomRadius = rng() * uApertureSize;
	vec3  randomAperturePos = ( cos(randomAngle) * camRight + sin(randomAngle) * camUp ) * sqrt(randomRadius);
	// point on aperture to focal point
	vec3 finalRayDir = normalize(focalPoint - randomAperturePos);

	rayOrigin = uUseOrthographicCamera ? cameraPosition + (camRight * pixelPos.x * uULen * 100.0) + (camUp * pixelPos.y * uVLen * 100.0) + randomAperturePos :
					     cameraPosition + randomAperturePos;
	rayDirection = finalRayDir;
	

	SetupScene();

	// Edge Detection - don't want to blur edges where either surface normals change abruptly (i.e. room wall corners), objects overlap each other (i.e. edge of a foreground sphere in front of another sphere right behind it),
	// or an abrupt color variation on the same smooth surface, even if it has similar surface normals (i.e. checkerboard pattern). Want to keep all of these cases as sharp as possible - no blur filter will be applied.
	vec3 objectNormal = vec3(0);
	vec3 objectColor = vec3(0);
	float objectID = -INFINITY;
	float pixelSharpness = 0.0;

	// perform path tracing and get resulting pixel color
	vec4 currentPixel = vec4( vec3(CalculateRadiance(objectNormal, objectColor, objectID, pixelSharpness)), 0.0 );

	// if difference between normals of neighboring pixels is less than the first edge0 threshold, the white edge line effect is considered off (0.0)
	float edge0 = 0.2; // edge0 is the minimum difference required between normals of neighboring pixels to start becoming a white edge line
	// any difference between normals of neighboring pixels that is between edge0 and edge1 smoothly ramps up the white edge line brightness (smoothstep 0.0-1.0)
	float edge1 = 0.6; // once the difference between normals of neighboring pixels is >= this edge1 threshold, the white edge line is considered fully bright (1.0)
	float difference_Nx = fwidth(objectNormal.x);
	float difference_Ny = fwidth(objectNormal.y);
	float difference_Nz = fwidth(objectNormal.z);
	float normalDifference = smoothstep(edge0, edge1, difference_Nx) + smoothstep(edge0, edge1, difference_Ny) + smoothstep(edge0, edge1, difference_Nz);

	float objectDifference = min(fwidth(objectID), 1.0);

	float colorDifference = (fwidth(objectColor.r) + fwidth(objectColor.g) + fwidth(objectColor.b)) > 0.0 ? 1.0 : 0.0;
	// white-line debug visualization for normal difference
	//currentPixel.rgb += (rng() * 1.5) * vec3(normalDifference);
	// white-line debug visualization for object difference
	//currentPixel.rgb += (rng() * 1.5) * vec3(objectDifference);
	// white-line debug visualization for color difference
	//currentPixel.rgb += (rng() * 1.5) * vec3(colorDifference);
	// white-line debug visualization for all 3 differences
	//currentPixel.rgb += (rng() * 1.5) * vec3( clamp(max(normalDifference, max(objectDifference, colorDifference)), 0.0, 1.0) );

	vec4 previousPixel = texelFetch(tPreviousTexture, ivec2(gl_FragCoord.xy), 0);

	
	if (uFrameCounter == 1.0) // camera just moved after being still
	{
		previousPixel.rgb *= (1.0 / uPreviousSampleCount) * 0.5; // essentially previousPixel *= 0.5, like below
		previousPixel.a = 0.0;
		currentPixel.rgb *= 0.5;
	}
	else if (uCameraIsMoving) // camera is currently moving
	{
		previousPixel.rgb *= 0.5; // motion-blur trail amount (old image)
		previousPixel.a = 0.0;
		currentPixel.rgb *= 0.5; // brightness of new image (noisy)
	}

	// if current raytraced pixel didn't return any color value, just use the previous frame's pixel color
	if (currentPixel.rgb == vec3(0.0))
	{
		currentPixel.rgb = previousPixel.rgb;
		previousPixel.rgb *= 0.5;
		currentPixel.rgb *= 0.5;
	}


	if (colorDifference >= 1.0 || normalDifference >= 1.0 || objectDifference >= 1.0)
		pixelSharpness = 1.01;


	currentPixel.a = pixelSharpness;

	// Eventually, all edge-containing pixels' .a (alpha channel) values will converge to 1.01, which keeps them from getting blurred by the box-blur filter, thus retaining sharpness.
	if (previousPixel.a == 1.01)
		currentPixel.a = 1.01;

	pc_fragColor = vec4(previousPixel.rgb + currentPixel.rgb, currentPixel.a);
}
`;let Il,eg=1,hs=!1,Ii=0,Kr=1,Jn=!1,ps=!1,kn;const Qr=new lm,tg=new xc;async function ng(s,e,t){kn=await tg.load("../textures/BlueNoise_RGBA256.png"),kn.wrapS=ci,kn.wrapT=ci,kn.flipY=!1,kn.minFilter=qe,kn.magFilter=qe,kn.generateMipmaps=!1;const n=.001,i=0,o=100;let l=1,u=.05,d=2e-4,f=!0,h=!1;const p=new ha({canvas:s,context:s.getContext("webgl2")});p.debug.checkShaderErrors=!0,p.autoClear=!1,p.toneMapping=Cs;const m=p.getContext();m.getExtension("EXT_color_buffer_float"),m.getExtension("EXT_float_blend");const y=new bc,M=new or,_=new or,x=new or,T=new or;T.add(t);const E=new da(-1,1,1,-1,0,1);_.add(E),x.add(E),M.add(t);const w=new Bt(m.drawingBufferWidth,m.drawingBufferHeight,{minFilter:qe,magFilter:qe,format:Dt,type:jt,depthBuffer:!1,stencilBuffer:!1});w.texture.generateMipmaps=!1;const S=new Bt(m.drawingBufferWidth,m.drawingBufferHeight,{minFilter:qe,magFilter:qe,format:Dt,type:jt,depthBuffer:!1,stencilBuffer:!1});S.texture.generateMipmaps=!1;const C=new Bt(m.drawingBufferWidth,m.drawingBufferHeight,{minFilter:qe,magFilter:qe,format:Dt,type:jt,depthBuffer:!1,stencilBuffer:!1});C.texture.generateMipmaps=!1;const D={};e.pathTracingUniforms=D,await e.Build(D);const O=new li(2,2);D.tPreviousTexture={type:"t",value:S.texture},D.tBlueNoiseTexture={type:"t",value:kn},D.uCameraMatrix={type:"m4",value:new lt},D.uResolution={type:"v2",value:new Ne},D.uRandomVec2={type:"v2",value:new Ne},D.uEPS_intersect={type:"f",value:n},D.uTime={type:"f",value:0},D.uSampleCounter={type:"f",value:0},D.uPreviousSampleCount={type:"f",value:1},D.uFrameCounter={type:"f",value:1},D.uULen={type:"f",value:1},D.uVLen={type:"f",value:1},D.uApertureSize={type:"f",value:i},D.uFocusDistance={type:"f",value:o},D.uCameraIsMoving={type:"b1",value:!1},D.uUseOrthographicCamera={type:"b1",value:!1};const A={};let P;var z=null;Qr.load("shaders/common_PathTracing_Vertex.glsl",function(J){P=J,Qr.load("shaders/MainShader.glsl",function(ne){const W=ne,ce=new Lt({uniforms:D,defines:A,vertexShader:P,fragmentShader:W,depthTest:!1,depthWrite:!1});z=new Pt(O,ce),M.add(z)})});const j=new li(2,2),K={tPathTracedImageTexture:{type:"t",value:w.texture}};Qr.load("shaders/ScreenCopy_Fragment.glsl",function(J){const ne=J,W=new Lt({uniforms:K,vertexShader:P,fragmentShader:ne,depthWrite:!1,depthTest:!1}),ce=new Pt(j,W);_.add(ce)});const G=new li(2,2),k={tPathTracedImageTexture:{type:"t",value:w.texture},tAlphaTexture:{type:"t",value:C.texture},uSampleCounter:{type:"f",value:0},uOneOverSampleCounter:{type:"f",value:0},uPixelEdgeSharpness:{type:"f",value:l},uEdgeSharpenSpeed:{type:"f",value:u},uFilterDecaySpeed:{type:"f",value:d},uSceneIsDynamic:{type:"b1",value:h},uUseToneMapping:{type:"b1",value:f}};Qr.load("shaders/ScreenOutput_Fragment.glsl",function(J){const ne=J,W=new Lt({uniforms:k,vertexShader:P,fragmentShader:ne,depthWrite:!1,depthTest:!1}),ce=new Pt(G,W);x.add(ce)}),V(),p.toneMappingExposure=1;var F=Math.PI/2.5,$=new q;$.set(Math.cos(F)*1.2,Math.sin(F),-Math.cos(F)*3),$.normalize(),D.uSunDirection.value.copy($),D.uSunLightIntensity.value=2;var B=[1,.98,.92];D.uSunColor.value.setRGB(B[0],B[1],B[2]);function Y(){var J=y.getElapsedTime()%1e3;if(hs&&(Jn=!0,hs=!1),Jn||(Ii+=1,Kr+=1,ps=!1),Jn&&(Kr+=1,ps||(D.uPreviousSampleCount.value=Ii,Kr=1,ps=!0),Ii=1,p.setRenderTarget(w),p.clear(),p.setRenderTarget(S),p.clear(),p.setRenderTarget(null),p.clear()),D.uTime.value=J,D.uCameraIsMoving.value=Jn,D.uSampleCounter.value=Ii,D.uFrameCounter.value=Kr,D.uRandomVec2.value.set(Math.random(),Math.random()),t.updateMatrixWorld(!0),D.uCameraMatrix.value.copy(t.matrixWorld),k.uSampleCounter.value=Ii,k.uOneOverSampleCounter.value=1/Ii,e.AlphaGeometry!=null)for(var ne of e.AlphaGeometry){var W=ne,ce=new ua({color:16777215}),le=new Pt(W,ce);T.add(le)}p.toneMapping=Yl,p.autoClear=!0,p.setRenderTarget(C),p.render(T,t),p.autoClear=!1,p.toneMapping=Cs,p.setRenderTarget(w),p.render(M,t),p.setRenderTarget(S),p.render(_,E),p.setRenderTarget(null),p.render(x,E),Jn=!1}function V(){hs=!0;var J=s.clientWidth,ne=s.clientHeight;p.setPixelRatio(eg),p.setSize(J,ne),D.uResolution.value.x=m.drawingBufferWidth,D.uResolution.value.y=m.drawingBufferHeight,w.setSize(m.drawingBufferWidth,m.drawingBufferHeight),S.setSize(m.drawingBufferWidth,m.drawingBufferHeight),C.setSize(m.drawingBufferWidth,m.drawingBufferHeight),t.aspect=J/ne,Il=t.fov*.5*(Math.PI/180),D.uVLen.value=Math.tan(Il),D.uULen.value=D.uVLen.value*t.aspect}window.addEventListener("resize",V,!1),window.addEventListener("orientationchange",V,!1);function U(){Jn=!0}function ee(){p.setRenderTarget(null)}function X(){M.add(t),Jn=!0}return{render:Y,setMovingCamera:U,addCamera:X,removeCamera:ee}}async function ig(s,e){const t=await new xc().load("../textures/background.png"),n=await Zm(t),i=await ng(s,n,e.camera),o=[];var l=!1;function u(p){o.push(p)}function d(){l=!0,h()}function f(){l=!1}function h(){l&&(n.add(o.map(p=>p()).filter(p=>p)),n.Build().then(()=>setTimeout(()=>i.setMovingCamera(),0)))}return{add:u,enable:d,disable:f,build:h,render:i.render,setMovingCamera:i.setMovingCamera}}async function rg(s,e,t){const n=gm(s);Z.orbit=n;const i=wm(e,n),o=await ig(t,n);n.addCallback(o.setMovingCamera);var l="raster";Z.setTarget=A=>{l=A,l=="raster"?(e.style.display="block",t.style.display="none",o.disable()):(e.style.display="none",t.style.display="block",o.enable())},i.add(n.camera),i.add(vm(10)),Tm().map(A=>i.add(A)),Xm(Z).map(A=>i.add(A));const u=Al();u.addCallback(o.build),Z.voxel=u,i.add(u.mesh),i.add(u.wireframeMesh),o.add(()=>({geometry:u.geometry,albedo:u.material.map}));const d=Al(2);d.addCallback(o.build),i.add(d.mesh),i.add(d.wireframeMesh),o.add(()=>({geometry:d.geometry,albedo:d.material.map}));let f=null,h=null,p=null,m=null,y=null,M=null;var _=[],x=0;function T(){_=_.slice(0,x),_.push(JSON.parse(JSON.stringify(u.getVoxels()))),_.length>100?_.shift():x++}Z.pushHistory=T;function E(){x<=1||(x--,u.clear(),u.add(JSON.parse(JSON.stringify(_[x-1]))))}function w(){x>=_.length||(x++,u.clear(),u.add(JSON.parse(JSON.stringify(_[x-1]))))}document.addEventListener("keydown",A=>{A.key=="z"&&A.ctrlKey?E():A.key=="y"&&A.ctrlKey&&w()}),T();function S(A,{point:P,origin:z,axis:j,normal_direction:K}){if(A.button==1){Z.foreground=u.getColor(z),Z.foreground.a=1,Z.colorDisplay.$update();return}if(f=="box-add-extrude"){u.add(d.getVoxels()),d.clear(),f=null,u.show(),T();return}else if(f=="box-remove-extrude"){u.replace(d.chunks,!0),d.clear(),f=null,u.show(),T();return}else if(f=="box-paint-foreground-extrude"){u.replace(d.chunks,!0),d.clear(),f=null,u.show(),T();return}else if(f=="box-paint-background-extrude"){u.replace(d.chunks,!0),d.clear(),f=null,u.show(),T();return}if(Z.mode=="Paint")d.replace(u.chunks,!0),u.hide(),A.button==0?Z.tool=="Box"?(z!=null&&(d.setColor([z],Z.foreground),m=z),f="box-paint-foreground",p=j):(z!=null&&d.setColor(un(z,Z.brushSize,j),Z.foreground),f="foreground"):A.button==2&&(Z.tool=="Box"?(z!=null&&(d.setColor([z],Z.background),m=z),f="box-paint-background",p=j):(z!=null&&d.setColor(un(z,Z.brushSize,j),Z.background),f="background")),h=z!=null?z:P;else{if(Z.tool=="Extrude"){if(z==null)return;h=z,p=j,y=K,M=Ym(z,j,K),d.replace(u.chunks),u.hide(),f="extrude";return}if(Z.tool=="Move"){if(z==null)return;h=z,p=j,y=K,d.replace(u.chunks),u.hide(),f="move";return}if(A.button==0)if(h=P,Z.tool=="Box")f="box-add",m=P,p=j,d.add([P],!0);else{var G=un(P,Z.brushSize,j);d.add(G,!0),f="add"}else if(A.button==2){const k=z!=null?z:P;d.replace(u.chunks),u.hide(),Z.tool=="Box"?(f="box-remove",m=k,p=j,d.remove([k],!0)):(d.remove(un(k,Z.brushSize,j)),f="remove"),h=k}}}function C(A,{point:P,origin:z,axis:j,normal_direction:K,raycaster:G}){if(f=="move"){for(var F=Ri(G,p,n.camera,h),k=u.getVoxels().map(W=>({...W})),F=Math.floor(F[p])-(y<0?-1:0),$=0;$<k.length;$++)k[$].layer==Z.selected_layer.id&&(k[$][p]=k[$][p]-h[p]+F);d.clear(),d.add(k,null,!0)}else if(f=="extrude"){var F=Ri(G,p,n.camera,h),B=h[p]-(y<0?0:-1),Y=Math.floor(F[p])-(y<0?0:-1),V=y<0;if(B>Y){var U=B;B=Y,Y=U,V=y>0}for(var ee=[],$=B;$<Y;$++)for(var X=0;X<M.length;X++){var J={...M[X]};J[p]=$,ee.push({x:J.x,y:J.y,z:J.z})}V?(d.clear(),d.replace(u.chunks),d.remove(ee)):(d.clear(),d.replace(u.chunks),d.add(ee,!0))}if(f=="add")Z.tool=="Pen"?(d.add(Li(h,P).map(W=>un(W,Z.brushSize,j)).flat(),!0),h=P):Z.tool=="Line"?(d.clear(),d.add([h,...Li(h,P).map(W=>un(W,Z.brushSize,j)).flat()],!0)):Z.tool=="Plane"&&(d.clear(),d.add(an(h,P),!0));else if(f=="remove"){if(Z.tool=="Pen"){const W=z!=null?z:P;d.remove(Li(h,W).map(ce=>un(ce,Z.brushSize,j)).flat()),h=W}else if(Z.tool=="Line"){const W=z!=null?z:P;d.replace(u.chunks),d.remove([h,...Li(h,W).map(ce=>un(ce,Z.brushSize,j)).flat()])}else if(Z.tool=="Plane"){const W=z!=null?z:P;d.replace(u.chunks),d.remove(an(h,W))}}else if(f=="box-add")m=P,d.clear(),d.add(an(h,P),!0);else if(f=="box-add-extrude"){d.clear();var F=Ri(G,p,n.camera,m),J={...m};J[p]=Math.floor(F[p]),d.add(an(h,J),!0)}else if(f=="box-remove")m=P!=null?P:z,d.replace(u.chunks),d.remove(an(h,P));else if(f=="box-remove-extrude"){d.replace(u.chunks);var F=Ri(G,p,n.camera,m),J={...m};J[p]=Math.floor(F[p]),d.remove(an(h,J),!0)}else if(f=="box-paint-foreground")m=P!=null?P:z,d.replace(u.chunks),d.setColor(an(h,P),Z.foreground);else if(f=="box-paint-foreground-extrude"){d.replace(u.chunks);var F=Ri(G,p,n.camera,m),J={...m};J[p]=Math.floor(F[p]),d.setColor(an(h,J),Z.foreground)}else if(f=="box-paint-background")m=P!=null?P:z,d.replace(u.chunks),d.setColor(an(h,P),Z.background);else if(f=="box-paint-background-extrude"){d.replace(u.chunks);var F=Ri(G,p,n.camera,m),J={...m};J[p]=Math.floor(F[p]),d.setColor(an(h,J),Z.background)}else f=="foreground"?ne(Z.foreground):f=="background"&&ne(Z.background);function ne(W){if(Z.tool=="Pen"){if(z==null)return;d.setColor(Li(h,z).map(ce=>un(ce,Z.brushSize,j)).flat(),W),h=z}else if(Z.tool=="Line"){const ce=z!=null?z:P;d.replace(u.chunks),d.setColor([h,...Li(h,ce)].map(le=>un(le,Z.brushSize,j)).flat(),W)}else if(Z.tool=="Plane"){const ce=z!=null?z:P;d.replace(u.chunks),d.setColor(an(h,ce),W)}}}function D(A){if(f=="add"?(u.add(d.getVoxels()),d.clear()):(f=="remove"||f=="background"||f=="foreground"||f=="extrude"||f=="move")&&(u.replace(d.chunks,!0),d.clear(),u.show(),u.clearPaintIteration()),f=="box-add"){f="box-add-extrude";return}if(f=="box-remove"){f="box-remove-extrude";return}if(f=="box-paint-foreground"){f="box-paint-foreground-extrude",u.clearPaintIteration();return}if(f=="box-paint-background"){f="box-paint-background-extrude",u.clearPaintIteration();return}u.show(),f!=null&&T(),f=null}Om(n,s,[u.mesh],S,C,D);function O(){l=="raster"?(i.render(),Z.saveRequest&&(Z.saveRequest(e.toDataURL("image/png")),Z.saveRequest=null)):l=="raytrace"&&(o.render(),Z.saveRequest&&(Z.saveRequest(t.toDataURL("image/png")),Z.saveRequest=null))}return{draw:O}}function ag(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,s=>(s^crypto.getRandomValues(new Uint8Array(1))[0]&15>>s/4).toString(16))}function sg(){const s=Ge();Z.add_layer=n,Z.clearLayer=e;function e(){s.innerHTML="",Z.layers={},Z.selected_layer=null}function t(){var o=0;for(var{text:l}of Object.values(Z.layers)){var u=l.match(/New layer (\d+)/);if(u){var d=parseInt(u[1]);d>o&&(o=d)}}return`New layer ${o+1}`}function n(o=null,l=null){var u=Gs({deselect:h,select:y,isVisible:_,isSelected:x,text:l||t(),id:o||ag()}),d=!0,f=!1;function h(){f=!1,T.$update()}function p(E){E.stopPropagation(),Z.voxel.clear_layer(u),T.$remove(),delete Z.layers[u.id],Object.values(Z.layers).length<1&&n(),f&&Object.values(Z.layers)[0].select()}function m(E){E&&E.stopPropagation(),d?(d=!1,T.$update()):(d=!0,T.$update()),Z.voxel.forceUpdate()}function y(E){E&&E.stopPropagation();for(var{deselect:w}of Object.values(Z.layers))w();f=!0,Z.selected_layer=u,Z.voxel.forceUpdate(),T.$update()}for(var{text:l}of Object.values(Z.layers)){var M=l.match(/New layer (\d+)/);M&&parseInt(M[1])}function _(){return d}function x(){return f}Z.layers[u.id]=u;const T=Q("div",{class:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`layer ${f?"layer-selected":""}`,elements:[typeof f<"u"?f:void 0]},"on:click":y},Q("i",{class:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>`fa-solid icon ${d?"fa-eye":"fa-eye-slash"}`,elements:[typeof d<"u"?d:void 0]},"on:click":m}),Q("i",{class:"fa-solid fa-trash icon","on:click":p}),Q("input",{type:"text",class:"layer-input",model:[{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>u.text,elements:[typeof u<"u"?u:void 0,typeof l<"u"?l:void 0]},E=>u.text=E]}));T.$parent(s),y()}var i=Q("div",null,Q("div",{class:"row"},Q("button",{class:"button","on:click":()=>n()},"Add")),Q("div",{class:"col layer-container",ref:s}));return setTimeout(()=>{n()},0),i}function wc(s,e){const t=Ge(),n=Gs({filename:"New project"});var i=localStorage.getItem("filename");i&&(n.filename=i);const o=Q("div",{class:"modal-small"},Q("div",{class:"row"},Q("div",{class:"input-group flex"},Q("label",null,"File name"),Q("input",{type:"text",class:"input",model:[{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>n.filename,elements:[typeof n<"u"?n:void 0,typeof filename<"u"?filename:void 0]},u=>n.filename=u]}))),Q("button",{class:"button corner",ref:t},"Save")),{close:l}=sa(o);t.$on("click",()=>{e(n.filename),localStorage.setItem("filename",n.filename),l()})}function Tc(s,e){wc(s,t=>{var n=document.createElement("a");n.href="data:application/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e())),n.download=t+"."+s,n.click()})}function Ec(s,e){var t=document.createElement("input");t.type="file",t.accept="."+s,t.onchange=function(){var n=new FileReader;n.onload=function(){var i=JSON.parse(n.result);e(i)},n.readAsText(t.files[0])},t.click()}function og(s,e){const t=Q("div",{class:"modal-confirm"},Q("p",{style:"margin:20px 0;text-align:center"},{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>s,elements:[typeof s<"u"?s:void 0]}),Q("div",{class:"corner"},Q("button",{"on:click":o,class:"button"},"Yes"),Q("button",{"on:click":i,class:"button"},"No"))),{close:n}=sa(t);function i(){n()}function o(){n(),e()}}function lg(){return{voxels:Z.voxel.getVoxels(),layers:Object.values(Z.layers).map(s=>({id:s.id,text:s.text}))}}function cg(s){Z.voxel.clear(),Z.clearLayer();for(const{id:e,text:t}of s.layers)Z.add_layer(e,t);Z.voxel.add(s.voxels),Z.pushHistory()}var ug=`
vn -0.000000 0.000000 1.000000
vn 0.000000 0.000000 -1.000000
vn 0.000000 1.000000 0.000000
vn 0.000000 -1.000000 0.000000
vn 1.000000 0.000000 0.000000
vn -1.000000 -0.000000 -0.000000
`;function dg({vert:s,index:e,normal:t,uv_position:n,uv_index:i,uv_color:o,width:l,height:u}){for(var d="",f=0;f<s.length;f++)d+=`v ${s[f][0]} ${s[f][1]} ${s[f][2]}
`;d+=`
`;for(var f=0;f<n.length;f++)d+=`vt ${n[f][0]} ${n[f][1]}
`;d+=`
`,d+=ug,d+=`
`;for(var f=0;f<e.length;f++)d+=`f ${e[f][0]}/${i[f][0]}/${t[f]} ${e[f][1]}/${i[f][1]}/${t[f]} ${e[f][2]}/${i[f][2]}/${t[f]}
`;return d}function fg({uv_color:s,width:e,height:t},n=32){var i=document.createElement("canvas");i.width=e*n,i.height=t*n;var o=i.getContext("2d");for(var l of s){var[u,d]=l.position,[f,h,p]=l.color;o.fillStyle=`rgb(${f},${h},${p})`,o.fillRect(u*n,d*n,n,n)}var m=i.toDataURL("image/png");return i.remove(),m}function hg({uv_color:s,width:e,height:t}){var n=document.createElement("canvas");n.width=e,n.height=t;for(var i=n.getContext("2d"),o=i.createImageData(e,t),l=0;l<o.width;l++)for(var u=0;u<o.height;u++){var d=(l+u*o.width)*4;o.data[d]=255,o.data[d+1]=1,o.data[d+2]=1,o.data[d+3]=1}for(var f of s){var[l,u]=f.position,[h,p,m]=f.color,d=(l+u*e)*4;o.data[d+0]=h,o.data[d+1]=p,o.data[d+2]=m,o.data[d+3]=255}i.putImageData(o,0,0);var y=n.toDataURL("image/png");return n.remove(),y}var Qs={exports:{}};Qs.exports=ma;Qs.exports.default=ma;function ma(s,e,t){t=t||2;var n=e&&e.length,i=n?e[0]*t:s.length,o=Ac(s,0,i,t,!0),l=[];if(!o||o.next===o.prev)return l;var u,d,f,h,p,m,y;if(n&&(o=_g(s,e,o,t)),s.length>80*t){u=f=s[0],d=h=s[1];for(var M=t;M<i;M+=t)p=s[M],m=s[M+1],p<u&&(u=p),m<d&&(d=m),p>f&&(f=p),m>h&&(h=m);y=Math.max(f-u,h-d),y=y!==0?32767/y:0}return pr(o,l,t,u,d,y,0),l}function Ac(s,e,t,n,i){var o,l;if(i===Us(s,e,t,n)>0)for(o=e;o<t;o+=n)l=zl(o,s[o],s[o+1],l);else for(o=t-n;o>=e;o-=n)l=zl(o,s[o],s[o+1],l);return l&&ga(l,l.next)&&(gr(l),l=l.next),l}function hi(s,e){if(!s)return s;e||(e=s);var t=s,n;do if(n=!1,!t.steiner&&(ga(t,t.next)||ot(t.prev,t,t.next)===0)){if(gr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function pr(s,e,t,n,i,o,l){if(!!s){!l&&o&&Sg(s,n,i,o);for(var u=s,d,f;s.prev!==s.next;){if(d=s.prev,f=s.next,o?mg(s,n,i,o):pg(s)){e.push(d.i/t|0),e.push(s.i/t|0),e.push(f.i/t|0),gr(s),s=f.next,u=f.next;continue}if(s=f,s===u){l?l===1?(s=gg(hi(s),e,t),pr(s,e,t,n,i,o,2)):l===2&&vg(s,e,t,n,i,o):pr(hi(s),e,t,n,i,o,1);break}}}}function pg(s){var e=s.prev,t=s,n=s.next;if(ot(e,t,n)>=0)return!1;for(var i=e.x,o=t.x,l=n.x,u=e.y,d=t.y,f=n.y,h=i<o?i<l?i:l:o<l?o:l,p=u<d?u<f?u:f:d<f?d:f,m=i>o?i>l?i:l:o>l?o:l,y=u>d?u>f?u:f:d>f?d:f,M=n.next;M!==e;){if(M.x>=h&&M.x<=m&&M.y>=p&&M.y<=y&&Oi(i,u,o,d,l,f,M.x,M.y)&&ot(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function mg(s,e,t,n){var i=s.prev,o=s,l=s.next;if(ot(i,o,l)>=0)return!1;for(var u=i.x,d=o.x,f=l.x,h=i.y,p=o.y,m=l.y,y=u<d?u<f?u:f:d<f?d:f,M=h<p?h<m?h:m:p<m?p:m,_=u>d?u>f?u:f:d>f?d:f,x=h>p?h>m?h:m:p>m?p:m,T=Os(y,M,e,t,n),E=Os(_,x,e,t,n),w=s.prevZ,S=s.nextZ;w&&w.z>=T&&S&&S.z<=E;){if(w.x>=y&&w.x<=_&&w.y>=M&&w.y<=x&&w!==i&&w!==l&&Oi(u,h,d,p,f,m,w.x,w.y)&&ot(w.prev,w,w.next)>=0||(w=w.prevZ,S.x>=y&&S.x<=_&&S.y>=M&&S.y<=x&&S!==i&&S!==l&&Oi(u,h,d,p,f,m,S.x,S.y)&&ot(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;w&&w.z>=T;){if(w.x>=y&&w.x<=_&&w.y>=M&&w.y<=x&&w!==i&&w!==l&&Oi(u,h,d,p,f,m,w.x,w.y)&&ot(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;S&&S.z<=E;){if(S.x>=y&&S.x<=_&&S.y>=M&&S.y<=x&&S!==i&&S!==l&&Oi(u,h,d,p,f,m,S.x,S.y)&&ot(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function gg(s,e,t){var n=s;do{var i=n.prev,o=n.next.next;!ga(i,o)&&Cc(i,n,n.next,o)&&mr(i,o)&&mr(o,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(o.i/t|0),gr(n),gr(n.next),n=s=o),n=n.next}while(n!==s);return hi(n)}function vg(s,e,t,n,i,o){var l=s;do{for(var u=l.next.next;u!==l.prev;){if(l.i!==u.i&&Eg(l,u)){var d=Dc(l,u);l=hi(l,l.next),d=hi(d,d.next),pr(l,e,t,n,i,o,0),pr(d,e,t,n,i,o,0);return}u=u.next}l=l.next}while(l!==s)}function _g(s,e,t,n){var i=[],o,l,u,d,f;for(o=0,l=e.length;o<l;o++)u=e[o]*n,d=o<l-1?e[o+1]*n:s.length,f=Ac(s,u,d,n,!1),f===f.next&&(f.steiner=!0),i.push(Tg(f));for(i.sort(xg),o=0;o<i.length;o++)t=yg(i[o],t);return t}function xg(s,e){return s.x-e.x}function yg(s,e){var t=bg(s,e);if(!t)return e;var n=Dc(t,s);return hi(n,n.next),hi(t,t.next)}function bg(s,e){var t=e,n=s.x,i=s.y,o=-1/0,l;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>o&&(o=u,l=t.x<t.next.x?t:t.next,u===n))return l}t=t.next}while(t!==e);if(!l)return null;var d=l,f=l.x,h=l.y,p=1/0,m;t=l;do n>=t.x&&t.x>=f&&n!==t.x&&Oi(i<h?n:o,i,f,h,i<h?o:n,i,t.x,t.y)&&(m=Math.abs(i-t.y)/(n-t.x),mr(t,s)&&(m<p||m===p&&(t.x>l.x||t.x===l.x&&Mg(l,t)))&&(l=t,p=m)),t=t.next;while(t!==d);return l}function Mg(s,e){return ot(s.prev,s,e.prev)<0&&ot(e.next,s,s.next)<0}function Sg(s,e,t,n){var i=s;do i.z===0&&(i.z=Os(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,wg(i)}function wg(s){var e,t,n,i,o,l,u,d,f=1;do{for(t=s,s=null,o=null,l=0;t;){for(l++,n=t,u=0,e=0;e<f&&(u++,n=n.nextZ,!!n);e++);for(d=f;u>0||d>0&&n;)u!==0&&(d===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,u--):(i=n,n=n.nextZ,d--),o?o.nextZ=i:s=i,i.prevZ=o,o=i;t=n}o.nextZ=null,f*=2}while(l>1);return s}function Os(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Tg(s){var e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Oi(s,e,t,n,i,o,l,u){return(i-l)*(e-u)>=(s-l)*(o-u)&&(s-l)*(n-u)>=(t-l)*(e-u)&&(t-l)*(o-u)>=(i-l)*(n-u)}function Eg(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Ag(s,e)&&(mr(s,e)&&mr(e,s)&&Cg(s,e)&&(ot(s.prev,s,e.prev)||ot(s,e.prev,e))||ga(s,e)&&ot(s.prev,s,s.next)>0&&ot(e.prev,e,e.next)>0)}function ot(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function ga(s,e){return s.x===e.x&&s.y===e.y}function Cc(s,e,t,n){var i=ea(ot(s,e,t)),o=ea(ot(s,e,n)),l=ea(ot(t,n,s)),u=ea(ot(t,n,e));return!!(i!==o&&l!==u||i===0&&Jr(s,t,e)||o===0&&Jr(s,n,e)||l===0&&Jr(t,s,n)||u===0&&Jr(t,e,n))}function Jr(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ea(s){return s>0?1:s<0?-1:0}function Ag(s,e){var t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Cc(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function mr(s,e){return ot(s.prev,s,s.next)<0?ot(s,e,s.next)>=0&&ot(s,s.prev,e)>=0:ot(s,e,s.prev)<0||ot(s,s.next,e)<0}function Cg(s,e){var t=s,n=!1,i=(s.x+e.x)/2,o=(s.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&i<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Dc(s,e){var t=new ks(s.i,s.x,s.y),n=new ks(e.i,e.x,e.y),i=s.next,o=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function zl(s,e,t,n){var i=new ks(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function gr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ks(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}ma.deviation=function(s,e,t,n){var i=e&&e.length,o=i?e[0]*t:s.length,l=Math.abs(Us(s,0,o,t));if(i)for(var u=0,d=e.length;u<d;u++){var f=e[u]*t,h=u<d-1?e[u+1]*t:s.length;l-=Math.abs(Us(s,f,h,t))}var p=0;for(u=0;u<n.length;u+=3){var m=n[u]*t,y=n[u+1]*t,M=n[u+2]*t;p+=Math.abs((s[m]-s[M])*(s[y+1]-s[m+1])-(s[m]-s[y])*(s[M+1]-s[m+1]))}return l===0&&p===0?0:Math.abs((p-l)/l)};function Us(s,e,t,n){for(var i=0,o=e,l=t-n;o<t;o+=n)i+=(s[l]-s[o])*(s[o+1]+s[l+1]),l=o;return i}ma.flatten=function(s){for(var e=s[0][0].length,t={vertices:[],holes:[],dimensions:e},n=0,i=0;i<s.length;i++){for(var o=0;o<s[i].length;o++)for(var l=0;l<e;l++)t.vertices.push(s[i][o][l]);i>0&&(n+=s[i-1].length,t.holes.push(n))}return t};function Dg(s){const[e]=Nl(s),t=Lg(s,e),[n]=Nl(t),i=Rg(t,n,e),o=Ig(i,t,e),[l,u]=zg(o,t);return Ng(o,t,l,u)}function Pg(s,e){for(var t={},n=[],i=1,o=0;o<e.length;o++){var l=e[o].join(",");t[l]==null&&(t[l]=i,n.push(e[o]),i++)}for(var u of s)for(var d in u)u[d]=t[e[u[d]].join(",")];return[n,s]}function Bs(s){return s.join(",")}function Nl(s){for(var e={},t=0;t<s.length;t++){var n=Bs(s[t]);e[n]=t}function i(...o){var l=Bs(o);return e[l]}return[i]}function Lg(s,e){for(var t=Array(s.length).fill(0).map(()=>Array(4).fill(1)),n=s[0][0],i=s[0][1],o=0;o<s.length;o++){s[o][0]<n&&(n=s[o][0]),s[o][1]<i&&(i=s[o][1]);var l=e(s[o][0]+1,s[o][1]),u=e(s[o][0],s[o][1]+1),d=e(s[o][0]-1,s[o][1]),f=e(s[o][0],s[o][1]-1);l!=null&&(t[o][1]=0,t[o][2]=0,t[l][0]=0,t[l][3]=0),u!=null&&(t[u][0]=0,t[u][1]=0,t[o][2]=0,t[o][3]=0),d!=null&&(t[d][1]=0,t[d][2]=0,t[o][0]=0,t[o][3]=0),f!=null&&(t[o][0]=0,t[o][1]=0,t[f][2]=0,t[f][3]=0)}var h={};for(var p in s)for(var m=s[p][0],y=s[p][1],o=0;o<4;o++){var M=m,_=y;o==1&&(M+=1),o==2&&(M+=1,_+=1),o==3&&(_+=1);var x=M+","+_;h[x]==null?h[x]={number:1,index:p,face_index:o}:h[x].number+=1}for(const[S,C]of Object.entries(h))C.number==3&&(t[C.index][C.face_index]=1);var T=[];for(var p in t){var m=s[p][0],y=s[p][1];for(var E in t[p])t[p][E]==1&&(E==0&&T.push([m,y]),E==1&&T.push([m+1,y]),E==2&&T.push([m+1,y+1]),E==3&&T.push([m,y+1]))}function w(S){for(var C=new Set,D=0;D<S.length;D++){var O=S[D].join(",");C.add(O)}return Array.from(C)}return w(T).map(S=>S.split(",").map(C=>parseInt(C)))}function Rg(s,e,t){var n=s[0][0],i=s[0][1],o=s[0][0],l=s[0][1];for(var u in s)s[u][0]<n&&(n=s[u][0]),s[u][1]<i&&(i=s[u][1]),s[u][0]>o&&(o=s[u][0]),s[u][1]>l&&(l=s[u][1]);function d(m,y,M){var _=m,x=void 0;if(y=="x")if(M=="forward")do{_=[_[0]+1,_[1]];var x=e(_)}while(x==null&&_[0]<o);else do{_=[_[0]-1,_[1]];var x=e(_)}while(x==null&&_[0]>n);else if(M=="forward")do{_=[_[0],_[1]+1];var x=e(_)}while(x==null&&_[1]<l);else do{_=[_[0],_[1]-1];var x=e(_)}while(x==null&&_[1]>i);return x}var f=new Set;function h(m,y,M){var _=m,x=d(s[m],M,y);if(x!=null){if(_>x)var T=[x,_];else var T=[_,x];var E=s[T[0]],w=s[T[1]];p(E,w,M)&&f.add(Bs(T))}}function p(m,y,M){if(M=="x"){var _=m[1],x,T;if(m[0]>y[0]?(x=y[0],T=m[0]):(x=m[0],T=y[0]),t([x,_-1])==null){for(var E=x;E<T;E++)if(t([E,_-1])!=null||t([E,_])==null)return!1}else for(var E=x;E<T;E++)if(t([E,_-1])==null||t([E,_])!=null)return!1}else{var E=m[0],w,S;if(m[1]>y[1]?(w=y[1],S=m[1]):(w=m[1],S=y[1]),t([E-1,w])==null){for(var _=w;_<S;_++)if(t([E-1,_])!=null||t([E,_])==null)return!1}else for(var _=w;_<S;_++)if(t([E-1,_])==null||t([E,_])!=null)return!1}return!0}for(var u in s)h(u,"forward","x"),h(u,"forward","y"),h(u,"backward","x"),h(u,"backward","y");return Array.from(f).map(m=>m.split(",").map(y=>parseInt(y)))}function Ig(s,e,t){for(var n=new Array(e.length).fill(0).map(P=>[]),i=0;i<s.length;i++)n[s[i][0]].push(s[i][1]),n[s[i][1]].push(s[i][0]);function o(P,z){if(P[0]>z[0])var j=z,K=P;else var j=P,K=z;if(j[0]==K[0]||j[1]==K[1])return!1;if(K[1]>j[1])var G=j[0],k=K[0]-1,F=j[1],$=K[1]-1;else var G=j[0],k=K[0]-1,F=K[1],$=j[1]-1;for(var P=G;P<=k;P++){for(var B=!0,z=F;z<=$;z++)if(t([P,z])==null){B=!1;break}if(B)return!0}for(var z=F;z<=$;z++){for(var B=!0,P=G;P<=k;P++)if(t([P,z])==null){B=!1;break}if(B)return!0}return!1}var l=new Array(n.length).fill(0).map(P=>[]);for(var u in n){var d=n[u];if(d.length<=2){l[u]=[d];continue}for(var f=[],i=0;i<d.length;i++)for(var h=d[i],p=e[h],m=i+1;m<d.length;m++){var y=d[m];if(!(h==null||y==null)){var M=e[y];if(o(p,M)){var _=[h,y];f.push(_)}}}l[u]=f}function x(P,z){return l[P].findIndex(j=>j.includes(z))}var T=[],E=new Set,w=new Set;for(var u in l)for(var S in l[u]){let z=function(j){for(const k in l[j])if(!!O.has(`${j},${k}`)&&!w.has(`${j},${k}`)&&!D.has(`${j},${k}`)){O=new Set,D.add(`${j},${k}`),w.add(`${j},${k}`);var K=l[j][k];O.add(`${K[0]},${x(K[0],j)}`),O.add(`${K[1]},${x(K[1],j)}`),C.push(j);for(var G of K)z(G)}};var A=z;u=Number(u);var C=[],D=new Set;E.add(u),D.add(u);var O=new Set;O.add(`${u},${S}`),z(u),C.length!=0&&T.push(C)}return T}function zg(s,e){function t(m,y){for(var M=!1,_=y[0],x=y[1],T=m.map(function(P){return P[0]}),E=0,w=T.length-1;E<T.length;w=E++){var S=T[E],C=m[E][1],D=T[w],O=m[w][1],A=C>x!=O>x&&_<(D-S)*(x-C)/(O-C)+S;if(A&&(M=!M),C===x&&S===_||O===x&&D===_){M=!0;break}}return M}for(var n=Array.from(s).fill(0).map(m=>[]),i=0;i<s.length;i++)for(var o=s[i].map(m=>e[m]),l=0;l<s.length;l++)i!=l&&s[l].every(m=>t(o,e[m]))&&n[i].push(l);for(var u=new Array(s.length).fill(!1),d=new Array(s.length).fill(0).map(m=>[]),i=0;i<n.length;i++)for(var l=0;l<n[i].length;l++)d[n[i][l]].push(i);for(var i=0;i<d.length;i++)for(var l=0;l<d[i].length;l++)n[d[i][l]]=n[d[i][l]].filter(M=>!n[i].includes(M));var f=new Array(s.length).fill(0).map((m,y)=>y);f.sort((m,y)=>n[m].includes(y)?-1:1);var h=new Set;for(const m of f)h.has(m)||p(m);function p(m,y=0){if(!h.has(m)){h.add(m);for(const M of n[m])p(M,y+1);y%2==1&&(n[m]=[],u[m]=!0)}}return[n,u]}function Ng(s,e,t,n){var i=[];for(var o in s)if(!n[o]){var l=0,u=[];for(var d of s[o])u.push(...e[d]),l+=1;var f=[];for(var d of t[o]){var h=[];f.push(l);for(var p of s[d])h.push(...e[p]),l+=1;u.push(...h)}var m=Qs.exports(u,f);i.push({positions:u,indices:m})}return i}const ta=[2,2,1,1,0,0],Fg=[1,0,1,0,1,0];function Fl(s){for(var e=s[0][0],t=s[0][0],n=s[0][1],i=s[0][1],o=1;o<s.length;o++){var l=s[o];l[0]<e&&(e=l[0]),l[0]>t&&(t=l[0]),l[1]<n&&(n=l[1]),l[1]>i&&(i=l[1])}return[e,n,t,i]}function Og(s,e,t){for(var n={},i=0;i<e.length;i++)for(var o=0,l=0;l<e[i].length;l++){if(e[i][l]==0){o+=1;continue}var u=`${s[i][ta[o]]},${o}`;n[u]==null&&(n[u]={direction:o,relevant:ta[o],position:s[i][ta[o]]+Fg[o],data:[],colors:[]}),n[u].data.push(s[i].filter((Ee,Le)=>Le!=ta[o])),n[u].colors.push(t[i]),o+=1}var d=[];for(var i in n){for(var f={},l=0;l<n[i].data.length;l++){var h=n[i].data[l][0]+","+n[i].data[l][1];f[h]=l}for(var p=new Set,l=0;l<n[i].data.length;l++){let Ie=function(ze,We){var Fe=ze[0]+","+ze[1];if(!(f[Fe]==null||p.has(Fe))){We.push(f[Fe]),p.add(Fe);var je=[ze[0],ze[1]+1];Ie(je,We);var Ue=[ze[0],ze[1]-1];Ie(Ue,We);var ke=[ze[0]-1,ze[1]];Ie(ke,We);var tt=[ze[0]+1,ze[1]];Ie(tt,We);var et=[ze[0]+1,ze[1]+1];Ie(et,We);var N=[ze[0]-1,ze[1]+1];Ie(N,We);var L=[ze[0]+1,ze[1]-1];Ie(L,We);var re=[ze[0]-1,ze[1]-1];Ie(re,We)}};var xe=Ie,m=[];Ie(n[i].data[l],m),m.length>0&&d.push({direction:n[i].direction,relevant:n[i].relevant,position:n[i].position,data:m.map(ze=>n[i].data[ze]),colors:m.map(ze=>n[i].colors[ze])})}}for(var i in d)d[i].geometry=Dg(d[i].data);var y=[],M=[],_=[],x=[],T=[],E=[],w=0,S=0,C=0,D=0,O=0,A=Object.values(d).map(Ee=>Fl(Ee.data)),P=A.reduce((Ee,Le)=>Ee+Le[2]-Le[0]+1,0),z=A.reduce((Ee,Le)=>Math.max(Ee,Le[3]-Le[1]+1),0),j=Math.ceil(Math.sqrt(P*z)),K=0;for(var i in d){var G=d[i],k=!1;(G.direction==4||G.direction==5)&&(k=!0);var[F,$,B,Y]=Fl(G.data);if(S>j&&(S=0,C+=K+1,K=0),k){var V=Y,U=B-F;S-=$}else{var V=B,U=Y-$;S-=F}if(k)var ee=C-F;else var ee=C-$;U>K&&(K=U);for(var me in G.data){var X=G.colors[me],J=G.data[me];k?E.push({color:X,position:[J[1]+S,ee+J[0]]}):E.push({color:X,position:[J[0]+S,ee+J[1]]})}for(var me in G.geometry){for(var ne=G.geometry[me],l=0;l<ne.positions.length;l+=2){var W=[ne.positions[l],ne.positions[l+1]];W.splice(G.relevant,0,G.position),_.push(W),k?y.push([ne.positions[l+1]+S,ee+ne.positions[l]]):y.push([ne.positions[l]+S,ee+ne.positions[l+1]])}for(var l=0;l<ne.indices.length;l+=3){T.push(G.direction+1);var ce=[ne.indices[l]+w,ne.indices[l+1]+w,ne.indices[l+2]+w];if(G.direction==1){var le=ce[0];ce[0]=ce[1],ce[1]=le}if(G.direction==2){var le=ce[0];ce[0]=ce[2],ce[2]=le}if(G.direction==5){var le=ce[1];ce[1]=ce[2],ce[2]=le}M.push(ce.map(ze=>ze+1)),x.push(ce)}w+=ne.positions.length/2}S+=V+1,S>O&&(O=S),C>D&&(D=C)}D+=K+1,y=y.map(Ee=>[Ee[0]/O,Ee[1]/D]);for(var i in E)E[i].position=[E[i].position[0],D-1-E[i].position[1]];var[ve,me]=Pg(x,_);return{vert:ve,index:me,normal:T,uv_position:y,uv_index:M,uv_color:E,width:O,height:D}}function zi(s,t){var t={x:s.x+t.x,y:s.y+t.y,z:s.z+t.z};return`${t.x},${t.y},${t.z}`}function kg(s){const e=new Array(s.length).fill(0).map(h=>[1,1,1,1,1,1]);for(var t={},n=0;n<s.length;n++)t[`${s[n].x},${s[n].y},${s[n].z}`]=n;for(var n=0;n<s.length;n++){var i=t[zi(s[n],{x:1,y:0,z:0})];i&&(e[n][4]=0,e[i][5]=0);var o=t[zi(s[n],{x:-1,y:0,z:0})];o&&(e[n][5]=0,e[o][4]=0);var l=t[zi(s[n],{x:0,y:1,z:0})];l&&(e[n][2]=0,e[l][3]=0);var u=t[zi(s[n],{x:0,y:-1,z:0})];u&&(e[n][3]=0,e[u][2]=0);var d=t[zi(s[n],{x:0,y:0,z:1})];d&&(e[n][0]=0,e[d][1]=0);var f=t[zi(s[n],{x:0,y:0,z:-1})];f&&(e[n][1]=0,e[f][0]=0)}return e}function Ug(s,e,t,n,i){const o=kg(s);var l=Og(s.map(f=>[f.x,f.y,f.z]),o,s.map(f=>[f.color.r,f.color.g,f.color.b]));if(!(l.width==0||l.height==0)){if(n)if(i<=1){var u=hg(l);Ol(e+".png",u)}else{var u=fg(l,i);Ol(e+".png",u)}if(t){var d=dg(l);Bg(e+".obj",d)}}}function Bg(s,e){var t=new Blob([e],{type:"plain/text"}),n=URL.createObjectURL(t),i=document.createElement("a");i.download=s,i.href=n,i.textContent="Download",i.click(),i.remove()}function Ol(s,e){var t=document.createElement("a");t.download=s,t.href=e,t.click(),t.remove()}function ms(s){const e=Ge(),t=Gs({filename:"New project",geometry:!0,texture:!0,pixelSize:1});var n=localStorage.getItem("model");n&&(n=JSON.parse(n),t.filename=n.filename,t.geometry=n.geometry,t.texture=n.texture,t.pixelSize=n.pixelSize);var i=localStorage.getItem("filename");i&&(t.filename=i);const o=Q("div",{class:"modal-medium col"},Q("div",{class:"row"},Q("div",{class:"input-group flex"},Q("label",null,"File name"),Q("input",{type:"text",class:"input",model:[{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>t.filename,elements:[typeof t<"u"?t:void 0,typeof filename<"u"?filename:void 0]},u=>t.filename=u]})),Q("div",{style:"flex:1;margin-top:10px;"},Q("label",null,"Pixel size"),Q(ws,{min:1,max:100,step:1,get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>t.pixelSize,elements:[typeof t<"u"?t:void 0,typeof pixelSize<"u"?pixelSize:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:u=>t.pixelSize=u,elements:[typeof value<"u"?value:void 0,typeof t<"u"?t:void 0,typeof pixelSize<"u"?pixelSize:void 0,typeof value<"u"?value:void 0]}}))),Q("div",{class:"row padding-top"},Q("div",{class:"input-group flex"},Q(Ss,{name:"geometry",get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>t.geometry,elements:[typeof t<"u"?t:void 0,typeof geometry<"u"?geometry:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:u=>t.geometry=u,elements:[typeof value<"u"?value:void 0,typeof t<"u"?t:void 0,typeof geometry<"u"?geometry:void 0,typeof value<"u"?value:void 0]}})),Q("div",{class:"input-group flex"},Q(Ss,{name:"texture",get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>t.texture,elements:[typeof t<"u"?t:void 0,typeof texture<"u"?texture:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:u=>t.texture=u,elements:[typeof value<"u"?value:void 0,typeof t<"u"?t:void 0,typeof texture<"u"?texture:void 0,typeof value<"u"?value:void 0]}}))),Q("button",{class:"button corner",ref:e},"Save")),{close:l}=sa(o);e.$on("click",()=>{localStorage.setItem("filename",t.filename),localStorage.setItem("model",JSON.stringify(t)),Ug(s,t.filename,t.geometry,t.texture,t.pixelSize),l()})}const gs=[{text:"New",action:()=>{og("Are you sure you want to create a new project?",()=>{Z.voxel.clear(),Z.clearLayer(),Z.add_layer(),Z.orbit.reset()})}},,{text:"Save",action:()=>{Tc("vox",lg)}},{text:"Load",action:()=>{Ec("vox",cg)}},,{text:"Export all",action:()=>{ms(Z.voxel.getVoxels())}},{text:"Export visible",action:()=>{ms(Z.voxel.getVoxels().filter(s=>{var e=Z.layers[s.layer];return!!e.isVisible()}))}},{text:"Export selection",action:()=>{ms(Z.voxel.getVoxels().filter(s=>{var e=Z.layers[s.layer];return!!e.isSelected()}))}},,{text:"Export as image",action:()=>{wc("png",s=>{Z.saveRequest=function(e){var t=document.createElement("a");t.href=e,t.download=s+".png",document.body.appendChild(t),t.click()}})}}],vs=[{text:"Reset camera",action:()=>{Z.orbit.reset()}},,{options:["Wireframe selected","Wireframe all","Wireframe none"],set:s=>{Z.wireframeMode=s,Z.voxel.forceUpdate()}}],_s=[{text:"Mirror X",get:()=>!1,set:s=>{Z.setMirror("x")}},{text:"Mirror Y",get:()=>!1,set:s=>{Z.setMirror("y")}},{text:"Mirror Z",get:()=>!1,set:s=>{Z.setMirror("z")}}],xs=[{text:"Export palette",action:()=>{Tc("palette",()=>Z.palette_colors)}},{text:"Import palette",action:()=>{Ec("palette",s=>{Z.palette_colors=s})}}],ys=["Sculpt","Paint"],ei=["Sphere","Cube","Circle","Square"],bs=["Pen","Line","Extrude","Box","Plane","Move"],Pc=Ge(),Lc=Ge(),Rc=Ge(),Ic=Ge(),zc=Ge();Z.colorDisplay=zc;const Gg=Q("div",null,Q("div",{class:"header"},Q("div",{class:"title"},"Voxel modeler 2"),Q("div",{class:"divider"}),Q(xr,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>gs,elements:[typeof gs<"u"?gs:void 0]},name:"File"}),Q(xr,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>_s,elements:[typeof _s<"u"?_s:void 0]},name:"Edit"}),Q(xr,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>vs,elements:[typeof vs<"u"?vs:void 0]},name:"View"}),Q(xr,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>xs,elements:[typeof xs<"u"?xs:void 0]},name:"Color"})),Q("div",{class:"canvas-container",ref:Rc},Q("canvas",{ref:Pc,class:"canvas"}),Q("canvas",{ref:Lc,class:"canvas"})),Q("div",{class:"program",ref:Ic},Q("div",{class:"tool-bar-container right"},Q("div",{class:"tool-bar col"},Q("label",null,"Render mode"),Q(Ss,{name:"Render mode",get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>!1,elements:[]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:s=>{Z.setTarget(s?"raytrace":"raster")},elements:[typeof value<"u"?value:void 0,typeof Z<"u"?Z:void 0,typeof setTarget<"u"?setTarget:void 0,typeof value<"u"?value:void 0]}})),Q("div",{class:"tool-bar col"},Q("label",null,"Type:"),Q(ba,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>ys,elements:[typeof ys<"u"?ys:void 0]},get:"Sculpt",set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:s=>Z.mode=s,elements:[typeof v<"u"?v:void 0,typeof Z<"u"?Z:void 0,typeof mode<"u"?mode:void 0,typeof v<"u"?v:void 0]}}),Q("label",null,"Tools:"),Q(ba,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>bs,elements:[typeof bs<"u"?bs:void 0]},get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>Z.tool,elements:[typeof Z<"u"?Z:void 0,typeof tool<"u"?tool:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:s=>Z.tool=s,elements:[typeof v<"u"?v:void 0,typeof Z<"u"?Z:void 0,typeof tool<"u"?tool:void 0,typeof v<"u"?v:void 0]}})),Q("div",{class:"tool-bar col"},Q("label",null,"Brush shape"),Q(ba,{options:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>ei,elements:[typeof ei<"u"?ei:void 0]},get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>Z.shape,elements:[typeof Z<"u"?Z:void 0,typeof ei<"u"?ei:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:s=>Z.shape=s,elements:[typeof value<"u"?value:void 0,typeof Z<"u"?Z:void 0,typeof ei<"u"?ei:void 0,typeof value<"u"?value:void 0]}})),Q("div",{class:"tool-bar col"},Q("label",null,"Layers"),Q(sg,null))),Q("div",{class:"tool-bar-container"},Q("div",{class:"tool-bar col"},Q("label",null,"Brush size"),Q(ws,{min:1,max:20,step:1,get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>Z.brushSize,elements:[typeof Z<"u"?Z:void 0,typeof brushSize<"u"?brushSize:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:s=>Z.brushSize=s,elements:[typeof value<"u"?value:void 0,typeof Z<"u"?Z:void 0,typeof brushSize<"u"?brushSize:void 0,typeof value<"u"?value:void 0]}}),Q("label",null,"Feather"),Q(ws,{min:0,max:1,step:.1,get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>Z.feather,elements:[typeof Z<"u"?Z:void 0,typeof feather<"u"?feather:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:s=>Z.feather=s,elements:[typeof value<"u"?value:void 0,typeof Z<"u"?Z:void 0,typeof feather<"u"?feather:void 0,typeof value<"u"?value:void 0]}})),Q("div",{class:"tool-bar col"},Q("label",null,"Color"),Q(Yc,{ref:zc,get:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:()=>[Z.background,Z.foreground],elements:[typeof Z<"u"?Z:void 0,typeof background<"u"?background:void 0,typeof Z<"u"?Z:void 0,typeof foreground<"u"?foreground:void 0]},set:{key:"e0b8fc2b-fc7e-4786-bc05-b85187a8d065",expression:(s,e)=>Ms(s,e),elements:[typeof background<"u"?background:void 0,typeof foreground<"u"?foreground:void 0,typeof Ms<"u"?Ms:void 0,typeof background<"u"?background:void 0,typeof foreground<"u"?foreground:void 0]}})),Q("div",{class:"tool-bar col"},Q("label",null,"Scene colors"),Q($c,null)))));function Ms(s,e){Z.foreground=e,Z.background=s}Gg.$parent(document.body);Ic.$on("mousedown",s=>{s.stopPropagation()});rg(Rc,Pc,Lc).then(({draw:s})=>Zc(s));
