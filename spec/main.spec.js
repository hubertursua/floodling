describe('jquery.floodling', function () {
	beforeEach(function () {
		setUpHTMLFixture();
	});

	it('should be loaded in jQuery', function () {
		expect(typeof $.fn.floodling).toBe('function');
	});

	it('should be 2', function () {
		// $('body')
		// 	.append('<form id="myForm"><input type="text" name="f1"></form>');

		$('#myForm').floodling('f1', 'hello world');
		expect($('[name="f1"]', '#myForm').val()).toBe('hello world');
	});
});