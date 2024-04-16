import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from "axios";
import AddNewTask from '../../components/AddNewTask';
import DoingColumn from '../../components/DoingColumn';
import DoneColumn from '../../components/DoneColumn';
import ToDoColumn from '../../components/ToDoColumn';
import Sidebar from '../Sidebar/Sidebar';

const baseUrl = process.env.REACT_APP_BASEURL;

const TaskHomepage = () => {
  const [tasks, setTasks] = useState({
    'doing': [],
    'done': [],
    'todo': []
  });
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseDoing = await axios.post(`${baseUrl}/api/task/donetasks`, {
          status: 'In Progress'
        });
        const responseDone = await axios.post(`${baseUrl}/api/task/donetasks`, {
          status: 'Done'
        });
        const responseToDo = await axios.post(`${baseUrl}/api/task/donetasks`, {
          status: 'To Do'
        });

        setTasks({
          'doing': responseDoing.data,
          'done': responseDone.data,
          'todo': responseToDo.data
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // If dropped outside the droppable area or dropped in the same position, return
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const updatedTasks = { ...tasks };

    // If dropped in the same column
    if (source.droppableId === destination.droppableId) {
      const columnId = source.droppableId;
      const columnTasks = updatedTasks[columnId];
      const [removed] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, removed);
      setTasks(updatedTasks);
    } else {
      // If dropped in a different column
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;
      const sourceColumnTasks = updatedTasks[sourceColumnId];
      const destinationColumnTasks = updatedTasks[destinationColumnId];
      const [removed] = sourceColumnTasks.splice(source.index, 1);
      destinationColumnTasks.splice(destination.index, 0, removed);
      setTasks(updatedTasks);
    }
  };

  return (<div className='flex'>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 w-full h-200 bg-black">
  <Sidebar/>
  <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <ToDoColumn>
                {tasks.todo.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ToDoColumn>
            </div>
          )}
        </Droppable>
        <Droppable droppableId="doing">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <DoingColumn>
                {tasks.doing.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DoingColumn>
            </div>
          )}
        </Droppable>
      
       
        <Droppable droppableId="done">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <DoneColumn>
                {tasks.done.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DoneColumn>
            </div>
          )}
        </Droppable>
        <AddNewTask/>
      </div>
    </DragDropContext>
  </div>
  );
};

export default TaskHomepage;