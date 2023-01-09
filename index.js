const input = document.querySelector (".input")
const form = document.querySelector (".form")
const tasksList = document.querySelector (".tasksList")
const deleteBtn = document.querySelector (".deleteAllBtn")

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveToLocalStorage = taskList => {
  localStorage.setItem('tasks', JSON.stringify(taskList))
};

const createTask = task => 
`<li class="task">
  ${task.name} 
  <img src="./assets/delete.png" class="deleteBtnImg" data-id=${task.taskId} alt="Borrar tarea">
 </li>`

const renderTasksList = todoList => {
  tasksList.innerHTML = todoList.map(task => createTask(task)).join('');
}

const hideDeleteAll = taskList => {
  if(!taskList.length){
    deleteBtn.classList.add('hidden');
    return
  }
  deleteBtn.classList.remove('hidden');
}

const addTask = e => {
  e.preventDefault();
  const taskName = input.value.trim();
  if(!taskName.length){
    alert('Escribe una tarea a agregar')
    return;
  } else if(tasks.some(task => task.name.toLowerCase() === taskName.toLowerCase())){
    alert('Ya existe esta tarea')
    return;
  }
  tasks = [...tasks, {name: taskName, taskId: tasks.length + 1}]
  input.value = '';
  renderTasksList(tasks);
  saveToLocalStorage(tasks);
  hideDeleteAll(tasks);
};

const removeAll = () => {
  tasks = [];
  renderTasksList(tasks);
  saveToLocalStorage(tasks);
  hideDeleteAll(tasks);
};

const removeTask = e => {
  if(!e.target.classList.contains('deleteBtnImg')) return;

  const filterId = Number(e.target.dataset.id);
  tasks = tasks.filter(task => task.taskId !==filterId)
  renderTasksList(tasks);
  saveToLocalStorage(tasks);
  hideDeleteAll(tasks);
};


const init = () => {
  renderTasksList(tasks)
  form.addEventListener('submit', addTask)
  tasksList.addEventListener("click",removeTask)
  deleteBtn.addEventListener("click", removeAll);
};

init();