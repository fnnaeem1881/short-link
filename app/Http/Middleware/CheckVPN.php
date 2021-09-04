<?php

namespace App\Http\Middleware;

use App\helpers\IPHelper;
use Closure;

class CheckVPN
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $ip = $request->ip();
        if(session('ip')==null || session('ip') != $ip){
            if (IPHelper::checkVpn($ip)==false){
                return response()->json('Please disable your vpn or proxy and refresh the browser');
            }
        }
        return $next($request);
    }
}
