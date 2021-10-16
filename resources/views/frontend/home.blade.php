@extends('frontend.master')
@section('content')


    <div class="panel panel-flat bg-green" style="min-height: 596px; background: url('{{asset('assets/')}}/images/bg_home_top.png'); background-position: center; background-repeat: no-repeat; background-size: cover;">
        <div class="panel-body">

            <!--<div style="position: absolute; width: 728px; height: 90px; max-width: 98%; right: 0; left: 0; margin-right: auto; margin-left: auto;">
                <script data-cfasync=false src="//s.ato.mx/p.js#id=5144170&size=728x90"></script>
            </div>-->

            <div class="pl-20 pr-20 text-center" style="margin-top: 160px;">
                <h1 style="font-size: 7vw; font-weight: 700; text-transform: uppercase">Connect, click & earn!</h1>
                <h2 style="font-size: calc(14px + 1.5vw)">Discover how easy it is to advertise and earn at the same time</h2>
            </div>
        </div>
    </div>

    <!-- Page container -->
    <div class="page-container">
        <!-- Page content -->
        <div class="page-content">
            <!-- Main content -->
            <div class="content-wrapper">
                <div class="row row-flex row-flex-wrap">

                    <!-- Advertise -->
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="panel text-center flex-col">
                            <div class="panel-heading">
                                <h2 class="panel-title text-uppercase"><strong>Advertise</strong></h2>
                                <div class="mt-20"><img src="{{asset('assets/')}}/images/target_ads.jpg"/></div>
                            </div>
                            <div class="panel-body flex-grow">
                                <div class="content-group-sm">
                                    <div class="mt-5 text-size-large">
                                        We have developed powerful advertising tools to reach the right audience at the cheapest cost possible
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a href="advertisers.html" class="btn bg-green legitRipple mt-10 mb-10">
                                    Start advertising
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- /Advertise -->

                    <!-- Earn -->
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="panel text-center flex-col">
                            <div class="panel-heading">
                                <h2 class="panel-title text-uppercase"><strong>Earn</strong></h2>
                                <div class="mt-20"><img src="{{asset('assets/')}}/images/point.png"/></div>
                            </div>
                            <div class="panel-body flex-grow">
                                <div class="content-group-sm">
                                    <div class="mt-5 text-size-large">
                                        Get paid to click! We're the very first PTC to have a unique Points Program that lets you increase the value of your paid ads
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a href="earners.html" class="btn bg-green legitRipple mt-10 mb-10">
                                    Start earning
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- /Earn -->

                    <!-- Do Both -->
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="panel text-center flex-col">
                            <div class="panel-heading">
                                <h2 class="panel-title text-uppercase"><strong>Do Both!</strong></h2>
                                <div class="mt-20"><img src="{{asset('assets/')}}/images/chain.png"/></div>
                            </div>
                            <div class="panel-body flex-grow">
                                <div class="content-group-sm">
                                    <div class="mt-5 text-size-large">
                                        At PaidVerts we allow you to promote and generate extra income online with ease! Get started right away
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <a href="register.html" class="btn bg-green legitRipple mt-10 mb-10">
                                    Register now
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- /Do Both -->

                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-flat" style="margin-bottom: 0">
        <div class="panel-body bg-green">
            <div class="pl-20 pr-20 text-center">
                <div class="row">
                    <span style="vertical-align: middle; font-size: 2vw; font-weight: 700;">Did you know?</span>
                    <span style="padding-left: 5%; vertical-align: middle; font-weight: 300; font-size: 2vw;">We've got <strong>4,090,151</strong> users registered</span>
                </div>
            </div>
        </div>
        <div class="panel-body bg-white text-center">
            <div class="mb-20 pl-20 pr-20 text-center">
                <h1 class="text-bold text-uppercase" style="font-size: calc(14px + 2vw);">Why PaidVerts?</h1>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-20">
                <div class="mt-20 mb-20">
                    <button class="btn btn-xs btn-success btn-labeled text-uppercase legitRipple" style="margin: 0 auto;">
                        <b><i class="icon-checkmark"></i></b> Secure
                    </button>
                </div>
                <div class="mt-20 text-size-large" style="padding: 10px 100px;">
                    Our website is supported by a high quality secure system which makes sure all your information remains safe
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-20">
                <div class="mt-20 mb-20">
                    <button class="btn btn-xs btn-success btn-labeled text-uppercase legitRipple" style="margin: 0 auto;">
                        <b><i class="icon-checkmark"></i></b> Transparent
                    </button>
                </div>
                <div class="mt-20 text-size-large" style="padding: 10px 100px;">
                    All transactions made in our platform can be tracked! Follow every single order you've made with us
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mb-20">
                <div class="mt-20 mb-20">
                    <button class="btn btn-xs btn-success btn-labeled text-uppercase legitRipple" style="margin: 0 auto;">
                        <b><i class="icon-checkmark"></i></b> Sustainable
                    </button>
                </div>
                <div class="mt-20 text-size-large" style="padding: 10px 100px;">
                    We have designed a sustainable system based on real revenues made by real products
                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-flat bg-green" style="margin-bottom: 0; min-height: 550px; background: url('{{asset('assets/')}}/images/bg_home_middle.png'); background-position: center; background-repeat: no-repeat; background-size: cover;">
        <div class="panel-body">
            <div class="mt-20 pb-20 pl-20 pr-20">
                <div class="row  mb-20">

                    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7 mb-20">

                        <h1 style="font-size: 4.5vw; font-weight: 700; text-transform: uppercase; margin-bottom: 0;">Earning money online</h1>
                        <h1 style="font-size: 4.5vw; font-weight: 700; text-transform: uppercase; margin-top: 0;">just got easy</h1>
                    </div>
                    <!--<div class="text-center col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 mt-20">
                        <script data-cfasync=false src="//s.ato.mx/p.js#id=5158890&size=300x250"></script>
                    </div>-->

                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7 mb-20">
                        <h2 style="font-weight: 300; font-size: calc(10px + 1vw);">We have different options to maximize your earnings! Specially for members who are more active through our platform than the rest as we unlock exclusive features with big rewards</h2>
                    </div>
                    <div class="text-center col-xs-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 mt-20">
                        <a href="about_us.html" class="btn btn-xlg border-white text-white btn-flat mt-20" style="font-size: calc(12px + 1.5vw)">Learn more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-flat" style="margin-bottom: 0;">
        <div class="panel-body bg-white">
            <div class="text-center col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <div class="mt-20 mb-20">
                    <h1 style="font-size: 4.5vw; font-weight: 700; text-transform: uppercase; margin-top: 50px; margin-bottom: 0;">Try our mobile app!</h1>
                </div>
                <div class="mt-20 text-size-large" style="padding: 10px 100px;">
                    <h2 style="font-weight: 300; font-size: calc(10px + 1vw);">The PaidVerts App comes with so many features that you will enjoy earning or advertising from anywhere you are!</h2>
                    <div class="row" style="margin-top: 70px; margin-bottom: 70px;">
                        <div class="text-center col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <a href="https://itunes.apple.com/app/paidverts-mobile/id1085653000" target="_blank">
                                <img src="{{asset('assets/')}}/images/home_ios.png" class="img-responsive center-block" />
                            </a>
                        </div>
                        <div class="text-center col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <a href="https://play.google.com/store/apps/details?id=com.paidverts.mobile" target="_blank">
                                <img src="{{asset('assets/')}}/images/home_android.png" class="img-responsive center-block" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <img src="{{asset('assets/')}}/images/home_phone.png" class="img-responsive center-block" />
            </div>
        </div>
    </div>

    <div class="panel panel-flat bg-green" style="margin-bottom: 0;">
        <div class="panel-body">
            <div class="row">
                <div class="text-center col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-20" style="vertical-align: middle">
                    <h1 class="pt-20" style="font-size: calc(14px + 2vw); font-weight: 700; text-transform: uppercase;">Create a free account</h1>
                    <a href="register.html" class="mt-20 btn btn-xlg border-white text-white btn-flat text-uppercase">Join us now!</a>
                </div>
                <div class="text-center col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-20">
                    <h2 style="font-weight: 300; font-size: calc(10px + 1vw); text-transform: uppercase;">We've paid our members</h2>
                    <h1 style="font-size: calc(14px + 2vw); font-weight: 700; text-transform: uppercase;">$9,440,634.98</h1>
                    <h2 style="font-weight: 300; font-size: calc(10px + 1vw); text-transform: uppercase;">in cashouts</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="panel panel-flat">
        <div class="panel-body bg-white">
            <div class="text-center col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="mt-20 mb-20">
                    <h1 style="font-size: calc(14px + 3vw); font-weight: 700; text-transform: uppercase; margin-top: 10%;">Follow us on</h1>
                </div>
                <div class="mt-20 mb-20 text-size-large">
                    <div class="row">
                        <div class="col-xs-offset-2 col-xs-4 col-sm-offset-2 col-sm-4 col-md-offset-2 col-md-4 col-lg-offset-2 col-lg-4 col-xl-offset-2 col-xl-4">
                            <a href="https://www.youtube.com/channel/UCKifGzPJYzBpfNVUD6RdmXA" target="_blank">
                                <img src="{{asset('assets/')}}/images/home_yt.png" class="img-responsive center-block" />
                            </a>
                        </div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <a href="https://www.facebook.com/Paidverts-119087178435902/" target="_blank">
                                <img src="{{asset('assets/')}}/images/home_fb.png" class="img-responsive center-block" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/8KDve6XFPdk?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>

@endsection
