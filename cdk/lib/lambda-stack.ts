import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct  } from 'constructs';

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambdaRole = new iam.Role(this, 'lambda-role', {
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
            managedPolicies: [
                iam.ManagedPolicy.fromManagedPolicyArn(
                    this, "lambda-basic-execution",
                    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
                ),
                iam.ManagedPolicy.fromManagedPolicyArn(
                    this, "aws-lambda-role",
                    "arn:aws:iam::aws:policy/service-role/AWSLambdaRole"
                ),
                iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchLambdaInsightsExecutionRolePolicy"),
            ]
        });

        const asset = lambda.Code.fromAsset("../backend/build/");
        const lambdaEntry = new lambda.Function(
            this, "lambda", {
                runtime: lambda.Runtime.NODEJS_16_X,
                code: asset,
                handler: 'app.generateCompletion',
                role: lambdaRole,
                timeout: Duration.seconds(60),
            });


        const api = new apigateway.RestApi(
            this,
            'rest-api',
            {
                restApiName: "intellipitch",
                defaultCorsPreflightOptions: {
                    allowOrigins: apigateway.Cors.ALL_ORIGINS,
                    allowMethods: apigateway.Cors.ALL_METHODS,
                    allowHeaders: [...apigateway.Cors.DEFAULT_HEADERS]
                }
            });

        api.root.addResource("completion").addMethod("GET", new apigateway.LambdaIntegration(lambdaEntry));
    }
}
