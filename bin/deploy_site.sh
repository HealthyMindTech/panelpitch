#!/usr/bin/env bash

npm run build
cd cdk
cdk --profile soil-test deploy ExpertMinds-StaticStack
