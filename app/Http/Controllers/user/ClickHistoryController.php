<?php

namespace App\Http\Controllers\user;

use App\admin\ShortLink;
use App\admin\ShortlinkClick;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClickHistoryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $location = session('location');
        $network = session('network');
        $click = new ShortlinkClick();
        $click->user_id = $request->user_id;
        $click->short_link_id = $request->slink_id;
        $click->ip = session('ip');
        $click->city = $location->city;
        $click->country = $location->country;
        $click->continent = $location->continent;
        $click->latitude = $location->latitude;
        $click->longitude = $location->longitude;
        $click->network = $network->network;
        $click->service_provider_id = $network->autonomous_system_number;
        $click->service_provider = $network->autonomous_system_organization;
        $click->v_code = rand(100000,999999);
        $click->save();
        $link = ShortLink::where('id',$request->slink_id)->first();
        $response = [];
        $response['link'] = $link->websiteLink->website_link;
        $response['id'] = $click->id;
        return json_encode($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }



    public function fetchVCode(Request $request){
        $click_id = $request->click_id;
        $his = ShortlinkClick::where('id',$click_id)->first();
        if ($his==null){
            return response()->json([false]);
        }
        return response()->json([$his->v_code]);
    }
}
