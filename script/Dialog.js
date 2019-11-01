
/*

Dialog.js
========

Copyright:      Colin Aarts <http://colinaarts.com>
License:        MIT <http://www.opensource.org/licenses/MIT>
Web/support:    n/a
*/


(function() {
  'use strict';

  window.Dialog = new Class({
    Implements: [Options, Events],
    options: {
      overlay: null,
      destination: document.body,
      containerElement: 'section',
      closeKeys: ['esc'],
      handleHash: true
    },
    initialize: function(container, options) {
      var _this = this;
      this.setOptions(Dialog.defaultOptions, options);
      this.container = (function() {
        if (typeOf(container) === 'element') {
          return container;
        } else if (typeOf(container[0]) === 'element') {
          return container[0];
        } else if (typeOf(container) === 'string') {
          container = new Element(this.options.containerElement);
          container.set('html', container);
          return container;
        } else {
          return null;
        }
      })();
      if (!this.container) {
        return null;
      }
      this.container.set('role', 'dialog');
      this.options.closeKeys && (function() {
        return _this.keyboard = new Keyboard({
          events: {
            'esc': function(evt) {
              return _this.hide();
            }
          }
        });
      })();
      this.container.store('Dialog', this);
      this.fireEvent('load', this);
      return this.options.handleHash && (function() {
        var hash;
        hash = window.location.hash.slice(1);
        if (hash === _this.container.get('id')) {
          return _this.show();
        }
      })();
    },
    show: function() {
      var _this = this;
      this.options.handleHash && window.history.pushState && (function() {
        var id;
        id = _this.container.get('id');
        if (!id) {
          return;
        }
        return window.history.pushState({}, '', "#" + id);
      })();
      this.container.set('aria-hidden', 'false');
      this.options.overlay && this.options.overlay.show();
      if (this.keyboard) {
        this.keyboard.activate();
      }
      window.document.documentElement.addClass('has-active-dialog');
      this.fireEvent('show', this);
      return this;
    },
    hide: function() {
      var _this = this;
      this.options.handleHash && window.history.pushState && (function() {
        return window.history.pushState({}, '', '#');
      })();
      this.container.set('aria-hidden', 'true');
      this.options.overlay && this.options.overlay.hide();
      if (this.keyboard) {
        this.keyboard.relinquish();
      }
      window.document.documentElement.removeClass('has-active-dialog');
      this.fireEvent('hide', this);
      return this;
    },
    toggle: function() {
      if ('true' === this.container.get('aria-hidden')) {
        this.show();
      } else if ('false' === this.container.get('aria-hidden')) {
        this.hide();
      }
      return this;
    }
  });

}).call(this);
