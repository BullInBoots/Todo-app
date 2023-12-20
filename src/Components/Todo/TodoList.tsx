import { Task } from './TodoApp';
import TodoTaskItem from './TodoTaskItem';

interface TodoListProps {
  taskList: Task[];
}

const TodoList = ({taskList}: TodoListProps) => {
  
  const listOfTask = taskList.map((task) => {
    return <TodoTaskItem key={task.id} title={task.title} fromTime={task.fromTime} toTime={task.toTime}/>
  });
  
  return (
    <div className='flex flex-col gap-4 mt-4'>
      {listOfTask}
    </div>
  )
}

export default TodoList