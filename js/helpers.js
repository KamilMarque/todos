/*global NodeList */
(function (window) {

	'use strict';

	/**
	 * Get element(s) by CSS selector:querySelector
	 * 
	 * @param {String} selector name of selected element in the DOM
	 * @param {object | undefined} scope scope of selected element in the DOM
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	/**
	 * Get element(s) by CSS selector: querySelectorAll
	 * @param {String} selector name of selected element in the DOM
	 * @param {object | undefined} scope scope of selected element in the DOM
	 */
	window.qsa = function (selector, scope) {
		//console.log('fd', typeof(scope), scope)

		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * addEventListener wrapper:
	 * 
	 * @param {object} target the target
	 * @param {string} type type of the event
	 * @param {function} callback callback function
	 * @param {boolean | undefined} useCapture captured element
 	 */
	 window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
	 * Attach a handler to event for all elements that match the selector,
	 * now or in the future, based on a root element
	 * @param {object} target the target element
	 * @param {string} selector name of element
	 * @param {string} type type of the event
	 * @param {function} handler callback function
	 */
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * Find the element's parent with the given tag name:
	 * $parent(qs('a'), 'div');
	 * 
	 * @param {object} element the element
	 * @param {string} tagName the tag name
	 */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);