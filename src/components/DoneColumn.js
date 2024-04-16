import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const baseUrl = process.env.REACT_APP_BASEURL;

const DoneColumn = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userList, setuserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/`);
      setuserList(response.data);

    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  fetchTasks();
}, []);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post(`${baseUrl}/api/task/donetasks`, {
          status: "Done",
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${baseUrl}/api/task`, {
      title: e.target.title.value,
      description: e.target.description.value,
      assignedTo: e.target.assignedTo.value,
      status: "Done",
    });
    setShowForm(false);
    setTasks([...tasks, response.data]);
  };
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/task/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="done-column">
        {(provided) => (
          <div
            className="column bg-gray-200 p-4 rounded-lg"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="text-lg font-semibold mb-2">Done</h2>
            <button
              className="toggle-form-btn bg-blue-500 text-white px-2 py-1 rounded-md mb-2"
              onClick={handleToggleForm}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Task
            </button>
            {showForm && (
              <form onSubmit={handleAddTask} className="mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  required
                  className="border border-gray-400 p-2 rounded-md mb-2"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="border border-gray-400 p-2 rounded-md mb-2"
                />
                <select
              name="assignedTo"
              value={selectedUser}
              onChange={handleUserChange}
              className="border border-gray-400 p-2 rounded-md mb-2"
            >
              <option value="">Select Assigned To</option>
              {userList?.map((user) => (
                <option key={user._id} value={user?._id}>
                  {user.email}
                </option>
              ))}
            </select>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                >
                  Save
                </button>
              </form>
            )}
            {/* Display added tasks */}
            <ul className="task-list">
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <li
                      className="task-item bg-white rounded-lg shadow-md p-6 mb-4"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handleDeleteTask(task._id)}
                      />

                      <div>
                        <strong className="text-lg font-semibold">
                          {task.title}
                        </strong>
                        <p className="text-gray-700">{task.description}</p>
                        <p className="text-gray-700">
                          Assigned to: {task.assignedTo}
                        </p>
                     
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DoneColumn;
