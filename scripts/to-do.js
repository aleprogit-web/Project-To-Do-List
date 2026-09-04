const addButton = document.querySelector('.js-add-button');

let todoHistory = JSON.parse(localStorage.getItem('todoList')) || [];

const todoList = document.querySelector('.to-do-list');

const deleteAllButton = document.querySelector('.delete-all');



const pendingFilter = document.querySelectorAll('.js-pending-filter');
pendingFilter.forEach((button) => {
  button.addEventListener('click', () => {
    const pendingTodos = todoHistory.filter((todo) => !todo.concluida);
    renderTodoList(pendingTodos);
  })

})

const checkedFilter = document.querySelectorAll('.js-checked-filter');
checkedFilter.forEach((button) => {
  button.addEventListener('click', () => {
    const checkedTodos = todoHistory.filter((todo) => todo.concluida);
    renderTodoList(checkedTodos);
  })

})

const allFilter = document.querySelectorAll('.js-all-filter');
allFilter.forEach((button) => {
  button.addEventListener('click', () => {
    renderTodoList();
  });
});

const favoriteFilter = document.querySelector('.js-favorite-filter');
favoriteFilter.addEventListener('click', () => {
  const favoriteTodos = todoHistory.filter((todo) => todo.favorita);
  renderTodoList(favoriteTodos);
})


function renderTodoList(tasks = todoHistory) {

  let todoArray = '';

  tasks.forEach((todo) => {
    let taskClass;

    if (todo.concluida) {
      taskClass = 'completed';
    } else {
      taskClass = '';
    }

    let favoriteIcon;

    if (todo.favorita) {
      favoriteIcon = 'images/checkedStar.png';
    } else {
      favoriteIcon = 'images/favoriteStar.png';
    }

    let html = 
      `<div class="to-do-actions ${taskClass}" 
        data-id="${todo.id}">
        <button class="check-button js-check-button"></button>
        <p class="to-do">${todo.texto}</p>
        <div class="task-actions">
          <img class="favorite-star js-star-button" src="${favoriteIcon}">
          <img class="delete-button js-delete-button" src="images/delete-gray.png">
        </div>
      </div>`

    todoArray += html;
  })
  todoList.innerHTML = todoArray;

  const deleteEach = document.querySelectorAll('.js-delete-button');

  deleteEach.forEach((button) => {
    button.addEventListener('click', (event) => {

    const closestDiv = event.target.closest('.to-do-actions');
    const matchingId = closestDiv.dataset.id;
    const indice = todoHistory.findIndex((todo) => todo.id === matchingId);

    todoHistory.splice(indice, 1);
    localStorage.setItem('todoList', JSON.stringify(todoHistory));
    renderTodoList();
    updateTaskNumber();

    })

  })

  const checkButton = document.querySelectorAll('.js-check-button');

  checkButton.forEach((button) => {
    button.addEventListener('click', (event) => {
      const closestDiv = event.target.closest('.to-do-actions');
      const matchingId = closestDiv.dataset.id;
      const indice = todoHistory.findIndex((todo) => todo.id === matchingId);

      todoHistory[indice].concluida =  !todoHistory[indice].concluida;
      localStorage.setItem('todoList', JSON.stringify(todoHistory));

      renderTodoList();
      updateTaskNumber();

      })

  })

  const favoriteButton  = document.querySelectorAll('.js-star-button');

  favoriteButton.forEach((button) => {
    button.addEventListener('click', (event) => {
      const closestDiv = event.target.closest('.to-do-actions');
      const matchingId = closestDiv.dataset.id;
      const indice = todoHistory.findIndex((todo) => todo.id === matchingId);


      todoHistory[indice].favorita =  !todoHistory[indice].favorita;
      localStorage.setItem('todoList', JSON.stringify(todoHistory));

      renderTodoList();
      updateTaskNumber();
    })

  })

}


addButton.addEventListener('click', () => {

  const idNum = crypto.randomUUID();
  const todo = document.querySelector('.js-to-do-input').value;
  todoHistory.push({
    texto: todo,
    id: idNum,
    concluida: false,
    favorita: false,
    data: null
  });
  localStorage.setItem('todoList', JSON.stringify(todoHistory));
  renderTodoList();
  updateTaskNumber();

})



deleteAllButton.addEventListener('click', () => {
   todoHistory = todoHistory.filter((todo) => !todo.concluida);
   localStorage.setItem('todoList', JSON.stringify(todoHistory));

  renderTodoList();
  updateTaskNumber();
  
})

function updateTaskNumber(){
  const allTaskNumber = document.querySelector('.js-all-task-number');
  const allPendingNumber = document.querySelector('.js-pending-task-number');
  const allCheckedNumber = document.querySelector('.js-checked-task-number');
  const allFavoriteNumber = document.querySelector('.js-favorite-task-number');


  allTaskNumber.innerHTML = todoHistory.length;
  allPendingNumber.innerHTML = todoHistory.filter((todo) => !todo.concluida).length;
  allCheckedNumber.innerHTML = todoHistory.filter((todo) => todo.concluida).length;
  allFavoriteNumber.innerHTML = todoHistory.filter((todo) => todo.favorita).length;

}

renderTodoList();
updateTaskNumber();




