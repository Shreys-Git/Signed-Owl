import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Button,
  Typography,
  Box,
  Tooltip,
  Popper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Download,
  NotificationsActive,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const EditorContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: "20px auto",
  padding: theme.spacing(3),
}));

const ToolbarButton = styled(IconButton)(({ theme, selected }) => ({
  marginRight: theme.spacing(1),
  backgroundColor: selected ? theme.palette.action.selected : "transparent",
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginRight: theme.spacing(2),
  minWidth: 120,
}));

const RichTextEditor = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [editorContent, setEditorContent] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This is the highlighted line that will show a tooltip when you hover over it. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  );
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const contentRef = useRef(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = (event) => {
    const tooltip = document.getElementById("tooltip");
    const relatedTarget = event.relatedTarget;

    if (!tooltip?.contains(relatedTarget)) {
      setIsTooltipVisible(false);
      setAnchorEl(null);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    setSelectedText(selectedText);
  };

  const handleAlertClick = () => {
    if (selectedText) {
      alert(`Selected text: "${selectedText}"`);
    } else {
      alert("No text selected! Please select some text first.");
    }
  };

  const fonts = ["Arial", "Times New Roman", "Courier New"];

  const fontSizes = ["12", "14", "16", "18", "20"];

  const exportAsPDF = () => {
    // PDF export logic remains the same
  };

  const exportAsText = () => {
    // Text export logic remains the same
  };

  return (
    <EditorContainer elevation={2}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar variant="dense">
          <Box display="flex" alignItems="center" flexGrow={1}>
            <StyledSelect
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              size="small"
            >
              {fonts.map((font) => (
                <MenuItem key={font} value={font}>
                  {font}
                </MenuItem>
              ))}
            </StyledSelect>

            <StyledSelect
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              size="small"
            >
              {fontSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}px
                </MenuItem>
              ))}
            </StyledSelect>

            <ToolbarButton
              selected={isBold}
              onClick={() => setIsBold(!isBold)}
              size="small"
            >
              <FormatBold />
            </ToolbarButton>

            <ToolbarButton
              selected={isItalic}
              onClick={() => setIsItalic(!isItalic)}
              size="small"
            >
              <FormatItalic />
            </ToolbarButton>

            <ToolbarButton
              selected={isUnderline}
              onClick={() => setIsUnderline(!isUnderline)}
              size="small"
            >
              <FormatUnderlined />
            </ToolbarButton>
          </Box>

          <Box>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={exportAsPDF}
              sx={{ mr: 1 }}
            >
              PDF
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={exportAsText}
              sx={{ mr: 1 }}
            >
              TXT
            </Button>
            <Button
              variant={selectedText ? "contained" : "outlined"}
              startIcon={<NotificationsActive />}
              onClick={handleAlertClick}
            >
              Alert
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        ref={contentRef}
        onMouseUp={handleTextSelection}
        sx={{
          mt: 2,
          fontFamily: selectedFont,
          fontSize: `${fontSize}px`,
          fontWeight: isBold ? "bold" : "normal",
          fontStyle: isItalic ? "italic" : "normal",
          textDecoration: isUnderline ? "underline" : "none",
        }}
      >
        {editorContent.split(" ").map((word, index, array) => {
          if (index >= 20 && index <= 30) {
            return (
              <Box
                component="span"
                key={index}
                sx={{
                  bgcolor: "warning.light",
                  cursor: "pointer",
                  display: "inline",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {word}{" "}
              </Box>
            );
          }
          return word + " ";
        })}
      </Box>

      <Popper
        id="tooltip"
        open={isTooltipVisible}
        anchorEl={anchorEl}
        placement="top"
        sx={{ zIndex: 1300 }}
      >
        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
            <Typography variant="body2">
              This is the tooltip content that appears when you hover over the
              highlighted text.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              onClick={() => alert("Button clicked!")}
            >
              Click Me!
            </Button>
          </CardActions>
        </Card>
      </Popper>
    </EditorContainer>
  );
};

export default RichTextEditor;
