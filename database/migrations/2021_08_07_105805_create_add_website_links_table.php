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
            $table->integer('per_view_point');
            $table->integer('view_count')->default(0)->nullable();
            $table->integer('completed_view_count')->default(0)->nullable();
            $table->integer('expected_view');
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
