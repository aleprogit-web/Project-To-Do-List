import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

//ELEMENTOS DO HTML
const todoList = document.querySelector('.to-do-list');
const addButton = document.querySelector('.js-add-button');

const textInput = document.querySelector('.js-to-do-input');

const dateInput = document.querySelector('.js-date-input');
const previousButton = document.querySelector('.js-previous-day');
const nextButton = document.querySelector('.js-next-day');

const pendingFilter = document.querySelectorAll('.js-pending-filter');
const checkedFilter = document.querySelectorAll('.js-checked-filter');
const allFilter = document.querySelectorAll('.js-all-filter');
const favoriteFilter = document.querySelector('.js-favorite-filter');
const dayFilter = document.querySelector('.day-filter');

//DADOS
let todoHistory = JSON.parse(localStorage.getItem('todoList')) || [];
const today = dayjs().format('YYYY-MM-DD');
let summaryDate = today;

//FUNÇÕES DE RENDERIZAÇÃO

function getSummaryTasks() {
  return todoHistory.filter((todo) => todo.data === summaryDate);
}

function updateTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoHistory));

  renderTodoList(getSummaryTasks());

  updateTaskNumber();

  updateDailySummary();
}

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

    let dayFormat;

    if (todo.data){
      dayFormat = dayjs(todo.data).format('DD/MM/YYYY');
    }else{
      dayFormat = "Sem data";
    }

    let html = 
      `<div class="to-do-actions ${taskClass}" 
        data-id="${todo.id}">
        <button class="check-button js-check-button"></button>
        <p class="to-do">${todo.texto}</p>
        <div class="task-actions">
          <p class="task-date">${dayFormat}</p>
          <img class="favorite-star js-star-button" src="${favoriteIcon}">
          <img class="delete-button js-delete-button" src="images/delete-gray.png">
        </div>
      </div>`

    todoArray += html;
  })
  todoList.innerHTML = todoArray;

}

function getTodoIndex(element) {
  const closestDiv = element.closest('.to-do-actions');
  const matchingId = closestDiv.dataset.id;
  const indice = todoHistory.findIndex((todo) => todo.id === matchingId);

  return indice;
}

// EVENTOS DAS TAREFAS
todoList.addEventListener('click', (event) => {

  if (event.target.classList.contains('js-delete-button')) {

    const indice = getTodoIndex(event.target);

    todoHistory.splice(indice, 1);
    updateTodoList();

  }

  if (event.target.classList.contains('js-check-button')) {
    
    const indice = getTodoIndex(event.target);

    todoHistory[indice].concluida =  !todoHistory[indice].concluida;
    updateTodoList();

  } 

  if (event.target.classList.contains('js-star-button')) {
    
    const indice = getTodoIndex(event.target);

    todoHistory[indice].favorita =  !todoHistory[indice].favorita;
    updateTodoList();

  }

});

//ADICIONAR TAREFA
addButton.addEventListener('click', () => {

  const idNum = crypto.randomUUID();
  const todo = document.querySelector('.js-to-do-input').value;
  const date = dateInput.value;
  if (todo === ""){
    textInput.placeholder = "Nenhuma tarefa foi digitada."
  }else{
   
    todoHistory.push({
      texto: todo,
      id: idNum,
      concluida: false,
      favorita: false,
      data: date
    });

    textInput.value = "";
    dateInput.value = "";
    textInput.placeholder = "O que você precisa fazer?";
    updateTodoList();

  }

  console.log(todoHistory);
  
})

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addButton.click();
  }
});

//FILTROS
pendingFilter.forEach((button) => {
  button.addEventListener('click', () => {
    const pendingTodos = getSummaryTasks().filter((todo) => !todo.concluida);
    renderTodoList(pendingTodos);
  })

})

checkedFilter.forEach((button) => {
  button.addEventListener('click', () => {
    const checkedTodos = getSummaryTasks().filter((todo) => todo.concluida);
    renderTodoList(checkedTodos);
  })

})

allFilter.forEach((button) => {
  button.addEventListener('click', () => {
    renderTodoList();
  });
});

favoriteFilter.addEventListener('click', () => {
  const favoriteTodos = todoHistory.filter((todo) => todo.favorita);
  renderTodoList(favoriteTodos);
})

dayFilter.addEventListener('click', () => {
  renderTodoList(getSummaryTasks());
});

//RESUMO DO DIA
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

function updateDailySummary() {
  const summaryTodos = todoHistory.filter((todo) => todo.data === summaryDate);
  const summaryTasks = document.querySelector('.js-summary-total');
  const summaryChecked = document.querySelector('.js-summary-checked');
  const summaryPending = document.querySelector('.js-summary-pending');

  summaryTasks.innerHTML = summaryTodos.length;
  summaryChecked.innerHTML = summaryTodos.filter((todo) => todo.concluida).length;
  summaryPending.innerHTML = summaryTodos.filter((todo) => !todo.concluida).length;
}

function updateSummaryDate() {
  const summaryDateElement = document.querySelector('.js-summary-date');
  
  summaryDateElement.innerHTML = dayjs(summaryDate).format('DD/MM/YYYY');
}


// NAVEGAÇÃO DO RESUMO
previousButton.addEventListener('click', () => {
  summaryDate = dayjs(summaryDate).subtract(1, 'day').format('YYYY-MM-DD');

  updateSummaryDate();
  updateDailySummary();
  renderTodoList(getSummaryTasks());
})

nextButton.addEventListener('click', () => {
  summaryDate = dayjs(summaryDate).add(1, 'day').format('YYYY-MM-DD');

  updateSummaryDate();
  updateDailySummary();
  renderTodoList(getSummaryTasks());
})

//INICIALIZAÇÃO
renderTodoList(getSummaryTasks());
updateDailySummary();
updateTaskNumber();
updateSummaryDate();






