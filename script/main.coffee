'use strict'



window.app = {}



window.addEvent 'domready', (evt) ->

	#
	#	Init GW2BBCode for the demo pane
	#

	window.app.demoBBCode = new GW2BBCode $('demo-skills'),
		basePath: 'lib'
		tooltipOptions: tooltipPosition: offset: y: -30



	#
	#	Init GW2BBCode for the all skills dialog
	#

	window.app.allSkillsBBCode = new GW2BBCode $('all-skills'),
		basePath: 'lib'
		tooltipOptions: tooltipPosition: offset: y: -30
		start: false



	#
	#	Equalize tab control panels
	#

	TabControl::addEvent 'load', ->
		# @panelContainer.setStyle 'height', @getPanels().equalize(false).maxHeight # Doesn't work so well with css3-multicol in at least Fx.
		currentIndex = @getCurrentIndex()
		maxHeight = 0
		panels = @getPanels()

		for index in [0...@getLength()]
			do =>
				@go index, true
				height = panels[index].getComputedSize().totalHeight
				maxHeight = height if height > maxHeight

		@panelContainer.setStyle 'height', maxHeight
		@go currentIndex, true



	#
	#	Init global overlay for dialogs
	#

	window.app.globalOverlay = new Overlay()



	#
	#	Init docs dialog
	#

	window.app.docsDialog = new Dialog $('docs'),
		overlay: window.app.globalOverlay



	#
	#	Init all skills dialog
	#

	window.app.allSkillsDialog = new Dialog $('all-skills'),
		overlay: window.app.globalOverlay
		onLoad: ->
			eTarget = @container.getElement 'p'
			aSkillNames = Object.keys GW2BBCode.skillData
			eTarget.set 'text', GW2BBCode.skillNamesToTemplateString aSkillNames
		onShow: ->
			window.app.allSkillsBBCode.update()



	#
	#	Init main tab control
	#

	new TabControl $('overview'),
		beforeNavigate: (panel, tab) ->
			return # disabled for now
			if 'docs-ref' is panel.get 'id'
				# Show the docs dialog
				window.app.docsDialog.show()
				# Return false to prevent TabControl navigation
				return false



	#
	#	Function to set up the demo area with skill icons
	#

	window.app.renderDemo = (nLineCount) ->
		nLineCount or= 2
		eTarget = $('demo-skills')
		nMaxDisplayCount = do ->
			nAvailWidth = eTarget.getComputedSize().width
			nSkillWidth = do ->
				eTarget.set 'text', '#{Strike}'
				app.demoBBCode.update()
				return (eTarget.getElement '[data-skill]').getComputedSize().width
			nSpaceWidth = do ->
				eTarget.set 'text', '#{Strike} #{Strike}'
				app.demoBBCode.update()
				nPos1 = (eTarget.getElement '[data-skill]').getPosition().x
				nPos2 = (eTarget.getElement '[data-skill] + [data-skill]').getPosition().x
				return nPos2 - nPos1 - nSkillWidth
			nSkillsPerLineCount = Math.floor (nAvailWidth + nSpaceWidth) / (nSkillWidth + nSpaceWidth)
			return nSkillsPerLineCount * nLineCount
		nSkillCount = GW2BBCode.computeStats().skillCount

		# Generate |nMaxDisplayCount| random numbers between 0 and the total number of skills in GW2BBCode.skillData
		aRandNums = []
		while aRandNums.length < nMaxDisplayCount
			n = Number.random 0, (nSkillCount - 1)
			if n in aRandNums then continue
			else aRandNums.push n

		# Build skill array
		aSkills = []
		do ->
			nCount = 0
			for own oSkill of GW2BBCode.skillData
				aSkills.push "\#{#{oSkill}}" if aRandNums.contains nCount
				nCount++

		# Randomise
		aSkills.shuffle()

		# Inject & parse skill string
		eTarget.set 'text', aSkills.join ' '
		app.demoBBCode.update()



	#
	#	Demo toolbar
	#

	do ->
		eList = new Element 'ul.toolbar'

		# Skills overview button
		do->
			eListItem = new Element 'li'
			eButton = new Element 'span',
				id: 'demo-all-skills'
				role: 'button'
				tabindex: '0'
				'aria-controls': 'all-skills'
				title: 'View all available skills (heavy!)'
				text: 'View all available skills (heavy!)'

			eButton.bindEvents ['click', 'keydown'], (evt) ->
				return if evt.type is 'keydown' and evt.key isnt 'enter'
				evt.stop()
				window.app.allSkillsDialog.show()

			eListItem.adopt eButton
			eList.adopt eListItem

		# Renew demo skills selection button
		do ->
			eListItem = new Element 'li'
			eButton = new Element 'span',
				id: 'demo-renew'
				role: 'button'
				tabindex: '0'
				'aria-controls': 'demo-skills'
				title: 'Renew the selection of random skills'
				text: 'Renew the selection of random skills'

			eButton.bindEvents ['click', 'keydown'], (evt) ->
				return if evt.type is 'keydown' and evt.key isnt 'enter'
				evt.stop()
				window.app.renderDemo(3)

			eListItem.adopt eButton
			eList.adopt eListItem

		# Inject
		$$('#demo > header')[0].adopt eList



	#
	#	Run the demo
	#

	window.app.renderDemo(3)



	#
	#	Generate and display stats
	#

	do ->
		eTarget = $$('#stats > p')[0]
		eStats = GW2BBCode.getStatsAsHTML(true)
		eStats.replaces eTarget



	#
	#	Track downloads
	#

	$$('#download-lib a, #download-src a').addEvent 'click', (evt) ->
		type = if 'download-lib' is @getParent().get 'id' then 'lib' else 'src'
		file = (new URI @get 'href').get 'file'
		_gaq.push ['_trackEvent', 'Downloads', type, file]
