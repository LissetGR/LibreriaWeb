<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LibrosController;
use App\Http\Controllers\VentasController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login',[AuthController::class, 'login']);
    Route::post('register',[AuthController::class, 'register']);

});

Route::middleware(['auth:sanctum'])->group(function () {
    //ventas
    Route::get('getVentas',[VentasController::class,'getVentas'])->name('ventas.listar');
    Route::delete('destroyVenta',[VentasController::class,'destroy']);
    Route::post('createVenta',[VentasController::class,'create']);
    Route::put('modificarVenta',[VentasController::class,'modificar']);
    Route::get('getVentasFilter',[VentasController::class,'buscarVentas']);

    // libros
    Route::get('getRecomendados',[LibrosController::class,'getRecomendados'])->name('libros.listar');
    Route::get('getBusqueda',[LibrosController::class,'buscarLibros']);
    Route::post('createLibro',[LibrosController::class,'create']);
    Route::put('modificarLibro',[LibrosController::class,'modificar']);
    Route::delete('destroyLibro',[LibrosController::class,'destroy']);
    Route::get('getLibros',[LibrosController::class,'getLibros']);
    Route::get('getByIdLibro',[LibrosController::class,'getById']);

    // user
    Route::get('verificarRole',[AuthController::class,'verificarRole']);
    Route::get('getUser',[AuthController::class,'getUser'])->name('user.listar');
    Route::get('getAuthUser',[AuthController::class,'getAuth']);
    Route::delete('destroyUser',[AuthController::class,'destroy']);
    Route::put('modificarUser',[AuthController::class,'modificar']);
    Route::post('logout',[AuthController::class, 'logout']);

});

