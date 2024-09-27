#!/bin/bash

# wait-for-it.sh script to check for db connectivity

set -e

# Extract host and remaining command
host="$1"
shift
cmd="$@"

# Debugging output
echo "Attempting to connect to PostgreSQL at $host"
echo "Using username: $POSTGRES_USER"
echo "Using password: $POSTGRES_PASSWORD"

# Loop until we can successfully execute '\q' on PostgreSQL
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" -d "mydatabase" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd