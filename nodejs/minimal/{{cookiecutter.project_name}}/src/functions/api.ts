import middy from "@middy/core";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
	captureLambdaHandler,
	injectLambdaContext,
	logMetrics,
	logger,
	metrics,
	tracer,
} from "../powertools";

export const lambdaHandler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	logger.info("Received request", { event });
	try {
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: "hello world",
			}),
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "some error happened",
			}),
		};
	}
};

export const handler = middy(lambdaHandler)
	.use(injectLambdaContext(logger, { clearState: true }))
	.use(logMetrics(metrics, { captureColdStartMetric: true }))
	.use(captureLambdaHandler(tracer));
