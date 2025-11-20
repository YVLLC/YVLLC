import axios from "axios";

const FOLLOWIZ_API_KEY = process.env.FOLLOWIZ_API_KEY || "";

// Followiz API endpoint
const FOLLOWIZ_API_URL = "https://api.followiz.com";

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
        service: service.toString(),
        link,
        quantity: quantity.toString(),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data; // { order: 123456 }
  } catch (error: any) {
    console.error("Followiz Order Error:", error?.response?.data || error);
    throw new Error("Failed to place Followiz order.");
  }
}

export async function checkFollowizOrderStatus(orderId: string) {
  try {
    const response = await axios.post(
      FOLLOWIZ_API_URL,
      new URLSearchParams({
        key: FOLLOWIZ_API_KEY,
        action: "status",
        order: orderId,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data; // { status: ... }
  } catch (error: any) {
    console.error("Followiz Status Error:", error?.response?.data || error);
    throw new Error("Failed to check Followiz order status.");
  }
}
