import { Link } from "react-router-dom";

function NotFoundPage({ errPage }) {
  const content = (
    <main>
      <h2>404 Page not found</h2>
      <Link to={errPage}>Home</Link>
    </main>
  );

  return content;
}

export default NotFoundPage;
