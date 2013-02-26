/**
 * jQuery floodling v1.1.5 https://github.com/hyubs/floodling
 * Written by Hyubs Ursua
 * Copyright (c) 2013
 * Website: https://github.com/hyubs/floodling
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function( $ ) {
	$.fn.floodling = function() {
		var parent, elem, val, names, elemSelector;
		
		if(arguments.length == 1) {
			if(Object.prototype.toString.call(arguments[0]) === '[object Object]') {
				names = arguments[0];
				parent = $(this);
			}
			else {
				parent = $('body');
				elem = $(this);
				val = arguments[0];
				setValue(parent, elem, val);
				return;
			}
		}
		else if(arguments.length == 2) {
			var obj = {};
			obj[arguments[0]] = arguments[1];
			names = obj;
			parent = $(this);
		}		
		
		for(var name in names) {
			val = names[name];
			elem = parent.find('[name="' + name + '"]');
			setValue(parent, elem, val);
		}
	};
	
	function setValue(parent, elem, val) {
		if(typeof elem !== 'undefined' && elem.length > 0) {
			var tag = elem.prop("tagName").toLowerCase();
			if(tag == 'input') {
				var type = elem.attr('type').toLowerCase();
				
				if(type == 'text' || type == 'password') {
					elem.val(val);
				}
				else if(type == 'radio') {
					$('[name="' + name + '"][value="' + val + '"]').attr('checked', 'checked');
				}
				else if(type == 'checkbox') {
					var nameLen = name.length;
					if(nameLen > 2 && name.substring(nameLen - 2, nameLen) == '[]') {
						parent.find('[name="' + name + '"][value="' + val + '"]').attr('checked', 'checked');
					}
					else {
						if(val != false) {
							elem.attr('checked', 'checked');
						}
						else {
							elem.removeAttr('checked');
						}
					}
				}
				else if(type == 'image') {
					elem.attr('src', val);
				}
				else { // submit, button, reset, date, color, etc.
					elem.val(val);
				}
			}
			else if(tag == 'button') {
				elem.html(val);
			}
			else if(tag == 'textarea') {
				elem.val(val);
			}
			else if(tag == 'select') {
				var nameLen = name.length;
				if(elem.prop('multiple')) {
					var selectVal = elem.val();
					if(selectVal === null) {
						selectVal = [];
					}
					else if(typeof selectVal === 'string') {
						selectVal = [selectVal];
					}
					selectVal.push(val);
					elem.val(selectVal);
				}
				else {
					elem.val(val);
				}
			}
		}
		else {
			console.error('Element $("' + elem.selector +'") was not found.');
		}
	}
})(jQuery);