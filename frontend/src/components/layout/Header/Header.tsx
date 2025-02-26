import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <a href="/">🌐 MonLogo</a>
      </div>

      {/* Boutons */}
      <ul className="flex space-x-4">
        <li>
          <a href="/tarif" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition">
            Tarif
          </a>
        </li>
        <li>
          <a href="/compte" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition">
            Compte
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
