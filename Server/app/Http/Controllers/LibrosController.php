<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\libros;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class LibrosController extends Controller
{
    public function __construct(){
        $this->middleware('can:libros.listar');
        $this->middleware('can:libros.agregar')->only('create');
        $this->middleware('can:libros.eliminar')->only('destroy');
        $this->middleware('can:libros.modificar')->only('mdificar');
    }


    public function getLibros(){
        $libro=libros::all();
        return response()->json($libro);
    }

    public function getById(Request $request){
        $libro=libros::findOrFail($request()->id);
        return response()->json($libro);
    }

    public function create(Request $request){
     try{
        $validator = $request->validate( [
            'titulo' => 'required|string|max:100|',
            'tipo' => 'required|string|max:100',
            'tema' => 'required|string|max:100',
            'editorial' => 'required|string|max:100',
            'autor' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'ISBN' => 'required|string',
            'cantidad' => 'required|numeric',
            'precio' => 'required|numeric|',
            'url' => 'string|',
        ]);


        $libro=Libros::create([
            'titulo' => $validator['titulo'],
            'tipo' => $validator['tipo'],
            'tema' => $validator['tema'],
            'editorial' => $validator['editorial'],
            'autor' => $validator['autor'],
            'descripcion' => $validator['descripcion'],
            'ISBN' => $validator['ISBN'],
            'cantidad' => $validator['cantidad'],
            'precio' => $validator['precio'],
            'url' => $validator['url'],
        ]);

        $libro->save();


        return response()->json($libro);

        }catch(ValidationException $error){
            return response()->json([
                'error'=>$error->getMessage()
            ]);
        }
    }


    public function destroy(Request $request){
      try{
        $libro= libros::findOrFail($request->header('id'));
        $libro->delete();

        return $libro;
      }catch(ValidationException $error){
         return $error->getMessage();
      }
    }


    public function modificar(Request $request){
      try{
        $validator = $request->validate( [
            'titulo' => 'required|string|max:100|',
            'tipo' => 'required|string|max:100',
            'tema' => 'required|string|max:100',
            'editorial' => 'required|string|max:100',
            'autor' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'ISBN' => 'required|string',
            'cantidad' => 'required|numeric',
            'precio' => 'required|numeric|',
            'url' => 'required|string|',
        ]);

        $libro=libros::findOrFail($request->input('id'));
        $libro->update($request->all());
        // $libro->save();

        return $libro;

      }catch(ValidationException $error){
        return response()->json([
            'error'=>$error->getMessage()
        ]);
      }
    }


    public function getRecomendados(){

        $Recomendados = DB::table('ventas')
        ->select(DB::raw('libro_id'), DB::raw('count(libro_id) as number'))
        // ->join('ventas', 'libros.id_libro', 'ventas.libro_id')
        // ->where('ventas.libro_id', 'libros.id_libro')
        ->groupBy('libro_id')
        ->orderBy('number', 'desc')
        ->take(6)
        ->get();

        foreach ($Recomendados as $recomendado) {
            $id = $recomendado->libro_id;
            $libro = DB::table('libros')->where('id', $id)->first();
            if ($libro) {
                $respuesta[] = $libro;
            }
        }

        return response()->json($respuesta);
    }

    public function buscarLibros(Request $request){

        $cadena= $request->header('cadena');
        $cadena=Str::lower($cadena);

        $libros = Libros::whereRaw('LOWER(titulo) LIKE ?', ['%' . $cadena . '%'])
                        ->orwhereRaw('LOWER(autor) LIKE ?', ['%' . $cadena . '%'])
                        // ->orwhereRaw('LOWER(ISBN) LIKE ?', ['%' . $cadena . '%'])
                        ->orwhereRaw('LOWER(tipo) LIKE ?', ['%' . $cadena . '%'])
                        ->orwhereRaw('LOWER(tema) LIKE ?', ['%' . $cadena . '%'])
                        ->get();

            return response()->json($libros);
    }
}
