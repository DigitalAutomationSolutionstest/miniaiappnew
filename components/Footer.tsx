'use client'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Digital Automaton Solutions. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  )
}
