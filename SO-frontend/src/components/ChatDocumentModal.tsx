import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { NavUpload } from "./NavUpload";

type ChatModalProps = {
  currentFileIDs: string[];
  setFileIDs: React.Dispatch<React.SetStateAction<string[]>>;
  setIsChatSetup: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh",
  padding: "1rem",
};

const modalFooterStyle = {
  borderTop: "1px solid #ddd",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
};

export const ChatDocumentModal = ({
  currentFileIDs,
  setFileIDs,
  setFiles,
  setIsChatSetup,
}: ChatModalProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const handleFileIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const ids = input
      .split(",") // Split the input by commas
      .map((id) => id.trim()) // Trim whitespace from each ID
      .filter((id) => id !== ""); // Remove empty strings
    setFileIDs(ids);
  };

  const saveChanges = async () => {
    setIsChatSetup(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <TextField
          id="file-id-input"
          label="File ID"
          variant="standard"
          value={currentFileIDs}
          onChange={handleFileIDChange}
        />
        <NavUpload setFiles={setFiles} />
        <Box sx={modalFooterStyle}>
          <Button
            onClick={saveChanges}
            variant="contained"
            color="success"
            sx={{ width: "100%" }}
          >
            Begin Chat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
