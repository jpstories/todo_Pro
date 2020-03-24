const task__list = document.querySelectorAll('.task__list-user'),
    task__listSpan = document.querySelectorAll('.task__list-user span'),
    task__wrapper = document.querySelector('.task__wrapper'),
    task__create = document.querySelector('.task__create'),
    taskListWrap = document.querySelector('.task__list'),
    showtask = document.querySelectorAll('.showtask'),
    userTasks = document.querySelectorAll('.task__wrapper-list' > 'div'),
    inputStatus = document.querySelector('.input__status'),
    inputTask = document.querySelector('.input__task'),
    usernameList = document.querySelector('.username'),
    usermailList = document.querySelector('.email');

let taskSum = 0;

const taskNumber = () => {
    for (let i = 0; i < task__list.length; i++) {
        taskSum++;
    };
}

const taskCreate = () => {
    task__create.addEventListener('click', () => {
        taskSum += 1;
        task__create.remove();
        let div = document.createElement('div');
        div.classList.add('task__list-user');
        div.innerHTML = `
            <h3 class="task__name">Задача ${taskSum}</h3> 
        `;

        // input spans
        let quest = document.createElement('span');
        let status = document.createElement('span');
        quest.classList.add('quest');
        status.classList.add('status');

        div.append(quest);
        div.append(status);

        // inputs
        let inputTask = document.createElement('textarea');
        let inputStatus = document.createElement('input');
        let inputColor = document.createElement('input');

        let inputBackground = document.createElement('div');
        let inputBgTitle = document.createElement('p');
        inputBgTitle.textContent = 'Цвет: '
        inputBackground.classList.add('input__background');

        inputTask.classList.add('input__task');
        inputTask.classList.add('editInput');

        inputStatus.classList.add('input__status');
        inputStatus.classList.add('editInput');

        inputTask.setAttribute('placeholder', 'Описание задачи');
        inputTask.setAttribute('type', 'text');

        inputTask.addEventListener('focus', () => inputTask.setAttribute('placeholder', ''));
        inputStatus.addEventListener('focus', () => inputStatus.setAttribute('placeholder', ''));

        inputStatus.setAttribute('placeholder', 'Статус');
        inputStatus.setAttribute('type', 'text');

        inputColor.style.width = '75%';
        inputBackground.style.padding = '10px';
        inputColor.setAttribute('type', 'range');
        let inp__min = inputColor.min = 909090;
        let inp__max = inputColor.max = 999999;


        inputColor.addEventListener('input', () => {
            status.style.backgroundColor = '#' + inputColor.value;
            
        });

        quest.append(inputTask);
        status.append(inputStatus);
        inputBackground.append(inputBgTitle);
        inputBackground.append(inputColor);
        status.append( inputBackground);
        // Button "add"
        let spanAdd = document.createElement('span');
        spanAdd.textContent = 'Add';
        spanAdd.classList.add('taskAddBtn');
        div.append(spanAdd);
        // Task Box
        taskListWrap.append(div);
        taskListWrap.append(task__create);

        //Add
        spanAdd.addEventListener('click', () => {
            if(inputColor.value < 300000) {status.style.color = 'white';};
            console.log(inputColor.value);
            quest.textContent = inputTask.value;
            status.textContent = 'Статус: ' + inputStatus.value;
            inputTask.remove();
            inputStatus.remove();
            inputColor.remove();
            spanAdd.remove();
        });
    });
};

const taskSpanEdit = () => {
    task__listSpan.forEach((span) => {
        span.addEventListener('click', () => {
            let newspan = prompt('Введите значение: ');
            if (newspan === null || newspan === '') return;
            span.textContent = newspan;
        });
    });
};

taskNumber();

taskCreate();

taskSpanEdit();


showtask.forEach((item) => {
    item.addEventListener('click', () => {
        let taskCard = document.createElement('div');
        let taskName = item.childNodes[1].textContent;
        let taskMain = item.childNodes[3].textContent;
        let taskStatus = item.childNodes[5].textContent.slice(8);
        console.log(taskStatus);
        taskCard.classList.add('task');
        taskCard.innerHTML = `
            <h1 class="task__title">${taskName}</h1>
            <div class="user">
                <div class="user__name">${usernameList.textContent}</div>
                <div class="user__email">${usermailList.textContent}</div>
            </div>
            <div class="task__text">${taskMain}</div>
            <div class="task__status">${taskStatus}</div>
            `;

        let close = document.createElement('div');
        close.classList.add('task__close');
        close.innerHTML = '&#10006';
        taskCard.append(close);

        close.addEventListener('click', ()=>{taskCard.remove()});
        task__wrapper.append(taskCard);
    });
});