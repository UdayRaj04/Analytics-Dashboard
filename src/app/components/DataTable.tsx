"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthDate: string; // added for date filtering
};

import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



export const DataTable = ({ rows }: { rows: any[] }) => {
const [data, setData] = useState<User[]>(rows || []);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/users?limit=100");
      const json = await res.json();
      // add mock birthDate (date strings within last 100 days)
      const enriched = json.users.map((u: any, i: number) => ({
        ...u,
        birthDate: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10)
      }));
      setData(enriched);
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(s) || user.email.toLowerCase().includes(s);
      });
    }

    if (startDate || endDate) {
      filtered = filtered.filter((user) => {
        const date = user.birthDate;
        return (!startDate || date >= startDate) && (!endDate || date <= endDate);
      });
    }

    filtered = filtered.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }

      return 0;
    });

    return filtered;
  }, [data, search, startDate, endDate, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const exportToCSV = () => {
  const csv = Papa.unparse(filteredData); // Replace `data` with filtered or all data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToPDF = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [Object.keys(filteredData[0])],
    body: filteredData.map((row) => Object.values(row)),
  });
  doc.save("data.pdf");
};

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
  {/* Search Input */}
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <h2>Filter</h2>
    <Input
      id="search"
      className="min-w-[320px] max-w-sm"
      placeholder="Search name or email..."
      value={search}
      onChange={(e) => {
        setCurrentPage(1);
        setSearch(e.target.value);
      }}
    />
  </div>

  {/* Date Filter */}
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <Input
      id="startDate"
      type="date"
      className="min-w-[160px]"
      value={startDate}
      onChange={(e) => {
        setStartDate(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>
</div>

        {/* <Input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setCurrentPage(1);
          }}
        /> */}
      </div>

      <Table className="min-w-full border border-zinc-300 dark:border-zinc-700">
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
              ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("firstName")} className="cursor-pointer">
              Name {sortField === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
              Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("age")} className="cursor-pointer">
              Age {sortField === "age" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead onClick={() => handleSort("birthDate")} className="cursor-pointer">
              Date {sortField === "birthDate" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.birthDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedData.length} of {filteredData.length} users | Page {currentPage} of {totalPages}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="flex gap-3 justify-end mb-4 py-4">
  <button
    onClick={exportToCSV}
    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
  >
    Export CSV
  </button>
  <button
    onClick={exportToPDF}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
  >
    Export PDF
  </button>
</div>

    </div>

  );
};