// import { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import axios from "axios";
// import { Box, Button } from "@mui/material";
// import SaveAsIcon from "@mui/icons-material/SaveAs";

// type EditorProps = {
//   content: string;
//   setContent: React.Dispatch<React.SetStateAction<string>>;
//   documentId: string;
//   setDocumentId: React.Dispatch<React.SetStateAction<string>>;
// };

// // Type definitions for corrections and the backend response
// interface Correction {
//   original_text: string;
//   updated_text: string;
// }

// interface BackendResponse {
//   data: Correction[];
// }

// // Toolbar configuration
// const modules = {
//   toolbar: [
//     [{ font: [] }],
//     [{ size: ["small", false, "large", "huge"] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ script: "sub" }, { script: "super" }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     [{ align: [] }],
//     ["blockquote", "code-block"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// export const AgreementEditor = ({
//   content,
//   setContent,
//   documentId,
//   setDocumentId,
// }: EditorProps) => {
//   // Fetch initial document content if needed
//   useEffect(() => {
//     // You can uncomment this if you need to fetch the document initially
//     // axios
//     //   .get("http://localhost:8000/contract/save")
//     //   .then((response) => {
//     //     setContent(response.data.content);
//     //     setDocumentId(response.data.id);
//     //   })
//     //   .catch((error) => console.error("Error fetching document:", error));
//   }, []);

//   // Save document to backend
//   const saveDocument = () => {
//     const data = { content };
//     axios
//       .post("http://localhost:8000/contract/mongo/save", data)
//       .then((response) => {
//         setDocumentId(response.data.id);
//         alert("Document saved!");
//       })
//       .catch((error) => console.error("Error saving document:", error));
//   };

//   // Apply fixes to the text
//   const fixText = async () => {
//     try {
//       const body = { change: "test_change", document: "test_contract" };
//       const response = await axios.post<BackendResponse>(
//         "http://localhost:8000/contract/langgraph/magicEdit"
//       ); // Fetch corrections
//       const corrections = response.data.data; // Access corrections array

//       let updatedContent = content;

//       // Iterate through corrections and apply updates
//       corrections.forEach(({ original_text, updated_text }) => {
//         const regex = new RegExp(original_text, "g"); // Create a regex to match all instances
//         updatedContent = updatedContent.replace(
//           regex,
//           `<span class="highlight" data-original="${original_text}">${updated_text}</span>`
//         );
//       });

//       setContent(updatedContent); // Update the editor with the modified content
//     } catch (error) {
//       console.error("Error fixing text:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         p: 2,
//       }}
//     >
//       <Button
//         onClick={saveDocument}
//         variant="contained"
//         color="primary"
//         style={{ marginBottom: "20px" }}
//         startIcon={<SaveAsIcon />}
//       >
//         Save Document
//       </Button>
//       <Button
//         onClick={fixText}
//         variant="contained"
//         color="secondary"
//         style={{ marginBottom: "20px" }}
//       >
//         Fix It
//       </Button>
//       <ReactQuill
//         value={"HI this is a button "}
//         onChange={setContent}
//         modules={modules}
//         style={{ flex: 1, display: "flex", flexDirection: "column" }}
//       />
//     </Box>
//   );
// };

// // CSS for highlighting and tooltips
// const css = `
//   .highlight {
//     background-color: yellow;
//     cursor: pointer;
//     position: relative;
//   }

//   .highlight::after {
//     content: attr(data-original);
//     position: absolute;
//     background: #333;
//     color: #fff;
//     padding: 5px;
//     border-radius: 5px;
//     top: -30px;
//     left: 0;
//     white-space: nowrap;
//     font-size: 12px;
//     display: none;
//     z-index: 10;
//   }

//   .highlight:hover::after {
//     display: block;
//   }
// `;

// // Append CSS to the document head
// const style = document.createElement("style");
// style.innerHTML = css;
// document.head.appendChild(style);
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill's CSS

// React component for the Quill editor
export const AgreementEditor: React.FC = () => {
  // Initial content with a span that has the tooltip functionality
  const [editorContent, setEditorContent] = useState<string>(
    `<p>This is some text. <span class="tooltip" data-tooltip="This is a tooltip">Hover over me!</span> And some more text.</p>`
  );

  // Handling changes in the editor content
  const handleChange = (value: string) => {
    setEditorContent(value);
  };

  // Quill modules configuration (toolbar options)
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      ["blockquote"],
      ["clean"],
    ],
  };

  return (
    <div>
      {/* Render the ReactQuill editor */}
      <ReactQuill
        value={
          '<h2>This is Big Dawg text</h2> <button type="button">Click Me!</button>'
        }
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />

      {/* Add Tooltip CSS to the page */}
      <style>
        {`
          .tooltip {
            position: relative;
            cursor: pointer;
          }

          .tooltip::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            visibility: hidden;
            opacity: 0;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 5px;
            border-radius: 4px;
            font-size: 12px;
            transition: opacity 0.2s;
          }

          .tooltip:hover::after {
            visibility: visible;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};
