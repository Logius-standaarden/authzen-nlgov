# Terminology

Subject:
: The user or machine principal for whom an authorization decision is being requested.

Resource:
: The target of the request; the resource about which the Authorization API is being made.

Action:
: The operation the Subject has attempted on the Resource in an Authorization API call.

Context:
: The environmental or contextual attributes for this request.

Decision:
: The value of the evaluation decision made by the PDP: `true` for "allow", `false` for "deny".

PDP:
: Policy Decision Point. The component or system that provides authorization decisions over the network interface defined here as the Authorization API.

PEP:
: Policy Enforcement Point. The component or system that requests decisions from the PDP and enforces access to specific requests based on the decisions obtained from the PDP.