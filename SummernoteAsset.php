<?php

namespace iqianfang\summernote;

use common\models\Helper;
use Yii;
use yii\web\AssetBundle;

class SummernoteAsset extends AssetBundle
{
    /** @var string */
    //public $sourcePath = '@bower/summernote/dist';
    public $sourcePath = '@vendor/iqianfang/yii2-summernote/assets/summernote/dist';
    /** @var array */
    public $depends = [
        'yii\bootstrap\BootstrapPluginAsset',
    ];

    /**
     * @inheritdoc
     */
    public function init()
    {
        $postfix = YII_DEBUG ? '' : '.min';
        $postfix .= Helper::isWx()&&Helper::getSystem()=='android' ? '.wx':'';

        $this->css[] = 'summernote.css';
        $this->js[] = 'summernote' . $postfix . '.js';

        parent::init();
    }
}
