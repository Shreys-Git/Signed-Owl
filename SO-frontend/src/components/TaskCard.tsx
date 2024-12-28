import { Card, Typography } from "@mui/material";
import { Task } from "./types";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        minHeight: "70px",
        padding: "1rem",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        willChange: "transform",
        cursor: "grab",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <Typography variant="h6" noWrap>
        {task.title}
      </Typography>
      <Typography variant="body2" noWrap>
        {task.description}
      </Typography>
    </Card>
  );
}
