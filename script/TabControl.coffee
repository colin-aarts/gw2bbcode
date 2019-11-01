###

TabControl.js
=============

Copyright:		Colin Aarts <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	n/a

###



'use strict'



#	Class: TabControl
#	=================
#	• Turns a (semantic) HTML structure into a tab panel widget
#	• Provides WAI-ARIA support
#	• Provides focus management support (for the tablist)
#	• Provides hash (fragment identifier) management support
#
#	@option data			an array of objects; provide data for additional panels to initialize the TabControl with; see TabControl::add for details
#	@option startIndex		the index of the panel to activate first
#	@option tabContainerLocation	position to inject the tab list into; takes any one of the location keywords supported by Element::inject
#	@option handleHash		whether or not to handle "history": update hash on panel activation, and respond to |hashchange| events
#	@option allowCollapse	whether or not to allow a panel to be collapsed when it is the active panel, and its tab is clicked; when disabled, there is always one active panel
#	@option selectors		an object with string selectors for retrieving various essential elements; signature:
#		tabContainer		the container used to hold the tabs
#		tabs				the tabs
#		panelContainer		the container used to hold the panels
#		panels				the panels
#		title				the titles/headings of the panels; will be pulled out and used for the tab titles
#	@option beforeNavigate	a callback that is called before performing the navigation tasks; returning false from this callback will abort navigation; use this to implement custom behaviour for specific tabs.

window.TabControl = new Class

	Implements: [Options, Events, Class.Occlude]

	options:
		data: null
		startIndex: 0
		tabContainerLocation: 'before'
		handleHash: true
		allowCollapse: false
		selectors:
			tabContainer: null
			tabs: null
			panelContainer: null
			panels: null
			titles: null



	#	Constructor body
	#	----------------
	#
	#	@param container	container element for the tab control widget (element, element collection or string selector)
	#	@param options		options object

	initialize: (container, options) ->

		@setOptions TabControl.defaultOptions, options


		#
		#	Init container
		#

		@container = do =>
			if typeOf(container) is 'element'
				return container
			else if typeOf(container[0]) is 'element'
				return container[0]
			else
				return null

		if not @container
			console.warn 'TabControl: no element node found for argument #1 `container`. Aborting.'
			return

		# Has a TabControl has already been initialized on the container?
		return @occluded if @occlude 'TabControl', @container


		#
		#	Init panel container
		#

		@panelContainer = Function.solicit =>
			# If panelContainer is passed in, use that
			return @container.getElement @options.selectors.panelContainer
		, =>
			# If panelContainer is not passed in, but tabContainer isn't either, see if the container has a child
			return @container.getChildren()[0] if not @options.selectors.tabContainer
		, =>
			# If we still don't have a panelContainer, create it
			panelContainer = new Element 'div'
			panelContainer.inject @container
			return panelContainer


		#
		#	Init tab container
		#

		@tabContainer = Function.solicit =>
			# If tabContainer is passed in, use that
			return @container.getElement @options.selectors.tabContainer
		, =>
			# If not, create it
			tabContainer = new Element 'ul'
			tabContainer.inject @panelContainer, @options.tabContainerLocation
			return tabContainer

		@tabContainer.set 'role', 'tablist'


		#
		#	Init tabs
		#

		do =>
			if @options.selectors.titles
				titles = @container.getElements(@options.selectors.titles).dispose()
			else
				titles = ( panel.getElement(':heading').dispose() for panel in @getPanels() )

			@tabContainer.adopt @initTab title.get 'text' for title in titles


		#
		#	Init panels
		#

		@initPanel null, panel for panel in @getPanels()


		#
		#	Misc
		#

		# Attach tab events
		@tabContainer.bindEvents ['click:relay(> li)', 'keydown:relay(> li)'], (evt, el) =>
			return if evt.type is 'keydown' and evt.key isnt 'enter'
			evt.stop()
			@go el.index()

		# Was additional content passed in?
		@add @options.data if @options.data?

		# Activate initial panel
		if @options.handleHash
			@go @getIndexForHash() ? @options.startIndex
		else
			@go @options.startIndex

		# Observe |hashchange| event
		@options.handleHash and window.addEvent 'hashchange', (evt) =>
			targetIndex = @getIndexForHash()

			# The |hashchange| event fires after programatically setting the hash too, and we don't want that.
			# 	Specifically, when TabControl::go sets the hash, |hashchange| fires, which triggers TabControl::go again.
			# 	When the 'allowCollapse' option is enabled, this causes the panel to collapse at the second invocation.
			# 	To remedy this, we simply don't invoke TabControl::go if the currently active panel is the hash target.
			@go targetIndex if targetIndex isnt @getCurrentIndex()

		# Finish up…
		@container.addClass 'tab-control'

		@fireEvent 'load'



	#	TabControl::initTab
	#	-------------------
	#	Initialize a tab element
	#
	#	@param title		the tab title
	#	@param nodeName		the node name of the element to be created (default 'li'), or an actual element to augment
	#	@returns			the generated or augmented tab element
	#	@private

	initTab: (title, nodeName = 'li') ->

		tab = if typeOf(nodeName) is 'element' then nodeName else new Element nodeName
		tab.set
			text: title
			tabindex: 0
			role: 'tab'
			'aria-selected': 'false'

		return tab



	#	TabControl::initPanel
	#	---------------------
	#	Initialize a panel element
	#
	#	@param content		the panel content; if null or undefined, leaves existing content untouched
	#	@param nodeName		the node name of the element to be created (default 'section'), or an actual element to augment
	#	@returns			the generated or augmented panel element
	#	@private

	initPanel: (content, nodeName = 'section') ->

		panel = if typeOf(nodeName) is 'element' then nodeName else new Element nodeName
		panel.set 'role', 'tabpanel'

		index = panel.index()

		# Must have an ID for @aria-controls
		panelID = (panel.get 'id') or String.uniqueID()
		panel.set 'id', 'tab-control-' + panelID if not panel.get 'id'
		@getTabs()[index].set 'aria-controls', panelID

		# Panel content
		if typeOf(content) is 'element' or typeOf(content) is 'elements'
			panel.adopt content
		else if typeOf(content) is 'string'
			panel.set 'html', content

		return panel



	#	TabControl::getTabs
	#	-------------------
	#	Retrieve the tabs of the TabControl
	#
	#	@returns	elements collection of tabs
	#	@public

	getTabs: ->

		if @options.selectors.tabs
			return @container.getElements @options.selectors.tabs
		else
			return @tabContainer.getChildren()



	#	TabControl::getPanels
	#	---------------------
	#	Retrieve the panels of the TabControl
	#
	#	@returns	elements collection of panels
	#	@public

	getPanels: ->

		if @options.selectors.panels
			return @container.getElements @options.selectors.panels
		else
			return @panelContainer.getChildren()



	#	TabControl::getLength
	#	---------------------
	#	Retrieve the amount of items in the TabControl
	#
	#	@returns	the length
	#	@public

	getLength: ->

		return @getTabs().length



	#	TabControl::getCurrentIndex
	#	---------------------------
	#	Retrieve the index of the currently active TabControl item
	#
	#	@returns	the index, or null if there is no active item (possible with the 'allowCollapse' option set to true)
	#	@public

	getCurrentIndex: ->

		return @getTabs().filter('[aria-selected="true"]')[0]?.index()



	#	TabControl::go
	#	--------------
	#	Activate a specified tab panel
	#
	#	@param index	the index of the panel to be activated
	#	@param silent	whether or not to suppress "side-effects": hash handling, event firing
	#	@returns		the instance
	#	@public

	go: (index, silent) ->

		silent ?= false
		count = @getLength()

		if not index? or
		   not (0 <= index < count)
			console.warn "TabControl: invalid index for TabControl::go (#{index})"
			return @

		isCurrentIndex = index is @getCurrentIndex()

		tabs = @getTabs()
		panels = @getPanels()

		# |beforeNavigate| callback
		if @options.beforeNavigate and not silent
			callbackResult = @options.beforeNavigate panels[index], panels[@getCurrentIndex()]
			return @ if callbackResult is false

		# "Reset" the panels and tabs
		tabs.set 'aria-selected', 'false'
		tabs.set 'tabindex', '0'
		panels.set 'aria-hidden', 'true'

		# Update the newly active tab and panel
		if (not isCurrentIndex) or
		   (isCurrentIndex and not @options.allowCollapse)
			tabs[index].set 'aria-selected', 'true'
			tabs[index].set 'tabindex', '-1'
			panels[index].set 'aria-hidden', 'false'

		# Update hash
		@options.handleHash and not silent and do =>
			if not @container.hasClass 'tab-control'
				return if not ( TabControl.initialHash in ( item.get 'id' for item in @getPanels() ) )

			id = panels[index].get 'id'
			hash = if /^tab-control-/.test id then '' else id # Ignore auto-generated IDs

			if window.history.pushState then window.history.pushState null, '', "##{hash}"
			else location.hash = hash

		#
		not silent and @fireEvent 'navigate', [panels[index], panels[@getCurrentIndex()]]

		return @



	#	TabControl::add
	#	---------------
	#	Add panels to the TabControl
	#
	#	@usage	add(title[, content[, index]])
	#	@usage	add(list)
	#
	#	@param title	the title for the tab
	#	@param content	the content for the panel; can be a string, an element, an elements collection, or null
	#	@param index	the index at which to add the new panel; defaults to injection at the end
	#	@param list		an array of objects to add, with each object having 'title', 'content' and 'index' properties as per above
	#	@returns		the instance
	#	@public

	add: (title, content, index) ->

		if typeOf(title) is 'array'
			@add item.title, item.content, item.index for item in title
			return

		length = @getLength()
		index? or (index = length)

		return false if typeOf(index) isnt 'number' or index < 0 or index > length

		tabs = @getTabs()
		panels = @getPanels()

		tab = @initTab title
		panel = @initPanel content

		if index is 0
			tab.inject @tabContainer, 'top'
			panel.inject @panelContainer, 'top'
		else if index is length
			tab.inject tabs[length - 1], 'after'
			panel.inject panels[length - 1], 'after'
		else
			tab.inject tabs[index - 1], 'after'
			panel.inject panels[index - 1], 'after'

		@fireEvent 'add', [panels[index]]
		return @



	#	TabControl::remove
	#	------------------
	#	Remove panels from the TabControl
	#
	#	@usage	remove(index[, activePanel])
	#	@usage	remove(list[, activePanel])
	#
	#	@param index		the index of the panel to be removed
	#	@param list			an array of indices to be removed
	#	@param activePanel	the new active panel if any of the removed panels was the active panel (default 0)
	#	@returns			an elements collection containing the removed panels
	#	@public

	remove: (index, activePanel) ->

		removedPanels = new Elements()
		removedActivePanel = false
		indices = index # Don't touch |index|
		panels = @getPanels()
		tabs = @getTabs()

		# Always operate on an array of indices
		if typeOf(indices) isnt 'array' then indices = [indices]

		indices.each (index) =>
			removedActivePanel = true if index is @getCurrentIndex()
			removedPanels.push panels[index].dispose()
			tabs[index].destroy()

		# If the active panel was removed, we need to activate a new panel
		if removedActivePanel
			if not activePanel? or activePanel not of @getPanels() then activePanel = 0
			@go activePanel

		# If no array of indices was passed in, don't return an array of removed panels
		if typeOf(index) is 'number' then removedPanels = removedPanels[0]

		@fireEvent 'remove', [removedPanels]
		return removedPanels



	#	TabControl::getIndexForHash
	#	---------------------------
	#	Retrieve the index of the panel corresponding to the current page hash
	#
	#	@param hash		a hash string
	#	@returns		the index of the panel corresponding to the current page hash, or null
	#	@public

	getIndexForHash: (hash) ->

		hash or= location.hash
		return null if not hash

		target = (@getPanels().filter hash)[0]
		return null if not target

		index = target.index()

		return index ? null



#
#	Store initial hash for future reference
#	This is primarily used for preventing changing the hash on initial panel activation when the request hash does not correspond with a panel
#

TabControl.initialHash = window.location.hash.slice 1



#
#	Enable observing `haschange` events
#

if not Element.NativeEvents.hashchange?
	Element.NativeEvents.hashchange = 2

if not Element.Events.hashchange?
	Element.Events.hashchange =
		base: 'hashchange'
		condition: (evt) ->
			evt.oldURL = evt.event.oldURL
			evt.newURL = evt.event.newURL
			return true
