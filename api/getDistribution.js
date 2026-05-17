export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { shop_id } = req.body || {};
  if (!shop_id) {
    return res.status(400).json({ error: "shop_id is required" });
  }

 const today = new Date();
const formatted = today.toISOString().split("T")[0];

  try {
    const apiResponse = await fetch(
      "https://epos.cg.gov.in/Epos_Spring/api/DetailedTrans/Rc",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          date: formatted,
          distCode: "386",
          afsoCode: "4048",
          fpsId: shop_id,
        }),
      }
    );

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      return res
        .status(apiResponse.status)
        .json({ error: `Remote API error: ${apiResponse.status} ${text}` });
    }

    const response = await apiResponse.json();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
