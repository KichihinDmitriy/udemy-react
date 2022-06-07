import React from 'react';

import TodoListItem from './TodoListItem';
import './TodoList.css'

const TodoList = ({todos}) => {
    const elements = todos.map((todo) => {
        return (
            <li key={todo.id} className="list-group-item">
                <TodoListItem label={todo.label} important={todo.important} />
            </li>
        )
    })

    return (
      <ul className="list-group todo-list">
          {elements}
      </ul>
    )
}

export default TodoList;