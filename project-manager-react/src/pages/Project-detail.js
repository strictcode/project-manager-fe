import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Empty } from "antd";
import { useEffect, useState } from "react";



export const ProjectDetail = () => {
  const [project, setProject] = useState();
  const [todoIssues, setTodoIssues] = useState([]);
  const [inProgressIssues, setInProgressIssues] = useState([]);
  const [doneIssues, setDoneIssues] = useState([]);

  const StatusTranslations = [null, "Nové", "PROBÍHAJÍCÍ" , "Hotovo"]

  let { id } = useParams();


  useEffect(() => {
    fetch("/api/Project/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setTodoIssues(data.issues.length > 0 ? data.issues.filter(issue => issue.statusId === 1) : []);
        setInProgressIssues(data.issues.length > 0 ? data.issues.filter(issue => issue.statusId === 2) : []);
        setDoneIssues(data.issues.length > 0 ? data.issues.filter(issue => issue.statusId === 3) : []);
    });
  }, []);

  return (
    <section className="p-5 h-page">
      <section className="columns-2 mb-2">
        <h1 className="text-3xl font-bold text-primary-900">{project && project.name}</h1>
        <button
          type="button"
          className="text-white bg-amber-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium float-right rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Vytvořit issue
        </button>
      </section>

      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
            <Link to="/admin/projects">Administrace</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to="/admin/projects">Projekty</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to={"/admin/projects/" + (project && project.id) + "/detail"}>{project && project.name}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <section class="grid grid-cols-3 gap-4 pt-2 h-grid">
      <div class="column bg-gray-200 h-full p-1 rounded-md px-3">
        <h2 class="text-gray-500 font-bold uppercase font-mono my-1">
          { StatusTranslations[1] } ({ todoIssues.length })
        </h2>
        { todoIssues.length > 0 ? (
            <section>
              {todoIssues.map(function (object, i) {
                return <main key={i}>
                <section class="bg-white p-5 mb-4 shadow-md rounded-md hover:bg-gray-100 duration-300 hover:cursor-pointer">
      
                  <h2 class="text-xl font-bold  mb-4">{ object.summary }</h2>
                  <p class="">{ object.description }</p>
                  <section class="columns-2 pt-2">
                    <p class="text-sm text-gray-500 pt-2">Zpracovává <br/> <b>{ object.assignee.mail }</b></p>
                    <p class="text-sm text-gray-500 pt-2">Zadal <br/> <b>{ object.reporter.mail }</b></p>
                  </section>
                </section>
              </main>;
              })}
            </section>
          ) : (
            <Empty></Empty>
        )}
      </div>
      <div class="column bg-gray-200 h-full p-1 rounded-md px-3">
        <h2 class="text-gray-500 font-bold uppercase font-mono my-1">
          { StatusTranslations[2] } ({ inProgressIssues.length })
        </h2>
        { inProgressIssues.length > 0 ? (
            <section>
              {inProgressIssues.map(function (object, i) {
                return <main key={i}>
                <section class="bg-white p-5 mb-4 shadow-md rounded-md hover:bg-gray-100 duration-300 hover:cursor-pointer">
      
                  <h2 class="text-xl font-bold  mb-4">{ object.summary }</h2>
                  <p class="">{ object.description }</p>
                  <section class="columns-2 pt-2">
                    <p class="text-sm text-gray-500 pt-2">Zpracovává <br/> <b>{ object.assignee.mail }</b></p>
                    <p class="text-sm text-gray-500 pt-2">Zadal <br/> <b>{ object.reporter.mail }</b></p>
                  </section>
                </section>
              </main>;
              })}
            </section>
          ) : (
            <Empty></Empty>
        )}
      </div>
      <div class="column bg-gray-200 h-full p-1 rounded-md px-3">
        <h2 class="text-gray-500 font-bold uppercase font-mono my-1">
          { StatusTranslations[3] } ({ doneIssues.length })
        </h2>
        { doneIssues.length > 0 ? (
            <section>
              {doneIssues.map(function (object, i) {
                return <main key={i}>
                <section class="bg-white p-5 mb-4 shadow-md rounded-md hover:bg-gray-100 duration-300 hover:cursor-pointer">
      
                  <h2 class="text-xl font-bold  mb-4"><s>{ object.summary }</s></h2>
                  <p class="">{ object.description }</p>
                  <section class="columns-2 pt-2">
                    <p class="text-sm text-gray-500 pt-2">Zpracovává <br/> <b>{ object.assignee.mail }</b></p>
                    <p class="text-sm text-gray-500 pt-2">Zadal <br/> <b>{ object.reporter.mail }</b></p>
                  </section>
                </section>
              </main>;
              })}
            </section>
          ) : (
            <Empty></Empty>
        )}
      </div>
    </section>
  </section>
  );
};
