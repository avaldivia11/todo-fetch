import React from "react";
import Checkbox from "./Checkbox";

const TaskList = props => {
    const {list, setList}=props;



    

    const onChangeStatus = e =>{
        const {name, checked} = e.target;

        const updateList = list.map(item =>({
            ...item,
            done: item.id === name ? checked : item.done
        }));
        setList(updateList);
    };
    const onClickRemoveItem = e => {
        const updateList=list.filter(item => !item.done);
        setList(updateList);
    };
    console.log(list)
    const check = list.map((item, value) => (
    <Checkbox key={value} data={item} onChange={onChangeStatus} />
    ));

  return (
    <div className="todo-list">

        {list.length ? check : "Sin tareas"}
        {list.length ? (
            <p>
                <button className="button blue" onClick={onClickRemoveItem}>
                    Eliminar seleccion
                </button>
            </p>
            
        ) : null}
        
    </div>
  );
};
export default TaskList;
