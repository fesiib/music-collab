function buildData(root, g, profiles, versions, timestampId) {
    console.log(root, g, profiles, versions);
    let res = {
        name: root,
        attributes: {
            votes: versions[root].metaInfo.votes,
            creationTime: versions[root].metaInfo.creationTime,
            number: timestampId[versions[root].metaInfo.creationTime],
            author: profiles[versions[root].metaInfo.authorId].metaInfo.name,
            type: versions[root].tracks[0].type,
        },
        children: []
    }
    if(g[root]) {
        g[root].forEach(function(child, index) {
            res.children.push(buildData(child, g, profiles, versions, timestampId));
        });    
    }
    return res;
}

export default buildData;

// export default {
//     name: 'A Tender Heart',
//     children: [
//       {
//         name: 'Sunny day',
//         attributes: {
//           department: 'Production',
//         },
//         children: [
//           {
//             name: 'Sunny day2',
//             attributes: {
//               department: 'Fabrication',
//             },
//             children: [
//               {
//                 name: 'SunnyDay3',
//                 children: [
//                     {
//                         name: 'Sunny Day4',
//                         children: [
//                             {
//                                 name: 'Sunny Day 5',
//                                 children:[
//                                     {
//                                         name: 'Sunny Day 6',
//                                         children:[
//                                             {
//                                                 name: 'Sunny Day 7',
//                                                 children: [
//                                                     {
//                                                         name: 'Sunny Day 8'
//                                                     }
//                                                 ]
//                                             }
//                                         ]
                                        
//                                     }
//                                 ]
//                             }

//                         ]
//                     }
//                 ]
//               },
//             ],
//           },
//           {
//             name: 'Foggy Day',
//             attributes: {
//               department: 'Assembly',
//             },
//             children: [
//               {
//                 name: 'Foggy Day2',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   };

