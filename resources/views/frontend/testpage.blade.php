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



    <div class="wrapper animsition" data-animsition-in-class="fade-in" data-animsition-in-duration="1000" data-animsition-out-class="fade-out" data-animsition-out-duration="1000">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top" role="navigation">
               <div class="container">
                   <a class="navbar-brand page-scroll" href="#main"><img src="assets/logos/logo.png" alt="adminity Logo" /></a>
                   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                   </button>
                   <div class="collapse navbar-collapse" id="navbarSupportedContent">
                       <ul class="navbar-nav mr-auto">
                       </ul>
                       <ul class="navbar-nav my-2 my-lg-0">
                           <li class="nav-item">
                               <a class="nav-link page-scroll" href="#main">Home</a>
                           </li>
                           <li class="nav-item">
                               <a class="nav-link page-scroll" href="#services">Blog</a>
                           </li>
                           <li class="nav-item">
                               <a class="nav-link page-scroll" href="#features">About</a>
                           </li>
                           <li class="nav-item">
                               <a class="nav-link page-scroll" href="#reviews">Contact</a>
                           </li>
                            @guest

                           <li class="nav-item">
                               <a class="nav-link" href="{{ route('login') }}">Login</a>
                           </li>
                           @if (Route::has('register'))
                           <li class="nav-item">
                               <a class="nav-link" href="{{ route('register') }}">Singup</a>
                           </li>
                           @endif
                           @else
                           <li class="nav-item">
                            <a class="nav-link page-scroll" href="{{ route('userdashboard') }}"> {{ Auth::user()->name }}</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                          document.getElementById('logout-form').submit();">Logout</a>
 <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
    @csrf
</form>
                        </li>
                           @endguest
                       </ul>
                   </div>
               </div>
           </nav>
       </div>




        @yield('content')




        <!-- Scroll To Top -->
        <a id="back-top" class="back-to-top page-scroll" href="#main">
            <i class="ion-ios-arrow-thin-up"></i>
        </a>
        <!-- Scroll To Top Ends-->
    <!-- Main Section -->
    </div>




<!-- Footer -->
