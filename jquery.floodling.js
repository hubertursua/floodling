/**
 * jQuery floodling v1.1.3
 * Written by Hyubs Ursua
 * Copyright (c) 2013
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function( $ ) {
	$.fn.floodling = function(names, val) {
		var parent = $(this);
		
		if(Object.prototype.toString.call(names) === '[object String]') {
			var obj = {};
			obj[names] = val;
			names = obj;
		}
		
		for(var name in names) {
			val = names[name];
		
			var elem = parent.find('[name="' + name + '"]');
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
	};
})(jQuery);