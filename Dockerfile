# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build authentication-api`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t authentication-api`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system authentication-api && \
          adduser --system -G authentication-api authentication-api

COPY dist/authentication-api authentication-api/
RUN chown -R authentication-api:authentication-api .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix authentication-api --omit=dev -f install

CMD [ "node", "authentication-api" ]
