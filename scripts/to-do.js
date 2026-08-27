const addButton = document.querySelector('.js-add-button');

let todoHistory = JSON.parse(localStorage.getItem('todoList')) || [];

const todoList = document.querySelector('.to-do-list');

const deleteAllButton = document.querySelector('.delete-all');


function renderTodoList() {

  let todoArray = '';

  todoHistory.forEach((todo) => {
    let html = 
      `<div class="to-do-actions">
        <button class="check-button"></button>
        <p class="to-do">${todo}</p>
        <img class="delete-button" src="images/delete-gray.png">
      </div>`

    todoArray += html;
  })
  todoList.innerHTML = todoArray;

}

addButton.addEventListener('click', () => {
  const todo = document.querySelector('.js-to-do-input').value;
  todoHistory.push(todo);
  localStorage.setItem('todoList', JSON.stringify(todoHistory));
  renderTodoList();

  console.log(todoHistory);
})

deleteAllButton.addEventListener('click', () => {
  todoList.innerHTML = '';
  todoHistory = [];
  localStorage.removeItem('todoList');

  console.log(todoHistory);
})

renderTodoList();


