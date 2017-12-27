'use strict';

//Define UI Variables
var form = document.querySelector('#task-form'),
    taskList = document.querySelector('.collection'),
    clearBtn = document.querySelector('.clear-tasks'),
    filter = document.querySelector('#filter'),
    taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

//Load all event listeners function
function loadEventListeners() {
  //DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task event
  form.addEventListener('submit', addTask);
  //remove task event 
  taskList.addEventListener('click', removeTask);
  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from local Storage
function getTasks() {
  var tasks = void 0;
  //Checks to see if anything is in local storage
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // local storage can only store strings
  }
  tasks.forEach(function (task) {
    //Create li element
    var li = document.createElement('li');
    // Add class (Materialize specific collection-item class)
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    var link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Appends the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

//Add Task to DOM & Local Storage
function addTask(e) {
  //Checks empty submissions and spacebar submissions
  if (taskInput.value === '' || taskInput.value.match(/\S/) === null) {
    // Materialize.toast(message, displayLength, className, completeCallback);
    Materialize.toast('Please, add a task.', 4000);
    e.preventDefault();
  } else {
    //Create li element
    var li = document.createElement('li');
    // Add class (Materialize specific collection-item class)
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    var link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Appends the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Stores in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    // Clear inputs
    taskInput.value = '';
    // Prevents default form submit behavior
    e.preventDefault();
  }
}

//Store Task in local storage function
function storeTaskInLocalStorage(task) {
  var tasks = void 0;
  //Checks to see if anything is in local storage
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); // local storage can only store strings
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task function
function removeTask(e) {
  // Specifically targets the delete icon and then removes entire li
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure that you want to delete this task?')) {
      e.target.parentElement.parentElement.removeChild();

      // Removes from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// Remove task from local storage function
function removeTaskFromLocalStorage(taskItem) {
  var tasks = void 0;
  //Checks to see if anything is in local storage
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    //check to see if text content matches ls
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks function
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from local storage
  clearTasksFromLocalStorage();
}

// Clear all tasks from local storage function
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks function
function filterTasks(e) {
  var text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    var item = task.firstChild.textContent;
    // Checks for lower case letters that matches any letter of inputted text that exists
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
