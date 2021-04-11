import React from 'react';
import PropTypes from 'prop-types';
import css from './todo-form.module.css';

export const TodoForm = (props) => {
    const [text, setText] = React.useState('')

    function handleChange(event) {
        setText(event.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log('handleSubmit in form triggered', text);

        // if text are present invoke callback, pass data
        // and then clear the form state for next item
        if (text.trim() !== '') {
            props.addTodo(text)

            setText('');
        }
    };

    return (
        <form className={'todo-form'} onSubmit={handleSubmit}>
            <input
                value={text}
                type='text'
                className={'input'}
                placeholder='Enter a todo'
                onChange={handleChange}
            />
        </form>
    );
}

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default TodoForm;
