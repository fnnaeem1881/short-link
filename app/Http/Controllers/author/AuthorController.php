<?php

namespace App\Http\Controllers\author;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function _construct(){
        $this->middleware('auth');
    }
    public function authordashboard()
    {
        return view('backend.author.authordashboard');
    }
}
