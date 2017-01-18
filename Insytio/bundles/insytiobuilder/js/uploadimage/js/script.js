$(function(){
    $(document).on('change', '#uploadBtn', function(e){
        var $el = $(e.currentTarget);


        $('.fileUpload').find('span').text($el.val().replace('C:\\fakepath\\', ''));
    });
    var ul = $('.dnd ul');

//    $('.upload').click(function(){
//        // Simulate a click on the file input button
//        // to show the file browser dialog
//        $(this).parent().find('input').click();
//    });
//    var url = 'editor/upload';

    $('#fileupload').fileupload({
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
//        autoUpload: false,
        dropZone: $('.dnd'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
            var fwrap = $('[data-filename="'+data.files[0].name+'"]');
            if (!fwrap.length){
                var tpl = $('<li class="working" data-filename="'+data.files[0].name+'"><input type="text" class="knob" value="0" data-width="48" data-height="48"'+
                ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" /><p></p><span></span></li>');
                // Append the file name and file size
                tpl.find('p').text(data.files[0].name)
                    .append(' <i>' + formatFileSize(data.files[0].size) + '</i>');

                // Add the HTML to the UL element
                data.context = tpl.appendTo(ul);

                // Initialize the knob plugin
                tpl.find('input').knob();

                // Listen for clicks on the cancel icon
                tpl.find('span').click(function(){

                    if(tpl.hasClass('working')){
                        jqXHR.abort();
                    }

                    tpl.fadeOut(function(){
                        tpl.remove();
                    });

                });

                // Automatically upload the file once it is added to the queue
                var jqXHR = data.submit();
            } else {
                fwrap.css({'background-color': '#FFFFEE'});
                setTimeout(function(){
                    console.log('animating');
                    fwrap.css({'background-color': '#FFF'});
                    fwrap.animate({'background-color': '#FFFFFF'}, 1000, 'swing', function(){
                        console.log('animation complete');
                    });
                }, 1000);

            }

        },

        progress: function(e, data){
            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);

            // Update the hidden input field and trigger a change
            // so that the jQuery knob plugin knows to update the dial
            data.context.find('input').val(progress).change();

            if(progress == 100){
                data.context.removeClass('working');
            }
        },

        fail:function(e, data){
            // Something has gone wrong!
            data.context.addClass('error');
        },

        done: function (e, data) {
            console.log(data);
            $('.dnd').addClass('has-image');
            $.each(data.result.files, function (index, file) {
                console.log(file);
                var fwrap = $('[data-filename="'+file.name+'"]');
                fwrap.find('> div').remove();
                fwrap.find('.delete').remove();
                fwrap.find('.img').remove();
                fwrap.prepend('<div class="img"><img src="'+file.thumbnailUrl+'" /></div>').append('<a class="btn btn-danger delete" href="#" data-type="DELETE" data-url="'+file.deleteUrl+'">Delete</a>');

//                $('<p/>').text(file.name).appendTo(document.body);
            });
        }
    });


    $('.dnd').on('click', 'a.delete', function(e){
        e.preventDefault();
        var $el = $(e.currentTarget);
        var url = $el.data('url');
        var elementsWithThisFile = $('[data-filename="'+$el.parent().data('filename')+'"]');
        var r = $.ajax({
            url: url
        });
        elementsWithThisFile.slideUp();
        r.done(function(results){
            elementsWithThisFile.remove();
            console.log('lis left', $('.dnd').find('ul li').length);
            if($('.dnd').find('ul li').length == 0){
                $('.dnd').removeClass('has-image');
            }

        });
        r.fail(function(xhr){
            $el.parent().show();
            console.log('delete failed', JSON.parse(xhr.responseText));
        });
        console.log(url);
    });

    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    // Helper function that formats the file sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }

});