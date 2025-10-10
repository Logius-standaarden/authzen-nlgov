# IANA Considerations {#iana}

This specification requests IANA to take four actions: the creation of a new protocol registry group named 'AuthZEN', the establishment of two new registries within this group ('AuthZEN Policy Decision Point Metadata' and 'AuthZEN Policy Decision Point Capabilities'), the registration of a new Well-Known URI ('authzen-configuration'), and the registration of a new URN sub-namespace ('authzen').

The following registration procedure is used for the registries established by this specification.

Values are registered on a Specification Required [[RFC8126]] basis after a two-week review period on the <openid-specs-authzen@lists.openid.net> mailing list, following review and approval by one or more Designated Experts. However, to allow for the allocation of values prior to publication of the final version of a specification, the Designated Experts may approve registration once they are satisfied that the specification will be completed and published. However, if the specification is not completed and published in a timely manner, as determined by the Designated Experts, the Designated Experts may request that IANA withdraw the registration.

Registration requests sent to the mailing list for review should use an appropriate subject (e.g., "Request to register AuthZEN Policy Decision Point Metadata: example").

Within the review period, the Designated Experts will either approve or deny the registration request, communicating this decision to the review list and IANA. Denials should include an explanation and, if applicable, suggestions as to how to make the request successful. The IANA escalation process is followed when the Designated Experts are not responsive within 14 days.

Criteria that should be applied by the Designated Experts includes determining whether the proposed registration duplicates existing functionality, determining whether it is likely to be of general applicability or whether it is useful only for a single application, and whether the registration makes sense.

IANA must only accept registry updates from the Designated Experts and should direct all requests for registration to the review mailing list.

It is suggested that multiple Designated Experts be appointed who are able to represent the perspectives of different applications using this specification, in order to enable broadly-informed review of registration decisions. In cases where a registration decision could be perceived as creating a conflict of interest for a particular Expert, that Expert should defer to the judgment of the other Experts.

The reason for the use of the mailing list is to enable public review of registration requests, enabling both Designated Experts and other interested parties to provide feedback on proposed registrations. The reason to allow the Designated Experts to allocate values prior to publication as a final specification is to enable giving authors of specifications proposing registrations the benefit of review by the Designated Experts before the specification is completely done, so that if problems are identified, the authors can iterate and fix them before publication of the final specification.

## AuthZEN Policy Decision Point Metadata Registry {#iana-pdp-metadata-registry}

This specification asks IANA to establish the "AuthZEN Policy Decision Point Metadata" registry under the registry group "AuthZEN Parameters". The registry records the Policy Decision Point metadata parameter and a reference to the specification that defines it.

### Registry Definition

Registry Name: AuthZEN Policy Decision Point Metadata

Registration Policy: Specification Required per [[RFC8126]]

Reference: \[This Document\]

### Registration Template {#iana-pdp-metadata-template}

Metadata Name:
: The name requested (e.g., "resource"). This name is case-sensitive. Names may not match other registered names in a case-insensitive manner unless the Designated Experts state that there is a compelling reason to allow an exception.

Metadata Description:
: Brief description of the metadata (e.g., "Resource identifier URL").

Change Controller:
: For IETF stream RFCs, list the "IETF". For others, give the name of the responsible party. Other details (e.g., postal address, email address, home page URI) may also be included.

Specification Document(s):
: Reference to the document or documents that specify the parameter, preferably including URIs that can be used to retrieve copies of the documents. An indication of the relevant sections may also be included but is not required.

### Initial Registrations {#iana-pdp-metadata-initial}

Metadata Name:
: `policy_decision_point`

Metadata Description:
: Base URL of the Policy Decision Point

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-endpoint]]] of \[This Document\]

Metadata Name:
: `access_evaluation_endpoint`

Metadata Description:
: URL of the Policy Decision Point's Access Evaluation API endpoint

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-endpoint]]] of \[This Document\]

Metadata Name:
: `access_evaluations_endpoint`

Metadata Description:
: URL of the Policy Decision Point's Access Evaluations API endpoint

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-endpoint]]] of \[This Document\]

Metadata Name:
: `search_subject_endpoint`

Metadata Description:
: URL of the Policy Decision Point's Search API endpoint for Subject entities

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-endpoint]]] of \[This Document\]

Metadata Name:
: `search_resource_endpoint`

Metadata Description:
: URL of the Policy Decision Point's Search API endpoint for Resource entities

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-endpoint]]] of \[This Document\]

Metadata Name:
: `search_action_endpoint`

Metadata Description:
: URL of the Policy Decision Point's Search API endpoint for Action entities

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-endpoint]]] of \[This Document\]

Metadata Name:
: `capabilities`

Metadata Description:
: Array of URNs describing specific Policy Decision Point capabilities

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-capabilities]]] of \[This Document\]

Metadata Name:
: `signed_metadata`

Metadata Description:
: JWT containing metadata parameters about the protected resource as claims.

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: [[[#pdp-metadata-data-sig]]] of \[This Document\]

## Well-Known URI Registry {#iana-wk-registry}

This specification asks IANA to register the well-known URI defined in [[[#pdp-metadata-access]]] in the IANA "Well-Known URIs" registry [[IANA.well-known-uris]].

### Registry Contents {#iana-wk-contents}

URI Suffix:
: authzen-configuration

Reference:
: \[This Document\]

Status:
: permanent

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Related Information:
: (none)

## AuthZEN Policy Decision Point Capabilities Registry {#iana-pdp-capabilities-registry}

This specification asks IANA to establish the "AuthZEN Policy Decision Point Capabilities" registry under the registry group "AuthZEN Parameters". The registry contains PDP-specific capabilities or features. These URNs are intended to be used in Policy Decision Point metadata discovery documents (as described in [[[#pdp-metadata]]]) to allow a PEP to determine the supported functionality of a given PDP instance. The content of this registry will be specified by AuthZEN-compliant PDP vendors that want to declare interoperable capabilities.

### Registry Definition {#iana-pdp-capabilities-definition}

Registry Name: AuthZEN Policy Decision Point Capabilities

Registration Policy: Specification Required per [[RFC8126]]

Reference: \[This Document\]

### Registration Template {#iana-pdp-capabilities-template}

Capability Name:
: The name of the capability. This name MUST begin with the colon (":") character. This name is case-sensitive. Names may not match other registered names in a case-insensitive manner unless the Designated Experts state that there is a compelling reason to allow an exception.

Capability URN: The URN of the AuthZEN Policy Decision Point Capability.

Capability Description:
: Brief description of the capability.

Change Controller:
: OpenID Foundation AuthZEN Working Group
: <openid-specs-authzen@lists.openid.net>

Specification Document(s):
: Reference to the document or documents that specify the parameter, preferably including URIs that can be used to retrieve copies of the documents. An indication of the relevant sections may also be included but is not required.

## Registration of "authzen" URN Sub-namespace {#iana-urn-namespace}

This specification asks IANA to register a new URN sub-namespace within the "IETF URN Sub-namespace for Registered Protocol Parameter Identifiers" registry defined in [[RFC3553]].

Registry Name: authzen

Specification: \[This Document\]

Repository: "AuthZEN Policy Decision Point Capabilities" registry ([[[#iana-pdp-capabilities-registry]]] of \[This Document\])

Index value: Sub-parameters MUST be specified in UTF-8, using standard URI encoding where necessary.
