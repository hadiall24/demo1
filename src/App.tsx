import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import { type Schema } from '@amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useNavigate } from 'react-router-dom';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        navigate('/new-page');  // Navigate to the new page after sign-in
      }
    };

    checkAuth();

    const subscription = client.models.Todo.observeQuery().subscribe({
      next: ({ data }) => setTodos([...data.items]),
    });

    return () => subscription.unsubscribe();
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt('Todo content') });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <button onClick={signOut}>Sign out</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <button onClick={() => deleteTodo(todo.id)}>x</button>
                {todo.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
