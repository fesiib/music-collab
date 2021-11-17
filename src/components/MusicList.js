import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useTable, usePagination, useBlockLayout, useFlexLayout} from 'react-table';

import { openPanel } from '../reducers/homepage/homepagePanel';
import GenericButton from './GenericButton';

const ALLOWED_HEADERS = {
    'trackTitle': {
        header: 'Track',
        width: 150,
    },
    'owner': {
        header: 'Owner',
        width: 130,
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

export const TRANSFORM_POPULAR = "popular";
export const TRANSFORM_AUTHOR = "author";
export const TRANSFORM_OWNER = 'owner';

const DEF_PROPS = {
    headers: ['trackTitle', 'genre', 'author', 'owner', 'cntVersions', 'cntCollab', 'duration'],
    panel: true,
    cntRows: 20,
    pageCount: 9,
    className: "",
    filter: {},
    transform: TRANSFORM_POPULAR,
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
                                                {//<GenericButton title={"Vote"} className='w-12'/>
                                                }
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

function filterData(filter, data) {
    /*
        filter = {
            project_authordId: ['']
            version_authorId: ['']
            genres: [''],
            title_description: [''],
            priority: 'pop', 'recency',
            instrument: [''],
        }
    */
    return data;
}

function getCollaborators(project) {
    let collaborators = new Set();
    for (let versionId in project.versions) {
        collaborators.add(project.versions[versionId].metaInfo.authorId);
    }
    return collaborators;
}

function getPopularVersionId(project) {
    let popularVersionId = null;
    for (let versionId in project.versions) {
        if (popularVersionId === null
            || project.versions[versionId].metaInfo.votes > project.versions[popularVersionId].metaInfo.votes
        ) {
            popularVersionId = versionId;
        }
    }
    return popularVersionId;
}

function transformSingleVersion(profiles, project, version, collaborators) {
    let single = {
        trackTitle: project.metaInfo.trackTitle,
        genre: project.metaInfo.genre,
        author: profiles[version.metaInfo.authorId].metaInfo.name,
        owner: profiles[project.metaInfo.ownerId].metaInfo.name,
        cntVersions: Object.keys(project.versions).length,
        cntCollab: collaborators.size - 1,
        duration: version.metaInfo.duration,
        votes: version.metaInfo.votes,
        playButton: version.tracks.map(track => track.url),
    };
    console.log(single);
    return single;
}

function transformProjects_owner(projects, profiles, ownerId) {
    let data = [];
    if (!profiles.hasOwnProperty(ownerId)) {
        return [];
    }
    const owner = profiles[ownerId];
    for (let projectId of owner.projectIds) {
        const project = projects[projectId];
        const popularVersionId = getPopularVersionId(project);

        if (popularVersionId === null) {
            continue;
        }
        const collaborators = getCollaborators(project);
        const version = project.versions[popularVersionId];
        data.push(transformSingleVersion(profiles, project, version, collaborators));
    }
    return data;
}

function transformProjects_author(projects, profiles, authorId) {
    let data = [];
    if (!profiles.hasOwnProperty(authorId)) {
        return [];
    }
    const author = profiles[authorId];
    for (let obj of author.versionIds) {
        const projectId = obj.projectId;
        const versionId = obj.versionId;
        
        const project = projects[projectId];
        const version = project.versions[versionId];
        const collaborators = getCollaborators(project);
        data.push(transformSingleVersion(profiles, project, version, collaborators));
    }
    return data;
}

function transformProjects_popular(projects, profiles) {
    //['trackTitle', 'genre', 'author', 'owner', 'cntVersions', 'cntCollab', 'duration', 'votes', 'playButton']
    let data = [];
    for (let projectId in projects) {
        const project = projects[projectId];
        const popularVersionId = getPopularVersionId(project);

        if (popularVersionId === null) {
            continue;
        }

        const collaborators = getCollaborators(project);
        const version = project.versions[popularVersionId];
        data.push(transformSingleVersion(profiles, project, version, collaborators));
    }
    return data;
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

    const { projects, profiles, userId } = useSelector(state => state.database);


    const filteredProjects = projects;
    //const data = filterData(props.filter, projects);

    const data = React.useMemo(() => {
        if (props.transform === TRANSFORM_POPULAR) {
            return transformProjects_popular(filteredProjects, profiles);
        }
        if (props.transform === TRANSFORM_AUTHOR) {
            return transformProjects_author(filteredProjects, profiles, userId);
        }
        if (props.transform === TRANSFORM_OWNER) {
            return transformProjects_owner(filteredProjects, profiles, userId);
        }
        return transformProjects_popular(filteredProjects, profiles);
    }, [filteredProjects, profiles, props.transform, userId]);

    return (
        <Table columns={columns} data={data} parentProps={props}/>
    )
}

export default MusicList;