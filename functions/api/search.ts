import { words } from "./words";

export async function onRequest(context: any) {
	return Response.json(words);
}
