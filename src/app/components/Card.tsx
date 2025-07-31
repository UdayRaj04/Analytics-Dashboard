import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type Metrics = {
  revenue: number;
  users: number;
  conversions: number;
  growth: number;
};

export const CardList = ({ metrics }: { metrics: Metrics }) => {
  const cards = [
    { label: "Revenue", value: `$${metrics.revenue.toLocaleString()}` },
    { label: "Users", value: metrics.users.toLocaleString() },
    { label: "Conversions", value: metrics.conversions.toLocaleString() },
    { label: "Growth", value: `${metrics.growth}%`, highlight: true },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <Card key={i} className={`transition-shadow hover:shadow-lg ${c.highlight ? "border-2 border-green-500" : ""}`}>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">{c.label}</p>
            <h2 className="text-3xl font-semibold mt-1">{c.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};