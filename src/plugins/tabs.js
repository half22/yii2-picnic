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
        var tabId = tab.data('tab');
        var tabContent = $('#' + tabId);
        tabContent.removeClass('is-active');
        tab.removeClass('is-active');
    }

    function activate(tab)
    {
        var tabId = tab.data('tab');
        var tabContent = $('#' + tabId);
        tabContent.addClass('is-active');
        tab.addClass('is-active');
    }

    function onClick(event)
    {
        var target = $(event.currentTarget);
        var tab = target.closest('*[data-tab]');
        var tabs = tab.siblings();
        var tabId = tab.data('tab');
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

                element.find('*[data-tab] > *').off('click', onClick);
                element.find('*[data-tab] > *').on('click', onClick);
                element.data('plugin-tabs', true);
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