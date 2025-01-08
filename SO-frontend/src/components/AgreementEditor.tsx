import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Box, Button } from "@mui/material";

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

export const AgreementEditor = () => {
  const [content, setContent] = useState("");
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/document/1")
      .then((response) => {
        setContent(response.data.content);
        setDocumentId(response.data.id);
      })
      .catch((error) => console.error("Error fetching document:", error));
  }, []);

  const saveDocument = () => {
    const data = { content };
    if (documentId) {
      axios
        .put(`http://localhost:8000/document/${documentId}`, data)
        .then(() => alert("Document updated!"))
        .catch((error) => console.error("Error updating document:", error));
    } else {
      axios
        .post("http://localhost:8000/document", data)
        .then((response) => {
          setDocumentId(response.data.id);
          alert("Document saved!");
        })
        .catch((error) => console.error("Error saving document:", error));
    }
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
