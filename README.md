floodling
=========

jQuery plugin for auto-filling and selecting values

# How-To

Add it like any normal jQuery plugin.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.floodling.min.js"></script>
```

# Examples

## Textbox
**HTML**
```html
<form id="myForm">
	Foo <input type="text" name="foo" /><br />
	Bar <input type="text" name="bar" />
</form>
```

**Javascript**
```javascript
$(function() {
	// Sets the value of the foo textbox to "hello world"
	$('#myForm').floodling({
		foo: "hello world!"
		bar: "flooding the bar!"
	});
});
```

# Live Demo

You can view a live demo <a href="http://hyubs.com/floodling/">here</a> :)

# Works For

Floodling can populate the following form elements:

*	input
	*	button
	*	checkbox
	*	color
	*	date 
	*	datetime 
	*	datetime-local 
	*	email 
	*	file
	*	hidden
	*	image
	*	month 
	*	number 
	*	password
	*	radio
	*	range 
	*	reset
	*	search
	*	submit
	*	tel
	*	text
	*	time 
	*	url
	*	week
*	button
	*	button
	*	submit
	*	reset
*	textarea
*	select (single and multiple)