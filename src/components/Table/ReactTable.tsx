import { useFilters, useSortBy, useGlobalFilter, useTable, usePagination } from "react-table";
import { GlobalFilter } from "../GlobalFilter/GlobalFilter";


export default function TasksTable({ columns, data}) {


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageIndex,
        pageOptions,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = useTable(
        {
            columns,
            data,
            initialState:{pageIndex:0, pageSize:30}
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    
    return (

        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, idx) => (
                                    <td scope="row"{...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div><strong hidden={data.length <= 30}>Pagina {state.pageIndex+1} de {pageOptions.length}</strong></div>
            <button className="btn btn-secondary" onClick={() => previousPage()} hidden={!canPreviousPage || data.length <= 30}>Anterior</button>
            <button className="btn btn-secondary" onClick={() => nextPage()} hidden={!canNextPage || data.length <= 30}>Siguiente</button>
        </>
    )
}