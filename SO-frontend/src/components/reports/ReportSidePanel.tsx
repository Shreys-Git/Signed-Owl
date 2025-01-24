import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { CategoryCard } from "./CategoryCard";

export const ReportSidePanel = () => {
  const categoryFrequency = [
    { category: "MOU", frequency: 10 },
    { category: "NDA", frequency: 4 },
    { category: "Credit", frequency: 20 },
  ];

  return (
    <Card
      sx={{
        width: "300px",
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        marginLeft: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 2,
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Typography variant="h6" component="div">
          Category Frequencies
        </Typography>
      </Box>
      <CardContent
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 2,
        }}
      >
        <List>
          {categoryFrequency.map((category, index) => (
            <ListItem
              key={index}
              sx={{
                padding: 1,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <CategoryCard
                category={category.category}
                frequency={category.frequency}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
