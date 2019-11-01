(function() {
  'use strict';

  window.addEvent('domready', function(evt) {
    window.MyGW2BBCode = new GW2BBCode({
      containers: '#gw2bbcode-test',
      basePath: /\.html$/.test(location.pathname) ? '' : 'gw2bbcode/',
      tooltipOptions: {
        tooltipPosition: {
          offset: {
            y: -30
          }
        }
      },
      onLoad: function() {
        return document.documentElement.scrollTop = 99999;
      }
    });
    return (function() {
      var stats, testStats;
      return;
      stats = GW2BBCode.computeStats([
        {
          label: 'test',
          profession: 'Guardian',
          slot: 'Greatsword',
          type: void 0
        }
      ]);
      testStats = GW2BBCode.skillNamesToTemplateString(stats.test);
      $('test').set('text', testStats);
      return MyGW2BBCode.update();
    })();
  });

}).call(this);
