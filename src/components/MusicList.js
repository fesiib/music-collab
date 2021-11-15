import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useTable, usePagination, useBlockLayout} from 'react-table';

import musicData from '../data/musicData';
import { openPanel } from '../reducers/homepagePanel';
import GenericButton from './GenericButton';

const ALLOWED_HEADERS = {
    'trackTitle': 'Track',
    'author': 'Author',
    'genre': 'Genre',
    'cntVersions': '#Versions',
    'cntCollab': '#Collaborators',
    'duration': 'Duration',
};

const DEF_PROPS = {
    headers: ['trackTitle', 'author', 'genre', 'cntVersions', 'cntCollab', 'duration'],
    voting: false,
    panel: true,
    cntRows: 20,
    pageCount: 9,
    className: "",
}


function Table(props) {
    const dispatch = useDispatch();

    const parentProps = props.parentProps;

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
            pageCount: parentProps.pageCount,
        },
        useBlockLayout,
        usePagination,
    );

    const rowClick = (row) => {
        if (parentProps.panel)
            _openPanel();
        console.log(row);
    }

    return (
        <div className={"w-full overflow-x-scroll " + parentProps.className} >
            <table {...getTableProps({
                className:'mx-auto table-auto divide-y-2'
            })}>
                <thead className="sticky top-0 bg-gray-100">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps({
                            className: "text-gray-600"
                        })}>
                            <th className="p-2 text-left invisible">
                                Button
                            </th>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(
                                        {
                                            className: "p-2 text-left"
                                        }
                                    )}>
                                        {column.render('Header')}
                                    </th>
                                ))
                            }
                            {
                                (parentProps.voting ? (
                                    <th className="p-2 text-left invisible">
                                        Voting
                                    </th>
                                ):(<></>))
                            }
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps({
                    className:'mt-2 mx-auto table-auto divide-y-2'
                })}>
                    {rows.map(
                        (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps({
                                className: "max-h-14",
                                onClick: () => rowClick(row),
                            })}>
                                <td className="p-2">
                                    <GenericButton title={"Play"} className='w-12'/>
                                </td>
                        
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps({
                                        className: "p-2 text-left overflow-ellipsis overflow-hidden"
                                        })}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                                {
                                    (parentProps.voting ? (
                                        <td className="p-2">
                                            <GenericButton title={"Vote"} className='w-12'/>
                                        </td>
                                    ):(<></>))
                                }
                            </tr>
                        )}
                    )}
                </tbody>
            </table>
        </div>
    )
}

function MusicList(props) {
    props = {
        ...DEF_PROPS,
        ...props,
    };
    const columns = React.useMemo(
        () => {
            let headers = [];
            for (let header of props.headers) {
                if (ALLOWED_HEADERS.hasOwnProperty(header)) {
                    headers.push({
                        Header: ALLOWED_HEADERS[header],
                        accessor: header,
                    })
                }
            }
            return headers;
        },
        []
    )

    let data = React.useMemo(() => musicData(30), [])
    return (
        <Table columns={columns} data={data} parentProps={props}/>
    )
}

export default MusicList;