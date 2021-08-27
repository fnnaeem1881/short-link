<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class MenuController extends Controller
{
    public function home(){
        // codes for vpnapi.io
        $ip = $this->get_client_ip();
        if($ip=='UNKNOWN'){
            $ip = file_get_contents("http://ipecho.net/plain");
        }
        if($ip=='UNKNOWN'){
            return "Please Off your vpn or proxy connection connection";
        }
        $api_url = "https://vpnapi.io/api/".$ip."?key=cd6d9b1327a94a5b84647598e6a76ce2";
        $res = \Illuminate\Support\Facades\Http::get($api_url);
        $result =json_decode($res);
        if($result->security->vpn == false){
            return view('frontend.home');
        }else{
            return "Please Off your vpn connection";
        }
    }

    public function profile(){
        return view('frontend.profile');
    }


    public function clearAll(){
        $exitCode = Artisan::call('route:cache');
        $exitCode1 = Artisan::call('cache:clear');
        $exitCode2= Artisan::call('view:clear');
        $exitCode3= Artisan::call('config:clear');
        $exitCode4= Artisan::call('config:cache');
        echo 'all cache cleared';
    }

    function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }


}
