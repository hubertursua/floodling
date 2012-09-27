floodling
=========

jQuery plugin for auto-filling and selecting values

# How-To

Add it like any normal jQuery plugin.

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script type="text/javascript" src="jquery.floodling.min.js"></script>
```

# Quick Example

**HTML**
```html
<form id="myForm">
	Foo <input type="text" name="foo" />
</form>
```

**Javascript**
```javascript
$(function() {
	$('#myForm').floodling('foo', "hello world!");
});
```

# More Examples

See examples.html :)