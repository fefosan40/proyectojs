Swal.fire({
    title:"Bienvenidos!",
    timer: 5000,
    imageUrl:"LOGOVERDULERIA2.jpg"
    
    
});

let boton2 = document.getElementById("btn2");

boton2.addEventListener("click",()=>{

Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Su mensaje fue enviado',
    showConfirmButton: false,
    timer: 5000
  });
});

 






