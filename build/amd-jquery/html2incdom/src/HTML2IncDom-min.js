define(["exports","./unescape"],function(n,e){"use strict";function t(n){return n&&n.__esModule?n:{"default":n}}function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u,a=t(e),o=function(){function n(){r(this,n)}return n.buildFn=function(e){return function(){return n.run(e)}},n.getParser=function(){return u||window.HTMLParser},n.run=function(e){n.getParser()(e,{start:function(n,e,t){for(var r=t?IncrementalDOM.elementVoid:IncrementalDOM.elementOpen,u=[n,null,[]],a=0;a<e.length;a++)u.push(e[a].name,e[a].value);r.apply(null,u)},end:function(n){IncrementalDOM.elementClose(n)},chars:function(n){IncrementalDOM.text(n,a["default"])}})},n.setParser=function(n){u=n},n}();n["default"]=o});