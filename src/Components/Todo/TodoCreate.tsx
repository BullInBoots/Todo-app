import React, { useEffect, useReducer, useRef, useState } from "react";
import { Task } from "./TodoApp";
import useDate from "../../hooks/useDate";
import { numberRotation, toNonZero } from "../../helper/validation/isNonZero";


const initState = {
  id: "",
  title: "",
  description: "",
  isCheck: false,
  fromTime: 0,
  toTime: 0,
  taskList: new Array<Task>(),
};

const REDUCER_ACTION_TYPE = {
  ADD_TASK: 0,
  CLEAR_INPUT: 1,
  TITLE_INPUT: 2,
  DESCRIPTION_INPUT: 3,
  FROM_TIME_HOUR_INPUT_INCREMENT: 4,
  FROM_TIME_HOUR_INPUT_DECREMENT: 5,
  FROM_TIME_MIN_INPUT_INCREMENT: 6,
  FROM_TIME_MIN_INPUT_DECREMENT: 7,
  TO_TIME_INPUT_INCREMENT: 8,
  TO_TIME_INPUT_DECREMENT: 9,
} as const;
type ActionType =
  (typeof REDUCER_ACTION_TYPE)[keyof typeof REDUCER_ACTION_TYPE];

type ReducerAction = {
  type: ActionType;
  payload?: Task;
  stringInput?: string;
  numberInput?: number;
};

const newTask = (
  id: string,
  title: string,
  description?: string,
  fromTime?: number,
  toTime?: number
): Task => {
  return {
    id: id,
    title: title,
    description: description ?? "",
    isCheck: false,
    fromTime: fromTime ?? 0,
    toTime: toTime ?? 0,
  };
};

const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_TASK:
      if (action.payload?.id && action.payload.title) {
        return {
          ...state,
          taskList: [
            ...state.taskList,
            newTask(
              action.payload.id,
              action.payload.title,
              action.payload.description,
              action.payload.fromTime,
              action.payload.toTime
            ),
          ],
        };
      }
      break;

    case REDUCER_ACTION_TYPE.CLEAR_INPUT:
      return {
        ...state,
        title: "",
        description: "",
        fromTime: 0,
        toTime: 0,
      }

    case REDUCER_ACTION_TYPE.TITLE_INPUT:
      return { ...state, title: action.stringInput ?? "" };

    case REDUCER_ACTION_TYPE.DESCRIPTION_INPUT:
      return { ...state, description: action.stringInput ?? "" };

    // cases for fromTime, toTime
    case REDUCER_ACTION_TYPE.FROM_TIME_HOUR_INPUT_INCREMENT: {
      const newFromTime = numberRotation(0, 2400, state.fromTime + (action.numberInput ?? 0));
      return {...state, fromTime: newFromTime}
    }
    case REDUCER_ACTION_TYPE.FROM_TIME_HOUR_INPUT_DECREMENT: {
      const newFromTime = toNonZero(numberRotation(0, 2400, state.fromTime - (action.numberInput ?? 0)));
      return {...state, fromTime: newFromTime}
    }

    case REDUCER_ACTION_TYPE.FROM_TIME_MIN_INPUT_INCREMENT: {
      let newFromTime = state.fromTime + (action.numberInput ?? 0);
      if (newFromTime % 100 > 50) {
        newFromTime += 40;
      }
      return {...state, fromTime: newFromTime}
    }

    case REDUCER_ACTION_TYPE.FROM_TIME_MIN_INPUT_DECREMENT: {
      let newFromTime = toNonZero(state.fromTime - (action.numberInput ?? 0));
      if (newFromTime % 100 > 60) {
        newFromTime -= 40;
      }
      return {...state, fromTime: newFromTime}
    }

    case REDUCER_ACTION_TYPE.TO_TIME_INPUT_INCREMENT: {
      const newToTime = state.toTime + (action.numberInput ?? 0);
      return {...state, toTime: newToTime}
    }
    
    case REDUCER_ACTION_TYPE.TO_TIME_INPUT_DECREMENT: {
      const newToTime = toNonZero(state.toTime - (action.numberInput ?? 0));
      return {...state, toTime: newToTime}
    }

    default:
      throw new Error();
  }
  return { ...state };
};

interface TodoCreateProps {
  setState: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TodoCreate = ({ setState }: TodoCreateProps) => {

  const [state, dispatch] = useReducer(reducer, initState);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { hour, minute } = useDate();

  useEffect(() => {
    setState(state.taskList);
  }, [setState, state.taskList]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: REDUCER_ACTION_TYPE.ADD_TASK,
      payload: {
        id: hour.concat(minute),
        title: state.title,
        description: state.description,
        isCheck: state.isCheck,
        fromTime: state.fromTime,
        toTime: state.toTime,
      },
    });
    dispatch({type: REDUCER_ACTION_TYPE.CLEAR_INPUT});
    setState(state.taskList);
  };

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.TITLE_INPUT,
      stringInput: e.target.value,
    });
  };

  const descriptionOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.DESCRIPTION_INPUT,
      stringInput: e.target.value,
    });
  };

  const timeOnClickHandler = ({ type, numberInput }: ReducerAction) => {
    dispatch({ type: type, numberInput: numberInput });
  }

  return (
    <form
      className="bg-white drop-shadow-md p-3 rounded-xl relative"
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <input
        type="text"
        className="h-5 bg-secondary rounded-xl pl-2 placeholder:text-sm placeholder:text-tertiary text-sm border border-tertiary focus:outline-0"
        placeholder="Title"
        onChange={titleOnChangeHandler}
        value={state.title}
        onFocus={() => setShowForm(true)}
      />
      <div className={showForm ? "block" : "hidden"}>
        <input
          type="text"
          className="mt-2 h-5 w-full bg-secondary rounded-xl pl-2 placeholder:text-sm placeholder:text-tertiary text-sm border border-tertiary focus:outline-0"
          placeholder="Description"
          value={state.description}
          onChange={descriptionOnChangeHandler}
          onFocus={() => setShowForm(true)}
        />

        {/* FROM TIME INPUT */}

        <div className="flex items-center gap-1">
          <div className="font-poppins font-medium text-xs">FROM</div>
          <div className="flex flex-col items-center w-3 text-xs">
            <button type="button" onClick={() => timeOnClickHandler({type: REDUCER_ACTION_TYPE.FROM_TIME_HOUR_INPUT_INCREMENT, numberInput: 100})}>+</button>
            <div>{Math.floor(state.fromTime / 100)}</div>
            <button type="button" onClick={() => timeOnClickHandler({type: REDUCER_ACTION_TYPE.FROM_TIME_HOUR_INPUT_DECREMENT, numberInput: 100})}>-</button>
          </div>
          <div>:</div>
          <div className="flex flex-col items-center w-3 text-xs">
            <button type="button" onClick={() => timeOnClickHandler({type: REDUCER_ACTION_TYPE.FROM_TIME_MIN_INPUT_INCREMENT, numberInput: 10})}>+</button>
            <div>{state.fromTime % 100}</div>
            <button type="button" onClick={() => timeOnClickHandler({type: REDUCER_ACTION_TYPE.FROM_TIME_MIN_INPUT_DECREMENT, numberInput: 10})}>-</button>
          </div>
        </div>

        {/* TO TIME INPUT */}
        <div className="flex items-center gap-1 text-xs">
          <div className="font-poppins font-medium">FOR</div>
          <div className="flex justify-between w-10">
            <button type="button" onClick={() => timeOnClickHandler({type: REDUCER_ACTION_TYPE.TO_TIME_INPUT_INCREMENT, numberInput: 30})} >+</button>
            <div className="">{state.toTime}</div>
            <button type="button" onClick={() => timeOnClickHandler({type: REDUCER_ACTION_TYPE.TO_TIME_INPUT_DECREMENT, numberInput: 30})}>-</button>
          </div>
          <div>mins</div>
        </div>
        
        <button
          type="submit"
          className="ml-auto mt-2 h-[18px] w-[18px] flex items-center justify-center bg-primary rounded-full"
          onClick={() => setShowForm(false)}
        >
          <img src="/icons/plus-sign.svg" />
        </button>
      </div>
    </form>
  );
};

export default TodoCreate;
