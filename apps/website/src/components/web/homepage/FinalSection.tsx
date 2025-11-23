"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FinalSection = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [blogIndex, setBlogIndex] = useState(0);

  const testimonials = [
    {
      text: "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim.",
      author: "Jonathan Simpson",
      role: "Lead Manager"
    },
    {
      text: "Claritas est etiam processus dynamicus, qui lectorum mirum est notare quam.",
      author: "Sarah Johnson",
      role: "Product Designer"
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Mike Peters",
      role: "CEO"
    }
  ];

  const clients = [
    { name: "Antonio The Barber", logo: "ANTONIO\nTHE BARBER\nHaircuts\nSINCE 1970" },
    { name: "Cafe Royal Roasters", logo: "CAFE\nRoyal\nROASTERS" },
    { name: "Brian Smith", logo: "Brian Smith\nSINCE 1987\nPARIS · MILAN · SYDNEY" },
    { name: "H.R. Frank", logo: "H.R. FRANK\nAmerican Club\nVINTAGE STYLE" }
  ];

  const blogPosts = [
    {
      date: "April 7, 2020",
      title: "A featured image post",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a mauris suscipit, euismod mi nec, sollicitudin dolor. Curabitur",
      author: "Liondekam"
    },
    {
      date: "April 7, 2020",
      title: "Post left sidebar",
      excerpt: "Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem",
      author: "Liondekam"
    },
    {
      date: "April 7, 2020",
      title: "Post with images inside",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit lacus id sem vehicula ullamcorper. Nulla et sapien",
      author: "Liondekam"
    }
  ];

  return (
    <div className="w-full">
      {/* Recent Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Recent Case Studies</h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-purple-300 rounded-lg"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">PROJECT CUSTOM TITLE</h3>
                <p className="text-gray-600 text-sm">SMM, Technologies</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-red-300 rounded-lg"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">PROJECT GALLERY</h3>
                <p className="text-gray-600 text-sm">SEO, SMM</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 h-48 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-300 rounded-lg"></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">PROJECT CENTERED IMAGE</h3>
                <p className="text-gray-600 text-sm">Ecommerce, SEO, SMM</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors">
              ALL PROJECTS
            </button>
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section className="py-16 bg-orange-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Happy Clients<br/>About Us</h2>
              <div className="w-24 h-1 bg-orange-500 mb-6"></div>
              <p className="text-gray-800">Claritas est etiam processus dynamicus, qui lectorum.</p>
              <div className="mt-6">
                <div className="text-6xl font-script text-gray-800">Brandon</div>
              </div>
            </div>
            
            <div className="lg:w-2/3 relative">
              <div className="bg-yellow-300 rounded-full w-32 h-32 absolute -left-16 top-1/2 transform -translate-y-1/2 z-0"></div>
              <div className="bg-gray-800 rounded-3xl p-8 relative z-10 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl">😊</div>
                  </div>
                  <p className="text-white text-lg">
                    {testimonials[testimonialIndex].text}
                  </p>
                </div>
                <div>
                  <p className="text-yellow-400 font-bold">{testimonials[testimonialIndex].author}</p>
                  <p className="text-gray-400 text-sm">{testimonials[testimonialIndex].role}</p>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-3 h-3 rounded-full ${idx === testimonialIndex ? 'bg-white' : 'bg-orange-500'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Pricing Packages</h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Personal Plan */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-6">
                  <div className="w-16 h-16 bg-teal-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Personal <span className="inline-block bg-teal-400 text-white text-xs px-3 py-1 rounded-full">POPULAR</span>
                </h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="text-gray-700"><span className="font-bold">5</span> Analytics Campaigns</li>
                <li className="text-gray-700"><span className="font-bold">300</span> Keywords</li>
                <li className="text-gray-700"><span className="font-bold">250,000</span> Crawled Pages</li>
                <li className="text-gray-400">-</li>
                <li className="text-gray-700"><span className="font-bold">15</span> Social Accounts</li>
              </ul>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-teal-400">$49.99</p>
              </div>
              <button className="w-full bg-gray-800 text-white py-3 rounded-full hover:bg-gray-700 transition-colors">
                PURCHASE
              </button>
            </div>

            {/* Webmaster Plan */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-6">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Webmaster <span className="inline-block bg-teal-400 text-white text-xs px-3 py-1 rounded-full">POPULAR</span>
                </h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="text-gray-700"><span className="font-bold">25</span> Analytics Campaigns</li>
                <li className="text-gray-700"><span className="font-bold">1,900</span> Keywords</li>
                <li className="text-gray-700"><span className="font-bold">1,250,000</span> Crawled Pages</li>
                <li className="text-orange-400">Includes Branded Reports</li>
                <li className="text-gray-700"><span className="font-bold">50</span> Social Accounts</li>
              </ul>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-teal-400">$99.99</p>
              </div>
              <button className="w-full bg-gray-800 text-white py-3 rounded-full hover:bg-gray-700 transition-colors">
                PURCHASE
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-6">
                  <div className="w-16 h-16 bg-pink-400 rounded-full"></div>
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Professional <span className="inline-block bg-teal-400 text-white text-xs px-3 py-1 rounded-full">POPULAR</span>
                </h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="text-gray-700"><span className="font-bold">100</span> Analytics Campaigns</li>
                <li className="text-gray-700"><span className="font-bold">7500</span> Keywords</li>
                <li className="text-gray-700"><span className="font-bold">1,250,000</span> Crawled Pages</li>
                <li className="text-orange-400">Includes Branded Reports</li>
                <li className="text-gray-700"><span className="font-bold">150</span> Social Accounts</li>
              </ul>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-teal-400">169.99$</p>
              </div>
              <button className="w-full bg-gray-800 text-white py-3 rounded-full hover:bg-gray-700 transition-colors">
                ORDER NOW!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Logo Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Valuable Clients</h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-6"></div>
          <p className="text-center text-gray-600 mb-12">Qui mutationem consuetudium.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto mb-8">
            {clients.map((client, idx) => (
              <div key={idx} className="flex items-center justify-center p-4">
                <div className="text-center text-gray-600 font-bold text-sm whitespace-pre-line opacity-70 hover:opacity-100 transition-opacity">
                  {client.logo}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            <button className="p-3 border-2 border-gray-400 rounded hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-3 border-2 border-gray-400 rounded hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Latest From the Blog</h2>
              <div className="w-24 h-1 bg-teal-400"></div>
            </div>
            <a href="#" className="text-gray-600 hover:text-teal-400 flex items-center gap-2">
              Read our blog →
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-black rounded-full"></div>
                    <p className="text-sm text-gray-700">Posted by {post.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setBlogIndex(idx)}
                className={`w-3 h-3 rounded-full ${idx === blogIndex ? 'bg-teal-400' : 'bg-gray-800'}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinalSection;