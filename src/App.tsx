import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';

interface Task {
  text: string,
  done: boolean,
  id: number
}

const App: FC = () => {
  const [todos, setTodos] = useState<Task[]>([
    { text: 'Test task', done: false, id: 1 },
  ])
  const [todoText, setTodoText] = useState<string>('')
  const [todosCategory, setTodosCategory] = useState<string>('all')

  let doneTodos = 0
  let activeTodos = 0
  todos.map(e => {
    if (e.done) {
      doneTodos++
    } else {
      activeTodos++
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setTodos([...todos, { text: todoText, done: false, id: Date.now() }])
    setTodoText('')
  }

  const handleCheckbox = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done }
        }
        return todo
      })
    )
  }

  const deleteDoneTodos = () => {
    setTodos(todos.filter(e => {
      return e.done === false
    }))
  }

  console.log(activeTodos + '   ' + doneTodos);

  return (
    <main>
      <h1>todos</h1>
      <section>
        <form className='todoInput'>
          <div>{'>'}</div>
          <input value={todoText} placeholder='What needs to be done?' onChange={(e) => setTodoText(e.currentTarget.value)} />
          <button disabled={!todoText} onClick={handleSubmit} type="submit">Add task</button>
        </form>
        <ul>
          {todosCategory === 'all'
            ?
            todos.map(todo => (
              <li className={todo.done ? 'todoDone' : 'todoNotdone'} key={todo.id}>
                <input id={todo.text} type="checkbox" checked={todo.done} onChange={() => handleCheckbox(todo.id)} />
                <label htmlFor={todo.text}>{todo.text}</label>
              </li>
            ))
            :
            todosCategory === 'active'
              ?
              (activeTodos > 0 ?
                todos.map(todo => {
                  return !todo.done &&
                    <li className={todo.done ? 'todoDone' : 'todoNotdone'} key={todo.id} style={{ paddingLeft: '30px' }}>
                      <label>{todo.text}</label>
                    </li>
                })
                :
                <div style={{ padding: '15px 30px', borderBottom: '1px solid gray' }}>No active tasks</div>
              )
              :
              (doneTodos > 0
                ?
                todos.map(todo => {
                  return todo.done &&
                    <li className={todo.done ? 'todoDone' : 'todoNotdone'} key={todo.id} style={{ paddingLeft: '30px' }}>
                      <label>{todo.text}</label>
                    </li>
                })
                :
                <div style={{ padding: '15px 30px', borderBottom: '1px solid gray' }}>No completed tasks</div>
              )
          }
        </ul>
        <div className='bot'>
          <div>{activeTodos} items left</div>
          <div className='btns'>
            <button
              onClick={() => setTodosCategory('all')}
              disabled={todosCategory === 'all'}
              style={todosCategory === 'all' ? { border: '1px solid #4d4d4d' } : { border: 'none' }}
            >All</button>
            <button
              onClick={() => setTodosCategory('active')}
              disabled={todosCategory === 'active'}
              style={todosCategory === 'active' ? { border: '1px solid #4d4d4d' } : { border: 'none' }}
            >Active</button>
            <button
              onClick={() => setTodosCategory('completed')}
              disabled={todosCategory === 'completed'}
              style={todosCategory === 'completed' ? { border: '1px solid #4d4d4d' } : { border: 'none' }}
            >Completed</button>
          </div>
          <button onClick={deleteDoneTodos}>Clear completed</button>
        </div>
      </section>
    </main>
  );
}

export default App;
