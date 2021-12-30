import React, { useEffect, useState } from 'react'
import Form from './Form'
import TaskList from './TaskList'




const Container = () => {


  const [url] = useState("https://assets.breatheco.de/apis/fake/todos/user/andresv11");

  const [list, setList] = useState([]);

  const [edit, setEdit] = useState(false);

  const handleAddItem = addItem => {
    setList([...list, addItem])
  };

  const [task, setTask] = useState({
    label: '',
    done: false,
    id: 0
  })




  const getList = url => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    })
      .then((response) => {
        //console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  /* const saveTask = (url, task) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        //console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTask({
          label: '',
        });
        getList("https://assets.breatheco.de/apis/fake/todos/user/andresv11");
      })
      .catch((error) => {
        console.log(error);
      })
  } */

  
  /* const deleteTask = async (url, task) => {
    try {
      const response = await fetch(`${url}/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      getList(url);
    } catch (error) {
      console.log(error);
    }
  } */
  const handleSubmit = e => {
    console.log(list)  
  }

  useEffect(() => {
    getList(url)
  }, [])


  return (
    <div>
      <Form handleAddItem={handleAddItem} handleSubmit={handleSubmit}  getList={getList} setTask={setTask} list={list}  />
      <TaskList list={list} setList={setList} />
    </div>
  );
};

export default Container