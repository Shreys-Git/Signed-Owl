import { Box } from "@mui/material";
import { ClientDataCard } from "./ClientDataCard";
import RiskReport from "./RiskReport";
import { ReportSidePanel } from "./ReportSidePanel";

const cards = [
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
];
const colors = ["#f8ecfc", "#f8e6f6", "#f8e9ee"];

export const ClientReport = () => {
  return (
    <Box display="flex" m={1}>
      <Box flexGrow={1}>
        <Box display="flex" alignContent={"space-between"} gap={2} mb={2}>
          {cards.map((card, index) => (
            <ClientDataCard
              title={card.title}
              description={card.description}
              quantity={card.quantity}
              color={colors[index % colors.length]} // Cycle through the colors array
            />
          ))}
        </Box>

        <RiskReport />
      </Box>
      <ReportSidePanel />
      {/* <ClientDataGrid /> */}
    </Box>
  );
};
