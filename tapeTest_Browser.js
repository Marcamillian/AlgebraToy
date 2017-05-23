browserify tapeTest.js > bundle.js;
echo '<script src="bundle.js></script>' > test.html;
live-server