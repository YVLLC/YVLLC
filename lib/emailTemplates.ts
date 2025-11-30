export function getWelcomeEmailHtml(opts: { name?: string }) {
  const { name } = opts;
  const firstName = name || "there";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <title>Welcome to YesViral</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background-color:#0f172a;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a;padding:32px 0;">
      <tr>
        <td align="center">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#020617;border-radius:24px;border:1px solid #1e293b;overflow:hidden;box-shadow:0 25px 60px rgba(15,23,42,0.7);">
            <!-- Top gradient bar -->
            <tr>
              <td style="padding:0;">
                <div style="
                  height:6px;
                  background:linear-gradient(90deg,#0ea5e9,#3b82f6,#6366f1,#0ea5e9);
                "></div>
              </td>
            </tr>

            <!-- Logo / Header -->
            <tr>
              <td style="padding:24px 24px 12px 24px;text-align:left;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="
                    height:32px;
                    width:32px;
                    border-radius:999px;
                    background:radial-gradient(circle at 30% 20%,#e0f2fe,#0ea5e9 40%,#3b82f6 80%);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#0f172a;
                    font-weight:800;
                    font-size:16px;
                    box-shadow:0 10px 30px rgba(59,130,246,0.6);
                  ">
                    Y
                  </div>
                  <span style="font-weight:700;font-size:18px;color:#e5e7eb;">
                    YesViral
                  </span>
                </div>
              </td>
            </tr>

            <!-- Main content -->
            <tr>
              <td style="padding:4px 24px 24px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom:16px;">
                      <h1 style="
                        margin:0;
                        font-size:24px;
                        line-height:1.3;
                        color:#e5e7eb;
                        letter-spacing:-0.03em;
                      ">
                        Welcome to <span style="color:#3b82f6;">YesViral</span>, ${firstName} 👋
                      </h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:12px;">
                      <p style="
                        margin:0;
                        font-size:14px;
                        line-height:1.6;
                        color:#9ca3af;
                      ">
                        Your account is now live and ready to grow. You’ve just unlocked access
                        to high-quality followers, likes &amp; views delivered through our Private
                        Delivery Networks — built for speed, safety, and real engagement.
                      </p>
                    </td>
                  </tr>

                  <!-- Highlight card -->
                  <tr>
                    <td style="padding-top:16px;padding-bottom:16px;">
                      <div style="
                        border-radius:18px;
                        border:1px solid rgba(148,163,184,0.4);
                        background:radial-gradient(circle at top left,rgba(56,189,248,0.15),transparent 55%),
                                   radial-gradient(circle at bottom right,rgba(59,130,246,0.18),transparent 60%),
                                   #020617;
                        padding:16px 16px 14px 16px;
                      ">
                        <p style="margin:0 0 10px 0;font-size:13px;color:#e5e7eb;font-weight:600;">
                          Here’s what you can do next:
                        </p>
                        <ul style="margin:0;padding-left:18px;">
                          <li style="font-size:12px;color:#cbd5f5;line-height:1.6;">
                            Place your first order in under 60 seconds — no login required for checkout.
                          </li>
                          <li style="font-size:12px;color:#cbd5f5;line-height:1.6;">
                            Track every order in real-time from your dashboard.
                          </li>
                          <li style="font-size:12px;color:#cbd5f5;line-height:1.6;">
                            Get 30-day refill protection on eligible services.
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>

                  <!-- CTA button -->
                  <tr>
                    <td style="padding-top:4px;padding-bottom:18px;">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td>
                            <a href="https://yesviral.com/dashboard"
                               style="
                                 display:inline-block;
                                 padding:10px 22px;
                                 border-radius:999px;
                                 background:linear-gradient(135deg,#0ea5e9,#3b82f6);
                                 color:#f9fafb;
                                 font-size:13px;
                                 font-weight:600;
                                 text-decoration:none;
                                 box-shadow:0 15px 35px rgba(37,99,235,0.65);
                               ">
                              Open My Dashboard
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Feature pills -->
                  <tr>
                    <td style="padding-top:4px;padding-bottom:20px;">
                      <table border="0" cellspacing="0" cellpadding="0" style="width:100%;">
                        <tr>
                          <td style="font-size:11px;color:#9ca3af;padding-bottom:4px;">
                            You’re backed by:
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style="
                              display:inline-block;
                              font-size:11px;
                              color:#e5e7eb;
                              padding:4px 10px;
                              border-radius:999px;
                              background-color:rgba(15,118,110,0.18);
                              border:1px solid rgba(45,212,191,0.45);
                              margin-right:6px;
                              margin-bottom:6px;
                            ">
                              ⚡ Instant order start
                            </span>
                            <span style="
                              display:inline-block;
                              font-size:11px;
                              color:#e5e7eb;
                              padding:4px 10px;
                              border-radius:999px;
                              background-color:rgba(30,64,175,0.3);
                              border:1px solid rgba(96,165,250,0.6);
                              margin-right:6px;
                              margin-bottom:6px;
                            ">
                              🛡️ 30-day refill protection
                            </span>
                            <span style="
                              display:inline-block;
                              font-size:11px;
                              color:#e5e7eb;
                              padding:4px 10px;
                              border-radius:999px;
                              background-color:rgba(30,64,175,0.25);
                              border:1px solid rgba(129,140,248,0.6);
                              margin-right:6px;
                              margin-bottom:6px;
                            ">
                              🔒 Secure, PCI-compliant checkout
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="border-top:1px solid #1e293b;padding-top:14px;padding-bottom:4px;">
                      <p style="margin:0;font-size:11px;color:#6b7280;">
                        If you didn’t create a YesViral account, you can safely ignore this email.
                      </p>
                      <p style="margin:6px 0 0 0;font-size:11px;color:#4b5563;">
                        © ${new Date().getFullYear()} YesViral. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
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
