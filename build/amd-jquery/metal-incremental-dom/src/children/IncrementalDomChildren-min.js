define(["exports","metal/src/metal","../IncrementalDomAop","../utils/IncrementalDomUtils"],function(e,n,r,t){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}function u(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){var r=u({parent:g},b.CHILD_OWNER,m);return n?(r.text=e[0],e.length>1&&(r.args=e)):(r.tag=e[0],r.props=O["default"].buildConfigFromCall(e),r.props.children=[],r.config=r.props),i(r),r}function i(e){g.props.children.push(e)}function f(){g===v?(h["default"].stopInterception(),C=!1,s(v),s=null,g=null,m=null,v=null):g=g.parent}function c(e){for(var n=arguments.length,r=Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];g=a(r)}function p(e){for(var n=arguments.length,r=Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];a(r,!0)}Object.defineProperty(e,"__esModule",{value:!0});var s,d,g,m,v,h=l(r),O=l(t),y=function(){function e(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,r,t){return r&&e(n.prototype,r),t&&e(n,t),n}}(),b=function(){function e(){o(this,e)}return y(e,null,[{key:"capture",value:function(e,n){m=e,s=n,v={props:{children:[]}},v.config=v.props,g=v,C=!0,h["default"].startInterception({elementClose:f,elementOpen:c,text:p})}},{key:"getCurrentOwner",value:function(){return d}},{key:"getOwner",value:function(n){return n[e.CHILD_OWNER]}},{key:"render",value:function(r,t){if(C)return void i(r);if(d=e.getOwner(r),t&&t(r))return void(d=null);if((0,n.isDef)(r.text)){var l=r.args?r.args:[];l[0]=r.text,IncrementalDOM.text.apply(null,l)}else{var u=O["default"].buildCallFromConfig(r.tag,r.props);if(IncrementalDOM.elementOpen.apply(null,u),r.props.children)for(var o=0;o<r.props.children.length;o++)e.render(r.props.children[o],t);IncrementalDOM.elementClose(r.tag)}d=null}}]),e}(),C=!1;b.CHILD_OWNER="__metalChildOwner",e["default"]=b});