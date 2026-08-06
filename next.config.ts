import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'tough-actors-shout.loca.lt',
    '*.loca.lt',
    '*.ngrok-free.app',
    '*.trycloudflare.com',
    '192.168.1.2',
    'localhost:3000',
  ],
}

export default nextConfig
