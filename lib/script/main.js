
  'use strict';

  window.addEvent('domready', function(evt) {
    return window.MyGW2BBCode = new GW2BBCode({
      containers: '#test',
      basePath: 'lib/',
      tooltipOptions: {
        tooltipPosition: {
          offset: {
            y: -30
          }
        }
      }
    });
  });
