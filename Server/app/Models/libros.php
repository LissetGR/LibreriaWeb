<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class libros extends Model
{
    use HasFactory;

    protected $fillable= ['titulo','tipo','tema','editorial','autor','descripcion','ISBN', 'cantidad', 'precio','url' ];


}
