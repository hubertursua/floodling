/**
 * jQuery floodling
 *
 * Written by Hyubs Ursua
 *
 * Copyright (c) 2012
 *
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function( $ ) {
	$.fn.floodling = function(name, val) {
		var parent = $(this);
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
		else if(tag == 'textarea') {
			elem.val(val);
		}
		else if(tag == 'select') {
			var nameLen = name.length;
			if(nameLen > 2 && name.substring(nameLen - 2, nameLen) == '[]') {
				var selectVal = elem.val();
				if(selectVal === null) {
					selectVal = [];
				}
				if(typeof selectVal === 'string') {
					selectVal = [selectVal];
				}
				selectVal.push(val);
				elem.val(selectVal);
			}
			else {
				elem.val(val);
			}
		}
	};
})( jQuery );