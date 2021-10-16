<?php

namespace App\Http\Controllers\user;

use App\admin\AddWebsiteLink;
use App\admin\ShortLink;
use App\admin\ShortlinkClick;
use App\helpers\IPHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use function Psy\sh;

class UserController extends Controller
{
    public function index(){
        return view('backend.user.userdashboard');
    }

    public function user_profile(){
        return view('backend.user.user_profile');
    }
    public function shortLink(){
        $shortLinks=AddWebsiteLink::with(['shortLinkClicks'=>function($query){
            return $query->where('user_id',auth()->user()->id)->where('status','=','verified')->get();
        }])->orderBy('id','DESC')->get();
        return view('backend.user.shortlink',compact('shortLinks'));
    }
    public function  todayShortLink(){
        $link = AddWebsiteLink::where('status','Active')->limit(1)->first();
        return view('backend.user.todayLink',compact('link'));
    }

    public function newShortLink(){
        $link = AddWebsiteLink::where('status','Active')->limit(1)->first();
        return view('backend.user.add_short_link',compact('link'));

    }
    public function saveShortLink(Request $request){
        $request->validate([
            'link_name' => 'required',
            'short_link' => 'required'
        ]);
        $longAddress = $this->getOriginalURL($request->short_link);
        $active = AddWebsiteLink::where('status','Active')->limit(1)->first();
        if($active->website_link != $longAddress) {
            session()->flash('errorMessage',$request->short_link.' Does not match with the real one!');
            return redirect()->back();
        }else{
            $short_link = new ShortLink();
            $short_link->link_name = $request->link_name;
            $short_link->short_link = $request->short_link;
            $short_link->website_link_id = $active->id;
            $short_link->user_id = auth()->user()->id;
            $short_link->save();
            session()->flash('successMessage','Short link successfully added!');
            return redirect()->route('shortLink.all');
        }
    }
    public function myShortLinks(){
        $short_links = ShortLink::where('user_id',auth()->user()->id)->orderBy('id','desc')->get();
        return view('backend.user.my_short_links',compact('short_links'));
    }

    public function myShortLinkDetails($id){
        $short_link_details = ShortlinkClick::where('short_link_id',$id)->where('user_id',auth()->user()->id)->first();
        return view('backend.user.my_short_link_details',compact('short_link_details'));
    }
    // function to retrieve the effective url from shortend url
    private function getOriginalURL($url) {
        $rurl = "https://api.redirect-checker.net/?url=".$url."&timeout=10&maxhops=10&meta-refresh=1&format=json&more=1";
        $res = \Illuminate\Support\Facades\Http::get($rurl);
        $result = $res->json();
        if($result == null){
            return $url;
        }
        $last = end($result['data']);
        //dd($last['response']);
        if($last['response']==false){
            return $url;
        }else{
            return $last['response']['info']['url'];
        }
    }

public function buy_credit(){
        return view('backend.user.buy_credit');
}
public function refer(){
        return view('backend.user.refer');
}


}
