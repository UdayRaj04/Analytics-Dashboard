"use client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts";



// export const ChartSection = ({ metrics }: { metrics: any }) => {
//   const data = metrics.campaigns.map((c: any) => ({
//     name: c.campaign,
//     impressions: c.impressions,
//     clicks: c.clicks,
//   }));
//   const pieData = [
//     { name: "Clicks", value: data.reduce((sum: any, d: any) => sum + d.clicks, 0) },
//     { name: "Impressions", value: data.reduce((sum: any, d: any) => sum + d.impressions, 0) },
//   ];
//   const COLORS = ["#4f46e5", "#10b981"];

type Campaign = {
  campaign: string;
  impressions: number;
  clicks: number;
};

type Metrics = {
  revenue: number;
  users: number;
  conversions: number;
  growth: number;
  campaigns: Campaign[];
};

export const ChartSection = ({ metrics }: { metrics: Metrics }) => {
  const data = metrics.campaigns.map((c) => ({
    name: c.campaign,
    impressions: c.impressions,
    clicks: c.clicks,
  }));

  const pieData = [
    {
      name: "Clicks",
      value: data.reduce((sum, d) => sum + d.clicks, 0),
    },
    {
      name: "Impressions",
      value: data.reduce((sum, d) => sum + d.impressions, 0),
    },
  ];

  const COLORS = ["#4f46e5", "#10b981"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" height={60} interval="preserveStartEnd" />
            <YAxis />
            <Tooltip />
            <Line dataKey="clicks" stroke={COLORS[0]} animationDuration={500} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" height={60} interval="preserveStartEnd" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="impressions" fill={COLORS[1]} animationDuration={500} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} animationDuration={500}>
              {pieData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};