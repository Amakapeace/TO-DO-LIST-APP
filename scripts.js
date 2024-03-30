var tasks = [];

function addTask() {
  var taskInput = document.getElementById('task');
  var taskText = taskInput.value.trim();

  if (taskText !== '') {
    var taskList = document.getElementById('taskList');
    var taskItem = document.createElement('li');
    taskItem.innerHTML = `
          <input type="checkbox">
          <span class="task-text">${taskText}</span>
          <button onclick="removeTask(this)">Remove</button>
        `;
    taskList.appendChild(taskItem);
    taskInput.value = '';

    tasks.push(taskText);
  }
}

function removeTask(button) {
  var taskItem = button.parentNode;
  var taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);

  var taskText = taskItem.querySelector('.task-text').textContent;
  var index = tasks.indexOf(taskText);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

function saveTasks() {
  var savedTasksSelect = document.getElementById('savedTasksSelect');
  var listName = prompt('Enter a name for the task list:');

  if (listName !== null && listName.trim() !== '') {
    var option = document.createElement('option');
    option.textContent = listName;
    option.value = JSON.stringify(tasks);
    savedTasksSelect.appendChild(option);

    tasks = [];
    clearTaskList();
  }
}

function loadTasks() {
  var savedTasksSelect = document.getElementById('savedTasksSelect');
  var selectedOption = savedTasksSelect.options[savedTasksSelect.selectedIndex];

  if (selectedOption !== null && selectedOption.value !== '') {
    var selectedTasks = JSON.parse(selectedOption.value);
    tasks = selectedTasks;
    clearTaskList();

    var taskList = document.getElementById('taskList');
    selectedTasks.forEach(function (taskText) {
      var taskItem = document.createElement('li');
      taskItem.innerHTML = `
            <input type="checkbox">
            <span class="task-text">${taskText}</span>
            <button onclick="removeTask(this)">Remove</button>
          `;
      taskList.appendChild(taskItem);
    });
  }
}

function clearTaskList() {
  var taskList = document.getElementById('taskList');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}