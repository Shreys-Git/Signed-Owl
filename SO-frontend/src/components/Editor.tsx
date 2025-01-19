import React, { useState, useRef, MouseEvent, ChangeEvent } from "react";
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
  TextField,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Download,
  NotificationsActive,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

type EditorTextAreaProps = {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
};

// Styled components
const EditorContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: "20px auto",
  padding: theme.spacing(3),
}));

const ToolbarButton = styled(IconButton)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    marginRight: theme.spacing(1),
    backgroundColor: selected ? theme.palette.action.selected : "transparent",
  })
);

const StyledSelect = styled(Select)(({ theme }) => ({
  marginRight: theme.spacing(2),
  minWidth: 120,
}));

const RichTextEditor = ({
  editorContent,
  setEditorContent,
}: EditorTextAreaProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  // const [editorContent, setEditorContent] = useState<string>(
  //   '**NON-DISCLOSURE AGREEMENT**\n\nThis Non-Disclosure Agreement ("Agreement") is made and entered into as of the ___ day of ____________, 20___, by and between Yellow Ridges, a corporation organized and existing under the laws of ____________, with its principal place of business at [Address] ("Company"), and James Joseph Rose, an individual residing at [Address] ("Employee").\n\n**1. Confidential Information**\n\nFor purposes of this Agreement, "Confidential Information" means all non-public, proprietary, or confidential information disclosed by the Company to the Employee, whether disclosed in writing, orally, or by any other means, that relates to the Company’s business, including but not limited to:\n\n(a) Trade secrets, business strategies, financial information, customer lists, and pricing;\n(b) Technical data, product designs, prototypes, and methods;\n(c) Marketing strategies, research, and development;\n(d) Any other information that the Company designates as confidential.\n\n**2. Obligations of the Employee**\n\nThe Employee agrees to:\n\n(a) Use the Confidential Information solely for the purpose of performing their job duties for the Company;\n(b) Maintain the confidentiality of the Confidential Information and not disclose it to any third party without prior written consent from the Company;\n(c) Take all reasonable steps to protect and prevent the unauthorized use or disclosure of Confidential Information.\n\n**3. Exclusions from Confidential Information**\n\nConfidential Information does not include information that:\n\n(a) Is or becomes publicly available without breach of this Agreement;\n(b) Is lawfully obtained by the Employee from a third party without restriction;\n(c) Is independently developed by the Employee without use of or reference to the Company’s Confidential Information;\n(d) Is required to be disclosed by law or regulation, provided that the Employee gives prior written notice to the Company and cooperates with the Company in any effort to limit the disclosure.\n\n**4. Term**\n\nThis Agreement shall remain in effect for the duration of the Employee’s employment with the Company and for a period of two (2) years following the termination of such employment, regardless of the reason for termination.\n\n**5. Return of Confidential Information**\n\nUpon termination of the Employee’s employment with the Company, or upon the Company’s written request, the Employee shall immediately return to the Company all materials, documents, and other tangible items containing or embodying any Confidential Information, including any copies, notes, or summaries thereof.\n\n**6. Remedies**\n\nThe Employee acknowledges that any breach or threatened breach of this Agreement may result in irreparable harm to the Company, for which monetary damages may be inadequate. The Company shall be entitled to seek injunctive relief and other equitable remedies in addition to any other rights or remedies available at law or in equity.\n\n**7. Governing Law and Jurisdiction**\n\nThis Agreement shall be governed by and construed in accordance with the laws of the State of ____________. Any legal action or proceeding arising under this Agreement shall be brought exclusively in the courts located in ____________.\n\n**8. Entire Agreement**\n\nThis Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, whether written or oral, relating to the same.\n\n**9. Amendments**\n\nNo modification or amendment of this Agreement shall be effective unless in writing and signed by both parties.\n\n**10. Severability**\n\nIf any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.\n\nIN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.\n\n**Yellow Ridges**\nBy: ____________________________\nName: _________________________\nTitle: __________________________\nDate: __________________________\n\n**Employee**\n\n______________________________\nJames Joseph Rose\nDate: __________________________'
  // );
  const [selectedFont, setSelectedFont] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState<string>("16");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    const tooltip = document.getElementById("tooltip");
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (!tooltip?.contains(relatedTarget)) {
      setIsTooltipVisible(false);
      setAnchorEl(null);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() || "";
    setSelectedText(selectedText);
  };

  const handleAlertClick = () => {
    if (selectedText) {
      alert(`Selected text: "${selectedText}"`);
    } else {
      alert("No text selected! Please select some text first.");
    }
  };

  // Handle changes in the text field
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditorContent(event.target.value);
  };

  const fonts: string[] = ["Arial", "Times New Roman", "Courier New"];

  const fontSizes: string[] = ["12", "14", "16", "18", "20"];

  const exportAsPDF = () => {
    // Export logic here
  };

  const exportAsText = () => {
    // Export logic here
  };

  return (
    <EditorContainer elevation={2}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar variant="dense">
          <Box display="flex" alignItems="center" flexGrow={1}>
            <StyledSelect
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value as string)}
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
              onChange={(e) => setFontSize(e.target.value as string)}
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
        <TextField
          value={editorContent}
          onChange={handleTextChange}
          multiline
          fullWidth
          variant="outlined"
          // rows={10}
          placeholder="Type something..."
          sx={{
            fontSize: "16px",
            lineHeight: 1.5,
            fontFamily: "Roboto, sans-serif",
          }}
        />
        {/* {editorContent.split(" ").map((word, index) => {
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
        })} */}
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
