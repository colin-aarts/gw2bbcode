###

mootools-extensions.js
======================
A collection of extensions to MooTools

Copyright:		Colin Aarts <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	n/a

###



'use strict'



#	:heading
#	--------
#	A custom pseudo-selector for selecting heading elements

Slick.definePseudo 'heading', ->
	els = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	return (this.get 'tag') in els



#	:section
#	--------
#	A custom pseudo-selector for selecting sectioning elements

Slick.definePseudo 'section', ->
	els = ['section', 'article', 'aside', 'nav']
	return (this.get 'tag') in els



#	String::repeat
#	--------------
#	Repeat a string, with optional delimiter
#
#	@param times		the number of times to repeat the string
#	@param delimiter	an optional delimiter
#	@returns			the repeated string

String.implement 'repeat', (times, delimiter = '') ->
	if --times
		return this + delimiter + this.repeat times, delimiter
	else
		return this



#	Function.solicit
#	----------------
#	• Invoke passed-in functions in order, asserting their return values. The first non-null and non-undefined result is returned.
#	• Somewhat similar to the built-in Function.attempt
#
#	@usage		Function.solicit(fn1, fn2, …)
#	@returns	the return value of the first 'successful' passed-in function, or null

Function.extend 'solicit', ->
	results = []
	for fn in Array.slice arguments
		result = fn()
		if result?
			results.push result
			break

	if results.length
		return results.pop()
	else
		return null



#	Element::index
#	--------------
#	Retrieve the index of the element in relation to its siblings, similar to jQuery.index()
#
#	@returns	the index

Element.implement 'index', ->
	return @getParent().getChildren().indexOf @



#	Events::bindEvents
#	Element::bindEvents
#	-------------------
#	• Bind one or more events at once, similar to jQuery.bind
#	• Event types may be delegates
#
#	@usage		eligibleObj.bindEvents('eventType', fn)
#	@usage		eligibleObj.bindEvents(['eventType1', 'eventType2', …], fn)
#	@returns	the subject

[Events, Element, Window, Document].invoke 'implement',
	'bindEvents', (events, fn) ->
		events = [events] if typeOf(events) is 'string'
		@addEvent event, fn for event in events



#	Element::cloneEventsDeep
#	------------------------
#	• Recursively clone events on a DOM (sub)tree
#   • Like the built-in Element::cloneEvents, but recursive
#	• Source: http://goo.gl/rCfk1>

Element.implement 'cloneEventsDeep', (from, type) ->
	if @getChildren().length > 0
		@getChildren().each (item, index) ->
			item.cloneEventsDeep from.getChildren()[index], type
		@cloneEvents from, type
	else
		@cloneEvents from, type
	return @



#	Elements::equalize
#	------------------
#	Equalize the heights of two or more elements
#
#	@param apply	whether or not to actually apply the found maximum height; set to false to get just the raw max height values
#	@returns		an object with max height data, signature:
#		maxHeight: maximum inner height
#		maxTotalHeight: maximum outer height

Elements.implement 'equalize', (apply) ->
	apply ?= true

	retval =
		maxHeight: 0
		maxTotalHeight: 0

	@each (el) ->
		prevHeight = el.style.height
		el.setStyle 'height', 'auto'

		size = el.measure ->
			return @getComputedSize()

		retval.maxHeight = size.height if size.height > retval.maxHeight
		retval.maxTotalHeight = size.totalHeight if size.totalHeight > retval.maxTotalHeight

		el.setStyle 'height', prevHeight

	# Apply?
	el.setStyle 'height', retval.maxHeight for el in @ if apply

	return retval



#	Element.Events.clickOutside
#	---------------------------
#	• Custom event that triggers when a click is registered outside of the element
#	• Adapted from Chris Pojer's implementation, which now seems to be gone from his site
#	• Archived: <http://web.archive.org/web/20100105002407/http://cpojer.net/blog/Custom_outerClick_event>

Element.Events.clickOutside =
	base: 'click'

	condition: (evt) ->
		evt.customType = 'clickOutside'
		evt.stopPropagation()
		return false

	onAdd: (fn) ->
		@getDocument().addEvent 'click', fn

	onRemove: (fn) ->
		@getDocument().removeEvent 'click', fn
