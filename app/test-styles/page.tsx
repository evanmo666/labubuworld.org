export default function TestStyles() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Tailwind CSS Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Colors Test</h2>
            <div className="space-y-2">
              <div className="w-full h-4 bg-red-500 rounded"></div>
              <div className="w-full h-4 bg-blue-500 rounded"></div>
              <div className="w-full h-4 bg-green-500 rounded"></div>
              <div className="w-full h-4 bg-purple-500 rounded"></div>
              <div className="w-full h-4 bg-primary-600 rounded"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Typography Test</h2>
            <p className="text-sm text-gray-600 mb-2">Small text</p>
            <p className="text-base text-gray-700 mb-2">Base text</p>
            <p className="text-lg text-gray-800 mb-2">Large text</p>
            <p className="text-xl font-bold text-gray-900">Extra large bold</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Interactive Test</h2>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mb-2">
              Hover Button
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Purple Button
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Layout Test</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-0 bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded">
              Gradient Box 1
            </div>
            <div className="flex-1 min-w-0 bg-gradient-to-r from-blue-400 to-purple-400 text-white p-4 rounded">
              Gradient Box 2
            </div>
            <div className="flex-1 min-w-0 bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 rounded">
              Gradient Box 3
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 