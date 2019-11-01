
/*

Overlay.js
==========

Copyright:      Colin Aarts <http://colinaarts.com>
License:        MIT <http://www.opensource.org/licenses/MIT>
Web/support:    n/a
*/


(function() {
  'use strict';

  window.Overlay = new Class({
    Implements: [Options, Events, Class.Occlude],
    options: {
      handleHash: true,
      container: 'div',
      destination: 'body'
    },
    initialize: function(options) {
      var _this = this;
      this.setOptions(Overlay.defaultOptions, options);
      this.container = (function() {
        var el;
        el = _this.options.container;
        if (typeOf(el) === 'element') {
          return container;
        } else if (typeOf(el[0]) === 'element') {
          return el[0];
        } else if (typeOf(el) === 'string') {
          return new Element(el);
        } else {
          return null;
        }
      })();
      if (!this.container) {
        return null;
      }
      if (this.occlude('Overlay', this.container)) {
        return this.occluded;
      }
      (function() {
        var destination;
        destination = _this.options.destination;
        if (typeOf(destination) === 'element') {

        } else if (typeOf(destination[0]) === 'element') {
          destination = destination[0];
        } else if (typeOf(destination) === 'string') {
          destination = $$(destination)[0];
        } else {
          destination = document.body;
        }
        _this.container.addClass('dialog-overlay');
        _this.container.set('aria-hidden', 'true');
        return _this.container.inject(destination);
      })();
      this.container.store('Overlay', this);
      return this.fireEvent('load', this);
    },
    show: function() {
      this.container.set('aria-hidden', 'false');
      window.document.documentElement.addClass('has-active-overlay');
      this.fireEvent('show', this);
      return this;
    },
    hide: function() {
      this.container.set('aria-hidden', 'true');
      window.document.documentElement.removeClass('has-active-overlay');
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
