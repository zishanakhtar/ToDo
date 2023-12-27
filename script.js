function removeTaskContainer() {
  if (localStorage.length == 0) {
    todo.style.background = "transparent";
    todo.style.borderColor = "transparent";

  } else {
    todo.style.background = "#edcfb2";
    todo.style.borderColor = "white";
  }

  if (localStorage.length == 0) {
    heading.innerHTML = "No tasks";
  } else {
    heading.innerHTML = "To do";
  }
}

function getTasks() {
  removeTaskContainer()
  for (let i = 0; i < localStorage.length; i++) {
    let listElement = document.createElement('li');
    let task = localStorage.getItem(localStorage.key(i));
    console.log("Task:", task);
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "task";
    checkbox.value = task;
    checkbox.id = task;

    let label = document.createElement('label')
    label.htmlFor = task;
    // label.id = newTask;
    // label.contentEditable = "true";
    label.className = "editable-content";
    label.appendChild(document.createTextNode(task));

    listElement.appendChild(checkbox);
    listElement.appendChild(label);
    tasks.appendChild(listElement);
  }
  removeTaskContainer()
}

getTasks()

//Limit characters
const maxLength = () => {
  let maxL = 0;
  if (window.matchMedia('(min-width: 801px)').matches) {
    maxL = 60;
  } else if (window.matchMedia('(max-width: 800px)').matches) {
    maxL = 25;
  }
  return maxL;
}

function printTask() {
  let newTask = document.getElementById("txtTask").value;
  // Add task to list if task is not empty, and not too long and not already exists
  if (newTask != "" && newTask.length <= maxLength() && newTask != localStorage.getItem(newTask)) {
    console.log(newTask)

    let listElement = document.createElement('li');

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "task";
    checkbox.value = newTask;
    checkbox.id = newTask;

    let label = document.createElement('label')
    label.htmlFor = newTask;
    // label.id = newTask;
    // label.contentEditable = "true";
    label.className = "editable-content";
    label.appendChild(document.createTextNode(newTask));

    listElement.appendChild(checkbox);
    listElement.appendChild(label);
    tasks.appendChild(listElement);
    document.getElementById("txtTask").value = "";
    localStorage.setItem(newTask, newTask);
  }
  else if (newTask == "") {
    alert("No task entered");
  }
  else if (newTask == localStorage.getItem(newTask)) {
    alert("Task already exists");
  }
  else {
    alert(`Max length is ${maxLength()} characters`);
  }
  removeTaskContainer()
}

function deleteTask() {
  let task = document.querySelectorAll('[name="task"]:checked');
  if (task.length > 0) {
    let confirmDelete = confirm("Are you sure you want to delete the task?");
    if (confirmDelete) {
      // console.log(task);

      for (t in task) {
        // console.log(t)
        if (parseInt(t) < task.length) {
          // console.log("To delete:", task[t].id);
          task[t].parentNode.remove();
          localStorage.removeItem(task[t].id);
        }
      }
      removeTaskContainer()
    }
  } else {
    alert("Please select a task to delete");
  }
}

function editTask() {
  let task = document.querySelectorAll('[name="task"]:checked');
  let newTask = "";
  let oldTask = "";
  let t = 0;
  console.log("Task length:", task.length);
  if (task.length > 0) {
    // console.log("Task:", task);
    for (t = 0; t < task.length; t++) {
      console.log("T:", t)
      oldTask = task[t].id;
      oldTask = oldTask.trim();
      console.log("Old task:", oldTask);
      if (parseInt(t) < task.length) {
        // console.log(task[t].id);
        newTask = prompt("Edit task", task[t].id);
        newTask = newTask.trim();
        // console.log("New task:", newTask);

        // Check if edited task length doesn't exceed the max length
        if (newTask.length <= maxLength()) {
          // Create new task if new task is not empty or not null
          if (newTask != null && newTask != "") {
            localStorage.setItem(newTask, newTask);
            task[t].id = newTask;
            task[t].innerHTML = newTask;
          }

          // Don't delete old task if new task is same as old task or new task is empty
          if (newTask == oldTask) {
            alert(newTask + " is already in the list");
          } else if (newTask == "") {
            alert("No task entered");
          } else {
            localStorage.removeItem(oldTask);
          }

          removeTaskContainer()
          window.location.reload();

        } else {
          alert(`Max length is ${maxLength()} characters`);
        }
      }
    }
  } else {
    alert("Please select a task to edit")
  }
}

function selectAllTasks() {
  let task = document.querySelectorAll('[name="task"]');
  for (t in task) {
    if (parseInt(t) < task.length) {
      task[t].checked = true;
    }
  }
}

function deselectAllTasks() {
  let task = document.querySelectorAll('[name="task"]');
  for (t in task) {
    if (parseInt(t) < task.length) {
      task[t].checked = false;
    }
  }
}

// Add Task button click event upon pressing Enter key
txtTask.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("btnAdd").click();
  }
});

// Select all task upon pressing ctrl+a
document.addEventListener('keydown', function(event) {
  // Check if the Ctrl key is pressed and the pressed key is 'A'
  if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
    // Prevent the default Ctrl+A behavior (text selection)
    event.preventDefault();

    // Trigger the click event for the button with id='selectAll'
    document.getElementById('selectAll').click();
  }
});


// Delete task button event upon pressing Delete key on keyboard
document.addEventListener('keydown', function(event) {
  if (event.code === "Delete") {
    event.preventDefault();
    document.getElementById('btnDel').click();
  }
});