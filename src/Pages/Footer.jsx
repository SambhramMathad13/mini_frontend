import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-16">
      <div className="container mx-auto px-5 md:px-16 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Plac.ed
          </h1>
        </div>
        <div className="flex space-x-6 mb-6 md:mb-0">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/home" className="hover:underline">
            Create-Post
          </Link>
          <Link to="/changepassword" className="hover:underline">
            Change-Password
          </Link>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h21.351C23.406 24 24 23.406 24 22.675V1.325C24 .593 23.406 0 22.675 0zm-13.01 20.707h-3.794v-9.899h3.794v9.899zm-1.899-11.24c-1.2 0-2.179-.979-2.179-2.178 0-1.2.979-2.179 2.179-2.179 1.2 0 2.178.979 2.178 2.179-.001 1.199-.979 2.178-2.178 2.178zm13.355 11.24h-3.794v-5.358c0-1.275-.025-2.92-1.777-2.92-1.777 0-2.048 1.39-2.048 2.825v5.453h-3.793v-9.899h3.644v1.351h.052c.507-.963 1.746-1.978 3.594-1.978 3.842 0 4.547 2.53 4.547 5.82v5.706h-.025z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.95.563-2.005.974-3.127 1.195-.896-.957-2.173-1.555-3.59-1.555-2.717 0-4.92 2.203-4.92 4.919 0 .385.043.76.127 1.122-4.088-.205-7.715-2.163-10.141-5.144-.423.727-.666 1.571-.666 2.473 0 1.707.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.111-.848.171-1.296.171-.317 0-.626-.031-.927-.088.627 1.956 2.444 3.379 4.599 3.419-1.68 1.318-3.804 2.105-6.104 2.105-.396 0-.787-.023-1.175-.068 2.179 1.396 4.768 2.21 7.548 2.21 9.058 0 14.01-7.512 14.01-14.01 0-.213-.004-.426-.014-.637.961-.695 1.8-1.562 2.463-2.549z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.012 7.052.07 5.773.127 4.52.392 3.429 1.483 2.338 2.573 2.073 3.826 2.016 5.105.958 6.384.946 6.793.946 12s.012 5.616.07 6.896c.057 1.279.322 2.532 1.413 3.623 1.091 1.091 2.344 1.356 3.623 1.413 1.279.058 1.688.07 6.896.07s5.616-.012 6.896-.07c1.279-.057 2.532-.322 3.623-1.413 1.091-1.091 1.356-2.344 1.413-3.623.058-1.279.07-1.688.07-6.896s-.012-5.616-.07-6.896c-.057-1.279-.322-2.532-1.413-3.623-1.091-1.091-2.344-1.356-3.623-1.413C17.668.012 17.259 0 12 0z" />
              <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.125A3.963 3.963 0 0 1 8.038 12 3.963 3.963 0 0 1 12 8.038 3.963 3.963 0 0 1 15.962 12 3.963 3.963 0 0 1 12 15.963zM18.406 4.594a1.44 1.44 0 0 0-1.44 1.44 1.44 1.44 0 1 0 2.88 0 1.44 1.44 0 0 0-1.44-1.44z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
        <p>&copy; 2024 Plac.ed. All rights reserved.</p>
      </div>
    </footer>
  );
}
