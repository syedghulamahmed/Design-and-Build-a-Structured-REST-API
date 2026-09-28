# Application Status Rules

```text
submitted -> under_review -> accepted
                         \-> rejected
```

- `submitted` can only become `under_review`.
- `under_review` can become `accepted` or `rejected`.
- `accepted` and `rejected` are terminal states.
- An invalid transition returns HTTP `409 Conflict`.
- An unknown status or malformed body returns HTTP `422 Unprocessable Content`.
- The service layer owns these business rules; routes/controllers only transport validated input.
