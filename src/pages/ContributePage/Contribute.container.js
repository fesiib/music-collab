import React from "react";
import { useSelector } from "react-redux";
import withHeader from "../../hocs/withHeader";
import Contribute from "./Contribute";

const ContributeContainer = ({ match }) => {
    console.log({ match });

    const projectId = match.params.projectId;
    const versionId = match.params.versionId;
    const { projects } = useSelector((state) => state.database);

    const project = projects && projects[projectId];
    const version = project && project.versions[versionId];

    console.log({
        project,
        version,
    });

    return (
        <Contribute
            project={project}
            version={version}
            projectId={projectId}
            versionId={versionId}
        />
    );
};

export default withHeader(ContributeContainer);
