import axios from "axios";

/* ===========================================
   FOLLOWIZ CONFIG
=========================================== */
const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";
const FOLLOWIZ_API_URL = "https://api.followiz.com/v2";

/* ===========================================
   PLACE ORDER
=========================================== */
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

    return response.data; // { order: 12345, charge: "..." }
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Unknown Followiz error";

    console.error("❌ Followiz Order Error:", errMsg);

    throw new Error(`Followiz Error: ${errMsg}`);
  }
}

/* ===========================================
   CHECK ORDER STATUS
=========================================== */
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

    return response.data; // full status object
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Unknown Followiz error";

    console.error("❌ Followiz Status Error:", errMsg);

    throw new Error(`Followiz Status Error: ${errMsg}`);
  }
}
