const BACKEND_ROOT_URL = 'http://localhost:3001'

const list = document.querySelector('ul')
const input = document.querySelector('input')

const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML = task
    list.append(li)
}

// http get
const getTasks = async () => {
    try {
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json() // a json array of tasks
        
        json.forEach(task => {
            renderTask(task.description)
        });
        
        input.disabled = false
    } catch (error) {
        alert('Error retrieving tasks ' + error.message)
    }
}

// http post 
const saveTask = async (task) => {
    try {
        const json = JSON.stringify({description: task})    // json data to be sent to server

        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: "post",
            headers: {
            'Content-type' : "application/json"
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert('Error saving task: ' + error.message)
    } 
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== ''){
            saveTask(task).then((json) => { // the return value of saveTask (the json data of the response)
                renderTask(task)
                input.value = ''
            })  
        }
    }
})

getTasks()