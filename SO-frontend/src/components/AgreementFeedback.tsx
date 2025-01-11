import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import axios from "axios";

type EditorPromptProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

export const AgreementFeedback = ({
  content,
  setContent,
  prompt,
  setPrompt,
}: EditorPromptProps) => {
  const promptLLM = () => {
    const data = { prompt }; // Include the prompt in the data if needed
    axios
      .post("http://localhost:8000/contract/langgraph/llm", data)
      .then((response) => {
        setContent(response.data.llmContent.content);
        alert("Document saved!");
      })
      .catch((error) => console.error("Error saving document:", error));
  };

  // Handle prompt change in the TextField
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value); // Update prompt state
  };

  return (
    <Box padding="20px">
      <Typography>Owlie - Your AI Assistant</Typography>
      <br />
      <Divider />
      <br />
      <TextField
        id="filled-multiline-flexible"
        label="Prompt..."
        multiline
        rows={8}
        variant="filled"
        value={prompt} // Bind the value of the input field to prompt state
        onChange={handlePromptChange} // Update the prompt state when the user types
      />
      <br />
      <br />
      <Button
        onClick={promptLLM}
        variant="contained"
        color="primary"
        sx={{ marginBottom: "20px", width: "100%" }}
        startIcon={<BoltIcon />}
      >
        Generate
      </Button>
    </Box>
  );
};
