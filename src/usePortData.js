import { useEffect, useState } from "react";

export default function usePortData(rc_id) {
  const [error, setError] = useState(false);
  const [fps_id, setFPS_id] = useState({ fps_id: null, member_name_en: null })
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
        const filterd_data = await response?.port_fpsid[0]
        console.log("Filtered data:", filterd_data);
        setFPS_id({ fps_id: filterd_data?.port_fpsid || null, member_name_en: filterd_data?.availed_member_name || null });
       
      } catch (err) {
        setError(true);
        console.error(`Error fetching data for RC ID ${rc_id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (rc_id) {
      fetchData();
    }
  }, [rc_id]);
  console.log(fps_id)
  return { error, fps_id, loading };
}
