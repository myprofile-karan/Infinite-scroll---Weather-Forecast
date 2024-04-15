import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DisplayCities from './components/DisplayCities'
import WeatherPage from './components/WeatherPage'
import { Toaster } from 'react-hot-toast'
import SavedLocations from './components/SavedLocations'

const App = () => {
  return (
    <div className='bg-black'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayCities />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/savelocations" element={<SavedLocations />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  )
}

export default App
