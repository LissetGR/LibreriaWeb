<?php

namespace Database\Factories;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ventas>
 */
class VentasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $id_libro = DB::table('libros')->inRandomOrder()->first();

        $randomLibro = $id_libro->id;


        return [
            'cantidad' =>$this->faker->numberBetween(1, 100),
            'libro_id' => $randomLibro,
            'empleado_id' => $this->faker->numberBetween(1, 5),
            'cliente_id' => $this->faker->numberBetween(6, 50),
        ];
    }
}
