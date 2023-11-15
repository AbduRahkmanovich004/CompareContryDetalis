// varebles
const input1 = document.querySelector("#id1");
const input2 = document.querySelector("#id2");
const aside1 = document.querySelector(".aside1");
const aside2 = document.querySelector(".aside2");
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    let allContiryName = '<option value="">--select name--</option>';
    data.forEach((element) => {
      allContiryName += `<option value="${element.name.common}">${element.name.common}</option>`;
    });
    input1.insertAdjacentHTML("beforeend", allContiryName);
    input2.insertAdjacentHTML("beforeend", allContiryName);
  });

input1.addEventListener("click", () => {
  fetch(`https://restcountries.com/v3.1/name/${input1.value}`)
    .then((response) => response.json())
    .then((element) => {
      let [data] = element;
      chiz(data, aside1);
    });
});
input2.addEventListener("click", () => {
  fetch(`https://restcountries.com/v3.1/name/${input2.value}`)
    .then((response) => response.json())
    .then((element) => {
      let [data] = element;
      chiz(data, aside2);
    });
});

function chiz(data, element, element2) {
  let text = `
      <img src="${data.flags.png}" alt="img">
      <h2>${data.name.official}</h2>
      <div>
        <p>Population:</p>
        <p>${Math.round(data.population)}</p>
      </div>
      <div>
        <p>Capital city:</p>
        <p>${data.capital}</p>
      </div>
      <div>
        <p>Area:</p>
        <p>${data.area}</p>
      </div>
      <div>
        <p>Containes:</p>
        <p>${data.region}</p>
      </div>
      <div>
        <p>timeZona:</p>
        <p>${data.timezones}</p>
      </div>
      <div>
        <p>Subregion:</p>
        <p>${data.subregion}</p>
      </div>
    `;
  element.innerHTML = text;
}
function chizError(data, msg=0,element) {
  let text;
  if(!msg){
    text = `
      <h3>${data.address.country}</h3>
    `;
  }else{
    text = `
      <h3>${msg}</h3>
    `;  
  }
  element.innerHTML = text;
}

let inp11 = document.querySelector(".inp11");
let inp12 = document.querySelector(".inp12");
let inp21 = document.querySelector(".inp21");
let inp22 = document.querySelector(".inp22");
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");

let cordinate1 = [];
let cordinate2 = [];

function chizCordinate(data, element, element2) {
  fetch(`https://restcountries.com/v3.1/name/${data.address.country}`)
    .then((response) => response.json())
    .then((el) => {
      let [mal] = el;
      chiz(mal, element);
      element2.value = data.address.country;
    }).catch(error => (chizError(data,"ishla",element), error));
}

btn1.addEventListener("click", () => {
  cordinate1 = [inp11.value, inp12.value];
  fined(cordinate1, aside1, input1);
  inp11.value = "";
  inp12.value = "";
});
btn2.addEventListener("click", () => {
  cordinate2 = [inp21.value, inp22.value];
  fined(cordinate2, aside2, input2);
  inp21.value = "";
  inp22.value = "";
});
function fined(cordinate, element, element2) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${+cordinate[0]}&lon=${+cordinate[1]}`
  )
    .then((response) => response.json())
    .then((data) => {
      chizCordinate(data, element, element2);
    }).catch(error => (chizError("",'Kordinata notogri yoki internet bilan muammo',element), error));
}

// https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lang}
