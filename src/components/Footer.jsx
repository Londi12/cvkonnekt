import React from 'react';

const Footer = () => (
  <footer className="w-full bg-gray-900 text-gray-200 py-4 mt-auto">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <span className="text-sm">&copy; {new Date().getFullYear()} CVKonnekt. All rights reserved.</span>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="/about" className="hover:underline">About</a>
        <a href="/support" className="hover:underline">Support</a>
        <a href="https://github.com/cvkonnekt" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
      </div>
    </div>
  </footer>
);

export default Footer; 