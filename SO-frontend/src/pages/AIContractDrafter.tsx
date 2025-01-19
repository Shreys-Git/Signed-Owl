import { Box } from "@mui/material";
import { MagicEditor } from "../components/MagicEditor";
import { useState } from "react";
import HoverHighlightEditor from "../components/Editor";
import { Owlie } from "../components/Owlie";

export const AIContractDrafter = () => {
  const [editorContent, setEditorContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [documentId, setDocumentId] = useState("");

  return (
    <Box display="flex" flexDirection="row">
      {/* <AgreementEditor
        content={content}
        setContent={setContent}
        documentId={documentId}
        setDocumentId={setDocumentId}
      /> */}
      <HoverHighlightEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      />
      <Owlie
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        prompt={prompt}
        setPrompt={setPrompt}
      />
      {/* <MagicEditor
        content={content}
        setContent={setContent}
        prompt={prompt}
        setPrompt={setPrompt}
      /> */}
    </Box>
  );
};
