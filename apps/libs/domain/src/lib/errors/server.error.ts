export class ServerError extends Error {
  constructor(
    entity: string,
    action: string,
    details?: unknown
  ) {
    super(`[Server ${entity} error] An error occurred on ${action}`);
  }
}
