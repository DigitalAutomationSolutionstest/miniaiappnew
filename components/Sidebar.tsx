import Link from 'next/link'
import { Home, Bot, Code2, FileAudio, LayoutDashboard, Table } from 'lucide-react'

export default function Sidebar() {
  const items = [
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: '/chat', label: 'Chatbot', icon: <Bot size={18} /> },
    { href: '/code', label: 'Assistente Codice', icon: <Code2 size={18} /> },
    { href: '/sitegen', label: 'Generatore Siti', icon: <LayoutDashboard size={18} /> },
    { href: '/transcribe', label: 'Trascrizione', icon: <FileAudio size={18} /> },
    { href: '/csv', label: 'Analisi CSV', icon: <Table size={18} /> },
  ]

  return (
    <aside className="w-60 h-screen p-4 border-r hidden md:block bg-gray-50">
      <nav className="space-y-2">
        {items.map(({ href, label, icon }) => (
          <Link key={href} href={href} className="flex items-center space-x-2 text-gray-700 hover:text-black">
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
} 