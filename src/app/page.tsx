"use client";
import React, { useEffect, useState } from "react";
import { CardList } from "../app/components/Card";
import { ChartSection } from "../app/components/Chart";
import { DataTable } from "../app/components/DataTable";
import { fetchMetrics } from "@/app/lib/api";
import { DarkModeToggle } from "../app/components/DarkModeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchMetrics().then(setData);
    const interval = setInterval(() => fetchMetrics().then(setData), 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
        <Header />
        <div className="flex items-center space-x-3 px-2">
          {data && <div className="italic text-sm">Updated: {new Date(data.fetchedAt).toLocaleTimeString()}</div>}
          <DarkModeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 space-y-6">
        {!data ? (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
    <div className="mt-6">
      <Skeleton className="h-72 w-full rounded-lg" />
    </div>
    <div className="mt-6">
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  </>
) : (
  <>
    <CardList metrics={data} />
    <ChartSection metrics={data} />
    <DataTable rows={data.campaigns} />
  </>
)}
      </main>

      <Footer />
    </div>
  );
}
  // return (
  //   <div className="p-4 md:p-6 lg:p-8 space-y-6">
  //     <div className="flex justify-between items-center">
  //       <h1 className="text-3xl font-bold">ADmyBRAND Insights</h1>
  //       <DarkModeToggle />
  //     </div>

  //     {data ? (
  //       <>
  //         <CardList metrics={data} />
  //         <ChartSection metrics={data} />
  //         <DataTable rows={data.campaigns} />
  //       </>
  //     ) : (
  //       <Skeleton className="h-96" />
  //     )}
  //   </div>
  // );

