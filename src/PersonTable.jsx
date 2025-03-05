import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const PersonTable = () => {

    const [data, setData] = useState([
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
    ]);

    const columns = [
        columnHelper.accessor("id", { header: "ID" }),
        columnHelper.accessor("name", { header: "Name" }),
        columnHelper.accessor("age", { header: "Age" }),
        columnHelper.accessor("email", { header: "Email" }),
        columnHelper.accessor("address", { header: "Address" })
    ];

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const table = useReactTable({
        data,
        columns,
        pageCount: Math.ceil(data.length / pageSize),
        state: {
            pagination: {
                pageIndex,
                pageSize
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: (updater) => {
            const newState = updater({
                pageIndex,
                pageSize
            });
            setPageIndex(newState.pageIndex);
            setPageSize(newState.pageSize);
        }
    });

    const addRow = () => {
        const newRow = {
            id: data.length + 1,
            name: "New Person",
            age: 25,
            email: "new.person@example.com",
            address: "789 Oak St., SF"
        };
        setData((prevData) => [newRow, ...prevData])
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Person Details</h2>
            <button onClick={addRow} style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                Add New Person
            </button>
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

            <div style={{ marginTop: "20px" }}>
                    <button
                    onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                    disabled={pageIndex === 0}
                    style={{ padding: "5px 10px", marginRight: "5px" }}
                    >
                        Previous
                    </button>
                    <span> Page {pageIndex +1} of {Math.ceil(data.length / pageSize )}</span>
                    <button
                    onClick={() => setPageIndex(Math.min(Math.ceil(data.length / pageSize) - 1, pageIndex + 1))}
                    disabled={ pageIndex === Math.ceil(data.length / pageSize) - 1}
                    style={{ padding: "5px 10px", marginLeft: "5px"}}
                    >
                        Next
                    </button>
            </div>
        </div>
    );
};

export default PersonTable;
