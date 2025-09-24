/** @format */

export default function Footer() {
  return (
    <footer className="bg-gray-900 shadow-inner  ">
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-3  md:flex items-center justify-between">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-white">H2Platform</h2>

        {/* Copyright */}
        <p className="text-gray-400 text-sm my-3 md:my-0">
          © {new Date().getFullYear()} H2Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
