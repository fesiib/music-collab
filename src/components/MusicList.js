import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useTable, usePagination, useBlockLayout, useFlexLayout} from 'react-table';
import ReactTimeAgo from 'react-time-ago';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import { openPanel } from '../reducers/homepage/homepagePanel';
import GenericButton from './GenericButton';
import iconUD from '../icons/updown.png';

TimeAgo.addDefaultLocale(en);

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
        width: 140,
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
    'updated': {
        header: 'Last Activity',
        width: 120,
    },
    'playButton': {
        header: '',
        width: 60,    
    },
    'votes': {
        header: '',
        width: 100,    
    },
};

export const TRANSFORM_POPULAR = "popular";
export const TRANSFORM_RECENT = "recent";
export const TRANSFORM_AUTHOR = "author";
export const TRANSFORM_OWNER = "owner";
export const TRANSFORM_POPULAR_SINGLE = "popular_single";
export const TRANSFORM_RECENT_SINGLE = "recent_single";

const DEF_PROPS = {
    headers: [],
    panel: true,
    search: false,
    cntRows: 20,
    pageCount: 9,
    className: "",
    transform: TRANSFORM_POPULAR,
    projectId: "",
    versionId: "",
}


function Table(props) {
    const dispatch = useDispatch();

    const parentProps = props.parentProps;

    const _openPanel = (projectId, versionId) => {
        dispatch(openPanel({projectId, versionId}));
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
            _openPanel(row.original.projectId, row.original.versionId);
    }

    const additionalRowClassName = useMemo(() => {
        if (parentProps.panel) {
            return "hover:bg-gray-100 cursor-pointer";
        }
        return "";
    }, [parentProps.panel]);
    console.log(parentProps.panel, additionalRowClassName);
    return (
        <div className={"overflow-x-scroll grid justify-items-center " + parentProps.className} >
            <table {...getTableProps({
                className: ''
            })}>
                <thead className="sticky top-0 bg-gray-200">
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
                {
                    rows.length === 0 ? (
                        <div className="text-lg text-center p-5"> Sorry, there are no projects with matching tags... </div>
                    ) : (
                        <tbody {...getTableBodyProps({
                            className: 'divide-y-2'
                        })}>
                            {rows.map(
                                (row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps({
                                        className: "max-h-14 " + additionalRowClassName,
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
                                                        <div className="flex flex-row w-10">
                                                            {cell.render('Cell')}
                                                            <img src={iconUD}></img>
                                                        </div>
                                                    </td>
                                                );
                                            }
                                            if (cell.column.id === 'updated') {
                                                return (
                                                    <td {...cell.getCellProps({
                                                    className: "p-2 text-left overflow-ellipsis overflow-hidden"
                                                    })}>
                                                        <ReactTimeAgo date={cell.value} timeStyle="twitter-minute" locale="en-US"/>
                                                    </td>
                                                );
                                            }
                                            if (cell.column.id === 'duration') {
                                                const mins = (Math.floor(cell.value / 60)).toString().padStart(2, "0");
                                                const secs = (cell.value % 60).toString().padStart(2, "0");;
                                                return ( <td {...cell.getCellProps({
                                                    className: "p-2 text-left overflow-ellipsis overflow-hidden"
                                                    })}>
                                                        {mins}:{secs}
                                                    </td>
                                                )
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
                    )
                }
            </table>
        </div>
    )
}

function sortByProjectCreated(p1, p2) {
    if (p2.relevance - p1.relevance !== 0) {
        return p2.relevance - p1.relevance;
    }
    if (p2.projectCreated.valueOf() - p1.projectCreated.valueOf() !== 0) {
        return p2.projectCreated.valueOf() - p1.projectCreated.valueOf();
    }
    if (p2.versionCreated.valueOf() - p1.versionCreated.valueOf() !== 0) {
        return p2.versionCreated.valueOf() - p1.versionCreated.valueOf();
    }
    if (p2.updated.valueOf() - p1.updated.valueOf() !== 0) {
        return p2.updated.valueOf() - p1.updated.valueOf();
    }
    return p2.votes - p1.votes;
}

function sortByVersionUpdated(p1, p2) {
    if (p2.relevance - p1.relevance !== 0) {
        return p2.relevance - p1.relevance;
    }
    if (p2.updated.valueOf() - p1.updated.valueOf() !== 0) {
        return p2.updated.valueOf() - p1.updated.valueOf();
    }
    if (p2.versionCreated.valueOf() - p1.versionCreated.valueOf() !== 0) {
        return p2.versionCreated.valueOf() - p1.versionCreated.valueOf();
    }
    return p2.votes - p1.votes;
}

function sortByVersionCreated(p1, p2) {
    if (p2.relevance - p1.relevance !== 0) {
        return p2.relevance - p1.relevance;
    }
    if (p2.versionCreated.valueOf() - p1.versionCreated.valueOf() !== 0) {
        return p2.versionCreated.valueOf() - p1.versionCreated.valueOf();
    }
    if (p2.updated.valueOf() - p1.updated.valueOf() !== 0) {
        return p2.updated.valueOf() - p1.updated.valueOf();
    }
    return p2.votes - p1.votes;
}

function sortByPopularity(p1, p2) {
    if (p2.relevance - p1.relevance !== 0) {
        return p2.relevance - p1.relevance;
    }
    if (p2.votes - p1.votes !== 0) {
        return p2.votes - p1.votes;
    }
    return p2.updated.valueOf() - p1.updated.valueOf();
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

function getRecentVersionId(project) {
    let recentVersionId = null;
    for (let versionId in project.versions) {
        if (recentVersionId === null
            || project.versions[versionId].metaInfo.lastModified.valueOf() > project.versions[recentVersionId].metaInfo.lastModified.valueOf()
        ) {
            recentVersionId = versionId;
        }
    }
    return recentVersionId;
}

function calculateProjectRelevance(single, tags) {
    if (tags.length === 0) {
        return 1;
    }
    let cnt = 0;
    for (let tag of tags) {
        cnt += single.tags.reduce((prev, cur) => {
            return (cur.label.toLowerCase() === tag.label.toLowerCase() ? prev + 1 : prev)            
        }, 0);
    }
    return cnt;
}

function transformSingleVersion(profiles, project, version, collaborators, projectId, versionId) {
    let single = {
        trackTitle: project.metaInfo.trackTitle,
        tags: project.metaInfo.tags,
        author: profiles[version.metaInfo.authorId].metaInfo.name,
        owner: profiles[project.metaInfo.ownerId].metaInfo.name,
        cntVersions: Object.keys(project.versions).length,
        cntCollab: collaborators.size - 1,
        duration: version.metaInfo.duration,
        updated: version.metaInfo.lastModified,
        versionCreated: version.metaInfo.creationTime,
        projectCreated: project.metaInfo.creationTime, 
        votes: version.metaInfo.votes,
        playButton: version.tracks.map(track => track.url),

        projectId,
        versionId,

        relevance: 1,
    };
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
        data.push(transformSingleVersion(profiles, project, version, collaborators, projectId, popularVersionId));
    }

    data.sort(sortByProjectCreated);
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
        data.push(transformSingleVersion(profiles, project, version, collaborators, projectId, versionId));
    }

    data.sort(sortByVersionUpdated);
    // sorted by recency
    return data;
}

function transformProjects_popular(projects, profiles, searchTags) {
    let data = [];
    for (let projectId in projects) {
        const project = projects[projectId];
        const popularVersionId = getPopularVersionId(project);

        if (popularVersionId === null) {
            continue;
        }

        const collaborators = getCollaborators(project);
        const version = project.versions[popularVersionId];
        const single = transformSingleVersion(profiles, project, version, collaborators, projectId, popularVersionId);
        const relevance = calculateProjectRelevance(single, searchTags);
        if (relevance === 0) {
            continue;
        }
        data.push({
            ...single,
            relevance,
        });
    }

    data.sort(sortByPopularity);
    return data;
}

function transformProjects_recency(projects, profiles, searchTags) {
    let data = [];
    for (let projectId in projects) {
        const project = projects[projectId];
        const recentVersionId = getRecentVersionId(project);

        if (recentVersionId === null) {
            continue;
        }

        const collaborators = getCollaborators(project);
        const version = project.versions[recentVersionId];
        const single = transformSingleVersion(profiles, project, version, collaborators, projectId, recentVersionId);
        const relevance = calculateProjectRelevance(single, searchTags);
        if (relevance === 0) {
            continue;
        }
        data.push({
            ...single,
            relevance,
        });
    }
    data.sort(sortByVersionCreated);
    return data;
}

function transformProjects_popular_single(projects, profiles, projectId, versionId) {
    let data = [];
    
    if (!projects.hasOwnProperty(projectId)) {
        return [];
    }
    const project = projects[projectId];
    
    for (let versionId in project.versions) {
        const version = project.versions[versionId];
        data.push(transformSingleVersion(profiles, project, version, new Set(), projectId, versionId));
    }

    data.sort(sortByPopularity);
    return data;
}

function transformProjects_recency_single(projects, profiles, projectId, versionId) {
    let data = [];
    
    if (!projects.hasOwnProperty(projectId)) {
        return [];
    }
    
    const project = projects[projectId];
    
    for (let versionId in project.versions) {
        const version = project.versions[versionId];
        data.push(transformSingleVersion(profiles, project, version, new Set(), projectId, versionId));
    }

    data.sort(sortByVersionUpdated);
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
    const { searchTags } = useSelector(state => state.tabInfo);

    const adjustedSearchTags = (props.search ? searchTags : []);

    let data = React.useMemo(() => {
        if (props.transform === TRANSFORM_POPULAR) {
            return transformProjects_popular(projects, profiles, adjustedSearchTags);
        }
        if (props.transform === TRANSFORM_AUTHOR) {
            return transformProjects_author(projects, profiles, userId);
        }
        if (props.transform === TRANSFORM_OWNER) {
            return transformProjects_owner(projects, profiles, userId);
        }
        if (props.transform === TRANSFORM_RECENT) {
            return transformProjects_recency(projects, profiles, adjustedSearchTags);
        }
        if (props.transform === TRANSFORM_POPULAR_SINGLE) {
            return transformProjects_popular_single(projects, profiles, props.projectId, props.versionId);
        }
        if (props.transform === TRANSFORM_RECENT_SINGLE) {
            return transformProjects_recency_single(projects, profiles, props.projectId, props.versionId);
        }
        return transformProjects_popular(projects, profiles);
    }, [projects, profiles, props.transform, userId, props.projectId, props.versionId, adjustedSearchTags]);

    return (
        <Table columns={columns} data={data} parentProps={props}/>
    )
}

export default MusicList;