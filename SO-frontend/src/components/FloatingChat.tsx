import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const FloatingChat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="App">
      {/* Chat Messages Area */}
      <Box className="messages-container">
        <Paper
          elevation={3}
          sx={{ maxHeight: "60vh", overflowY: "auto", padding: 2 }}
        >
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Floating Input Area */}
      <Box className="input-area">
        <TextField
          value={message}
          onChange={handleMessageChange}
          label="Type a message..."
          variant="outlined"
          fullWidth
          size="small"
          sx={{ borderRadius: "20px", marginRight: 1 }}
        />
        <Button
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          sx={{ borderRadius: "20px" }}
        >
          Send
        </Button>
      </Box>
    </div>
  );
};
