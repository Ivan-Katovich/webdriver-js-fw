# webdriver-js-fw

Framework based on selenium-webdriver + cucumber

## Setup framework

Preconditions: Ruby, Python, Node.js

    npm install -g gulp

Setup:

    npm install

## Run tests:

    gulp cucumber --argument=any_value

Arguments:

    --browser=(chrome or firefox or phantomjs)
    --view=(mobile or tabletP or tabletL or desktop)

## Run in parallel

Arguments:

    --threads=%any number% (3 by default)
    --browsers=chrome/firefox/phantomjs (chrome or firefox or phantomjs could be pasted in each gap, chrome by default)
    --view=mobile/tabletL/phantomjs (mobile or tabletP or tabletL or desktop could be pasted in each gap, desktop by default)