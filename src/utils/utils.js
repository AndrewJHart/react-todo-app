import React from 'react';

/**
 * Helpers & utility methods
 */

/**
 * ES6 implementation of debounce - debouncing enforces that
 *  a function not be called again until a specified amount
 * of time has passed. Debounce is very useful when you need
 *  to throttle certain events that are triggered quickly &
 * repeatedly such as mouse or scroll events
 *
 * @param   {Function}  cb - callback function to invoke after wait
 * @param   {Number}    wait - wait time for throttle in ms
 * @param   {Object}    ctx - (optional) context of caller
 * @returns {Function}  new function that wraps the cb in timeout
 */
const debounce = (cb, wait, ctx = this) => {
    let timeout = null,
        cbArgs = null;

    // This *is* being tested, but for some reason doesn't show as covered.
    /* istanbul ignore next */
    return function () {
        cbArgs = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => cb.apply(ctx, cbArgs), wait);
    };
};

/**
 * performs deep equality test on 2 objects
 *
 * @param {object} x - first object
 * @param {object} y - second object to compare
 * @return {boolean}
 */
const objectsDeepEqual = (x, y) => {
    const ok = Object.keys,
        tx = typeof x,
        ty = typeof y;

    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => objectsDeepEqual(x[key], y[key]))
    ) : (x === y);
};

/**
 * Helper for useDimensions. From `react-use-dimensions`.
 */
const getDimensionObject = (node) => {
    const rect = node.getBoundingClientRect();

    return {
        width: rect.width,
        height: rect.height,
        top: 'x' in rect ? rect.x : rect.top,
        left: 'y' in rect ? rect.y : rect.left,
        x: 'x' in rect ? rect.x : rect.left,
        y: 'y' in rect ? rect.y : rect.top,
        right: rect.right,
        bottom: rect.bottom
    };
};

/**
 * Hook for getting the dimensions of the current element in the DOM. From
 * `react-use-dimensions` with unmerged SSR PR incorporated.
 *
 * @return {Array} An array containing a ref to the element's dom node and an
 * object with the dimensions.
 */
const useDimensions = ({ liveMeasure = true } = {}) => {
    const [dimensions, setDimensions] = React.useState({});
    const [node, setNode] = React.useState(null);
    const useLayoutHookBasedOnEnvironment = typeof window === 'undefined'
        ? React.useEffect
        : React.useLayoutEffect;

    const ref = React.useCallback(node => {
        setNode(node);
    }, []);

    useLayoutHookBasedOnEnvironment(() => {
        if (node) {
            const measure = () =>
                window.requestAnimationFrame(() =>
                    setDimensions(getDimensionObject(node))
                );
            measure();

            if (liveMeasure) {
                window.addEventListener('resize', measure);
                window.addEventListener('scroll', measure);

                return () => {
                    window.removeEventListener('resize', measure);
                    window.removeEventListener('scroll', measure);
                };
            }
        }
    }, [node]);

    return [ref, dimensions, node];
};

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * Credit to react-bootstrap for this.
 *
 * @param {*} children Children from a React component.
 * @param {Function} func Function to apply to each child.
 */
function map(children, func) {
    let index = 0;

    return React.Children.map(children, (child) =>
        React.isValidElement(child) ? func(child, index++) : child
    );
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid
 * components".
 *
 * Credit to react-bootstrap for this.
 */
function forEach(children, func) {
    let index = 0;

    React.Children.forEach(children, child => {
        if (React.isValidElement(child))
            func(child, index++);
    });
}

/**
 *
 * @param text
 * @param maxLength
 * @return {string}
 */
const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
        console.log('text exceeds length, shortening', text);
        text = text.substr(0, maxLength - 3) + '...';
        console.log(text);
    }

    return text;
};

export {
    debounce,
    objectsDeepEqual,
    useDimensions,
    map,
    forEach,
    shortenText
};
