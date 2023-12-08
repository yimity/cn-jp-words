export interface Env {
  DB_jinger: any;
}

export async function onRequest(context: any) {
  let env = context.env as Env;
  const { results } = await env.DB_jinger.prepare(
    "SELECT * FROM dictionary"
  ).all();
	return Response.json(results);
}
