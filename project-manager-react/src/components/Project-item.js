import { Link, useNavigate } from "react-router-dom";
import { Badge  } from 'antd';

export const ProjectItem = ({project}) => {
    const navigate = useNavigate();

    function filterProjectIssues(issues) {
        return issues.filter((issue) => issue.statusId !== 3);
    }

    return (
    <Badge.Ribbon text={`Vlastník: ${project.createdName}`}>
        <section className="bg-white p-5 shadow-md rounded-md">
          <h2 className="text-xl font-bold">{ project.name }</h2>
          <ul className="mt-2 h-24 overflow-auto">
            { project && filterProjectIssues(project.issues).map(function (object, i) {
                return <li key={i}>{object.summary}</li>;
            })}
            { project && filterProjectIssues(project.issues).length <= 0 ? <li>Nejsou zadané žádné úkoly</li> : null}
            
          </ul>
          <section className="columns-2 mt-2">
             <Link to={`/admin/projects/${project.id}/detail`}>
              <button
                type="button"
                className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Zobrazit detail
              </button>
            </Link>
            <button type="button"
              className="text-white block w-full bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
              Upravit projekt
            </button>
          </section>
        </section>
        
      </Badge.Ribbon>
    );
  };
  