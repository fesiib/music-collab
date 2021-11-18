import React from "react";
import CustomTag from "./CustomTag";

const DEF_PROPS = {
    tags: [],
    limit: -1,
}

function TagList(props) {
    props = {
        ...DEF_PROPS,
        ...props,
    };
    const limit = props.limit;
    let tags = [ ...props.tags ];

    let moreTagsExist = "";
    if (limit >= 0) {
        while (tags.length > limit) {
            tags.pop();
            moreTagsExist = "...";
        }
    }
    return (
        <div className="flex flex-row flex-wrap">
            {tags.map((tag) => {
                return (
                    <div key={tag.value}>
                        <CustomTag label={tag.label}/>
                    </div>
                )
            })}
            <div className="text-xl"> {moreTagsExist} </div>
        </div>
    );
}

export default TagList;