# Access Evaluation API {#access-evaluation-api}

The Access Evaluation API defines the message exchange pattern between a PEP and a PDP for executing a single access evaluation.

## The Access Evaluation API Request {#access-evaluation-request}

The Access Evaluation request is an object consisting of four entities previously defined in the Information Model ([[[#information-model]]]):

`subject`:
: REQUIRED. The subject (or principal) of type Subject

`action`:
: REQUIRED. The action (or verb) of type Action.

`resource`:
: REQUIRED. The resource of type Resource.

`context`:
: OPTIONAL. The context (or environment) of type Context.

### Example (non-normative)

<pre class="json example" id="request-example" title="Example Request">
{
  "subject": {
    "type": "user",
    "id": "alice@example.com"
  },
  "resource": {
    "type": "account",
    "id": "123"
  },
  "action": {
    "name": "can_read",
    "properties": {
      "method": "GET"
    }
  },
  "context": {
    "time": "1985-10-26T01:22-07:00"
  }
}
</pre>

## The Access Evaluation API Response {#access-evaluation-response}

The response of the Access Evaluation API consists of the Decision entity as defined in the Information Model ([[[#information-model]]]).
