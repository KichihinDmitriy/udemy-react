import React, {Component} from 'react';

import AppHeader from './AppHeader';
import SearchPanel from './SearchPanel';
import TodoList from './TodoList';
import ItemStatusFilter from './ItemStatusFilter';
import ItemAddForm from './ItemAddForm'

import './App.css';

export default class App extends Component {

    state = {
      todoData: [
        {label: 'Drink', important: false, id: 1},
        {label: 'Drink coffe', important: true, id: 2},
        {label: 'Drink coffe whith milk', important: false, id: 3},
        {label: 'Drink coffe whith milk sugar', important: false, id: 4}
      ]
    }

    deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const before = todoData.slice(0, idx);
        const after = todoData.slice(idx + 1);
        const newArray = [...before, ...after];

        return {
          todoData: newArray
        }
      })
    }

    addItem = (text) => {
      const generateId = Math.floor(Math.random() * 100);

      const newItem = {
        label: text,
        important: false,
        id: generateId
      }

      this.setState(({todoData}) => {
        const newArray = [...todoData, newItem ];

        return {
          todoData: newArray
        }
      })
    }

    render() {
      return (
        <div className="todo-app">
  
          <AppHeader toDo={1} done={3} />
  
          <div className="top-panel d-flex">
              <SearchPanel />
              <ItemStatusFilter />
          </div>
  
          <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />

          <ItemAddForm onItemAdded={this.addItem} />
  
        </div>
      )
    }
}