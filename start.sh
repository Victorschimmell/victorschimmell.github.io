#!/bin/bash
set -e  # Exit on any error
npx prisma migrate deploy
npm run build
npm start