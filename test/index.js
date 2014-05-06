var Browser = require("zombie");
var chalk   = require('chalk');
var S       = require("string");
var path    = require("path");
var url     = "file://" + path.join(__dirname, '..', 'test', 'index.html');
var browser = new Browser();

browser.visit(url, function (e) {
	if (browser.success) {
		var bar      = browser.querySelector('.alert .bar').innerHTML;
		var failures = browser.queryAll('.failure-list .failures .spec-detail');

		if (failures.length > 0) {
			console.log(chalk.red('FAIL'), bar);

			for (var i in failures) {
				var failure     = failures[i];
				var description = S(failure.querySelector('.description').innerHTML).stripTags().s;
				var message     = failure.querySelector('.messages .result-message').innerHTML;
				var stackTrace  = "    " + S(failure.querySelector('.messages .stack-trace').innerHTML).replaceAll("\n", "\n    ").s;

				console.log(chalk.cyan(description));
				console.log(chalk.yellow(message));
				console.log(chalk.grey(stackTrace));
			}

			process.exit(1);
		} else {
			console.log(chalk.green('OK'), bar);
			process.exit(0);
		}
	} else {
		console.log(chalk.red('FAIL'), 'Test browser did not setup properly');
		console.log(chalk.grey(e));
		process.exit(1);
	}
});
