<?php

namespace Database\Seeders;

use App\Models\libros;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BooksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [ "El principito", "Antoine de Saint-Exupéry", "Ficción", "978-3-16-148410-0", 100, 'Alfaguara', "Reflexivo", "Historia de un joven príncipe que viaja por el universo.","Elprincipito.jpg",300],
            [ "1984", "George Orwell", "Novela", "978-0-14-103614-4", 200, 'Debolsillo', "Distopía", "Una visión distópica del futuro donde la vigilancia constante es la norma.","1984.jpg",400],
            [ "Cien años de soledad", "Gabriel García Márquez", "Novela", "978-0-375-70427-8", 300, 'Editorial Siruela', "Magia realista", "La historia de una familia a lo largo de varias generaciones en Colombia.","CADS.jpg",10],
            [ "Don Quijote de la Mancha", "Miguel de Cervantes", "Novela", "978-84-9759-542-3", 0, 'Editorial Montena', "Clásico", "La aventura de un hidalgo que decide convertirse en caballero andante.","DQDLM.jpg", 500],
            [ "Moby Dick", "Herman Melville", "Novela", "978-0-14-243724-7", 500, 'Editorial Susaeta', "Marítimo", "La obsesión de un capitán por capturar el gran tiburón blanco.","MobyDick.jpg",90],
            [ "Ulises", "James Joyce", "Novela", "978-0-14-118317-3", 600, 'Editorial Kalandraka', "Histórico", "La vida de Leopold Bloom en un día, narrada en un estilo modernista.","ulises.jpg",79],
            [ "En busca del tiempo perdido", "Marcel Proust", "Novela", "978-0-14-118317-3", 700, 'Editorial Cátedra', "Bibliográfico", "La vida de Marcel Proust desde su infancia hasta su muerte.","EBDTP.jpg",80],
            [ "Crimen y castigo", "Fyodor Dostoevsky", "Novela", "978-0-14-044913-7", 800, 'Editorial Destino', "Misterio", "La historia de un joven estudiante que comete un asesinato.","CRIJMENcASTIGO.jpg",100],
            [ "El gran Gatsby", "F. Scott Fitzgerald", "Novela", "978-0-7432-7356-5", 900, 'Editorial Montena', "Drama", "La historia de Jay Gatsby y su amor por Daisy Buchanan.","GG.jpg",68],
            [ "La metamorfosis", "Franz Kafka", "Novela", "978-0-14-103614-4", 1000, 'Editorial Susaeta', "Ficción", "La transformación de Gregor Samsa en un insecto.","METAMORFOSIS.jpg",45],
            ["El viejo y el mar","Ernest Hemingway","Novela","978-0-14-103614-4",110,"Editorial Planeta", "Aventura", "La historia de un viejo pescador que lucha por sobrevivir en el mar.","elViejoMar.jpg",67],
            ["El código Da Vinci","Dan Brown",  "Novela",  "978-0-307-58638-8", 140, "Editorial Debolsillo",   "Misterio", "La historia de un profesor de simbología que descubre un antiguo secreto.","Davinci.jpg",89],
            [ "El tiempo entre costuras", "Maria Dueñas",   "Novela","978-84-9879-089-8",  160,   "Editorial Anagrama",  "Histórico","La historia de una costurera que se embarca en una aventura por América Latina.","costuras.jpg",90],
            [ "El idiota", "Fiódor Dostoyevski","Novela", "978-0-14-103614-4",190,"Editorial Alfaguara","Psicológico","La historia de un príncipe que es considerado un 'idiota' por la sociedad, pero que revela la verdadera naturaleza de las personas a su alrededor.","idiota.jpg",400]
        ];

        foreach ($books as $book) {
            DB::table('libros')->insert([
                'titulo' => $book[0],
                'autor' => $book[1],
                'tipo' => $book[2],
                'tema' => $book[6],
                'editorial' => $book[5],
                'descripcion' => $book[7],
                'ISBN' => $book[3],
                'cantidad' =>$book[4],
                'precio'=>$book[9],
                'url' => $book[8]
            ]);
        }







    }
}
