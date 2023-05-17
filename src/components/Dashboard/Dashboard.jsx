import { Card, Title, Text, Tab, TabList, Grid, Metric } from "@tremor/react";

import { useState } from "react";
import PrimaryDash from "./PrimaryDash";
import SecondaryDash from "./SecondaryDash";

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState("1");
  return (
    <main className="w-full h-full px-8 py-8 bg-slate-100">
      <Metric>Dashboard</Metric>
      <Text className="py-1">Optimizing Immutable's performance with tracking crime logs and key metrics in real-time for data-driven decision making</Text>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Overview" />
        <Tab value="2" text="Detail" />
      </TabList>

      {selectedView === "1" ? (
        <PrimaryDash />
      ) : (
        <SecondaryDash />
      )}
    </main>
  );
}