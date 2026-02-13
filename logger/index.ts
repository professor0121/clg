import pino from "pino"
export * from "./http.logger";
export * from "./logger.types";

const isDev = process.env.NODE_ENV !== "production"

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  base: undefined, // remove default pid & hostname in prod JSON
})

export function createChildLogger(context: Record<string, unknown>) {
  return logger.child(context)
}
