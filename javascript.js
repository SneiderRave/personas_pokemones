function persona() {
  $.get('https://randomuser.me/api/', function(data) {
    let datosPersona = data.results[0];

    let nombre_completo = datosPersona.name.first + ' ' + datosPersona.name.last;
    let email = datosPersona.email;
    let celular = datosPersona.cell;
    let telefono_fijo = datosPersona.phone;
    let pais = datosPersona.location.country;
    let ciudad = datosPersona.location.city;
    let genero = '';
    if(datosPersona.gender == 'male') { genero = 'Hombre'; }
    if(datosPersona.gender == 'female') { genero = 'Mujer'; }
    let edad = datosPersona.dob.age;
    let foto = datosPersona.picture.large;

    document.getElementById('nombre_completo').innerHTML = nombre_completo;
    document.getElementById('email').innerHTML = '<b>Email:</b> ' + email;
    document.getElementById('telefonos').innerHTML = '<b>Celular:</b> ' + celular + '<br> <b>Fijo:</b> ' + telefono_fijo;
    document.getElementById('ubicacion').innerHTML = '<b>Pais:</b> ' + pais + '<br> <b>Ciudad:</b> ' + ciudad;
    document.getElementById('genero').innerHTML = '<b>Genero:</b> ' + genero;
    document.getElementById('edad').innerHTML = '<b>Edad:</b> ' + edad;
    document.getElementById('foto').src = foto;

    document.querySelector('#boton_cargar_persona').addEventListener('click', persona);
  });
}


function pokemones() {
  $.get('https://pokeapi.co/api/v2/pokemon', function(data) {
    let imagenes_pokemones = document.getElementById('imagenes_pokemones');

    for (var i = 0; i < data.results.length; i++) {
      $.get(data.results[i].url, function(datosPokemon) {
        let imagen_pokemon = document.createElement('img');
        imagen_pokemon.src = datosPokemon.sprites.front_default;
        imagen_pokemon.id = 'pokeid-'+datosPokemon.id;

        let vinculo_pokemon = document.createElement('a');
        vinculo_pokemon.href = '#';
        vinculo_pokemon.alt = datosPokemon.name;
        vinculo_pokemon.title = datosPokemon.name;

        vinculo_pokemon.appendChild(imagen_pokemon);

        imagenes_pokemones.appendChild(vinculo_pokemon);

        imagen_pokemon.addEventListener('click', function(event) {
          $.get('https://pokeapi.co/api/v2/pokemon/'+this.id.split('-')[1], function(pokemon) {
            let nombre_pokemon_detalle = pokemon.name;
            let imagen_pokemon_detalle = pokemon.sprites.front_default;
            let habilidades_pokemon_detalle = [];
            for (var i = 0; i < pokemon.abilities.length; i++) {
              habilidades_pokemon_detalle.push(pokemon.abilities[i].ability.name);
            }
            let movimientos_pokemon_detalle = [];
            for (var i = 0; i < pokemon.moves.length; i++) {
              movimientos_pokemon_detalle.push(pokemon.moves[i].move.name);
            }
            let estadisticas_pokemon_detalle = '';
            for (var i = 0; i < pokemon.stats.length; i++) {
              estadisticas_pokemon_detalle += '<b>Nombre:</b> ' + pokemon.stats[i].stat.name + ', <b>Valor:</b> ' + pokemon.stats[i].base_stat + '<br>';
            }
            let imagenes_pokemon_detalle = '';
            imagenes_pokemon_detalle += `<img src="${pokemon.sprites.front_default}" class="img-fluid rounded mx-auto d-block">`;
            imagenes_pokemon_detalle += `<img src="${pokemon.sprites.back_default}" class="img-fluid rounded mx-auto d-block">`;
            imagenes_pokemon_detalle += `<img src="${pokemon.sprites.front_shiny}" class="img-fluid rounded mx-auto d-block">`;
            imagenes_pokemon_detalle += `<img src="${pokemon.sprites.back_shiny}" class="img-fluid rounded mx-auto d-block">`;

            document.getElementById('nombre_pokemon_detalle').innerHTML = nombre_pokemon_detalle;
            document.getElementById('imagen_pokemon_detalle').src = imagen_pokemon_detalle;
            document.getElementById('imagen_pokemon_detalle').alt = nombre_pokemon_detalle;
            document.getElementById('imagen_pokemon_detalle').title = nombre_pokemon_detalle;

            document.getElementById('habilidades_pokemon_detalle').innerHTML = '<b>HABILIDADES:</b> <br>' + habilidades_pokemon_detalle;
            document.getElementById('movimientos_pokemon_detalle').innerHTML = '<b>MOVIMIENTOS:</b> <br>' + movimientos_pokemon_detalle;
            document.getElementById('estadisticas_pokemon_detalle').innerHTML = '<b>ESTADISTICAS:</b> <br>' + estadisticas_pokemon_detalle;
            document.getElementById('imagenes_pokemon_detalle').innerHTML = '<b>IMAGENES:</b> <br>' + imagenes_pokemon_detalle;
          });
        });
      });
    }
  });
}
