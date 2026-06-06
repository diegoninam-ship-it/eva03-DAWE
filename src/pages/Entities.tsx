import { useTrivia } from "@/hooks/useTrivia"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const difficultyColor: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  hard: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function Entities() {
  const { questions, loading, error, refetch } = useTrivia()

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">

      {/* Header */}
      <section className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              📋 Entidades
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Listado completo de preguntas con sus propiedades principales.
            </p>
          </div>
          <Button
            onClick={refetch}
            disabled={loading}
            variant="outline"
            className="cursor-pointer border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            {loading ? "Cargando..." : "🔄 Recargar"}
          </Button>
        </div>
      </section>

      {/* Error */}
      {error && (
        <p className="mb-8 text-center text-red-400">
          ⚠️ Error al cargar: {error}
        </p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-zinc-800/60"
            />
          ))}
        </div>
      )}

      {/* Tabla de entidades */}
      {!loading && !error && (
        <div className="flex flex-col gap-3">
          {questions.map((q, index) => (
            <Card
              key={index}
              className="border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-600"
            >
              <CardHeader className="pb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
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
              <CardContent className="grid gap-2 sm:grid-cols-3">

                {/* Propiedad 1 — Pregunta */}
                <div className="sm:col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Pregunta
                  </p>
                  <p
                    className="mt-1 text-sm text-zinc-100 leading-snug"
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />
                </div>

                {/* Propiedad 2 — Categoría */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Categoría
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">{q.category}</p>
                </div>

                {/* Propiedad 3 — Respuesta correcta */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Respuesta correcta
                  </p>
                  <p
                    className="mt-1 text-sm text-emerald-400 font-medium"
                    dangerouslySetInnerHTML={{ __html: q.correct_answer }}
                  />
                </div>

                {/* Propiedad 4 — Total de opciones */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Total opciones
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">
                    {q.incorrect_answers.length + 1}
                  </p>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}