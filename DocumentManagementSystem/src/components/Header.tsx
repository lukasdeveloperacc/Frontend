import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="p-6 font-sans text-gray-900">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🔒 Manage
        </h1>
        <nav className="space-x-4">
          <Link to={"/"}>Home</Link>
          <Link to={"/contacts"}>Contacts</Link>
          <Link to={"/documents"}>Documents</Link>
          <Link to={"/logout"}>Log out</Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
