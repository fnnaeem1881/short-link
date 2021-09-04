<?php

namespace App\Http\Controllers\frontend;

use App\helpers\IPHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MenuController extends Controller
{
    public function home(Request $request){
       return view('frontend.home');
    }
    public function clearAll(){
        $exitCode = Artisan::call('route:cache');
        $exitCode1 = Artisan::call('cache:clear');
        $exitCode2= Artisan::call('view:clear');
        $exitCode3= Artisan::call('config:clear');
        $exitCode4= Artisan::call('config:cache');
        echo 'all cache cleared';
    }

}
