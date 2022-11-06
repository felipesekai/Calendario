
import './styles/main.css'
import { TaskViewDialog } from './components/TaskViewDialog';
import { RegisterNewTask, Task } from './components/RegisterNewTask';
import { Input } from './components/Input';
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { TaskModel } from './utils/TypesModel';
import { taskModeltoView } from './utils/task-mapper';
function App() {

  const [taskState, setTaskState] = useState<TaskModel[]>([])

  useEffect(() => {
    api.get("task/v1").then((response) => {

      setTaskState(response.data)
    }).catch()
  }, []);

  return (
    <div className="flex flex-auto flex-col">

      {/* input de busca */}
      <div className="gap-2 flex items-center">
        {/* logo */}
        <h1 className="ml-auto py-4 font-sans font-bold uppercase text-5xl text-white">Calendario de tarefas</h1>
        <div className=' flex  gap-1 items-center mr-[5%] ml-[5%]'>
          <Input type={'search'} />
          <button className='shadow bg-slate-400 hover:bg-slate-500 py-2 px-3  rounded'>{"Bucar"}</button>
        </div>
      </div>

      {/* div onde tera as tarefas do dia */}

      <div className="bg-slate-400 flex justify-center items-center">
        <h3 className='text-2xl capitalize'>Tarefas do dia</h3>

      </div>
      {/* Lista de tqarefas */}
      <div className='min-h-[75vh]'>
        <section className='flex flex-col sm:grid sm:grid-cols-4 2xl:grid-cols-8 text-white mt-1 gap-2 mx-2'>
          {taskState.map(task => {
            return <div className='w-full h-[18vh] bg-slate-400 shadow my-1 rounded'>
              <TaskViewDialog
                tasks={taskModeltoView(task)}
              >
                <div className='flex flex-row text-start justify-between py-2 px-2 '>
                  <div>{task.title}</div>
                  <div className='text-slate-300'>{task.data}</div>
                </div>
              </TaskViewDialog>
            </div>

          })}
        </section>
      </div>

      <footer className=''>
        <RegisterNewTask></RegisterNewTask>
      </footer>

    </div >
  )
}

export default App
