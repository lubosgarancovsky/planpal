import { Layout } from './components';
import { Provider } from './components/providers';
import { TasksList } from './components/tasks';
import NewTaskInput from './components/tasks/new-task-input/NewTaskInput';

function App() {
  return (
    <Provider>
      <Layout>
        <NewTaskInput />
        <TasksList />
      </Layout>
    </Provider>
  );
}

export default App;
