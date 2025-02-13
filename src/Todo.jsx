import { useEffect, useState } from 'react';
import { Trash2, Edit3, Check, ListTodo } from 'lucide-react';
import './style.css';


export function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const addTodo = () => {
    if (todoInput.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title: todoInput, checked: false }]);
      setTodoInput('');
      showNotification('Tarefa adicionada!');
    }
  };

  const toggleCheck = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showNotification('Tarefa removida!');
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const saveEditing = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title: editingText } : todo));
    setEditingId(null);
    setEditingText('');
    showNotification('Tarefa editada!');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.checked;
    if (filter === 'completed') return todo.checked;
    return true;
  });

  return (
    <div>

        <section className='container'>
        <header>
        <span className='svg' > <ListTodo size={"32px"} color={"#E8476A"}/> </span>
        <h1>TO-DO LIST</h1> 
      </header>
        <div className='up'>
          <input 
            type='text' 
            placeholder='Adicione uma nova tarefa...'
            value={todoInput} 
            onChange={(e) => setTodoInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button className='add' onClick={addTodo}>Adicionar</button>
          
          <div className='filters'>
            <button className='btn' onClick={() => setFilter('all')}>Todas</button>
            <button className='btn' onClick={() => setFilter('pending')}>A Fazer</button>
            <button className='btn' onClick={() => setFilter('completed')}>Concluídas</button>
          </div>
        </div>
        
        <ul className='todo-list'>
          {filteredTodos.map(todo => (
            <li key={todo.id} className={todo.checked ? 'completed' : ''}>
              <input 
                type='checkbox' 
                checked={todo.checked} 
                onChange={() => toggleCheck(todo.id)}
              />
              
              {editingId === todo.id ? (
                <input 
                  type='text' 
                  value={editingText} 
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span>{todo.title}</span>
              )}
              <div className='svg'>
              {editingId === todo.id ? (
                <button onClick={() => saveEditing(todo.id)}>
                  <Check />
                </button>
              ) : (
                <button onClick={() => startEditing(todo.id, todo.title)}>
                  <Edit3 color='#FFB82E'/>
                </button>
              )}
              <button onClick={() => removeTodo(todo.id)}>
                <Trash2  color='#F93232'/>
              </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      
      {notification && <div className='notification'>{notification}</div>} 
    </div>
  );
}
