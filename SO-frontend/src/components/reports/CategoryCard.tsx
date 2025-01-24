import { Card, CardContent, Typography } from "@mui/material";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
interface CategoryProps {
  category: string;
  frequency: number;
}
export const CategoryCard = ({ category, frequency }: CategoryProps) => {
  return (
    <Card sx={{ width: "100%", padding: 1, backgroundColor: "#ffecec" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={16}>{category}</Typography>
        <Typography fontWeight={"bold"}>{frequency}</Typography>
      </CardContent>
    </Card>
  );
};
