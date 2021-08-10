<!DOCTYPE html>
<html lang="en">



<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <title>Adminty - Premium Admin Template by Colorlib </title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="#">
    <meta name="keywords"
        content="Admin , Responsive, Landing, Bootstrap, App, Template, Mobile, iOS, Android, apple, creative app">
    <meta name="author" content="#">
    <!-- Favicon icon -->
    <link rel="icon" href="{{asset('frontend/assets')}}/images/favicon.ico" type="image/x-icon">
    <!-- Google font-->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet">
    <!-- Required Fremwork -->
    <link rel="stylesheet" type="text/css" href="{{asset('frontend')}}/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- feather Awesome -->
    <link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/icon/feather/css/feather.css">
    <!-- Style.css -->
    <link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/css/style.css">
    <link rel="stylesheet" type="text/css" href="{{asset('frontend/assets')}}/css/jquery.mCustomScrollbar.css">
<style>
.checkbox-fade label input[type="checkbox"], .checkbox-fade label input[type="radio"] {
    display: block!important;
    margin-left: 0px!important;
}
.text-inverse {
    color: #404E67 !important;
    margin-left: 25px!important;
}
</style>
</head>

<body class="fix-menu">
    <!-- Pre-loader start -->
    <div class="theme-loader">
        <div class="ball-scale">
            <div class='contain'>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
                <div class="ring">
                    <div class="frame"></div>
                </div>
            </div>
        </div>
    </div>

    <section class="login-block">
        <!-- Container-fluid starts -->
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <!-- Authentication card start -->


                        <form class="md-float-material form-material" method="POST" action="{{ route('login') }}">
                            @csrf
                        <div class="text-center">
                            <img src="{{asset('frontend/assets')}}/images/logo.png" alt="logo.png">
                        </div>
                        <div class="auth-box card">
                            <div class="card-block">
                                <div class="row m-b-20">
                                    <div class="col-md-12">
                                        <h3 class="text-center">Sign In</h3>
                                    </div>
                                </div>
                                <div class="form-group form-primary">


                                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}"  placeholder="Your Email Address" required autocomplete="email" autofocus>

                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    <span class="form-bar"></span>
                                </div>
                                <div class="form-group form-primary">

                                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password"  placeholder="Password" required autocomplete="current-password">

                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    <span class="form-bar"></span>
                                </div>
                                <div class="row m-t-25 text-left">
                                    <div class="col-12">
                                        <div class="checkbox-fade fade-in-primary d-">
                                            <label>
                                                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>


                                                <span class="text-inverse">Remember me</span>
                                            </label>
                                        </div>
                                        <div class="forgot-phone text-right f-right">

                                                @if (Route::has('password.request'))
                                                <a class="text-right f-w-600 " href="{{ route('password.request') }}">
                                                    {{ __('Forgot Your Password?') }}
                                                </a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-t-30">
                                    <div class="col-md-12">
                                        <button type="submit"
                                            class="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20">Sign
                                            in</button>
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-md-10">
                                        <p class="text-inverse text-left m-b-0">Thank you.</p>
                                        <p class="text-inverse text-left"><a href="{{route('home')}}"><b class="f-w-600">Back
                                                    to website</b></a></p>
                                    </div>
                                    <div class="col-md-2">
                                        <img src="{{asset('frontend/assets')}}/images/auth/Logo-small-bottom.png"
                                            alt="small-logo.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <!-- end of form -->
                </div>
                <!-- end of col-sm-12 -->
            </div>
            <!-- end of row -->
        </div>
        <!-- end of container-fluid -->
    </section>





  <!-- Required Jquery -->
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/jquery/dist/jquery.min.js"></script>
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/jquery-ui/jquery-ui.min.js"></script>
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/popper.js/dist/umd/popper.min.js"></script>
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <!-- jquery slimscroll js -->
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/jquery-slimscroll/jquery.slimscroll.js"></script>
  <!-- modernizr js -->
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/modernizr/modernizr.js"></script>
  <!-- Chart js -->
  <script type="text/javascript" src="{{asset('frontend')}}/bower_components/chart.js/dist/Chart.js"></script>
  <!-- amchart js -->
  <script src="{{asset('frontend/assets')}}/pages/widget/amchart/amcharts.js"></script>
  <script src="{{asset('frontend/assets')}}/pages/widget/amchart/serial.js"></script>
  <script src="{{asset('frontend/assets')}}/pages/widget/amchart/light.js"></script>
  <script src="{{asset('frontend/assets')}}/js/jquery.mCustomScrollbar.concat.min.js"></script>
  <script type="text/javascript" src="{{asset('frontend/assets')}}/js/SmoothScroll.js"></script>
  <script src="{{asset('frontend/assets')}}/js/pcoded.min.js"></script>
  <!-- custom js -->
  <script src="{{asset('frontend/assets')}}/js/vartical-layout.min.js"></script>
  <script type="text/javascript" src="{{asset('frontend/assets')}}/pages/dashboard/custom-dashboard.js"></script>
  <script type="text/javascript" src="{{asset('frontend/assets')}}/js/script.min.js"></script>
</body>
</html>
