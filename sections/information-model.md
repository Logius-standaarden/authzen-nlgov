# Information Model {#information-model}

The information model for requests and responses include the following entities: Subject, Action, Resource, Context, and Decision. These are all defined below.

<div class="nlgov-add-section">

Specific implementations of the generic AuthZEN information model SHOULD be documented in a meta-information model. This enables an unambigous interpretation of the meaning of requests. It is RECOMMENDED to document to the meta-information model using [[?MIM]].

It is RECOMMENDED to use [[?JSON-LD11]] to enable automatic integration into existing semantic models, as described in [[[#context-mim]]].

</div>

## Subject {#subject}

A Subject is the user or machine principal about whom the Authorization API is being invoked. The Subject may be requesting access at the time the Authorization API is invoked.

A Subject is an object that contains two REQUIRED keys, `type` and `id`, which have a string value, and an OPTIONAL key, `properties`, with a value of an object.

`type`:
: REQUIRED. A string value that specifies the type of the Subject. <span class="nlgov-add" aria-label="section toegevoegd in NLgov">It is RECOMMENDED to define the type as a Linked Data URI.</span> 

`id`:
: REQUIRED. A string value containing the unique identifier of the Subject, scoped to the `type`.

`properties`:
: OPTIONAL. An object which can be used to express additional attributes of a Subject.

### Subject Properties {#subject-properties}

Many authorization systems are stateless, and expect the PEP to pass in all relevant attributes used in the evaluation of the authorization policy. To satisfy this requirement, Subjects MAY include additional attributes as key-value pairs, under the `properties` object. A property can contain both simple values, such as strings, numbers, booleans and nulls, and complex values, such as arrays and objects.

Examples of subject attributes can include, but are not limited to:

- department,
- group memberships,
- device identifier,
- IP address.

### Examples (non-normative) {#subject-examples}

The following is a non-normative example of a minimal Subject:

<pre class="json example" id="subject-example" title="Example Subject">
{
  "type": "user",
  "id": "alice@example.com"
}
</pre>

The following is a non-normative example of a Subject which adds a string-valued `department` property:

<pre class="json example" id="subject-department-example" title="Example Subject with Additional Property">
{
  "type": "user",
  "id": "alice@example.com",
  "properties": {
    "department": "Sales"
  }
}
</pre>

The following is a non-normative example of a subject which adds IP address and device identifier properties:

<pre class="json example" id="subject-device-id-example" title="Example Subject with IP Address and Device ID">
{
  "type": "user",
  "id": "alice@example.com",
  "properties": {
    "ip_address": "172.217.22.14",
    "device_id": "8:65:ee:17:7e:0b"
  }
}
</pre>

## Resource {#resource}

A Resource is the target of an access request. It is an object that is constructed similar to a Subject entity. It has the following keys:

`type`:
: REQUIRED. A string value that specifies the type of the Resource. <span class="nlgov-add" aria-label="section toegevoegd in NLgov">It is RECOMMENDED to define the type as a Linked Data URI.</span> 

`id`:
: REQUIRED. A string value containing the unique identifier of the Resource, scoped to the `type`.

`properties`:
: OPTIONAL. An object which can be used to express additional attributes of a Resource.

### Resource Properties {#resource-properties}

Similarly to the Subject properties, the PEP can also provide attributes for the Resource in the properties field.

Such attributes can include, but are not limited to, attributes of the resource used in access evaluations or metadata about the resource.

### Examples (non-normative) {#resource-examples}

The following is a non-normative example of a Resource with a `type` and a simple `id`:

<pre class="json example" id="resource-example" title="Example Resource">
{
  "type": "book",
  "id": "123"
}
</pre>

The following is a non-normative example of a Resource containing a `library_record` property, that is itself an object:

<pre class="json example" id="resource-example-structured" title="Example Resource with Additional Property">
{
  "type": "book",
  "id": "123",
  "properties": {
    "library_record":{
      "title": "AuthZEN in Action",
      "isbn": "978-0593383322"
    }
  }
}
</pre>

## Action {#action}

An Action is the type of access that the requester intends to perform.

Action is an object that contains a REQUIRED `name` key with a string value, and an OPTIONAL `properties` key with an object value.

`name`:
: REQUIRED. A string value containing the name of the Action.

`properties`:
: OPTIONAL. An object which can be used to express additional attributes of an Action.

### Action Properties {#action-properties}

Similarly to the Subject and Resource properties, the PEP can also provide attributes for the Action in the properties field.

Such attributes can include, but are not limited to, parameters of the action that is being requested.

<span class="nlgov-add" aria-label="section toegevoegd in NLgov">To increase interoperability, a few common properties are specified below:</span> 

<section class="nlgov-add" aria-label="section toegevoegd in NLgov">

#### Processing Activity identifier

Under Dutch and EU legislation, processing of personal data should be described in a Record of Processing Activities. In certain cases, e.g. when a single system processes data for multiple different processing activities, a relation to the processing activity MAY be included.

When included, the reference to the processing activity SHOULD be included using the following key:

`processing_activity_id`:
: REQUIRED. A string value containing the URI of the processing activity within a Processing Activity registry.

<p class="note">The processing activity identifier should only be used within the context of an organization and SHOULD NOT cross organizational boundaries.</p>

#### Algorithm identifier

When data is processed as part of an algorithm in a public registry, such as ["Het Algoritmeregister"](https://algoritmes.overheid.nl/), a reference to the relevant algorithm MAY be included.

When included, the reference to the algorithm SHOULD be included using the following key:

`algorithm_id`:
: REQUIRED. A string value containing the URI of the algorithm in an algorithm registry.

<p class="note">The algorithm identifier should only be used within the context of an organization and SHOULD NOT cross organizational boundaries.</p>

</section>

### Examples (non-normative) {#action-examples}

The following is a non-normative example of an action:

<pre class="json example" id="action-example" title="Example Action">
{
  "name": "can_read"
}
</pre>

The following is a non-normative example of an action with additional properties:

<pre class="json example" id="action-extend-loan-example" title="Example Action with properties for extending a book loan.">
{
  "name": "extend-loan",
  "properties": {
    "period": "2W"
  }
}
</pre>

## Context {#context}

The Context represents the environment of the access evaluation request.

Context is an object which can be used to express attributes of the environment.

Examples of context attributes can include, but are not limited to:

- The time of day,
- Location from which the request was received,
- Capabilities of the PEP,
- JSON Schema or JSON-LD definitions for the request.

<section class="nlgov-add" aria-label="section toegevoegd in NLgov">

### Context Properties

Context MAY include zero or more additional attributes as key-value pairs.

To increase interoperability, a few common properties are specified below:

#### Time

The logical time at which the action was considered to be initiated, identified by the `time` field, whose value is a textual representation of the time as defined in [[RFC3339]].

This timestamp SHOULD be used when a PDP evaluates the access request uses information from data sources that support temporal queries. See for example the [[[?ADR]]] and its [temporal extension](https://docs.geostandaarden.nl/api/API-Strategie-ext/#temporal).

#### W3C Trace Context

To enable tracing of requests, request identifiers SHOULD be included in the evaluation request. Request identifiers SHOULD be included in the Context object. They SHOULD be in the form of `tracestate` and `traceparent` values as defined by [[?trace-context-1]].

When included, the W3C Trace Context SHOULD be included in the Context object using the following keys:

`traceparent`:
: REQUIRED. An string value containing a value as defined in Section 3.2.2 of [[?trace-context-1]]

`tracestate`:
: REQUIRED. An string value containing a value as defined in Section 3.3.1.1 of [[?trace-context-1]]

#### Verifiable claims

As described in [[[#security-trust]]], it is recommended to consider values in the information model as trusted and valid. For purposes of defense-in-depth and traceability, verifiable claims for values in the information model MAY be provided. The verifiable claims MAY use standards such as, but not limited to, SAML ([[?SAML2-CORE]]), Oauth ([[?RFC6749]]), and Verifiable Credentials ([[?vc-data-model-2.0]]).

<h4 id="context-mim">Meta-information Model</h4>

It is RECOMMENDED to make the information model self-describing by including a URL to the meta-information model [[[#information-model]]] in the context.

When included, the meta-information model SHOULD be included in Context object as the following key

`mim`:
: REQUIRED. A string value containing a URL that links to the meta-information model for the request.

<h4 id="context-ld">Linked Data context</h4>

When a transport ([[[#transport]]]) does not use a Linked Data format as its serialization, the Context SHOULD include a URL to a resource, called the "Linked Data context" that allows the information model to be converted to a Linked Data representation.

<p class="note">The Linked Data context is *not* the same as the Context object. The Context object describes the context in which an evaluation request takes place. The Linked Data context describes how to convert the *entire* request, containing a Subject, Action, Resource and Context object, to a Linked Data representation.</p>

When included, the Linked Data context SHOULD be included in Context object as the following key:

`ld-context`:
: REQUIRED. An object that provides context for mapping the serialized information model to Linked Data, or a string value containing a URL from which the mapping can be retrieved.

When serializing the information model to JSON it is RECOMMENDED to use [[?JSON-LD11]] to provide the Linked Data context. In that case, the value of the `ld-context` key should be considered as the value of the `@context` key at top-level.

</section>

### Examples (non-normative) {#context-examples}

The following is a non-normative example of a Context:

<pre class="json example" id="context-example" title="Example Context">
{
  "time": "1985-10-26T01:22-07:00"
}
</pre>

## Decision {#decision}

A Decision is the result of the evaluation of an access request. It provides the information required for the PEP to enforce the decision.

Decision is an object that contains a REQUIRED `decision` key with a `boolean` value, and an OPTIONAL `context` key with an object value.

`decision`:
: REQUIRED. A boolean value that specifies whether the Decision is to allow or deny the operation.

`context`:
: OPTIONAL. An object which can convey additional information that can be used by the PEP as part of the decision enforcement process.

In this specification, assuming the evaluation was successful, there are only two possible values for the `decision`:

- `true`: The access request is permitted to go forward. If the PEP does not understand information in the `context` response object, the PEP MAY choose to reject the decision.
- `false`: The access request is denied and MUST NOT be permitted to go forward.

The following is a non-normative example of a minimal Decision:

<pre class="json example" id="decision-example" title="Example Decision">
{
  "decision": true
}
</pre>

### Decision Context {#decision-context}

In addition to a `decision`, a response MAY contain a `context` field which contains an object. This context can convey additional information that can be used by the PEP as part of the decision enforcement process.

Examples include, but are not limited to:

- Reason(s) a decision was made,
- "Advices" and/or "Obligations" tied to the access decision,
- Hints for rendering UI state,
- Instructions for step-up authentication,
- Environmental information,
- etc.

### Examples (non-normative) {#decision-examples}

The following are all non-normative examples of possible and valid contexts, provided to illustrate possible usages. The actual semantics and format of the `context` object are an implementation concern and outside the scope of this specification. For example, implementations MAY use keys that correspond to concepts from other standards, such as HTTP status codes, to convey common reasons in an interoperable manner.

#### Non-normative Example 1: conveying decision Reasons

The PDP may provide reasons to explain a decision. In the non-normative example below, an implementation might convey different reasons to administrators and end-users, using keys that could correspond to HTTP status codes:

<pre class="json example" id="response-with-reason-context-example" title="Non-normative Example Response with reason Context">
{
  "decision": false,
  "context": {
    "reason_admin": {
      "403": "Request failed policy C076E82F"
    },
    "reason_user": {
      "403": "Insufficient privileges. Contact your administrator"
    }
  }
}
</pre>

#### Non-normative Example 2: conveying metadata and environmental elements

In the following non-normative example, the PDP justifies its decision by including environmental conditions that did not meet its policies. Metadata pertaining to the decision response times is also provided:

<pre class="json example" id="response-with-environment-context-example" title="Non-normative Example Response with Environment and Metadata Context">
{
  "decision": false,
  "context": {
    "metadata": {
      "response-time": 60,
      "response-time-unit": "ms"
    },
    "environment": {
      "ip": "10.10.0.1",
      "datetime": "2025-06-27T18:03:07Z",
      "os": "ubuntu24.04.2LTS-AMDx64"
    }
  }
}
</pre>

#### Non-normative Example 3: requesting step-up authentication

In the following non-normative example, the PDP requests a step-up authentication of the requesting subject, by signalling the required `acr` and `amr` access token claim values it expects to see in order to approve the request:

<pre class="json example" id="response-with-step-up-example" title="Non-normative Example Response with a step-up request Context">
{
  "decision": false,
  "context": {
    "acr_values": "urn:com:example:loa:3",
    "amr_values": "mfa hwk"
  }
}
</pre>
