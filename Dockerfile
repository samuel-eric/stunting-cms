# Use the official Node.js 23 slim image as a base
FROM node:23-slim AS base

# -----------------------------------------------------------------

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json* ./

# Install project dependencies using npm
RUN npm install

# -----------------------------------------------------------------

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# -----------------------------------------------------------------

# Stage 3: Production image
FROM base AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group for better security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy the static assets from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the port environment variable
ENV PORT=3000

# The command to run the application
CMD ["node", "server.js"]