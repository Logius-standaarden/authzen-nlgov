# Transport {#transport}

This specification defines an HTTPS binding using JSON serialization which MUST be implemented by a compliant PDP.

Additional transport bindings (e.g. gRPC or CoAP) MAY be defined in the future in the form of profiles, and MAY be implemented by a PDP.

## HTTPS JSON Binding {#transport-https-json}

All API requests within this binding are made via an HTTPS `POST` request.

Requests MUST include a `Content-Type` header with the value `application/json`, and the request body for each endpoint MUST be a JSON object that conforms to the corresponding request structure, as defined in [[[#table-api-endpoints]]].

A successful response is an HTTPS response with a status code of `200` and a `Content-Type` of `application/json`. Its body is a JSON object that conforms to the corresponding response structure, as defined in [[[#table-api-endpoints]]].

The request URL MUST be the value of the corresponding endpoint parameter, as defined in [[[#table-api-endpoints]]], if it is provided in the Policy Decision Point metadata ([[[#pdp-metadata-data-endpoint]]]). If the parameter is not provided, the URL SHOULD be formed by appending the default path, as defined in [[[#table-api-endpoints]]], to the PDP's base URL (which is the `policy_decision_point` value from the Policy Decision Point metadata, if available.

The following table provides an overview of the API endpoints defined in this binding:

<table id="table-api-endpoints" title="API Endpoint Overview">
    <tr>
        <td>API Endpoint</td>
        <td>Default Path</td>
        <td>Metadata Parameter</td>
        <td>Request Schema</td>
        <td>Response Schema</td>
    </tr>
    <tr>
        <td>Access Evaluation</td>
        <td>/access/v1/evaluation</td>
        <td>access_evaluation_endpoint</td>
        <td>[[[#access-evaluation-request]]]</td>
        <td>[[[#access-evaluation-response]]]</td>
    </tr>
    <tr>
        <td>Access Evaluations</td>
        <td>/access/v1/evaluations</td>
        <td>access_evaluations_endpoint</td>
        <td>[[[#access-evaluations-request]]]</td>
        <td>[[[#access-evaluations-response]]]</td>
    </tr>
    <tr>
        <td>Subject Search</td>
        <td>/access/v1/search/subject</td>
        <td>search_subject_endpoint</td>
        <td>[[[#subject-search-request]]]</td>
        <td>[[[#search-response]]]</td>
    </tr>
    <tr>
        <td>Resource Search</td>
        <td>/access/v1/search/resource</td>
        <td>search_resource_endpoint</td>
        <td>[[[#resource-search-request]]]</td>
        <td>[[[#search-response]]]</td>
    </tr>
    <tr>
        <td>Action Search</td>
        <td>/access/v1/search/action</td>
        <td>search_action_endpoint</td>
        <td>[[[#action-search-request]]]</td>
        <td>[[[#search-response]]]</td>
    </tr>
</table>

### JSON Serialization {#transport-https-json-serialization}

This section specifies the serialization of the information model entities and API schemas defined in this document to the JSON format [[RFC8259]]. The top-level element of all request and response bodies MUST be a JSON object (Section 4 of [[RFC8259]]). Implementations SHOULD also adhere to the security recommendations in JSON Payload Considerations ([[[#security-json]]]).

The data types defined in this specification are mapped to JSON types as follows:

Object:
: Represented as a JSON object (Section 4 of [[RFC8259]]). The values of its members can be any valid JSON value as defined in Section 3 of [[RFC8259]], including other objects and arrays, unless specified otherwise.

Array:
: Represented as a JSON array (Section 5 of [[RFC8259]]).

String:
: Represented as a JSON string (Section 7 of [[RFC8259]]).

Integer:
: Represented as a JSON number (Section 6 of [[RFC8259]]). Note the recommendation in [[[#security-json]]] to not encode values that exceed IEEE 754 double-precision.

Boolean:
: Represented as the JSON literals `true` or `false` (Section 3 of [[RFC8259]]).

### Error Responses

The following error responses are common to all methods of the Authorization API. The error response is indicated by an HTTPS status code (Section 15 of [[RFC9110]]) that indicates error.

The following errors are indicated by the status codes defined below:

<table id="table-error-status-codes" title="HTTPS Error status codes">
    <tr>
        <td>Code</td>
        <td>Description</td>
        <td>HTTPS Body Content</td>
    </tr>
    <tr>
        <td>400</td>
        <td>Bad Request</td>
        <td>An error message string</td>
    </tr>
    <tr>
        <td>401</td>
        <td>Unauthorized</td>
        <td>An error message string</td>
    </tr>
    <tr>
        <td>403</td>
        <td>Forbidden</td>
        <td>An error message string</td>
    </tr>
    <tr>
        <td>500</td>
        <td>Internal Error</td>
        <td>An error message string</td>
    </tr>
</table>

<p class="note">HTTPS errors are returned by the PDP to indicate an error condition relating to the request or its processing; they are unrelated to the outcome of an authorization decision and are distinct from it. A successful request that results in a "deny" is indicated by a 200 OK status code with a { "decision": false } payload.</p>

To make this concrete:

- a `401` HTTPS status code indicates that the PEP did not properly authenticate to the PDP - for example, by omitting a required `Authorization` header, or using an invalid access token.
- the PDP indicates to the PEP that the authorization request is denied by sending a response with a `200` HTTPS status code, along with a payload of `{ "decision": false }`.

### Request Identification

All requests to the API MAY have request identifiers to uniquely identify them. The PEP is responsible for generating the request identifier. If present, it is RECOMMENDED to use the HTTPS Header `X-Request-ID` as the request identifier. The value of this header is an arbitrary string. The following non-normative example describes this header:

<pre class="http example" id="request-id-example" title="Example HTTPS request with a Request Id Header">
POST /access/v1/evaluation HTTP/1.1
Authorization: Bearer mF_9.B5f-4.1JqM
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716
</pre>

When an Authorization API request contains a request identifier the PDP MUST include a request identifier in the response. It is RECOMMENDED to specify the request identifier using the HTTPS Response header `X-Request-ID`. If the PEP specified a request identifier in the request, the PDP MUST include the same identifier in the response to that request.

The following is a non-normative example of an HTTPS Response with this header:

<pre class="http example" id="example-response-request-id" title="Example HTTPS response with a Request Id Header">
HTTP/1.1 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716
</pre>

### Examples (non-normative)

The following is a non-normative example of the HTTPS binding of the Access Evaluation Request:

<pre class="http example" id="example-access-evaluation-request" title="Example of an HTTPS Access Evaluation Request">
POST /access/v1/evaluation HTTP/1.1
Host: pdp.example.com
Content-Type: application/json
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "resource": {
    "type": "todo",
    "id": "1"
  },
  "action": {
    "name": "can_read"
  },
  "context": {
    "time": "1985-10-26T01:22-07:00"
  }
}
</pre>

The following is a non-normative example of an HTTPS Access Evaluation Response:

<pre class="http example" id="example-access-evaluation-response" title="Example of an HTTP Access Evaluation Response">
HTTP/1.1 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "decision": true
}
</pre>

The following is a non-normative example of a the HTTPS binding of the Access Evaluations Request:

<pre class="http example" id="example-access-evaluations-request" title="Example of an HTTPS Access Evaluations Request">
POST /access/v1/evaluations HTTP/1.1
Host: pdp.example.com
Content-Type: application/json
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "context": {
    "time": "2024-05-31T15:22-07:00"
  },
  "action": {
    "name": "can_read"
  },
  "evaluations": [
    {
      "resource": {
        "type": "document",
        "id": "boxcarring.md"
      }
    },
    {
      "resource": {
        "type": "document",
        "id": "subject-search.md"
      }
    },
    {
      "action": {
        "name": "can_edit"
      },
      "resource": {
        "type": "document",
        "id": "resource-search.md"
      }
    }
  ]
}
</pre>

The following is a non-normative example of an HTTPS Access Evaluations Response:

<pre class="http example" id="example-access-evaluations-response" title="Example of an HTTPS Access Evaluations Response">
HTTP/1.1 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "evaluations": [
    {
      "decision": true
    },
    {
      "decision": false,
      "context": {
        "error": {
          "status": 404,
          "message": "Resource not found"
        }
      }
    },
    {
      "decision": false,
      "context": {
        "reason": "Subject is a viewer of the resource"
      }
    }
  ]
}
</pre>

The following is a non-normative example of the HTTPS binding of the Subject Search Request:

<pre class="http example" id="example-subject-search-request" title="Example of an HTTPS Subject Search Request">
POST /access/v1/search/subject HTTP/1.1
Host: pdp.example.com
Content-Type: application/json
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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
  }
}
</pre>

The following is a non-normative example of an HTTPS Subject Search Response:

<pre class="http example" id="example-subject-search-response" title="Example of an HTTPS Subject Search Response">
HTTP/1.1 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "page": {
    "next_token": "a3M9NDU2O3N6PTI="
  },
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

The following is a non-normative example of the HTTPS binding of the Resource Search Request:

<pre class="http example" id="example-resource-search-request" title="Example of an HTTPS Resource Search Request">
POST /access/v1/search/resource HTTP/1.1
Host: pdp.example.com
Content-Type: application/json
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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

The following is a non-normative example of an HTTPS Resource Search Response:

<pre class="http example" id="example-resource-search-response" title="Example of an HTTPS Resource Search Response">
HTTP/1.1 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "page": {
    "next_token": "a3M9NDU2O3N6PTI="
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

The following is a non-normative example of the HTTPS binding of the Action Search Request:

<pre class="http example" id="example-action-search-request" title="Example of an HTTPS Action Search Request">
POST /access/v1/search/action HTTP/1.1
Host: pdp.example.com
Content-Type: application/json
Authorization: Bearer <myoauthtoken>
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

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

The following is a non-normative example of an HTTPS Action Search Response:

<pre class="http example" id="example-action-search-response" title="Example of an HTTPS Action Search Response">
HTTP/1.1 OK
Content-Type: application/json
X-Request-ID: bfe9eb29-ab87-4ca3-be83-a1d5d8305716

{
  "page": {
    "next_token": "a3M9NDU2O3N6PTI="
  },
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
