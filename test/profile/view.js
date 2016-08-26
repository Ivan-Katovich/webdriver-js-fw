'use strict';

var view = {
    chrome: {
        mobile: '--window-size=500,800',
        tabletP: '--window-size=768,1024',
        tabletL: '--window-size=1024,768',
        desktop: '--window-size=1280,800'
    },
    other: {
        mobile: {
            width: 500,
            height: 800
        },
        tabletP: {
            width: 768,
            height: 1024
        },
        tabletL: {
            width: 1024,
            height: 768
        },
        desktop: {
            width: 1280,
            height: 800
        }
    }
};

module.exports = view;