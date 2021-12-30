import React, { useState } from "react";



const Form = (props) => {
  const { handleAddItem, list, setTask, getList } = props;
  const [label, setLabel] = useState("");
  const [url] = useState("https://assets.breatheco.de/apis/fake/todos/user/andresv11");

  const updateTask = (url, list) => {
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(list),
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
  }

console.log(updateTask)
  const handleSubmit = (e) => {
    e.preventDefault();

    handleAddItem({
      done: false,
      id: (+new Date()).toString(),
      label,
    });
    updateTask(list)
    setLabel("");
  };
  
  return (
    <form onSubmit={handleSubmit}>
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
          >
            Agregar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
