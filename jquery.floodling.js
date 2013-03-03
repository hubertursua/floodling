/**
 * jQuery floodling v1.1.6 https://github.com/hyubs/floodling
 * Written by Hyubs Ursua
 * Copyright (c) 2013
 * Website: https://github.com/hyubs/floodling
 * License: http://www.opensource.org/licenses/mit-license.php
 */
 /**
  * Changelog:
  * 1. Changed instances of attr to prop, applied necessary corrections.
  * 2. Changed Object.prototype.toString.call to typeof
  * 3. Fixed bug with radio button by allowing the passing of "name" parameter.
  * 4. Allowed passing of arrays only for multiple selects and checkboxes
  * 5. Removed var nameLen = name.length; from else if tag=='select', multiple
  * 6. Using floodling on an already selected or checked value (for multi selects and checkboxes) now deselects it
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
					//changed to .prop("checked", true) because prop was added in jQuery 1.6 and attr does not work well anymore
					parent.find('[name="' + name + '"][value="' + val + '"]').prop("checked", true);
				}
				else if(type == 'checkbox') {
					var nameLen = name.length;
					if(nameLen > 2 && name.substring(nameLen - 2, nameLen) == '[]') {
						if(val instanceof Array){
							for (var i = 0; i < val.length; i++){
								var cbox = parent.find('[name="' + name + '"][value="' + val[i] + '"]');
								if(cbox.prop('checked')==true){
									cbox.prop('checked', false);
								}
								else{
									cbox.prop('checked', true);
								}
							}
						}
						else{
							var cbox = parent.find('[name="' + name + '"][value="' + val + '"]');
							if(cbox.prop('checked')==true){
								cbox.prop('checked', false);
							}
							else{
								cbox.prop('checked', true);
							}
						}					
					}
					else {
						if(val != false) {
							elem.prop('checked', true);
						}
						else {
							elem.removeAttr('checked');
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
					if(val instanceof Array)
					{
						for (var i = 0; i < val.length; i++) {
    						
    						var ms = parent.find('[value="' + val[i] + '"]');
							if(ms.prop('selected')==true){
								ms.prop('selected', false);
							}
							else{
								ms.prop('selected', true);
							}
							//selectVal.push(val[i]);
							//elem.val(selectVal);
						}
					}
					else{
						var ms = parent.find('[value="' + val + '"]');
							if(ms.prop('selected')==true){
								ms.prop('selected', false);
							}
							else{
								ms.prop('selected', true);
							}
						//selectVal.push(val);
						//elem.val(selectVal);
					}
					
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