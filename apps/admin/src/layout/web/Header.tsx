"use client";

import { useState } from "react";
import { FaFacebookF, FaYoutube, FaTwitter, FaSearch, FaBars, FaChevronDown } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

// Navigation data structure
const navigationData = {
  topBar: {
    email: "info@seosight.com",
    socialLinks: [
      { icon: "facebook", url: "#", color: "text-blue-600" },
      { icon: "youtube", url: "#", color: "text-red-500" },
      { icon: "twitter", url: "#", color: "text-sky-400" }
    ]
  },
  logo: {
    title: "SEOSIGHT",
    subtitle: "Cool WordPress Theme"
  },
  menuItems: [
    {
      id: "home",
      label: "Home",
      url: "#",
      isActive: true
    },
    {
      id: "services",
      label: "Services",
      url: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "SEO Services", url: "#" },
        { label: "Web Development", url: "#" },
        { label: "Digital Marketing", url: "#" },
        { label: "Content Writing", url: "#" }
      ]
    },
    {
      id: "case-studies",
      label: "Case Studies",
      url: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Portfolio Grid", url: "#" },
        { label: "Portfolio Masonry", url: "#" },
        { label: "Single Project", url: "#" }
      ]
    },
    {
      id: "pages",
      label: "Pages",
      url: "#",
      hasDropdown: true,
      isMegaMenu: true,
      megaMenuColumns: [
        {
          title: "Standard Pages",
          description: "Pages that every website needs.",
          links: [
            { label: "Our Agency", url: "#" },
            { label: "SEO Analysis", url: "#" },
            { label: "Testimonials", url: "#" },
            { label: "Our Special Clients", url: "#" },
            { label: "Pricing Packages", url: "#" },
            { label: "404 Page", url: "#" }
          ]
        },
        {
          title: "Features",
          description: "Features of Our Digital Agency.",
          links: [
            { label: "Main slider with photo", url: "#" },
            { label: "Sub-header with photo", url: "#" },
            { label: "Photo Elements", url: "#" },
            { label: "Our Testimonials", url: "#" },
            { label: "Post Comments", url: "#" }
          ]
        },
        {
          title: "Web Elements",
          description: "Awesome header and title style variations and many more.",
          links: [
            { label: "Typography", url: "#" },
            { label: "Charts & Counters", url: "#" },
            { label: "Buttons", url: "#" }
          ]
        }
      ]
    },
    {
      id: "blog",
      label: "Blog",
      url: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Blog Grid", url: "#" },
        { label: "Blog List", url: "#" },
        { label: "Single Post", url: "#" }
      ]
    },
    {
      id: "shop",
      label: "Shop",
      url: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Shop Grid", url: "#" },
        { label: "Product Single", url: "#" },
        { label: "Shopping Cart", url: "#" }
      ]
    },
    {
      id: "contacts",
      label: "Contacts",
      url: "#"
    }
  ]
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "facebook":
        return FaFacebookF;
      case "youtube":
        return FaYoutube;
      case "twitter":
        return FaTwitter;
      default:
        return FaFacebookF;
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="flex justify-between items-center text-sm px-6 py-2 bg-white border-b border-gray-100">
        <p className="text-gray-600">
          {navigationData.topBar.email.split('@')[0]}@
          <span className="text-gray-800 font-semibold">{navigationData.topBar.email.split('@')[1]}</span>
        </p>
        <div className="flex items-center space-x-3">
          <span className="text-gray-600">Follow us:</span>
          {navigationData.topBar.socialLinks.map((social, index) => {
            const IconComponent = getSocialIcon(social.icon);
            return (
              <IconComponent
                key={index}
                className={`${social.color} cursor-pointer hover:opacity-80`}
              />
            );
          })}
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white relative">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{navigationData.logo.title}</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{navigationData.logo.subtitle}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-gray-700">
          {navigationData.menuItems.map((item) => (
            <div
              key={item.id}
              className={item.hasDropdown ? "relative group" : ""}
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
              onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
            >
              <a
                href={item.url}
                className={`flex items-center space-x-1 transition-colors py-2 font-medium ${
                  item.isActive
                    ? "text-teal-500 border-b-2 border-teal-400"
                    : "hover:text-teal-500"
                }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && <FaChevronDown className="text-xs" />}
              </a>

              {/* Regular Dropdown */}
              {item.hasDropdown && !item.isMegaMenu && activeDropdown === item.id && (
                <div className="absolute left-0 top-full bg-white shadow-xl border border-gray-100 min-w-[200px] py-2 z-50">
                  {item.dropdownItems?.map((dropItem, index) => (
                    <a
                      key={index}
                      href={dropItem.url}
                      className="block px-6 py-2.5 text-gray-700 hover:bg-teal-50 hover:text-teal-500 transition-colors"
                    >
                      {dropItem.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Mega Menu */}
              {item.hasDropdown && item.isMegaMenu && activeDropdown === item.id && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white shadow-2xl border border-gray-100 z-50 w-[900px]">
                  <div className="grid grid-cols-3 gap-8 p-8">
                    {item.megaMenuColumns?.map((column, colIndex) => (
                      <div key={colIndex}>
                        <h3 className="text-gray-800 font-bold text-sm mb-4 pb-2 border-b-2 border-teal-400">
                          {column.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-4">{column.description}</p>
                        <ul className="space-y-2">
                          {column.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <a
                                href={link.url}
                                className="text-gray-600 hover:text-teal-500 text-sm"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <div className="relative">
            <FiShoppingCart className="text-2xl text-gray-700 cursor-pointer hover:text-teal-500" />
            <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold px-1.5 rounded-full">
              0
            </span>
          </div>

          <FaSearch className="text-xl text-gray-700 cursor-pointer hover:text-teal-500" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden bg-orange-500 text-white text-2xl p-3 rounded-full hover:bg-orange-600 transition-colors"
            aria-label="Toggle Menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden z-50 max-h-screen overflow-y-auto">
            <div className="py-4">
              {navigationData.menuItems.map((item) => (
                <div key={item.id}>
                  <a
                    href={item.url}
                    className={`block px-6 py-3 font-medium ${
                      item.isActive
                        ? "text-teal-500 border-l-4 border-teal-500 bg-teal-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </a>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="bg-gray-50 py-2">
                      {item.dropdownItems.map((dropItem, index) => (
                        <a
                          key={index}
                          href={dropItem.url}
                          className="block px-10 py-2 text-sm text-gray-600 hover:text-teal-500"
                        >
                          {dropItem.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Mobile Mega Menu */}
                  {item.hasDropdown && item.isMegaMenu && item.megaMenuColumns && (
                    <div className="bg-gray-50 py-2">
                      {item.megaMenuColumns.map((column) =>
                        column.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            className="block px-10 py-2 text-sm text-gray-600 hover:text-teal-500"
                          >
                            {link.label}
                          </a>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}