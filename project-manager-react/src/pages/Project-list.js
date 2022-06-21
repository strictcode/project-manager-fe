import { Link } from "react-router-dom";
import { Breadcrumb, Empty } from "antd";
import { ProjectItem } from "../components/Project-item";
import { useEffect, useState } from "react";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/Project/")
      .then((res) => res.json())
      .then((data) => {setProjects(data)});
  }, []);

  return (
    <section className="p-5 h-full">
      <section className="columns-2 mb-2">
        <h1 className="text-3xl font-bold text-primary-900">Projekty</h1>
        <button
          type="button"
          className="text-white bg-amber-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium float-right rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Vytvořit projekt
        </button>
      </section>

      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/admin/Projects">Administrace</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Projekty</Breadcrumb.Item>
      </Breadcrumb>
      {projects.length > 0 ? (
        <section className="grid grid-cols-3 gap-4">
          {projects.map(function (object, i) {
            return <ProjectItem project={object} key={i} />;
          })}
        </section>
      ) : (
        <Empty></Empty>
      )}
    </section>
  );
};
