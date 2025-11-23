// components/Footer.tsx
import React from 'react';
import { FaTwitter, FaFacebook, FaGooglePlus, FaYoutube } from 'react-icons/fa'; // Assuming react-icons for social icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info Section */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Seosight Company!</h2>
          <p className="text-gray-300 mb-6">
            Qolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
            aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
            nisl ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="text-blue-400 hover:text-blue-300" size={24} />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="text-blue-600 hover:text-blue-500" size={24} />
            </a>
            <a href="https://plus.google.com" aria-label="Google+">
              <FaGooglePlus className="text-red-500 hover:text-red-400" size={24} />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FaYoutube className="text-red-600 hover:text-red-500" size={24} />
            </a>
          </div>
        </div>

        {/* Services Section */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 text-orange-500">Services Provided</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• SEO Services</li>
            <li>• Pay-per-click</li>
            <li>• Social Media</li>
            <li>• Web Analytics</li>
            <li>• Web Design</li>
            <li>• Web Development</li>
            <li>• Virtual Marketing</li>
            <li>• Email Marketing</li>
            <li>• Keyword Analytics</li>
            <li>• Content Analytics</li>
            <li>• Content Management</li>
            <li>• Blog Management</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="md:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">24/7</p>
                <p className="text-sm">8 800 567 8911</p>
                <p className="text-xs text-gray-400">Mon-Fri 9am-6pm</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">info@seosight.com</p>
                <p className="text-sm text-gray-400">Online support</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Melbourne, Australia</p>
                <p className="text-sm">795 South Park Avenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; 2020 Seosight. Best Agency WP Theme</p>
      </div>
    </footer>
  );
};

export default Footer;