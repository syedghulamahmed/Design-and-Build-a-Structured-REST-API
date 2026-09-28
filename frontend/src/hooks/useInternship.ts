import { useCallback, useEffect, useState } from "react";
import { fetchInternship } from "../services/internshipApi";
import type { Internship } from "../types/internship";

export function useInternship(id: string | undefined) {
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((value) => value + 1), []);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setError(null);
    fetchInternship(id)
      .then((data) => active && setInternship(data))
      .catch((reason: unknown) => active && setError(reason instanceof Error ? reason.message : "Unable to load internship."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id, reloadToken]);

  return { internship, loading, error, reload };
}
