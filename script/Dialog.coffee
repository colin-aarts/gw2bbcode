###

Dialog.js
========

Copyright:      Colin Aarts <http://colinaarts.com>
License:        MIT <http://www.opensource.org/licenses/MIT>
Web/support:    n/a

###



'use strict'



#   Class: Dialog
#   ============
#   • Turns a (semantic) HTML structure into a tab panel widget
#   • Provides WAI-ARIA support
#   • Provides hash (fragment identifier) management support
#
#   @option overlay     a reference to an 'overlay' widget Class; must have 'show' and 'hide' methods.

window.Dialog = new Class

    Implements: [Options, Events]

    options:
        overlay: null
        destination: document.body
        containerElement: 'section'
        closeKeys: ['esc']
        handleHash: true


    #   Constructor body
    #   ----------------
    #
    #   @param container      container element for the dialog "window"

    initialize: (container, options) ->

        @setOptions Dialog.defaultOptions, options


        #
        #   Container
        #

        @container = do ->
            if typeOf(container) is 'element'
                return container
            else if typeOf(container[0]) is 'element'
                return container[0]
            else if typeOf(container) is 'string'
                container = new Element @options.containerElement
                container.set 'html', container
                return container
            else return null

        return null if not @container

        @container.set 'role', 'dialog'


        #
        #   Init keyboard manager
        #

        @options.closeKeys and do =>
            @keyboard = new Keyboard
                events:
                    'esc': (evt) => @hide()


        #
        #   Misc
        #

        # Store the instance on the element
        @container.store 'Dialog', @

        #
        @fireEvent 'load', @


        #
        #   Hash management
        #

        @options.handleHash and do =>
            hash = window.location.hash.slice 1
            @show() if hash is @container.get 'id'



    #   Dialog::show
    #   -----------
    #   Show the dialog

    show: ->

        # Hash
        @options.handleHash and window.history.pushState and do =>
            id = @container.get 'id'
            return if not id
            window.history.pushState {}, '', "##{id}"

        # Toggle @aria-hidden
        @container.set 'aria-hidden', 'false'

        # Show overlay
        @options.overlay and @options.overlay.show()

        # Enable keyboard manager
        @keyboard.activate() if @keyboard

        # Set a class on the documentElement to signal that a dialog is active
        window.document.documentElement.addClass 'has-active-dialog'

        #
        @fireEvent 'show', @
        return @



    #   Dialog::hide
    #   -----------
    #   Hide the dialog

    hide: ->

        # Hash
        @options.handleHash and window.history.pushState and do =>
            window.history.pushState {}, '', '#'

        # Toggle @aria-hidden
        @container.set 'aria-hidden', 'true'

        # Hide overlay
        @options.overlay and @options.overlay.hide()

        # Pass keyboard control back to the previously active manager
        @keyboard.relinquish() if @keyboard

        # Remove the class on the documentElement that signals that a dialog is active
        window.document.documentElement.removeClass 'has-active-dialog'

        #
        @fireEvent 'hide', @
        return @



    #   Dialog::toggle
    #   -------------
    #   Toggle the dialog's visibility

    toggle: ->

        if 'true' is @container.get 'aria-hidden'
            @show()
        else if 'false' is @container.get 'aria-hidden'
            @hide()

        return @
