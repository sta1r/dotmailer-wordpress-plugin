var $ = require('jQuery');

import './style.scss';
import './editor.scss';

import axios from 'axios';

dotsurvey = {
  externalConnectionTest: function() {
    //exernal js file created
  },
  resizeIframe: function(obj) {
   //resize height to fit content
  },
  getSurveyData: function() {
    axios.get('../wp-json/alastars/v1/surveys').then(function(output) {
      console.log(output);
    });
    return true;
  },
  urlIsValid: function(url) {
    return url.match(/(http|https):\/\/([a-z0-9-.]+\/)([0-9a-z-]+)/i) !== null;
  }
}
