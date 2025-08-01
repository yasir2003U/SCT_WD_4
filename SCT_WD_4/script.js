const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
  const task = taskInput.value.trim();
  const date = dateInput.value;
  if (!task) {
    taskInput.classList.add('shake');
    setTimeout(() => taskInput.classList.remove('shake'), 400);
    return;
  }
  const li = document.createElement('li');
  li.className = 'task-item';

  const infoDiv = document.createElement('div');
  infoDiv.className = 'task-info';

  const textSpan = document.createElement('span');
  textSpan.className = 'task-text';
  textSpan.textContent = task;

  infoDiv.appendChild(textSpan);

  if (date) {
    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.innerHTML = `<i class="fa-regular fa-clock"></i> ${formatDate(date)}`;
    infoDiv.appendChild(dateSpan);
  }

  li.appendChild(infoDiv);

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'task-actions';

  const doneBtn = document.createElement('button');
  doneBtn.className = 'action-btn done';
  doneBtn.title = 'Mark as done';
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  doneBtn.onclick = () => {
    li.classList.toggle('completed');
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action-btn delete';
  deleteBtn.title = 'Delete task';
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.onclick = () => {
    li.style.animation = "fadeOut 0.4s";
    setTimeout(() => li.remove(), 350);
  };

  actionsDiv.appendChild(doneBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(actionsDiv);

  taskList.appendChild(li);

  taskInput.value = '';
  dateInput.value = '';
}

addBtn.onclick = addTask;
taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
dateInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return d.toLocaleString(undefined, options);
}

// Optional: Add fadeOut animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0);}
  to { opacity: 0; transform: translateY(30px);}
}
.shake {
  animation: shake 0.4s;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px);}
  20%, 80% { transform: translateX(4px);}
  30%, 50%, 70% { transform: translateX(-8px);}
  40%, 60% { transform: translateX(8px);}
}
`;
document.head.appendChild(style);
