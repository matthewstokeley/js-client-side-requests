
// register request events in the event listener
// this.event.addListener("updateProgress");
// this.event.addListener("transferComplete");
// this.event.addListener("transferFailed");
// this.event.addListener("transferCancelled");

// register request states in the event listener
// this.event.addListener("XMLHttpRequestUnsent");
// this.event.addListener("XMLHttpRequestOpened");
// this.event.addListener("XMLHttpRequestHeadersReceived");
// this.event.addListener("XMLHttpRequestLoading");
// this.event.addListener("XMLHttpRequestDone");

(function(window) {

    /**
     * [XHR description]
     * @param {[type]} options [description]
     */
    var XHR = function(options) {
        // @todo validate options
        this.options = options;
        this.event = window.events;
        this.init.call(this);
    };

    /**
     * [init description]
     * @return {[type]} [description]
     */
    XHR.prototype.init = function() {
        this.createRequest().listen().openRequest().setHeaders().authenticate().sendRequest();
    };

    /**
     * [createRequest description]
     * @return {[type]} [description]
     */
    XHR.prototype.createRequest = function() {
        return this.request = new XMLHttpRequest();
    };

    /**
     * [listen description]
     * @return {[type]} [description]
     */
    XHR.prototype.listen = function() {
        this.request.addEventListener("progress", this.emitRequestEvent('updateProgress'));
        this.request.addEventListener("load", this.emitRequestEvent('transferComplete'));
        this.request.addEventListener("error", this.emitRequestEvent('transferFailed'));
        this.request.addEventListener("abort", this.emitRequestEvent('transferCancelled'));
        this.listenToReadyStateChange();
    };

    /**
     * [setHeaders description]
     */
    XHR.prototype.setHeaders = function() {
        this.options.headers.forEach(this.setHeader.bind(this));
    };

    /**
     * [shouldAuthenticate description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    XHR.prototype.shouldAuthenticate = function(options) {
        return !this.options.authentication ? false : true;
    };

    /**
     * [requestHasWithCredentials description]
     * @param  {[type]} request [description]
     * @return {[type]}         [description]
     */
    XHR.prototype.requestHasWithCredentials = function(request) {
        return 'withCredentials' in request ? true : false; 
    };

    /**
     * [setWithCredentials description]
     * @param {[type]} request [description]
     */
    XHR.prototype.setWithCredentials = function(request) {
        return this.request.withCredentials = true;
    };

    /**
     * [getAuthValue description]
     * @param  {[type]} user     [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    XHR.prototype.getAuthValue = function(user, password) {
        return btoa(user + ":" + password);
    };

    /**
     * [setAuthHeaders description]
     * @param {[type]} auth [description]
     */
    XHR.prototype.setAuthHeaders = function(auth) {
        return this.setHeader({header: "Authorization", value: "Basic " + auth});
    };

    /**
     * [authenticate description]
     * @return {[type]} [description]
     */
    XHR.prototype.authenticate = function() {
        
        if (!this.shouldAuthenticate(this.options))
            return this;

        if (this.requestHasWithCredentials(this.request))
            this.setWithCredentials(this.request);

        this.setAuthHeaders(this.getAuthValue(this.options.authentication.user, this.options.authentication.password));

    };

    /**
     * [readyState description]
     * @type {Object}
     */
    XHR.prototype.readyState = {
        0: 'UNSENT',
        1: 'OPENED',
        2: 'HEADERS_RECEIVED',
        3: 'LOADING',
        4: 'DONE'
    };

    /**
     * [openRequest description]
     * @return {[type]} [description]
     */
    XHR.prototype.openRequest = function() {
        /**
         * DOMString method,
         * DOMString url,
         * optional boolean async,
         * optional DOMString user,
         * optional DOMString password
         * @return {[type]} [description]
         */
        this.request.open(
            this.options.method,
            this.options.url,
            true
        );
    };

    /**
     * [listenToReadyStateChange description]
     * @return {[type]} [description]
     */
    XHR.prototype.listenToReadyStateChange = function() {
        this.request.onreadystatechange = this.onReadyStateChange.bind(this);
    };

    /**
     * [onReadyStateChange description]
     * @return {[type]} [description]
     */
    XHR.prototype.onReadyStateChange = function() {
        this.iterateReadyState().isComplete();
    };

    /**
     * [iterateReadyState description]
     * @return {[type]} [description]
     */
    XHR.prototype.iterateReadyState = function() {
        this.emitReadyStateChange(this.readyState[this.request.readystate])
    };

    /**
     * [emitReadyStateChange description]
     * @param  {[type]} property [description]
     * @return {[type]}          [description]
     */
    XHR.prototype.emitReadyStateChange = function(property) {
        this.event.emit("XMLHttpRequest" + property, null, this.request.upload)
    };

    /**
     * [isComplete description]
     * @return {Boolean} [description]
     */
    XHR.prototype.isComplete = function() {
        this.request.readystate === 4 ? this.checkStatus() : null;
    };

    /**
     * [checkStatus description]
     * @return {[type]} [description]
     */
    XHR.prototype.checkStatus = function() {
        this.request.status === 200 ? this.successCallback() : this.errorCallback();
    };

    /**
     * [successCallback description]
     * @return {[type]} [description]
     */
    XHR.prototype.successCallback = function() {
        this.options.callback.call(this.options.context || this, this.request.response);
    };

    /**
     * [errorCallback description]
     * @return {[type]} [description]
     */
    XHR.prototype.errorCallback = function() {
        this.options.errorCallback.call(this.options.context || this, this.request.response);
    };

    /**
     * @param  {[type]} headers [description]
     * @return {[type]}         [description]
     */
    XHR.prototype.setHeader = function(headers) {
        this.request.setRequestHeader(headers.header, headers.value);
    };

    /**
     * [emitRequestEvent description]
     * @param  {[type]} event [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    XHR.prototype.emitRequestEvent = function(event, data) {
        this.event.emit(event, null, data);
    };

    /**
     * [sendRequest description]
     * @return {[type]} [description]
     */
    XHR.prototype.sendRequest = function() {
        this.request.send();
    };

    window.XHR = XHR;

})(window);
