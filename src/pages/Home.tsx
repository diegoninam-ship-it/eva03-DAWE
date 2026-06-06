import { useTrivia } from "@/hooks/useTrivia"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const difficultyColor: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function Home() {
  const { questions, loading, error, refetch } = useTrivia()

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">

      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-white">
          🎯 Trivia Challenge
        </h1>
        <p className="mb-6 text-lg text-zinc-400">
          Pon a prueba tu conocimiento con preguntas de cultura general
          obtenidas en tiempo real desde{" "}
          <span className="text-white">Open Trivia DB</span>.
        </p>
        <Button
          onClick={refetch}
          disabled={loading}
          className="cursor-pointer bg-white text-zinc-900 hover:bg-zinc-200"
        >
          {loading ? "Cargando..." : "🔄 Nuevas preguntas"}
        </Button>
      </section>

      {/* Error */}
      {error && (
        <p className="mb-8 text-center text-red-400">
          ⚠️ Error al cargar: {error}
        </p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-xl bg-zinc-800/60"
            />
          ))}
        </div>
      )}

      {/* Listado de preguntas */}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2">
          {questions.map((q, index) => (
            <Card
              key={index}
              className="border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={difficultyColor[q.difficulty]}
                  >
                    {q.difficulty}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-zinc-700 text-zinc-400"
                  >
                    {q.type === "multiple" ? "Multiple" : "V/F"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-sm font-medium leading-snug text-zinc-100">
                  <span className="mr-2 text-zinc-500">#{index + 1}</span>
                  <span
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />
                </CardTitle>
                <p className="text-xs text-zinc-500">{q.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}