<?php
namespace picnic;

use yii\web\AssetBundle;

class PicnicAsset extends AssetBundle
{
    public $sourcePath = '@vendor/picnic/assets';

    public $js = [
        'picnic.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset'
    ];
}