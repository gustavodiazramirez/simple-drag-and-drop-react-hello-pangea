import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Aprender Next.js" },
  { id: 2, text: "Aprender Vue.js" },
  { id: 3, text: "Aprender React.js" }
];
const App = () => {

  const [todos, setTodos] = useState(initialTodos)
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex= result.destination.index;

    const items = [...todos];
    // con splice estamos eliminando un elemento del array y devolviendo ese elemento
    const [reorderedItem] = items.splice(startIndex, 1);

    // con splice estamos insertando un elemento en el array
    items.splice(endIndex, 0, reorderedItem);

    setTodos(items);
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo App</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                index={index}
                draggableId={`${todo.id}`}
              >
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>

  )
}

export default App
