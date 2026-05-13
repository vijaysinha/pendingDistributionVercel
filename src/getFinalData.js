import { getAllotment } from "./getAllotment.js";
import { getDistribution } from "./getDistribution.js";

export default async function getFinalData(shop_id) {
  try {
    // Running both in parallel for efficiency
    const [distributionData = [], allotmentData = []] = await Promise.all([
      getDistribution(shop_id).catch(() => []),
      getAllotment(shop_id).catch(() => []),
    ]);

    return findAllotment(distributionData, allotmentData);
  } catch (err) {
    console.error("Error in getFinalData:", err);
    return [];
  }
}

function findAllotment(distributionData, allotmentData) {
  const searchableRC = Object.fromEntries(
    distributionData.map(obj => [obj.rc_id, obj])
  );

  return allotmentData.map(a => {
    const b = searchableRC[a.rc_id];
    const result = { rc_id: a.rc_id };

    for (const key of Object.keys(a)) {
      if (key !== "rc_id") {
        result[key] = (a[key] || 0) - ((b && b[key]) || 0);
      }
    }

    return result;
  });
}
