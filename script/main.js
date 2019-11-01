(function() {
  'use strict';

  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty;

  window.app = {};

  window.addEvent('domready', function(evt) {
    window.app.demoBBCode = new GW2BBCode($('demo-skills'), {
      basePath: 'lib',
      tooltipOptions: {
        tooltipPosition: {
          offset: {
            y: -30
          }
        }
      }
    });
    window.app.allSkillsBBCode = new GW2BBCode($('all-skills'), {
      basePath: 'lib',
      tooltipOptions: {
        tooltipPosition: {
          offset: {
            y: -30
          }
        }
      },
      start: false
    });
    TabControl.prototype.addEvent('load', function() {
      var currentIndex, index, maxHeight, panels, _fn, _i, _ref,
        _this = this;
      currentIndex = this.getCurrentIndex();
      maxHeight = 0;
      panels = this.getPanels();
      _fn = function() {
        var height;
        _this.go(index, true);
        height = panels[index].getComputedSize().totalHeight;
        if (height > maxHeight) {
          return maxHeight = height;
        }
      };
      for (index = _i = 0, _ref = this.getLength(); 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
        _fn();
      }
      this.panelContainer.setStyle('height', maxHeight);
      return this.go(currentIndex, true);
    });
    window.app.globalOverlay = new Overlay();
    window.app.docsDialog = new Dialog($('docs'), {
      overlay: window.app.globalOverlay
    });
    window.app.allSkillsDialog = new Dialog($('all-skills'), {
      overlay: window.app.globalOverlay,
      onLoad: function() {
        var aSkillNames, eTarget;
        eTarget = this.container.getElement('p');
        aSkillNames = Object.keys(GW2BBCode.skillData);
        return eTarget.set('text', GW2BBCode.skillNamesToTemplateString(aSkillNames));
      },
      onShow: function() {
        return window.app.allSkillsBBCode.update();
      }
    });
    new TabControl($('overview'), {
      beforeNavigate: function(panel, tab) {
        return;
        if ('docs-ref' === panel.get('id')) {
          window.app.docsDialog.show();
          return false;
        }
      }
    });
    window.app.renderDemo = function(nLineCount) {
      var aRandNums, aSkills, eTarget, n, nMaxDisplayCount, nSkillCount;
      nLineCount || (nLineCount = 2);
      eTarget = $('demo-skills');
      nMaxDisplayCount = (function() {
        var nAvailWidth, nSkillWidth, nSkillsPerLineCount, nSpaceWidth;
        nAvailWidth = eTarget.getComputedSize().width;
        nSkillWidth = (function() {
          eTarget.set('text', '#{Strike}');
          app.demoBBCode.update();
          return (eTarget.getElement('[data-skill]')).getComputedSize().width;
        })();
        nSpaceWidth = (function() {
          var nPos1, nPos2;
          eTarget.set('text', '#{Strike} #{Strike}');
          app.demoBBCode.update();
          nPos1 = (eTarget.getElement('[data-skill]')).getPosition().x;
          nPos2 = (eTarget.getElement('[data-skill] + [data-skill]')).getPosition().x;
          return nPos2 - nPos1 - nSkillWidth;
        })();
        nSkillsPerLineCount = Math.floor((nAvailWidth + nSpaceWidth) / (nSkillWidth + nSpaceWidth));
        return nSkillsPerLineCount * nLineCount;
      })();
      nSkillCount = GW2BBCode.computeStats().skillCount;
      aRandNums = [];
      while (aRandNums.length < nMaxDisplayCount) {
        n = Number.random(0, nSkillCount - 1);
        if (__indexOf.call(aRandNums, n) >= 0) {
          continue;
        } else {
          aRandNums.push(n);
        }
      }
      aSkills = [];
      (function() {
        var nCount, oSkill, _ref, _results;
        nCount = 0;
        _ref = GW2BBCode.skillData;
        _results = [];
        for (oSkill in _ref) {
          if (!__hasProp.call(_ref, oSkill)) continue;
          if (aRandNums.contains(nCount)) {
            aSkills.push("\#{" + oSkill + "}");
          }
          _results.push(nCount++);
        }
        return _results;
      })();
      aSkills.shuffle();
      eTarget.set('text', aSkills.join(' '));
      return app.demoBBCode.update();
    };
    (function() {
      var eList;
      eList = new Element('ul.toolbar');
      (function() {
        var eButton, eListItem;
        eListItem = new Element('li');
        eButton = new Element('span', {
          id: 'demo-all-skills',
          role: 'button',
          tabindex: '0',
          'aria-controls': 'all-skills',
          title: 'View all available skills (heavy!)',
          text: 'View all available skills (heavy!)'
        });
        eButton.bindEvents(['click', 'keydown'], function(evt) {
          if (evt.type === 'keydown' && evt.key !== 'enter') {
            return;
          }
          evt.stop();
          return window.app.allSkillsDialog.show();
        });
        eListItem.adopt(eButton);
        return eList.adopt(eListItem);
      })();
      (function() {
        var eButton, eListItem;
        eListItem = new Element('li');
        eButton = new Element('span', {
          id: 'demo-renew',
          role: 'button',
          tabindex: '0',
          'aria-controls': 'demo-skills',
          title: 'Renew the selection of random skills',
          text: 'Renew the selection of random skills'
        });
        eButton.bindEvents(['click', 'keydown'], function(evt) {
          if (evt.type === 'keydown' && evt.key !== 'enter') {
            return;
          }
          evt.stop();
          return window.app.renderDemo(3);
        });
        eListItem.adopt(eButton);
        return eList.adopt(eListItem);
      })();
      return $$('#demo > header')[0].adopt(eList);
    })();
    window.app.renderDemo(3);
    (function() {
      var eStats, eTarget;
      eTarget = $$('#stats > p')[0];
      eStats = GW2BBCode.getStatsAsHTML(true);
      return eStats.replaces(eTarget);
    })();
    return $$('#download-lib a, #download-src a').addEvent('click', function(evt) {
      var file, type;
      type = 'download-lib' === this.getParent().get('id') ? 'lib' : 'src';
      file = (new URI(this.get('href'))).get('file');
      return _gaq.push(['_trackEvent', 'Downloads', type, file]);
    });
  });

}).call(this);
