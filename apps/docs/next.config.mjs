import { createMDX } from 'fumadocs-mdx/next';
 
const config = {
  reactStrictMode: true,
  serverExternalPackages: ['twoslash'],
     images: {
 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
         pathname: '/u/**',
       },
    ],
  },
};
 
const withMDX = createMDX();
 
export default withMDX(config);