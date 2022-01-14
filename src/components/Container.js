import React, { useEffect, useState } from 'react'
import Checkbox from "./Checkbox";







const Container = () => {
  const [label, setLabel] = useState("");

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
  // fetch
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
  const updateTask = (url, list) => {
    console.log(list)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(list);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  //end fetch

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
    handleAddItem({
      done: false,
      id: (+new Date()).toString(),
      label,
    });
    updateTask(list)
    setLabel("");
  }

  useEffect(() => {
    getList(url)
  }, [])

  useEffect(() => {
    console.log(list)
    updateTask(url, list)
  }, [list])



  const onChangeStatus = e => {
    const { name, checked } = e.target;

    const updateList = list.map(item => ({
      ...item,
      done: item.id === name ? checked : item.done
    }));
    setList(updateList);
  };
  const onClickRemoveItem = e => {
    const updateList = list.filter(item => !item.done);
    setList(updateList);
  };
  console.log(list)
  const check = list.map((item, value) => (
    <Checkbox key={value} data={item} onChange={onChangeStatus} />
  ));

  return (
    <div>
      <form >
        <div className="todo-list">
          <div className="file-input">
            <input
              className="text"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <button
              className="button pink"
              disabled={label ? "" : "disabled"}
              onClick={handleSubmit}
            >
              Agregar
            </button>
          </div>
        </div>
      </form>

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

      {/* <Form handleAddItem={handleAddItem} handleSubmit={handleSubmit}  getList={getList} setTask={setTask} list={list} />
      <TaskList list={list} setList={setList} />} */}
    </div>
  );
};

export default Container