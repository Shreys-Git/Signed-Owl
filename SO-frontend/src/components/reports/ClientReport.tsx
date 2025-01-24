import { Box } from "@mui/material";
import { ClientDataGrid } from "./ClientDatagrid";
import { ClientDataCard } from "./ClientDataCard";

const cards = [
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
  { id: 1, title: "Title 1", description: "Description 1", quantity: "$12000" },
];
const colors = ["#f8ecfc", "#f8e6f6", "#f8e9ee", "#ffecec"];

export const ClientReport = () => {
  return (
    <Box>
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

      {/* <ClientDataCard
        title={"Test Title"}
        description={"this is the description"}
        quantity={"$12677"}
        color={"#f8ecfc"}
      /> */}
      <ClientDataGrid />
    </Box>
  );
};
