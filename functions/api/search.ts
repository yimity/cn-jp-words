import { words } from './words';

export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  const searchParams = new URLSearchParams(url.search);
  const type = Number(searchParams.get('type')) || 0;
  const keyword = searchParams.get('keyword') || '';

  const results = words.filter(word => {
    const isInclude = word.japanese.includes(keyword);
    if (type === 0) {
      return isInclude;
    } else {
      return word.type === type && isInclude;
    }
  });

  return Response.json({ data: results });
}
