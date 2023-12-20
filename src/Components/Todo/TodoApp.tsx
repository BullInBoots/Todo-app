import React, { useState } from 'react'
import useDate from '../../hooks/useDate'
import TodoCreate from './TodoCreate';
import TodoList from './TodoList';

export interface Task {
  id: string;
  title: string;
  description: string;
  isCheck: boolean;
  fromTime: number;
  toTime: number;
}

const TodoApp = () => {

  const {hour, minute, second, day} = useDate();
  const [taskList, setTaskList] = useState<Task[]>([]);
  
  return (
    <div className="relative w-[268px] h-[440px] bg-white rounded-2xl drop-shadow-lg px-[18px] pt-[14px] pb-2">
      <h1 className="font-poppins font-semibold text-xl text-primary">
        What are you doing today?
      </h1>

      <TodoCreate setState={setTaskList} />

      <TodoList taskList={taskList} />

      <div className="fixed bottom-3 flex flex-col">
        <div className="font-poppins font-semibold text-grey">
          {hour}:{minute}:{second}
        </div>
        <div className="font-poppins font-semibold text-grey text-xl leading-3">
          {day}
        </div>
      </div>

    </div>
  );
}

export default TodoApp