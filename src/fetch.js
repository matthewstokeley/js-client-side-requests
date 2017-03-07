(function(window) {

    /**
     * an interface for attaching an XHR request to an element
     * @todo add additional options
     * @param {[type]} options [description]
     */
    var Fetch = function(options) {
        this.options = options;
        this.register.call(this);
    };

    Fetch.prototype.register = function() {

        this.options.elements.forEach(function(element, index, array) {
            this.addListeners.call(this, element);
        }.bind(this));

    };

    Fetch.prototype.sendRequest = function(element) {

        var method = element.element.dataset.apiMethod;
        var endpoint = element.element.dataset.apiEndpoint;
        var data = element.element.dataset.apiData;

        var request = new window.XHR({
            url: this.options.rootUrl + endpoint,
            authentication: this.options.authentication || null,
            method: method || 'GET',
            data: data || null,
            callback: element.callback,
            headers: this.options.headers || null
        });

    };

    Fetch.prototype.addListeners = function(element) {
        element.element.addEventListener('click', function() {
          this.sendRequest(element);
        }.bind(this));
    };

    window.Fetch = Fetch;

})(window);
