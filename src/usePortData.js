import { useEffect, useState } from "react";

export default function usePortData(rc_id) {
  const [error, setError] = useState(false);
  const [fps_id, setFPS_id] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await fetch("/.netlify/functions/getPortData", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ rc_id }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Function request failed: ${res.status} ${text}`);
        }

        const response = await res.json();
        setFPS_id(response.port_fpsid);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (rc_id) {
      fetchData();
    }
  }, [rc_id]);

  return { error, fps_id, loading };
}
