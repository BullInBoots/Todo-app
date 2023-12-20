import { Task } from './TodoApp'
import { militaryHourToFormalHour } from '../../helper/formatter/militaryHourToFormalHour'

interface TodoTaskItemProps {
  title: string,
  fromTime: number,
  toTime: number,
}

// must change to props to from custom to Task
const TodoTaskItem = ({title, fromTime, toTime} : TodoTaskItemProps) => {
  return (
    <div className='p-[10px] h-10 flex items-center justify-between bg-white rounded-xl drop-shadow-md'>
      <div className='font-poppins font-semibold text-xs text-black'>{title}</div>
      <div className='font-poppins font-semibold text-xs text-black'>{militaryHourToFormalHour(fromTime+toTime)}</div>
    </div>
  )
}

export default TodoTaskItem