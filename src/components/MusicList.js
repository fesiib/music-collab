import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useTable, usePagination, useBlockLayout} from 'react-table';

import musicData from '../data/musicData';
import { openPanel } from '../reducers/homepagePanel';
import GenericButton from './GenericButton';

function Table(props) {
    const dispatch = useDispatch();

    const { panelState } = useSelector(state => state.homepagePanel);

    const _openPanel = () => {
        dispatch(openPanel());
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // page,
        // canPreviousPage,
        // canNextPage,
        // pageOptions,
        // pageCount,
        // gotoPage,
        // nextPage,
        // previousPage,
        // setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: props.columns,
            data: props.data,
            initialState: {pageIndex: 0},
            manualPagination: true,
            pageCount: props.pageCount,
        },
        useBlockLayout,
        usePagination,
    );

    const rowClick = (row) => {
        _openPanel();
        console.log(row);
    }

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
                            <th {...column.getHeaderProps(
                                {
                                    className: "p-2 text-left"
                                }
                            )}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                {/* <span>
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                                </span> */}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps({
                className:'mx-auto table-fixed divide-y-2'
            })}>
                {rows.map(
                    (row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps({
                            className: "max-h-14",
                            onClick: () => rowClick(row),
                        })}>
                            {row.cells.map(cell => {
                                if (cell.column.Header === 'Track') {
                                    return (
                                        <td {...cell.getCellProps({
                                            className: "p-2 text-left overflow-ellipsis overflow-hidden"
                                        })}>
                                            <GenericButton title={"Play"}/>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                }
                                return (
                                    <td {...cell.getCellProps({
                                    className: "p-2 text-left overflow-ellipsis overflow-hidden"
                                    })}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    )}
                )}
            </tbody>
        </table>
        <br />
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

    const data = React.useMemo(() => musicData(30), [])

    return (
        <Table columns={columns} data={data} cntRows={20} pageCount={8}/>
    )
}

export default MusicList;