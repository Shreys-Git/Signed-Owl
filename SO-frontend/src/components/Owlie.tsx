import { Box, Button, Divider, Typography } from "@mui/material";
import { MagicEditor } from "./MagicEditor";
import { useState } from "react";
import { Insights } from "@mui/icons-material";
import { Tasks } from "./Tasks";

type OwlieProps = {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

type View = "magicEditor" | "insights" | "tasks";

export const Owlie = ({
  editorContent,
  setEditorContent,
  prompt,
  setPrompt,
}: OwlieProps) => {
  const [currentView, setCurrentView] = useState<View>("magicEditor");

  const views = {
    magicEditor: (
      <MagicEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        prompt={prompt}
        setPrompt={setPrompt}
      />
    ),
    insights: <Insights />,
    tasks: <Tasks />,
  };

  return (
    <Box padding="20px">
      <Typography>Owlie - Your AI Assistant</Typography>
      <br />
      <Divider />
      <br />
      <Box>
        <Button onClick={() => setCurrentView("magicEditor")}>
          Magic Edit
        </Button>
        <Button onClick={() => setCurrentView("insights")}>Insights</Button>
        <Button onClick={() => setCurrentView("tasks")}>Tasks</Button>
      </Box>
      {views[currentView]}
    </Box>
  );
};
