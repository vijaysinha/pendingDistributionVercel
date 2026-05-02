import { getAllotment } from "./getAllotment.js";
import { getDistribution } from "./getDistribution.js";

export default async function getFinalData(shop_id) {
  const distributionData = await getDistribution(shop_id);
  const allotmentData = await getAllotment(shop_id);
  return findAllotment(distributionData, allotmentData);
}

function findAllotment(distributionData, allotmentData) {
  const searchableRC = Object.fromEntries(
    distributionData.map((obj) => [obj.rc_id, obj]),
  );

  return allotmentData.map((a) => {
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
