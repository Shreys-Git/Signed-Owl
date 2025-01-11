import { Box } from "@mui/material";
import { AgreementFeedback } from "../components/AgreementFeedback";
import { AgreementEditor } from "../components/AgreementEditor";
import { useState } from "react";

export const AIContractDrafter = () => {
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [documentId, setDocumentId] = useState("");

  return (
    <Box display="flex" flexDirection="row">
      <AgreementEditor
        content={content}
        setContent={setContent}
        documentId={documentId}
        setDocumentId={setDocumentId}
      />
      <AgreementFeedback
        content={content}
        setContent={setContent}
        prompt={prompt}
        setPrompt={setPrompt}
      />
    </Box>
  );
};
