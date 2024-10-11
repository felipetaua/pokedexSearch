let contador = 0;

function buscar() {
    let entrada = document.getElementById("entrada").value.toLowerCase();
    if (entrada.length < 1) {
        entrada = contador;
    }
    let url = `https://pokeapi.co/api/v2/pokemon/${entrada}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let estatisticas = data.stats;
        let hp = estatisticas.find(item => item.stat.name === "hp").base_stat;
        let ataque = estatisticas.find(item => item.stat.name === "attack").base_stat;
        let defesa = estatisticas.find(item => item.stat.name === "defense").base_stat;
        let speed = estatisticas.find(stat => stat.stat.name === "speed").base_stat;

        var tela = document.getElementById("tela");
        tela.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${data.id}.gif">
        
        <div class="numero">${data.id}</div>
        <div class="informacoes">
            <p><b><i class="fa-solid fa-tag"></i> Nome:</b> ${data.name}</p>
            <p><b><i class="fa-solid fa-sun"></i> Tipo:</b> ${data.types.map(type => type.type.name).join(', ')}</p>
            <p><b><i class="fa-solid fa-star"></i> Habilidade:</b> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p><b><i class="fa-solid fa-weight-hanging"></i> Peso:</b> ${data.weight / 10}Kg</p>
            <p><b><i class="fa-solid fa-up-down"></i> Altura:</b> ${data.height / 10}m</p>
            <br>
            <p><b><i class="fa-solid fa-heart"></i> Vida:</b> ${hp}</p>
            <div id="hp"></div>
            <p><b><i class="fa-solid fa-hand-fist"></i> Ataque:</b> ${ataque}</p>
            <div id="ataque"></div>
            <p><b><i class="fa-solid fa-shield"></i> Defesa:</b> ${defesa}</p>
            <div id="defesa"></div>
            <p><b><i class="fa-solid fa-bolt"></i> Velocidade:</b> ${speed}</p>
            <div id="velocidade"></div>
        </div>
        `;
        contador = data.id;
        document.getElementById("entrada").value = "";

        let maxStat = 255;
        animateStats(hp, ataque, defesa, speed, maxStat);
        

    }).catch(error => {
        alert("Pokémon não encontrado! " + error);
    });
}

mostrarTodosPokemons();

function mostrarTodosPokemons() {
    let todosPokemons = document.getElementById("todosPokemons");
    todosPokemons.innerHTML = ""; // Limpa a área

    for (let i = 1; i <= 151; i++) { // Ajuste o número máximo de Pokémon
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let estatisticas = data.stats;
                let hp = estatisticas.find(item => item.stat.name === "hp").base_stat;
                let ataque = estatisticas.find(item => item.stat.name === "attack").base_stat;
                let defesa = estatisticas.find(item => item.stat.name === "defense").base_stat;
                let speed = estatisticas.find(stat => stat.stat.name === "speed").base_stat;

                let pokemonDiv = document.createElement("div");
                pokemonDiv.innerHTML = `
                    <div class="accordion-header">
                        <span>${data.name}</span>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${data.name}">
                    </div>
                    <div class="accordion-content">
                        <p><b><i class="fa-solid fa-tag"></i> Nome:</b> ${data.name}</p>
                        <p><b><i class="fa-solid fa-hashtag"></i> ID:</b> ${data.id}</p>
                        <p><b><i class="fa-solid fa-star"></i> Habilidade:</b> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
                        <p><b><i class="fa-solid fa-sun"></i>Tipo:</b> ${data.types.map(type => type.type.name).join(', ')}</p>
                        <p><b><i class="fa-solid fa-weight-hanging"></i> Peso:</b> ${data.weight / 10}Kg</p>
                        <p><b><i class="fa-solid fa-up-down"></i> Altura:</b> ${data.height / 10}m</p>
                        <br>
                        <p><b><i class="fa-solid fa-heart"></i> Vida:</b> ${hp}</p>
                        <p><b><i class="fa-solid fa-hand-fist"></i> Ataque:</b> ${ataque}</p>
                        <p><b><i class="fa-solid fa-shield"></i> Defesa:</b> ${defesa}</p>
                        <p><b><i class="fa-solid fa-bolt"></i> Velocidade:</b> ${speed}</p>
                        <button class="btn-back" onclick="scrollToTop()">Voltar ao Início</button>
                    </div>
                `;
                todosPokemons.appendChild(pokemonDiv);

                pokemonDiv.querySelector('.accordion-header').addEventListener('click', () => {
                    const content = pokemonDiv.querySelector('.accordion-content');
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateStats(hp, ataque, defesa, speed, maxStat) {
    let hpBarra = new ProgressBar.Line('#hp', { strokeWidth: 2, color: '#8dc75e', trailColor: '#e2e2e2', trailWidth: '1', duration: 900 });
    let ataBarra = new ProgressBar.Line('#ataque', { strokeWidth: 2, color: '#ce5252', trailColor: '#e2e2e2', trailWidth: '1', duration: 900 });
    let defBarra = new ProgressBar.Line('#defesa', { strokeWidth: 2, color: '#72c1cc', trailColor: '#e2e2e2', trailWidth: '1', duration: 900 });
    let velCircle = new ProgressBar.Line('#velocidade', { strokeWidth: 2, color: '#f1ca5f', trailColor: '#e2e2e2', trailWidth: '1', duration: 900, svgStyle: null });

    hpBarra.animate(hp / maxStat);
    ataBarra.animate(ataque / maxStat);
    defBarra.animate(defesa / maxStat);
    velCircle.animate(speed / maxStat);
}

function avancar() {
    contador += 1;
    buscar();
}

function voltar() {
    contador -= 1;
    buscar();
}
