import 'dotenv/config';

async function submit() {
  try {
    const rawAuth = process.env.API_AUTH || "";
    const authHeader = "Basic " + Buffer.from(rawAuth).toString("base64");
    console.log("🔑 Authorization Header:", authHeader);

    const response = await fetch("https://fe-test-server.vercel.app/api/send-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify({
        name: process.env.SUBMIT_NAME,
        email: process.env.SUBMIT_EMAIL,
        repo_url: process.env.SUBMIT_REPO_URL,
      }),
    });

    if (!response.ok) {
      throw new Error(`❌ Failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Success! Response:", data);
  } catch (err) {
    console.error("❌ Error:", err);
  }

  console.log("Payload:", {
    name: process.env.SUBMIT_NAME,
    email: process.env.SUBMIT_EMAIL,
    repo_url: process.env.SUBMIT_REPO_URL,
  });
}

submit();
