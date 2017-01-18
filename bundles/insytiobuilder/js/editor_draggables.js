
function dragactions(){

    $('.view').find('table:first').find('td:first').mouseenter(function(){$(this).find('table:first').addClass('selecthover');});
    $('.view').find('table:first').find('td:first').mouseleave(function(){$(this).find('table:first').removeClass('selecthover');});



}


/////////COLOR SELECTOR///////////////////////
function colorselector(){

    $('.colorSelectorinner').hover(function(){
        var seldiv= $(this);

        $(seldiv).ColorPicker({
            color: '#0000ff',
            onShow: function (colpkr) {
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                $(seldiv).css('background-color', '#' + hex).attr('bgcolor','#' + hex);
                //var color = $(this).css( "background-color" );
                $(seldiv).parent('[st-bgcolor="edit"]').attr('bgcolor','#' + hex);
                //$('.sort table:first td:first table:first').css('backgroundColor', '#' + hex).attr('bgcolor','#' + hex);
            }
        });

    });

}



$(document).ready(function () {
    $('.view').find('table:first').find('td:first').mouseenter(function(){$(this).find('table:first').addClass('selecthover');});
    $('.view').find('table:first').find('td:first').mouseleave(function(){$(this).find('table:first').removeClass('selecthover');});

    $(".editor_rightside .emailrender").sortable({
        connectWith: ".module",
        opacity: .8,
        handle: ".drag",
        axis: "y",
        placeholder:'highlight',
        helper:function(){
            return $("<div class='highlight' style='height:40px;text-align:center;line-height:40px;'><div style='background-color:#1abc9c;width:600px;margin:auto; color:#ffffff;'>Moving</div></div>");
        }
    });

    $(".modules_sidebar .module").draggable({
        connectToSortable: ".emailrender",
        placeholder: "highlight",
        helper:function(){
            var modimg=$(this).find('.mod_thumb img').attr('src');
            return $("<div style='position:absolute;background-color:#ffffff;border-radius:3px;border:1px solid #dadada;width:40px;height:40px;'><img src='"+modimg+"' width='40' height='40'></div>");
        },
        cursorAt: {left: -1, top: -10},
        // start:function(){
        // 	var winh=$(".emailrender").height();
        //     $(".emailrender").css("height",winh+100);
        // },
        drag: function (e, t) {
            t.helper.width(40);

            t.helper.find('.preview').remove();
            t.helper.find('.module').css({"background":"none!important","border":"none!important"});
            $('.emailrender').find('.preview').remove();
            //$(".emailrender").css("padding-bottom", "90px");
        },
        stop: function () {
            $('.view').find('table:first').find('table:first .colorSelectorinner:first').css({"margin-left":"-20px"});
            $('.emailrender a').click(function(event) {event.preventDefault();});

            //mouseover();
            //handleJsIds()
            dragactions();
            move_up_down();
            colorselector();
            tinymcereload();
            $('.innerbg').mouseenter(function(){
                var seldiv=$(this).parents('[st-sortable]');
                $(this).colpick({
                    layout:'hex',
                    submit:0,
                    onChange:function(hsb,hex,rgb,fromSetColor) {
                        $(seldiv).find('table:first').attr('bgcolor','#' + hex);
                    }
                });
            });

            $('.buttonbg').mouseenter(function(){
                var seldiv=$(this).parent('[st-button]');
                $(this).colpick({
                    layout:'hex',
                    submit:0,
                    onChange:function(hsb,hex,rgb,fromSetColor) {
                        seldiv.attr('bgcolor','#' + hex);
                        seldiv.css('background-color','#' + hex);
                    }
                });
            });
            //monkey
            //$('.imgpop').prepend('<div class="uploader_wrap"><div class="upload_buttons"><div class="img_link"></div><div class="img_upload"></div></div></div>');
            upload_buttons();


            //$('[st-content]')attr("mc:allowdesigner","");
            //$('[st-content]').attr(" mc:allowtext","contentattr");

            //monkey
            // var winh=$(".emailrender").height();
            // $(".emailrender").css("height",winh-100);


        }
    });



});




