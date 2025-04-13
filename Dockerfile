# Stage 1: Build the Vite project
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve with preview
FROM node:18
WORKDIR /app

COPY --from=builder /app /app
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]