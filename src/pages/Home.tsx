import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { RegisterNewTask } from "../components/RegisterNewTask";
import { TaskViewDialog } from "../components/TaskViewDialog";
import { api } from "../services/api";
import { compareDateForDay, compareDateForMonth } from "../utils/data-converter";
import { taskModeltoView } from "../utils/task-mapper";
import { TaskModel } from "../utils/TypesModel";


export function Home() {

    const [taskList, setTaskList] = useState<TaskModel[]>([])
    const [search, setSearch] = useState<string>('');
    const [selectFilterDayMonthYear, setSelectFilterDayMonthYear] = useState<string>('dia');



    //filtro por date
    const filterDate = taskList.filter(selectFilterDayMonthYear === 'dia' ? compareDateForDay : compareDateForMonth)

    //filtro de busca por title
    const searchFilterList = filterDate.filter(task => task.title.toUpperCase().includes(search.toUpperCase()))


    // function para capturar a mudança no campo de busca por titulo
    const filterChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        let _filter = event.currentTarget.value
        setSearch(_filter)
    }, [search]);

    // function para capturar a mudança do select
    const handleChangeSelectDayOrMonth = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
        setSelectFilterDayMonthYear(event.currentTarget.value)
    }, [selectFilterDayMonthYear]);

    useEffect(() => {
        api.get("task/v1").then((response) => {
            let data: TaskModel[] = response.data
            setTaskList(data)
        }).catch().finally(() => {

        })
    }, []);

    return (
        <div className="flex flex-auto flex-col">

            {/* input de busca */}
            <div className="gap-2 flex items-center">
                {/* logo */}
                <h1 className="ml-auto py-4 font-sans font-bold uppercase text-5xl text-white">Calendario de tarefas</h1>
                <div className=' flex  gap-1 items-center mr-[5%] ml-[5%]'>
                    <Input type={'search'} placeholder="Buscar por Titulo" onChange={filterChange} />
                </div>
            </div>

            {/* div onde tera as tarefas do dia */}

            <div className="bg-slate-400 flex justify-center items-center">
                <h3 className='text-2xl capitalize'>Tarefas do
                    <select className="bg-slate-400 text-2xl capitalize"
                        onChange={handleChangeSelectDayOrMonth}
                    >
                        <option>dia</option>
                        <option>mes</option>
                    </select>
                </h3>

            </div>
            {/* Lista de tqarefas */}
            <div className='min-h-[75vh]'>
                {/* se  a tela for pequena ajusta pala exibir em forma de lista se nao em forma de grid */}
                <section className='flex flex-col sm:grid sm:grid-cols-5 2xl:grid-cols-8 text-white mt-4 gap-2 mx-10 sm:mx-4'>
                    <RegisterNewTask />
                    {searchFilterList.map(task => {
                        return <div key={task.id}
                            className='w-full h-[18vh] bg-slate-400 shadow rounded'>
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





        </div >
    );
}