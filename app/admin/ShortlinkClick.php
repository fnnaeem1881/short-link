<?php

namespace App\admin;

use App\User;
use Illuminate\Database\Eloquent\Model;

class ShortlinkClick extends Model
{
    //
    protected $fillable=['v_code_status'];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function shortLink(){
        return $this->belongsTo(AddWebsiteLink::class,'short_link_id');
    }
}
