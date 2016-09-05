# webdriver-js-fw

Framework based on selenium-webdriver + cucumber

## Setup framework

Preconditions:

    Ruby,
    Python,
    Node.js,
    cURL(for run browsermob server),
    browsermob-proxy(run on PC:
        bin/browsermob-proxy -port 8080
        curl -X POST http://localhost:8080/proxy
    )

    npm install -g gulp

Setup:

    npm install

## Run tests:

    gulp cucumber --argument=any_value

Arguments:

    --browser=(chrome or firefox or phantomjs) proxy works only with chrome TODO: firefox, phantomjs
    --view=(mobile or tabletP or tabletL or desktop)