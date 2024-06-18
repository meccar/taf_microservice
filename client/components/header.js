import Link from "next/link";

export default ({ currentUser }) => {
  links = [
    !currentUser && { label: "Register", href: "/api/v1/user/register" },
    !currentUser && { label: "Login", href: "/api/v1/user/login" },
    currentUser && { label: "Logout", href: "/api/v1/user/logout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="mx-2">
          <Link href={href}>
            <a className="text-blue-500 hover:text-blue-700">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="bg-gray-100 p-4">
      <div className="flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">Brand</a>
        </Link>
        <div className="flex justify-end">
          <ul className="flex items-center space-x-4">{links}</ul>
        </div>
      </div>
    </nav>
  );
};
