// utils/llmClient.js
import dotenv from 'dotenv';
import { Readable } from 'node:stream';


dotenv.config();


const OLLAMA = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const LLM_MODEL = process.env.LLM_MODEL || 'llama3.1:8b-instruct';
const EMBED_MODEL = process.env.EMBED_MODEL || 'nomic-embed-text';
const LLM_TEMPERATURE = Number(process.env.LLM_TEMPERATURE || 0.2);

export async function embedTexts(texts = []) {
if (json.data) return json.data.map(d => d.embedding);
throw new Error('Unexpected embedding response');
}


export async function chatOnce({ messages, tools = undefined }) {
// Non-streaming helper (useful for tool calls)
const res = await fetch(`${OLLAMA}/api/chat`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ model: LLM_MODEL, messages, options: { temperature: LLM_TEMPERATURE }, stream: false }),
});
if (!res.ok) throw new Error(`Chat failed: ${res.status}`);
const json = await res.json();
// shape: { message: { role: 'assistant', content: '...' }, done: true }
return json?.message?.content || '';
}


export async function chatStream({ messages }) {
// Returns a Readable stream of tokens
const res = await fetch(`${OLLAMA}/api/chat`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ model: LLM_MODEL, messages, options: { temperature: LLM_TEMPERATURE }, stream: true }),
});
if (!res.ok || !res.body) throw new Error(`Chat stream failed: ${res.status}`);
// Ollama streams NDJSON lines; we convert to a token stream
const reader = res.body.getReader();
const stream = new Readable({ read() {} });


(async () => {
const decoder = new TextDecoder();
try {
while (true) {
const { value, done } = await reader.read();
if (done) break;
const chunk = decoder.decode(value, { stream: true });
for (const line of chunk.split('\n')) {
if (!line.trim()) continue;
try {
const obj = JSON.parse(line);
const token = obj?.message?.content || '';
if (token) stream.push(token);
} catch (_) { /* ignore partial lines */ }
}
}
} catch (e) {
stream.destroy(e);
return;
}
stream.push(null);
})();


return stream;
}