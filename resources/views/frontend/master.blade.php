<!DOCTYPE html>
<html lang="en">


<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <meta charset="utf-8">
    <title>Adminty - Premium Admin Template by Colorlib</title>
    <!-- Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Landing page template for creative dashboard">
    <meta name="keywords" content="Landing page template">
    <!-- Favicon icon -->
    <link rel="icon" href="assets/logos/favicon.ico" type="image/png" sizes="16x16">
    <!-- Bootstrap -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all" />
    <!-- Font -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Poppins:400,300,500,700,600" rel="stylesheet" type="text/css">
    <!-- Animate CSS -->
    <link rel="stylesheet" href="assets/css/animate.css">
    <!-- Owl Carousel -->
    <link rel="stylesheet" href="assets/css/owl.carousel.css">
    <link rel="stylesheet" href="assets/css/owl.theme.css">
    <!-- Magnific Popup -->
    <link rel="stylesheet" href="assets/css/magnific-popup.css">
    <!-- Full Page Animation -->
    <link rel="stylesheet" href="assets/css/animsition.min.css">
    <!-- Ionic Icons -->
    <link rel="stylesheet" href="assets/css/ionicons.min.css">
    <!-- Main Style css -->
    <link href="assets/css/style.css" rel="stylesheet" type="text/css" media="all" />
</head>

<body>
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


         <!-- Footer Section -->
         <div class="footer">
            <div class="container">
                <div class="col-md-12 text-center">
                    <img src="assets/logos/logo.png" alt="Adminty Logo" />
                    <ul class="footer-menu">
                        <li><a href="http://demo.com/">Site</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                    <div class="footer-text">
                        <p>
                            Copyright © 2017 Adminty. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Scroll To Top -->
        <a id="back-top" class="back-to-top page-scroll" href="#main">
            <i class="ion-ios-arrow-thin-up"></i>
        </a>
        <!-- Scroll To Top Ends-->
    <!-- Main Section -->
    </div>
<!-- Wrapper-->

<!-- Jquery and Js Plugins -->
<script type="text/javascript" src="assets/js/jquery-2.1.1.js"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/plugins.js"></script>
<script type="text/javascript" src="assets/js/menu.js"></script>
<script type="text/javascript" src="assets/js/custom.js"></script>
</body>


</html>
