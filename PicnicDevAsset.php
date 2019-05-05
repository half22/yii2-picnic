<?php
namespace half\picnic;

use yii\web\AssetBundle;

class PicnicDevAsset extends AssetBundle
{
    public $sourcePath = '@vendor/picnic/assets';

    public $js = [
        'src/picnic.js',
        'src/components/backdrop.js',
        'src/components/controller.js',
        'src/components/event.js',
        'src/components/filter.js',
        'src/components/locale.js',
        'src/components/modal.js',
        'src/components/panel.js',
        'src/components/router.js',
        'src/components/scrollbar.js',
        'src/components/url.js',
        'src/extensions/javascript.js',
        'src/plugins/clicked.js',
        'src/plugins/dropdown.js',
        'src/plugins/form-submit-button.js',
        'src/plugins/lazy-load.js',
        'src/plugins/scroll-to.js',
        'src/plugins/sticky.js',
        'src/plugins/tabs.js',
        'src/plugins/title-bubble.js',
        'src/plugins/tooltip.js',

    ];

    public $depends = [
        'yii\web\JqueryAsset'
    ];
}