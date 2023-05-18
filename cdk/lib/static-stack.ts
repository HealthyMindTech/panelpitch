import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class StaticStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentity');
        const bucket = new s3.Bucket(this, "expert-mind-bucket", {
            websiteIndexDocument: "index.html",
            publicReadAccess: true

        });
        bucket.grantRead(originAccessIdentity);

        const origin = new cloudfrontOrigins.S3Origin(bucket, {
            originAccessIdentity: originAccessIdentity
        });

        const distribution = new cloudfront.Distribution(this, "expert-minds", {
            defaultRootObject: "index.html",
            defaultBehavior: { origin: origin }
        });

        const bucketDeployment = new s3Deployment.BucketDeployment(
            this,
            id="bucket_deployment",
            {
                sources: [s3Deployment.Source.asset("../build")],
                destinationBucket: bucket,
                distribution: distribution,
                prune: true
            });

    }
}
