export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { rc_id, month = "4", year = "2026" } = req.body || {};
    if (!rc_id) {
      return res.status(400).json({ error: "rc_id is required" });
    }

    const apiResponse = await fetch(
      "https://epos.cg.gov.in/Epos_Spring/sdms/SRC_Trans_Int",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, year, src_no: parseInt(rc_id, 10) }),
      }
    );

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      console.error("Remote API error:", text);
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch remote data" });
    }

    const response = await apiResponse.json();
    const port_fpsid = response?.benficaryTransList || [];

    return res.status(200).json({ port_fpsid });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
