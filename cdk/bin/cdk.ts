#!/usr/bin/env node

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda-stack';
import { StaticStack } from '../lib/static-stack';

const app = new cdk.App();
new LambdaStack(app, 'ExpertMinds-LambdaStack', {
  env: { region: 'us-east-1' },
});

new StaticStack(app, 'ExpertMinds-StaticStack', {
  env: { region: 'us-east-1' },
});
