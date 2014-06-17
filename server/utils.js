/**
 * Output JSON with correct RFC 5988 paging headers.
 *
 * The advantage of this is that the body remains just the
 * data and meta-data remains in headers.
 *
 * It is the recommended way to do RESTful paging.
 * This way you can still use ngResource with {isArray:true}
 *
 * I don't think we can read the headers out of the box with ngResouce.
 * See here for an example of patching ngResource
 * http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
 *
 * You can leave out prev or next
 */
exports.pagedJSON = function(json, prev, next) {
    // helper function, creates "</#/foos/?n=0>; rel='prev'"
    function lr(url, rel) { return "<" + url + ">; rel='" + rel + "'"; }

    // RFC 5988 5. The 'Link' Header Field
    // http://tools.ietf.org/html/rfc5988#page-6
    // example value: </#/foos/?n=0>; rel='prev', </#/foos/?n=2>; rel='next'
    function links(prev, next) {
        // [prev], [next]
        var ls = [];
        if (prev) { ls.push(lr(prev, 'prev')); }
        if (next) { ls.push(lr(next, 'next')); }
        return ls.join(', ');
    }

    // we can use ?s=.. relative URLs, (cf. rfc5988#section-5.1)
    // see http://tools.ietf.org/html/rfc3986#section-5.4.1
    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Link': links(prev && '?s=' + prev, next && '?s=' + next)
        },
        content: JSON.stringify(json)
    };
}