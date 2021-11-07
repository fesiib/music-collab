import React from 'react';

import {useTable, useSortBy} from 'react-table';

import musicData from '../data/musicData';

function Table(props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: props.columns,
            data: props.data,
        },
        useSortBy
    );

    const firstPageRows = rows.slice(0, props.cntRows);

    return (
        <>
        <table {...getTableProps({
            className:'mx-auto table-fixed divide-y-2'
        })}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps({
                        className: "text-gray-400"
                    })}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps(
                                {
                                    className: "p-2"
                                }
                            ))}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                <span>
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps({
                className:'mx-auto divide-y-2'
            })}>
                {firstPageRows.map(
                    (row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps({
                            className: "h-15"
                        })}>
                            {row.cells.map(cell => {
                                return (
                                <td {...cell.getCellProps({
                                    className: "p-2"
                                })}>{cell.render('Cell')}</td>
                                )
                            })}
                        </tr>
                    )}
                )}
            </tbody>
        </table>
        <br />
        <div>Showing the first {props.cntRows} results of {rows.length} rows</div>
        </>
    )
}

function MusicList(props) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Track',
                accessor: 'trackTitle',
            },
            {
                Header: 'Author',
                accessor: 'author',
            },
            {
                Header: 'Genre',
                accessor: 'genre',
            },
            {
                Header: '#Versions',
                accessor: 'cntVersions',
            },
            {
                Header: '#Collaborators',
                accessor: 'cntCollab',
            },
            {
                Header: 'Duration',
                accessor: 'duration',
            },
        ],
        []
    )

    const data = React.useMemo(() => musicData(2000), [])

    return (
        <Table columns={columns} data={data} cntRows={8}/>
    )
}

export default MusicList;