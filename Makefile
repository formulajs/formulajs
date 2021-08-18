webpack = webpack --mode production
jshint = jshint
mocha = mocha
browserify = browserify
http-server = http-server
codeclimate-test-reporter = codeclimate-test-reporter

build:
	@$(webpack)
	@$(webpack) --config .config/production.js

test:
	@$(mocha) --exit

test-browser:
	@mkdir -p tmp
	@$(browserify) test/index.js -s formulajs > tmp/test.js
	@$(http-server) -p 8088 -s -o

test-watch:
	@$(mocha) --watch

lint:
	@$(jshint) lib/*.js

coverage:
	@mkdir -p coverage
	@$(mocha) -r blanket -u tdd -R mocha-lcov-reporter > coverage/lcov.info
	@$(mocha) -u tdd -R html-cov -r blanket > coverage/coverage-report.html

package: clean build
	rm -rf *.tgz || true
	@npm pack

watch:
	@$(mocha) -u tdd -R mocha-spec-cov -r blanket -w

clean:
	@rm -rf build/
	@rm -f coverage-report.html

.PHONY: build clean coverage test watch
