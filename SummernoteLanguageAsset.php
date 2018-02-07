<?php

namespace iqianfang\summernote;

use Yii;
use yii\web\AssetBundle;

class SummernoteLanguageAsset extends AssetBundle
{
    /** @var string */
    public $language;
    /** @var string */
    //public $sourcePath = '@bower/summernote/lang';
    public $sourcePath = '@vendor/iqianfang/yii2-summernote/assets/summernote/lang';
    /** @var array */
    public $depends = [
        'iqianfang\summernote\SummernoteAsset'
    ];

    /**
     * @inheritdoc
     */
    public function registerAssetFiles($view)
    {
        $this->js[] = 'summernote-' . $this->language . '.js';
        parent::registerAssetFiles($view);
    }
}
