$(document).ready(function () {
  $("#search-form").submit(function (event) {
    event.preventDefault();
    let heroId = $("#hero-id").val();
    if (validateInput(heroId)) {
      fetchSuperheroData(heroId);
    } else {
      alert("Por favor, ingrese un número válido.");
    }
  });
});

function validateInput(input) {
  return /^\d+$/.test(input);
}

//AJAX
function fetchSuperheroData(heroId) {
  $.ajax({
    url: `https://www.superheroapi.com/api.php/4905856019427443/${heroId}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      renderHeroData(data);
    },
    error: function () {
      alert("Hubo un error al recuperar los datos del superhéroe.");
    },
  });
}
function renderHeroData(hero) {
  let output = `
  <h3>Superheroe encontrado</h3>
    <div class="card">
      <div class="row">
        <div class="col-md-5">
          <img src="${hero.image.url}" class="card-img" alt="${hero.name}">
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <p class="card-text"><strong>Nombre completo:</strong> ${hero.biography["full-name"]}</p>
            <p class="card-text"><strong>Alter egos:</strong> ${hero.biography["alter-egos"]}</p>
            <p class="card-text"><strong>Alianza:</strong> ${hero.biography["aliases"]}</p>
            <p class="card-text"><strong>Lugar de nacimiento:</strong> ${hero.biography["place-of-birth"]}</p>
            <p class="card-text"><strong>Primera aparición:</strong> ${hero.biography["first-appearance"]}</p>
            <p class="card-text"><strong>Publicado por:</strong> ${hero.biography["publisher"]}</p>
            <p class="card-text"><strong>Alineamiento:</strong> ${hero.biography["alignment"]}</p>
            <p class="card-text"><strong>Género:</strong> ${hero.appearance["gender"]}</p>
            <p class="card-text"><strong>Raza:</strong> ${hero.appearance["race"]}</p>
            <p class="card-text"><strong>Altura:</strong> ${hero.appearance["height"]}</p>
            <p class="card-text"><strong>Peso:</strong> ${hero.appearance["weight"]}</p>
            <p class="card-text"><strong>Ocupación:</strong> ${hero.work["occupation"]}</p>
            <p class="card-text"><strong>Lugar:</strong> ${hero.work["base"]}</p>
            <p class="card-text"><strong>Conexión:</strong> ${hero.connections["group-affiliation"]}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  $("#hero-info").html(output);

  var chart = new CanvasJS.Chart("hero-chart", {
    theme: "light2",
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: `Estadísticas de Poder de ${hero.name}`
    },
    data: [{
      type: "pie",
      startAngle: 25,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: parseInt(hero.powerstats.intelligence, 10), label: "Inteligencia" },
        { y: parseInt(hero.powerstats.strength, 10), label: "Fuerza" },
        { y: parseInt(hero.powerstats.speed, 10), label: "Velocidad" },
        { y: parseInt(hero.powerstats.durability, 10), label: "Durabilidad" },
        { y: parseInt(hero.powerstats.power, 10), label: "Poder" },
        { y: parseInt(hero.powerstats.combat, 10), label: "Combate" }
      ]
    }]
  });
  chart.render();
}

