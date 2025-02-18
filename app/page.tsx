import { Cube } from "@/components/cube/cube"
import { Footer } from "@/components/footer"
import "@/styles/home.css"

export default function Home() {
  return (
    <div className="h-screen overflow-hidden relative">
      <main className="h-full">
        <Cube />
      </main>
      <Footer />
    </div>
  )
}
