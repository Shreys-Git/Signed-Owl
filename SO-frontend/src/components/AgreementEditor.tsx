import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Box, Button } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";

type EditorProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  documentId: string;
  setDocumentId: React.Dispatch<React.SetStateAction<string>>;
};

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export const AgreementEditor = ({
  content,
  setContent,
  documentId,
  setDocumentId,
}: EditorProps) => {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/contract/save")
  //     .then((response) => {
  //       setContent(response.data.content);
  //       setDocumentId(response.data.id);
  //     })
  //     .catch((error) => console.error("Error fetching document:", error));
  // }, []);

  const saveDocument = () => {
    const data = { content };
    axios
      .post("http://localhost:8000/contract/mongo/save", data)
      .then((response) => {
        setDocumentId(response.data.id);
        alert("Document saved!");
      })
      .catch((error) => console.error("Error saving document:", error));
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Button
        onClick={saveDocument}
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        startIcon={<SaveAsIcon />}
      >
        Save Document
      </Button>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      />
    </Box>
  );
};
