## js-client-side request

0.0.1

A soon-to-be deprecated, idiosyncratic `xhr` request library for the browser - internet explorer friendly and polyfill-free.  Requests are attached to an element's `click` listener.  Alternatively, a simple `xhr` class is available for `xhr` requests.  

@todo needs testing

### Example

```

// send a regular xhr request

var callback = function(data) {
	console.log(data);
}

var request = new window.XHR({
    url: endpoint,
    authentication: authentication || null,
    method: method || 'GET',
    data: data || null,
    callback: callback,
    headers: headers || null
});

// use html to handle the request

<button id="button-1" data-api-endpoint="/find" data-api-method="GET" data-api-data="something" data-callback="callback(event)">

<button id="button-2" data-api-endpoint="/create" data-api-method="POST" data-api-data="something">

var fetch = new Fetch({
	elements: [ {el: document.getElementById('button-1'), fn: callback}, el: document.getElementById('button-2'), fn: callback}],
	rootUrl: 'https://api.com/'
	authentication: '' 
	headers: ''
})


```



