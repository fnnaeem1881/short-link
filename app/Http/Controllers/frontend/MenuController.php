<?php

namespace App\Http\Controllers\frontend;

use App\helpers\IPHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MenuController extends Controller
{
    public function home(Request $request){
        if(session('ip')==null){
            return $this->vpnCheck('frontend.home');
        }else{
            $ip = IPHelper::get_client_ip();
            if($ip=='UNKNOWN'){
                $ip = file_get_contents("http://ipecho.net/plain");
            }
            if(session('ip')==$ip){
                return view('frontend.home');
            }else{
                return $this->vpnCheck('frontend.home');
            }
        }
    }
    public function clearAll(){
        $exitCode = Artisan::call('route:cache');
        $exitCode1 = Artisan::call('cache:clear');
        $exitCode2= Artisan::call('view:clear');
        $exitCode3= Artisan::call('config:clear');
        $exitCode4= Artisan::call('config:cache');
        echo 'all cache cleared';
    }

    public function vpnCheck($view){
        if (IPHelper::checkVpn()){
            return view($view);
        }else{
            return "Please Off your vpn or proxy connection connection";
        }
    }
}
