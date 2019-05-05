(function(window, $, picnic) {

    'use strict';

    function deactivateTabs(tabs)
    {
        tabs.each(function(index, domElement)
        {
            var tab = $(domElement);
            deactivate(tab);
        });
    }

    function deactivate(tab)
    {
        var tabId = tab.data('tab-id');
        var tabContent = $('#' + tabId);
        tabContent.removeClass('is-active');
        tab.removeClass('is-active');
    }

    function activate(tab)
    {
        var tabId = tab.data('tab-id');
        var tabContent = $('#' + tabId);
        tabContent.addClass('is-active');
        tab.addClass('is-active');
    }

    function onClick(event)
    {
        var target = $(event.currentTarget);
        var tab = target.closest('*[data-tab-id]');
        var tabs = tab.siblings();
        var tabId = tab.data('tab-id');
        var element = target.closest('*[data-plugin=tabs]');

        if(!tab.hasClass('is-disabled'))
        {
            deactivateTabs(tabs);
            activate(tab);

            picnic.event.trigger('picnic.tabs.activated', element, {tabId: tabId});
        }

        return false;
    }

    var tabs = function(elements)
    {
        return elements.each(function(index, domElement)
        {
            var element = $(domElement);
            if(!element.data('plugin-tabs'))
            {
                element.find('*[data-tab-id] > a').on('click', onClick);
                element.data('plugin-tabs', true);
            }
        });
    };

    picnic.plugins.tabs = tabs;
    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = picnic.plugins.tabs;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return picnic.plugins.tabs; });
	}

})(window, jQuery, window.picnic || {});