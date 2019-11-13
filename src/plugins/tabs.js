(function(window, $, picnic) {

    'use strict';

    picnic.tabsState = {};

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
        var tabId = tab.children().eq(0).data('tab');
        var tabContent = $('#' + tabId);
        tabContent.removeClass('is-active');
        tab.removeClass('is-active');
    }

    function activate(tab)
    {
        var tabId = tab.children().eq(0).data('tab');
        var tabContent = $('#' + tabId);
        tabContent.addClass('is-active');
        tab.addClass('is-active');

        saveState(tab);
    }

    function saveState(tab)
    {
        var element = tab.closest('*[data-plugin=tabs]');
        var tabId = tab.children().eq(0).data('tab');

        if(element.data('state-id'))
        {
            picnic.tabsState[element.data('state-id')] = tabId;
        }
    }

    function restoreState(element)
    {
        if(element.data('state-id') && picnic.tabsState[element.data('state-id')])
        {
            var tabId = picnic.tabsState[element.data('state-id')];
            var tab = element.find('*[data-tab=' + tabId + ']').parent();
            var tabs = tab.siblings();

            if(tab.length && !tab.hasClass('is-disabled'))
            {
                deactivateTabs(tabs);
                activate(tab);

                picnic.event.trigger('picnic.tabs.activated', element, {tabId: tabId});
            }
        }
    }

    function onClick(event)
    {
        var target = $(event.currentTarget);
        var tab = target.parent();
        var tabs = tab.siblings();
        var tabId = target.data('tab');
        var element = target.closest('*[data-plugin=tabs]');

        if(!tab.hasClass('is-disabled'))
        {
            deactivateTabs(tabs);
            activate(tab);

            picnic.event.trigger('picnic.tabs.activated', element, {tabId: tabId});
        }

        return false;
    }

    $.extend($.fn, {
        picnicTabs: function () {
            return this.each(function (index, domElement) {
                var element = $(domElement);

                element.find('*[data-tab]').off('click', onClick);
                element.find('*[data-tab]').on('click', onClick);
                element.data('plugin-tabs', true);

                restoreState(element);
            });
        }
    });

    window.picnic = picnic;

    if(typeof exports === 'object')
    {
		module.exports = $.fn.picnicTabs;
	}
	else if(typeof define === 'function' && define.amd)
	{
		define(function() { return $.fn.picnicTabs; });
	}

})(window, jQuery, window.picnic || {});