window.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
window.isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
window.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
window.isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
window.isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
window.isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
window.isBlink = (isChrome || isOpera) && !!window.CSS;

window.onload = function (){
  console.log('Message 1337: Welcome developer');
};