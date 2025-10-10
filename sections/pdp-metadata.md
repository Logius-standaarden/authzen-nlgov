# Policy Decision Point Metadata {#pdp-metadata}

It is RECOMMENDED that PDPs provide metadata describing their configuration.

## Data structure {#pdp-metadata-data}

The following Policy Decision Point metadata parameters are used by this specification and are registered in the IANA "AuthZEN Policy Decision Point Metadata" registry established in [[[#iana-pdp-metadata-registry]]].

### Endpoint Parameters {#pdp-metadata-data-endpoint}

`policy_decision_point`:
: REQUIRED. The Policy Decision Point identifier, which is a URL that uses the "https" scheme and has no query or fragment components. Policy Decision Point metadata is published at a location that is ".well-known" according to [[RFC8615]] derived from this Policy Decision Point identifier, as described in [[[#pdp-metadata-access]]]. The Policy Decision Point identifier is used to prevent Policy Decision Point mix-up attacks.

`access_evaluation_endpoint`:
: REQUIRED. URL of Access Evaluation API endpoint

`access_evaluations_endpoint`:
: OPTIONAL. URL of Access Evaluations API endpoint

`search_subject_endpoint`:
: OPTIONAL. URL of Search API endpoint for subject entities

`search_action_endpoint`:
: OPTIONAL. URL of Search API endpoint for action entities

`search_resource_endpoint`:
: OPTIONAL. URL of Search API endpoint for resource entities

<p class="note">The absence of any of these parameters is sufficient for the PEP to determine that the PDP is not capable and therefore will not return a result for the associated API.</p>

### Capabilities Parameters {#pdp-metadata-data-capabilities}

`capabilities`:
: OPTIONAL. JSON array containing a list of registered IANA URNs referencing PDP specific capabilities.

### Signature Parameter {#pdp-metadata-data-sig}

In addition to JSON elements, metadata parameters MAY also be provided as a `signed_metadata` value, which is a JSON Web Token [[RFC7519]] that asserts metadata values about the PDP as a bundle. A set of metadata parameters that can be used in signed metadata as claims are defined in [[[#pdp-metadata-data-endpoint]]]. The signed metadata MUST be digitally signed or MACed using JSON Web Signature [[RFC7515]] and MUST contain an `iss` (issuer) claim denoting the party attesting to the claims in the signed metadata.

A PEP MAY ignore the signed metadata if they do not support this feature. If the PEP supports signed metadata, metadata values conveyed in the signed metadata MUST take precedence over the corresponding values conveyed using plain JSON elements. Signed metadata is included in the Policy Decision Point metadata JSON object using this OPTIONAL metadata parameter:

`signed_metadata`:
: A JWT containing metadata parameters about the protected resource as claims. This is a string value consisting of the entire signed JWT. A `signed_metadata` parameter SHOULD NOT appear as a claim in the JWT; it is RECOMMENDED to reject any metadata in which this occurs.

## Obtaining Policy Decision Point Metadata {#pdp-metadata-access}

PDPs supporting metadata MUST make a JSON document containing metadata as specified in the AuthZEN Policy Decision Point Metadata Registry ([[[#iana-pdp-metadata-registry]]]) available at a URL formed by inserting a well-known URI string between the host component and the path and/or query components, if any. The well-known URI string used is `/.well-known/authzen-configuration`.

The syntax and semantics of .well-known are defined in [[RFC8615]]. The well-known URI path suffix used is registered in the [[[IANA.well-known-uris]]].

An example of a PDP supporting multiple tenants will have a discovery endpoint as follows:

~~~ text
https://pdp.example.com/.well-known/authzen-configuration/tenant1
~~~

### Policy Decision Point Metadata Request {#pdp-metadata-access-request}

A Policy Decision Point metadata document MUST be queried using an HTTP GET request at the previously specified URL. The consumer of the metadata would make the following request when the resource identifier is `https://pdp.example.com`:

<pre class="http example">
GET /.well-known/authzen-configuration HTTP/1.1
Host: pdp.example.com
</pre>

### Policy Decision Point Metadata Response {#pdp-metadata-access-response}

The response is a set of metadata parameters about the protected resource's configuration.

A successful response MUST use the HTTP status code `200` and a `Content-Type` of `application/json`. Its body MUST be a JSON object that contains a set of metadata parameters as defined in the AuthZEN Policy Decision Point Metadata Registry ([[[#iana-pdp-metadata-registry]]]).

Any metadata parameters in the response that are not understood by the PEP MUST be ignored.

Parameters that have multiple values are represented as JSON arrays. Parameters that have no values MUST be omitted from the response.

An error response uses the applicable HTTP status code value.

The following is a non-normative example response:

<pre class="http example">
HTTP/1.1 200 OK
Content-Type: application/json

{
  "policy_decision_point": "https://pdp.example.com",
  "access_evaluation_endpoint": "https://pdp.example.com/access/v1/evaluation",
  "search_subject_endpoint": "https://pdp.example.com/access/v1/search/subject",
  "search_resource_endpoint": "https://pdp.example.com/access/v1/search/resource"
}
</pre>

### Policy Decision Point Metadata Validation {#pdp-metadata-data-endpoint-validation}

The `policy_decision_point` value returned MUST be identical to the Policy Decision Point identifier value into which the well-known URI string was inserted to create the URL used to retrieve the metadata.  If these values are not identical, the data contained in the response MUST NOT be used.

The recipient MUST validate that any signed metadata was signed by a key belonging to the issuer and that the signature is valid. If the signature does not validate or the issuer is not trusted, the recipient SHOULD treat this as an error condition.
