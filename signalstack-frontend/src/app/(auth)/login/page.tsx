import LoginForm from '../../../features/auth/components/LoginForm';

const features = [
  {
    id: 'team',
    title: 'Team Management',
    icon: (
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-2a4 4 0 00-8 0v2a2 2 0 002 2h4a2 2 0 002-2z" />
    ),
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'analytics',
    title: 'Salary Analytics',
    icon: (
      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    ),
    bgColor: 'bg-indigo-100 dark:bg-indigo-900',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'insights',
    title: 'AI Insights',
    icon: (
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    ),
    bgColor: 'bg-pink-100 dark:bg-pink-900',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-row-reverse justify-evenly relative z-10 w-full">

        {/* Login card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Card header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8 sm:py-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Welcome Back
            </h2>
            <p className="text-blue-100 text-center text-sm mt-2">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form section */}
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            <LoginForm />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  New user?
                </span>
              </div>
            </div>

            {/* Sign up prompt */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Contact your administrator to create an account
            </p>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 sm:px-8 py-4 border-t border-gray-100 dark:border-gray-600">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            SignalStack
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            HR Salary Management Platform
          </p>
        </div>
        {/* Features info */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${feature.bgColor} mb-2`}>
                <svg className={`w-5 h-5 ${feature.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                  {feature.icon}
                </svg>
              </div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
