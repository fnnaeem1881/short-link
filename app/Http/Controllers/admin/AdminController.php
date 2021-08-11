<?php

namespace App\Http\Controllers\admin;

use App\admin\AddWebsiteLink;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function admindashboard()
    {
        return view('backend.admin.admindashboard');
    }
    public function addSiteLink()
    {
        return view('backend.admin.add_site_link');
    }

    public function saveWebsiteLink(Request  $request)
    {
//        dd($request->all());

        $request->validate([
            'website_link' => 'required|url',
            'website_name' => 'required'
        ]);

        $saveWebsiteLink = new AddWebsiteLink();

        $saveWebsiteLink->website_name = $request->website_name;
        $saveWebsiteLink->website_link = $request->website_link;
        $saveWebsiteLink->status = $request->status;
        if($saveWebsiteLink->status=='Active'){
            $links=AddWebsiteLink::where('status','Active')->get();
            foreach ($links as $link){
                $link->status = 'Inactive';
                $link->save();
            }
        }
        $saveWebsiteLink->save();

        return redirect()->route('list.website.link');


    }

    public function listWebsiteLink()
    {
        $websiteLists=AddWebsiteLink::orderBy('id','desc')->get();
//        dd($websiteLists);
        return view('backend.admin.list_website_link',compact('websiteLists'));
    }

    public function listWebsiteLinkDelete($id)
    {
        $websiteListDelete=AddWebsiteLink::where('id',$id)->first();
        $websiteListDelete->delete();
//        dd($websiteLists);
        return redirect()->back();
    }

    public function listWebsiteLinkEdit($id)
    {
        $websiteListEdit=AddWebsiteLink::where('id',$id)->first();
//        dd($websiteLists);
        return view('backend.admin.add_website_link_edit',compact('websiteListEdit'));
    }

    public function listWebsiteLinkUpdate(Request  $request , $id)
    {
        $websiteUpdate=AddWebsiteLink::where('id',$id)->first();

        $request->validate([
            'website_link' => 'required|url',
            'website_name' => 'required'
        ]);

        $websiteUpdate->website_name = $request->website_name;
        $websiteUpdate->website_link = $request->website_link;
        $websiteUpdate->status = $request->status;
        $websiteUpdate->save();

        return redirect()->route('list.website.link');


    }


}
