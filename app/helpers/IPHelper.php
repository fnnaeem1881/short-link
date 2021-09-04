<?php


namespace App\helpers;


class IPHelper
{
    public static function get_client_ip() {
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
    public static function sessioIp(){
        return session('ip');
    }
    public static function checkVpn(){
        $ip = IPHelper::get_client_ip();
        if($ip=='UNKNOWN'){
            $ip = file_get_contents("http://ipecho.net/plain");
        }
        if($ip=='UNKNOWN'){
            return false;
        }
        $api_url = "https://vpnapi.io/api/".$ip."?key=cd6d9b1327a94a5b84647598e6a76ce2";
        $res = \Illuminate\Support\Facades\Http::get($api_url);
        $result =json_decode($res);
//        dd($result);
        if($result->security->vpn == false){
            session(['ip' => $result->ip]);
            session(['location' => $result->location]);
            session(['network' => $result->network]);
            return true;
        }else{
            return false;
        }

    }
}
