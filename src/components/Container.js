import React, {useState} from 'react'
import Form from './Form'
import TaskList from './TaskList'

const Container = () => {
    const [list, setList]=useState([]);

    const handleAddItem = addItem => {
        setList([...list, addItem])
    };
  return (
    <div>
      <Form handleAddItem={handleAddItem}/>
      <TaskList list={list} setList={setList} />
    </div>
  );
};

export default Container