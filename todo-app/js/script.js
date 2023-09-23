const themeToggleBtn = document.getElementById('themeToggleBtn')
const todoInput = document.getElementById('todo-input')
const todoContainer = document.querySelector('.todo-container')
const filters = document.querySelector('.filters')
const itemsLeftEl = document.getElementById('items-left')
const todosEl = document.querySelector('.todos');
const completedArr = []

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('darkMode') === 'true'){
        document.body.classList.add('dark')
    }
    const todoData = JSON.parse(localStorage.getItem('todoData')) || []

    todoData.forEach(todo => {
        createTodo(todo.text, todo.completed)
    })

    const allLists = document.querySelectorAll('.todos li')
    updateItemsLeft(allLists)
    const activeFilter = filters.querySelector('active')
    if(activeFilter) filter(Array.from(allLists), activeFilter)
})

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    document.querySelectorAll('main header svg').forEach(svg => {
        svg.classList.toggle('hidden')
    })
    // sets darkmode to true if body has class name dark
    localStorage.setItem('darkMode', document.body.classList.contains('dark'))
})

todoInput.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.querySelector('input').value
    if(inputValue.trim()){
        createTodo(inputValue)
    }
    todoInput.querySelector('input').value = ''

    updateItemsLeft(document.querySelectorAll('.todos > li'))
    updateLocalStorage()
})

todoContainer.addEventListener('click', (e) => {
    const element = e.target
    if(element.classList.contains('removeBtn')){
        element.parentElement.classList.add('fade-out')
        setTimeout(()=>{
            element.parentElement.remove()
            updateItemsLeft(document.querySelectorAll('.todos > li'))
            completedArr.splice(completedArr.indexOf(element), 1)
            updateLocalStorage()
        }, 500)
    } else if(element.tagName === 'LI'){
        checkAsComplete(element)
    } else if(element.tagName === 'P' || element.classList.contains('circle')){
        checkAsComplete(element.parentElement)
    }
})

filters.addEventListener('click', (e) => {
    const allLists = document.querySelectorAll('.todos li')
    switch (e.target.id){
        case 'filter-completed' : filter(completedArr, e.target)
            break;
        case 'filter-all' : filter(Array.from(allLists), e.target)
            break;
        case 'filter-active' : 
            const array = Array.from(allLists)
            const filtered = array.filter(item => !completedArr.includes(item))
            filter(filtered, e.target);
            break;
        case 'filter-clear' : 
            completedArr.length = 0
            allLists.forEach(list => {
                if(list.classList.contains('completed')){
                    list.classList.add('fade-out')
                    setTimeout(()=>{
                        list.remove()
                    }, 500)
                }
            })
            updateItemsLeft(allLists)
            updateLocalStorage()
            break;
    }
})


// functions
function createTodo(text, completed){
    const todosEl = document.querySelector('.todos')
    const li = document.createElement('li')
    li.setAttribute('draggable', true)
    if(completed){
        li.classList.add('completed')
    }
    li.innerHTML = `
        <div class="circle"></div>
        <p>${text}</p>
        <svg class="removeBtn" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    `
    todosEl.insertBefore(li, document.querySelector('.filters'))
}

function checkAsComplete(element){
    if(element.classList.contains('completed')){
        element.classList.remove('completed')
        completedArr.splice(completedArr.indexOf(element), 1)
    } else {
        element.classList.add('completed')
        completedArr.push(element)
    }
    updateLocalStorage()
}

function filter(array, element){
    const lis = Array.from(document.querySelectorAll('.todos li'));

    lis.forEach(li => {
        li.style.display = 'none';
    });

    array.forEach(completedItem => {
        completedItem.style.display = 'flex';
    });

    // add 'active' class
    document.querySelectorAll('.filters > div > span').forEach(span => {
        span.classList.remove('active')
    })
    element.classList.add('active')

    updateItemsLeft(array)
    updateLocalStorage()
}

function updateItemsLeft(itemsLeft){
    itemsLeftEl.textContent = `${itemsLeft.length} items`
}

function updateLocalStorage(){
    const todoData = Array.from(document.querySelectorAll('.todos li')).map(item => {
        return {
            text: item.querySelector('p').textContent,
            completed: item.classList.contains('completed')
        }
    })
    localStorage.setItem('todoData', JSON.stringify(todoData))
}

// todo
// filters ✓
// localStorage ✓
// drag drop
// testing