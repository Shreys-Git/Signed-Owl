import { Card } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", lowRisk: 30, mediumRisk: 50, highRisk: 70 },
  { month: "Feb", lowRisk: 40, mediumRisk: 55, highRisk: 75 },
  { month: "Mar", lowRisk: 35, mediumRisk: 60, highRisk: 80 },
  { month: "Apr", lowRisk: 50, mediumRisk: 65, highRisk: 85 },
  { month: "May", lowRisk: 60, mediumRisk: 70, highRisk: 90 },
  { month: "Jun", lowRisk: 70, mediumRisk: 80, highRisk: 95 },
];

const RiskReport = () => {
  return (
    <Card sx={{ width: "100%", height: "60vh" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="lowRisk"
            stroke="#6FA3EF" // Blue border
            fill="rgba(111, 163, 239, 0.5)" // Pastel blue with transparency
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="mediumRisk"
            stroke="#FF857A" // Pink border
            fill="rgba(255, 133, 122, 0.5)" // Pastel pink with transparency
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="highRisk"
            stroke="#FFC074" // Peach border
            fill="rgba(255, 192, 116, 0.5)" // Pastel peach with transparency
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RiskReport;
