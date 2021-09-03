<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddWebsiteLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('add_website_links', function (Blueprint $table) {
            $table->id();
            $table->string('website_name')->unique();
            $table->string('website_link')->nullable();
            $table->string('short_link')->nullable();
            $table->string('per_view_point')->nullable();
            $table->string('view_count')->nullable();
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('add_website_links');
    }
}
