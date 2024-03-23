<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ventas;
use App\Models\libros;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Http\Resources\VentaResource;
use Dotenv\Exception\ValidationException;

class VentasController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:ventas.listar');
        $this->middleware('can:ventas.agregar');
        $this->middleware('can:ventas.eliminar');
        $this->middleware('can:ventas.modificar');
    }



    public function getVentas()
    {
        try{
            $venta = ventas::all();
            // return VentaResource::collection($venta);
            return response()->json(VentaResource::collection($venta));
        }catch(ValidationException $error){
            return response()->json('error', $error->getMessage());
        }

    }

    public function create(Request $request)
    {
        try {
            $libro_id = Libros::whereRaw('LOWER(titulo) = ?', [strtolower($request->input('libro_id'))])->firstOrFail();
            $cliente_id = User::role('Cliente')->whereRaw('LOWER(name) = ?', [strtolower($request->input('cliente_id'))])->firstOrFail();
            $empleado_id = User::role('Dependiente')->whereRaw('LOWER(name) = ?', [strtolower($request->input('empleado_id'))])->firstOrFail();

            $reglas = [
                'libro_id' => 'required|numeric',
                'cliente_id' => 'required|numeric',
                'empleado_id' => 'required|numeric',
                'cantidad' => 'required|numeric',
            ];

            $datos = [
                'libro_id' =>  $libro_id->id,
                'cliente_id' =>  $cliente_id->id,
                'empleado_id' =>  $empleado_id->id,
                'cantidad' => $request->cantidad,
            ];
            $validator = Validator::make($datos, $reglas);

            if (!$validator->fails()) {
                $venta = ventas::create($validator->validated());
                $libro = Libros::findOrFail($libro_id->id);
                $libro->decrement('cantidad', $request->cantidad);
                return response()->json(new VentaResource($venta));
            }else{
                return response()->json(['error' => $validator->errors()], 400);
            }
        } catch (ValidationException $error) {
            return response()->json('error', $error->getMessage());
        }
         catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        $venta = ventas::findOrFail($request->header('id'));
        $venta->delete();
    }

    public function getById(Request $request)
    {
        $venta = ventas::find($request()->id);
        return response()->json($venta);
    }

    public function modificar(Request $request)
    {
        try {
            $libro_id = Libros::whereRaw('LOWER(titulo) = ?', [strtolower($request->input('libro_id'))])->firstOrFail();
            $cliente_id = User::role('Cliente')->whereRaw('LOWER(name) = ?', [strtolower($request->input('cliente_id'))])->firstOrFail();
            $empleado_id = User::role('Dependiente')->whereRaw('LOWER(name) = ?', [strtolower($request->input('empleado_id'))])->firstOrFail();

            $reglas = [
                'libro_id' => 'required|numeric',
                'cliente_id' => 'required|numeric',
                'empleado_id' => 'required|numeric',
                'cantidad' => 'required|numeric',
            ];

            $datos = [
                'libro_id' =>  $libro_id->id,
                'cliente_id' =>  $cliente_id->id,
                'empleado_id' =>  $empleado_id->id,
                'cantidad' => $request->cantidad,
            ];

            $validator = Validator::make($datos, $reglas);

            if (!$validator->fails()) {
                $venta = ventas::findOrFail($request->input('id'));
                $venta->update($validator->validated());
                return response()->json(new VentaResource($venta));
            }
        } catch (ValidationException $error) {
            return response()->json('error', $error->getMessage());
        }
    }

    // public function buscarVentas(Request $request){
    //     $cadena= $request->header('cadena');
    //     $cadena=Str::lower($cadena);

    //     $ventas = ventas::whereRaw('LOWER(libro_id) LIKE ?', ['%' . $cadena . '%'])
    //                     ->orwhereRaw('LOWER(cliente_id) LIKE ?', ['%' . $cadena . '%'])
    //                     ->orwhereRaw('cantidad', $cadena)
    //                     ->orwhereRaw('LOWER(empleado_id) LIKE ?', ['%' . $cadena . '%'])
    //                     ->get();

    //         return response()->json(new VentaResource($ventas));
    // }
}
