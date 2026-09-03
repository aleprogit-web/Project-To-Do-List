const addButton = document.querySelector('.js-add-button');

let todoHistory = JSON.parse(localStorage.getItem('todoList')) || [];

const todoList = document.querySelector('.to-do-list');

const deleteAllButton = document.querySelector('.delete-all');

const pendingFilter = document.querySelector('.js-pending-filter');

pendingFilter.addEventListener('click', () => {
  const pendingTodos = todoHistory.filter((todo) => !todo.concluida);

console.log(pendingTodos);

 
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

    let html = 
      `<div class="to-do-actions ${taskClass}" 
        data-id="${todo.id}">
        <button class="check-button js-check-button"></button>
        <p class="to-do">${todo.texto}</p>
        <img class="delete-button js-delete-button" src="images/delete-gray.png">
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

      })

  })

}


addButton.addEventListener('click', () => {

  const idNum = crypto.randomUUID();
  const todo = document.querySelector('.js-to-do-input').value;
  todoHistory.push({
    texto: todo,
    id: idNum,
    concluida: false
  });
  localStorage.setItem('todoList', JSON.stringify(todoHistory));
  renderTodoList();

})



deleteAllButton.addEventListener('click', () => {
  todoList.innerHTML = '';
  todoHistory = [];
  localStorage.removeItem('todoList');

})



renderTodoList();


