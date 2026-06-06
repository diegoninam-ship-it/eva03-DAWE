import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "@/components/NavBar"
import Home from "@/pages/Home"
import Entities from "@/pages/Entities"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entities" element={<Entities />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}