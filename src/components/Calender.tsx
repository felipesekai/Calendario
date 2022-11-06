
export const Calender = () => {

    const days = range(1, 30)

    function range(start: number, end: number): number[] {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }
    return (
        <div className="w-full py-2">
            <div className="block bg-teal-400 text-center py-4 text-black font-bold text-2xl">
                <h1 className="mx-auto">Novembro</h1>
                <h1>2022</h1>
            </div>

            <ul className=" bg-slate-500">
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Segunda</li>
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Terça</li>
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Quarta</li>
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Quinta</li>
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Sexta</li>
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Sabado</li>
                <li className="inline-block  text-white my-1 w-[13.6%] text-center">Domingo</li>
            </ul>
            <ul className=" bg-slate-400 gap-1 ">
                {days.map(value => { return <li className="inline-block px-2 py-0 mb-1 list-none w-[13.6%] text-center">{value}</li> })}
            </ul>
        </div>
    );
}