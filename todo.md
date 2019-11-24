Code cleanliness:
- object deconstruction for all props.match.params...
- object deconstruction for pages - split between dispatches and vars vs. form inputs
```
const { get, user, currentUserID, ...remaining } = props
return (
  {
    user &&
    <Form {...remaining} />
  }
)
```
- properties and rooms hierarchy, pull out the header bit of the page to a main component, and just change the forms

Performance:
- Bundle the objects when possible when making a mutation call e.g. bundle property and rooms together. Buffalo supports eager creation.

Organization:
- Have a centralized REST client
  - 200s and 300s do nothing
  - 401 - logout and route to login
  - 404 - route to 404 page
  - 500 - route to server error page
  - other 400s like 400 and 403, get the error response and see if backend returns an error message that needs to be displayed to the user
  ```
  {
    errors: [],
    code: enum string -> VALIDATION_ERROR
  }
  ```
