import { useState, useEffect } from "react"
import type { TriviaQuestion, TriviaApiResponse } from "@/types/trivia"

const API_URL = `https://opentdb.com/api.php?amount=10&token=${import.meta.env.VITE_TRIVIA_TOKEN}`
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000

interface UseTriviaReturn {
  questions: TriviaQuestion[]
  loading: boolean
  error: string | null
  refetch: () => void
}

async function fetchWithRetry(url: string, retries: number): Promise<TriviaApiResponse> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(url)

    if (response.status === 429 && attempt < retries) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
      continue
    }

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data: TriviaApiResponse = await response.json()

    // response_code 5 = rate limit de OpenTDB
    if (data.response_code === 5 && attempt < retries) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
      continue
    }

    return data
  }

  throw new Error("No se pudo obtener preguntas después de varios intentos")
}

export function useTrivia(): UseTriviaReturn {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState<number>(0)

  useEffect(() => {
    let cancelled = false

    async function fetchTrivia() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchWithRetry(API_URL, MAX_RETRIES)

        if (!cancelled) {
          setQuestions(data.results)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error desconocido")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchTrivia()

    return () => {
      cancelled = true
    }
  }, [trigger])

  const refetch = () => setTrigger(prev => prev + 1)

  return { questions, loading, error, refetch }
}