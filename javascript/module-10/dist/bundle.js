!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=12)}([function(t,e,n){"use strict";var o,r,i,s=n(5),a="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){i=!1}function u(t){if(t){if(t!==o){if(t.length!==a.length)throw new Error("Custom alphabet for shortid must be "+a.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,n){return e!==n.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+a.length+" unique characters. These characters were not unique: "+e.join(", "));o=t,c()}}else o!==a&&(o=a,c())}function d(){return i||(i=function(){o||u(a);for(var t,e=o.split(""),n=[],r=s.nextValue();e.length>0;)r=s.nextValue(),t=Math.floor(r*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}t.exports={get:function(){return o||a},characters:function(t){return u(t),o},seed:function(t){s.seed(t),r!==t&&(c(),r=t)},lookup:function(t){return d()[t]},shuffled:d}},function(t){t.exports=JSON.parse('[{"id":"XWaQXcbk0","title":"JavaScript essentials","body":"Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc","priority":2},{"id":"pkXzyRp1P","title":"Refresh HTML and CSS","body":"Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.","priority":1},{"id":"QMom9q4Ku","title":"Get comfy with Frontend frameworks","body":"First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.","priority":1},{"id":"k2k0UrjZG","title":"Winter clothes","body":"Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I\'ll be able to do some excercises in the park.","priority":0}]')},function(t,e,n){"use strict";t.exports=n(4)},function(t,e,n){},function(t,e,n){"use strict";var o=n(0),r=n(6),i=n(10),s=n(11)||0;function a(){return r(s)}t.exports=a,t.exports.generate=a,t.exports.seed=function(e){return o.seed(e),t.exports},t.exports.worker=function(e){return s=e,t.exports},t.exports.characters=function(t){return void 0!==t&&o.characters(t),o.shuffled()},t.exports.isValid=i},function(t,e,n){"use strict";var o=1;t.exports={nextValue:function(){return(o=(9301*o+49297)%233280)/233280},seed:function(t){o=t}}},function(t,e,n){"use strict";var o,r,i=n(7),s=(n(0),1459707606518),a=6;t.exports=function(t){var e="",n=Math.floor(.001*(Date.now()-s));return n===r?o++:(o=0,r=n),e+=i(a),e+=i(t),o>0&&(e+=i(o)),e+=i(n)}},function(t,e,n){"use strict";var o=n(0),r=n(8),i=n(9);t.exports=function(t){for(var e,n=0,s="";!e;)s+=i(r,o.get(),1),e=t<Math.pow(16,n+1),n++;return s}},function(t,e,n){"use strict";var o,r="object"==typeof window&&(window.crypto||window.msCrypto);o=r&&r.getRandomValues?function(t){return r.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},t.exports=o},function(t,e){t.exports=function(t,e,n){var o=(2<<Math.log(e.length-1)/Math.LN2)-1,r=Math.ceil(1.6*o*n/e.length);n=+n;for(var i="";;)for(var s=t(r),a=0;a<r;a++){var c=s[a]&o;if(e[c]&&(i+=e[c]).length===n)return i}}},function(t,e,n){"use strict";var o=n(0);t.exports=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+o.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)}},function(t,e,n){"use strict";t.exports=0},function(t,e,n){"use strict";n.r(e);n(3);const o={LOW:0,NORMAL:1,HIGH:2},r="edit",i="delete",s="expand_more",a="expand_less",c="delete-note",u="edit-note",d="increase-priority",l="decrease-priority";var p=n(1),f=n(2),h=n.n(f);class y{constructor(t){this._notes=t}get notes(){return this._notes}saveUserInput(t,e){const n={id:h.a.generate(),title:t,body:e,priority:o.LOW};return this.saveNote(n)}saveNote(t){return this._notes.push(t),t}findNoteById(t){return this._notes.find(e=>e.id===t)}deleteNote(t){this._notes=this._notes.filter(e=>e.id!==t)}updateNoteContent(t,e){let n=this.findNoteById(t);const o={...n,...e};return this._notes.splice(this._notes.indexOf(n),1,o),o}updateNotePriority(t,e){let n=this.findNoteById(t);return n.priority=e,n}filterNotesByQuery(t=""){return this._notes.filter(e=>e.title.toLowerCase().includes(t.toLowerCase())||e.body.toLowerCase().includes(t.toLowerCase()))}filterNotesByPriority(t){let e=[];for(let n of this._notes)n.priority===t&&e.push(n);return e}}const b=new y(p),m=(t,e)=>{const n=document.createElement(t);return n.classList.add(e),n},_=t=>{const e=m("footer","note__footer");return e.appendChild((t=>{const e=m("section","note__section"),n=m("button","action");n.setAttribute("data-action",l);const o=m("button","action");o.setAttribute("data-action",d);const r=m("i","material-icons");r.classList.add("action__icon"),r.textContent=s;const i=m("i","material-icons");i.classList.add("action__icon"),i.textContent=a;const c=m("span","note__priority");return c.textContent=t.priority,n.appendChild(r),o.appendChild(i),e.appendChild(n),e.appendChild(o),e.appendChild(c),e})(t)),e.appendChild((()=>{const t=m("section","note__section"),e=m("button","action");e.setAttribute("data-action",u);const n=m("button","action");n.setAttribute("data-action",c);const o=m("i","material-icons");o.classList.add("action__icon"),o.textContent=r;const s=m("i","material-icons");return s.classList.add("action__icon"),s.textContent=i,e.appendChild(o),n.appendChild(s),t.appendChild(e),t.appendChild(n),t})()),e},v=t=>{const e=m("li","note-list__item");e.setAttribute("data-id",t.id);const n=m("div","note");return n.appendChild((t=>{const e=m("div","note__content"),n=m("h2","note__title");n.textContent=t.title;const o=m("p","note__body");return o.textContent=t.body,e.appendChild(n),e.appendChild(o),e})(t)),n.appendChild(_(t)),e.appendChild(n),e},g=(t,e)=>{const n=e.map(t=>v(t));t.innerHTML="",t.append(...n)},x=new y(p),w=(()=>({searchInput:document.querySelector(".search-form__input"),editor:document.querySelector(".note-editor"),noteList:document.querySelector(".note-list"),titleInput:document.querySelector("input.note-editor__input"),bodyInput:document.querySelector("textarea.note-editor__input")}))();g(w.noteList,x.notes);w.editor.addEventListener("submit",t=>{t.preventDefault();const[e,n]=t.target.elements;if(""===e.value.trim()||""===n.value.trim())return alert("Необходимо заполнить все поля!");const o=e.value,r=n.value,i=x.saveUserInput(o,r);((t,e)=>{const n=v(e);t.appendChild(n)})(w.noteList,i),t.currentTarget.reset()}),w.noteList.addEventListener("click",({target:t})=>{if("I"!==t.nodeName)return;switch(t.closest("button").dataset.action){case c:(t=>{const e=t.closest(".note-list__item"),n=e.dataset.id;b.deleteNote(n),e.remove()})(t)}}),w.searchInput.addEventListener("input",({target:t})=>{const e=x.filterNotesByQuery(t.value);g(w.noteList,e)})}]);
//# sourceMappingURL=bundle.js.map