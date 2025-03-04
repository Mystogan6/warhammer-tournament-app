#!/bin/bash

# Start Database & Redis
docker-compose up -d

# Start Backend (NestJS)
pushd apps/backend
npm run start:dev &
popd

# Start Web Frontend (Next.js)
pushd apps/web
npm run dev &
popd

# Start Mobile Frontend (React Native)
# pushd apps/mobile
# npx expo start &
# popd
