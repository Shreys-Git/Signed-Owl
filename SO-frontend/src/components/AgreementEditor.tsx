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
