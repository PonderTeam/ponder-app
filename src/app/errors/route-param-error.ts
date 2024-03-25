export class RouteParamNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RouteParamNotFound";
  }
}
