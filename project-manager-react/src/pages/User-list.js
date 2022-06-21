import { Link } from "react-router-dom";
import { Breadcrumb, Empty } from "antd";
import { useEffect, useState } from "react";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/User/")
      .then((res) => res.json())
      .then((data) => {setUsers(data)});
  }, []);

  return (
    <section className="p-5 h-full">
      <section className="columns-2 mb-2">
        <h1 className="text-3xl font-bold text-primary-900">Uživatelé</h1>
      </section>

      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
            <Link to="/admin/projects">Administrace</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to="/admin/users">Uživatelé</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      {users.length > 0 ? (
        <section className="grid grid-cols-3 gap-4">
          {users.map(function (object, i) {
            return <section class="bg-white p-5 shadow-md rounded-md"><h2 class="text-xl font-bold ">{ object.mail }</h2></section>;
          })}
        </section>
      ) : (
        <Empty></Empty>
      )}
    </section>
  );
};
