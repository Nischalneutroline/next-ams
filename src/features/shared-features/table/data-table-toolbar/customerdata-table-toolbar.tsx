"use client";

import { Cross2Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, // ✅ Now from Shadcn-style import
} from "../components/ui/dropdown-menu"; // ✅ Local path, not @radix-ui
import { TrashIcon } from "lucide-react";

import { CalendarDatePicker } from "../../common/calender-date-picker";
import { categories, totalAppointment } from "../data";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { DataTableViewOptions } from "../data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function CustomerDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [selectedFilters, setSelectedFilters] = useState<String[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    table.getColumn("date")?.setFilterValue([from, to]);
  };

  return (
    <div className="flex flex-row sm:flex-wrap items-center justify-between gap-1">
      <div className="flex flex-wrap items-center gap-2 flex-1">
        <Input
          placeholder="Filter Full Name..."
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("fullName")?.setFilterValue(event.target.value);
          }}
          className="h-[30px] sm:h-[35px] lg:h-[36px] w-[20x0px] sm:w-[150px] lg:w-[250px] text-[12px] lg:text-[14px]"
        />

        {/* Faceted Filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Filter by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[180px]">
            <DropdownMenuLabel>Select Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuCheckboxItem
              checked={selectedFilter === "phoneNumber"}
              onSelect={() => setSelectedFilter("phoneNumber")}
            >
              Category
            </DropdownMenuCheckboxItem> */}
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes("createdBy")}
              onCheckedChange={(checked) => {
                setSelectedFilters((prev) =>
                  checked
                    ? [...prev, "createdBy"]
                    : prev.filter((f) => f !== "createdBy")
                );
              }}
            >
              Created By
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes("totalAppointments")}
              onCheckedChange={(checked) => {
                setSelectedFilters((prev) =>
                  checked
                    ? [...prev, "totalAppointments"]
                    : prev.filter((f) => f !== "totalAppointments")
                );
              }}
            >
              Total Appointments
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Conditionally Render Filters */}
        {/* {selectedFilter === "phoneNumber" && table.getColumn("phoneNumber") && (
          <DataTableFacetedFilter
            column={table.getColumn("phoneNumber")}
            title="Phone Number"
            options={categories}
          />
        )} */}
        {selectedFilters.includes("createdBy") &&
          table.getColumn("createdBy") && (
            <DataTableFacetedFilter
              column={table.getColumn("createdBy")}
              title="Created By"
              options={categories}
            />
          )}

        {selectedFilters.includes("totalAppointments") &&
          table.getColumn("totalAppointments") && (
            <DataTableFacetedFilter
              column={table.getColumn("totalAppointments")}
              title="Total Appointments"
              options={totalAppointment}
            />
          )}

        {/* Reset Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setSelectedFilters([]);
            }}
            className="h-8 px-2 lg:px-3 text-gray-400"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {/* Date Picker */}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-[30px] sm:h-[35px] lg:h-[36px] w-[200px]  lg:w-[250px] text-[11px] sm:text-[12px] lg:text-[14px] text-gray-500"
          variant="outline"
        />
      </div>

      {/* Trash / View Options */}
      <div className="flex flex-col items-end sm:items-center gap-2">
        <div className=" h-[30px] sm:h-[35px] lg:h-[36px] w-[100px]  lg:w-[250px]">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-[30px] sm:h-[35px] lg:h-[36px] w-[100px]  lg:w-[250px] text-[11px] sm:text-[12px] lg:text-[14px] text-gray-500 gap-1"
            >
              <TrashIcon className=" size-3.5 lg:size-4" />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
