currentEl = new Array();
$(document).ready(function () {
    $('.answer-block').first().addClass('top-answer');

    addLinks();

    $(".comments").each(function( index ) {
        if ($(this).find('.notify-pending').length > 0) {
            $(this).toggle();
            if ($(this).css('display') === 'block') {
                $(this).parent().parent().parent().find('.dropdown-icon').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            } else {
                $(this).parent().parent().parent().find('.dropdown-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        }
    });

    $(document).delegate('.action_button', 'click', function (e) {
        e.preventDefault();

        var el = $(this).closest('div[id^="entry-"]');
        var id = el.attr('id').split('-')[1];

        var url = $(this).attr('href');

        var topic = el.find('.topic input').val();
        var text  = el.find('.text textarea').val();

        var tags  = el.find('#tag').val();

        var element_id  = $(this).attr('id');
        var params = element_id.split('-');

        var parent_el = $(this).closest('div[id^="pid-"]');
        if (parent_el.length > 0) {
            var pid = parent_el.attr('id').split('-')[1];
        }
        if (!checkInput(text, topic, tags)) {
            return;
        }
        currentEl[params[1]+'_'+id] = $(this);
        $(this).replaceWith('<img id="loading_img"/>');
        $('#loading_img').attr('src', mtv.assetPath + 'images/loading.gif').show();

        var data = {
            type: params[1],
            id: id,
            action: params[2],
            response: params[3],
            tags: tags,
            pid: pid
        };
        $.ajax({
            url: url,
            type: 'post',
            data: {
                data: data,
                text: text,
                topic: topic,
                tags: tags
            },
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    $("#result").html('data.err_msg');
                    $("#result").show();
                    alert(data.error)
                    $('#loading_img').replaceWith(currentEl[params[1]+'_'+id]);
                    currentEl[params[1]+'_'+id] = '';
                } else if (data.err){
                    $('.select2-container--default').attr('id','tags');
                    jQuery.each(data.err, function(index, item) {
                        set_temp_error(el, index, item);
                    });
                    $('#loading_img').replaceWith(currentEl[params[1]+'_'+id]);
                    currentEl[params[1]+'_'+id] = '';
                } else if (data.tag_err){

                    el.parent().before('<div style="font-size: 10px; color: red; padding: 3px 21px; position: relative; " id="err_'+id+'">'+data.tag_err+'</div>');
                    setTimeout(function() {
                        $("#err_" + id).remove();
                    }, 5000);
                    $('#loading_img').replaceWith(currentEl[params[1]+'_'+id]);
                    currentEl[params[1]+'_'+id] = '';
                } else if (data.redirect) {
                    var linkData = data.redirect.split('#');
                    redirect(linkData[0], linkData[1]);
                }
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX error:" + textStatus );
                $('#result').html(errorThrown);
            },
            complete:function () {

            }
        });
    });

    $(document).delegate('#search_button', 'click', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');

        var search =  $('#search').val();
        if (search.length <= 0) {
            set_temp_error($('.faq_search'),'search','* required')
            return
        }
        var tags = $('#tag').val();
        if (tags != null) {
            var tagsArr = tags.join('t');
        }
        else {
            var tagsArr = 'a';
        }

        var res = search.replace(/\s/g, "-");

        currentEl['search'] = $(this);
        $(this).replaceWith('<img style="position: relative; top: 20px; height:40px"id="loading_img"/>');
        $('#loading_img').attr('src', mtv.assetPath + 'images/loading_big.gif').show();

        $('#error').html('');
        $('#faq_search .pageable').html('');
        $('.not_found').remove();
        $.ajax({
            url: url,
            type: 'post',
            data: {
                search: search,
                tags:   tags
            },
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    $("#result").html('data.err_msg');
                    $("#result").show();
                    alert(data.error)
                } else if (data.err){
                    jQuery.each(data.err, function(index, item) {
                        set_temp_error($('.faq_search'), index, item);
                    });
                } else {
                    $('#faq_search .pageable').html(data.success)
                }
                $('#loading_img').replaceWith(currentEl['search']);
                currentEl['search'] = '';
                $('#ask-q-block').css('visibility','visible');
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX error:" + textStatus );
                $('#result').html(errorThrown);
            },
            complete:function () {

            }
        });
    });

    $(document).delegate('.add_question', 'click', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');

        var topic = $('#topic').val();
        var text  = $('#text').val();
        var tag   = $('#tag').val();

        if (null != tag) {
            var tags = tag[0];
        }

        var form = $(this).closest('form');
        var formData = form.serializeArray();

        var element_id  = $(this).attr('id');
        var params = element_id.split('-');

        currentEl['add_question'] = $(this);
        $(this).replaceWith('<img style="position: relative; top: 20px; height:40px"id="loading_img"/>');
        $('#loading_img').attr('src', mtv.assetPath + 'images/loading_big.gif').show();

        var data = {
            type: params[1],
            action: params[2],
            tag: tag
        };
        $.ajax({
            url: url,
            type: 'post',
            data: {
                data: data,
                text: text,
                topic: topic,
                tags: tags
            },
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    $("#result").html('data.err_msg');
                    $("#result").show();
                    alert(data.error)
                } else if (data.err){
                    $('.select2-container--default').attr('id','tags');
                    jQuery.each(data.err, function(index, item) {
                        set_temp_error($(".add_q_main"), index, item);
                    });
                } else if (data.redirect) {
                    redirect(data.redirect);
                    return;
                }
                $('#loading_img').replaceWith(currentEl['add_question']);
                currentEl['add_question'] = '';
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX error:" + textStatus );
                $('#result').html(errorThrown);
            },
            complete:function () {

            }
        });
    });

    $(document).delegate('.vote_act', 'click', function (e) {
        e.preventDefault();

        var el = $(this).closest('div[id^="entry-"]');
        var parent_params=el.attr('id').split('-');
        var id = parent_params[1];

        var url = $(this).attr('href');

        var element_id  = $(this).attr('id');
        var params = element_id.split('-');

        var data = {
            type: params[1],
            id: id,
            action: params[2],
            response: params[3],
            parent_type: parent_params[2]
        };

        currentEl[params[1]+'_'+id] = $(this);
        $(this).replaceWith('<img id="loading_img"/>');
        $('#loading_img').attr('src', mtv.assetPath + 'images/loading.gif').show();

        $.ajax({
            url: url,
            type: 'post',
            data: {
                data: data
            },
            dataType: 'json',
            success: function (data) {
                var item = currentEl[params[1]+'_'+id];
                $('#loading_img').replaceWith(currentEl[params[1]+'_'+id]);
                currentEl[params[1]+'_'+id] = '';
                if (data.error) {
                    item.css('color', 'red');
                    item.parent().append('<div style="color: red" class="vote-error">'+data.error+'</div>');
                    setTimeout(function () {
                        $('.vote-error').remove();
                        item.css('color', '#8e8e8e');
                    }, 1000);
                } else {
                    item.css('color', '#2acb5b');
                    setTimeout(function () {
                        item.css('color', '#8e8e8e');
                    }, 500);
                    if (0 == params[3]) { // determine up arrow was clicked
                        el.find('.green').html(function (i, val) {
                            return +val + 1
                        });
                    }
                    else {
                        el.find('.green').html(function (i, val) {
                            return +val - 1
                        });
                    }
                }
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX error:" + textStatus );
                $('#result').html(errorThrown);
            },
            complete:function () {

            }
        });
    });

    $(document).delegate('#browse', 'click', function (e) {
        e.preventDefault();

        var url = $(this).attr('href');
        var tag = $('#tag').val();

        currentEl['browse'] = $(this);
        $(this).replaceWith('<img style="position: relative; top: 20px; height:40px"id="loading_img"/>');
        $('#loading_img').attr('src', mtv.assetPath + 'images/loading_big.gif').show();

        $.ajax({
            url: url,
            type: 'post',
            data: {
                tag: tag
            },
            success: function (data) {

                $('.faq-block .pageable').html(data);
                $('#loading_img').replaceWith(currentEl['browse']);
                currentEl['browse'] = '';
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX error:" + textStatus );
                $('#result').html(errorThrown);
            },
            complete:function () {

            }
        });
    });

    $(document).delegate('.add-comment', 'click', function (e) {
        var thisCommentContainer = $(this).parent().parent().next();
        var isThisCommentVisible = thisCommentContainer.is(':visible');
        closeAll();
        thisCommentContainer.toggle(!isThisCommentVisible);
    });

    currentText  = '';
    currentTopic = '';
    currentTags  = '';
    $(document).delegate('.front_edit', 'click', function (e) {
        e.preventDefault();

        closeAll();

        var el = $(this).closest('div[id^="entry-"]');
        var id = el.attr('id').split('-')[1];

        var topicEl = el.find('.topic').first();
        var topic = topicEl.text();
        currentTopic = topic;
        topicEl.html('<input id="topic" type="textarea" class="editing" value="'+topic+'">');

        var textEl = el.find('.text').first();
        var text = textEl.text();
        currentText = text;
        textEl.html('<textarea id="text" type="textarea" class="editing" >'+text+'</textarea>');

        el.find('.select2').prop("disabled", false);

        var tagsEl = el.find('#tag');
        currentTags = tagsEl.val();

        $(this).addClass('front_edit_stop').removeClass('front_edit').html('Submit/Close');
        $(this).addClass('action_button');

    });

    $(document).delegate('.front_edit_stop', 'click', function (e) {
        e.preventDefault();

        closeAll();

        $(this).addClass('front_edit').removeClass('front_edit_stop').html('Edit');
        $(this).removeClass('action_button');
    });

    $(document).delegate('#slide_answer', 'click', function (e) {
        var el = $(".addrpl");
        if (el.length > 0) {
            $('html, body').animate({
                scrollTop: el.offset().top
            }, 300);
        }
    });


});

function redirect(url, hash) {
    var curUrl = window.location.href,
        curHash = window.location.hash;

    if (curHash)
        curUrl = curUrl.substr(0, curUrl.indexOf(curHash));

    if ('reload' == url) {
        window.location.reload(true);
        return;
    }
    else if ((hash !== undefined && curUrl == url)) {
        window.location.hash = hash;
        window.location.reload(true);
        return;
    }

    window.location.href = url + (hash !== undefined ? hash : '');
}

function set_temp_error(el, id, msg)
{
    var item = el.find("#"+id);
    item.css('border','1px solid red');
    $("#err_" + id).remove();
    item.before('<div style="font-size: 10px; color: red; padding: 3px 21px; position: relative; " id="err_'+id+'">'+msg+'</div>');

    setTimeout(function() {
        item.css('border','1px solid #c1c1c1');
        $("#err_" + id).remove();
    }, 5000);
}

function addclass(m) {
    var adclass=m.split('.');
    if (adclass[1] !== undefined) {
        return '<div class=' + adclass[2] + '><a href="' + mtv.baseUrl + 'faq/tag/' + adclass[1] + '.html" title=' + adclass[0] + '>' + adclass[0] + '</a></div>';
    }
    else {
        return m;
    }
}

function checkT1ext(msg)
{
    var pattern = /(https?:\/\/www\.[paidverts|mytrafficvalue]+\.com[\S]+)?/ig;
    var replacement = "<a href='$1'>$1</a>";
    var formatted_msg = msg.replace(pattern, replacement);
    return formatted_msg;
}

function removeLinks()
{
    $('.text a').contents().unwrap();
}

function addLinks() {
    removeLinks();
    $(".answer-content div.text").each(function( index ) {
        var inputText = $(this).html();
        if (inputText.length > 0) {
            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*(paidverts|mytrafficvalue)+\.com*[a-z0-9-+&@#\/%=~_|\S]+/gim;

            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.(paidverts|mytrafficvalue)+\.com*[\S]+(\b|$))/gim;

            $(this).html(inputText
                .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
                .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>'));
        }
    });
    $(".gray-block div.text").each(function( index ) {
        var inputText = $(this).html();
        if (inputText.length > 0) {
            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*(paidverts|mytrafficvalue)+\.com*[a-z0-9-+&@#\/%=~_|\S]+/gim;

            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.(paidverts|mytrafficvalue)+\.com*[\S]+(\b|$))/gim;

            $(this).html(inputText
                .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
                .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>'));
        }
    });
}

function closeAll()
{
    $('.new_comment').each(function() {
        $(this).remove();
        $(this).removeClass('action_button');
    });

    $('.add-comment').each(function() {
        $(this).removeClass('action_button');
        $(this).parent().parent().next().hide();
    });

    $('.select2').each(function() {
        $(this).prop("disabled", true);
    });

    $('.front_edit_stop').each(function() {
        $(this).addClass('front_edit').removeClass('front_edit_stop').html('Edit');
        $(this).addClass('front_edit').removeClass('action_button');
    });
    $(this).addClass('front_edit_stop').removeClass('front_edit').html('Submit/Close');

    $('.editing').each(function() {

        var el = $(this).closest('div[id^="entry-"]');
        el.find('.topic').first().html(currentTopic);
        el.find('.text').first().html(currentText);
        if (currentTags != undefined) {
            $(".select2").val(currentTags).trigger("change");
        }

    });
    addLinks();
}

function checkInput(text, topic, tags)
{
    var result = true;
    if (topic !== undefined && topic.length > 0 && currentTopic.length > 0) {
        if (currentTopic != topic) {
            return true;
        }
        else {
            result = false;
        }
    }
    if (tags != null && tags !== undefined && tags.length > 0 && currentTags.length > 0) {
        if (currentTags.join(',') != tags.join(',')) {
            return true;
        }
        else {
            result = false;
        }
    }
    if (text !== undefined && text.length > 0 && currentText.length > 0) {
        if (currentText != text) {
            return true;
        }
        else {
            result = false;
        }
    }
    return result;
}

