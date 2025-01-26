import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { FileDropArea } from "../common/FileDropArea";

// TypeScript interfaces for the data structure
interface Party {
  id: string;
  name_in_agreement: string;
}

interface Provisions {
  effective_date?: string;
  expiration_date?: string;
  execution_date?: string;
  term_length?: string;
  assignment_type?: string;
  assignment_termination_rights?: string;
  payment_terms_due_date?: string;
  can_charge_late_payment_fees?: boolean;
  renewal_type?: string;
  renewal_notice_period?: string;
  renewal_notice_date?: string;
  auto_renewal_term_length?: string;
  termination_period_for_convenience?: string;
}

const modalStyle = {
  position: "absolute",
  bottom: "50%",
  left: "35%",
  width: 400,
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh",
  padding: "1rem",
};

const modalFooterStyle = {
  borderTop: "1px solid #ddd",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
};

interface NavExtractions {
  id: string;
  file_name: string;
  type: string;
  category: string;
  status: string;
  parties: Party[];
  provisions: Provisions;
  languages: string[];
  source_name: string;
  source_id: string;
  source_account_id: string;
  metadata: {
    created_at: string;
    modified_at: string;
  };
}

export interface Agreement {
  _id: string;
  document_id: string;
  document_text: string;
  obligations: any[];
  navigator_extractions: NavExtractions;
  signature_metadata: {
    envelope_id: string;
    signature_status: string;
  };
  clauses: any[];
  versions: string[];
}

enum SignStatus {
  REVIEW = "Review",
  SIGNING = "Signature",
  COMPLETED = "Completed",
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.value}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "signStatus",
    headerName: "Status",
    width: 100,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "fileName",
    headerName: "File Name",
    width: 200,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "parties",
    headerName: "Parties",
    width: 300,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    width: 130,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    width: 130,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
];

export default function NavFileGrid() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const [files, setFiles] = useState<File[] | null>([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState("Under Review");
  const handleClose = () => setOpenUploadModal(false);

  const transformData = (data: Agreement[]): any[] => {
    return data.map((agreement) => ({
      id: agreement.navigator_extractions.id,
      signStatus: agreement.signature_metadata.signature_status,
      fileName: agreement.navigator_extractions.file_name,
      type: agreement.navigator_extractions.type,
      category: agreement.navigator_extractions.category,
      status: agreement.navigator_extractions.status,
      parties: agreement.navigator_extractions.parties
        .map((party) => party.name_in_agreement)
        .join(", "),
      provisions: agreement.navigator_extractions.provisions,
      effectiveDate: agreement.navigator_extractions.provisions.effective_date,
      expirationDate:
        agreement.navigator_extractions.provisions.expiration_date,
    }));
  };
  const fetchNavGridData = async () => {
    setIsLoggedIn(true);
    setIsDataLoading(true);
    try {
      const response = await axios.get<Agreement[]>(
        "http://localhost:8000/v1/documents/files/ALL/LATEST"
      );
      console.log("response is ", response.data);
      setRows(transformData(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };
  // const fetchNavAPIExtractedData = async () => {
  //   setIsLoggedIn(true);
  //   setIsDataLoading(true);
  //   try {
  //     const response = await axios.get<Agreement[]>(
  //       "http://localhost:8000/v1/documents/navigator/ALL"
  //     );
  //     console.log("response is ", response.data);
  //     setRows(transformData(response.data));
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsDataLoading(false);
  //   }
  // };

  const handleNavAPILogin = async () => {
    window.location.href = "http://localhost:8000/v1/documents/login";
  };
  const handleEsignAPILogin = async () => {
    window.location.href = "http://localhost:8000/v1/documents/docusign/login";
  };
  const uploadFiles = async () => {
    const formData = new FormData();

    // Append additional files if any
    if (files) {
      files.forEach((file) => formData.append("docs", file));
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Upload succeeded");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new WebSocket("ws://localhost:8000/docusign/ws");

    // Handle incoming messages
    socket.onmessage = (event) => {
      setSignatureStatus(event.data); // Update the state with the received message
    };

    // Handle socket closure
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup the WebSocket connection
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <Button onClick={() => setOpenUploadModal(true)}> Upload Files</Button>
      <Typography>{signatureStatus}</Typography>
      {openUploadModal && (
        <Modal
          sx={modalStyle}
          open={openUploadModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <FileDropArea setFiles={setFiles} />
            <Box sx={modalFooterStyle}>
              <Button
                onClick={uploadFiles}
                variant="contained"
                color="success"
                sx={{ width: "100%" }}
              >
                Upload Files
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      <Box>
        <Typography>Navigator Login</Typography>
        <Button
          onClick={handleNavAPILogin}
          variant="contained"
          color="secondary"
        >
          Nav Login
        </Button>
      </Box>
      <Box m={2}>
        <Button
          onClick={handleEsignAPILogin}
          variant="contained"
          color="secondary"
        >
          Esign Login
        </Button>
      </Box>
      <Box m={2}>
        <Button onClick={fetchNavGridData}> Get Data </Button>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        {isDataLoading ? (
          <Typography>Loading data...</Typography>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </div>
  );
}
