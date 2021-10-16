var liveNewsIntervalHandle = null, liveNewsActive = false;

function detectBigBannerSize(url,percent) {
    // get default percent 90
    percent = (typeof percent !== 'undefined') ? percent : 90;
    // check image size and show whole 468x60 or make it 80/90 % for 728x90
    var img = new Image();
    img.src = url;
    img.onload = function() {
        if ( this.width  == 728 ) {
            // show 90% of banner
            $('#banner_big_preview').attr('width', percent+"%");
            $('#banner_big_preview').attr('height', percent+"%");
            $('#banner_big_upload_info_'+percent).show();
        }
        else if( this.width  == 468 ) {
            // show whole banner
            $('#banner_big_preview').attr('width', this.width);
            $('#banner_big_preview').attr('height', this.height);
            $('#banner_big_upload_info_'+percent).hide();
        }
    }
}

calculateFee = function(obj){

    if (fees !== undefined)
    {
        // get from inside html script tag, consts loaded from php
        useFees = fees.pif;

        var amount = parseFloat(obj.val()),
            fee = 0;

        if (!isNaN(amount) && ( amount >= useFees.min ) && ( amount <= useFees.max) )
        {
            if (useFees.percent) fee += amount * useFees.percent / 100;
            if (useFees.fixed) fee += useFees.fixed;
            if (useFees.max) fee = Math.min(fee, useFees.max);

            fee = parseInt(fee);

            $('#fee').html(fee+' BAPs');
            $('#total').html((amount - fee)+' BAPs');

            return;
        }

        $('#fee').html('--');
        $('#total').html('--');
    }
};


$(document).ready(function ()
{
    loadBanners();
    bindForms();

    if (window.location.href.indexOf('/splash/') === -1 && window.location.href.indexOf('/admin/') === -1 && mtv.userState == 'loggedin') {
        liveNews();
        liveNewsIntervalHandle = setInterval(liveNews, 15000);
    }

    $(document).on('click', 'a.click_sort', function(e){
        e.preventDefault();

        var container = $('div.pageable');

        container.block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: '#1B2024',
                opacity: 0.85,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: 'none',
                color: '#fff'
            }
        });

        $.post($(this).attr('href'), function(data){
            container.html(data);
            container.unblock();
        });
    });

    $(document).delegate('a.popup', 'click', function(e){
        e.preventDefault();

        var link = $(this);
        var top = link.attr('top');
        var modal = $('#modal_remote');

        modal.find('.modal-content').html('');

        $.ajax({
            url: link.attr('href'),
            cache: false,
            dataType: "html",
            success: function(data) {
                modal.find('.modal-content').html(data);
                modal.show();
            }
        });
    });

    $(document).on('change', '.dropdownAds', function(e) {
        var url = $("option:selected").data('url');
        window.location.replace(url);
    });

    // scaling bigger banner to 80/90 %
    if ($("#banner_big_preview").length > 0){

        // run detection once but look for 80 or 90 percent
        if ($("#banner_big_upload_info_80").length > 0){
            detectBigBannerSize($("#banner_big_preview").attr('src'),80);
        }
        if ($("#banner_big_upload_info_90").length > 0){
            detectBigBannerSize($("#banner_big_preview").attr('src'));
        }
    }

    if ($('#pay_proof_filter').length > 0){

        $(document).on('click', 'input[type="submit"]', function(e){
            $(this).hide();

            // attach to upload button image for ajax loader
            $(this).next().append($('<span class="loading"><img src="' + mtv.assetPath + 'images/loading.gif" /> ...</span>'));

        });

        $(document).on('click', '.add_proof_link', function(e){
            e.preventDefault();

            $(this).hide();
            // show upload button
            $(this).next().show();

        });

        $('.hide_proof_link').hide();


        $(document).on('click', '.hide_proof_link', function(e){
            e.preventDefault();

            $(this).hide();

            // remove whole tr with presented image
            $(this).parent().parent().next('tr').hide(400);

            // show 'view' button
            $(this).parent().find('.view_proof_link').show();

        });

        $(document).on('click', '.view_proof_link', function(e){
            e.preventDefault();

            $(this).hide();

            // view image under the entry within new row
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var img = document.createElement("img");
            $(td).attr('colspan',6).css('text-align', 'center');

            // create copy of hidden image and show it to the world
            $(img).attr('src', $(this).siblings('img').attr('src')).attr('width','700px');

            $(img).on('click', function(e){
                window.open($(this).attr('src'), '_blank');
            });

            $(td).append(img);
            $(tr).append(td);
            $(tr).hide();
            $(tr).insertAfter($(this).parent().parent()).fadeIn(400);
            // show 'hide' button

            $(this).parent().find('.hide_proof_link').show();

        });

        //manage filter: 'all', 'accepted', 'user'
        $(document).on('change',"#pay_proof_filter", function(e){
            e.preventDefault();

            var container = $('div.pageable');

            container.block({
                message: '<i class="icon-spinner2 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#1B2024',
                    opacity: 0.85,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none',
                    color: '#fff'
                }
            });

            $.post('guest/pay_proof_sub/' + this.value, function(data){
                container.html(data);
                container.unblock();
            });

        });
    }


    if ($('#pifFrm').length > 0) {

        calculateFee($('#pif_amount'));

        $('#pif_amount').on('keyup change', function () {
            $(this).val($(this).val().replace(/,/g, "."));
            calculateFee($(this));
        });

        $('#submit_form').click(function(e) {
            e.preventDefault();

            var errors = '';

            var formSuccess = false;
            var form = $('#pifFrm');
            var formData = form.serializeArray();

            $('#pif_username_info').html('');
            $('#pif_amount_info').html('');
            $('#submit_info').html('');

            $("input, select").css('border', '');

            $('#submit_form').hide();
            $('#submit_image_loading').show();

            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: formData,
                dataType: 'json',
                success: function(data) {
                    if(data.errors)
                    {
                        formSuccess = false;
                        $('#submit_info').html('Errors are marked in red, please correct the input data.');

                        for (var el in data.errors)
                        {
                            $('#' + el, form).css('border', '2px solid red');
                            if(data.errors[el] != "")
                            {
                                $('#' + el + '_info', form).html(data.errors[el]);
                            }
                        }
                    }
                    else if(data.error)
                    {
                        formSuccess = false;
                        $('#submit_info').html('Error: ' + JSON.stringify(data.error));
                    }
                    else
                    {
                        if (data.success)
                        {
                            formSuccess = true;
                        }
                    }
                },
                error: function(data) {
                    alert(JSON.stringify(data));
                    $('#submit_info').html('Server connection error. Please try again.');
                    $('#submit_image_loading').hide();
                    $('#submit_form').show();
                },
                complete: function() {
                    if (formSuccess)
                    {
                        $('#submit_form_loading').html('Success!');
                        window.location.reload(true);
                    }
                    else
                    {
                        $('#submit_image_loading').hide();
                        $('#submit_form').show();
                    }
                }
            });
        });
    }

    // get referees names auto completion
    if ($('.refereesAutocomplete').length > 0) {

        // Autocomplete starts here

        var loadedRefereeData = new Array();

        function refereeAutocomplete(data) {
            var keyword = $(".refereesAutocomplete").val();

            // store loaded results
            loadedRefereeData = data;

            // check if there is more items than limit and show '...' then
            if (loadedRefereeData.length == (pifAutoCompleteLimit + 1) ) {
                loadedRefereeData[pifAutoCompleteLimit] = '...';
            }

            // show it
            $('#referee_results').html('');
            $(loadedRefereeData).each(function(key, value) {
               $('#referee_results').append('<div class="item">' + value + '</div>');
            });

            $('.item').click(function() {
                var text = $(this).html();
                if (text!='...') {
                    $('#pif_username_info').html('');
                    $("#pif_username").css('border', '');
                    $('.refereesAutocomplete').val(text);
                }
            })
        }

        $('.refereesAutocomplete').keyup(function() {
            var keyword = $(".refereesAutocomplete").val();
            if (keyword.length >= 2) {
                $.getJSON( mtv.baseUrl + 'member/getReferees.html', {keyword : keyword} )
                    .done( function(data){ refereeAutocomplete( data ); });
            }
            else {
                $('#referee_results').html('');
            }
        });

        $(".refereesAutocomplete").blur(function(){
            $("#referee_results").fadeOut(500);
        }).focus(function() {
            refereeAutocomplete( loadedRefereeData );
            $("#referee_results").show();
        });
    }
});


Number.prototype.toMoney = function () {
    var s = parseFloat(this.toFixed(5)).toString();
    if (s.indexOf('.') == -1) s += '.';
    while (s.length <= s.indexOf('.') + 2) s += '0';
    var point = s.indexOf('.');
    var beforePoint = s.substr(0,point);
    var afterPoint = s.substr(point);
    return '$' + beforePoint.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + afterPoint;
};

Number.prototype.toNumber = function() {
    if (isNaN(this)) {
        return NaN.toString();
    }
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function bindForms(parentSelector) {
    $('.form-action').each(function() {
        var el = this;

        $(parentSelector + ' #'+$(el).data('submit')).unbind('click');
        $(parentSelector + ' #'+$(el).data('submit')).click(function(event) {
            event.preventDefault();
            sendFormRequest(el, $(el).data('url'), $(el).data('method'), $(el).attr("id"), window[$(el).data('success')], window[$(el).data('error')], window[$(el).data('complete')], window[$(el).data('validate')]
            )});
    });
}

function sendFormRequest(el, url, method, id, success, error, complete, validate) {

    var data = {};
    $('#'+id).find('input').each(function() {
        data[$(this).attr('id')] = $(this).val();
    });

    $('#'+id).find('select').each(function() {
        data[$(this).attr('id')] = $(this).val();
    });

    $('#'+id).find('textarea').each(function() {
        data[$(this).attr('id')] = $(this).val();
    });

    if (!validate(el, data)) {
        return;
    }

    /*el.block({
        message: '<i class="icon-spinner2 spinner"></i>',
        overlayCSS: {
            backgroundColor: '#1B2024',
            opacity: 0.85,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none',
            color: '#fff'
        }
    });*/

    $.ajax({
        url: url,
        type: method,
        dataType: 'json',
        data: data,
        success: function(res) {
            success(el, res);
        },
        error: function(request, status, err) {
            error(el, request, status, err);
        },
        complete: function() {
            complete(el);
            //el.unblock();
        }
    });
}

function loadBanners() {
    if ($(".ta_holder").length === 0) return;

    var postData = {int: {}, ext: {}};
    $(".ta_holder" ).each(function() {
        var type = $(this).attr('class').split(' ')[1] == 'int' ? 'int' : 'ext';
        var key  = $(this).data('dim');
        postData[type][key] = (postData[type][key] || 0);
        postData[type][key]++;

    });

    $.ajax({
        url: mtv.baseUrl+"get_banners"+"?"+Math.floor((1 + Math.random()) * 1000).toString(16),
        type: 'post',
        dataType: 'json',
        data: postData,
        success: function(data) {
            if (undefined !== data['error']) return;
            $(".ta_holder" ).each(function() {
                var key = $(this).data('dim');
                if (undefined !== data[key] && data[key].length > 0) {
                    var bannerData = data[key].pop();
                    $(this).html(bannerData);
                }
            });
            if (undefined !== data['imp']) {
                $.ajax({
                    url: mtv.baseUrl+"track/impressions_tracking"+"?"+Math.floor((1 + Math.random()) * 1000).toString(16),
                    type: 'post',
                    dataType: 'json',
                    data: {links:data['imp']},
                    success: function(data) {

                    }
                });
            }
        }
    });
}

function liveNews() {
    if (liveNewsActive) return;

    $.ajax({
        url: mtv.baseUrl + 'member/live_news.html',
        type: 'get',
        dataType: 'json',
        success: function(data) {
            if (undefined === data['id'] || null === data['id'] || liveNewsActive) return;

            liveNewsActive = true;

            swal.fire({
                title: "Live News",
                type: 'info',
                html: '<div class="alert alert-info mt-20"> ' + data['message'] + '</div>',
                showCloseButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                focusConfirm: true,
                //confirmButtonColor: '#22b14c',
                confirmButtonText: 'Thanks for letting me know, close!',
                confirmButtonAriaLabel: 'Thanks for letting me know, close!'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        url: mtv.baseUrl + 'member/live_news.html',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            id: data['id']
                        },
                        success: function(data) {
                            liveNewsActive = false;
                        }
                    });
                }
            });
        }
    });
}

function fadeIn(obj) {
    $(obj).fadeIn(500);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function showAchievementRow() {
    var $tr = $('.achievement-notification-table').find('tr.hidden:first');
    if($tr.length > 0) {
        $tr.removeClass('hidden');
        setTimeout(showAchievementRow, 400);
    }
}
