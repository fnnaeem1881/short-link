@extends('backend.master')
@section('header_nav')

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
    <a href="{{route('add.website.link')}}">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">Add Website Link</span>
    </a>
</li>

<li class=" ">
    <a href="{{route('list.website.link')}}">
        <span class="pcoded-micon"><i class="feather icon-shield"></i></span>
        <span class="pcoded-mtext">List Website Link</span>
    </a>
</li>

<li class="pcoded-hasmenu">
    <a href="#">
        <span class="pcoded-micon"><i class="feather icon-link"></i></span>
        <span class="pcoded-mtext">My Short Links</span>
    </a>
    <ul class="pcoded-submenu">
        <li class="">
            <a href="{{ route('admin.shortLink.all') }}">
                <span class="pcoded-mtext">All Links</span>
            </a>
        </li>

    </ul>
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
