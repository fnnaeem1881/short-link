$(document).ready(function() {
    var cs = '#captcha';
    var captchaEl = $(cs).visualCaptcha({
        imgPath: $(cs).attr('data-interface'),
        captcha: {
            numberOfImages: $(cs).attr('data-images')*1,
            routes: {
                start : '/captcha/start',
                image : '/captcha/image',
                audio : '/captcha/audio'
                
            }
        }
    });
    
});
