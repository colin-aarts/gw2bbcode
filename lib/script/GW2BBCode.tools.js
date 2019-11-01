
/*

GW2BBCode.tools.js
==================

Copyright:		Colin Aarts, 2011–2012 <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	<http://gw2bbcode.com>
*/


(function() {
  'use strict';

  var __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (!GW2BBCode) {
    return;
  }

  GW2BBCode.tools = {
    version: '0.1'
  };

  GW2BBCode.computeStats = function(customStats) {
    var customStat, iter, modifier, prop, satisfied, skillData, skillName, skillStats, value, _ref;
    if (GW2BBCode.skillStats && !customStats) {
      return GW2BBCode.skillStats;
    }
    if (!GW2BBCode.skillData) {
      return false;
    }
    GW2BBCode.skillStats = skillStats = {
      skillCount: 0,
      aliasCount: 0,
      entryCount: 0,
      profession: {
        Guardian: 0,
        Warrior: 0,
        Elementalist: 0,
        Ranger: 0,
        Thief: 0,
        Engineer: 0,
        Necromancer: 0,
        Mesmer: 0,
        All: 0
      },
      slot: {
        Healing: 0,
        Utility: 0,
        Downed: 0,
        Drowning: 0,
        'Main-hand axe': 0,
        'Main-hand dagger': 0,
        'Main-hand mace': 0,
        'Main-hand pistol': 0,
        'Main-hand scepter': 0,
        'Main-hand sword': 0,
        'Off-hand axe': 0,
        'Off-hand dagger': 0,
        'Off-hand mace': 0,
        'Off-hand pistol': 0,
        'Off-hand scepter': 0,
        'Off-hand sword': 0,
        'Focus': 0,
        'Shield': 0,
        'Torch': 0,
        'Warhorn': 0,
        'Greatsword': 0,
        'Hammer': 0,
        'Longbow': 0,
        'Shortbow': 0,
        'Rifle': 0,
        'Staff': 0,
        'Harpoon gun': 0,
        'Spear': 0,
        'Trident': 0
      },
      type: {
        'Form': 0,
        'Shout': 0,
        'Signet': 0,
        'Trap': 0,
        'Virtue': 0,
        'Spirit weapon': 0,
        'Symbol': 0,
        'Ward': 0,
        'Burst skill': 0,
        'Banner': 0,
        'Stance': 0,
        'Tool belt': 0,
        'Backpack kit': 0,
        'Elixir': 0,
        'Turret': 0,
        'Weapon kit': 0,
        'Pet skill': 0,
        'Preparation': 0,
        'Spirit': 0,
        'Steal': 0,
        'Dual skill': 0,
        'Shadow step': 0,
        'Stealth': 0,
        'Attunement': 0,
        'Conjure': 0,
        'Glyph': 0,
        'Death shroud': 0,
        'Mark': 0,
        'Minion': 0,
        'Well': 0
      }
    };
    _ref = GW2BBCode.skillData;
    for (skillName in _ref) {
      if (!__hasProp.call(_ref, skillName)) continue;
      skillData = _ref[skillName];
      skillStats.entryCount++;
      if (!skillData.alias) {
        skillStats.skillCount++;
      }
      if (skillData.alias) {
        skillStats.aliasCount++;
      }
      iter = function(obj, label) {
        var prop, value, _results;
        _results = [];
        for (prop in obj) {
          if (!__hasProp.call(obj, prop)) continue;
          value = obj[prop];
          if (typeOf(obj[prop]) === 'object') {
            _results.push(iter(obj[prop], prop));
          } else {
            if (typeOf(skillData[label]) === 'string' && skillData[label] === prop || typeOf(skillData[label]) === 'array' && __indexOf.call(skillData[label], prop) >= 0) {
              _results.push(obj[prop]++);
            } else {
              _results.push(void 0);
            }
          }
        }
        return _results;
      };
      iter(skillStats);
      customStats && (function() {
        var _i, _j, _len, _len1, _name, _results;
        _results = [];
        for (_i = 0, _len = customStats.length; _i < _len; _i++) {
          customStat = customStats[_i];
          if (!customStat.label) {
            continue;
          }
          if (skillStats[_name = customStat.label] == null) {
            skillStats[_name] = [];
          }
          satisfied = true;
          for (prop in customStat) {
            if (!__hasProp.call(customStat, prop)) continue;
            value = customStat[prop];
            if (prop === 'label') {
              continue;
            }
            if (prop === 'tags') {
              for (_j = 0, _len1 = value.length; _j < _len1; _j++) {
                modifier = value[_j];
                if (!skillData[prop] || !(__indexOf.call(skillData[prop], modifier) >= 0)) {
                  satisfied = false;
                  break;
                }
              }
            } else if (skillData[prop] !== value) {
              satisfied = false;
              break;
            }
          }
          if (satisfied) {
            _results.push(skillStats[customStat.label].push(skillName));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      })();
    }
    return GW2BBCode.skillStats;
  };

  GW2BBCode.getStatsAsHTML = function(asDOM, stats) {
    var holder, iter;
    asDOM || (asDOM = false);
    stats || (stats = GW2BBCode.computeStats());
    holder = new Element('div');
    iter = function(obj, container) {
      var dd, dt, list, prop, value, _results;
      list = new Element('dl');
      container.adopt(list);
      container.addClass('has-child-list');
      _results = [];
      for (prop in obj) {
        if (!__hasProp.call(obj, prop)) continue;
        value = obj[prop];
        dt = new Element('dt', {
          text: prop
        });
        dd = new Element('dd');
        list.adopt(dt, dd);
        if (typeOf(value) === 'object') {
          _results.push(iter(value, dd));
        } else {
          _results.push(dd.set('text', value));
        }
      }
      return _results;
    };
    iter(stats, holder);
    if (asDOM) {
      return holder.getFirst();
    } else {
      return holder.get('html');
    }
  };

  GW2BBCode.skillNamesToTemplateString = function(skillNames, delimiter) {
    var skillName, templateSkillNames;
    if (delimiter == null) {
      delimiter = ' ';
    }
    templateSkillNames = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = skillNames.length; _i < _len; _i++) {
        skillName = skillNames[_i];
        _results.push("\#\{" + skillName + "\}");
      }
      return _results;
    })();
    return templateSkillNames.join(delimiter);
  };

}).call(this);
