import { useTable } from "react-table";


export default function TasksTable({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        visibleColumns,
        prepareRow,
    } = useTable({
        columns,
        data,
    },
    );

    return (
        <table {...getTableProps()}>
            <thead>
                <tr>
                    <th
                        colSpan={visibleColumns.length}
                        style={{
                            textAlign: "center",
                        }}>
                    </th>
                </tr>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}