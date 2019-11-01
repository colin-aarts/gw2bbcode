'use strict'



window.addEvent 'domready', (evt) ->
	window.MyGW2BBCode = new GW2BBCode
		containers: '#gw2bbcode-test'
		basePath: if /\.html$/.test location.pathname then '' else 'gw2bbcode/'
		tooltipOptions:
			tooltipPosition: offset: y: -30
		onLoad: ->
			document.documentElement.scrollTop = 99999

	do ->
		return
		stats = GW2BBCode.computeStats [{ label: 'test', profession: 'Guardian', slot: 'Greatsword', type: undefined }]
		testStats = GW2BBCode.skillNamesToTemplateString stats.test
		$('test').set 'text', testStats
		MyGW2BBCode.update()

	# General stats
	# $('stats').adopt GW2BBCode.getStatsAsHTML true
