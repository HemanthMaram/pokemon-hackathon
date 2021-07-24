const url = "https://pokeapi.co/api/v2/pokemon/";

var maindiv = createElement("div", "main");
var hpart = createElement("div", "heading");

var titlt = createElement("h1", "title");

titlt.innerHTML = "POKEMON API";
var image = createElement("img","img1")
image.setAttribute('src','./multiimg.jpg')

var bpart = createElement("div", "plist");
bpart.setAttribute("id", "tbody");
bpart.append(image)
hpart.append(titlt);

pokemonslist();
var arr = [];

async function pokemonslist() {
  try {
    for (let i = 1; i <= 50; i++) {
      let resp = await fetch(url + i);
      let data = await resp.json();
      var pokemonobj = {
        name: data.name,
        weight: data.weight,
        ability: data.abilities,
        image: data.sprites["front_default"],
      };
      arr.push(pokemonobj);
    }

    pokemonimages(arr);
  } catch (err) {
    console.log(err);
  }
}

function pokemonimages(data) {
  var main = document.getElementById("tbody");
  var con = document.createElement("div");
  con.setAttribute("class", "container");
  var ele = document.createElement("div");
  ele.setAttribute("class", "row ");
  let abilities = [];
  var a = [];
  data.forEach((element) => {
    for (let k = 0; k < element.ability.length; k++) {
      // console.log(element.ability[k].ability.name);
      abilities.push(element.ability[k].ability.name);
      a += ` ${element.ability[k].ability.name}<br>
        `;
    }
    var listofabilities = [];

    abilities.forEach((ele) => {
      listofabilities += `
     
      <p>Abilities <br>
      ${ele.name}</p>
      
      `;
    });

    ele.innerHTML += `<div class="  col-3 mb-4 mt-5  p-0 ">
       <div class ="card ">
       <div class ="card-img">
       <img src=${element.image} class="card-img-top">
       </div>
       <div class="card-body text-center">
       <p class="card-title qtitle mt-3 text-center">${element.name.toUpperCase()} 
       </p> 
       

       <p class ="weight text-center">Weight :${element.weight}</p> 
       
        <div id="fill">
         <span id="cbg"> Abilities</span>  <br>
       <div id="abs"> ${a} </div>
       </div>
        

        
       
      </div> 
       
       
     </div>
     </div>
     
     `;
    a = [];
  });
  con.append(ele);
  main.append(con);
}

function createElement(elem, name) {
  var ele = document.createElement(elem);
  ele.setAttribute("class", name);
  return ele;
}

maindiv.append(hpart, bpart);
document.body.append(maindiv);
