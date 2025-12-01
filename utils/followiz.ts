// path: utils/followiz.ts
import axios from "axios";

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";
const FOLLOWIZ_API_URL = "https://api.followiz.com/v2";

/**
 * Place an order on Followiz
 */
export async function placeFollowizOrder({
  service,
  link,
  quantity,
}: {
  service: number;
  link: string;
  quantity: number;
}) {
  try {
    const response = await axios.post(
      FOLLOWIZ_API_URL,
      new URLSearchParams({
        key: FOLLOWIZ_API_KEY,
        action: "add",
        service: String(service),
        link,
        quantity: String(quantity),
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data; // { order: 123456 }
  } catch (error: any) {
    const msg =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Unknown Followiz error";

    console.error("❌ Followiz Order Error:", msg);
    throw new Error(`Followiz Error: ${msg}`);
  }
}

/**
 * Check the status of an existing Followiz order
 */
export async function checkFollowizOrderStatus(orderId: string) {
  try {
    const response = await axios.post(
      FOLLOWIZ_API_URL,
      new URLSearchParams({
        key: FOLLOWIZ_API_KEY,
        action: "status",
        order: String(orderId),
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data; // status payload
  } catch (error: any) {
    const msg =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Unknown Followiz status error";

    console.error("❌ Followiz Status Error:", msg);
    throw new Error(`Followiz Status Error: ${msg}`);
  }
}
