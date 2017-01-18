//tooltips
$('.options a').tooltip();

$('.esp_icons').find('.icon').on('click', function(e){
    $(".esp_icons").find(".icon").removeClass("active");
    $(".api_info").removeClass("active");
    $("."+$(this).data('provider')).addClass("active");
    $(this).addClass('active');
});


$('#builder-account-save').submit(function(e){

    $('#password, #confirm-password').removeClass('error').css({'outline': 'none'});
    if($('#password').val() && $('#password').val() !== $('#confirm-password').val()) {
        e.preventDefault();
        $('#password, #confirm-password').addClass('error').css({'outline': '1px solid #c00'});
    }
});


//edit template overlay
$("a.templateedit_duplicate").on('click',function(e){
	e.preventDefault();
	$(".templatename_pop").find(".template_id").val("");
	$(".templatename_pop").find(".purchase_id").val("");
	$(".templatename_pop").find(".edit_id")
	    .val($(this).attr("data-edit_id"));
	
	$(".templatename_pop").css('display','block');
});
$("a.templatebought_duplicate").on('click',function(e){
    e.preventDefault();
    $(".templatename_pop").find(".edit_id").val("");
    $(".templatename_pop").find(".template_id").val("");
    $(".templatename_pop").find(".purchase_id")
        .val($(this).attr("data-purchase_id"));
    
    $(".templatename_pop").css('display','block');
});
$("a.template_duplicate").on('click',function(e){

    e.preventDefault();
    $(".templatename_pop").find(".edit_id").val("");
    $(".templatename_pop").find(".purchase_id").val("");
    $(".templatename_pop").find(".template_id")
        .val($(this).attr("data-template_id"));

    $(".templatename_pop").css('display','block');

    var freeWrapper = $(this).parents('.options');

    if (freeWrapper.length > 0){
      var submit = $('.templatename_pop').find('input[type="submit"]');
      if(submit.length > 0) {
        submit.on('click', function(e){
          console.log(freeWrapper);
          var templateName = freeWrapper.find('[data-title]').attr('data-title');
          console.log(templateName);


          var data = {
            "template name": templateName
          };
          analytics.track("Free template used", data);
        });

      }
    }
});

//export template overlay
$("a.temp_export").on('click',function(e){
	e.preventDefault();
	$(".exportoptions_pop").css('display','block');

    $('#template_type, #template_id, #templateedit_id').remove();

    $('#export-template').append('<input type="hidden" id="template_type" value="'+$(this).data('template_type')+'"/>');

    if($(this).data('purchase_id')) {
        $('#export-template').append('<input type="hidden" id="template_id" value="'+$(this).data('purchase_id')+'"/>');
    }else if($(this).data('template_id')) {
        $('#export-template').append('<input type="hidden" id="template_id" value="'+$(this).data('template_id')+'"/>');
    }else if($(this).data('templateedit_id')) {
        $('#export-template').append('<input type="hidden" id="templateedit_id" value="'+$(this).data('templateedit_id')+'"/>');
    }


});

//download template overlay
$("a.temp_download").on('click',function(e){
	e.preventDefault();

    templateNameDownload = $(this).parents(".options").find("[data-title]").attr("data-title");

	$(".download_pop").fadeIn();

	$(".download_pop").find("form").attr("action", $(this).attr("href"));
	$(".download_pop").find("form").find(".template_type").val($(this).attr("data-type"));
	$(".download_pop").find("form").find(".template_id").val($(this).attr("data-tid"))
});

$(".download_pop").find("form").submit(function(e){



    var arrayUnique = function(a) {
        return a.reduce(function(p, c) {
            if (p.indexOf(c) < 0) p.push(c);
            return p;
        }, []);
    };

    e.preventDefault();
    var type = $(this).find('.template_type').val();
    var dl_type = $(".download_pop").find("form").find('.highlight').prev().val();
    window.intercomSettings['download'] = true;



    if(typeof window.intercomSettings['download_type'] === 'undefined') {
        window.intercomSettings['download_type'] = dl_type;
    } else {
        var dlt = window.intercomSettings['download_type'].split(',');
        dlt.push(dl_type);
        window.intercomSettings['download_type'] = arrayUnique(dlt).join(',');
    }

    if(window.Intercom) {
        Intercom('update', window.intercomSettings);
    }

    var action = $(this).attr('action');


    setTimeout(function(){

        var url = action + $(".download_pop").find("form").find('.highlight').prev().val() + '/'+type;
        //console.log(url);
        window.location = action + $(".download_pop").find("form").find('.highlight').prev().val() + '/'+type;

        analytics.identify({
          "Download": true
        });

        var dataTrack = {
          "provider": dl_type,
          "template name" : templateNameDownload
        };

        analytics.track("Download Template", dataTrack);

    }, 2000);

});

$('.temp_trash').on('click', function(e){
    e.preventDefault();
    var href = e.currentTarget.href;
    var name = $(e.currentTarget).data('template-name');
    var from = $(e.currentTarget).data('from');
    var id = $(e.currentTarget).data('template-id');
    $(".deletetemplate_pop").fadeIn();
    $(".deletetemplate_pop").find('h3 span').text(name);
    $('#delete-template-form').attr('action', href);
    $('#delete-template-id').val(id);
});

$('#export-template').submit(function(e){
    e.preventDefault();

    if($('#export_type').val()) {

        var data = {
            'export_type': $('#export_type').val(),
            'template_type': $('#template_type').val(),
            'purchase_id': $('#purchase_id').val(),
            'template_id': $('#template_id').val(),
            'templateedit_id': $('#templateedit_id').val(),
            'template_name': $('#template_name').val()
        };


        var ex = $('#export-template');

        var providerName = $('#export_type').val();

        var exporting = $.ajax({
            'url': ex.attr('action'),
            'data': data,
            'type':'POST',
            'datatype': 'html'
        });
        var o = $('.overlaybg');
        ex.fadeOut(function(){
            ex.parent().find('.spinner').show();
        });

        exporting.done(function(data) {

            analytics.identify({
              "Export": true
            });
            analytics.track("Export template",
              {
                "provider": providerName
              });

            window.intercomSettings['export'] = true;
            if(window.Intercom) {
                console.log(intercomSettings);
                Intercom('update', window.intercomSettings);
            }
            ex.parent().find('.spinner').fadeOut(function(){
                ex.after(data);
            });
        });

        exporting.fail(function(xhr) {
            ex.parent().find('.spinner').fadeOut(function(){
                ex.after('<div class="note"><div class="note_red"></div><div class="note_msg">Export failed</div></div>');
            });
        });
    }
});

$("form .closeoverlay, .cross").on('click',function(){
    var o = $(this).parents('.overlaybg');
	o.fadeOut().find('.note').remove();
    o.find('.spinner').hide();
    $('#export-template').show();
});

//add bg 
$( ".addbg" ).click(function() {
   $(this).parents(".downloadfields")
       .find('.highlight').removeClass("highlight")
       .prev().prop("checked", false);

   $( this ).addClass("highlight");

});



//$(document).delegate('*[data-toggle="lightbox"], *[data-toggle="tooltip lightbox"]', 'click', function(event) {
//    event.preventDefault();
//    $(this).ekkoLightbox();
//});

$(document).ready(function(){
    if(typeof window.intercomSettings['webdesigner'] === 'undefined') {
        $('.webdesigner_pop').show();
    }

    $('.webdesigner').on('click', function(e){
        e.preventDefault();
        var $el = $(this);
        var type = "";
        if ($el.data('value') === true) {
            window.intercomSettings['webdesigner'] = true;
            type = "Seller";
        } else {
            window.intercomSettings['webdesigner'] = false;
            type = "Buyer";
        }
        var a = $.ajax({
            type: 'POST',

            url: "/save_intercom",
            data: {
                'intercom_data': {
                    'webdesigner': window.intercomSettings['webdesigner']
                }
            }
        });
        a.done(function(res){

            analytics.identify({
              'Type': type
            });
            analytics.track('Choose type', {
              'Type': type
            });


            if(window.Intercom) {
                Intercom('update', window.intercomSettings);
            }
        });

        $(this).parents('.overlaybg').fadeOut();

    });

    $('#upload-template').on('submit', function(e){
        e.preventDefault();
        var form = $(e.currentTarget);
        window.intercomSettings['templates_upload'] = true;
        if(window.Intercom) {
            Intercom('update', window.intercomSettings);
        }
        setTimeout(function(){
            form.get(0).submit();
        }, 1000);
    });

    $(document).on('click', '.temp_preview', function(e){
        e.preventDefault();
        var $el = $(e.target);
        var href = $el.attr('href');
        $(href).find('.ekko-lightbox-container').html($(href+'-html').html());
        $(href).addClass('in').fadeIn();

    });

    $('.modal').on('click', '.close', function(){
        $('.modal').removeClass('in').fadeOut();
    });

    $('.carousel').bxSlider({
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 3,
        slideWidth: 328,
        slideMargin: 54,
        hideControlOnEnd: true,
        infiniteLoop: false
    });

    $('.order-dropdown').on('click', 'a.selected', function(e){
        e.preventDefault();
        $('ul.sortable').toggle();
    });

  var href = document.location.href;
  var templatePage = new RegExp('\/mytemplates');
  var uploadPage = new RegExp('\/uploadsTemplate');
  var settingsPage = new RegExp('\/settings');
  var data = "";
  if(templatePage.test(href)) {
    data = "My Templates";
  }else if(uploadPage.test(href)){
    data = "Upload";
  }else if(settingsPage.test(href)){
    data = "Settings";
  }else{
    data = "Dashboard";
  }

  analytics.page(data);
  $('.buynow').on('click', 'a', function(){
    var dataBuy = {
      "template name": $(this).attr('data-tplName')
    };
    analytics.track("Buy template", dataBuy);
  });

});