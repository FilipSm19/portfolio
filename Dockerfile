# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies with frozen lockfile for reproducible builds (cache package files)
RUN --mount=type=cache,target=/root/.npm \ 
    npm ci --no-audit --no-fund 

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

FROM node:${NODE_VERSION} AS builder

# Set working dir
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV NODE_ENV=production

RUN if [ -f package-lock.json ]; then \
    npm run build; \
    else \
    echo "No lockfile found." && exit 1; \
    fi

# ============================================
# Stage 3: Production Runner Stage
# ============================================

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next 
RUN chown node:node .next 

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]