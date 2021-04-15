import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../../components/todo-item/todo-item';
import TodoForm from '../../components/todo-form/todo-form';
import MultiToggle from 'react-multi-toggle';
import { TodosService } from '../../services/todos';
import css from './home.module.css';

/**
 * Home Page component for displaying user's todolist data
 * and importing relevant filters, toggles, etc..
 *
 * @param {Object} props
 * @return {JSX.Element}
 * @constructor
 */
export const HomePage = (props) => {
    const priorityOpts = React.useMemo(() =>
        [
            {
                displayName: 'All',
                value: ''
            },
            {
                displayName: 'High',
                value: 'high'
            },
            {
                displayName: 'Mid',
                value: 'mid'
            },
            {
                displayName: 'Low',
                value: 'low'
            }
        ]
    );
    const completeOpts = React.useMemo(() =>
        [
            {
                displayName: 'All',
                value: ''
            },
            {
                displayName: '✔',
                value: 'true'
            },
            {
                displayName: '-',
                value: 'false'
            },
        ]
    );
    const [todos, setTodos] = React.useState([])
    const [completed, setCompleted] = React.useState('');
    const [priority, setPriority] = React.useState('')

    /**
     * trigger fetch of initial data set
     */
    React.useEffect(() => {
        fetchTodoList({ rank: priority, completed });
    }, [priority, completed]);

    /**
     * Calls Todos Service to fetch all of the current user's
     * todoItems on load
     *
     * @query {Object} - options for query params to filter api
     * @return {undefined}
     */
    const fetchTodoList = async (query) => {
        // fetch initial data set
        const data = await TodosService.getTodoList(query);

        setTodos(data);
    }

    /**
     * callback for adding new todoItem to the api & state
     *
     * @param {string} title
     */
    const handleAdd = title => {
        TodosService
            .createTodo({ title })
            .then(newTodo => {
                setTodos([...todos, newTodo]);
            });
    }

    /**
     * callback for removing an item from the api
     *
     * @param {number} id
     * @return {Promise<void>}
     */
    const handleRemove = async id => {
        await TodosService.deleteTodo(id);

        const remaining = todos.filter(todo => todo.id !== id);

        setTodos(remaining);
    }

    /**
     * callback for updating the title of the item
     *
     * @param {number} id
     * @param {object} data
     */
    const handleUpdate = (id, data) => {
        TodosService
            .updateTodo(id, data)
            .then(newTodo => {
                const updatedTodos = todos.map(todo =>
                    todo.id === newTodo.id
                        ? newTodo
                        : todo
                );

                setTodos(updatedTodos);
            });
    }

    /**
     * cb for handling checking items completed or not
     *
     * @param {number} id
     */
    const handleCompleted = id => {
        // filter array to find item, destructure to get object
        const [item] = todos.filter(todo => todo.id === id);

        TodosService
            .updateTodo(id, { ...item, completed: !item.completed })
            .then(newTodo => {
                const updatedTodos = todos.map(todo =>
                    todo.id === newTodo.id
                        ? newTodo
                        : todo
                );

                setTodos(updatedTodos);
            });
    }

    const handleRankChange = (id, todo) => {
        handleUpdate(todo.id, todo);
    }

    console.log('rendered');

    return (
        <section className={`todo-list-app ${css.home}`}>
            <h1>My Todo App</h1>

            {/* Render filters */}
            <section className="filters">
                <div style={{ float: 'left', width: '40%' }}>
                    <MultiToggle
                        options={priorityOpts}
                        selectedOption={priority}
                        onSelectOption={(value) => setPriority(value)}
                        label={'Filter Priority'}
                    />
                </div>

                <div style={{ float: 'right', width: '30%' }}>
                    <MultiToggle
                        options={completeOpts}
                        selectedOption={completed}
                        onSelectOption={(value) => setCompleted(value)}
                        label={'Filter Completed'}
                    />
                </div>
            </section>

            {/* Render input form, pass callback prop for adding */}
            <TodoForm addTodo={handleAdd} />

            <div className={'todo-list'}>
                <ul>
                    {   // iterate array of todoItems, pass data & callbacks
                        todos.map(todo => {
                            return (
                                <li key={todo.id}>
                                    <TodoItem
                                        todo={todo}
                                        handleComplete={handleCompleted}
                                        handleUpdate={handleUpdate}
                                        handleRemove={handleRemove}
                                        handleRankChange={handleRankChange}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    );
}

HomePage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.any,
};

export default HomePage;
