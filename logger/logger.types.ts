export interface BaseLogContext {
  requestId?: string
  userId?: string
  module?: string
  ip?: string
}

export interface HttpLogContext extends BaseLogContext {
  method: string
  url: string
  statusCode?: number
  durationMs?: number
}
