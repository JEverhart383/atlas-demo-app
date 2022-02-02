import {Project as ProjectType} from 'client';
import Link from 'next/link';


interface ProjectProps {
    project: ProjectType;
}

export default function Project({ project }:ProjectProps){
    return (
        <div>
            <h3>{project?.name}</h3>
            <p>ID: {project?.id}</p>
            <p>Requested by  {project?.clientName} </p>
            <p>Due on  {project?.dueDate} </p>
            <Link href={`/projects/${project?.id}`}>
                <a aria-label={`View project ${project?.name} details`}>
                    {`View project ${project?.name} details`}
                </a>
            </Link>
        </div>
    ); 
}