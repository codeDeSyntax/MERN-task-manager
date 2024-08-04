import { StateProvider } from "./components/GlobalState";
import TaskManager from "./components/TaskManager";


const App = () => {
 

  return (
    <StateProvider>
      <TaskManager/>
    </StateProvider>
  );
};

export default App;
