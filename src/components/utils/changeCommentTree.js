const changeCommentTree = (comments_obj)     => {
    //  authorId: 'bob',
    //  commentMessage: "This is amazing!",
    //  parentCommentId: null,
    //  votes: 0,
    //  audioSegment: {start: 0, finish: 0},
    //  creationTime: new Date(1),


    // author: "",
    // comment: "",
    // timeStamp: 0,
    // replies: [{
        
    // }] ,
    // votes: 0,
    var comments = [];

    for (const [commentId, comment] of Object.entries(comments_obj)) {        
        comments_obj[commentId]["replies"] = [];
    }

    for (const [commentId, comment] of Object.entries(comments_obj)) {
        if (comment["parentCommentId"] != null) {
            const parent = comment["parentCommentId"];
            comments_obj[parent]["replies"].push ( {
                    ...comment,
                    commentId: commentId,
                })
        }
    }


    for (const [commentId, comment] of Object.entries(comments_obj)) {
        if (comment["parentCommentId"] === null) {
            comments.push ( {
                ...comment,
                commentId: commentId,
            } )
        }  
    }
    return comments;

}


export default changeCommentTree;