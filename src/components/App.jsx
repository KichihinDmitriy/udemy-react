import React from 'react';

import AppHeader from './AppHeader';
import SearchPanel from './SearchPanel';
import TodoList from './TodoList';
import ItemStatusFilter from './ItemStatusFilter';

import './App.css';

const App = () => {
    const todoData = [
        {label: 'Drink', important: false, id: 1},
        {label: 'Drink coffe', important: true, id: 2},
        {label: 'Drink coffe whith milk', important: false, id: 3},
        {label: 'Drink coffe whith milk sugar', important: false, id: 4}
    ]

    return (
      <div className="todo-app">

        <AppHeader toDo={1} done={3} />

        <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
        </div>

        <TodoList todos={todoData} />

      </div>
    )
}

export default App;