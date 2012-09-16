build:
	./node_modules/.bin/jade index.jade

run: build
	chromium-browser index.html
