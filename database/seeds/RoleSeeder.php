<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' =>'System Admin',
            ],
            [
                'name' =>'Admin',
            ],
            [
                'name' =>'User',
            ],
        ];
        DB::table('roles')->insert($roles);
    }
}
