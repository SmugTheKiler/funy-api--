# How to add an endpoint.
First, go to `functions.js`, and scroll to the `addRequest` function. Just add another `if / else` statement and
add `requestName === 'newEndPointName'`, and add `db.set(user.requests.newEndPointName++)`. then go to register.js, and add the new value to the user object. Name it
the new end points name. Set it to a value that you want the users to start of as when they first register. Then go
to your index.js, and make another end point listner, do all the functions, and at the end (or in the begining, it 
doesn't really matter where) put `addRequest(req.ip, 'newEndPointName')`. The string has to be **EXACTLY** the same as in
functions.js.

please star this respretory - this is like one of my first open source projects in a *very* long time that I actually worked
on hardly.