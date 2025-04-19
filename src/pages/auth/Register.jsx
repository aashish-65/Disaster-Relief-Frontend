import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import RegisterUser from './RegisterUser';
import RegisterVolunteer from './RegisterVolunteer';
import RegisterNGO from './RegisterNGO';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('user');

  // const RegisterVolunteer = () => (
  //   <div className="w-full bg-white p-6 md:p-8 rounded-lg shadow-md">
  //     <h1 className="text-2xl font-bold text-gray-800 mb-6">Register as Volunteer</h1>
  //     {/* Volunteer registration form would go here */}
  //     <div className="text-center text-gray-500 mt-4">Volunteer registration form coming soon</div>
  //   </div>
  // );
  
  // const RegisterNGO = () => (
  //   <div className="w-full bg-white p-6 md:p-8 rounded-lg shadow-md">
  //     <h1 className="text-2xl font-bold text-gray-800 mb-6">Register as NGO</h1>
  //     {/* NGO registration form would go here */}
  //     <div className="text-center text-gray-500 mt-4">NGO registration form coming soon</div>
  //   </div>
  // );

  const renderRegistrationForm = () => {
    switch (selectedRole) {
      case 'user':
        return <RegisterUser />;
      case 'volunteer':
        return <RegisterVolunteer />;
      case 'ngo':
        return <RegisterNGO />;
      default:
        return <RegisterUser />;
    }
  };

  // Option cards for user selection
  const roleOptions = [
    {
      id: 'user',
      title: 'Individual User',
      description: 'Report incidents and request resources during emergencies',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Help respond to incidents and provide on-ground assistance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'ngo',
      title: 'NGO / Organization',
      description: 'Provide resources and coordinate disaster relief efforts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with background effect */}
          <div className="text-center relative mb-8 lg:mb-12 pb-6">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg className="w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#3B82F6" d="M47.7,-64.3C59.5,-55.3,65.8,-37.9,68.8,-21.1C71.9,-4.4,71.7,11.5,66.2,25.5C60.8,39.4,50.1,51.3,37.1,58.9C24.1,66.5,8.8,69.8,-5.9,67.9C-20.6,66,-34.6,59,-46.6,48.5C-58.5,37.9,-68.4,23.8,-72.3,7.2C-76.3,-9.4,-74.3,-28.5,-64.4,-41.7C-54.6,-54.9,-36.9,-62.2,-20.4,-66.9C-3.9,-71.6,11.5,-73.7,26.1,-71.4C40.8,-69.1,54.8,-62.4,47.7,-64.3Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                  Join the Disaster Relief Network
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                Create an account to report, volunteer, or coordinate relief efforts during emergencies
              </p>
              <div className="mt-6">
                <span className="text-gray-600">Already have an account?{' '}</span>
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors underline">
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>

          {/* Selection Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 transform transition-all">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Select your account type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {roleOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative overflow-hidden border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${
                    selectedRole === option.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRole(option.id)}
                >
                  {selectedRole === option.id && (
                    <div className="absolute top-0 right-0">
                      <div className="w-12 h-12 bg-blue-500 transform rotate-45 translate-x-4 -translate-y-4"></div>
                      <svg 
                        className="absolute top-1 right-1 w-4 h-4 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  <div className="flex items-start mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedRole === option.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="ml-3 pt-1">
                      <h3 className="font-medium text-lg">{option.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="mb-8 transform transition-all duration-300">
            {renderRegistrationForm()}
          </div>
          
          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 text-center shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-gray-800 uppercase tracking-wider mb-2">Need Help?</h3>
                <p className="text-gray-600">
                  If you're experiencing issues with registration or have questions about the process,
                  please contact our support team.
                </p>
                <div className="mt-3">
                  <a 
                    href="#" 
                    className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Visit Help Center
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;