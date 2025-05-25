// export const allowedDevOrigins = ['local-origin.dev', '*.local-origin.dev']

// export async function Crossorigin() {
//         return [
//             {
//                 // matching all API routes
//                 source: "/api/:path*",
//                 headers: [
//                     { key: "Access-Control-Allow-Credentials", value: "true" },
//                     { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
//                     { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//                     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//                 ]
//             }
//         ]
//     }

// export async function rewrites() {
//  return [
//    {
//      source: "/",
//      destination: process.env.WEBAPP_URL
//    },
//  ];
// }

const nextConfig = {
  output: 'export',
}
 
export default nextConfig