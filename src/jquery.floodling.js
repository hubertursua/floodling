(function ($) {
	"use strict";

	var F = function () {
		if (arguments.length === 2) {
			var elem = arguments[0];
			var val = arguments[1];
			F._floodForm($(this), elem, val);
		} else if (arguments.length === 1) {
			if(
				typeof arguments[0] === 'object' &&
				!(arguments[0] instanceof Array)
			) {
				var obj = arguments[0];
				F._floodForm($(this), obj);
			} else {
				var val = arguments[0];
				F._floodElement($(this), val);
			}
		}

		return $(this);
	};

	F._floodForm = function ($form) {
		if (arguments.length === 3) {
			var obj = {};
			obj[arguments[1]] = arguments[2];
			return F._floodForm($form, obj);
		} else {
			var obj = arguments[1];

			for (var elem in obj) {
				var val = obj[elem];
				var $elem = $(F._getElemSelector(elem), $form);
				F._floodElement($elem, val);
			}
		}
	};

	F._getElemSelector = function (str) {
		if (typeof str === 'string') {
			if (str[0] !== '.' && str[0] !== '#') {
				return '[name="' + str + '"]';
			} else {
				return str;
			}
		} else {
			// Anything else, we'll return it back. It may be a jQuery object.
			return str;
		}
	};

	F._floodElement = function (elem, val) {
		var $elem = $(F._getElemSelector(elem));
		return F._setValue($elem, val);
	};

	F._escapeValAttr = function (val) {
		return (val + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
	};

	F._setValue = function ($elem, val) {
		var floodlingType = $elem.attr('data-floodling-type');

		if (floodlingType && typeof F._registry[floodlingType] === 'function') {
			return F._registry[floodlingType].call($elem, val);
		} else {
			var tag = ($elem.prop("tagName") + '').toLowerCase();

			if (tag === 'input') {
				var type = ($elem.attr("type") + '').toLowerCase();

				if (type === 'radio') {
					return F._handlers.inputRadio($elem, val);
				} else if (type === 'checkbox') {
					return F._handlers.inputCheckbox($elem, val);
				} else if (type === 'image') {
					return F._handlers.inputImage($elem, val);
				} else { // type = [text, password, submit, button, reset, date, color, etc.]
					return F._handlers.inputOthers($elem, val);
				}
			} else if (tag === 'button') {
				return F._handlers.button($elem, val);
			} else if (tag === 'textarea') {
				return F._handlers.textarea($elem, val);
			} else if (tag === 'select') {
				return F._handlers.select($elem, val);
			} else {
				return F.fallback.call($elem, val);
			}
		}
	};

	F.fallback  = $.fn.val;
	F.multiMode = 'floodling';
	F._registry = {};
	F._handlers = {};

	F.register = function (name, func) {
		F._registry[name] = func;
	};

	F._handlers.inputCheckbox = function ($elem, val) {
		if (F.multiMode === 'floodling') {
			var name = $elem.attr('name');

			if (name && name.length > 2 && name.substring(name.length - 2, name.length) == '[]') {
				if (val instanceof Array) {
					for (var i in val) {
						var $cbox = $elem.filter('[value="' + F._escapeValAttr(val[i]) + '"]');

						if ($cbox) {
							$cbox.prop('checked', !$cbox.prop('checked'));
						}
					}
				} else {
					var $cbox = $('[value="' + F._escapeValAttr(val[i]) + '"]', $elem);
					return $cbox.prop('checked', (val));
				}
			} else {
				return $elem.prop('checked', (val));
			}
		} else {
			return $elem.val(val);
		}
	};

	F._handlers.inputRadio = function ($elem, val) {
		return $elem.filter('[value="' + F._escapeValAttr(val) + '"]').prop("checked", true);
	};

	F._handlers.inputImage = function ($elem, val) {
		return $elem.prop('src', val);
	};

	F._handlers.inputOthers = function ($elem, val) {
		return $elem.val(val);
	};

	F._handlers.button = function ($elem, val) {
		return $elem.html(val);
	};

	F._handlers.textarea = function ($elem, val) {
		return $elem.val(val);
	};

	F._handlers.select = function ($elem, val) {
		if (F.multiMode === 'floodling') {
			if ($elem.prop('multiple')) {
				if (typeof val === 'string') {
					val = [val];
				}

				if (val instanceof Array) {
					for (var i in val) {
						var $option = $('[value="' + F._escapeValAttr(val[i]) + '"]', $elem);

						if ($option) {
							$option.prop('selected', !$option.prop('selected'));
						}
					}
				}
			} else {
				return $elem.val(val);
			}
		} else {
			return $elem.val(val);
		}
	};

	$.fn.floodling = F;
})(jQuery);