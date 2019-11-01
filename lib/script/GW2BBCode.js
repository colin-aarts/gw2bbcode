
/*

GW2BBCode.js
============

Copyright:		Colin Aarts, 2011–2012 <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	<http://gw2bbcode.com>
*/


(function() {
  'use strict';

  window.GW2BBCode = new Class({
    Implements: [Options, Events],
    Binds: ['handleTooltip'],
    options: {
      template: /#\{(.*?)\}/g,
      replace: '#{skillName}',
      basePath: '',
      linkSkills: true,
      start: true,
      tooltipOptions: null
    },
    version: '0.1',
    initialize: function(containers, options) {
      var _this = this;
      this.setOptions(GW2BBCode.defaultOptions, options);
      this.containers = (function() {
        if (typeOf(containers) === 'elements') {
          return containers;
        }
        if (typeOf(containers) === 'element') {
          return new Elements([containers]);
        }
        if (typeOf(containers) === 'string') {
          return $$(containers);
        }
        return null;
      })();
      if (!this.containers) {
        return;
      }
      this.tooltip = new Tooltip(document.body, Object.merge({
        showEvents: 'mouseenter:relay([data-skill])',
        hideEvents: 'mouseleave:relay([data-skill])',
        tooltipElement: new Element('div', {
          'class': 'gw2bbcode'
        }),
        tooltipPosition: {
          position: 'topCenter',
          edge: 'bottomCenter'
        },
        showCallback: this.handleTooltip
      }, this.options.tooltipOptions));
      if (this.options.start) {
        this.update();
      }
      return this.fireEvent('load', this);
    },
    update: function() {
      var _this = this;
      this.containers.each(function(container) {
        return container.set('html', (container.get('html')).replace(_this.options.template, function(match, skillName) {
          var fileName, holder, skillData, skillNameCI, _ref;
          skillNameCI = skillName.toLowerCase();
          skillData = GW2BBCode.skillData[skillNameCI];
          if (!skillData) {
            return _this.options.replace.replace('skillName', skillName);
          }
          skillNameCI = (_ref = skillData.alias) != null ? _ref : skillNameCI;
          skillName = skillData.name;
          fileName = _this.getFileNameForSkill(skillName);
          holder = (function() {
            var el, img;
            holder = new Element('div');
            el = new Element((_this.options.linkSkills ? 'a' : 'span'));
            if (_this.options.linkSkills) {
              el.set('href', "http://wiki.guildwars2.com/wiki/" + skillName);
            }
            el.set('data-skill', skillName);
            el.set('id', String.uniqueID());
            el.set('data-elite', skillData.slot === 'Elite');
            img = new Element('img');
            img.set('alt', '');
            img.set('src', "" + _this.options.basePath + "/img/skills/" + fileName);
            el.adopt(img);
            holder.adopt(el);
            return holder;
          })();
          return holder.get('html');
        }));
      });
      return this;
    },
    getFileNameForSkill: function(skillName) {
      var fileName;
      fileName = skillName;
      fileName = fileName.replace(/"/g, "'");
      fileName = fileName.replace(/\s/g, '_');
      return "" + fileName + ".jpg";
    },
    getTooltipTemplate: function() {
      return (Elements.from("<div>\n	<img class=\"skill-thumb\" data-elite=\"\" src=\"\" alt=\"\">\n	<div class=\"header\">\n		<p class=\"title\"></p>\n		<p class=\"description\"></p>\n	</div>\n	<ul class=\"properties\">\n		<li data-profession=\"\"></li>\n		<li data-slot=\"\"><span></span></li>\n		<li data-recharge=\"\"></li>\n		<li data-type=\"\"></li>\n		<li data-tags=\"\"></li>\n	</ul>\n</div>"))[0];
    },
    handleTooltip: function(trigger, tooltip) {
      var fileName, skillData, skillName, template,
        _this = this;
      skillName = trigger.get('data-skill');
      fileName = this.getFileNameForSkill(skillName);
      skillData = Object.clone(GW2BBCode.skillData[skillName.toLowerCase()]);
      template = this.getTooltipTemplate();
      skillData.type || (skillData.type = 'General');
      (function() {
        var el;
        el = template.getElement('.skill-thumb');
        el.set('data-elite', skillData.slot === 'Elite');
        return el.set('src', "" + _this.options.basePath + "/img/skills/" + fileName);
      })();
      (function() {
        var el;
        el = template.getElement('.title');
        return el.set('html', skillData.name);
      })();
      (function() {
        var el;
        el = template.getElement('.description');
        return el.set('html', skillData.description);
      })();
      (function() {
        var el;
        el = template.getElement('[data-profession]');
        el.set('data-profession', skillData.profession);
        return el.set('html', skillData.profession);
      })();
      (function() {
        var el, slot;
        el = template.getElement('[data-slot]');
        slot = (function() {
          if (typeOf(skillData.slot) !== 'array') {
            return skillData.slot;
          } else {
            return skillData.slot.join(', ');
          }
        })();
        el.set('data-slot', slot);
        return el.getFirst().set('html', slot);
      })();
      (function() {
        var el;
        el = template.getElement('[data-recharge]');
        el.set('data-recharge', skillData.recharge);
        return el.set('html', skillData.recharge);
      })();
      (function() {
        var el;
        el = template.getElement('[data-type]');
        el.set('data-type', skillData.type);
        return el.set('html', skillData.type);
      })();
      (function() {
        var el, mod, mods, tags, _fn, _i, _len;
        el = template.getElement('[data-tags]');
        if (!skillData.tags) {
          el.destroy();
          return;
        }
        tags = (function() {
          if (typeOf(skillData.tags) === 'array') {
            return skillData.tags;
          } else {
            return [skillData.tags];
          }
        })();
        if (skillData.sequence) {
          tags.push('Sequence skill');
        }
        mods = new Element('ul');
        _fn = function() {
          mod = new Element('li', {
            text: mod
          });
          return mod.inject(mods);
        };
        for (_i = 0, _len = tags.length; _i < _len; _i++) {
          mod = tags[_i];
          _fn();
        }
        el.set('data-tags', tags.join(', '));
        return el.adopt(mods);
      })();
      return {
        content: template.get('html')
      };
    }
  });

}).call(this);
