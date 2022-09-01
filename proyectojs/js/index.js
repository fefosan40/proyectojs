const Productos=document.getElementById("productos");
const templateProducto= document.getElementById("template-producto").content;
const templateFooter = document.getElementById("template-footer").content;
const item = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};
document.addEventListener("DOMContentLoaded",()=>{
fetchData();
})
Productos.addEventListener("click",e=>{
     agregarCarrito(e);

});
item.addEventListener('click', e => { btnAumentarDisminuir(e) })
;

async function fetchData() {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarCarrito()
    }

    try {
        const respuesta = await fetch("../js/data.json");
        const datos = await respuesta.json();
        CardProduct(datos)
    }
    catch (error) {
        console.log(error);
    }
}

const CardProduct = (datos)=>{
datos.forEach(producto=>{
    templateProducto.querySelector("h5").textContent = producto.nombre;
     templateProducto.querySelector("p").textContent = producto.precioUnitario;
     templateProducto.querySelector("strong").textContent=producto.stock;
     templateProducto.querySelector("img").setAttribute("src",producto.ImgSrc);
   templateProducto.querySelector("button").dataset.id= producto.ID;
    const clone =templateProducto.cloneNode(true)
   fragment.appendChild(clone)
})
Productos.appendChild(fragment)
}

const agregarCarrito = e =>{
   if(e.target.classList.contains("btn-success")){
  setCarrito(e.target.parentElement);
   }
   e.stopPropagation()
}
   
 const setCarrito = object =>{
  const product = {
    id:object.querySelector("button").dataset.id,
    nombre:object.querySelector("h5").textContent,
    precioUnitario:object.querySelector("p").textContent,
    cantidad:1
  }
  if (carrito.hasOwnProperty(product.id)){
    product.cantidad = carrito[product.id].cantidad + 1
  }
  carrito[product.id]={...product}
 mostrarCarrito();
}

const mostrarCarrito = ()=>{ 
    item.innerHTML="";
Object.values(carrito).forEach(product=>{
  
   templateCarrito.querySelector("th").textContent=product.id;
   templateCarrito.querySelectorAll("td")[0].textContent=product.nombre,
    templateCarrito.querySelectorAll("td")[1].textContent=product.cantidad,
    templateCarrito.querySelector(".btn-info").dataset.id=product.id,
    templateCarrito.querySelector(".btn-danger").dataset.id=product.id
    templateCarrito.querySelector("span").textContent= product.cantidad*product.precioUnitario;


    templateCarrito.querySelector('.btn-info').dataset.id = product.id
    templateCarrito.querySelector('.btn-danger').dataset.id = product.id

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
})
item.appendChild(fragment);
 mostrarFooter();
 localStorage.setItem('carrito', JSON.stringify(carrito));

}

mostrarFooter = ()=>{
    footer.innerHTML="";
    if(Object.keys(carrito).length===0){
        footer.innerHTML=
        `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>

        `
        return 
        
    }
    const cantidades=Object.values(carrito).reduce((acc,{cantidad})=>
acc+cantidad,0    )
 const precios=Object.values(carrito).reduce((acc,{cantidad,precioUnitario})=>acc+cantidad*precioUnitario,0)
templateFooter.querySelectorAll("td")[0].textContent=cantidades
templateFooter.querySelector("span").textContent=precios
const clone=templateFooter.cloneNode(true)
fragment.appendChild(clone)
footer.appendChild(fragment)

const boton = document.querySelector('#vaciar-carrito')
boton.addEventListener('click', () => {
 carrito = {};
  mostrarCarrito();
})

}
const btnAumentarDisminuir = e => {

     
    if (e.target.classList.contains('btn-info')) {
        const product = carrito[e.target.dataset.id]
        product.cantidad++
        carrito[e.target.dataset.id] = { ...product}
        mostrarCarrito()
        console.log(product)
    }

    if (e.target.classList.contains('btn-danger')) {
        const product = carrito[e.target.dataset.id]
        product.cantidad--
        if (product.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...product}
        }
        mostrarCarrito()
    }
    e.stopPropagation()

}



