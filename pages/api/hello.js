// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default function handler(request, response) {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}