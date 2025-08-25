export async function handler(event, context) {
    try {
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                headers: corsHeaders(),
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };
        }

        const { prompt, max_tokens = 120, model = "command-r-plus" } = JSON.parse(event.body || "{}");

        if (!prompt) {
            return {
                statusCode: 400,
                headers: corsHeaders(),
                body: JSON.stringify({ error: "Falta 'prompt' en el body." }),
            };
        }

        const cohereRes = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ProcessingInstruction.env.COHERE_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                prompt,
                max_tokens,
                temperature: 0.7,
            })
        });

        if (!cohereRes.ok) {
            const errText = await cohereRes.text();
            return {
                statusCode: cohereRes.status,
                headers: corsHeaders(),
                body: JSON.stringify({ error: "Error de Cohere", detail: errText }),
            };
        }

        const data = await cohereRes.json();
        const text = data?.generations?.[0]?.text ?? "";

        return {
            statusCode: 200,
            headers: corsHeaders(),
            body: JSON.stringify({ text }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: corsHeaders(),
            body: JSON.stringify({ error: err.message }),
        };
    }
}

const ORIGIN_ALLOWED = process.env.ORIGIN_ALLOWED || "*";
function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": ORIGIN_ALLOWED,
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };
}

export async function onRequest(event, context) {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: corsHeaders(),
            body: "",
        };
    }
}
