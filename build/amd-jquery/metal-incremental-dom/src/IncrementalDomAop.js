define(['exports', 'metal/src/metal', './incremental-dom'], function (exports, _metal) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var IncrementalDomAop = function () {
		function IncrementalDomAop() {
			_classCallCheck(this, IncrementalDomAop);
		}

		_createClass(IncrementalDomAop, null, [{
			key: 'getOriginalFns',
			value: function getOriginalFns() {
				return fnStack[0];
			}
		}, {
			key: 'startInterception',
			value: function startInterception(fns) {
				var originals = IncrementalDomAop.getOriginalFns();
				fns = _metal.object.map(fns, function (name, value) {
					return value.bind(null, originals[name]);
				});
				fnStack.push(_metal.object.mixin({}, originals, fns, {
					attr: fnAttr,
					elementOpenEnd: fnOpenEnd,
					elementOpenStart: fnOpenStart,
					elementVoid: fnVoid
				}));
			}
		}, {
			key: 'stopInterception',
			value: function stopInterception() {
				if (fnStack.length > 1) {
					fnStack.pop();
				}
			}
		}]);

		return IncrementalDomAop;
	}();

	var fnStack = [{
		attr: IncrementalDOM.attr,
		attributes: IncrementalDOM.attributes[IncrementalDOM.symbols.default],
		elementClose: IncrementalDOM.elementClose,
		elementOpen: IncrementalDOM.elementOpen,
		elementOpenEnd: IncrementalDOM.elementOpenEnd,
		elementOpenStart: IncrementalDOM.elementOpenStart,
		elementVoid: IncrementalDOM.elementVoid,
		text: IncrementalDOM.text
	}];

	var collectedArgs = [];

	function fnAttr(name, value) {
		collectedArgs.push(name, value);
	}

	function fnOpenStart(tag, key, statics) {
		collectedArgs = [tag, key, statics];
	}

	function fnOpenEnd() {
		return getFn('elementOpen').apply(null, collectedArgs);
	}

	function fnVoid(tag) {
		getFn('elementOpen').apply(null, arguments);
		return getFn('elementClose')(tag);
	}

	function getFn(name) {
		return fnStack[fnStack.length - 1][name];
	}

	function handleCall(name) {
		return getFn(name).apply(null, _metal.array.slice(arguments, 1));
	}

	IncrementalDOM.attr = handleCall.bind(null, 'attr');
	IncrementalDOM.elementClose = handleCall.bind(null, 'elementClose');
	IncrementalDOM.elementOpen = handleCall.bind(null, 'elementOpen');
	IncrementalDOM.elementOpenEnd = handleCall.bind(null, 'elementOpenEnd');
	IncrementalDOM.elementOpenStart = handleCall.bind(null, 'elementOpenStart');
	IncrementalDOM.elementVoid = handleCall.bind(null, 'elementVoid');
	IncrementalDOM.text = handleCall.bind(null, 'text');

	IncrementalDOM.attributes[IncrementalDOM.symbols.default] = handleCall.bind(null, 'attributes');

	exports.default = IncrementalDomAop;
});
//# sourceMappingURL=IncrementalDomAop.js.map