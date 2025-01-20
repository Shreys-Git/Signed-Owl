import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { Login } from "./Login";

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

interface Agreement {
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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fileName", headerName: "File Name", width: 200 },
  { field: "type", headerName: "Type", width: 200 },
  { field: "category", headerName: "Category", width: 150 },
  { field: "parties", headerName: "Parties", width: 300 },
  { field: "effectiveDate", headerName: "Effective Date", width: 130 },
  { field: "expirationDate", headerName: "Expiration Date", width: 130 },
];

export default function NavFileGrid() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

  const transformData = (data: Agreement[]): any[] => {
    return data.map((agreement) => ({
      id: agreement.id,
      fileName: agreement.file_name,
      type: agreement.type,
      category: agreement.category,
      status: agreement.status,
      parties: agreement.parties
        .map((party) => party.name_in_agreement)
        .join(", "),
      provisions: agreement.provisions,
      effectiveDate: agreement.provisions.effective_date,
      expirationDate: agreement.provisions.expiration_date,
    }));
  };

  const fetchNavAPIExtractedData = async () => {
    setIsLoggedIn(true);
    setIsDataLoading(true);
    try {
      const response = await axios.get<Agreement[]>(
        "http://localhost:8000/docusign/navigator/agreements/ALL"
      );
      console.log("response is ", response.data);
      setRows(transformData(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleNavAPILogin = async () => {
    window.location.href = "http://localhost:8000/docusign/navigator/login";
  };

  return (
    <div>
      <Box>
        <Typography>Please log in to view agreements.</Typography>
        <Button onClick={handleNavAPILogin}> Login Big Boy</Button>
      </Box>
      <Box>
        <Typography>Fetch Agreements</Typography>
        <Button onClick={fetchNavAPIExtractedData}> Get Data </Button>
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
