'use strict';

// Import Jake's polyfill for async waitUntil
importScripts('/js/async-waituntil.js');

const version = 'v0.041::';
const staticCacheName = version + 'static';

function updateStaticCache() {
    return caches.open(staticCacheName)
    .then( cache => {
        // These items won't block the installation of the Service Worker
        cache.addAll([
            '/fonts/etbookot-italic-webfont.woff2',
            '/fonts/etbookot-bold-webfont.woff2',
            '/chapter1/images/small/enquire-within-upon-everything.jpg',
            '/chapter1/images/small/information-management.jpg',
            '/chapter1/images/small/line-mode-browser.jpg',
            '/chapter1/images/small/sir-tim-berners-lee.jpg',
            '/chapter1/images/small/submarine-cable-map.jpg',
            '/chapter1/images/small/sundial.jpg',
            '/chapter1/images/small/vague-but-exciting.jpg',
            '/chapter1/images/medium/enquire-within-upon-everything.jpg',
            '/chapter1/images/medium/information-management.jpg',
            '/chapter1/images/medium/line-mode-browser.jpg',
            '/chapter1/images/medium/sir-tim-berners-lee.jpg',
            '/chapter1/images/medium/submarine-cable-map.jpg',
            '/chapter1/images/medium/sundial.jpg',
            '/chapter1/images/medium/vague-but-exciting.jpg',
            '/chapter1/images/large/enquire-within-upon-everything.jpg',
            '/chapter1/images/large/information-management.jpg',
            '/chapter1/images/large/line-mode-browser.jpg',
            '/chapter1/images/large/sir-tim-berners-lee.jpg',
            '/chapter1/images/large/submarine-cable-map.jpg',
            '/chapter1/images/large/sundial.jpg',
            '/chapter1/images/large/vague-but-exciting.jpg',
            '/chapter2/images/small/zengarden.png',
            '/chapter2/images/medium/zengarden.png',
            '/chapter2/images/large/zengarden.png',
            '/chapter3/images/small/book-of-kells.jpg',
            '/chapter3/images/small/gutenberg-bible.jpg',
            '/chapter3/images/small/iphone.jpg',
            '/chapter3/images/small/jan-tchichold-medieval-manuscript-framework.png',
            '/chapter3/images/medium/book-of-kells.jpg',
            '/chapter3/images/medium/gutenberg-bible.jpg',
            '/chapter3/images/medium/iphone.jpg',
            '/chapter3/images/medium/jan-tchichold-medieval-manuscript-framework.png',
            '/chapter3/images/large/book-of-kells.jpg',
            '/chapter3/images/large/gutenberg-bible.jpg',
            '/chapter3/images/large/iphone.jpg',
            '/chapter3/images/large/jan-tchichold-medieval-manuscript-framework.png',
            '/chapter4/images/small/jon-postel.jpg',
            '/chapter4/images/small/nasa.png',
            '/chapter4/images/medium/jon-postel.jpg',
            '/chapter4/images/medium/nasa.png',
            '/chapter4/images/large/jon-postel.jpg',
            '/chapter4/images/large/nasa.png',
            '/chapter5/images/small/shearing-layers.jpg',
            '/chapter5/images/medium/shearing-layers.jpg',
            '/chapter5/images/large/shearing-layers.jpg',
            '/chapter6/images/small/duck.jpg',
            '/chapter6/images/small/news.png',
            '/chapter6/images/small/photosharing.png',
            '/chapter6/images/small/socialnetworks.png',
            '/chapter6/images/small/writing.png',
            '/chapter6/images/medium/duck.jpg',
            '/chapter6/images/medium/news.png',
            '/chapter6/images/medium/photosharing.png',
            '/chapter6/images/medium/socialnetworks.png',
            '/chapter6/images/medium/writing.png',
            '/chapter6/images/large/duck.jpg',
            '/chapter6/images/large/news.png',
            '/chapter6/images/large/photosharing.png',
            '/chapter6/images/large/socialnetworks.png',
            '/chapter6/images/large/writing.png',
            '/chapter7/images/small/devices.jpg',
            '/chapter7/images/small/grace-hopper.jpg',
            '/chapter7/images/small/future-friendly.png',
            '/chapter7/images/medium/devices.jpg',
            '/chapter7/images/medium/grace-hopper.jpg',
            '/chapter7/images/medium/future-friendly.png',
            '/chapter7/images/large/devices.jpg',
            '/chapter7/images/large/grace-hopper.jpg',
            '/chapter7/images/large/future-friendly.png',
            '/author/images/small/jeremykeith.jpg',
            '/author/images/medium/jeremykeith.jpg',
            '/author/images/large/jeremykeith.jpg',
            '/favicon.ico',
            '/manifest.json'
        ]);
        // These items must be cached for the Service Worker to complete installation
        return cache.addAll([
            '/',
            '/offline/',
            '/introduction/',
            '/chapter1/',
            '/chapter2/',
            '/chapter3/',
            '/chapter4/',
            '/chapter5/',
            '/chapter6/',
            '/chapter7/',
            '/author/',
            '/contents/',
            '/index/',
            '/css/styles.css',
            '/js/scripts.js',
            '/fonts/etbookot-roman-webfont.woff2'
        ]);
    });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
    .then( keys => {
        return Promise.all(keys
            .filter(key => key.indexOf(version) !== 0)
            .map(key => caches.delete(key))
        );
    });
}

self.addEventListener('install', event => {
    event.waitUntil(
        updateStaticCache()
        .then( () => self.skipWaiting() )
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        clearOldCaches()
        .then( () => self.clients.claim() )
    );
});

self.addEventListener('fetch', event => {
    let request = event.request;
    // Look in the cache first, fall back to the network
    event.respondWith(
        // CACHE
        caches.match(request)
        .then( responseFromCache => {
            // Did we find the file in the cache?
            if (responseFromCache) {
                // If so, fetch a fresh copy from the network in the background
                // (using the async waitUntil polyfill)
                event.waitUntil(
                    // NETWORK
                    fetch(request)
                    .then( responseFromFetch => {
                        // Stash the fresh copy in the cache
                        caches.open(staticCacheName)
                        .then( cache => {
                            cache.put(request, responseFromFetch);
                        });
                    })
                );
                return responseFromCache
            }
            // NETWORK
            // If the file wasn't in the cache, make a network request
            return fetch(request)
            .then( responseFromFetch => {
                // Stash a fresh copy in the cache in the background
                // (using the async waitUntil polyfill)
                let responseCopy = responseFromFetch.clone();
                event.waitUntil(
                    caches.open(staticCacheName)
                    .then( cache => {
                        cache.put(request, responseCopy);
                    })
                );
                return responseFromFetch;
            })
            .catch( () => {
                // OFFLINE
                // If the request is for an image, show an offline placeholder
                if (request.headers.get('Accept').includes('image')) {
                    return new Response(
                        '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>',
                        {
                            headers: {
                                'Content-Type': 'image/svg+xml',
                                'Cache-Control': 'no-store'
                            }
                        }
                    );
                }
                // If the request is for a page, show an offline message
                if (request.headers.get('Accept').includes('text/html')) {
                    return caches.match('/offline/');
                }
            })
        })
    );
});
