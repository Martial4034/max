export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full text-center text-sm border-t border-border bg-background py-2 z-50">
      <small>
        <span className="text-muted-foreground hover:text-foreground transition-colors">
          Mentions légales
        </span>
        {" - "}
        <span className="text-muted-foreground hover:text-foreground transition-colors">
          CGU
        </span>
        {" - "}
        <span className="text-muted-foreground">
          © Max Winch 2025
        </span>
      </small>
    </footer>
  )
} 