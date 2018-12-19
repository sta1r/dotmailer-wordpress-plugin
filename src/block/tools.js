var $ = require('jQuery');

dotsurvey = {
  externalConnectionTest: function() {
    //exernal js file created
  },
  resizeIframe: function(obj) {
   //resize height to fit content
  },
  urlIsValid: function(url) {
    return url.match(/(http|https):\/\/([a-z0-9-.]+\/)([0-9a-z-]+)/i) !== null;
  }
}
