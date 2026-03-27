export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `*New message from thejoewilkinson.com*\n*Name:* ${name}\n*Email:* ${email}\n*Message:*\n${message}`,
    }),
  });

  if (!slackRes.ok) {
    return Response.json({ error: "Slack delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
