import { Box, Card } from "@mui/material";
import { UserText } from "./UserText";
import { AIResponseText } from "./AIResponseText";
import { UserChatInput } from "./UserChatInput";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChatDocumentModal } from "./ChatDocumentModal";

export type UploadedFile = {
  name: string;
  content: string;
};

export const Chat = () => {
  const [isChatSetup, setIsChatSetup] = useState(false);
  const [filesIDs, setFileIDs] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isNewInputAvailable, setIsNewInputAvailable] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [AIMessages, setAIMessages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[] | null>(null);

  // Effect to add new user input to userMessages and reset input
  useEffect(() => {
    if (isNewInputAvailable) {
      // Add user input to the list of user messages
      setUserMessages((prevMessages) => [...prevMessages, userInput]);

      // Call the API to get the AI response
      const sendMessageToAI = async () => {
        const formData = new FormData();

        // Append message
        formData.append("message", userInput);

        // Append file IDs
        filesIDs.forEach((id) => formData.append("agreement_id", id));

        // Append additional files if any
        if (files) {
          files.forEach((file) => formData.append("additional_docs", file));
        }

        console.log("The payload being sent is:", formData);

        try {
          const response = await axios.post(
            "http://localhost:8000/RAG/llm/chat",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            // Add the current AI response to the existing ones
            setAIMessages((prevMessages) => [
              ...prevMessages,
              response.data.answer,
            ]);
          } else {
            console.error("Unexpected response:", response);
          }
        } catch (error) {
          console.error("Error during POST request:", error);
        }
      };

      sendMessageToAI();

      // Reset user input and flag
      setUserInput("");
      setIsNewInputAvailable(false);
    }
  }, [
    isNewInputAvailable,
    userMessages,
    AIMessages,
    filesIDs,
    files,
    userInput,
  ]);

  return (
    <>
      {isChatSetup ? (
        <Card
          sx={{
            bgcolor: "#f5f5f5",
            height: "80vh",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Enable vertical scrolling when content overflows
              paddingRight: "8px",
            }}
          >
            {/* Render user messages */}
            {userMessages.map((message, index) => (
              <Box key={index}>
                <UserText text={message} />
                <AIResponseText text={AIMessages[index]} />
              </Box>
            ))}
          </Box>

          {/* User input area */}
          <UserChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            setIsNewInputAvailable={setIsNewInputAvailable}
          />
        </Card>
      ) : (
        <ChatDocumentModal
          currentFileIDs={filesIDs}
          setFileIDs={setFileIDs}
          setIsChatSetup={setIsChatSetup}
          setFiles={setFiles}
        />
      )}
    </>
  );
};
