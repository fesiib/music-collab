import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useTable, usePagination, useBlockLayout, useFlexLayout} from 'react-table';

import musicData from '../data/musicData';
import { openPanel } from '../reducers/homepage/homepagePanel';
import GenericButton from './GenericButton';

const ALLOWED_HEADERS = {
    'trackTitle': {
        header: 'Track',
        width: 200,
    },
    'author': {
        header: 'Author',
        width: 130,
    },
    'genre': {
        header: 'Genre',
        width: 100,
    },
    'cntVersions': {
        header: '#Versions',
        width: 100,
    },
    'cntCollab': {
        header: '#Collborators',
        width: 120,
    },
    'duration': {
        header: 'Duration',
        width: 90,
    },
    'playButton': {
        header: '',
        width: 60,    
    },
    'votes': {
        header: '',
        width: 60,    
    },
};

const DEF_PROPS = {
    headers: ['trackTitle', 'author', 'genre', 'cntVersions', 'cntCollab', 'duration'],
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

    const defaultColumn = React.useMemo(
        () => ({
          minWidth: 30, // minWidth is only used as a limit for resizing
          width: 150, // width is used for both the flex-basis and flex-grow
          maxWidth: 400, // maxWidth is only used as a limit for resizing
        }),
        []
      )

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
            defaultColumn,
        },
        useBlockLayout,
        usePagination,
        useFlexLayout,
    );

    const rowClick = (row) => {
        if (parentProps.panel)
            _openPanel();
        console.log(row);
    }

    return (
        <div className={"overflow-x-scroll grid justify-items-center " + parentProps.className} >
            <table {...getTableProps({
                className: ''
            })}>
                <thead className="sticky top-0 bg-gray-100">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps({
                            className: "text-gray-600"
                        })}>
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
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps({
                    className: 'divide-y-2'
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
                                    console.log(cell.column);
                                    if (cell.column.id === 'playButton') {
                                        return (
                                            <td {...cell.getCellProps({
                                                className: "p-2"
                                            })}>
                                                <GenericButton title={"Play"} className='w-12'/>
                                            </td>
                                        );
                                    }
                                    if (cell.column.id === 'votes') {
                                        return (
                                            <td {...cell.getCellProps({
                                                className: "p-2"
                                            })}>
                                                <GenericButton title={"Vote"} className='w-12'/>
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
            let headers = [{
                Header: ALLOWED_HEADERS['playButton'].header,
                accessor: 'playButton',
                width: ALLOWED_HEADERS['playButton'].width,
            }];
            for (let accessor of props.headers) {
                if (ALLOWED_HEADERS.hasOwnProperty(accessor)) {
                    headers.push({
                        Header: ALLOWED_HEADERS[accessor].header,
                        accessor: accessor,
                        width: ALLOWED_HEADERS[accessor].width,
                    })
                }
            }
            if (props.votes) {
                headers.push({
                    Header: ALLOWED_HEADERS['votes'].header,
                    accessor: 'votes',
                    width: ALLOWED_HEADERS['votes'].width,
                });
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