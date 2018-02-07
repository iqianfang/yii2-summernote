const summernoteLocalServerUploader = {

    signEndpoint: '',
    folder: '',
    maxFileSize: 1024000,
    expiration: '',
    files: [],
    editor: '',
    flag: false,

    fileSlugify: function (s) {
        var _slugify_strip_re = /[^\w\s-.]/g;
        var _slugify_hyphenate_re = /[-\s]+/g;
        s = s.replace(_slugify_strip_re, '').trim().toLowerCase();
        s = s.replace(_slugify_hyphenate_re, '-');
        return s;
    },

    getFolder: function () {
        if (typeof this.folder === 'string') {
            return this.folder;
        } else {
            return this.folder();
        }
    },
    sendImage: function (i) {
        if (i < summernoteLocalServerUploader.files.length) {
            var formData = new FormData();
            var file = summernoteLocalServerUploader.files[i];
            try {
                lrz(file, {width: 1024})
                    .then(function (rst) {
                        console.log('压缩成功');
                        formData = rst.formData;
                        $.ajax({
                            url: summernoteLocalServerUploader.signEndpoint+'?hash='+Math.random(),
                            //async: false,
                            data: formData,
                            dataType: 'json',
                            type: 'POST',
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (data, textStatus) {
                                if (textStatus === 'success') {
                                    if (data.status) {
                                        var url = data.data.url;
                                        summernoteLocalServerUploader.editor.summernote('insertImage', url, function ($image) {
                                            $image.attr('class', 'attach');
                                            $image.attr('alt', data.data.attachment_id);
                                            if (i == summernoteLocalServerUploader.files.length) {
                                                //$('#progress').modal('hide');
                                                setTimeout("summernoteLocalServerUploader.editor.summernote('insertParagraph');summernoteLocalServerUploader.editor.summernote('focus');", 1000);
                                            }
                                        });
                                        summernoteLocalServerUploader.editor.summernote('insertParagraph');
                                    } else {
                                        data.msg.forEach(function (item, index, arr) {
                                            alert(item);
                                        });
                                    }
                                }
                                i++;
                                summernoteLocalServerUploader.sendImage(i);
                            },
                            error: function () {
                                console.log('进入 失败' + i);
                                if (i == summernoteLocalServerUploader.files.length) {
                                    //$('#progress').modal('hide');
                                }
                                i++;
                                summernoteLocalServerUploader.sendImage(i);
                            }
                        });
                    })
                    .catch(function (err) {
                        // 处理失败会执行
                        console.log(err);
                        formData.append('file', file);
                        $.ajax({
                            url: summernoteLocalServerUploader.signEndpoint,
                            //async: false,
                            data: formData,
                            dataType: 'json',
                            type: 'POST',
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (data, textStatus) {
                                if (textStatus === 'success') {
                                    if (data.status) {
                                        var url = data.data.url;
                                        summernoteLocalServerUploader.editor.summernote('insertImage', url, function ($image) {
                                            $image.attr('class', 'attach');
                                            $image.attr('alt', data.data.attachment_id);
                                            if (i == summernoteLocalServerUploader.files.length) {
                                                //$('#progress').modal('hide');
                                                setTimeout("summernoteLocalServerUploader.editor.summernote('insertParagraph');summernoteLocalServerUploader.editor.summernote('focus');", 1000);
                                            }
                                        });
                                        summernoteLocalServerUploader.editor.summernote('insertParagraph');
                                    } else {
                                        data.msg.forEach(function (item, index, arr) {
                                            alert(item);
                                        });
                                    }
                                }
                                i++;
                                summernoteLocalServerUploader.sendImage(i);
                            },
                            error: function () {
                                console.log('进入 失败' + i);
                                if (i == summernoteLocalServerUploader.files.length) {
                                    //$('#progress').modal('hide');
                                }
                                i++;
                                summernoteLocalServerUploader.sendImage(i);
                            }
                        });
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });
            } catch (err) {
                console.log('压缩失败，直接上传！');
                formData.append('file', file);
                $.ajax({
                    url: summernoteLocalServerUploader.signEndpoint,
                    //async: false,
                    data: formData,
                    dataType: 'json',
                    type: 'POST',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data, textStatus) {
                        if (textStatus === 'success') {
                            if (data.status) {
                                var url = data.data.url;
                                summernoteLocalServerUploader.editor.summernote('insertImage', url, function ($image) {
                                    $image.attr('class', 'attach');
                                    $image.attr('alt', data.data.attachment_id);
                                    if (i == summernoteLocalServerUploader.files.length) {
                                        //$('#progress').modal('hide');
                                        setTimeout("summernoteLocalServerUploader.editor.summernote('insertParagraph');summernoteLocalServerUploader.editor.summernote('focus');", 1000);
                                    }
                                });
                                summernoteLocalServerUploader.editor.summernote('insertParagraph');
                            } else {
                                data.msg.forEach(function (item, index, arr) {
                                    alert(item);
                                });
                            }
                        }
                        i++;
                        summernoteLocalServerUploader.sendImage(i);
                    },
                    error: function () {
                        console.log('进入 失败' + i);
                        if (i == summernoteLocalServerUploader.files.length) {
                            //$('#progress').modal('hide');
                        }
                        i++;
                        summernoteLocalServerUploader.sendImage(i);
                    }
                });
            } finally {

            }
        } else {

        }
    }
};
