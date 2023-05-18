#!/usr/bin/env bash

cd backend
npm run build
cd ../cdk
cdk --profile soil-test deploy ExpertMinds-LambdaStack