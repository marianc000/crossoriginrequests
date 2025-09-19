// https://medium.com/@marian-caikovski/find-a-nested-object-with-needed-values-from-the-global-scope-of-a-web-page-33afaa09e7a0

export function findObject(predicate, o) {

    const queue = [{ o, path: [] }];
    const visited = new Set([o]);
    let fromPredicate;

    const results=[];
    while (queue.length) {
        const { o, path } = queue.shift();

        try {

            if (fromPredicate = predicate(o))
                results.push( { o, path, fromPredicate });
        } catch (e) {
            //Ignore errors cross-origin security errors in predicate, e.g. 
            //SecurityError: Failed to read a named property 'name' from 'Window': Blocked a frame with origin "https://www.facebook.com" from accessing a cross-origin frame.
        }

        let keys = Object.keys(o);

        if (o instanceof HTMLDocument)
            keys.push('documentElement');
        else if (o instanceof Element)
            keys.push('children');

        for (const k of keys) {

            const child = o[k];

            if (typeof child === 'object' && child && !visited.has(child)) {
                visited.add(child);
                queue.push({ o: child, path: [...path, k] });// { k, o }
            }

        }
    }
    return results;
}
 


// findObjectWithTime(o => o?.name === "GroupsCometMembersPageNewMembersSectionRefetchQuery" && o.id);

// findObjectWithTime(o => Object.entries(o).find(([k, v]) => v === "350260184016801"));

// findObjectWithTime(o => Object.entries(o).find(([k, v]) => v === "NAfvEOYCI3GVLqs5NY37_VqqSEr0klGw5-Z72E_USypB0IcMcl_FqQQ:22:1752997285"));

// findObjectWithTime(o => Object.entries(o).find(([k, v]) => (typeof v === 'function') && v.toString().includes("24320307234328226")));

// findObjectWithTime(o => Object.entries(o).find(([k, v]) => k==='container_id'));
 
  