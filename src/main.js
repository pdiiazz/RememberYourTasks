import Ajv from 'ajv';
const ajv = new Ajv(); // Ajv objeto para validar el JSON

// Selección de elementos del DOM.
let title = document.querySelector('#taskInputTitle');
let description = document.querySelector('#taskInputDescription');
let addWishButton = document.querySelector('#addWishButton');
let clearWishesButton = document.querySelector('#clearWishesButton');
let wishList = document.querySelector('#wishesList');

let idGenerator = 0; // Generador de ID para cada objeto de tarea.
let wishListArray = []; // Array para guardar los objetos de tarea.

// Esquema JSON para validar los objetos de tarea.
const esquemaWish = {
    type: 'object',
    properties: {
        idGenerator: { type: 'number' },
        title: { type: 'string', minLength: 1, maxLength: 30 },
        description: { type: 'string', minLength: 1, maxLength: 100 }
    },
    required: ['idGenerator', 'title', 'description'],
    additionalProperties: false
};

// Complilación del esquema para validación.
const validateWish = ajv.compile(esquemaWish);

// Listener para el botón de agregar tarea 
addWishButton.addEventListener('click', (e) => {
  if (title.value.trim() === '' || description.value.trim() === '') {
    alert('Por favor, llena los campos antes de agregar una tarea.');
    return;
  }

  // Creación de objeto de tarea 
  let wish = {
    idGenerator: idGenerator++,
    title: title.value,
    description: description.value
  };

  // Validación del objeto de tarea con el esquema JSON
    if (validateWish(wish)) {
       console.log("Objeto válido:", wish.title) 
    } else {
        alert('Error al agregar la tarea. Por favor, verifica los datos');
        return;    
    }

  // Añade el objeto de desea al array de deseos
  wishListArray.push(wish);

  console.log(wish); // Para ver el ID generado en la consola (va subiendo el contador)

  stylesAndCreate(wish); 

  title.value = '';
  description.value = '';
});

// Listener para el botón de limpiar tareas de la lista
clearWishesButton.addEventListener('click', (e) => {
    // Eliminar todos los elementos hijos del contenedor de deseos
    let items = document.querySelectorAll('.div-container-item');

    // Manda una alerta si no hay tareas para limpiar
    if (items.length === 0) {
        alert('No hay tareas para limpiar.');
        return;
    }

    // Por cada item .div-container-item que exista, se elimina del contenedor de deseos
    items.forEach(item => {
        wishList.removeChild(item);
    });
});

// Función para crear los elementos de cada tarea y aplicar estilos
function stylesAndCreate(wish) {
    // Crear contenedor para cada tarea
    let wishItem = document.createElement('div');
    
    wishItem.classList.add('div-container-item');

    // Estilos para el contenedor de cada tarea que se agregue
    wishItem.style.display = 'flex';
    wishItem.style.flexDirection = 'row';
    wishItem.style.justifyContent = 'space-around';
    wishItem.style.padding = '20px';
    wishItem.style.borderBottom = '1px solid #3d1160';
    wishItem.style.borderTop = '1px solid #3d1160';
    wishItem.style.alignItems = 'center';

    // Crear elemento para el título de la tarea
    let wishTitle = document.createElement('h3');
    wishTitle.textContent = wish.title;
    wishItem.appendChild(wishTitle);

    // Crear elemento para la descripción de la tarea
    let wishDescription = document.createElement('p');
    wishDescription.textContent = wish.description;
    wishItem.appendChild(wishDescription);
    wishDescription.style.fontWeight = 'lighter';

    // Crear botón de eliminar para cada tarea
    let deleteButton = document.createElement('button.delete-btn');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-btn');

    // Estilos para el botón de eliminar
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.border = 'none';
    deleteButton.style.backgroundColor = '#dc3545';
    deleteButton.style.color = 'white';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.hover = 'background-color: #c82333';

    // Listener para eliminar el hijo de la lista de tareas
    deleteButton.addEventListener('click', () => {
        wishList.removeChild(wishItem);
    });

    // Se añade el botón de eliminar al contenedor de la tarea
    wishItem.appendChild(deleteButton);

    // Se añade al array de tareas
    wishList.appendChild(wishItem);

    // Limpiar los campos de entrada 
    title.value = '';
    description.value = '';
}



