import { Card, CardContent, Typography } from "@mui/material";

interface DataCardProps {
  title: string;
  description: string;
  quantity: string;
  color: string;
}
export const ClientDataCard = ({
  title,
  description,
  quantity,
  color,
}: DataCardProps) => {
  return (
    <Card sx={{ backgroundColor: color, flexGrow: "1" }}>
      <CardContent>
        <Typography fontSize={18} fontWeight={"bold"} fontFamily={"roboto"}>
          {title}
        </Typography>
        <Typography fontSize={14} paddingBottom={2} fontFamily={"roboto"}>
          {description}
        </Typography>
        <Typography fontSize={28} fontWeight={"bold"} fontFamily={"roboto"}>
          {quantity}
        </Typography>
      </CardContent>
    </Card>
  );
};
