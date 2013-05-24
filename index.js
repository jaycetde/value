
/**
 * Set or get `el`'s' value.
 *
 * @param {Element} el
 * @param {Mixed} val
 * @return {Mixed}
 * @api public
 */

module.exports = function(el, val){
    if (arguments.length === 2) {
        return set(el, val);
    }
    if (el instanceof HTMLFormElement) {
        return new Form(el);
    }
    return get(el);
};

/**
 * Element is a checkbox
 */

function isCheckbox(el) {
    return 'input' === el.nodeName.toLowerCase()
        && 'checkbox' === el.getAttribute('type').toLowerCase()
    ;
}

function isRadio(el) {
    return 'input' === el.nodeName.toLowerCase()
        && 'radio' === el.getAttribute('type').toLowerCase()
    ;
}

function isCheckable(el) {
    return isCheckbox(el) || isRadio(el);
}

/**
 * Form getter/setter constructor
 */
function Form(form) {
    this.form = form;
};

Form.prototype.get = function (name) {
    return get(this.form[name]);
};

Form.prototype.set = function (name, val) {
    set(this.form[name], val);
    return this;
};

/**
 * Get `el`'s value.
 */

function get(el) {
    if (el instanceof NodeList || el instanceof Array) { // Assume it's a radio group
        var e
          , i = 0
        ;
        while (e = el[i++]) { // Don't use .length prop in case NodeList has element with id `length`
            if (e.checked) {
                return e.value;
            }
        }
        return null;
    }
    return isCheckbox(el)
        ? el.checked
        : el.value
    ;
}

/**
 * Set `el`'s value.
 */

function set(el, val) {
    if (el instanceof NodeList || el instanceof Array) { // Assume it's a radio group
        var e
          , i = 0
        ;
        while (e = el[i++]) { // Don't use .length prop in case NodeList has element with id `length`
            if (e.value == val) {
                e.checked = true;
                return;
            }
        }
        return;
    }
    el[isCheckable(el) ? 'checked' : 'value'] = val;
}


