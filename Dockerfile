# THIS DOCKERFILE SHOULD NOT BE USED
# Your deployment platform should use Node.js runtime instead
# Please change your deployment settings to use "Node.js" or "Buildpack" mode

FROM scratch
RUN echo "ERROR: This deployment should use Node.js runtime, not Docker!" && exit 1
RUN echo "Please configure your deployment platform to use Node.js buildpack" && exit 1
RUN echo "Check your deployment dashboard for runtime/buildpack settings" && exit 1
