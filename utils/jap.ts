import axios from "axios";

const JAP_API_KEY = process.env.JAP_API_KEY || "";

const JAP_API_URL = "https://justanotherpanel.com/api/v2";

export async function placeJAPOrder({
  service,
  link,
  quantity,
}: {
  service: number;
  link: string;
  quantity: number;
}) {
  try {
    const response = await axios.post(JAP_API_URL, {
      key: JAP_API_KEY,
      action: "add",
      service,
      link,
      quantity,
    });

    return response.data;
  } catch (error: any) {
    console.error("JAP Order Error:", error?.response?.data || error);
    throw new Error("Failed to place JAP order.");
  }
}

export async function checkJAPOrderStatus(orderId: string) {
  try {
    const response = await axios.post(JAP_API_URL, {
      key: JAP_API_KEY,
      action: "status",
      order: orderId,
    });

    return response.data;
  } catch (error: any) {
    console.error("JAP Status Error:", error?.response?.data || error);
    throw new Error("Failed to check order status.");
  }
}
