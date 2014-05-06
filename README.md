# jQuery floodling

[![Build Status](https://travis-ci.org/hyubs/floodling.svg)](https://travis-ci.org/hyubs/floodling)

jQuery plugin for auto-filling and selecting values of form elements.

## Demo ##

### In my sandbox ###
You can view a live demo <a href="http://hyubs.com/floodling/">here</a> :)

### jsFiddle ###
Or, you can play around with the code on <a href="http://jsfiddle.net/hyubs/chm5P/">jsFiddle</a>


## Usage ##

### Referencing ###
Add it like any normal jQuery plugin.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.floodling.min.js"></script>
```
### Setting the value of a single element ###

#### With scope selector ####
You can use a scope selector for your form or div. The first parameter is the name attribute of the form element and the second attribute is the value you want to set.

**Syntax**
```
$(__scope_selector__).floodling(__name__, __val__);
```

**Example**
```html
<form id="myForm">
	Foo <input type="text" name=""myTextbox" />
</form>
```

```javascript
$('#myForm').floodling('myTextbox', 'bar');
```

#### Element selector ####
You can also use the selector to choose the form element and pass the value as the first parameter.

**Syntax**
```
$(__element_selector__).floodling(__val__);
```

**Example**
```html
Foo <input type="text" name="myTextbox" id="myText" />
```

```javascript
$('#myText').floodling('bar');
```

### Setting the values of multiple elements ###

You can set the values of multiple form elements by passing a JSON object.

**Syntax**
```
$(__scope_selector__).floodling(__json__);
```

**Example**

```html
<form id="myForm">
	Foo 1 <input type="text" name="f1" /><br />
	Foo 2 <textarea name="f2"></textarea><br />
	Foo 3<br />
	<select name="f3">
		<option>boo</option>
		<option>foo</option>
		<option>gloo</option>
		<option>doo</option>
	</select>
</form>
```

```javascript
$('#myForm').floodling({
	f1: "hello",
	f2: "bar",
	f3: "gloo"
});
```

### Setting multiple values of an element ###

This is applicable to multiple selects and checkbox groups.

Follow the same syntax as above but pass an array.

#### Setting the value of a single element - With scope selector ####

```html
<form id="myForm">
	Foo 1<br />
	<select name="f1[]" id="myMulti" multiple="multiple">
		<option value="boo">boo</option>
		<option value="foo">foo</option>
		<option value="gloo">gloo</option>
		<option value="doo">doo</option>
	</select><br />

	Foo 2<br />
	<input type="checkbox" name="f2[]" value="boo" /> boo<br />
	<input type="checkbox" name="f2[]" value="foo" /> foo<br />
	<input type="checkbox" name="f2[]" value="gloo" /> gloo<br />
	<input type="checkbox" name="f2[]" value="doo" /> doo
</form>
```

```javascript
$('#myForm').floodling('f1', ["boo", "gloo"]);
$('#myForm').floodling('f2', ["foo", "gloo"]);
```

#### Setting the value of a single element - Element selector ####

```html
<form id="myForm">
	Foo 1<br />
	<select name="f1[]" id="myMulti" multiple="multiple">
		<option value="boo">boo</option>
		<option value="foo">foo</option>
		<option value="gloo">gloo</option>
		<option value="doo">doo</option>
	</select><br />

	Foo 2<br />
	<input type="checkbox" name="f2[]" class="f2" value="boo" /> boo<br />
	<input type="checkbox" name="f2[]" class="f2" value="foo" /> foo<br />
	<input type="checkbox" name="f2[]" class="f2" value="gloo" /> gloo<br />
	<input type="checkbox" name="f2[]" class="f2" value="doo" /> doo
</form>
```

```javascript
$('#myForm').floodling(["boo", "gloo"]);
$('.f2').floodling(["foo", "doo"]);
```

#### Setting the values of multiple elements ####

```html
<form id="myForm">
	Foo 1<br />
	<select name="f1[]" id="myMulti" multiple="multiple">
		<option value="boo">boo</option>
		<option value="foo">foo</option>
		<option value="gloo">gloo</option>
		<option value="doo">doo</option>
	</select><br />

	Foo 2<br />
	<input type="checkbox" name="f2[]" value="boo" /> boo<br />
	<input type="checkbox" name="f2[]" value="foo" /> foo<br />
	<input type="checkbox" name="f2[]" value="gloo" /> gloo<br />
	<input type="checkbox" name="f2[]" value="doo" /> doo
</form>
```

```javascript
$('#myForm').floodling({
	f1: ["boo", "gloo"],
	f2: ["foo", "gloo"]
});
```



## Works For ##

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
	*	password _(not recommended, but hey, it works!)_
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


## Testing ##

Run `npm install` and `bower install` to get all test-related modules.

To run a test manually, open locally in your brower `test/index.html`.

To run the headless browser test, run `npm test`.

## License ##

[ISC License](https://github.com/hyubs/floodling/blob/master/LICENSE)


## Contributors ##

*	[beatobongco](https://github.com/beatobongco)
