import { useEffect, useState } from "react";

export default function usePortData(rc_id) {
  const [error, setError] = useState(false);
  const [fps_id, setFPS_id] = useState({ fps_id: null, member_name_en: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const apiResponse = await fetch("/api/getPortData", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ rc_id }),
        });

        if (!apiResponse.ok) {
          const text = await apiResponse.text();
          throw new Error(`Function request failed: ${apiResponse.status} ${text}`);
        }

        const response = await apiResponse.json();
        const filtered_data = response?.port_fpsid?.[0];

        setFPS_id({
          fps_id: filtered_data?.port_fpsid || null,
          member_name_en: filtered_data?.availed_member_name || null,
        });
      } catch (err) {
        setError(true);
        setFPS_id({ fps_id: null, member_name_en: null });
        console.error(`Error fetching data for RC ID ${rc_id}:`, err);
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
