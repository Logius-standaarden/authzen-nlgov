# Terminology

<dfn data-lt="Subject">Subject</dfn>

The user or machine principal for whom an authorization decision is being requested.

<dfn data-lt="Resource">Resource</dfn>

The target of the request; the resource about which the Authorization API is being made.

<dfn data-lt="Action">Action</dfn>

The operation the {{Subject}} has attempted on the {{Resource}} in an Authorization API call.

<dfn data-lt="Context">Context</dfn>

The environmental or contextual attributes for this request.

<dfn data-lt="Decision">Decision</dfn>

The value of the evaluation decision made by the PDP: `true` for "allow", `false` for "deny".

<dfn data-lt="PDP">PDP</dfn>

Policy Decision Point. The component or system that provides authorization decisions over the network interface defined here as the Authorization API.

<dfn data-lt="PEP">PEP</dfn>

Policy Enforcement Point. The component or system that requests decisions from the PDP and enforces access to specific requests based on the decisions obtained from the PDP.
