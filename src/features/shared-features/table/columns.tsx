"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./components/ui/checkbox";
import { Appointment, Expense, User } from "./schemas";
import { Button } from "./components/ui/button";
const getRoleBadgeStyle = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-500/80";
    case "editor":
      return "bg-blue-500/70";
    case "user":
      return "bg-gray-500/80";
    case "manager":
      return "bg-purple-500";
    default:
      return "bg-gray-400";
  }
};

export const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("label")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("note")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue("category")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <div className="flex w-[100px] items-center">
          {type === "income" ? (
            <TrendingUp size={20} className="mr-2 text-green-500" />
          ) : (
            <TrendingDown size={20} className="mr-2 text-red-500" />
          )}
          <span className="capitalize"> {row.getValue("type")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <div className="flex w-[100px] items-center">
          <span
            className={cn(
              "capitalize",
              type === "income" ? "text-green-500" : "text-red-500"
            )}
          >
            {" "}
            {row.getValue("amount")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const UserColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  // {
  //   accessorKey: "dateOfBirth",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Date of Birth" />
  //   ),
  //   cell: ({ row }) => format(new Date(row.original.dateOfBirth), "PPP"),
  // },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");

      return (
        <span
          className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${
            isActive ? "bg-green-500/70" : "bg-yellow-400/60"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role: string = row.getValue("role");

      return (
        <span
          className={` py-1.5 min-w-[75px] text-center inline-block rounded-full text-white text-sm font-medium ${getRoleBadgeStyle(
            role
          )}`}
        >
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
  },
  {
    accessorKey: "lastActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Active" />
    ),
    cell: ({ row }) => format(new Date(row.original.lastActive), "PPP"),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const AppointmentColumns: ColumnDef<Appointment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
  },
  // {
  //   accessorKey: "dateOfBirth",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Date of Birth" />
  //   ),
  //   cell: ({ row }) => format(new Date(row.original.dateOfBirth), "PPP"),
  // },
  {
    accessorKey: "deriveId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Id" />
    ),
  },
  {
    accessorKey: "selectedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => format(new Date(row.original.selectedDate), "PPP"),
    // cell: ({ row }) => {
    //   const role: string = row.getValue("role");

    //   return (
    //     <span
    //       className={` py-1.5 min-w-[75px] text-center inline-block rounded-full text-white text-sm font-medium ${getRoleBadgeStyle(
    //         role
    //       )}`}
    //     >
    //       {role}
    //     </span>
    //   );
    // },
  },
  {
    accessorKey: "selectedTIme",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selected Time" />
    ),
    cell: ({ row }) => format(new Date(row.original.selectedTime), "PPP"),
  },
  {
    accessorKey: "isForSelf",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="For Self" />
    ),
    cell: ({ row }) => {
      const isForSelf = row.getValue("isForSelf");

      return (
        <span
          className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${
            isForSelf ? "bg-green-500/70" : "bg-yellow-400/60"
          }`}
        >
          {isForSelf ? "True" : "False"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdby",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const ServiceColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Service Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "estimatedDuration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
  },
  // {
  //   accessorKey: "dateOfBirth",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Date of Birth" />
  //   ),
  //   cell: ({ row }) => format(new Date(row.original.dateOfBirth), "PPP"),
  // },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  // {
  //   accessorKey: "visibility",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Visibility" />
  //   ),
  // },
  // {
  //   accessorKey: "createdBy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created By" />
  //   ),
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Created At" />
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const NotificationColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Service Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "estimatedDuration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
