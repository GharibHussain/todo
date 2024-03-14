import { Task } from "./Task.js"

class Todos {
    #tasks = []
    #backend_url

    constructor(backend_url) {
        this.#backend_url = backend_url
    }


    getTasks = async () => {
        return new Promise(async (resolve, reject) => {
            // http get
            fetch(this.#backend_url).then((response) => response.json())
            .then((json) => {
                this.#readJson(json)
                resolve(this.#tasks)    // return the #tasks
            }, (error) => {
                reject(error)   // return the error
            })
        })
    }

    // add the retieved tasks to the #tasks array
    #readJson(tasksAsJson) {
        tasksAsJson.forEach(element => {
            const task = new Task(element.id, element.description)
            this.#tasks.push(task)
        });
    }

    #addToArray(id, text) {
        const task = new Task(id, text)
        this.#tasks.push(task)
        return task
    }

    saveTask = async (text) => {
        return new Promise((resolve, reject) => {
            const json = JSON.stringify({description: text})
            
            // http post
            fetch(this.#backend_url + '/new', {
                method: "post",
                headers: {
                'Content-type' : "application/json"
                },
                body: json
            })
            .then((response) => response.json())
            .then((json) => {
                resolve(this.#addToArray(json.id, text))
            }, (error) => {
                reject(error)
            })
        }
        )
    }
}

export { Todos }