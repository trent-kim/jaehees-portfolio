import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";

const ProjectNav = ({ project, projects, currentSlug }) => {

  const [currentProject, setCurrentProject] = useState();

  const [filteredProjects, setFilteredProjects] = useState(null);

  const films = projects.filter(project => project.categories.includes("Film"));
  const animation = projects.filter(project => project.categories.includes("Animation"));
  const photography = projects.filter(project => project.categories.includes("Photography"));

  useEffect(() => {
    project?.categories.map((category) => (
      category === "Film" && (
        setFilteredProjects(films),
        films.map(({slug}, i) => (
          currentSlug.current === films[i].slug.current &&
            setCurrentProject(i),
            console.log("current:", currentProject)
        ))
      ),
      category === "Animation" && (
        setFilteredProjects(animation),
        animation.map(({slug}, i) => (
          currentSlug.current === animation[i].slug.current &&
            setCurrentProject(i)
        ))
      ),
      category === "Photography" && (
        setFilteredProjects(photography),
        photography.map(({slug}, i) => (
          currentSlug.current === photography[i].slug.current &&
            setCurrentProject(i)
        ))
      )
    ))
  }, [
    project,
    currentSlug,
    currentProject,
    setCurrentProject,
    setFilteredProjects
  ]);

  return (
    <div className=" relative col-span-1 justify-self-end flex justify-between">
      {filteredProjects && (
      currentProject === 0 ? (
            <Link
              className="font-mono text-black text-xs py-[6px]"
              
              href={`/project/${encodeURIComponent(filteredProjects[filteredProjects.length - 1].slug.current)}`}
            >
              Prev
            </Link>
          ) : ( 
            <Link
              className="font-mono text-black text-xs py-[6px]"
              
              href={`/project/${encodeURIComponent(filteredProjects[currentProject - 1].slug.current)}`}
            >
              Prev
            </Link>
          )
      )
      }
      
      
      {/* <div className="flex gap-sm">
        <div className="first:text-white first:bg-black font-sans text-xs text-black hover:text-white bg-white hover:bg-black border rounded-[0px] border-black text-center px-[12px] py-[8px]">
          {project?.title}
        </div>
      </div> */}
      {filteredProjects && (
      currentProject === filteredProjects.length - 1 ? (
            <Link
              className="font-mono text-black text-xs py-[6px]"
              
              href={`/project/${encodeURIComponent(filteredProjects[0].slug.current)}`}
            >
              Next
            </Link>
          ) : ( 
            <Link
              className="font-mono text-black text-xs py-[6px]"
              
              href={`/project/${encodeURIComponent(filteredProjects[currentProject + 1].slug.current)}`}
            >
              Next
            </Link>
          )
      )
      }
    </div>
  );
};

export default ProjectNav;
