//Chave do servidor
const keyApi = "f59f520d575d7c810d7f807c8b4f3fc7";

const cityName = document.querySelector(`.input-city`);

const cidade = document.querySelector(`.cidade`);
const temperatura = document.querySelector(`.temperatura`);
const tempo = document.querySelector(`.datos`);
const umidade = document.querySelector(`.umidade`);

//Função é executada quando o usuário aperta o botão "Enter", ao pressionar a tecla, será executada a função do button.
window.addEventListener(`keyup`, (e) => {
    if (e.keyCode == 13) {
        btnInput();
    }
})

//Função que vai adicionar os dados no HTML.
function changeScreen(files) {
    document.querySelector(`.box-informacoes`).style.display = "flex";
    cidade.innerHTML = `${files.name} <img class="flag-country" src="${`https://flagsapi.com/${files.sys.country}/flat/64.png`}" alt="">`;
    temperatura.innerHTML = `${Math.floor(files.main.temp)}ºC`;
    tempo.innerHTML = `${files.weather[0].description} <img class="icone-tempo" src="${`http://openweathermap.org/img/wn/${files.weather[0].icon}.png`}" alt="">`;
    umidade.innerHTML = `Umidade: ${files.main.humidity}%`;
    cityName.value = "";
    cityName.focus();
    console.log(files)

}
//Função pesquisa a cidade no servidor(API)
async function searchCity(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&lang=pt_Br&units=metric`).then(reply => reply.json());

    if (data.message == 'city not found' || city == Number) {
        alert(`Cidade não encontrada!`);
        hiddenInfor();
        return
    }

    else if (city == ``) {
        alert(`Digite o nome da cidade!`);
        hiddenInfor();
        return
    }
    changeScreen(data);
}

//Função que recupera o valor do input
function btnInput() {
    searchCity(cityName.value);
}

function hiddenInfor() {
    document.querySelector(`.box-informacoes`).style.display = "none";
    cityName.value = "";
}
