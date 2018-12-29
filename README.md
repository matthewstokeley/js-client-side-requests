## js-client-side request

0.0.1

A soon-to-be deprecated, idiosyncratic `xhr` request library for the browser - ie friendly and polyfill-free.  Request data is attached to an elements `dataset` using html data-attributes.  Click handlers are registered from inside the `Fetch` instance, which has several drawbacks and advantages.  Most notably, this includes the ability to register numerous potential `xhr` requests programatically, meant for working with templates.

Alternatively - this is useful for single requests - the `xhr` class that `Fetch` uses is namespaced to the `window`.  

@todo test 

### Examples

```

// send a regular xhr request

const callback = (data) => console.log(data)

<a href="javascript:;" onclick="clickHandler(event)">click to send an async request</a>

const clickHandler = (event) => {
  event.preventDefault()
  
  new window.XHR({
    url: endpoint,
    authentication: authentication || null,
    method: method || 'GET',
    data: data || null,
    callback: callback,
    headers: headers || null
  })
}
```


```
// use data-attributes to handle the request

<button id="button-1" data-api-endpoint="/find" data-api-method="GET" data-api-data="something" data-callback="callback(event)">

<button id="button-2" data-api-endpoint="/create" data-api-method="POST" data-api-data="something">

var fetch = new Fetch({
    elements: [ 
      {
        el: document.getElementById('button-1'), 
        fn: callback
      }, 
        el: document.getElementById('button-2'), 
        fn: callback
      }
    ],
    rootUrl: 'https://api.com/'
    authentication: '' 
    headers: ''
})

```



