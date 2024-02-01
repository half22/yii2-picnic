<?php
namespace half\picnic;

use yii\web\AssetBundle;

class PicnicDevAsset extends AssetBundle
{
    public $sourcePath = '@vendor/half/yii2-picnic/src';

    public $js = [
        'picnic.js',
        'components/backdrop.js',
        'components/controller.js',
        'components/event.js',
        'components/filter.js',
        'components/locale.js',
        'components/responsive.js',
        'components/layer.js',
        'components/modal.js',
        'components/panel.js',
        'components/sheet.js',
        'components/router.js',
        'components/preloader.js',
        'components/scrollbar.js',
        'components/url.js',
        'extensions/javascript.js',
        'extensions/jquery.js',
        'plugins/clicked.js',
        'plugins/dropdown.js',
        'plugins/form-submit-button.js',
        'plugins/toggle-password.js',
        'plugins/lazy-load.js',
        'plugins/scroll-to.js',
        'plugins/scroll-top.js',
        'plugins/horizontal-scroll.js',
        'plugins/sticky.js',
        'plugins/tabs.js',
        'plugins/title-bubble.js',
        'plugins/tooltip.js',
        "plugins/floating-label.js",
        "plugins/drag-scroll.js",
        "plugins/collapsable.js",
    ];

    public $depends = [
        'yii\web\JqueryAsset'
    ];
}
