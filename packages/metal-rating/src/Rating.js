'use strict';

import core from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';
import templates from './Rating.soy';

class Rating extends Component {
    /**
     * @inheritDoc
     */
    constructor(opt_config) {
        super(opt_config);

        this.ratingClicked = -1;
    }

    /**
     * @inheritDoc
     */
    attached() {
        this.delegate('mouseover', '.rating-item', this.handleMouseOverEvent.bind(this));
        this.delegate('click', '.rating-item', this.handleClickEvent.bind(this));
        this.on('mouseleave', this.handleMouseLeaveEvent.bind(this));
    }

    /**
     * Handles click event
     * @param {Event} event
     * @protected
     */
    handleClickEvent(event) {
        if (!this.disabled) {
            let index = parseInt(event.delegateTarget.dataset.index, 10);

            if (index === this.ratingClicked && this.canReset) {
                this.reset();
            }
            else {
                this.value = index;
            }

            this.ratingClicked = this.value;
        }
    }

    /**
     * Handles mouseleave event
     * @protected
     */
    handleMouseLeaveEvent() {
        this.currentMouseTarget_ = undefined;
        this.setPreviousRate_();
    }

    /**
     * Handles mouseover event
     * @param {event} event
     * @protected
     */
    handleMouseOverEvent(event) {
        if (!this.disabled) {
            let index = Number.parseInt(event.delegateTarget.dataset.index, 10);

            if (this.currentMouseTarget_ !== index) {
                this.value = index;
            }

            this.currentMouseTarget_ = index;
        }
    }

    /**
     * Reset rating attributes to its initial value
     * @protected
     */
    reset() {
        this.value = -1;
        this.ratingClicked = -1;
    }

    /**
     * Set value attribute with the previous rating selected
     * @protected
     */
    setPreviousRate_() {
        this.value = this.ratingClicked;
    }
}

Rating.STATE = {

    /**
     * Flag indicating if this component can be reset or not
     * @type {boolean}
     * @default true
     */
    canReset: {
      value: true,
      validator: core.isBoolean
    },

    /**
     * Optional CSS classes to be added to the inner rating element.
     * @type {string}
     */
    cssClasses: {
        value: {
            off: 'glyphicon glyphicon-star-empty',
            on: 'glyphicon glyphicon-star'
        }
    },

    /**
     * Block or unblock rating functionality.
     * @type {?boolean}
     * @default false
     */
    disabled: {
        value: false,
        validator: core.isBoolean
    },

    /**
     * Name of the hidden input. It can be used to send 
     * current option value as a form data.
     *
     * @attribute inputHiddenName
     * @type {string}
     * @default 'rate'
     */
    inputHiddenName: {
        value: 'rate',
        validator: core.isString
    },

    /**
     * Label to be displayed with the Rating elements.
     *
     * @attribute label
     * @type {string}
     * @default ''
     */
    label: {
        value: '',
        validator: core.isString
    },

    /**
     * List of rate options.
     * @type {array}
     */
    options: {
        value: [
            {
                value: 1,
                title: ''
            },
            {
                value: 2,
                title: ''
            },
            {
                value: 3,
                title: ''
            },
            {
                value: 4,
                title: ''
            },
            {
                value: 5,
                title: ''
            }
        ]
    },

    /**
     * Rating current index value.
     * @type {?number}
     * @default null
     */
    value: {
        validator: core.isNumber,
        value: -1
    }
};
Soy.register(Rating, templates);

export default Rating;