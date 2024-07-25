import { Provider } from './components/providers';
import { TasksList, TaskDetail } from './components/tasks';

function App() {
  return (
    <Provider>
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-8">
          <TasksList />
        </div>
        <div className="border-l border-foreground-dimmed/20">
          <TaskDetail />
        </div>
      </div>
    </Provider>
  );
}

export default App;
