@extends('backend.master')
@section('header_nav')
<li>
    <a href="#">
Website
    </a>
</li>
<li>
    <a href="{{route('shortlink')}}">
Shortlink
    </a>
</li>
<li>
    <a href="#">
Apps
    </a>
</li>
@endsection

{{-- Side Bar Nav --}}
@section('sidebar_nav')
<li class=" ">
    <a href="#">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">My Account</span>
    </a>
</li>
<li class=" ">
    <a href="#">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">My Point</span>
    </a>
</li>
<li class="pcoded-hasmenu">
    <a href="#">
        <span class="pcoded-micon"><i class="feather icon-link"></i></span>
        <span class="pcoded-mtext">My Short Links</span>
    </a>
    <ul class="pcoded-submenu">
        <li class="">
            <a href="{{ route('shortLink.new') }}">
                <span class="pcoded-mtext">New Link</span>
            </a>
        </li>
        <li class="">
            <a href="{{ route('shortLink.all') }}">
                <span class="pcoded-mtext">Links</span>
            </a>
        </li>

    </ul>
</li>

<li class=" ">
    <a href="#">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">Refar</span>
    </a>
</li>
<li class=" ">
    <a href="#">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">Buy Credit</span>
    </a>
</li>
<li class=" ">
    <a href="{{ route('shortLink.today') }}">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">Link Now</span>
    </a>
</li>

<li>
    <a  href="{{ route('logout') }}"
        onclick="event.preventDefault();
                      document.getElementById('logout-form').submit();">
       <span class="pcoded-micon">  <i class="feather icon-log-out"></i></span>


        <span class="pcoded-mtext">Logout</span>

    </a>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
        @csrf
    </form>
</li>
@endsection
