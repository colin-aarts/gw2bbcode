###

Overlay.js
==========

Copyright:      Colin Aarts <http://colinaarts.com>
License:        MIT <http://www.opensource.org/licenses/MIT>
Web/support:    n/a

###



'use strict'



#   Class: Overlay
#   ==============
#   • Provides a 'page overlay', usually for use with page-modal elements.
#   • Provides WAI-ARIA support
#   • Provides hash (fragment identifier) management support
#
#   @option handleHash      whether or not to handle "history": update hash on panel activation, and respond to |hashchange| events

window.Overlay = new Class

    Implements: [Options, Events, Class.Occlude]

    options:
        handleHash: true
        container: 'div'
        destination: 'body'


    #   Constructor body
    #   ----------------
    #
    #   @param options      an options object

    initialize: (options) ->

        @setOptions Overlay.defaultOptions, options


        #
        #   Container
        #

        @container = do =>
            el = @options.container
            if typeOf(el) is 'element'
                return container
            else if typeOf(el[0]) is 'element'
                return el[0]
            else if typeOf(el) is 'string'
                return (new Element el)
            else return null

        return null if not @container

        # Has a Overlay has already been initialized on the container?
        return @occluded if @occlude 'Overlay', @container


        #
        #   Inject container
        #

        do =>
            destination = @options.destination
            if typeOf(destination) is 'element'
                # void
            else if typeOf(destination[0]) is 'element'
                destination = destination[0]
            else if typeOf(destination) is 'string'
                destination = $$(destination)[0]
            else destination = document.body

            @container.addClass 'dialog-overlay'
            @container.set 'aria-hidden', 'true'
            @container.inject destination



        #
        #   Misc
        #

        # Store the instance on the container
        @container.store 'Overlay', @

        #
        @fireEvent 'load', @



    #   Overlay::show
    #   -------------
    #   Show the overlay
    #
    #   @returns    the instance

    show: ->

        @container.set 'aria-hidden', 'false'

        window.document.documentElement.addClass 'has-active-overlay'

        @fireEvent 'show', @
        return @



    #   Overlay::hide
    #   -------------
    #   Hide the overlay

    #   @returns    the instance

    hide: ->

        @container.set 'aria-hidden', 'true'

        window.document.documentElement.removeClass 'has-active-overlay'

        @fireEvent 'hide', @
        return @



    #   Overlay::toggle
    #   ---------------
    #   Toggle the overlay's visibility

    #   @returns    the instance

    toggle: ->

        if 'true' is @container.get 'aria-hidden'
            @show()
        else if 'false' is @container.get 'aria-hidden'
            @hide()

        return @
