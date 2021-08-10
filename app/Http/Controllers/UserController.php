<?php

namespace App\Http\Controllers;

use App\admin\AddWebsiteLink;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return view('user.userdashboard');
    }

}
