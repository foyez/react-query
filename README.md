# React query

> A library for fetching data in a React app

If the data is needed throughout the app, we need to use state management libraries or context api. But most of the state management libraries are good for working with client state (e.g. theme or modal is open). React query tries to solve the issues with asynchronous or server state.

## Client state vs Server state

**Client state:**

- Persisted in app memory
- accessing or updating is synchronous

**Server state:**

- Persisted remotely
- requires asynchronous APIs for fetching or updating
- Has shared ownership
- Data can be updated by someone else without your knowledge
- UI data may not be in sync with the remote data
- Challenging to caching, multiple requests for the same data, updating stale data in the background, performance optimizations, etc.

### Query

> fetch data

source: [RQ Tutorials](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2)
