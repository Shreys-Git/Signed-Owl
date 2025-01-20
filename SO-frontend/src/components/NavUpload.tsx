import React, { useState } from "react";
import Dropzone, { DropzoneState } from "react-dropzone";

type UploadedFile = {
  name?: string;
  link?: string;
  id?: string;
};

export const NavUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({ name: file.name }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  //   const handleGoogleDriveUpload = () => {
  //     const developerKey = "YOUR_GOOGLE_DEVELOPER_KEY";
  //     const clientId = "YOUR_GOOGLE_CLIENT_ID";
  //     const scope = ["https://www.googleapis.com/auth/drive.file"];

  //     (window as any).gapi.load("client:auth2", () => {
  //       (window as any).gapi.auth2.init({ client_id: clientId }).then(() => {
  //         (window as any).gapi.auth2
  //           .getAuthInstance()
  //           .signIn({ scope })
  //           .then(() => {
  //             (window as any).gapi.load("picker", () => {
  //               const picker = new (window as any).google.picker.PickerBuilder()
  //                 .setAppId(clientId)
  //                 .setDeveloperKey(developerKey)
  //                 .addView((window as any).google.picker.ViewId.DOCS)
  //                 .setCallback((data: any) => {
  //                   if (
  //                     data.action === (window as any).google.picker.Action.PICKED
  //                   ) {
  //                     const file = data.docs[0];
  //                     setFiles((prevFiles) => [...prevFiles, file]);
  //                   }
  //                 })
  //                 .build();
  //               picker.setVisible(true);
  //             });
  //           });
  //       });
  //     });
  //   };

  //   const handleDropboxUpload = () => {
  //     const options = {
  //       success: (files: any[]) => {
  //         const newFiles = files.map((file) => ({
  //           link: file.link,
  //           name: file.name,
  //         }));
  //         setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  //       },
  //       cancel: () => {},
  //       linkType: "preview",
  //       multiselect: true,
  //       folderselect: false,
  //     };

  //     (window as any).Dropbox.choose(options);
  //   };

  return (
    <div>
      <h2>Upload Files</h2>

      {/* Local File Upload */}
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }: DropzoneState) => (
          <div
            {...getRootProps({
              style: {
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              },
            })}
          >
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to select files</p>
          </div>
        )}
      </Dropzone>

      {/* Google Drive Upload */}
      {/* <button onClick={handleGoogleDriveUpload}>
        Upload from Google Drive
      </button> */}

      {/* Dropbox Upload */}
      {/* <button onClick={handleDropboxUpload}>Upload from Dropbox</button> */}

      {/* Display Uploaded Files */}
      <h3>Uploaded Files:</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name || file.link || file.id}</li>
        ))}
      </ul>
    </div>
  );
};
