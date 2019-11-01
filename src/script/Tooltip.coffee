###

Tooltip.js
==========

Copyright:      Colin Aarts <http://colinaarts.com>
License:        MIT <http://www.opensource.org/licenses/MIT>
Web/support:    n/a

###



'use strict'



#   Class: Tooltip
#   ==============

window.Tooltip = new Class

	Implements: [Options, Events]

	options:
		showEvents: ['mouseenter'] # or string
		hideEvents: ['mouseleave'] # or string
		showCallback: null
		tooltipElement: 'div'
		tooltipContentSelector: null
		tooltipPosition:
			position: 'bottomCenter'
			edge: 'topCenter'
		enabled: true


	#
	# Constructor body
	#

	initialize: (elements, options) ->

		@setOptions Tooltip.defaultOptions, options
		@enabled = @options.enabled
		@elements = elements

		# Define & inject tooltip element
		@tooltip = new Element @options.tooltipElement
		@tooltip.addClass 'tooltip'
		@tooltip.set 'aria-hidden', 'true'
		@tooltip.set 'role', 'tooltip'
		@tooltip.inject document.body

		# Give the tooltip element an ID if it doesn't have one (needed for @aria-describedby)
		@tooltipID = @tooltip.get('id') or String.uniqueID()
		@tooltip.set 'id', @tooltipID

		# Bind 'show' events
		@elements.bindEvents @options.showEvents, (evt, trigger) =>
			return if not @enabled

			# Find the element the event was registered for:
			#   - evt.event.currentTarget for non-delegated events;
			#   - the second argument to the callback for delegated events (nice one, MooTools… can't you just do this for non-delegated events as well?)
			trigger or= evt.event.currentTarget

			# If a callback was provided, call it and fetch the return data
			if typeOf(@options.showCallback) is 'function'
				data = @options.showCallback(trigger, @tooltip)

			# Set tooltip content
			do =>
				target = if @options.tooltipContentSelector then @tooltip.getElement @options.tooltipContentSelector else @tooltip
				target.set 'html', data?.content or trigger.get 'title'

			# Position tooltip
			# Note: this completely trumps relative positioning
			if data?.position
				@tooltip.setStyles data.position
			else
				@tooltip.position Object.merge { relativeTo: trigger }, @options.tooltipPosition

			# ARIA shizzle
			@tooltip.set 'aria-hidden', 'false'
			trigger.set 'aria-describedby', @tooltipID

			#
			@fireEvent 'tipVisible', [@, trigger, @tooltip]


		# Bind 'hide' events
		@elements.bindEvents @options.hideEvents, (evt, trigger) =>
			return if not @enabled

			# Find the element the event was registered for
			trigger or= evt.event.currentTarget

			# ARIA shizzle
			@tooltip.set 'aria-hidden', 'true'
			trigger.erase 'aria-describedby'

			#
			@fireEvent 'tipHidden', [@, trigger, @tooltip]

		@fireEvent 'load', @



	##
	#
	##

	enable: ->
		@enabled = true
		@fireEvent 'enable', @
		return @



	##
	#
	##

	disable: ->
		@enabled = false
		@fireEvent 'disable', @
		return @



	##
	#
	##

	toggleEnabled: ->
		@enabled = not @enabled
		return @
