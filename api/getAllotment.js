export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { shop_id } = req.body || {};
  console.log("Received shop_id:", shop_id);

  if (!shop_id) {
    return res.status(400).json({ error: "shop_id is required" });
  }

  try {
    const apiResponse = await fetch(
      "https://epos.cg.gov.in/Epos_Spring/KeyRegister/getfpsKeyRegisterCardsList",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          month: "4",
          year: "2026",
          dist_code: "386",
          afso_code: "4048",
          fps_id: shop_id,
        }),
      }
    );

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      return res
        .status(500)
        .json({ error: `Remote API error: ${apiResponse.status} ${text}` });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
