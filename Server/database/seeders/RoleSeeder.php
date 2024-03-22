<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $Admin = Role::create(['name'=> 'Admin']);
       $Depend = Role::create(['name'=> 'Dependiente']);
       $Cliente = Role::create(['name'=> 'Cliente']);


       Permission::create(['name'=>'libros.eliminar'])->syncRoles($Admin);
       Permission::create(['name'=>'libros.agregar'])->syncRoles($Admin);
       Permission::create(['name'=>'libros.modificar'])->syncRoles($Admin);
       Permission::create(['name'=>'libros.listar'])->syncRoles($Admin,$Cliente);

       Permission::create(['name'=>'ventas.eliminar'])->syncRoles($Depend);
       Permission::create(['name'=>'ventas.agregar'])->syncRoles($Depend);
       Permission::create(['name'=>'ventas.modificar'])->syncRoles($Depend);
       Permission::create(['name'=>'ventas.listar'])->syncRoles($Depend);

       Permission::create(['name'=>'user.eliminar'])->syncRoles($Admin);
       Permission::create(['name'=>'user.agregar'])->syncRoles($Admin);
       Permission::create(['name'=>'user.modificar'])->syncRoles($Admin);
       Permission::create(['name'=>'user.listar'])->syncRoles($Admin);
    }
}
