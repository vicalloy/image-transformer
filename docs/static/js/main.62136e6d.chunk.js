(this["webpackJsonpimage-transformer"]=this["webpackJsonpimage-transformer"]||[]).push([[0],{15:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n.n(a),i=n(10),c=n.n(i),u=(n(15),n(4)),o=n(0),s=n.n(o),l=n(2),h=n(7),d=n.n(h),g=n(5),p=n.n(g),f=n(6);function m(e){return v.apply(this,arguments)}function v(){return(v=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,f.InferenceSession.create(t,{executionProviders:["wasm"]});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e,t){return j.apply(this,arguments)}function j(){return(j=Object(l.a)(s.a.mark((function e(t,n){var a,r,i,c,u,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Date,e.prev=1,(r={})[t.inputNames[0]]=n,e.next=6,t.run(r);case 6:return i=e.sent,c=new Date,u=c.getTime()-a.getTime(),o=i[t.outputNames[0]],e.abrupt("return",[o,u]);case 13:throw e.prev=13,e.t0=e.catch(1),console.error(e.t0),new Error;case 17:case"end":return e.stop()}}),e,null,[[1,13]])})))).apply(this,arguments)}var w={candy:[135,200,270,300,350,360,400,540,1200],gogh:[135,200,300,350,400,500,1e3,1500,4e3],rain:[135,200,300,350,500,1e3],mosaic:[224],pointilism:[224],udnie:[224],"anime-gan-v2-":[512]},O=function(e){return new Promise((function(t,n){var a=new Image;a.onload=function(){t(a)},a.onerror=function(){n("There was some problem with the image.")},a.src=e}))};function x(e,t,n){for(var a=w[e],r=n.width>n.height?n.width:n.height,i=0,c=a.length-1;c>=0;c--){var u=a[c];if(!(u>t)){if(u<=r){i=i||u;break}i=u}}return i=i||a[0]}function k(e,t){var n=t,a=e.width*(t/e.height);return e.width>e.height&&(a=t,n=e.height*(t/e.width)),{width:a,height:n}}function y(e,t,n){return F.apply(this,arguments)}function F(){return(F=Object(l.a)(s.a.mark((function e(t,n,a){var r,i,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=document.createElement("canvas"),i=r.getContext("2d"),r.width=n,r.height=n,i.drawImage(t,0,0,a.width,a.height),c=i.getImageData(0,0,n,n).data,e.abrupt("return",new Float32Array(c));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=function(e,t,n){if("anime-gan-v2-"===n)for(var a=0;a<e.length;a+=1)e[a]=e[a]/255*2-1;var r=d()(e,[t,t,4]),i=d()(new Float32Array(t*t*3),[1,3,t,t]);p.a.assign(i.pick(0,2,null,null),r.pick(null,null,2)),p.a.assign(i.pick(0,1,null,null),r.pick(null,null,1)),p.a.assign(i.pick(0,0,null,null),r.pick(null,null,0));var c=new f.Tensor("float32",new Float32Array(3*t*t),[1,3,t,t]);return c.data.set(i.data),c},I=function(e,t,n){var a=e.data;if("anime-gan-v2-"===t)for(var r=0;r<a.length;r+=1){var i=a[r];i=(i=.5*i+.5)<0?0:i>1?255:Math.round(255*i),a[r]=i}var c=d()(new Float32Array(n*n*4),[n,n,4]),u=d()(new Float32Array(a),[1,3,n,n]);p.a.assign(c.pick(null,null,0),u.pick(0,0,null,null)),p.a.assign(c.pick(null,null,1),u.pick(0,1,null,null)),p.a.assign(c.pick(null,null,2),u.pick(0,2,null,null));for(var o=c.data,s=0;s<n;s++)for(var l=0;l<n;l++){o[4*(s*n+l)+3]=255}return o};function S(){return(S=Object(l.a)(s.a.mark((function e(t,n,a,r){var i,c,o,l,h,d,g,p,f,v,j,w,F,S;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(t);case 2:return i=e.sent,c=x(r,a,{width:i.width,height:i.height}),o=k(i,c),e.next=7,y(i,c,o);case 7:return l=e.sent,h=C(l,c,r),d="".concat("/image-transformer","/models/").concat(r).concat(c,".onnx"),console.log("loading onnx model"),e.next=13,m(d);case 13:return g=e.sent,console.log("transforming"),e.next=17,b(g,h);case 17:p=e.sent,f=Object(u.a)(p,2),v=f[0],f[1],console.log("finished"),g=null,j=I(v,r,c),w=document.getElementById(n),F=w.getContext("2d"),w.width=o.width,w.height=o.height,(S=F.createImageData(c,c)).data.set(j),F.putImageData(S,0,0);case 31:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n(29),n(30);var A=n(1);var D=function(){var e=Object(a.useState)(),t=Object(u.a)(e,2),n=t[0],r=t[1],i="rain",c=Object(a.useState)(),o=Object(u.a)(c,2),s=o[0],l=void 0===s?w.rain:s,h=o[1],d=Object(a.useState)(),g=Object(u.a)(d,2),p=g[0],f=void 0===p?i:p,m=g[1],v=Object(a.useState)(),b=Object(u.a)(v,2),j=b[0],O=void 0===j?135:j,x=b[1],k=Object(a.useState)(),y=Object(u.a)(k,2),F=y[0],C=void 0===F?"please upload a image":F,I=y[1],D=function(e){var t=e.target.value;m(t),h(w[t])};return Object(a.useEffect)((function(){n&&(I("transforming ..."),function(e,t,n,a){return S.apply(this,arguments)}(n,"resultCanvas",O,f).then((function(e){I("")})))}),[n,O,f]),Object(A.jsxs)("div",{className:"App",children:[Object(A.jsxs)("header",{className:"App-header",children:[Object(A.jsx)("div",{children:Object.keys(w).map((function(e,t){return Object(A.jsxs)("label",{children:[Object(A.jsx)("input",{type:"radio",name:"style",value:e,onChange:D,checked:e===f}),Object(A.jsx)("img",{src:"".concat("/image-transformer","/assets/images/styles/").concat(e,".jpg")})]},e)}))}),Object(A.jsxs)("div",{children:["Output image size:",Object(A.jsx)("select",{name:"imageSize",id:"imageSize",value:O,onChange:function(e){var t=e.target.value;x(t)},children:l.map((function(e){return Object(A.jsx)("option",{value:e,children:e},e)}))})]}),Object(A.jsx)("input",{type:"file",name:"backgroundImg",onChange:function(e){var t=e.target.files[0];if(t){var n=new FileReader;n.readAsDataURL(t),n.onload=function(){r(n.result)}}}}),Object(A.jsx)("div",{children:C}),Object(A.jsx)("canvas",{id:"resultCanvas",width:O,height:O})]}),Object(A.jsx)("a",{className:"github-fork-ribbon",href:"https://github.com/vicalloy/image-transformer","data-ribbon":"Fork me on GitHub",title:"Fork me on GitHub",children:"Fork me on GitHub"})]})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,34)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))};c.a.render(Object(A.jsx)(r.a.StrictMode,{children:Object(A.jsx)(D,{})}),document.getElementById("root")),T()}},[[33,1,2]]]);
//# sourceMappingURL=main.62136e6d.chunk.js.map