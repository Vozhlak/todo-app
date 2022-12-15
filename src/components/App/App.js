import './App.css';

import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
function App() {
  const tasks = [
    {
      'id': 1,
      'label': "Completed task",
    },
    {
      'id': 2,
      'label': "Update task",
    },
    {
      'id': 3,
      'label': "Delete task",
    }
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={tasks}/>
        <Footer />
      </section>
    </section>
  );
}

export default App;
