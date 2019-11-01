###

GW2BBCode.js
============

Copyright:		Colin Aarts, 2011–2012 <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	<http://gw2bbcode.com>

###



'use strict'



#	Class: GW2BBCode
#	================
#	A class for displaying skill icons and info tooltips for Guild Wars 2 skills, based on customisable template code
#
#	@option template			a regular expression to catch gw2bbcode
#	@option replace				a string representing a gw2bbcode template; must contain the phrase 'skillName'; used for reverting gw2bbcode during replacement if a skill name isn't found
#	@option basePath			the base path to GW2BBCode assets
#	@option linkSkills			whether or not to make the skill icons links to the Guild Wars 2 Wiki skill page
#	@option tooltipOptions		an options object for the Tooltip class that is used by GW2BBCode

window.GW2BBCode = new Class

	Implements: [Options, Events]

	Binds: ['handleTooltip']

	options:
		template: /#\{(.*?)\}/g
		replace: '#{skillName}'
		basePath: ''
		linkSkills: true
		start: true
		tooltipOptions: null

	version: '0.1'



	#	Constructor body
	#	----------------
	#
	#	@param containers	the elements to look in for bbcode
	#	@param options		an options object

	initialize: (containers, options) ->

		@setOptions GW2BBCode.defaultOptions, options

		# Force |containers| to always be an elements collection
		@containers = do =>
			return containers if typeOf(containers) is 'elements'
			return new Elements [containers] if typeOf(containers) is 'element'
			return $$(containers) if typeOf(containers) is 'string'
			return null

		return if not @containers

		# Tooltips, always attached to document.body
		@tooltip = new Tooltip document.body, Object.merge {
			showEvents: 'mouseenter:relay([data-skill])'
			hideEvents: 'mouseleave:relay([data-skill])'
			tooltipElement: new Element('div', { 'class': 'gw2bbcode' })
			tooltipPosition: { position: 'topCenter', edge: 'bottomCenter' }
			showCallback: @handleTooltip

		}, @options.tooltipOptions

		# Parse BBCode
		@update() if @options.start

		#
		@fireEvent 'load', @



	#	GW2BBCode::update
	#	-----------------
	#	Parses GW2BBCode in the specified container elements
	#
	#	@returns	the instance

	update: ->

		@containers.each (container) =>
			container.set 'html', (container.get 'html').replace @options.template, (match, skillName) =>

				# Lowercase skill name for datastore accessor
				skillNameCI = skillName.toLowerCase()

				# Retrieve the skill data from the datastore
				skillData = GW2BBCode.skillData[skillNameCI]

				# Abort if skill not found in datastore
				return @options.replace.replace 'skillName', skillName if not skillData

				# If |skillName| is an alias, follow the alias and use the real name instead
				skillNameCI = skillData.alias ? skillNameCI

				# |skillName| should always represent the poperly-cased name, so update it
				skillName = skillData.name

				# Get the file name for the skill icon
				fileName = @getFileNameForSkill skillName

				# Prepare some elements
				holder = do =>
					holder = new Element 'div'

					el = new Element (if @options.linkSkills then 'a' else 'span')
					el.set 'href', "http://wiki.guildwars2.com/wiki/#{skillName}" if @options.linkSkills
					el.set 'data-skill', skillName
					el.set 'id', String.uniqueID()
					el.set 'data-elite', skillData.slot is 'Elite'

					img = new Element 'img'
					img.set 'alt', ''
					img.set 'src', "#{@options.basePath}/img/skills/#{fileName}"

					el.adopt img
					holder.adopt el

					return holder

				# Return
				return holder.get 'html'

		return @



	#	GW2BBCode::getFileNameForSkill
	#	------------------------------
	#	Retrieve the file name for a given skill name
	#
	#	@param skillName	a skill name
	#	@returns			the file name for the given skill name

	getFileNameForSkill: (skillName) ->

		fileName = skillName
		fileName = fileName.replace /"/g, "'" # For Win compat
		fileName = fileName.replace /\s/g, '_' # Spaces to underscores
		return "#{fileName}.jpg"



	#	GW2BBCode::getTooltipTemplate
	#	-----------------------------
	#	Retrieve a fresh tooltip DOM template structure
	#
	#	@returns	a DOM element node

	getTooltipTemplate: ->
		return (Elements.from """
			<div>
				<img class="skill-thumb" data-elite="" src="" alt="">
				<div class="header">
					<p class="title"></p>
					<p class="description"></p>
				</div>
				<ul class="properties">
					<li data-profession=""></li>
					<li data-slot=""><span></span></li>
					<li data-recharge=""></li>
					<li data-type=""></li>
					<li data-tags=""></li>
				</ul>
			</div>
		""")[0]



	#	GW2BBCode::handleTooltip
	#	------------------------
	#	Callback for the |showCallback| option of the Tooltip class used by GW2BBCode

	handleTooltip: (trigger, tooltip) ->

		skillName = trigger.get 'data-skill'
		fileName = @getFileNameForSkill skillName
		skillData = Object.clone GW2BBCode.skillData[skillName.toLowerCase()]
		template = @getTooltipTemplate()

		# Defaults
		skillData.type or= 'General'


		#
		# Fill in template
		#

		# Thumb
		do =>
			el = template.getElement '.skill-thumb'
			el.set 'data-elite', skillData.slot is 'Elite'
			el.set 'src', "#{@options.basePath}/img/skills/#{fileName}"

		# Title
		do =>
			el = template.getElement '.title'
			el.set 'html', skillData.name

		# Description
		do =>
			el = template.getElement '.description'
			el.set 'html', skillData.description

		# Profession
		do =>
			el = template.getElement '[data-profession]'
			el.set 'data-profession', skillData.profession
			el.set 'html', skillData.profession

		# Slot
		do =>
			el = template.getElement '[data-slot]'
			slot = do =>
				if typeOf(skillData.slot) isnt 'array' then return skillData.slot
				else return skillData.slot.join ', '

			el.set 'data-slot', slot
			el.getFirst().set 'html', slot


		# Recharge
		do =>
			el = template.getElement '[data-recharge]'
			el.set 'data-recharge', skillData.recharge
			el.set 'html', skillData.recharge

		# Type
		do =>
			el = template.getElement '[data-type]'
			el.set 'data-type', skillData.type
			el.set 'html', skillData.type

		# Tags
		do =>
			el = template.getElement '[data-tags]'

			if not skillData.tags
				el.destroy()
				return

			tags = do =>
				if typeOf(skillData.tags) is 'array' then return skillData.tags
				else return [skillData.tags]

			tags.push 'Sequence skill' if skillData.sequence

			mods = new Element 'ul'
			for mod in tags then do =>
				mod = new Element 'li', { text: mod }
				mod.inject mods

			el.set 'data-tags', tags.join ', '
			el.adopt mods

		# Return
		return { content: template.get 'html' }
