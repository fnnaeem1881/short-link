var website_ok = false, big_opt_out = false, small_opt_out = false, regular_opt_out = false, interval;
var adpack_cost = 0.1, timer_cost = 0;

$(document).ready(function ()
{
    $("#tabs").tabs();
    $("#interest").tabs();
    $("#timer").prop('disabled', false);
    $('#forced_view').prop('disabled', false);

    //$("#targeted-options-loading").hide();
    //$("#targeted-options").show();
    addPriceStickWindow();

    var status = getCookie('ta_help_hide');
    if(status == 1)
    {
        $('.step-help-content').hide();
        $('.targ_help_navigation > ul > li').each(function(index) {
            $(this).removeClass('active');
        });
    }

    $('.btn-help-hide').click(function(e) {
        e.preventDefault();
        $(this).parent().slideUp();
        setCookie('ta_help_hide', 1, 356);
        $('.targ_help_navigation > ul > li').each(function(index) {
            $(this).removeClass('active');
        });
    });
    $('.targ_help_navigation > ul > li:first').click(function() {
        setCookie('ta_help_hide', 0, 356);
        $(this).addClass('active');
        $('.step-help-content').slideDown();
    });


    $('.targ_navigation ul li a').click(function() {
        var href = $(this).attr('href');
        var height = $(href+' > ul').height();
        if (height == null) {
            height = $(href).height();
        }
        $('#targeted_info .drop_area').css("min-height", height);

    });
    var stepNumber = 0;
    if (renewId > -1)
    {
        $('.select-from').children('li').each(function (index) {
            var pick = false;
            $(this).find('select').each(function (index) {
                if (0 != $(this).val()) {
                    pick = true;
                    return;
                }
            });

            if (pick) {
                var li = $(this);
                li.find('select').each(function (index) {
                    $(this).select2("destroy");
                });
                var cpy = li.clone();
                cpy.insertAfter(li);
                $(".select-to").append(li);
                cpy.find('select').each(function (index) {
                    $(this).select2().val(0).trigger("change");
                });
                li.find('select').each(function (index) {
                    $(this).select2();
                    var id = $(this).attr('id');
                    var name = $(this).attr('name');
                    $(this).attr('id','pick_'+id);
                    $(this).attr('name','pick_'+name);
                });
                setSelect2Behavior();
            }
        });
        addOrAnd();
        stepNumber = 7;
        $('.step-toggle').each(function(index) {
            if (index < stepNumber) {
                $(this).removeClass('unactive');
                $(this).addClass('completed');
            }
        });
        if (regular_opt_out) {
            $('#opt_out_regular').text('Add regular views');
            $('#regular_views').val('0');
            $("#timer").prop('disabled', true);
            $("#timer").change();
            $('#forced_view').prop('disabled', true);
        }
    }

    startAccordionFrom(stepNumber);
    calc_cost();

    $(".or-and").each(function(index) {
        if(0 == $(this).val()) {
            $(this).prev().prev().before('<div class="disable-op"></div>');
        }
    });

    $('input[type=radio][name=pick_global_operation]').change(function() {
        addOrAnd();
        calc_cost();
    });

    $( ".select-from" ).sortable({
        connectWith: ".select-to",
        forcePlaceholderSize: false,
        helper: function(e,li) {
            //copyHelper= li.clone().insertAfter(li);
            li.find('select').each(function(index) { $(this).select2("destroy"); });
            var cpy = li.clone();
            copyHelper= cpy.insertAfter(li);
            cpy.find('select').each(function(index) { $(this).select2().val(0).trigger("change"); });
            li.find('select').each(function(index) { $(this).select2(); });
            //setSelect2Behavior();
            return li.clone();
        },
        stop: function(event, ui) {
            copyHelper && copyHelper.remove();
            $(".select-to").sortable("enable");

            var $sortable = $(this);
            if ($sortable.sortable("option", "selfDrop")) {
                $sortable.sortable('cancel');
                return;
            }
        },
        start: function(event, ui) {
            if ($(".select-to").find("#"+ui.item.attr("id")).length > 0) {
                $(".select-to").sortable("disable");
                $(".select-from").sortable('refresh');
            }
        },
        beforeStop: function(event, ui) {
            // Don't allow resorting in list1... would call cancel here, but there is a jquery 1.7 bug so we
            // need to do the check here but do the cancel in "stop" below. @see http://bugs.jqueryui.com/ticket/6054
            $(this).sortable("option", "selfDrop", $(ui.placeholder).parent()[0] == this);
        },
    });
    var removeIntent = false;
    var removeHandled = false;
    $('.select-to').sortable({
        revert: false,
        over: function () {
            removeIntent = false;
        },
        out: function () {
            removeIntent = true;
        },
        beforeStop: function (event, ui) {
            if(removeIntent == true){
                removeHandled = true;
                ui.item.remove();
                calc_cost();
            } else {
                $(this).sortable("option", "selfDrop", $(ui.placeholder).parent()[0] == this);
            }
        },
        start: function (event, ui) {
            removeHandled = false;
        },
        stop: function (event, ui) {
            if (!removeHandled) {
                var $sortable = $(this);
                if ($sortable.sortable("option", "selfDrop")) {
                    $sortable.sortable('cancel');
                    return;
                }
            } else {
                addOrAnd();
            }
        },
        receive: function(e,ui) {
            setSelect2Behavior();
            copyHelper= null;
            $(ui.item).find('select').each(function(index) {
                var name = $(this).attr('name');
                var id = $(this).attr('id');
                $(this).attr('name','pick_'+name);
                $(this).attr('id','pick_'+id);
            });
            //setSelect2Behavior();
            //calc_cost();
            sortList();
        },
        update: function(event, ui) {
            //addOrAnd();
        }
    });

    function sortList() {
        var mylist = $('.select-to');
        var listitems = mylist.children('li').get();
        listitems.sort(function(a, b) {
            var compA = parseFloat($(a).attr('class'));
            var compB = parseFloat($(b).attr('class'));
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
        });
        $.each(listitems, function(idx, itm) {
            mylist.append(itm);
        });
        addOrAnd();
    }

    function addOrAnd() {
        $('.or-and-inf').each(function() {
            $(this).remove();
        });
        $('.select-to').children('li:not(:last)').each(function() {

            if(parseFloat($(this).attr('class')) < extended) {
                $(this).append('<div class="or-and-inf dotted">and</div>');
            } else {
                var op = $("input[type=radio][name=pick_global_operation]:checked").val() == "1" ? 'and' : 'or';
                $(this).append('<div class="or-and-inf">'+op+'</div>');
            }
        });

        var lastChild = $('.select-to').children('li:last-child');
        if(parseFloat($(lastChild).attr('class')) < extended || $('.select-to').children('li').length == 0) {
            $("input[type=radio][name=pick_global_operation][value='0']").prop("checked", true);
            $('input[type=radio][name=pick_global_operation]').attr("disabled", true);
        }
        else {
            $('input[type=radio][name=pick_global_operation]').attr("disabled", false);
        }
    }

    /*$(".dropdown-info").sortable({
        receive: function(e,ui) {
            copyHelper= null;
            $(ui.item).find('select').each(function(index) {
                var name = $(this).attr('name');
                var id = $(this).attr('id');
                $(this).attr('name','pick_'+name);
                $(this).attr('id','pick_'+id);
            });
            calc_cost();
        }
    });*/

    setSelect2Behavior();
    renew();
    calc_adpacks();
    add_uploaders();

    $(document).delegate('#reuse', 'change', function (e){
        var sel = $("#reuse option:selected").val();
        if(sel != -1)
        {
            redirect(mtv.baseUrl + 'member/buy_' + sel + '.html');
        }
    });

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; domain="+mtv.cookieDomain;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    }

    $('#forced_view').on('change', (function () {
        calc_adpacks();
    }));

    $('#test_url').click(function() {
        var link = $('#url').val().toLowerCase();

        if(link.length == 0) return;

        if(link.indexOf('http://') == - 1 && link.indexOf('https://') == - 1)
        {
            link = 'http://' + link;
            $('#url').val(link);
        }

        $('#test_url').hide();
        $('#test_url_loading').attr('src', mtv.assetPath + 'images/loading.gif').show();

        setCookie('website_ok', 0, 1);

        interval = setInterval(verify_ad, 500);

        window.open(mtv.nonSslBaseUrl + 'member/verify_ad.html?url=' + btoa($('#url').val()), '_blank');
    });

    function verify_ad()
    {
        var status = getCookie('website_ok');
        if(status == 1)
        {
            $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
            clearInterval(interval);
            website_ok = true;
            setCookie('website_ok', 0, 1);
            $("#verifyWarning").hide();
        }
        else
        {
            if (website_ok == true)
            {
                clearInterval(interval);
                return;
            }

            $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/negative.png').show();
            website_ok = false;
            $("#verifyWarning").show();
        }
    }

    $('#url').on('input', function() {
        $('#test_url_loading').hide();
        $('#test_url').show();
        website_ok = false;
    });

    $("#adpacks_number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }).on('keyup mouseup', function(e) {
            if(!$("#generic").is(':checked')) {
                calc_adpacks();
                if($("#payment_method option:selected").val() != '--') calc_fees();
            }
    });

    $('#opt_out_regular').click(function() {
        regular_opt_out = !regular_opt_out;
        if(regular_opt_out)
        {
            $(this).text('Add regular views');
            $('#regular_views').val('0');
            $("#timer").prop('disabled', true);
            $("#timer").change();
            $('#forced_view').prop('disabled', true);
        }
        else
        {
            $(this).text('Opt out of regular ad views');
            $('#regular_views').val('1');
            $("#timer").prop('disabled', false);
            $("#timer").change();
            $('#forced_view').prop('disabled', false);
        }
        calc_cost();
    });

    $('#opt_out_small').click(function() {
        small_opt_out = !small_opt_out;
        if(small_opt_out)
        {
            $('#banner_small_preview').attr('src', mtv.assetPath + 'images/125_optout.jpg');
            $('#opt_out_small').text('Add banner');
            $('#banner_small_upload').hide();
            $('#displays_small').hide();
            $('#opt_out_small_info').html('You can add 125*125 banner image<br>and get your free banner impressions.');
            $('#banner_small_url').val('--');
            $('#banner_small').hide();

            $("#add_125 > input[type='checkbox']:checked").each(function(){ $(this).attr('checked', false) });
            $('#add_125').hide();

            calc_adpacks();
        }
        else
        {
            $('#banner_small_preview').attr('src', mtv.assetPath + 'images/125_default.jpg');
            $('#opt_out_small').text('Opt out');
            $('#banner_small_upload').show();
            $('#displays_small').show();
            $('#opt_out_small_info').html('If you do not have a 125*125 banner image.<br>You can opt out of your free banner impressions.');
            $('#banner_small_url').val('--');
            $('#banner_small').show();

            $('#add_125').show();
        }
        calc_cost();
    });

    $('#opt_out_big').click(function() {
        big_opt_out = !big_opt_out;
        if(big_opt_out)
        {
            $('#banner_big_preview').attr('src', mtv.assetPath + 'images/728_optout.jpg');
            $('#opt_out_big').text('Add banner');
            $('#banner_big_upload').hide();
            $('#displays_big').hide();
            $('#opt_out_big_info').html('You can add 728*90 or 468*60 banner image<br>and get your free banner impressions.');
            $('#banner_big_url').val('--');
            $('#banner_big').hide();

            $("#add_728 > input[type='checkbox']:checked").each(function(){ $(this).attr('checked', false) });
            $('#add_728').hide();

            calc_adpacks();
        }
        else
        {
            $('#banner_big_preview').attr('src', mtv.assetPath + 'images/728_default.jpg');
            $('#opt_out_big').text('Opt out');
            $('#banner_big_upload').show();
            $('#displays_big').show();
            $('#opt_out_big_info').html('If you do not have a 728*90 or 468*60 banner image.<br>You can opt out of your free banner impressions.');
            $('#banner_big_url').val('--');
            $('#banner_big').show();

            $('#add_728').show();
        }
        calc_cost();
    });

    $("#payment_method").change(function() {
        calc_fees();
    });

    $('#generic').click(function () {
        if($("#generic").is(':checked'))
        {
            $("#generic").val(1);
            $("#limits").hide();
            $('#method').text('PV Earnings Balance');
            $('#payment').text('Account Balance');

            var fee = 0;
            var total = 0;

            $('#fee').text(roundToTwo(fee).toFixed(2));
            $('#total_cost').text(Number(total).toFixed(2));
        }
        else
        {
            $("#generic").val(0);
            $("#limits").show();
            calc_fees();
        }
    });

    $("#add_125 > input[type=checkbox]").on("click", calc_adpacks);
    $("#add_728 > input[type=checkbox]").on("click", calc_adpacks);

    $('#submit_form').click(function(e) {
        e.preventDefault();

        var errors = [];

        if(!website_ok) errors['url'] = '- Please test website URL';
        if(!small_opt_out && $('#banner_small_url').val() == '--') errors['banner_small_url'] = '- Please upload your 125*125 Banner Image or opt out';
        if(!big_opt_out && $('#banner_big_url').val() == '--') errors['banner_big_url'] = '- Please upload your 728*90 or 468*60 Banner Image or opt out';
        if (big_opt_out && small_opt_out && regular_opt_out) {
            errors['banner_small_url'] = '- All delivering options were opt outed, please select at least one';
            errors['banner_big_url'] = '- All delivering options were opt outed, please select at least one';
            errors['regular_views'] = '- All delivering options were opt outed, please select at least one';
        }
        //if($('#generic').val() == 1 && ($('#banner_small_url').val() == '--' || $('#banner_big_url').val() == '--')) errors += '- Generic campaign: please upload banners<br/>';
        if(Object.keys(errors).length > 0)
        {
            var errorHtml = '';
            for (var error in errors) {
                setStepErrorByField(error);
                errorHtml += errors[error]+'<br/>';
            }
            $('#submit_info').html('<u>Errors:</u><br/>' + errorHtml);
        }
        else
        {
            $('#url_info').html('');
            $('#submit_info').html('');
            $('#text1_info').html('');
            $('#text2_info').html('');
            $('#text3_info').html('');

            $("input, select").css('border', '');
            $(".validation-error-label").remove();

            var formSuccess = false;
            var form = $('#newCampaignFrm');

            var formData = form.serializeArray();
            formData.push({name: "adpack_cost", value: adpack_cost});

            $('#submit_form').hide();
            $('#submit_image_loading').show();
            $('.step-toggle > .error').each(function(index) {
               $(this).removeClass('error');
            });

            form.block({
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

            $.ajax({
                url: form.attr('action'),
                type: form.attr('method'),
                data: formData,
                dataType: 'json',
                success: function(data) {
                    if(data.errors)
                    {
                        formSuccess = false;
                        $('#submit_info').html('<div class="alert alert-danger">Errors are marked in red, please correct the input data.</div>');

                        for (var el in data.errors)
                        {
                            $('#' + el, form).addClass('error');
                            $('a[href$="#'+$('#' + el, form).parents('fieldset').prev('h6').attr('id')+'"]').parent().addClass('error');
                            $('a[href$="#'+$('#' + el, form).parents('fieldset').prev('h6').attr('id')+'"]').parent().removeClass('done');
                            if(data.errors[el])
                            {
                                $('#' + el, form).after('<label class="validation-error-label">'+data.errors[el]+'</label>');
                            }
                        }
                    }
                    else if(data.error)
                    {
                        formSuccess = false;
                        $('#submit_info').html('<div class="alert alert-danger"><strong>Error:</strong> ' + data.error + '</div>');
                    }
                    else
                    {
                        formSuccess = true;
                        if (data.html !== undefined)
                        {
                            $('#submit_info_redirect').html(data.html);
                        }
                        else if (data.redirect !== undefined)
                        {
                            if (data.redirect === 'reload')
                            {
                                window.location.reload(true);
                            }
                            else
                            {
                                redirect(data.redirect.url, data.redirect.hash);
                            }
                        }
                    }
                },
                error: function(data) {
                    alert(JSON.stringify(data));
                    $('#submit_info').html('Server connection error. Please try again.');
                    $('#submit_image_loading').hide();
                    $('#submit_form').show();
                    form.unblock();
                },
                complete: function() {
                    if (formSuccess)
                    {
                        $('#submit_form_loading').html('Success!');
                    }
                    else
                    {
                        $('#submit_image_loading').hide();
                        $('#submit_form').show();
                    }
                    form.unblock();
                }
            });
        }
    });

    $("input, select").click(function() {
        $(this).css('border', '');
    });

    $("#text1, #text2, #text3").on("change paste keyup", function()
    {
        var src = $(this).val();
        var fix = src.replace(/ +(?= )/g,'');
        $(this).val(fix);
    });

    $("#timer").on('change',function(){
        var timer = $(this).val();
        timer_cost = Number(timerCosts[timer]);

        if ($(this).prop('disabled')) {
            timer_cost = 0;
        }
        $('.how-many').hide();
        $('#how-many-' + timer.toString() + 's').show();
        $('span#timer').html(timer.toString());
        calc_adpacks();
        $(this).parent().find('.small-price').remove();
        if (timer_cost > 0) {
            $(this).after('<span class=\'small-price\'>$' + timer_cost + '</span>');
            addSummaryRow('timer','Timer - '+timer+' seconds','$'+timer_cost);
        }
        else {
            $('#summary_timer').remove();
        }
    });
    $("#timer").val(5);
});

function renew()
{
    if(renewId == -1) return;

    $('#test_url').hide();
    $('#test_url_loading').attr('src', mtv.assetPath + 'images/icons/positive.png').show();
    website_ok = true;

    if($('#banner_small_preview').attr('src').indexOf('125_default') > -1)
    {
        small_opt_out = true;
        $('#banner_small_preview').attr('src', mtv.assetPath + 'images/125_optout.jpg');
        $('#opt_out_small').text('Add banner');
        $('#banner_small_upload').hide();
        $('#displays_small').hide();
        $('#opt_out_small_info').html('You can add 125*125 banner image<br>and get your free banner impressions.');
        $('#banner_small_url').val('--');
        $('#banner_small').hide();
        $('#add_125').hide();
    }
    else
    {
        $('#banner_small_url').val($('#banner_small_preview').attr('src').split('/').pop());
    }

    if($('#banner_big_preview').attr('src').indexOf('728_default') > -1)
    {
        big_opt_out = true;
        $('#banner_big_preview').attr('src', mtv.assetPath + 'images/728_optout.jpg');
        $('#opt_out_big').text('Add banner');
        $('#banner_big_upload').hide();
        $('#displays_big').hide();
        $('#opt_out_big_info').html('You can add 728*90 or 468*60 banner image<br>and get your free banner impressions.');
        $('#banner_big_url').val('--');
        $('#banner_big').hide();
        $('#add_728').hide();
    }
    else
    {
        $('#banner_big_url').val($('#banner_big_preview').attr('src').split('/').pop());
    }
}

function calc_adpacks()
{
    var count = Number($("#adpacks_number").val());
    var imp_cost = 0;
    var forcedViewCost = 0;
    var forcedPrice;

    if ($('#forced_view').prop('checked')) {
        forcedPrice = Number($('#forced_view').attr('data-forced-ad-view-cost'));
        forcedViewCost = Number(count * forcedPrice);
        addSummaryRow('total_forced_view','Forced ad view:', forcedViewCost.toMoney());
    } else {
        $('#summary_total_forced_view').remove();
        forcedPrice = 0;
    }

    $('.per-click').html(Number(Number(adpack_cost + timer_cost || 0).toFixed(5)).toString());

    $('#visits').text(count * visits);

    var total = Number(Number(count * adpack_cost + Number($('#processor_fee').text()) + imp_cost + count * timer_cost).toFixed(5)) + forcedViewCost;
    $('#total_cost').text(total.toFixed(2));
    $('#current_price').text(Number(Number(adpack_cost + timer_cost).toFixed(5)).toString());
    addSummaryRow('total_per_click','Total cost per click:','$'+Number(Number(adpack_cost + timer_cost + forcedPrice).toFixed(5)).toString());
    addSummaryRow('total_amount','Amount:','x'+count);
    var total_ta_costs = Number(Number(Number(Number(adpack_cost + timer_cost).toFixed(5)).toString() * count).toFixed(5)).toString();

    total_ta_costs = (Number(total_ta_costs) + forcedViewCost).toFixed(2);
    addSummaryRow('total_costs','Total cost:','$'+total_ta_costs);
    calc_fees();
}

function calc_cost()
{
    var fn = debounce(function () {
        var form = $('#newCampaignFrm');
        var formData = form.serializeArray();
        $('#submit_form').hide();
        $('#submit_image_loading').show();
        $('#current_price_image_loading').show();
        $('#stick_price_content').hide();
        $.ajax({
            url: mtv.baseUrl + "member/calculate_ta_cost",
            type: "POST",
            data: formData,
            dataType: 'json',
            success: function (data) {
                if (data.error) {

                }
                else {
                    adpack_cost = data['total'];
                    calc_adpacks();
                    $('#current_procentage').text(data['matched']['procentage']);
                    $('#current_count').text(data['matched']['count']);
                    costs_to_segments(data);
                    $("#timer").change();
                }
            },
            error: function (data) {
                $('#submit_form').show();
                $('#submit_image_loading').hide();
                $('#stick_price_content').show();
                $('#current_price_image_loading').hide();
            },
            complete: function () {
                $('#submit_form').show();
                $('#submit_image_loading').hide();
                $('#stick_price_content').show();
                $('#current_price_image_loading').hide();
            }
        });
    }, 250);
}

function calc_fees()
{
    var currentTimestamp = Math.round($.now() / 1000);
    var sel = $("#payment_method option:selected");

    if(sel.val() == '--') return;

    $('#payment_info').show();
    $('#method').text(sel.attr("title"));
    $('#payment').text(sel.attr("method"));

    $("#generic").attr("checked", false);

    if(sel.attr("max") > 0)
    {
        $('#limit_min').text(sel.attr("min"));
        $('#limit_max').text(sel.attr("max"));
        $('#limit_period').text(sel.attr("period"));
        $('#limit').text(sel.attr("limit"));
        $('#limits').show();
    }
    else
    {
        $('#limits').hide();
    }

    var ads = Number($('#adpacks_number').val());
    var imp_cost = 0;
    var fee = 0;
    var forcedViewCost = 0;

    if ($('#forced_view').prop('checked')) {
        var count = Number($("#adpacks_number").val());
        var forcedPrice = Number($('#forced_view').attr('data-forced-ad-view-cost'));
        forcedViewCost = Number(count * forcedPrice);
    }

    var isDiscountGeneral = false;
    var discountedAdPackCost = adpack_cost;
    if (Object.keys(discountGeneral).length > 0 && discountGeneral.percent > 0 && currentTimestamp >= discountGeneral.start && currentTimestamp <= discountGeneral.end) {
        discountedAdPackCost = Number(adpack_cost * ((100 - discountGeneral.percent) / 100.0));
        isDiscountGeneral = true;
    }

    if(sel.attr("fee") == 0)
    {
        $('#fee').text(roundToTwo(fee).toFixed(2));
    }
    else
    {

        var fixed = 0, percent = 0;
        if(sel.attr("percent").length > 0) percent = Number(sel.attr("percent"));
        if(sel.attr("fixed").length > 0) fixed = Number(sel.attr("fixed"));

        fee = Number(Number((ads * (isDiscountGeneral ? discountedAdPackCost : adpack_cost) + imp_cost + forcedViewCost + (ads * timer_cost)) * percent / 100 + fixed).toFixed(3));
        $('#fee').text(fee.toFixed(2));
    }

    var total = Number(Number(ads * adpack_cost + imp_cost + fee + ads * timer_cost).toFixed(5)) + forcedViewCost;
    if (isDiscountGeneral) {
        var discountTotal = Number(Number(ads * (isDiscountGeneral ? discountedAdPackCost : adpack_cost) + imp_cost + fee + ads * timer_cost).toFixed(5)) + forcedViewCost;
        $('#total_cost').html('<s>' + total.toFixed(2) + '</s> <span style="color: red;">' + discountTotal.toFixed(2) + '</span> <span class="label label-danger">Sale! ' + discountGeneral.percent + '% off targeting options!</span>');
    } else {
        $('#total_cost').text(total.toFixed(2));
    }
}

function add_uploaders()
{
    new AjaxUpload('banner_small_upload', {
        action: mtv.baseUrl + 'member/upload/small.html',
        name: 'banner_small',
        responseType: 'json',
        onSubmit: function(file, extension)
        {
            $('#banner_small_upload').hide();
            $('#banner_small_upload_loading').show();
            $('#banner_small_upload_info').text('');
        },
        onComplete: function(file, response)
        {
            if (response.error)
            {
                $('#banner_small_upload_info').text(response.error);
                $('#banner_small_url').val('--');
            }
            else
            {
                $('#banner_small_preview').attr('src', response.banner);
                $('#banner_small_url').val(response.file);
                calc_cost();
            }

            $('#banner_small_upload_loading').hide();
            $('#banner_small_upload').show();
        }
    });

    new AjaxUpload('banner_big_upload', {
        action: mtv.baseUrl + 'member/upload/big.html',
        name: 'banner_big',
        responseType: 'json',
        onSubmit: function(file, extension)
        {
            $('#banner_big_upload').hide();
            $('#banner_big_upload_loading').show();
            $('#banner_big_upload_info').text('');
        },
        onComplete: function(file, response)
        {
            if (response.error)
            {
                $('#banner_big_upload_info').text(response.error);
                $('#banner_big_url').val('--');
            }
            else // success, banner uploaded
            {
                $('#banner_big_preview').attr('src', response.banner);
                $('#banner_big_url').val(response.file);

                // fit banner into place to meet its resolution
                detectBigBannerSize(response.banner);
                calc_cost();
            }

            $('#banner_big_upload_loading').hide();
            $('#banner_big_upload').show();
        }
    });
}

function roundUp(num) {
    return Math.ceil(num * 100)/100;
}

function roundToTwo(num) {
    return Math.round(num * 100)/100;
}

function redirect(url, hash) {
    var curUrl = window.location.href,
        curHash = window.location.hash;

    if (curHash)
        curUrl = curUrl.substr(0, curUrl.indexOf(curHash));

    if (hash !== undefined && curUrl == url) {
        window.location.hash = hash;
        window.location.reload(true);
        return;
    }

    window.location.href = url + (hash !== undefined ? hash : '');
}

function setSelect2Behavior()
{
    $('.select-to .select2').unbind("select2:select");
    $('.select-to .select2').unbind("select2:unselect");
    $('.select-to .select2').on("select2:select", function (e) {
        if ($(this).is('[multiple]')) {
            var firstVal = $(this).find("option:eq(0)").val();
            var nextSelect = $('#'+$(this).attr("id")+'_op');
            if (nextSelect.length > 0 && nextSelect.val() == 1) {
                var arr = ["1",firstVal];
                var len = arr.length - 1;
            }
            else {
                var arr = [firstVal];
                var len = arr.length;
            }
            if (jQuery.inArray(e.params.data.id, arr) !== -1) {
                $(this).val(null).trigger("change");
                $(this).val(e.params.data.id).trigger("change");
                if (nextSelect.length > 0 && 0 == e.params.data.id) {
                    nextSelect.val(0).trigger("change");
                    nextSelect.prev().prev().before('<div class="disable-op"></div>');
                }
            } else {
                if (nextSelect.length > 0) {
                    nextSelect.parent().find('.disable-op').remove();
                }
                var data = $(this).val();
                if (jQuery.inArray(e.params.data.id, data) !== -1) {
                    data = $.grep(data, function (value) {
                        return jQuery.inArray(value, arr) === -1;
                    });
                    if (data.length < $(this).children('option').length - len) {
                        $(this).val(data).trigger("change");
                    }
                    else {
                        $(this).val(0).trigger("change");
                        if (nextSelect.length > 0) {
                            nextSelect.val(0).trigger("change");
                            nextSelect.prev().prev().before('<div class="disable-op"></div>');
                        }
                    }
                }
            }
        }
        else {
            var id = $(this).attr("id").replace('_op','');
            if (1 == e.params.data.id) {
                var data = $('#'+id).val();
                data = $.grep(data, function (value) {
                    return jQuery.inArray(value, ["1"]) === -1;
                });
                if (data.length > 0) {
                    $('#' + id).val(data).trigger("change");
                } else {
                    $('#' + id).val(1).trigger("change");
                }
            }
        }
        calc_cost();
    });

    $('.select-to .select2').on("select2:unselect", function (e) {
        if ($(this).is('[multiple]')) {
            var firstVal = $(this).find("option:eq(0)").val();
            var data = $(this).val();
            if (data == null || data.length <= 0) {
                $(this).val(firstVal).trigger("change");
            }
        }
        calc_cost();
    });

    $(".or-and").select2({
        minimumResultsForSearch: Infinity
    });

    var preValues = new Array();
    $('.capping-field').change(function() {
        /*if(undefined == preValues[$(this).attr('id')] ||
            0 == preValues[$(this).attr('id')] || 0 == $(this).val()) {
            preValues[$(this).attr('id')] = $(this).val();
            calc_cost();
        }*/
        calc_cost();

    });
}

function addPriceStickWindow() {
    /*$("#menu_right > .menu_right_one").after(
        '<div class="stick_price menu_right_ta">  	<span class="right_ta_h">TA Campaign summary</span>  	<img src="'+mtv.assetPath+'/images/ta/loader.gif" id="current_price_image_loading" style="display: none; vertical-align: middle;" />  	<div id="stick_price_content"> 		<span style="font-size:13px">Current price:</span></br> 		<span style="font-size:24px"><span style="font-weight:700">$<span id="current_price"></span></span>/click</span></br> 		<span style="font-size:13px">Matched: <span style="font-weight:700"><span id="current_procentage"></span>%</span> of users - </span><span style="font-size:9px"> <span id="current_count"></span>+</span> 	</div> </div>');
    $("#current_price_image_loading").hide();
    $("#stick_price_content").show();*/
}

function costs_to_segments(data) {
    delete data['total'];
    delete data['matched'];
    $('.small-price').remove();
    var rows = $('#summary-desc tr');
    for (var i=0 ; i < rows.length; i++) {
        if (rows[i].className === 'end') {
            break;
        }
        rows[i].remove();
    }
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
            var option;
            if (k === 'pick_limit_day' || k === 'pick_limit_lifetime') {
               $('#' + k).parent().next().append('<span class=\'small-price\'>$' + data[k] + '</span>');
                option = 'Frequency capping - '+ k.split('_').pop() + ':';
            }
            else {
               $('#' + k).parent('.drag_content').find('span').first().append('<span class=\'small-price\'>$' + data[k] + '</span>');
                option = $('#' + k).parent('.drag_content').find('span').first().find('strong').text();
            }
            addSummaryRow(k,option,'$'+data[k]);
        }
    }
}

function addSummaryRow(id, label, data) {
    var idDiv = $('#summary_'+id);
    var content = '<tr id="summary_'+id+'"><td>'+label+'</td><td>'+data+'</td></tr>';
    if (idDiv.length > 0) {
        idDiv.replaceWith(content);
    }
    else {
        $('#summary-desc').prepend(content);
    }
}

function startAccordionFrom(stepNumber) {
    $("#accordion").accordion({
        alwaysOpen: false,
        active: false,
        clearStyle: true,
        collapsible: true,
        heightStyle: "content",
        header: 'div.step-toggle-header',
        animate: 0,
        beforeActivate: accordionBeforeActivate
    });
    $("#accordion div.step-toggle-header").unbind("click");

    $('#accordion .btn-proceed').click(function(e) {
        e.preventDefault();
        var active = $('#accordion').accordion('option','active') + 1;
        $('#accordion').accordion('option', 'active', ( active  ));


        var element = $("#accordion .step-toggle-header").eq(active).attr('id');

        $('html, body').animate({
            scrollTop: $("#"+element).offset().top
        }, 200);
    });

    $('#accordion .btn-edit').click(function(e) {
        e.preventDefault();
        var sectionid = $(this).parent().parent().index('div.step-toggle-header');
        $('#accordion').accordion('option', 'active', ( sectionid  ));
    });
    $('#accordion').accordion('option', 'active', ( stepNumber  ));
}

function accordionBeforeActivate(event, ui) {
    if (ui.newHeader === ui.oldHeader) return;
    ui.oldHeader.parent().addClass('completed');
    ui.newHeader.parent().removeClass('unactive');
    ui.newHeader.parent().removeClass('completed');
}

function setStepErrorByField(field) {
    $('#' + field).closest('.step-toggle').children('.step-toggle-header').addClass('error');
}

var timer_debounce = null;
function debounce(fn, delay) {
    var context = this, args = arguments;
    if (null !== timer_debounce) {
        clearTimeout(timer_debounce);
    }
    timer_debounce = setTimeout(function () {
        timer_debounce = null;
        fn.apply(context, args);
    }, delay);

}