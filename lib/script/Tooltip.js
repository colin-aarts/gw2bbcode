
/*

Tooltip.js
==========

Copyright:      Colin Aarts <http://colinaarts.com>
License:        MIT <http://www.opensource.org/licenses/MIT>
Web/support:    n/a
*/


(function() {
  'use strict';

  window.Tooltip = new Class({
    Implements: [Options, Events],
    options: {
      showEvents: ['mouseenter'],
      hideEvents: ['mouseleave'],
      showCallback: null,
      tooltipElement: 'div',
      tooltipContentSelector: null,
      tooltipPosition: {
        position: 'bottomCenter',
        edge: 'topCenter'
      },
      enabled: true
    },
    initialize: function(elements, options) {
      var _this = this;
      this.setOptions(Tooltip.defaultOptions, options);
      this.enabled = this.options.enabled;
      this.elements = elements;
      this.tooltip = new Element(this.options.tooltipElement);
      this.tooltip.addClass('tooltip');
      this.tooltip.set('aria-hidden', 'true');
      this.tooltip.set('role', 'tooltip');
      this.tooltip.inject(document.body);
      this.tooltipID = this.tooltip.get('id') || String.uniqueID();
      this.tooltip.set('id', this.tooltipID);
      this.elements.bindEvents(this.options.showEvents, function(evt, trigger) {
        var data;
        if (!_this.enabled) {
          return;
        }
        trigger || (trigger = evt.event.currentTarget);
        if (typeOf(_this.options.showCallback) === 'function') {
          data = _this.options.showCallback(trigger, _this.tooltip);
        }
        (function() {
          var target;
          target = _this.options.tooltipContentSelector ? _this.tooltip.getElement(_this.options.tooltipContentSelector) : _this.tooltip;
          return target.set('html', (data != null ? data.content : void 0) || trigger.get('title'));
        })();
        if (data != null ? data.position : void 0) {
          _this.tooltip.setStyles(data.position);
        } else {
          _this.tooltip.position(Object.merge({
            relativeTo: trigger
          }, _this.options.tooltipPosition));
        }
        _this.tooltip.set('aria-hidden', 'false');
        trigger.set('aria-describedby', _this.tooltipID);
        return _this.fireEvent('tipVisible', [_this, trigger, _this.tooltip]);
      });
      this.elements.bindEvents(this.options.hideEvents, function(evt, trigger) {
        if (!_this.enabled) {
          return;
        }
        trigger || (trigger = evt.event.currentTarget);
        _this.tooltip.set('aria-hidden', 'true');
        trigger.erase('aria-describedby');
        return _this.fireEvent('tipHidden', [_this, trigger, _this.tooltip]);
      });
      return this.fireEvent('load', this);
    },
    enable: function() {
      this.enabled = true;
      this.fireEvent('enable', this);
      return this;
    },
    disable: function() {
      this.enabled = false;
      this.fireEvent('disable', this);
      return this;
    },
    toggleEnabled: function() {
      this.enabled = !this.enabled;
      return this;
    }
  });

}).call(this);
