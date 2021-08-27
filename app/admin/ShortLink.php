<?php

namespace App\admin;

use App\User;
use Illuminate\Database\Eloquent\Model;

class ShortLink extends Model
{

    public function websiteLink(){
        return $this->belongsTo(AddWebsiteLink::class,'website_link_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function shortLinkClicks(){
        return $this->hasMany(ShortlinkClick::class,'short_link_id');
    }
}
