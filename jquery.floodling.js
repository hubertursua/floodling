/**
 * jQuery floodling v1.1.7 https://github.com/hyubs/floodling
 * Written by Hyubs Ursua
 * Copyright (c) 2013
 * Website: https://github.com/hyubs/floodling
 * License: http://www.opensource.org/licenses/mit-license.php
 */
(function( $ ) {
	$.fn.floodling = function() {
		var parent, elem, val, names, elemSelector;

		if(arguments.length == 1) {
			if((typeof arguments[0] === 'object')&&(!(arguments[0] instanceof Array))) {
				names = arguments[0];
				parent = $(this);
			}
			else {
				parent = $('body');
				elem = $(this);
				val = arguments[0];
				name = elem.attr('name');
				setValue(parent, elem, val, name);
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
			if (! elem.length) {
				elem = parent.find('#' + name);
			}
			setValue(parent, elem, val, name);
		}
	};
	
	function setValue(parent, elem, val, name) {
		if(typeof elem !== 'undefined' && elem.length > 0) {
			var tag = elem.prop("tagName").toLowerCase();
			if(tag == 'input') {
				var type = elem.prop('type').toLowerCase();

				if(type == 'text' || type == 'password') {
					elem.val(val);
				}
				else if(type == 'radio') {
					parent.find('[name="' + name + '"][value="' + val + '"]').prop("checked", true);
				}
				else if(type == 'checkbox') {
					var nameLen = name.length;
					if(nameLen > 2 && name.substring(nameLen - 2, nameLen) == '[]') {
						if(val instanceof Array) {
							for (var i = 0; i < val.length; i++){
								var cbox = parent.find('[name="' + name + '"][value="' + val[i] + '"]');
								if(cbox.prop('checked')) {
									cbox.prop('checked', false);
								}
								else {
									cbox.prop('checked', true);
								}
							}
						}
						else {
							var cbox = parent.find('[name="' + name + '"][value="' + val + '"]');
							if(cbox.prop('checked')) {
								cbox.prop('checked', false);
							}
							else {
								cbox.prop('checked', true);
							}
						}					
					}
					else {
						if(val != false) {
							elem.prop('checked', true);
						}
						else {
							elem.prop('checked', false);
						}
					}
				}
				else if(type == 'image') {
					elem.prop('src', val);
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
				if(elem.prop('multiple')) {
					var selectVal = elem.val();
					if(selectVal === null) {
						selectVal = [];
					}
					else if(typeof selectVal === 'string') {
						selectVal = [selectVal];
					}
					if(val instanceof Array) {
						for (var i = 0; i < val.length; i++) {
    						var ms = parent.find('[value="' + val[i] + '"]');
							if(ms.prop('selected')==true){
								ms.prop('selected', false);
							}
							else{
								ms.prop('selected', true);
							}
						}
					}
					else {
						var ms = parent.find('[value="' + val + '"]');
						if(ms.prop('selected')==true) {
							ms.prop('selected', false);
						}
						else {
							ms.prop('selected', true);
						}
					}
				}
				else {
					elem.val(val);
				}
			}
			else {
				elem.html(val);
			}
		}
		else {
			console.error('Element $("' + elem.selector +'") was not found.');
		}
	}
})(jQuery);