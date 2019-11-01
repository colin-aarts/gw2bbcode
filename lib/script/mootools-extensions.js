
/*

mootools-extensions.js
======================
A collection of extensions to MooTools

Copyright:		Colin Aarts <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	n/a
*/


(function() {
  'use strict';

  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Slick.definePseudo('heading', function() {
    var els, _ref;
    els = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    return _ref = this.get('tag'), __indexOf.call(els, _ref) >= 0;
  });

  Slick.definePseudo('section', function() {
    var els, _ref;
    els = ['section', 'article', 'aside', 'nav'];
    return _ref = this.get('tag'), __indexOf.call(els, _ref) >= 0;
  });

  String.implement('repeat', function(times, delimiter) {
    if (delimiter == null) {
      delimiter = '';
    }
    if (--times) {
      return this + delimiter + this.repeat(times, delimiter);
    } else {
      return this;
    }
  });

  Function.extend('solicit', function() {
    var fn, result, results, _i, _len, _ref;
    results = [];
    _ref = Array.slice(arguments);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      fn = _ref[_i];
      result = fn();
      if (result != null) {
        results.push(result);
        break;
      }
    }
    if (results.length) {
      return results.pop();
    } else {
      return null;
    }
  });

  Element.implement('index', function() {
    return this.getParent().getChildren().indexOf(this);
  });

  [Events, Element, Window, Document].invoke('implement', 'bindEvents', function(events, fn) {
    var event, _i, _len, _results;
    if (typeOf(events) === 'string') {
      events = [events];
    }
    _results = [];
    for (_i = 0, _len = events.length; _i < _len; _i++) {
      event = events[_i];
      _results.push(this.addEvent(event, fn));
    }
    return _results;
  });

  Element.implement('cloneEventsDeep', function(from, type) {
    if (this.getChildren().length > 0) {
      this.getChildren().each(function(item, index) {
        return item.cloneEventsDeep(from.getChildren()[index], type);
      });
      this.cloneEvents(from, type);
    } else {
      this.cloneEvents(from, type);
    }
    return this;
  });

  Elements.implement('equalize', function(apply) {
    var el, retval, _i, _len;
    if (apply == null) {
      apply = true;
    }
    retval = {
      maxHeight: 0,
      maxTotalHeight: 0
    };
    this.each(function(el) {
      var prevHeight, size;
      prevHeight = el.style.height;
      el.setStyle('height', 'auto');
      size = el.measure(function() {
        return this.getComputedSize();
      });
      if (size.height > retval.maxHeight) {
        retval.maxHeight = size.height;
      }
      if (size.totalHeight > retval.maxTotalHeight) {
        retval.maxTotalHeight = size.totalHeight;
      }
      return el.setStyle('height', prevHeight);
    });
    if (apply) {
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        el = this[_i];
        el.setStyle('height', retval.maxHeight);
      }
    }
    return retval;
  });

  Element.Events.clickOutside = {
    base: 'click',
    condition: function(evt) {
      evt.customType = 'clickOutside';
      evt.stopPropagation();
      return false;
    },
    onAdd: function(fn) {
      return this.getDocument().addEvent('click', fn);
    },
    onRemove: function(fn) {
      return this.getDocument().removeEvent('click', fn);
    }
  };

}).call(this);
