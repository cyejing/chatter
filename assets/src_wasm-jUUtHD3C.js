let R,O,T,S,M,W,q,B,C,F,z,E,U,$,L,P,D,I,J,N,H,G,K,Q,V,X,Y,Z,nn,_n,en,tn,rn,an,cn,on,sn,fn,bn,un,gn,dn,wn,ln,mn,hn,yn,pn,xn,vn,An,kn,jn,Rn,On,Tn,Sn,Mn,Wn,qn,Bn,Cn,Fn,zn,En,Ln,Pn,Dn,b_=(async()=>{const In="/chatter/assets/src_wasm_bg-5jtWPmrA.wasm",Jn=async(n={},_)=>{let e;if(_.startsWith("data:")){const r=_.replace(/^data:.*?base64,/,"");let a;if(typeof Buffer=="function"&&typeof Buffer.from=="function")a=Buffer.from(r,"base64");else if(typeof atob=="function"){const f=atob(r);a=new Uint8Array(f.length);for(let o=0;o<f.length;o++)a[o]=f.charCodeAt(o)}else throw new Error("Cannot decode base64-encoded data URL");e=await WebAssembly.instantiate(a,n)}else{const r=await fetch(_),a=r.headers.get("Content-Type")||"";if("instantiateStreaming"in WebAssembly&&a.startsWith("application/wasm"))e=await WebAssembly.instantiateStreaming(r,n);else{const f=await r.arrayBuffer();e=await WebAssembly.instantiate(f,n)}}return e.instance.exports};let s;dn=function(n){s=n};const g=new Array(128).fill(void 0);g.push(void 0,null,!0,!1);function t(n){return g[n]}let m=g.length;function Nn(n){n<132||(g[n]=m,m=n)}function y(n){const _=t(n);return Nn(n),_}let l=0,p=null;function x(){return(p===null||p.byteLength===0)&&(p=new Uint8Array(s.memory.buffer)),p}const Hn=typeof TextEncoder>"u"?(0,module.require)("util").TextEncoder:TextEncoder;let v=new Hn("utf-8");const Gn=typeof v.encodeInto=="function"?function(n,_){return v.encodeInto(n,_)}:function(n,_){const e=v.encode(n);return _.set(e),{read:n.length,written:e.length}};function A(n,_,e){if(e===void 0){const b=v.encode(n),h=_(b.length,1)>>>0;return x().subarray(h,h+b.length).set(b),l=b.length,h}let r=n.length,a=_(r,1)>>>0;const f=x();let o=0;for(;o<r;o++){const b=n.charCodeAt(o);if(b>127)break;f[a+o]=b}if(o!==r){o!==0&&(n=n.slice(o)),a=e(a,r,r=o+n.length*3,1)>>>0;const b=x().subarray(a+o,a+r),h=Gn(n,b);o+=h.written,a=e(a,r,o,1)>>>0}return l=o,a}function Kn(n){return n==null}let k=null;function d(){return(k===null||k.byteLength===0)&&(k=new Int32Array(s.memory.buffer)),k}const Qn=typeof TextDecoder>"u"?(0,module.require)("util").TextDecoder:TextDecoder;let Un=new Qn("utf-8",{ignoreBOM:!0,fatal:!0});Un.decode();function w(n,_){return n=n>>>0,Un.decode(x().subarray(n,n+_))}function c(n){m===g.length&&g.push(g.length+1);const _=m;return m=g[_],g[_]=n,_}function j(n){const _=typeof n;if(_=="number"||_=="boolean"||n==null)return`${n}`;if(_=="string")return`"${n}"`;if(_=="symbol"){const a=n.description;return a==null?"Symbol":`Symbol(${a})`}if(_=="function"){const a=n.name;return typeof a=="string"&&a.length>0?`Function(${a})`:"Function"}if(Array.isArray(n)){const a=n.length;let f="[";a>0&&(f+=j(n[0]));for(let o=1;o<a;o++)f+=", "+j(n[o]);return f+="]",f}const e=/\[object ([^\]]+)\]/.exec(toString.call(n));let r;if(e.length>1)r=e[1];else return toString.call(n);if(r=="Object")try{return"Object("+JSON.stringify(n)+")"}catch{return"Object"}return n instanceof Error?`${n.name}: ${n.message}
${n.stack}`:r}const $n=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>{s.__wbindgen_export_2.get(n.dtor)(n.a,n.b)});function Vn(n,_,e,r){const a={a:n,b:_,cnt:1,dtor:e},f=(...o)=>{a.cnt++;const b=a.a;a.a=0;try{return r(b,a.b,...o)}finally{--a.cnt===0?(s.__wbindgen_export_2.get(a.dtor)(b,a.b),$n.unregister(a)):a.a=b}};return f.original=a,$n.register(f,a,a),f}function Xn(n,_,e){s._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf541d8b8fca64d6c(n,_,c(e))}Dn=function(){s.wasm_init()},Pn=function(n){const _=s.translate(c(n));return y(_)},Ln=function(n){const _=s.recognize(c(n));return y(_)};function i(n,_){try{return n.apply(this,_)}catch(e){s.__wbindgen_exn_store(c(e))}}function Yn(n,_,e,r){s.wasm_bindgen__convert__closures__invoke2_mut__h89731f578fc04a91(n,_,c(e),c(r))}Cn=function(n){y(n)},Fn=function(n,_){const e=t(_),r=typeof e=="string"?e:void 0;var a=Kn(r)?0:A(r,s.__wbindgen_malloc,s.__wbindgen_realloc),f=l;d()[n/4+1]=f,d()[n/4+0]=a},Rn=function(n){const _=y(n).original;return _.cnt--==1?(_.a=0,!0):!1},Wn=function(n){return t(n)===void 0},zn=function(n,_){const e=w(n,_);return c(e)},Z=function(){const n=new Error;return c(n)},ln=function(n,_){const e=t(_).stack,r=A(e,s.__wbindgen_malloc,s.__wbindgen_realloc),a=l;d()[n/4+1]=a,d()[n/4+0]=r},F=function(n,_){let e,r;try{e=n,r=_,console.error(w(n,_))}finally{s.__wbindgen_free(e,r,1)}},Bn=function(n){const _=t(n);return c(_)},E=function(n){const _=fetch(t(n));return c(_)},sn=function(n){queueMicrotask(t(n))},on=function(n){const _=t(n).queueMicrotask;return c(_)},Sn=function(n){return typeof t(n)=="function"},z=function(n,_){const e=t(n).fetch(t(_));return c(e)},q=function(n,_,e,r){console.debug(t(n),t(_),t(e),t(r))},C=function(n,_,e,r){console.error(t(n),t(_),t(e),t(r))},I=function(n,_,e,r){console.info(t(n),t(_),t(e),t(r))},G=function(n,_,e,r){console.log(t(n),t(_),t(e),t(r))},kn=function(n,_,e,r){console.warn(t(n),t(_),t(e),t(r))},an=function(n){return t(n).now()},en=function(){return i(function(n,_,e){const r=new Request(w(n,_),t(e));return c(r)},arguments)},wn=function(n){const _=t(n).signal;return c(_)},K=function(){return i(function(){const n=new AbortController;return c(n)},arguments)},R=function(n){t(n).abort()},Y=function(){return i(function(){const n=new Headers;return c(n)},arguments)},O=function(){return i(function(n,_,e,r,a){t(n).append(w(_,e),w(r,a))},arguments)},J=function(n){let _;try{_=t(n)instanceof Response}catch{_=!1}return _},vn=function(n,_){const e=t(_).url,r=A(e,s.__wbindgen_malloc,s.__wbindgen_realloc),a=l;d()[n/4+1]=a,d()[n/4+0]=r},mn=function(n){return t(n).status},D=function(n){const _=t(n).headers;return c(_)},T=function(){return i(function(n){const _=t(n).arrayBuffer();return c(_)},arguments)},yn=function(){return i(function(n){const _=t(n).text();return c(_)},arguments)},nn=function(n,_){const e=new Function(w(n,_));return c(e)},Mn=function(n){const _=t(n);return typeof _=="object"&&_!==null},rn=function(n){const _=t(n).next;return c(_)},tn=function(){return i(function(n){const _=t(n).next();return c(_)},arguments)},B=function(n){return t(n).done},An=function(n){const _=t(n).value;return c(_)},N=function(){return c(Symbol.iterator)},U=function(){return i(function(n,_){const e=Reflect.get(t(n),t(_));return c(e)},arguments)},M=function(){return i(function(n,_){const e=t(n).call(t(_));return c(e)},arguments)},V=function(){const n=new Object;return c(n)},bn=function(){return i(function(){const n=self.self;return c(n)},arguments)},jn=function(){return i(function(){const n=window.window;return c(n)},arguments)},$=function(){return i(function(){const n=globalThis.globalThis;return c(n)},arguments)},L=function(){return i(function(){const n=global.global;return c(n)},arguments)},W=function(){return i(function(n,_,e){const r=t(n).call(t(_),t(e));return c(r)},arguments)},X=function(n,_){try{var e={a:n,b:_},r=(f,o)=>{const b=e.a;e.a=0;try{return Yn(b,e.b,f,o)}finally{e.a=b}};const a=new Promise(r);return c(a)}finally{e.a=e.b=0}},fn=function(n){const _=Promise.resolve(t(n));return c(_)},pn=function(n,_){const e=t(n).then(t(_));return c(e)},xn=function(n,_,e){const r=t(n).then(t(_),t(e));return c(r)},S=function(n){const _=t(n).buffer;return c(_)},_n=function(n,_,e){const r=new Uint8Array(t(n),_>>>0,e>>>0);return c(r)},Q=function(n){const _=new Uint8Array(t(n));return c(_)},gn=function(n,_,e){t(n).set(t(_),e>>>0)},H=function(n){return t(n).length},cn=function(){return i(function(n,_){const e=JSON.parse(w(n,_));return c(e)},arguments)},hn=function(){return i(function(n){const _=JSON.stringify(t(n));return c(_)},arguments)},P=function(){return i(function(n,_){return Reflect.has(t(n),t(_))},arguments)},un=function(){return i(function(n,_,e){return Reflect.set(t(n),t(_),t(e))},arguments)},Tn=function(n,_){const e=j(t(_)),r=A(e,s.__wbindgen_malloc,s.__wbindgen_realloc),a=l;d()[n/4+1]=a,d()[n/4+0]=r},En=function(n,_){throw new Error(w(n,_))},qn=function(){const n=s.memory;return c(n)},On=function(n,_,e){const r=Vn(n,_,240,Xn);return c(r)},URL=globalThis.URL;const u=await Jn({"./src_wasm_bg.js":{__wbindgen_object_drop_ref:Cn,__wbindgen_string_get:Fn,__wbindgen_cb_drop:Rn,__wbindgen_is_undefined:Wn,__wbindgen_string_new:zn,__wbg_new_abda76e883ba8a5f:Z,__wbg_stack_658279fe44541cf6:ln,__wbg_error_f851667af71bcfc6:F,__wbindgen_object_clone_ref:Bn,__wbg_fetch_eadcbc7351113537:E,__wbg_queueMicrotask_481971b0d87f3dd4:sn,__wbg_queueMicrotask_3cbae2ec6b6cd3d6:on,__wbindgen_is_function:Sn,__wbg_fetch_921fad6ef9e883dd:z,__wbg_debug_7d879afce6cf56cb:q,__wbg_error_696630710900ec44:C,__wbg_info_80803d9a3f0aad16:I,__wbg_log_151eb4333ef0fe39:G,__wbg_warn_5d3f783b0bae8943:kn,__wbg_now_4e659b3d15f470d9:an,__wbg_newwithstrandinit_3fd6fba4083ff2d0:en,__wbg_signal_a61f78a3478fd9bc:wn,__wbg_new_0d76b0581eca6298:K,__wbg_abort_2aa7521d5690750e:R,__wbg_new_ab6fd82b10560829:Y,__wbg_append_7bfcb4937d1d5e29:O,__wbg_instanceof_Response_849eb93e75734b6e:J,__wbg_url_5f6dc4009ac5f99d:vn,__wbg_status_61a01141acd3cf74:mn,__wbg_headers_9620bfada380764a:D,__wbg_arrayBuffer_29931d52c7206b02:T,__wbg_text_450a059667fd91fd:yn,__wbg_newnoargs_e258087cd0daa0ea:nn,__wbindgen_is_object:Mn,__wbg_next_40fc327bfc8770e6:rn,__wbg_next_196c84450b364254:tn,__wbg_done_298b57d23c0fc80c:B,__wbg_value_d93c65011f51a456:An,__wbg_iterator_2cee6dadfd956dfa:N,__wbg_get_e3c254076557e348:U,__wbg_call_27c0f87801dedf93:M,__wbg_new_72fb9a18b5ae2624:V,__wbg_self_ce0dbfc45cf2f5be:bn,__wbg_window_c6fb939a7f436783:jn,__wbg_globalThis_d1e6af4856ba331b:$,__wbg_global_207b558942527489:L,__wbg_call_b3ca7c6051f9bec1:W,__wbg_new_81740750da40724f:X,__wbg_resolve_b0083a7967828ec8:fn,__wbg_then_0c86a60e8fcfe9f6:pn,__wbg_then_a73caa9a87991566:xn,__wbg_buffer_12d079cc21e14bdb:S,__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb:_n,__wbg_new_63b92bc8671ed464:Q,__wbg_set_a47bac70306a19a7:gn,__wbg_length_c20a40f15020d68a:H,__wbg_parse_66d1801634e099ac:cn,__wbg_stringify_8887fe74e1c50d81:hn,__wbg_has_0af94d20077affa2:P,__wbg_set_1f9b04f170055d33:un,__wbindgen_debug_string:Tn,__wbindgen_throw:En,__wbindgen_memory:qn,__wbindgen_closure_wrapper513:On}},In),Zn=u.memory,n_=u.wasm_init,__=u.translate,e_=u.recognize,t_=u.__wbindgen_malloc,r_=u.__wbindgen_realloc,a_=u.__wbindgen_export_2,c_=u._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf541d8b8fca64d6c,o_=u.__wbindgen_free,s_=u.__wbindgen_exn_store,f_=u.wasm_bindgen__convert__closures__invoke2_mut__h89731f578fc04a91,i_=Object.freeze(Object.defineProperty({__proto__:null,__wbindgen_exn_store:s_,__wbindgen_export_2:a_,__wbindgen_free:o_,__wbindgen_malloc:t_,__wbindgen_realloc:r_,_dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf541d8b8fca64d6c:c_,memory:Zn,recognize:e_,translate:__,wasm_bindgen__convert__closures__invoke2_mut__h89731f578fc04a91:f_,wasm_init:n_},Symbol.toStringTag,{value:"Module"}));dn(i_)})();export{b_ as __tla,R as __wbg_abort_2aa7521d5690750e,O as __wbg_append_7bfcb4937d1d5e29,T as __wbg_arrayBuffer_29931d52c7206b02,S as __wbg_buffer_12d079cc21e14bdb,M as __wbg_call_27c0f87801dedf93,W as __wbg_call_b3ca7c6051f9bec1,q as __wbg_debug_7d879afce6cf56cb,B as __wbg_done_298b57d23c0fc80c,C as __wbg_error_696630710900ec44,F as __wbg_error_f851667af71bcfc6,z as __wbg_fetch_921fad6ef9e883dd,E as __wbg_fetch_eadcbc7351113537,U as __wbg_get_e3c254076557e348,$ as __wbg_globalThis_d1e6af4856ba331b,L as __wbg_global_207b558942527489,P as __wbg_has_0af94d20077affa2,D as __wbg_headers_9620bfada380764a,I as __wbg_info_80803d9a3f0aad16,J as __wbg_instanceof_Response_849eb93e75734b6e,N as __wbg_iterator_2cee6dadfd956dfa,H as __wbg_length_c20a40f15020d68a,G as __wbg_log_151eb4333ef0fe39,K as __wbg_new_0d76b0581eca6298,Q as __wbg_new_63b92bc8671ed464,V as __wbg_new_72fb9a18b5ae2624,X as __wbg_new_81740750da40724f,Y as __wbg_new_ab6fd82b10560829,Z as __wbg_new_abda76e883ba8a5f,nn as __wbg_newnoargs_e258087cd0daa0ea,_n as __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb,en as __wbg_newwithstrandinit_3fd6fba4083ff2d0,tn as __wbg_next_196c84450b364254,rn as __wbg_next_40fc327bfc8770e6,an as __wbg_now_4e659b3d15f470d9,cn as __wbg_parse_66d1801634e099ac,on as __wbg_queueMicrotask_3cbae2ec6b6cd3d6,sn as __wbg_queueMicrotask_481971b0d87f3dd4,fn as __wbg_resolve_b0083a7967828ec8,bn as __wbg_self_ce0dbfc45cf2f5be,un as __wbg_set_1f9b04f170055d33,gn as __wbg_set_a47bac70306a19a7,dn as __wbg_set_wasm,wn as __wbg_signal_a61f78a3478fd9bc,ln as __wbg_stack_658279fe44541cf6,mn as __wbg_status_61a01141acd3cf74,hn as __wbg_stringify_8887fe74e1c50d81,yn as __wbg_text_450a059667fd91fd,pn as __wbg_then_0c86a60e8fcfe9f6,xn as __wbg_then_a73caa9a87991566,vn as __wbg_url_5f6dc4009ac5f99d,An as __wbg_value_d93c65011f51a456,kn as __wbg_warn_5d3f783b0bae8943,jn as __wbg_window_c6fb939a7f436783,Rn as __wbindgen_cb_drop,On as __wbindgen_closure_wrapper513,Tn as __wbindgen_debug_string,Sn as __wbindgen_is_function,Mn as __wbindgen_is_object,Wn as __wbindgen_is_undefined,qn as __wbindgen_memory,Bn as __wbindgen_object_clone_ref,Cn as __wbindgen_object_drop_ref,Fn as __wbindgen_string_get,zn as __wbindgen_string_new,En as __wbindgen_throw,Ln as recognize,Pn as translate,Dn as wasm_init};
