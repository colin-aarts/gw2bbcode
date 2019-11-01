###

GW2BBCode.tools.js
==================

Copyright:		Colin Aarts, 2011–2012 <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	<http://gw2bbcode.com>

###



'use strict'



return if not GW2BBCode

GW2BBCode.tools =
	version: '0.1'



#	GW2BBCode.computeStats
#		- computes stats, and stores them as GW2BBCode.skillStats
#		- see code for the object structure
#		- caches the compute result so subsequent calls don't waste resources (unless the customStats argument is provided)
#
#	@param customStats (obj): simple way to retrieve custom stats & skill names such as 'all Guardian skills of type Symbol for Greatsword'
#		- takes an array of objects, with each object having the signature of a skillData definition, except that all fields are optional
#		- also takes a required 'label' field, which takes a string name for the custom stat
#		- example: { label: 'MyCustomStat', profession: 'Guardian', slot: 'Greatsword', type: 'Symbol' }
#		- each custom stat is attached to the return object, and to the GW2BBCode.skillStats object
#		- the custom stat result is an array of matched skill names (lowercase)
#		- specifying this argument forces a recompute
#
#	@returns stats object
#	@api public
#	@sync

GW2BBCode.computeStats = (customStats) ->

	# Defaults
	# …


	#
	return GW2BBCode.skillStats if GW2BBCode.skillStats and not customStats
	return false if not GW2BBCode.skillData


	# Init all stats
	GW2BBCode.skillStats = skillStats =
		skillCount: 0
		aliasCount: 0
		entryCount: 0
		profession:
			Guardian: 0
			Warrior: 0
			Elementalist: 0
			Ranger: 0
			Thief: 0
			Engineer: 0
			Necromancer: 0
			Mesmer: 0
			All: 0
		slot:
			Healing: 0
			Utility: 0
			Downed: 0
			Drowning: 0
			'Main-hand axe': 0
			'Main-hand dagger': 0
			'Main-hand mace': 0
			'Main-hand pistol': 0
			'Main-hand scepter': 0
			'Main-hand sword': 0
			'Off-hand axe': 0
			'Off-hand dagger': 0
			'Off-hand mace': 0
			'Off-hand pistol': 0
			'Off-hand scepter': 0
			'Off-hand sword': 0
			'Focus': 0
			'Shield': 0
			'Torch': 0
			'Warhorn': 0
			'Greatsword': 0
			'Hammer': 0
			'Longbow': 0
			'Shortbow': 0
			'Rifle': 0
			'Staff': 0
			'Harpoon gun': 0
			'Spear': 0
			'Trident': 0
		type:
			'Form': 0
			'Shout': 0
			'Signet': 0
			'Trap': 0
			'Virtue': 0
			'Spirit weapon': 0
			'Symbol': 0
			'Ward': 0
			'Burst skill': 0
			'Banner': 0
			'Stance': 0
			'Tool belt': 0
			'Backpack kit': 0
			'Elixir': 0
			'Turret': 0
			'Weapon kit': 0
			'Pet skill': 0
			'Preparation': 0
			'Spirit': 0
			'Steal': 0
			'Dual skill': 0
			'Shadow step': 0
			'Stealth': 0
			'Attunement': 0
			'Conjure': 0
			'Glyph': 0
			'Death shroud': 0
			'Mark': 0
			'Minion': 0
			'Well': 0


	# Iterate the skill store
	for own skillName, skillData of GW2BBCode.skillData

		# Totals
		skillStats.entryCount++
		skillStats.skillCount++ if not skillData.alias
		skillStats.aliasCount++ if skillData.alias

		# Iterate standard properties
		iter = (obj, label) ->
			for own prop, value of obj
				# console.log {prop, value, label}
				if typeOf(obj[prop]) is 'object'
					iter obj[prop], prop
				else
					if typeOf(skillData[label]) is 'string' and skillData[label] is prop or
					   typeOf(skillData[label]) is 'array'  and prop in skillData[label]
						obj[prop]++

		iter skillStats

		# Iterate custom stats
		customStats and for own customStat in customStats
			continue if not customStat.label
			skillStats[customStat.label] ?= []

			satisfied = true

			for own prop, value of customStat
				continue if prop is 'label'

				if prop is 'tags'
					for modifier in value
						if not skillData[prop] or
						   not (modifier in skillData[prop])
							satisfied = false
							break
				else if skillData[prop] isnt value
					satisfied = false
					break

			skillStats[customStat.label].push skillName if satisfied

	# Return
	return GW2BBCode.skillStats



#
#	GW2BBCode.getStatsAsHTML
#		- get the skill stats as a semantic HTML structure
#
#	@param asDOM (bool): if true, returns a DOM tree instead of a string of HTML. Defaults to false.
#	@param stats (obj): a stats object. Defaults to using the generic stats object from GW2BBCode.computeStats
#

GW2BBCode.getStatsAsHTML = (asDOM, stats) ->
	asDOM or = false
	stats or= GW2BBCode.computeStats()
	holder = new Element 'div'

	iter = (obj, container) ->
		list = new Element 'dl'
		container.adopt list
		container.addClass 'has-child-list'
		for own prop, value of obj
			dt = new Element 'dt', { text: prop }
			dd = new Element 'dd'
			list.adopt dt, dd
			if typeOf(value) is 'object'
				iter value, dd
			else
				dd.set 'text', value

	iter stats, holder

	return if asDOM then holder.getFirst() else holder.get 'html'



#
#	GW2BBCode.skillNamesToTemplateString
#		- transforms an array of skill names (such as the one provided by GW2BBCode.computeStats's custom stats functionality) into a string suitable for processing with GW2BBCode
#
#	@param skillNames (array): skill names
#	@param delimiter (string): defaults to the space character
#
#	@returns template string
#	@api public
#	@sync
#

GW2BBCode.skillNamesToTemplateString = (skillNames, delimiter = ' ') ->
	templateSkillNames = ("\#\{#{skillName}\}" for skillName in skillNames)
	return templateSkillNames.join delimiter

