import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import Browse from './Browse.jsx'
import JobDetail from './JobDetail.jsx'
import CompanyProfile from './CompanyProfile.jsx'
import Bookmarks from './Bookmarks.jsx'

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
