import Stripe from 'stripe';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// JAP Service IDs with your provided IDs
const ids = {
  instagram: { Followers: 3305, Likes: 1845, Views: 513, Comments: 9565 },
  tiktok: { Followers: 1581, Likes: 10025, Views: 10019 },
  youtube: { Subscribers: 9533, Likes: 1381, Views: 876 },
};

function mapToJapServiceId(platform, service) {
  // Comments are optional, so safely check
  return (ids[platform.toLowerCase()] || {})[service] || null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const buf = await new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const japServiceId = mapToJapServiceId(session.metadata.platform, session.metadata.service);

    if (japServiceId) {
      try {
        await axios.post('https://justanotherpanel.com/api/v2', {
          key: process.env.JAP_API_KEY,
          action: 'add',
          service: japServiceId,
          link: session.metadata.target,
          quantity: session.metadata.quantity
        });
      } catch (err) {
        // You can log error to a file/service if you want
      }
    }
  }

  res.json({ received: true });
}
