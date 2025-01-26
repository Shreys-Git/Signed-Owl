import { useEffect, useState } from "react";
import { type Task, type Column as ColumnType, TaskStatus } from "../types";
import { Column } from "./Column";
import { Box } from "@mui/material";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import axios from "axios";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do", color: "orange" },
  { id: "IN_PROGRESS", title: "In Progress", color: "green" },
  { id: "DONE", title: "Done", color: "black" },
];

export const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    try {
      axios.put("http://localhost:8000/v1/tasks/" + taskId + "/" + newStatus);
    } catch (err) {
      console.log("Failed to update the status");
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("Event: ", event);
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    updateTaskStatus(taskId, newStatus);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/tasks");
        if (response.status == 200) {
          setTasks(response.data);
        }
      } catch (error) {
        console.log("Error in fetching the tasks");
      }
    };
    fetchTasks();
  }, []);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          height: "90vh",
        }}
      >
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            setTasks={setTasks}
          />
        ))}
      </Box>
    </DndContext>
  );
};
