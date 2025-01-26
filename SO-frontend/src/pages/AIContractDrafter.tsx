import { Box } from "@mui/material";
import { MagicEditor } from "../components/MagicEditor";
import { useEffect, useState } from "react";
import HoverHighlightEditor from "../components/Editor";
import { Owlie } from "../components/Owlie";
import { useParams } from "react-router-dom";
import axios from "axios";

export const AIContractDrafter = () => {
  const params = useParams();
  const [editorContent, setEditorContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [documentId, setDocumentId] = useState("");

  useEffect(() => {
    const fetchAgreementText = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/v1/documents/files/" +
            params.documentId +
            "/LATEST"
        );

        if (response.status == 200) {
          console.log(response.data);
          setEditorContent(response.data.document_text);
        }
      } catch (error) {
        console.log("Failed to fetch agreement data");
      }
    };

    fetchAgreementText();
  });
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
