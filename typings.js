!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=2)}([function(t,e,n){(function(t){function n(t,e){for(var n=0,r=t.length-1;r>=0;r--){var o=t[r];"."===o?t.splice(r,1):".."===o?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function r(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}e.resolve=function(){for(var e="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var u=i>=0?arguments[i]:t.cwd();if("string"!=typeof u)throw new TypeError("Arguments to path.resolve must be strings");u&&(e=u+"/"+e,o="/"===u.charAt(0))}return(o?"/":"")+(e=n(r(e.split("/"),(function(t){return!!t})),!o).join("/"))||"."},e.normalize=function(t){var i=e.isAbsolute(t),u="/"===o(t,-1);return(t=n(r(t.split("/"),(function(t){return!!t})),!i).join("/"))||i||(t="."),t&&u&&(t+="/"),(i?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(r(t,(function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,n){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var o=r(t.split("/")),i=r(n.split("/")),u=Math.min(o.length,i.length),s=u,c=0;c<u;c++)if(o[c]!==i[c]){s=c;break}var a=[];for(c=s;c<o.length;c++)a.push("..");return(a=a.concat(i.slice(s))).join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!=typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),n=47===e,r=-1,o=!0,i=t.length-1;i>=1;--i)if(47===(e=t.charCodeAt(i))){if(!o){r=i;break}}else o=!1;return-1===r?n?"/":".":n&&1===r?"/":t.slice(0,r)},e.basename=function(t,e){var n=function(t){"string"!=typeof t&&(t+="");var e,n=0,r=-1,o=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!o){n=e+1;break}}else-1===r&&(o=!1,r=e+1);return-1===r?"":t.slice(n,r)}(t);return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){"string"!=typeof t&&(t+="");for(var e=-1,n=0,r=-1,o=!0,i=0,u=t.length-1;u>=0;--u){var s=t.charCodeAt(u);if(47!==s)-1===r&&(o=!1,r=u+1),46===s?-1===e?e=u:1!==i&&(i=1):-1!==e&&(i=-1);else if(!o){n=u+1;break}}return-1===e||-1===r||0===i||1===i&&e===r-1&&e===n+1?"":t.slice(e,r)};var o="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n(1))},function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(t){r=u}}();var c,a=[],f=!1,l=-1;function h(){f&&c&&(f=!1,c.length?a=c.concat(a):l=-1,a.length&&p())}function p(){if(!f){var t=s(h);f=!0;for(var e=a.length;e;){for(c=a,a=[];++l<e;)c&&c[l].run();l=-1,e=a.length}c=null,f=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function m(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];a.push(new d(t,e)),1!==a.length||f||s(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r);class i{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((n,r)=>{const o=indexedDB.open(t,1);o.onerror=()=>r(o.error),o.onsuccess=()=>n(o.result),o.onupgradeneeded=()=>{o.result.createObjectStore(e)}})}_withIDBStore(t,e){return this._dbp.then(n=>new Promise((r,o)=>{const i=n.transaction(this.storeName,t);i.oncomplete=()=>r(),i.onabort=i.onerror=()=>o(i.error),e(i.objectStore(this.storeName))}))}}let u;function s(){return u||(u=new i),u}Object.assign;self.importScripts("https://cdnjs.cloudflare.com/ajax/libs/typescript/2.4.2/typescript.min.js");var c="https://cdn.jsdelivr.net/",a=new i("typescript-definitions-cache-v1"),f=new Map,l=function(t){var e=f.get(t);if(e)return e;var n=fetch(t).then((function(t){if(t.status>=200&&t.status<300)return Promise.resolve(t);var e=new Error(t.statusText||t.status);return Promise.reject(e)})).then((function(t){return t.text()}));return f.set(t,n),n},h=function(t){var e={};return t.forEach((function(t){e[t.name]=t})),e},p=function(t,e){var n="/"+e;return t[n+".d.ts"]?e+".d.ts":t[n+".ts"]?e+".ts":t[n]?e:t[n+"/index.d.ts"]?e+"/index.d.ts":e},d=function t(e,n,r,i,u){var s=o.a.join("node_modules",n,r);return i[s]?null:l(e+"/"+r).then((function(c){return i[s]?null:(i[s]=c,Promise.all((a=r,f=c,l=[],h=self.ts.createSourceFile(a,f,self.ts.ScriptTarget.Latest,!0,self.ts.ScriptKind.TS),self.ts.forEachChild(h,(function(t){switch(t.kind){case self.ts.SyntaxKind.ImportDeclaration:l.push(t.moduleSpecifier.text);break;case self.ts.SyntaxKind.ExportDeclaration:t.moduleSpecifier&&l.push(t.moduleSpecifier.text)}})),l).filter((function(t){return t.startsWith(".")})).map((function(t){return o.a.join(o.a.dirname(r),t)})).map((function(t){return p(u,t)})).map((function(r){return t(e,n,r,i,u)}))));var a,f,l,h}))};function m(t,e,n){var r=c+"npm/"+t+"@"+e;return l(r+"/package.json").then((function(t){return JSON.parse(t)})).then((function(i){var u=i.typings||i.types;if(u)return n["node_modules/"+t+"/package.json"]=JSON.stringify(i),function(t,e,n){return l("https://data.jsdelivr.com/v1/package/npm/"+t+"@"+e+"/flat").then((function(t){return JSON.parse(t)})).then((function(t){return t.files.filter((function(t){return t.name.startsWith(n)}))})).then(h)}(t,e,o.a.join("/",o.a.dirname(u))).then((function(e){return d(r,t,p(e,u),n,e)}));throw new Error("No typings field in package.json for "+t+"@"+e)}))}function v(t,e){if(!e)return Promise.reject(new Error("No version specified for "+t));var n=t+"@"+e;return function(t,e=s()){let n;return e._withIDBStore("readonly",e=>{n=e.get(t)}).then(()=>n.result)}(n,a).catch((function(t){console.error("An error occurred when getting definitions from cache",t)})).then((function(r){if(r)return r;var o={};return m(t,e,o).catch((function(){return function(t,e,n){return l("https://data.jsdelivr.com/v1/package/npm/"+t+"@"+e+"/flat").then((function(t){return JSON.parse(t)})).then((function(r){var o=function(t,e){return t.reduce((function(t,n){return e.test(n.name)&&t.push(n.name),t}),[])},i=o(r.files,/\.d\.ts$/);if(0===i.length&&(i=o(r.files,/\.ts$/)),0===i.length)throw new Error("No inline typings found for "+t+"@"+e);i.forEach((function(r){l("https://cdn.jsdelivr.net/npm/"+t+"@"+e+r).then((function(e){n["node_modules/"+t+r]=e})).catch((function(){}))}))}))}(t,e,o)})).catch((function(){return function(t,e,n){return l(c+"npm/@types/"+t.replace("@","").replace(/\//g,"__")+"/index.d.ts").then((function(e){n["node_modules/"+t+"/index.d.ts"]=e}))}(t,0,o)})).then((function(){if(Object.keys(o).length)return function(t,e,n=s()){n._withIDBStore("readwrite",n=>{n.put(e,t)})}(n,o,a),o;throw new Error("Type definitions are empty for "+n)}))}))}self.addEventListener("message",(function(t){var e=t.data,n=e.name,r=e.version;v(n,r).then((function(t){return self.postMessage({name:n,version:r,typings:t})}),(function(t){0}))}))}]);