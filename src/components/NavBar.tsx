import { NavLink } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

const links = [
  { to: "/", label: "Home" },
  { to: "/entities", label: "Entities" },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-white">
            🎯 Trivia
          </span>
          <Badge variant="outline" className="text-xs text-zinc-400">
            Challenge
          </Badge>
        </div>
        <ul className="flex gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-medium text-white"
                    : "text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}