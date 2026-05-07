export async function handler(event) {
  const { shop_id } = JSON.parse(event.body || "{}");

  if (!shop_id) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "shop_id is required" }),
    };
  }

  const formatted = "2026-05-07";

  try {
    const res = await fetch(
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
      },
    );

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: `Remote API error: ${res.status} ${text}` }),
      };
    }

    const response = await res.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
