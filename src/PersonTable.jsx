import React from "react";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const PersonTable = () => {

    const data = [
        {
            id: 1,
            name: "John Doe",
            age: 30,
            email: "john.doe@example.com",
            address: "123 Main St, New York, NY 10001"
        },
        {
            id: 2,
            name: "Jane Smith",
            age: 25,
            email: "jane.smith@example.com",
            address: "456 Elm St, Los Angeles, CA 90001"
        }
    ]

    const columns = [
        columnHelper.accessor("id", { header: "ID" }),
        columnHelper.accessor("name", { header: "Name" }),
        columnHelper.accessor("age", { header: "Age" }),
        columnHelper.accessor("email", { header: "Email" }),
        columnHelper.accessor("address", { header: "Address" })
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Person Details</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) =>  (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default PersonTable;
