let api_key = '36190f524fb17f65636bd17dd5ac249c';
let botonBusqueda = document.getElementById('botonBusqueda');
let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let difKelvin = 273.15


botonBusqueda.addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    if(ciudad){
        fetchDatosClima(ciudad)
    }
    else {
        alert('Ingrese una ciudad')
    }
})


function fetchDatosClima(ciudad) {
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        .then(data => {
            if (!data.ok) {
                throw new Error('Error en la solicitud, verifique el nombre de la ciudad.');
            }
            return data.json();
        })
        .then(data => mostrarDatosClima(data))
        .catch(error => {
            alert(error.message);
            console.error('Error:', error);
        });
}


function mostrarDatosClima(data) {
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';

    const ciudadNombre = data.name;
    const paisNombre = data.sys.country;
    const temperatura = data.main.temp - difKelvin;
    const humedad = data.main.humidity;
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;

    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura es de: ${temperatura.toFixed(1)} ° Centigrados`;

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `La humedad es: ${humedad}% `;

    const iconoInfo = document.createElement('img');
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `La descripcion meteorologica es: ${descripcion}`;

    divDatosClima.append(ciudadTitulo, temperaturaInfo, humedadInfo, iconoInfo, descripcionInfo);

}









