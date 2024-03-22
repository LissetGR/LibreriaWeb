<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('libro_id');
            $table->unsignedBigInteger('empleado_id');
            $table->unsignedBigInteger('cliente_id');
            $table->integer('cantidad');

            $table->foreign('libro_id')->references('id')->on('libros')->onDelete('cascade');
            $table->foreign('empleado_id')->references('id')->on('users');
            $table->foreign('cliente_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
