module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=function(e){return function(t){return e.registerOperation(t),t}};function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(){function e(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,r=[{key:"from",value:function(t){var n=t.type;return this.type===n?new this(t):e._registeredOperations[n]?e._registeredOperations[n].from(t):null}},{key:"registerOperation",value:function(t){e._registeredOperations[t.type]=t}}],(n=[{key:"transform",value:function(e,t){throw Error("Must Override Operation.prototype.transform()")}}])&&o(t.prototype,n),r&&o(t,r),e}();i(u,"_registeredOperations",{}),i(u,"type",null);var a=u;function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=function(e){function t(e){var n,r,o,i=e.value,u=void 0===i?null:i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=!(o=l(t).apply(this,arguments))||"object"!==f(o)&&"function"!=typeof o?p(r):o,y(p(p(n)),"_value",null),n._value=u,n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t({value:e.value})}}],(r=[{key:"import",value:function(e){this._value=e.value}},{key:"export",value:function(){return{type:t.type,value:this._value}}},{key:"transform",value:function(e,t){return"string"==typeof this._value?e+t(this._value):e+this._value}}])&&c(n.prototype,r),o&&c(n,o),t}();y(v,"type","add");var b=r(a)(v);function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var g=function(e){function t(e){var n,r,o,i=e.value,u=void 0===i?null:i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=!(o=_(t).apply(this,arguments))||"object"!==h(o)&&"function"!=typeof o?w(r):o,O(w(w(n)),"_value",null),n._value=u,n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t({value:e.value})}}],(r=[{key:"import",value:function(e){this._value=e.value}},{key:"export",value:function(){return{type:t.type,value:this._value}}},{key:"transform",value:function(e,t){return"string"==typeof this._value?e-t(this._value):e-this._value}}])&&m(n.prototype,r),o&&m(n,o),t}();O(g,"type","subtract");var k=r(a)(g);function j(e){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=function(e){function t(e){var n,r,o,i=e.value,u=void 0===i?null:i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=!(o=S(t).apply(this,arguments))||"object"!==j(o)&&"function"!=typeof o?x(r):o,T(x(x(n)),"_value",null),n._value=u,n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t({value:e.value})}}],(r=[{key:"import",value:function(e){this._value=e.value}},{key:"export",value:function(){return{type:t.type,value:this._value}}},{key:"transform",value:function(e,t){return console.info("@@ Using - Not implemented"),e}}])&&P(n.prototype,r),o&&P(n,o),t}();T(C,"type","using");var A=r(a)(C);function R(e){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function M(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function U(e){return(U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function B(e,t){return(B=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var I=function(e){function t(e){var n,r,o,i=e.selectors,u=void 0===i?[]:i,a=e.fn;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=!(o=U(t).apply(this,arguments))||"object"!==R(o)&&"function"!=typeof o?N(r):o,q(N(N(n)),"_selectors",[]),q(N(N(n)),"_fn",null),n._selectors=u,n._fn=a,n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&B(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t(e.fn)}}],(r=[{key:"import",value:function(e){this._fn=e.fn}},{key:"export",value:function(){return{type:t.type,selectors:this._selectors,fn:Function(this._fn)}}},{key:"transform",value:function(e,t){return this._fn.apply(this,[e].concat(M(this._selectors.map(t))))}}])&&D(n.prototype,r),o&&D(n,o),t}();q(I,"type","calculate");var F=r(a)(I);function Y(e){return(Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function G(e,t){return!t||"object"!==Y(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function H(e){return(H=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function J(e,t){return(J=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var K,L,Q,V=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),G(this,H(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&J(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t}}],(r=[{key:"import",value:function(){}},{key:"export",value:function(){return{type:t.type}}},{key:"transform",value:function(e,t){return Math.ceil(e)}}])&&z(n.prototype,r),o&&z(n,o),t}();Q="round-up",(L="type")in(K=V)?Object.defineProperty(K,L,{value:Q,enumerable:!0,configurable:!0,writable:!0}):K[L]=Q;var W=r(a)(V);function X(e){return(X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function $(e,t){return!t||"object"!==X(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ee(e){return(ee=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function te(e,t){return(te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ne=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),$(this,ee(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&te(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t}}],(r=[{key:"import",value:function(){}},{key:"export",value:function(){return{type:t.type}}},{key:"transform",value:function(e,t){return Math.floor(e)}}])&&Z(n.prototype,r),o&&Z(n,o),t}();!function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(ne,"type","round-down");var re=r(a)(ne);function oe(e){return(oe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ie(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ue(e){return(ue=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ae(e,t){return(ae=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function fe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ce(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var le=function(e){function t(e){var n,r,o,i=e.value,u=void 0===i?null:i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=!(o=ue(t).apply(this,arguments))||"object"!==oe(o)&&"function"!=typeof o?fe(r):o,ce(fe(fe(n)),"_value",null),n._value=u,n}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ae(e,t)}(t,a),n=t,o=[{key:"from",value:function(e){return new t({value:e.value})}}],(r=[{key:"import",value:function(e){this._value=e.value}},{key:"export",value:function(){return{type:t.type,value:this._value}}},{key:"transform",value:function(e,t){return"string"==typeof this._value?e/t(this._value):e/this._value}}])&&ie(n.prototype,r),o&&ie(n,o),t}();ce(le,"type","divide-by");var se=r(a)(le);function pe(e){return(pe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ye(e){return(ye=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ve(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function be(e,t,n){return t&&ve(e.prototype,t),n&&ve(e,n),e}function he(e,t){return(he=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function me(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var de=function(e){function t(){var e,n,r,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,e=!(r=ye(t).apply(this,arguments))||"object"!==pe(r)&&"function"!=typeof r?me(n):r,_e(me(me(e)),"type","modifies"),_e(me(me(e)),"_target",null),_e(me(me(e)),"modifies",!0),e._target=o,e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&he(e,t)}(t,a),be(t,[{key:"target",get:function(){return this._target}}]),be(t,[{key:"import",value:function(e){this._target=e.target}},{key:"export",value:function(){return{type:t.type,target:this._target}}},{key:"transform",value:function(e,t){return Math.floor(e)}}],[{key:"from",value:function(e){var n=new t;return n.import(e),n}}]),t}();_e(de,"type","modifies");var we={Add:b,Subtract:k,Using:A,Calculate:F,RoundUp:W,RoundDown:re,DivideBy:se,Modifies:r(a)(de)};function Oe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ge(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ke=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),ge(this,"_description","This modifier has no descrition."),ge(this,"_operations",[]),ge(this,"_active",!0),ge(this,"currentlyModifying",null)}var t,n,r;return t=e,r=[{key:"from",value:function(t){var n=new e;return n.import(t),n}}],(n=[{key:"describe",value:function(e){return this._description=e,this}},{key:"modifies",value:function(e){return this._operations.push(new we.Modifies(e)),this}},{key:"add",value:function(e){return this._operations.push(new we.Add({value:e})),this}},{key:"subtract",value:function(e){return this._operations.push(new we.Subtract({value:e})),this}},{key:"divideBy",value:function(e){return this._operations.push(new we.DivideBy({value:e})),this}},{key:"roundUp",value:function(){return this._operations.push(new we.RoundUp),this}},{key:"roundDown",value:function(){return this._operations.push(new we.RoundDown),this}},{key:"calculate",value:function(e){var t=e.selectors,n=void 0===t?[]:t,r=e.fn;return this._operations.push(new we.Calculate({selectors:n,fn:r})),this}},{key:"import",value:function(e){return this._description=e.description,this._operations=e.operations,this._active=e.active,this}},{key:"export",value:function(){return{description:this._description,operations:this._operations,active:this._active}}},{key:"operations",get:function(){return this._operations}},{key:"description",get:function(){return this._description}}])&&Oe(t.prototype,n),r&&Oe(t,r),e}();function je(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Pe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Se=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Pe(this,"_modifiers",[]),Pe(this,"_description",null),Pe(this,"_active",!0)}var t,n,r;return t=e,r=[{key:"from",value:function(t){var n=new e;return n.import(t),n}}],(n=[{key:"describe",value:function(e){return this._description=e,this}},{key:"give",value:function(e){var t=this;return{of:function(n){for(;e--;)t._modifiers.push(n);return t}}}},{key:"filter",value:function(e){this._modifiers.filter(e)}},{key:"map",value:function(e){return this._modifiers.map(e)}},{key:"forEach",value:function(e){this._modifiers.forEach(e)}},{key:"on",value:function(){this._active=!0}},{key:"off",value:function(){this._active=!1}},{key:"import",value:function(e){this._modifiers=e.modifiers.map(function(e){return ke.from(e)}),this._description=e.description,this._active=e.active}},{key:"export",value:function(){return{description:this._description,modifiers:this._modifiers.map(function(e){return e.export()}),active:this._active}}},{key:"modifiers",get:function(){return this._modifiers}}])&&je(t.prototype,n),r&&je(t,r),e}();function Ee(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function xe(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Te=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),xe(this,"_operations",[]),xe(this,"_description",null),xe(this,"_initially",null),xe(this,"_set",null)}var t,n,r;return t=e,r=[{key:"from",value:function(t){var n=new e;return n.import(t),n}}],(n=[{key:"describe",value:function(e){return this._description=e,this}},{key:"initially",value:function(e){return this._initially=e,this}},{key:"using",value:function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return{calculate:function(t){return e._operations.push(new we.Calculate({selectors:n,fn:t})),e}}}},{key:"set",value:function(e){this._set=e}},{key:"get",value:function(){return this._set||this._initially}},{key:"add",value:function(e){return this._operations.push(new we.Add({value:e})),this}},{key:"subtract",value:function(e){return this._operations.push(new we.Subtract({value:e})),this}},{key:"divideBy",value:function(e){return this._operations.push(new we.DivideBy({value:e})),this}},{key:"roundUp",value:function(){return this._operations.push(new we.RoundUp),this}},{key:"roundDown",value:function(){return this._operations.push(new we.RoundDown),this}},{key:"calculate",value:function(e){var t=e.selectors,n=void 0===t?[]:t,r=e.fn;return this._operations.push(new we.Calculate({selectors:n,fn:r})),this}},{key:"import",value:function(e){this._initially=e.initally,this._description=e.description,this._set=e.set,this._operations=e.operations.map(function(e){return a.from(e)})}},{key:"export",value:function(){return{initally:this._initially,description:this._description,set:this._set,operations:this._operations.map(function(e){return e.export()})}}},{key:"operations",get:function(){return this._operations}},{key:"description",get:function(){return this._description}}])&&Ee(t.prototype,n),r&&Ee(t,r),e}();function Ce(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function Ae(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Re(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Me=function(){var e={},t={};return function(){function n(){var e=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),Re(this,"_modifiers",{}),Re(this,"_inventories",{});var t=function(t){return e._query(t)};return Object.getOwnPropertyNames(this.constructor.prototype).forEach(function(n){/_/.test(n)||(t[n]=e[n].bind(e))}),t}var r,o,i;return r=n,i=[{key:"from",value:function(e){var t=new n;return t.import(e),t}},{key:"define",value:function(t){var n=new Te;return e[t]=n,n}},{key:"inventory",value:function(e){var n=new Se;return t[e]=n,n}}],(o=[{key:"_resolve",value:function(n){var r=this,o=null,i=this._modifiers[n],u=e[n],a=i||u;if(!a)throw Error("No definition exists for ".concat(n));o=a.get();var f=u.operations,c=[];return Object.keys(t).forEach(function(e){var t=r._inventories[e];if(t){var o=t.modifiers.reduce(function(e,t){var r=!1,o=t.operations.reduce(function(e,t){return"modifies"===t.type&&(r=t.target===n),r?[].concat(Ce(e),[t]):e},[]);return e.concat(o)},[]);c.push.apply(c,Ce(o))}}),o=[].concat(Ce(f),c).reduce(function(e,t){return t.transform(e,r._resolve.bind(r))},o)}},{key:"_set",value:function(e,t){var n;return this._modifiers[e]?n=this._modifiers[e]:(n=new Te,this._modifiers[e]=n),n.set(t),n}},{key:"_query",value:function(e){var t=this;return{is:function(n){if(!n)return t._resolve(e);t._set(e,n)}}}},{key:"inventory",value:function(e){if(!(e in t))throw Error("".concat(e," is not an inventory. You must define an inventory on the sheet."));if(this._inventories[e])return this._inventories[e];var n=new Se;return this._inventories[e]=n,n}},{key:"import",value:function(e){}},{key:"export",value:function(){var t=this,n={},r={},o={};return Object.keys(e).forEach(function(t){return n[t]=e[t].export()}),Object.keys(this._modifiers).forEach(function(e){return r[e]=t._modifiers[e].export()}),Object.keys(this._inventories).forEach(function(e){o[e]=t._inventories[e].export()}),{version:1,sheet:n,character:r,inventories:o}}},{key:"getSheet",value:function(){var n=this,r={},o={};return Object.keys(t).forEach(function(e){r[e]=n.inventory(e).map(function(e){return e.description})}),Object.keys(e).forEach(function(t){o[t]={value:n._resolve(t),description:e[t].description}}),{inventories:r,stats:o}}}])&&Ae(r.prototype,o),i&&Ae(r,i),n}()};Me.Modifier=ke;var De=Me;n.d(t,"default",function(){return De})}]).default;