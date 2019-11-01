
/*

TabControl.js
=============

Copyright:		Colin Aarts <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	n/a
*/


(function() {
  'use strict';

  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  window.TabControl = new Class({
    Implements: [Options, Events, Class.Occlude],
    options: {
      data: null,
      startIndex: 0,
      tabContainerLocation: 'before',
      handleHash: true,
      allowCollapse: false,
      selectors: {
        tabContainer: null,
        tabs: null,
        panelContainer: null,
        panels: null,
        titles: null
      }
    },
    initialize: function(container, options) {
      var panel, _i, _len, _ref, _ref1,
        _this = this;
      this.setOptions(TabControl.defaultOptions, options);
      this.container = (function() {
        if (typeOf(container) === 'element') {
          return container;
        } else if (typeOf(container[0]) === 'element') {
          return container[0];
        } else {
          return null;
        }
      })();
      if (!this.container) {
        console.warn('TabControl: no element node found for argument #1 `container`. Aborting.');
        return;
      }
      if (this.occlude('TabControl', this.container)) {
        return this.occluded;
      }
      this.panelContainer = Function.solicit(function() {
        return _this.container.getElement(_this.options.selectors.panelContainer);
      }, function() {
        if (!_this.options.selectors.tabContainer) {
          return _this.container.getChildren()[0];
        }
      }, function() {
        var panelContainer;
        panelContainer = new Element('div');
        panelContainer.inject(_this.container);
        return panelContainer;
      });
      this.tabContainer = Function.solicit(function() {
        return _this.container.getElement(_this.options.selectors.tabContainer);
      }, function() {
        var tabContainer;
        tabContainer = new Element('ul');
        tabContainer.inject(_this.panelContainer, _this.options.tabContainerLocation);
        return tabContainer;
      });
      this.tabContainer.set('role', 'tablist');
      (function() {
        var panel, title, titles, _i, _len, _results;
        if (_this.options.selectors.titles) {
          titles = _this.container.getElements(_this.options.selectors.titles).dispose();
        } else {
          titles = (function() {
            var _i, _len, _ref, _results;
            _ref = this.getPanels();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              panel = _ref[_i];
              _results.push(panel.getElement(':heading').dispose());
            }
            return _results;
          }).call(_this);
        }
        _results = [];
        for (_i = 0, _len = titles.length; _i < _len; _i++) {
          title = titles[_i];
          _results.push(_this.tabContainer.adopt(_this.initTab(title.get('text'))));
        }
        return _results;
      })();
      _ref = this.getPanels();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        panel = _ref[_i];
        this.initPanel(null, panel);
      }
      this.tabContainer.bindEvents(['click:relay(> li)', 'keydown:relay(> li)'], function(evt, el) {
        if (evt.type === 'keydown' && evt.key !== 'enter') {
          return;
        }
        evt.stop();
        return _this.go(el.index());
      });
      if (this.options.data != null) {
        this.add(this.options.data);
      }
      if (this.options.handleHash) {
        this.go((_ref1 = this.getIndexForHash()) != null ? _ref1 : this.options.startIndex);
      } else {
        this.go(this.options.startIndex);
      }
      this.options.handleHash && window.addEvent('hashchange', function(evt) {
        var targetIndex;
        targetIndex = _this.getIndexForHash();
        if (targetIndex !== _this.getCurrentIndex()) {
          return _this.go(targetIndex);
        }
      });
      this.container.addClass('tab-control');
      return this.fireEvent('load');
    },
    initTab: function(title, nodeName) {
      var tab;
      if (nodeName == null) {
        nodeName = 'li';
      }
      tab = typeOf(nodeName) === 'element' ? nodeName : new Element(nodeName);
      tab.set({
        text: title,
        tabindex: 0,
        role: 'tab',
        'aria-selected': 'false'
      });
      return tab;
    },
    initPanel: function(content, nodeName) {
      var index, panel, panelID;
      if (nodeName == null) {
        nodeName = 'section';
      }
      panel = typeOf(nodeName) === 'element' ? nodeName : new Element(nodeName);
      panel.set('role', 'tabpanel');
      index = panel.index();
      panelID = (panel.get('id')) || String.uniqueID();
      if (!panel.get('id')) {
        panel.set('id', 'tab-control-' + panelID);
      }
      this.getTabs()[index].set('aria-controls', panelID);
      if (typeOf(content) === 'element' || typeOf(content) === 'elements') {
        panel.adopt(content);
      } else if (typeOf(content) === 'string') {
        panel.set('html', content);
      }
      return panel;
    },
    getTabs: function() {
      if (this.options.selectors.tabs) {
        return this.container.getElements(this.options.selectors.tabs);
      } else {
        return this.tabContainer.getChildren();
      }
    },
    getPanels: function() {
      if (this.options.selectors.panels) {
        return this.container.getElements(this.options.selectors.panels);
      } else {
        return this.panelContainer.getChildren();
      }
    },
    getLength: function() {
      return this.getTabs().length;
    },
    getCurrentIndex: function() {
      var _ref;
      return (_ref = this.getTabs().filter('[aria-selected="true"]')[0]) != null ? _ref.index() : void 0;
    },
    go: function(index, silent) {
      var callbackResult, count, isCurrentIndex, panels, tabs,
        _this = this;
      if (silent == null) {
        silent = false;
      }
      count = this.getLength();
      if (!(index != null) || !((0 <= index && index < count))) {
        console.warn("TabControl: invalid index for TabControl::go (" + index + ")");
        return this;
      }
      isCurrentIndex = index === this.getCurrentIndex();
      tabs = this.getTabs();
      panels = this.getPanels();
      if (this.options.beforeNavigate && !silent) {
        callbackResult = this.options.beforeNavigate(panels[index], panels[this.getCurrentIndex()]);
        if (callbackResult === false) {
          return this;
        }
      }
      tabs.set('aria-selected', 'false');
      tabs.set('tabindex', '0');
      panels.set('aria-hidden', 'true');
      if ((!isCurrentIndex) || (isCurrentIndex && !this.options.allowCollapse)) {
        tabs[index].set('aria-selected', 'true');
        tabs[index].set('tabindex', '-1');
        panels[index].set('aria-hidden', 'false');
      }
      this.options.handleHash && !silent && (function() {
        var hash, id, item, _ref;
        if (!_this.container.hasClass('tab-control')) {
          if (!(_ref = TabControl.initialHash, __indexOf.call((function() {
            var _i, _len, _ref1, _results;
            _ref1 = this.getPanels();
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              item = _ref1[_i];
              _results.push(item.get('id'));
            }
            return _results;
          }).call(_this), _ref) >= 0)) {
            return;
          }
        }
        id = panels[index].get('id');
        hash = /^tab-control-/.test(id) ? '' : id;
        if (window.history.pushState) {
          return window.history.pushState(null, '', "#" + hash);
        } else {
          return location.hash = hash;
        }
      })();
      !silent && this.fireEvent('navigate', [panels[index], panels[this.getCurrentIndex()]]);
      return this;
    },
    add: function(title, content, index) {
      var item, length, panel, panels, tab, tabs, _i, _len;
      if (typeOf(title) === 'array') {
        for (_i = 0, _len = title.length; _i < _len; _i++) {
          item = title[_i];
          this.add(item.title, item.content, item.index);
        }
        return;
      }
      length = this.getLength();
      (index != null) || (index = length);
      if (typeOf(index) !== 'number' || index < 0 || index > length) {
        return false;
      }
      tabs = this.getTabs();
      panels = this.getPanels();
      tab = this.initTab(title);
      panel = this.initPanel(content);
      if (index === 0) {
        tab.inject(this.tabContainer, 'top');
        panel.inject(this.panelContainer, 'top');
      } else if (index === length) {
        tab.inject(tabs[length - 1], 'after');
        panel.inject(panels[length - 1], 'after');
      } else {
        tab.inject(tabs[index - 1], 'after');
        panel.inject(panels[index - 1], 'after');
      }
      this.fireEvent('add', [panels[index]]);
      return this;
    },
    remove: function(index, activePanel) {
      var indices, panels, removedActivePanel, removedPanels, tabs,
        _this = this;
      removedPanels = new Elements();
      removedActivePanel = false;
      indices = index;
      panels = this.getPanels();
      tabs = this.getTabs();
      if (typeOf(indices) !== 'array') {
        indices = [indices];
      }
      indices.each(function(index) {
        if (index === _this.getCurrentIndex()) {
          removedActivePanel = true;
        }
        removedPanels.push(panels[index].dispose());
        return tabs[index].destroy();
      });
      if (removedActivePanel) {
        if (!(activePanel != null) || !(activePanel in this.getPanels())) {
          activePanel = 0;
        }
        this.go(activePanel);
      }
      if (typeOf(index) === 'number') {
        removedPanels = removedPanels[0];
      }
      this.fireEvent('remove', [removedPanels]);
      return removedPanels;
    },
    getIndexForHash: function(hash) {
      var index, target;
      hash || (hash = location.hash);
      if (!hash) {
        return null;
      }
      target = (this.getPanels().filter(hash))[0];
      if (!target) {
        return null;
      }
      index = target.index();
      return index != null ? index : null;
    }
  });

  TabControl.initialHash = window.location.hash.slice(1);

  if (!(Element.NativeEvents.hashchange != null)) {
    Element.NativeEvents.hashchange = 2;
  }

  if (!(Element.Events.hashchange != null)) {
    Element.Events.hashchange = {
      base: 'hashchange',
      condition: function(evt) {
        evt.oldURL = evt.event.oldURL;
        evt.newURL = evt.event.newURL;
        return true;
      }
    };
  }

}).call(this);
