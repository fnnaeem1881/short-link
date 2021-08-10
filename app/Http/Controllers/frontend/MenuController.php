<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function home(){
        return view('frontend.home');
    }

    public function profile(){
        return view('frontend.profile');
    }



}
