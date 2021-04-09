import api from './api';
const baseUrl = 'http://localhost:8080/api/todos';

/**
 *
 * @param data
 * @return {Promise<T>}
 */
const createTodo = data => {
    return api('post', baseUrl, data)
        .then(handleResponse)
        .catch(error => {
            throw handleError(error, `creating todo`);
        });
}

/**
 * Fetch list of all list items and pass any potential
 * filter query params, currently only `isCompleted`
 *
 * @param isCompleted
 * @return {Promise<T>}
 */
const getTodoList = (isCompleted = false) => {
    return api('get', `${baseUrl}?completed=${isCompleted}`)
        .then(handleResponse)
        .catch(error => {
            throw handleError(error, `getting todo list.`);
        });
}

const getTodoItem = id => {
    return api('get', `${baseUrl}/${id}`)
        .then(handleResponse)
        .catch(error => {
            throw handleError(error, `getting todo item.`);
        });
}

/**
 * Update a todo item.
 *
 * @param  {number} id - pk of the item to update
 * @param  {Object} data - fields to update
 * @returns {Promise<T>}
 */
const updateTodo = (id, data) => {
    return api('put', `${baseUrl}/${id}`, data)
        .then(handleResponse)
        .catch(error => {
            throw handleError(error, `updating todo item.`);
        });
}

/**
 * Delete a todo item.
 *
 * @param  {number} id
 * @returns {Promise<T>}
 */
const deleteTodo = id => {
    return api('delete', `${baseUrl}/${id}`)
        .then(handleResponse)
        .catch(error => {
            throw handleError(error, `deleting todo item.`);
        });
}

/**
 * Custom handler for user responses; Allows
 * the user service to check for special status codes
 * that are only relevant to this service and then react
 * accordingly
 *
 * @param {Object} response
 * @returns {Object} response
 */
function handleResponse(response) {
    // check for specific errors that should force a logout
    if (response.data) {
        return response.data;
    }
}

/**
 * Custom error handler allows regular or ADAL error handling.
 *
 * @param {Object} error
 * @param {Object} message
 * @returns {string}
 */
function handleError(error, message) {
    // check for specific errors that should force a logout
    if (error.message) {
        return `${error.message} ${message}`;
    } else {
        return `${error.toString()} ${message}`;
    }
}


// export as one item since we can't wrap services in classes without instantiating them somewhere first
export const TodosService = {
    createTodo,
    getTodoList,
    getTodoItem,
    updateTodo,
    deleteTodo
};
