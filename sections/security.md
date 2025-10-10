# Security Considerations {#Security}

## Communication Integrity and Confidentiality {#security-integrity-confidentiality}

In the ABAC architecture, the PEP-PDP connection is the most sensitive one and needs to be secured to guarantee:

- Integrity
- Confidentiality

As a result, the connection between the PEP and the PDP MUST be secured using the most adequate means given the choice of transport (e.g. TLS for HTTP REST).

## Policy Confidentiality and Sender Authentication {#security-confidentiality-authn}

Additionally, the PDP SHOULD authenticate the calling PEP. There are several ways authentication can be established. These ways are out of scope of this specification. They MAY include:

- Mutual TLS
- OAuth-based authentication
- API key

The choice and strength of either mechanism is not in scope.

Authenticating the PEP allows the PDP to avoid common attacks (such as DoS - see below) and/or reveal its internal policies. A malicious actor could craft a large number of requests to try and understand what policies the PDP is configured with. Requesting a PEP be authenticated mitigates that risk.

## Sender Authentication Failure {#security-sender-authentn-fail}

If the protected resource request does not include the proper authentication credentials, or does not have a valid authentication scheme proof that enables access to the protected resource, the resource server MUST respond with a 401 HTTP status code and SHOULD include the HTTP "WWW-Authenticate" response header field; it MAY include it in response to other conditions as well. The "WWW-Authenticate" header field uses the framework defined by HTTP/1.1 [[?RFC2617]] and indicates the expected authentication scheme as well as the realm that has authority for it.

The following is a non-normative example response:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="https://as.example.com"
```

## Trust {#security-trust}

In ABAC, there are occasionally conversations around the trust between PEP and PDP: how can the PDP trust that the PEP is sending the correct values? The architecture of this model assumes the PDP must trust the PEP, as the PEP is ultimately responsible for enforcing the decision the PDP produces.

## JSON Payload Considerations {#security-json}

To ensure the unambiguous interpretation of JSON payloads, implementations SHOULD process and generate JSON payloads in a manner consistent with the I-JSON profile ([[?RFC7493]]). In particular, implementations SHOULD ensure that:

- JSON text is encoded as UTF-8, and strings do not contain invalid Unicode sequences such as unpaired surrogates (Section 2.1 of [[?RFC7493]]).
- Numeric values do not exceed the magnitude or precision supported by IEEE 754 double-precision (Section 2.2 of [[?RFC7493]]).  
- Member names within a JSON object are unique after processing escape characters (Section 2.3 of [[?RFC7493]]).

To avoid ambiguity between a property that is absent and one that is present with a null value, properties with a value of null SHOULD be omitted from JSON objects.

## Authorization Response Integrity {#security-authorization-response-integrity}

The PDP MAY choose to sign its authorization response, ensuring the PEP can verify the integrity of the data it receives. This practice is valuable for maintaining trust in the authorization process.

The PEP can ensure that the authorization response is not tampered with by verifying the signature of the authorization decision if it is signed. It ensures response accuracy and completeness.

TLS effectively protects data in transit for a direct, point-to-point connection but does not guarantee data integrity for the full connection path between the PEP and the PDP if there are intermediaries, such as proxies or gateways.

Digital signatures offer important advantages in this context. They provide non-repudiation, allowing verification that the response genuinely originated from the PDP. Moreover, digital signatures ensure the integrity of the authorization response, confirming that its contents have not been altered in transit.

## Availability & Denial of Service {#security-avail-dos}}

The PDP SHOULD apply reasonable protections to avoid common attacks tied to request payload size, the number of requests, invalid JSON, nested JSON attacks, or memory consumption. Rate limiting is one such way to address such issues.

## Differences between Unsigned and Signed Metadata {#security-metadata-sig}

Unsigned metadata is integrity protected by use of TLS at the site where it is hosted. This means that its security is dependent upon the Internet Public Key Infrastructure (PKI) [[?RFC9525]]. Signed metadata is additionally integrity protected by the JWS signature applied by the issuer, which is not dependent upon the Internet PKI.
When using unsigned metadata, the party issuing the metadata is the PDP itself. Whereas, when using signed metadata, the party issuing the metadata is represented by the `iss` (issuer) claim in the signed metadata. When using signed metadata, applications can make trust decisions based on the issuer that performed the signing -- information that is not available when using unsigned metadata. How these trust decisions are made is out of scope for this specification.

## Metadata Caching {#security-metadata-caching}

Policy Decision Point metadata is retrieved using an HTTP GET request, as specified in [[[#pdp-metadata-access-request]]]. Normal HTTP caching behaviors apply, meaning that the GET may retrieve a cached copy of the content, rather than the latest copy. Implementations should utilize HTTP caching directives such as Cache-Control with max-age, as defined in [[?RFC7234]], to enable caching of retrieved metadata for appropriate time periods.
