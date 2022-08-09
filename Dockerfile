FROM c.rzp.io/proxy_dockerhub/library/node:14

ARG APP_NAME
ARG STAGE
ARG GITHUB_ACCESS_TOKEN
ARG SENTRY_AUTH_TOKEN
ARG AWS_S3_BUCKET_NAME
ARG AWS_DEFAULT_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_SESSION_TOKEN
ARG VERSION

ENV APP_NAME=$APP_NAME
ENV STAGE=$STAGE
ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV AWS_S3_BUCKET_NAME=$AWS_S3_BUCKET_NAME
ENV AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN
ENV VERSION=$VERSION

RUN apt-get update && apt-get install -y ca-certificates

EXPOSE 8888
	
# Setup AWS CLI
RUN apt-get update && apt-get install -y awscli

# Create app directory
RUN mkdir /$APP_NAME && chown -R node:node /$APP_NAME

WORKDIR /$APP_NAME

# Switch to node user
USER node

# Copy dependencies files so we can have better caching as these don't change often
COPY --chown=node:node .npmrc package.json yarn.lock ./

# Install strictly from lockfile don't generate new lockfile
RUN yarn install --frozen-lockfile

# Copy app source
COPY --chown=node:node . ./

# Build the app source. This command will run during docker build
RUN yarn $STAGE:build

# Upload build assets to S3
RUN aws s3 cp --cache-control "public, max-age=31536000" --recursive ./build/browser s3://$AWS_S3_BUCKET_NAME/build/browser

# For testing if assets uploaded correctly
# RUN aws s3 ls s3://$AWS_S3_BUCKET_NAME/build/browser

# Serve the app. This command will run during docker run
CMD yarn $STAGE:serve
