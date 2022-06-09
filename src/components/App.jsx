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
        this.createTodoItem('Drink'),
        this.createTodoItem('Drink coffe'),
        this.createTodoItem('Drink coffe whith milk'),
        this.createTodoItem('Drink coffe whith milk sugar')
      ]
    }

    createTodoItem(label) {
      const generateId = Math.floor(Math.random() * 100);

      return {
        label,
        important: false,
        done: false,
        id: generateId
      }
    }

    deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

        return {
          todoData: newArray
        }
      })
    }

    addItem = (text) => {
      const newItem = this.createTodoItem(text);

      this.setState(({todoData}) => {
        const newArray = [...todoData, newItem];

        return {
          todoData: newArray
        }
      })
    }

    toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);
  
      const oldItem = arr[idx];
      const newItem = {...oldItem,
        [propName]: !oldItem[propName]};
  
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
    }
  
    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };
  
    onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      });
    };

    render() {
      const doneCount = this.state.todoData.filter((el) => el.done).length;
      const todoCount = this.state.todoData.length - doneCount;

      return (
        <div className="todo-app">
  
          <AppHeader toDo={todoCount} done={doneCount} />
  
          <div className="top-panel d-flex">
              <SearchPanel />
              <ItemStatusFilter />
          </div>
  
          <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant} onToggleDone={this.onToggleDone} />

          <ItemAddForm onItemAdded={this.addItem} />
  
        </div>
      )
    }
}