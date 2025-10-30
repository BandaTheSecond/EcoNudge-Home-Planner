export default function Footer() {
  return (
    <footer className="bg-green-100 text-gray-700 py-6 mt-12 border-t border-green-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-green-700">
            © {new Date().getFullYear()} Eco-Nudge
          </span>
          <span className="hidden md:inline">|</span>
          <span className="text-gray-500">All rights reserved</span>
        </div>

        {/* Center Message */}
        <p className="mt-3 md:mt-0 text-center italic text-green-800">
          Make today a greener day 🌿
        </p>

        {/* Right Section */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a
            href="#"
            className="hover:text-green-600 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-green-600 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-green-600 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
