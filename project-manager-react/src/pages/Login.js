import { LoginForm } from "../components/Login-form";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <section class="p-10 rounded-3xl shadow-lg bg-white w-80 lg:w-1/4">
      <header class="mb-4 text-center">
        <h1 class="text-3xl font-bold my-3">ProjectManager</h1>
        <h2 class="text-center text-xl font-bold my-3">Přihlášení</h2>
      </header>
      <main>
        <LoginForm></LoginForm>
      </main>
      <footer>
        <p class="">
          Nejste registrovaní? Klikněte
          <Link class="p-0 pl-1 underline" to="/auth/register">
            zde.
          </Link>
        </p>
      </footer>
    </section>
  );
};
