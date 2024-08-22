import { Logger } from "@aws-lambda-powertools/logger";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";
export { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
export { logMetrics } from "@aws-lambda-powertools/metrics/middleware";
export { captureLambdaHandler } from "@aws-lambda-powertools/tracer/middleware";

export const logger = new Logger();
export const metrics = new Metrics();
export const tracer = new Tracer();
tracer.provider.setLogger(logger);
