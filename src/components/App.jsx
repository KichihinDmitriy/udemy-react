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
        this.createTodoItem('Learn HTML/CSS'),
        this.createTodoItem('Learn JavaScript'),
        this.createTodoItem('Learn some of Node.js'),
        this.createTodoItem('Learn match of React.js')
      ],
      term: '',
      filter: 'all',
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

    onFilterChange = (filter) => {
      this.setState({ filter });
    };

    onSearchChange = (term) => {
      this.setState({ term });
    };

    search(items, term) {
      if (term.length === 0) {
        return items;
      };

      return items.filter( (item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      })
    };

    filter(items, filter) {

      if (filter === 'all') {
        return items;
      } else if (filter === 'active') {
        return items.filter((item) => !item.done);
      } else if (filter === 'done') {
        return items.filter((item) => item.done);
      }

    };

    render() {
      const { todoData, term, filter } = this.state;
      const visibleItems = this.filter(this.search(todoData, term), filter);
      const doneCount = todoData.filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;

      return (
        <div className="todo-app">
  
          <AppHeader toDo={todoCount} done={doneCount} />
  
          <div className="top-panel d-flex">
              <SearchPanel onSearchChange={this.onSearchChange} />
              <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
          </div>

          <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />

          <ItemAddForm onItemAdded={this.addItem} />
  
        </div>
      )
    }
}