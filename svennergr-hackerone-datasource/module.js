define(["@grafana/data","@grafana/runtime","@grafana/ui","lodash","react"],((e,t,r,n,o)=>(()=>{"use strict";var a=[e=>{e.exports=o},e=>{e.exports=r},,t=>{t.exports=e},e=>{e.exports=t},e=>{e.exports=n}],u={};function i(e){var t=u[e];if(void 0!==t)return t.exports;var r=u[e]={exports:{}};return a[e](r,r.exports,i),r.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var c={};return(()=>{i.r(c),i.d(c,{plugin:()=>U});var e=i(3);function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,t){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},n(e,t)}function o(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=u(e);if(t){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&n(e,t)}(c,e);var t,a,u,i=o(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e)).annotations={},t}return t=c,a&&r(t.prototype,a),u&&r(t,u),Object.defineProperty(t,"prototype",{writable:!1}),t}(i(4).DataSourceWithBackend),l=i(0),s=i.n(l),p=i(1);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},b.apply(this,arguments)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=j(e);if(t){var o=j(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return O(this,r)}}function O(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return g(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var w=p.LegacyForms.SecretFormField,S=p.LegacyForms.FormField,_=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(a,e);var t,r,n,o=m(a);function a(){var e;v(this,a);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return P(g(e=o.call.apply(o,[this].concat(r))),"onUsernameChange",(function(t){var r=e.props,n=r.onOptionsChange,o=r.options,a=b({},o.jsonData,{userName:t.target.value});n(b({},o,{jsonData:a}))})),P(g(e),"onAPIKeyChange",(function(t){var r=e.props;(0,r.onOptionsChange)(b({},r.options,{secureJsonData:{apiKey:t.target.value}}))})),P(g(e),"onResetAPIKey",(function(){var t=e.props,r=t.onOptionsChange,n=t.options;r(b({},n,{secureJsonFields:b({},n.secureJsonFields,{apiKey:!1}),secureJsonData:b({},n.secureJsonData,{apiKey:""})}))})),e}return t=a,(r=[{key:"render",value:function(){var e=this.props.options,t=e.jsonData,r=e.secureJsonFields,n=e.secureJsonData||{};return s().createElement("div",{className:"gf-form-group"},s().createElement("div",{className:"gf-form"},s().createElement(S,{label:"Username",labelWidth:6,inputWidth:20,onChange:this.onUsernameChange,value:t.userName||"",placeholder:"HackerOne Username"})),s().createElement("div",{className:"gf-form-inline"},s().createElement("div",{className:"gf-form"},s().createElement(w,{isConfigured:r&&r.apiKey,value:n.apiKey||"",label:"API Key",placeholder:"HackerOne API Key",labelWidth:6,inputWidth:20,onReset:this.onResetAPIKey,onChange:this.onAPIKeyChange}))))}}])&&d(t.prototype,r),n&&d(t,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(l.PureComponent),E=i(5),R=[{label:"Earnings",value:"earnings"},{label:"Payouts",value:"payouts"},{label:"Cumulative Payouts",value:"payouts-cumulative"},{label:"Reports",value:"reports"},{label:"Reports (JSON)",value:"reports-raw"}];function C(e){return R.some((function(t){return t.value===e}))}var x={type:"reports"};function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function D(){return D=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},D.apply(this,arguments)}function K(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function F(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function A(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=B(e);if(t){var o=B(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return J(this,r)}}function J(e,t){if(t&&("object"===T(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return N(e)}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function B(e){return B=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},B(e)}function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var W=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,r,n,o=A(a);function a(){var e;K(this,a);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return I(N(e=o.call.apply(o,[this].concat(r))),"onTypeChange",(function(t,r){if(C(t.value)){var n=e.props;(0,n.onChange)(D({},n.query,{type:t.value}))}})),e}return t=a,(r=[{key:"render",value:function(){var e=(0,E.defaults)(this.props.query,x).type;return s().createElement("div",{className:"gf-form"},s().createElement(p.Select,{options:R,value:e,onChange:this.onTypeChange}))}}])&&F(t.prototype,r),n&&F(t,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(l.PureComponent),U=new e.DataSourcePlugin(f).setConfigEditor(_).setQueryEditor(W)})(),c})()));
//# sourceMappingURL=module.js.map