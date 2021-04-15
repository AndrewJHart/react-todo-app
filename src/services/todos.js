import api from './api';
const baseUrl = 'https://diversy-api.herokuapp.com/api/todos';

/**
 *
 * @param data
 * @return {Promise}
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
 * filter query params, currently only `completed`,
 * and `priority`
 *
 * @param {Object?} options
 * @return {Promise}
 */
const getTodoList = (options) => {
    // build query params
    const completed = options?.completed
        ? `completed=${options.completed}`
        : '';
    const rank = options?.rank
        ? `rank=${options.rank}`
        : '';
    const separator = completed && rank
        ? '&'
        : '';

    return api('get', `${baseUrl}?${completed}${separator}${rank}`)
        .then(handleResponse)
        .catch(error => {
            throw handleError(error, `getting todo list.`);
        });
}

/**
 *
 * @param id
 * @return {Promise}
 */
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
 * @returns {Promise}
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
 * @returns {Promise}
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
