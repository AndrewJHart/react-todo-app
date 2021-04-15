import React from 'react';
import PropTypes from 'prop-types';
import css from './todo-item.module.css';

const TodoItem = (props) => {
    const [title, updateTitle] = React.useState(props.todo.title || '');
    const [rank, setRank] = React.useState(props.todo.rank);

    const handleSubmit = e => {
        e.preventDefault();

        if (props.todo.title !== title) {
            props.handleUpdate(props.todo.id, { ...props.todo, title });  // This may need to be memoized or monitored due to concurrency
        }
    };

    const handleChange = e =>
        updateTitle(e.target.value)  // this will def need debounced


    const handlePriorityClick = e => {
        e.preventDefault();

        switch (rank) {
            case 'low':
                setRank('mid');
                break;
            case 'mid':
                setRank('high');
                break;
            case 'high':
                setRank('low');
                break;
        }

        props.handleRankChange(props.todo.id, { ...props.todo, rank });
    }

    return (
        <section className={'todo-item'} style={{ visibility: props.isVisible ? 'visible' : 'hidden' }}>
            <div onClick={() => props.handleComplete(props.todo.id)}>
                {props.todo.completed
                    ? <span className='todo-item-checked'>✔</span>
                    : <span className='todo-item-unchecked' />
                }
            </div>

            <form className='todo-item-input-container' onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={handleChange}
                    onBlur={handleSubmit}
                />
            </form>

            <a
                className={`${css.priority} ${css[props.todo.rank]}`}
                onClick={handlePriorityClick}
            >
                {props.todo.rank}
            </a>

            <div className='item-remove' onClick={() => props.handleRemove(props.todo.id)}>
                x
            </div>
        </section>
    )
};

TodoItem.propTypes = {
    todo: PropTypes.object,
    isCompleted: PropTypes.bool,
    isVisible: PropTypes.bool,
    handleComplete: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleRankChange: PropTypes.func.isRequired
}

TodoItem.defaultProps = {
    isVisible: true
}

export default TodoItem;
