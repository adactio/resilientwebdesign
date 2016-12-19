'use strict';

if ('serviceWorker' in navigator) {
    // If service workers are supported
    navigator.serviceWorker.register('/serviceworker.js');
} else if ('applicationCache' in window) {
    // Otherwise inject an iframe to use appcache
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', '/appcache.html');
    iframe.setAttribute('style', 'width: 0; height: 0; border: 0');
    document.querySelector('footer').appendChild(iframe);
}

function getElementsByText(scope, text) {
    // iterate descendants of scope
    for (var all = scope.childNodes, index = 0, element, list = []; (element = all[index]); ++index) {
        // conditionally return element containing visible, whitespace-insensitive, case-sensitive text (a match)
        if (element.nodeType === 1 && (element.innerText || element.textContent || '').replace(/\s+/g, ' ').indexOf(text.replace(/\s+/g, ' ')) !== -1) {
            list = list.concat(getElementsByText(element, text));
        }
    }

    // return scope (no match)
    return list.length ? list : scope;
}

// update URL hash when text is selected
(function (win, doc) {
    // cut the mustard
    if (!win.getSelection || !encodeURIComponent) {
        return;
    }
    function updateURL() {
        var selection = win.getSelection();
        if (selection) {
            var selectedText = selection.toString(),
                selectedNode = selection.anchorNode && selection.anchorNode.parentElement;
            if (selectedText.length > 1) {
                var hash = '#' + encodeURIComponent(selectedText);

                var elements = getElementsByText(document, selectedText),
                    length = elements.length,
                    which = length && elements.indexOf(selectedNode);

                if (which && which > 0) {
                    hash += '++' + which;
                }

                if(win.history && win.history.pushState) {
                    win.history.pushState(null, null, hash);
                } else if (win.location && win.location.hash) {
                    win.location.hash = hash;
                }
            }
        }
    }
    doc.body.addEventListener('mouseup', updateURL, false);
    doc.body.addEventListener('touchend', updateURL, false);
})(window, window.document);

// detect native/existing fragmention support
if (!('fragmention' in window.location)) (function () {
    // populate fragmention
    location.fragmention = location.fragmention || '';

    // return first element in scope containing case-sensitive text
    // on dom ready or hash change
    function onHashChange() {
        // do nothing if the dom is not ready
        if (!/e/.test(document.readyState)) return;

        // set location fragmention as uri-decoded text (from href, as hash may be decoded)
        var
        id = location.href.match(/#((?:#|%23)?)(.+)/) || [0,'',''],
        node = document.getElementById(id[1]+id[2]),
        match = decodeURIComponent(id[2].replace(/\+/g, ' ')).split('  ');

        location.fragmention = match[0];
        location.fragmentionIndex = parseFloat(match[1]) || 0;

        // conditionally remove stashed element fragmention attribute
        if (element) {
            element.removeAttribute('fragmention');

            // DEPRECATED: trigger style in IE8
            if (element.runtimeStyle) {
                element.runtimeStyle.windows = element.runtimeStyle.windows;
            }
        }

        // if fragmention exists
        if (!node && location.fragmention) {
            var
            // get all elements containing text (or document)
            elements = getElementsByText(document, location.fragmention),
            // get total number of elements
            length   = elements.length,
            // get index of element
            modulus  = length && location.fragmentionIndex % length,
            index    = length && modulus >= 0 ? modulus : length + modulus;

            // get element
            element = length && elements[index];

            // if element found
            if (element) {
                // scroll to element
                element.scrollIntoView();

                // set fragmention attribute
                element.setAttribute('fragmention', '');

                // DEPRECATED: trigger style in IE8
                if (element.runtimeStyle) {
                    element.runtimeStyle.windows = element.runtimeStyle.windows;
                }
            }
            // otherwise clear stashed element
            else {
                element = null;
            }
        }
    }

    var
    // DEPRECATED: configure listeners
    defaultListener = 'addEventListener',
    addEventListener = defaultListener in window ? [defaultListener, ''] : ['attachEvent', 'on'],
    // set stashed element
    element;

    // add listeners
    window[addEventListener[0]](addEventListener[1] + 'hashchange', onHashChange);
    document[addEventListener[0]](addEventListener[1] + 'readystatechange', onHashChange);

    onHashChange();
})();
