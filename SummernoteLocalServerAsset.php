<?php

namespace iqianfang\summernote;

use Yii;
use yii\web\AssetBundle;

class SummernoteLocalServerAsset extends AssetBundle
{
    /** @var string */
    public $sourcePath = '@vendor/iqianfang/yii2-summernote/assets';



    /**
     * @inheritdoc
     */
    public function init()
    {
        $postfix = YII_DEBUG ? '' : '.min';

        $this->js[] = 'summernote-ls' . $postfix . '.js';

        parent::init();
    }
}
