/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


const {parseLinkHeader, buildHeaders} = require(/* ! ../util */ "jsonld/lib/util.js");
const {LINK_HEADER_REL} = require(/* ! ../constants */ "jsonld/lib/constants.js");
const JsonLdError = require(/* ! ../JsonLdError */ "jsonld/lib/JsonLdError.js");
const RequestQueue = require(/* ! ../RequestQueue */ "jsonld/lib/RequestQueue.js");

const REGEX_LINK_HEADER = /(^|(\r\n))link:/i;

/**
 * Creates a built-in XMLHttpRequest document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *          [xhr]: the XMLHttpRequest API to use.
 *
 * @return the XMLHttpRequest document loader.
 */
export default ({
    secure,
    headers = {},
    xhr
} = {headers: {}}) => {
    headers = buildHeaders(headers);
    const queue = new RequestQueue();
    return queue.wrapLoader(loader);

    async function loader(url) {
        if (app != null) {
            if (app.$store != null) {
                if (app.$store.state != null) {
                    if (app.$store.state.lode != null) {
                        if (app.$store.state.lode.rawSchemata != null) {
                            if (url in app.$store.state.lode.rawSchemata) {
                                return {
                                    contextUrl: null, // this is for a context via a link header
                                    document: JSON.stringify(app.$store.state.lode.rawSchemata[url]), // this is the actual document that was loaded
                                    documentUrl: url // this is the actual context URL after redirects
                                };
                            }
                        }
                    }
                }
            }
        }
        
        if (url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0) {
            throw new JsonLdError(
                'URL could not be dereferenced; only "http" and "https" URLs are ' +
        'supported.',
                'jsonld.InvalidUrl', {code: 'loading document failed', url});
        }
        if (secure && url.indexOf('https') !== 0) {
            throw new JsonLdError(
                'URL could not be dereferenced; secure mode is enabled and ' +
        'the URL\'s scheme is not "https".',
                'jsonld.InvalidUrl', {code: 'loading document failed', url});
        }

        let req;
        try {
            req = await _get(xhr, url, headers);
        } catch (e) {
            throw new JsonLdError(
                'URL could not be dereferenced, an error occurred.',
                'jsonld.LoadDocumentError',
                {code: 'loading document failed', url, cause: e});
        }

        if (req.status >= 400) {
            throw new JsonLdError(
                'URL could not be dereferenced: ' + req.statusText,
                'jsonld.LoadDocumentError', {
                    code: 'loading document failed',
                    url,
                    httpStatusCode: req.status
                });
        }

        const doc = {contextUrl: null, documentUrl: url, document: req.response};

        // handle Link Header (avoid unsafe header warning by existence testing)
        const contentType = req.getResponseHeader('Content-Type');
        let linkHeader;
        if (REGEX_LINK_HEADER.test(req.getAllResponseHeaders())) {
            linkHeader = req.getResponseHeader('Link');
        }
        if (linkHeader && contentType !== 'application/ld+json') {
            // only 1 related link header permitted
            linkHeader = parseLinkHeader(linkHeader)[LINK_HEADER_REL];
            if (Array.isArray(linkHeader)) {
                throw new JsonLdError(
                    'URL could not be dereferenced, it has more than one ' +
          'associated HTTP Link Header.',
                    'jsonld.InvalidUrl',
                    {code: 'multiple context link headers', url});
            }
            if (linkHeader) {
                doc.contextUrl = linkHeader.target;
            }
        }

        return doc;
    }
};

function _get(xhr, url, headers) {
    xhr = xhr || XMLHttpRequest;
    const req = new xhr();
    return new Promise((resolve, reject) => {
        req.onload = () => resolve(req);
        req.onerror = err => reject(err);
        req.open('GET', url, true);
        for (const k in headers) {
            req.setRequestHeader(k, headers[k]);
        }
        req.send();
    });
}