#!/bin/bash

# Ensure logs directory exists
mkdir -p logs

# Function to handle termination (CTRL + C)
cleanup() {
  echo "Stopping all services..."

  # Kill each process safely
  for pid in "${pids[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then # Check if process exists before killing
      kill "$pid"
      wait "$pid" 2>/dev/null
    fi
  done

  # Clear logs
  echo "Cleaning up logs..."
  rm -rf logs/*

  echo "All services stopped and logs cleared."
  exit 0
}

# Trap SIGINT (CTRL + C) and call cleanup function
trap cleanup SIGINT

# Start Database & Redis
docker-compose up -d

# Array to store process IDs
pids=()

# Start Backend (NestJS)
pushd apps/backend
npm run start:dev &> ../../logs/backend.log & pids+=($!)
popd

# Start Web Frontend (Next.js)
pushd apps/web
npm run dev &> ../../logs/web.log & pids+=($!)
popd

# Start Mobile Frontend (React Native)
# pushd apps/mobile
# npx expo start &> ../../logs/mobile.log & pids+=($!)
# popd

# Tail logs so everything is visible
tail -f logs/*.log & pids+=($!)

# Keep script running to track background jobs
wait
