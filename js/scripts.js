'use strict';

// update URL hash when text is selected
(function (win, doc) {
    // cut the mustard
    if (!win.getSelection || !encodeURIComponent) {
        return;
    }
    function updateURL() {
        var selection = win.getSelection();
        if (selection) {
            var selectedText = selection.toString();
            if (selectedText.length > 1) {
                var hash = '#' + encodeURIComponent(selectedText);
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
    function getElementsByText(scope, text) {
        // iterate descendants of scope
        for (var all = scope.childNodes, index = 0, element, list = []; (element = all[index]); ++index) {
            // conditionally return element containing visible, whitespace-insensitive, case-sensitive text (a match)
            if (element.nodeType === 1 && (element.innerText || element.textContent || '').replace(/\s+/g, ' ').indexOf(text) !== -1) {
                list = list.concat(getElementsByText(element, text));
            }
        }

        // return scope (no match)
        return list.length ? list : scope;
    }

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

    var tools = document.createElement('div');
    tools.id = 'font-tools';
    tools.innerHTML = '' +
        '<button class="size smaller">-</button>' +
        '<button class="size reset">100</button>' +
        '<button class="size larger">+</button>' +
        '<button class="theme white">White</button>' +
        '<button class="theme sand">Sand</button>' +
        '<button class="theme black">Black</button>' +
    '';
    var parent = document.querySelector('main');
    parent.insertBefore(tools, parent.firstChild);
    function changeFont(size) {
        document.body.style.fontSize = size + '%';
        window.localStorage.fontsize = size;
    }
    var size = +window.localStorage.fontsize || 100;
    changeFont(size);
    function changeTheme(theme) {
        if (theme) {
            document.querySelector('main').className = theme;
            window.localStorage.theme = theme;
        }
    }
    changeTheme(window.localStorage.theme)
    document.querySelector('#font-tools').addEventListener('click', 
    function(ev) {
        ev.preventDefault();
        var target = ev.target;        
        if (target.classList.contains('size')) {
            if (target.classList.contains('larger')) { size += 5; }
            if (target.classList.contains('smaller')) { size -= 5; }
            if (target.classList.contains('reset')) { size = 100; }
            changeFont(size);
        }
        if (target.classList.contains('theme')) {
            changeTheme(target.className.replace('theme ',''));
        }
    });
})();
