import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Browse from './pages/Browse.jsx'
import JobDetail from './pages/JobDetail.jsx'
import CompanyProfile from './pages/CompanyProfile.jsx'
import Bookmarks from './pages/Bookmarks.jsx'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-body">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/company/:name" element={<CompanyProfile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
