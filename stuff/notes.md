document.getElementById('myElement');

document.getElementsByClassName('myElement');

document.getElementsByTagName('div');

// data attribute - i never user these?
document.querySelectorAll('[data-foo-bar="someval"]');

// pseudo class - select 'invalid' ,myForm elements
document.querySelectorAll('#myForm :invalid');

// children - get children of 'myParent'
// NOTE: This will include comment and text nodes as well.
document.getElementById('myParent').childNodes;
// IE 9+ (ignores comment & text nodes).
document.getElementById('myParent').children;

// children with certain attrib
document.querySelector('#myParent > [ng-click]');


// descendents - select all anchore under #myParent
document.querySelectorAll('#myParent A');

//  excluding  - select divs except with class of 'ignore'
document.querySelectorAll('DIV:not(.ignore)');

// slect all divs, a's and script elements
document.querySelectorAll('DIV, A, SCRIPT');

window.$ = function(selector) {
    var selectorType = 'querySelectorAll';

    if (selector.indexOf('#') === 0) {
        selectorType = 'getElementById';
        selector = selector.substr(1, selector.length);
    }

    return document[selectorType](selector);
};
