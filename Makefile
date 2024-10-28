
# do everything we need at once
all: gather_jokes styles

# install all packages we need using NPM
dependencies:
	@cd ./src/ && \
	npm ci && \
	cd ..

# using Python, gather all the jokes from the various data files into a single file
gather_jokes:
	@python src/gather.py

# using Node.js, compile the stylesheets using only the required classes
styles: dependencies
	@cd ./src/ && \
	npx tailwindcss -i css/source.css -o ../public/css/app.css --minify && \
	cd ..
