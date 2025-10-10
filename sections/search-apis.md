# Search APIs {#search}

The Search APIs enable a PEP to discover the set of subjects, resources, or actions that are permitted within a specific authorization context. Their purpose is to return a list of authorized entities, rather than verify a single access request.

To perform a search, the PEP provides the Subject, Resource, Action, and Context entities defined in the Information Model ([[[#information-model]]]), but omits the unique identifier of the entity being queried. The PDP then responds with the set of authorized entities for the queried entity type which would be authorized according to the provided criteria.

## Semantics {#search-semantics}

A search is designed to return entities that would correspond to a permitted decision. Therefore, any result from a Search API, when subsequently used in an Access Evaluation API call, SHOULD result in a `"decision": true` response. However, because the evaluation is implementation-specific and may depend on other variables (such as time), this outcome is not guaranteed.

In addition, it is RECOMMENDED that a search be performed transitively, traversing intermediate attributes and/or relationships. For example, if user U is a member of group G, and group G is designated as a viewer on a document D, then a search for all subjects of type user that can view document D will include user U.

## Pagination {#search-pagination}

Search APIs can return large result sets. To manage this, a PDP MAY support pagination, allowing a PEP to navigate and retrieve subsets of the total result set.

Pagination does not guarantee an atomic snapshot of the result set. Consequently, if items are added or removed while paginating, results MAY be repeated or omitted between pages.

Pagination is based on the use of opaque tokens. A PEP makes an initial request for data by sending a query that does not contain a token. If the PDP determines that the result set contains too many results to fit in a single response, the PDP returns a partial result set and a token that the PEP can use to retrieve the next page of results.

A paginated response MUST be clearly identified by the inclusion of a `page` object containing a non-empty, opaque `next_token`. This token is the signal to the PEP that more results are available.

To retrieve the next page, the PEP sends a subsequent request containing a `page` object with the `token` field set to the `next_token` value from the previous response. This process is repeated until the PDP returns a `page` object in which the value of the `next_token` field is an empty string, signaling the end of the result set.

When a request contains a token, all entities (e.g., `subject`, `resource`, `action`, `context`) and pagination parameters (e.g., `limit`)  MUST be identical to the preceding request. PDPs SHOULD return an error when any entity or parameter has been changed.

PEPs that wish to sequentially iterate through the entire result set SHOULD use the core pagination mechanism described above, which is designed to work consistently across all PDPs that support the search APIs.

### Paginated Requests {#search-pagination-request}

A Search API Request MAY include a `page` object indicating which subset of the larger result set the PEP would like to receive.

The `page` object in a Search API Request consists of the following keys:

`token`:
: OPTIONAL. An opaque string value from the `next_token` of a previous response.

`limit`:
: OPTIONAL. A non-negative integer indicating the maximum number of results to return in the response.

`properties`:
: OPTIONAL. An object containing additional implementation-specific pagination request attributes, such as, but not limited to, sorting and filtering.

Apart from the `token`, all values from the initial request MUST remain identical for subsequent pages. If a different value is provided mid-pagination the PDP SHOULD return an error.

Additional keys MAY be included in the `page` object. If they are, they MUST be defined in a specification referenced in the AuthZEN Policy Decision Point Capabilities Registry ([[[#iana-pdp-capabilities-registry]]]). Furthermore, the PDP MUST declare support for the corresponding capability URN in its `supported_capabilities` metadata ([[[#pdp-metadata-data-capabilities]]]).

### Paginated Responses {#search-pagination-response}

Any Search API Response MAY include a `page` object, but if a response does not contain the entire result set, it MUST include this object.

The `page` object contains the following keys:

`next_token`:
: REQUIRED. An opaque string value indicating the next page of results to return. If there are no more results after this page, its value MUST be an empty string.

`count`:
: OPTIONAL. A non-negative integer indicating the number of results included in this response. When included at the start of a response, as described in the Search API Response ([[[#search-response]]]), this enables a PEP to display a progress indicator when processing large or slow responses.

`total`:
: OPTIONAL. A non-negative integer indicating the total number of results matching the query criteria at the time of the request. This value is not guaranteed to equal the total number of items returned across all pages if the underlying data set changes during pagination.

`properties`:
: OPTIONAL. An object containing additional pagination response attributes. Examples include, but are not limited to, estimated totals or the number of remaining results.

### Examples (non-normative) {#search-pagination-examples}

The following is a non-normative example of a request-response cycle to retrieve a total of three results with a page size limit of two.

<pre class="json example" id="search-pagination-token-initial-request" title="Example initial Search API Request">
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "action": {
    "name": "can_read"
  },
  "resource": {
    "type": "account"
  },
  "page": {
    "limit": 2
  }
}
</pre>

<pre class="json example" id="search-pagination-token-initial-response" title="Example initial Search API Response">
{
  "page": {
    "next_token": "a3M9NDU2O3N6PTI=",
    "count": 2,
    "total": 3
  },
  "results": [
    {
      "type": "account",
      "id": "123"
    },
    {
      "type": "account",
      "id": "456"
    }
  ]
}
</pre>

<pre class="json example" id="search-pagination-token-second-request" title="Example second Search API Request">
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "action": {
    "name": "can_read"
  },
  "resource": {
    "type": "account"
  },
  "page": {
    "token": "a3M9NDU2O3N6PTI="
  }
}
</pre>

<pre class="json example" id="search-pagination-token-second-response" title="Example second Search API Response">
{
  "page": {
    "next_token": "",
    "count": 1,
    "total": 3
  },
  "results": [
    {
      "type": "account",
      "id": "789"
    }
  ]
}
</pre>

## The Search API Response {#search-response}

The response to a Search API Request always follows the same structure. Each Search API Response is a JSON object with the following keys:

`page`:
: OPTIONAL. An object providing pagination information, as defined in Paginated Responses ([[[#search-pagination-response]]]). It is RECOMMENDED that the `page` object be the first key in the response, as this allows a PEP to use the `count` value to display a progress indicator when processing large or slow responses.

`context`:
: OPTIONAL. An object that can convey additional information that can be used by the PEP, similar to its function in the Access Evaluation Response (see [[[#access-evaluation-response]]]).

`results`:
: REQUIRED. An array containing zero or more entities, as defined in the Information Model ([[[#information-model]]]). It MUST contain only entities of the type being searched for (e.g., Subjects, Resources, or Actions).

The following is a non-normative example of a search response returning resources:

<pre class="json example" id="search-response-example" title="Example Resource Search API Response">
{
  "page": {
    "count": 2,
    "total": 102
  },
  "context": {
    "query_execution_time_ms": 42
  },
  "results": [
    {
      "type": "account",
      "id": "123"
    },
    {
      "type": "account",
      "id": "456"
    }
  ]
}
</pre>

## Subject Search API {#subject-search-api}

The Subject Search API returns all subjects of a given type that are permitted according to the provided Action ([[[#action]]]), Resource ([[[#resource]]]), and Context ([[[#context]]]).

### The Subject Search API Request {#subject-search-request}

The Subject Search request is an object consisting of the following entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject. The Subject MUST contain a `type`, but the Subject `id` SHOULD be omitted, and if present, MUST be ignored.

`action`:
: REQUIRED. The action (or verb) of type Action.

`resource`:
: REQUIRED. The resource of type Resource.

`context`:
: OPTIONAL. Contextual data about the request.

`page`:
: OPTIONAL. A page object for paginated requests.

### Example (non-normative) {#subject-search-example"}

The following payload defines a request for the subjects of type `user` that can perform the `can_read` action on the resource of type `account` and ID `123`.

<pre class="json example" id="subject-search-request-example" title="Example Subject Search API Request">
{
  "subject": {
    "type": "user"
  },
  "action": {
    "name": "can_read"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "context": {
    "time": "2024-10-26T01:22-07:00"
  }
}
</pre>

The following payload defines a valid response to this request.

<pre class="json example" id="subject-search-response-example" title="Example Subject Search API Response">
{
  "results": [
    {
      "type": "user",
      "id": "alice@example.com"
    },
    {
      "type": "user",
      "id": "bob@example.com"
    }
  ]
}
</pre>

## Resource Search API {#resource-search-api}

The Resource Search API returns all resources of a given type that are permitted according to the provided Action ([[[#action]]]), Subject ([[[#subject]]]), and Context ([[[#context]]]).

### The Resource Search API Request {#resource-search-request}

The Resource Search request is an object consisting of the following entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject.

`action`:
: REQUIRED. The action (or verb) of type Action.

`resource`:
: REQUIRED. The resource of type Resource. The Resource MUST contain a `type`, but the Resource `id` SHOULD be omitted, and if present, MUST be ignored.

`context`:
: OPTIONAL. Contextual data about the request.

`page`:
: OPTIONAL. A page object for paginated requests.

### Example (non-normative) {#resource-search-example"}

The following payload defines a request for the resources of type `account` on which the subject of type `user` and ID `alice@example.com` can perform the `can_read` action.

<pre class="json example" id="resource-search-request-example" title="Example Resource Search API Request">
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "action": {
    "name": "can_read"
  },
  "resource": {
    "type": "account"
  }
}
</pre>

The following payload defines a valid response to this request.

<pre class="json example" id="resource-search-response-example" title="Example Resource Search API Response">
{
  "results": [
    {
      "type": "account",
      "id": "123"
    },
    {
      "type": "account",
      "id": "456"
    }
  ]
}
</pre>

## Action Search API {#action-search-api}

The Action Search API returns all actions that are permitted according to the provided Subject ([[[#subject]]]), Resource ([[[#resource]]]), and Context ([[[#context]]]).

### The Action Search API Request {#action-search-request}

The Action Search request is an object consisting of the following entities:

`subject`:
: REQUIRED. The subject (or principal) of type Subject.

`resource`:
: REQUIRED. The resource of type Resource.

`context`:
: OPTIONAL. Contextual data about the request.

`page`:
: OPTIONAL. A page object for paginated requests.

<p class="note">Unlike the Subject and Resource Search APIs, the `action` key is omitted from the Action Search request payload.</p>

### Example (non-normative) {#action-search-example"}

The following payload defines a request for the actions that the subject of type `user` with ID `123` may perform on the resource of type `account` and ID `123` at 01:22 AM.

<pre class="json example" id="action-search-request-example" title="Example Action Search API Request">
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "context": {
    "time": "2024-10-26T01:22-07:00"
  }
}
</pre>

The following payload defines a valid response to this request.

<pre class="json example" id="action-search-response-example" title="Example Action Search API Response">
{
  "results": [
    {
      "name": "can_read"
    },
    {
      "name": "can_write"
    }
  ]
}
</pre>
