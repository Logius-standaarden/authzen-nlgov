# Model

By convention, we refer to a service that implements this API as a Policy Decision Point, or PDP. The policy language, architecture, and state management aspects of a PDP are beyond the scope of this specification.

By convention, we refer to a client of the Authorization API as a Policy Enforcement Point, or PEP. Clients may consume the Authorization API for use cases that go beyond enforcement of authorization decisions; for example, the Resource Search API ([[[#resource-search-api]]]) allows a caller to discover the resources on which a subject can perform an action. For consistency, we use the term PEP to describe a client of the API, regardless of the use case.

The Authorization API is defined in a transport-agnostic manner. A normative HTTPS binding is described in Transport ([[[#transport]]]). Other bindings, such as gRPC, may be defined in other profiles of this specification.

Authentication for the Authorization API itself is out of scope for this document, since authentication for APIs is well-documented elsewhere. Support for OAuth 2.0 ([[?RFC6749]]) is RECOMMENDED.
