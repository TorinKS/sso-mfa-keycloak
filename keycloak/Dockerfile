
FROM quay.io/keycloak/keycloak:26.1.4 as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true



WORKDIR /opt/keycloak

USER 1000
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.1.4
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# we are required to have dev keycloak in order to avoid using TLS certs and be able to see HTTP traffic for SSO checks
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--http-relative-path=/auth", "--features=token-exchange"]



# RUN ./bin/kc.sh start-dev --http-relative-path /auth --metrics-enabled=true --health-enabled=true --features token-exchange