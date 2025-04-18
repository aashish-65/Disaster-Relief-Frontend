import { useState } from 'react';
import { Link } from 'react-router-dom';
import pic1 from '../assets/images/hero.png';
import inc1 from '../assets/images/inc1.png';
import inc2 from '../assets/images/inc2.png';
import inc3 from '../assets/images/inc3.png';
import pic2 from '../assets/images/crisis-mapping-interface.png';

export default function Home() {
  const [stats] = useState({
    totalIncidents: 2,
    activeIncidents: 50,
    resourcesDeployed: 800,
    volunteersActive: 100
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Full Screen Design */}
      <div className="relative bg-gradient-to-r from-blue-700 to-indigo-900 h-screen w-full">
        <div className="h-full w-full flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  <span className="block">Disaster Relief</span>
                  <span className="block text-cyan-300">Crowdmapping Platform</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
                  Connecting communities, resources, and volunteers during disasters. Report incidents, request resources, and coordinate relief efforts in real-time.
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <Link
                    to="/incidents/report"
                    className="px-8 py-3 rounded-md bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                  >
                    Report Incident
                  </Link>
                  <Link
                    to="/resources/request"
                    className="px-8 py-3 rounded-md bg-white text-indigo-900 font-medium hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Request Resources
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block relative h-80 lg:h-96 overflow-hidden rounded-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  className="w-full h-full object-cover"
                  src= {pic1}
                  alt="Disaster relief workers"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center animate-bounce">
          <p className="text-sm mb-1">Scroll Down</p>
          <svg className="mx-auto h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Stats Section - Clean Cards with Animation */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalIncidents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-red-100 p-3">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeIncidents}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-3">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Resources Deployed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resourcesDeployed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-purple-100 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Volunteers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.volunteersActive}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incidents - Card Carousel/Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Recent Incidents</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Stay Informed</p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            View the latest reported incidents and contribute to relief efforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample Incident Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="h-48 bg-gray-200 relative">
              <img src={inc1} alt="Flood in coastal area" className="h-full w-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">
                  Critical
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">April 15, 2025</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Flood</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Riverside Community Flooding</h3>
              <p className="text-gray-600 mb-4">Severe flooding has affected the riverside community with multiple homes underwater and families displaced...</p>
              <Link to="/incidents/1" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                View details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sample Incident Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="h-48 bg-gray-200 relative">
              <img src={inc2} alt="Wildfire" className="h-full w-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-100 text-orange-800">
                  High
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">April 16, 2025</span>
                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">Fire</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mountain Ridge Wildfire</h3>
              <p className="text-gray-600 mb-4">Fast-moving wildfire has prompted evacuations in the Mountain Ridge area with homes at risk and fire crews mobilizing...</p>
              <Link to="/incidents/2" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                View details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sample Incident Card 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="h-48 bg-gray-200 relative">
              <img src={inc3} alt="Earthquake damage" className="h-full w-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800">
                  Medium
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">April 14, 2025</span>
                <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">Earthquake</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Downtown District Earthquake</h3>
              <p className="text-gray-600 mb-4">5.2 magnitude earthquake has caused structural damage to buildings in the downtown district with assessments ongoing...</p>
              <Link to="/incidents/3" className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                View details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/incidents"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
          >
            View all incidents
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* How It Works - Modern Process Steps */}
      <div className="bg-gray-100 py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Disaster Relief Made Simple</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:-translate-y-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Report Incidents</h3>
              <p className="text-gray-600">
                Report disasters and emergencies with location, photos, and details to alert authorities and nearby users.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:-translate-y-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Request Resources</h3>
              <p className="text-gray-600">
                Request essential supplies, medical aid, or volunteer assistance based on your specific needs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition duration-500 hover:-translate-y-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Coordinate Relief</h3>
              <p className="text-gray-600">
                Connect with NGOs, volunteers, and donors to coordinate effective relief efforts in affected areas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Map Section */}
      <div className="bg-white py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-time Disaster Mapping</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform provides up-to-date mapping of disaster zones, affected areas, and resource distribution centers. Visualize data in real-time to make informed decisions about relief efforts.
              </p>
              <ul className="space-y-4">
                {['Interactive crisis maps', 'Resource deployment tracking', 'Volunteer position coordination', 'Safe zone identification'].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/map" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
                  Explore the map
                </Link>
              </div>
            </div>
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-xl">
              <img src={pic2} alt="Crisis mapping interface" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-700 py-16 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to help?</span>
                <span className="block text-cyan-300">Join our volunteer network today.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-200">
                Be part of a global community working together to provide disaster relief where it's needed most.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:mt-0 lg:flex-shrink-0">
              <Link
                to="/register/volunteer"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Register as Volunteer
              </Link>
              <Link
                to="/register/ngo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Register as NGO
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Download Banner */}
      <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
        <div className="w-full px-2 sm:px-6 lg:px-8">
          <div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-indigo-800">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">Get our mobile app for real-time alerts!</span>
                  <span className="hidden md:inline">Get our mobile app for real-time disaster alerts and offline access!</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                  Download Now
                </a>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                <button type="button" className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}