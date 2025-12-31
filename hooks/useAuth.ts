import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth(requireAuth = false) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, requireAuth, router])

  return {
    session,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  }
}

export function useRequireAuth() {
  return useAuth(true)
}

export function useIsAdmin() {
  const { session, isAuthenticated } = useAuth()
  return isAuthenticated && (session?.user as any)?.type === "ADMIN"
}
