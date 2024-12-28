import { Box, Typography } from "@mui/material";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Box
      sx={{
        padding: "1rem",
        width: "100%",
        bgcolor: "#f5f5f5",
        borderRadius: "4px",
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        {column.title}
      </Typography>
      <Box
        ref={setNodeRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
        }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  );
}
