export function getWelcomeEmailHtml(opts: { name?: string }) {
  const name = opts.name || "there";

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to YesViral</title>
  </head>

  <body style="margin:0;padding:0;background:#E6F0FF;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px;background:#FFFFFF;border-radius:22px;padding:32px;border:1px solid #CFE4FF;box-shadow:0 12px 30px rgba(0,0,0,0.08);">

            <tr>
              <td align="center" style="padding-bottom:10px;">
                <img 
                  src="https://yesviral.com/logo.png" 
                  alt="YesViral Logo" 
                  width="70" 
                  height="70" 
                  style="border-radius:16px;"
                />
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:28px;font-weight:800;color:#007BFF;padding-top:6px;">
                Welcome to YesViral 🎉
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:15px;color:#444;padding:8px 0 22px;">
                Hey ${name}, your account has been created — you're ready to grow.
              </td>
            </tr>

            <tr>
              <td>
                <div style="
                  background:#F5F9FF;
                  border:1px solid #CFE4FF;
                  padding:18px 20px;
                  border-radius:16px;
                  font-size:14px;
                  color:#333;">
                  <strong style="color:#007BFF;">Welcome aboard 🎉</strong><br/><br/>
                  You now have access to High-Quality Followers, Likes & Views delivered through YesViral’s trusted Private Delivery Networks.
                  <br/><br/>
                  Here’s what you can do next:
                  <ul style="margin-top:10px;padding-left:22px;color:#333;line-height:1.55;">
                    <li>Place your first order in under 60 seconds</li>
                    <li>Track every order in real-time</li>
                    <li>Enjoy our 30-day refill guarantee</li>
                    <li>Premium growth across Instagram, TikTok, YouTube & more</li>
                  </ul>
                </div>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:28px;">
                <a href="https://yesviral.com/dashboard"
                  style="
                    background:#007BFF;
                    color:white;
                    text-decoration:none;
                    padding:14px 32px;
                    border-radius:12px;
                    font-size:16px;
                    font-weight:700;
                    box-shadow:0 8px 18px rgba(0,123,255,0.35);
                    display:inline-block;">
                  Go to Dashboard →
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:28px;font-size:13px;color:#666;line-height:1.6;">
                ⚡ Instant Order Start • 🔒 Secure Checkout • 🛡 30-Day Refill Protection
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:28px;font-size:11px;color:#999;">
                If you didn’t create a YesViral account, you can safely ignore this email.
                <br/><br/>
                © ${new Date().getFullYear()} YesViral — All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}



// =======================
// ORDER CONFIRMATION EMAIL
// (THE MISSING ONE YOU NEED)
// =======================
export function getOrderConfirmationHtml(order: any) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Your YesViral Order Confirmation</title>
  </head>

  <body style="margin:0;padding:0;background:#E6F0FF;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px;background:#FFFFFF;border-radius:22px;padding:32px;border:1px solid #CFE4FF;box-shadow:0 12px 30px rgba(0,0,0,0.08);">

            <tr>
              <td align="center">
                <img 
                  src="https://yesviral.com/logo.png" 
                  width="70"
                  height="70"
                  style="border-radius:16px;"
                />
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:26px;font-weight:800;color:#007BFF;padding-top:12px;">
                Order Confirmed 🎉
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:15px;color:#444;padding:10px 0 24px;">
                Thank you for your purchase — your order is now being processed.
              </td>
            </tr>

            <tr>
              <td style="background:#F5F9FF;border:1px solid #CFE4FF;padding:20px;border-radius:16px;">
                <div style="font-size:14px;color:#333;line-height:1.55;">
                  <strong style="color:#007BFF;">Order Details</strong><br/><br/>

                  <strong>Order ID:</strong> ${order.order_id}<br/>
                  <strong>Platform:</strong> ${order.platform}<br/>
                  <strong>Service:</strong> ${order.service}<br/>
                  <strong>Quantity:</strong> ${order.quantity}<br/>
                  <strong>Amount Paid:</strong> $${order.amount}<br/>
                </div>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:26px;">
                <a href="https://yesviral.com/track-order?order_id=${order.order_id}"
                  style="
                    background:#007BFF;
                    color:white;
                    text-decoration:none;
                    padding:14px 32px;
                    border-radius:12px;
                    font-size:16px;
                    font-weight:700;
                    display:inline-block;
                    box-shadow:0 8px 18px rgba(0,123,255,0.35);">
                  Track Your Order →
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:26px;font-size:13px;color:#666;line-height:1.6;">
                ⚡ Instant Order Start • 🔒 Secure Checkout • 🛡 30-Day Refill Protection
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:26px;font-size:11px;color:#999;">
                © ${new Date().getFullYear()} YesViral — All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
