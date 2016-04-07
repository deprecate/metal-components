'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import Rating from '../src/Rating';

describe('Rating', function() {
  var rating;

  afterEach(function() {
    rating.dispose();
  });

  it('should render with default attributes.', function() {
    rating = new Rating();
    assert.strictEqual('', rating.element.style.display);
  });

  it('should render specified label.', function() {
    rating = new Rating({
      label: 'This is an awesome Metal Component'
    });
    assert.strictEqual('This is an awesome Metal Component', rating.element.textContent);
  });

  it('should highlight until item clicked', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[2], 'click');

    rating.once('stateSynced', function(){
      elements = rating.element.querySelectorAll('.rating-item');
      assert.isTrue(elements[0].classList.contains('glyphicon-star'));
      assert.isTrue(elements[1].classList.contains('glyphicon-star'));
      assert.isTrue(elements[2].classList.contains('glyphicon-star'));
      assert.isTrue(elements[3].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[4].classList.contains('glyphicon-star-empty'));
      done();
    });
  });

  it('should set the rate value by click', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function(){
      assert.strictEqual(rating.value, 4);
      done();
    });
  });

  it('should highlight items until mouseover event target element', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[4], 'mouseover');

    rating.once('stateSynced', function(){
      elements = rating.element.querySelectorAll('.rating-item');
      assert.isTrue(elements[0].classList.contains('glyphicon-star'));
      assert.isTrue(elements[1].classList.contains('glyphicon-star'));
      assert.isTrue(elements[2].classList.contains('glyphicon-star'));
      assert.isTrue(elements[3].classList.contains('glyphicon-star'));
      assert.isTrue(elements[4].classList.contains('glyphicon-star'));
      done();
    });
  });

  it('should highlight the element according to current value after mouseleave event', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');

    dom.triggerEvent(elements[4], 'click');
    async.nextTick(function(){
      dom.triggerEvent(rating.element, 'mouseleave');
      async.nextTick(function(){
        elements = rating.element.querySelectorAll('.rating-item');
        assert.isTrue(elements[0].classList.contains('glyphicon-star'));
        assert.isTrue(elements[1].classList.contains('glyphicon-star'));
        assert.isTrue(elements[2].classList.contains('glyphicon-star'));
        assert.isTrue(elements[3].classList.contains('glyphicon-star'));
        assert.isTrue(elements[4].classList.contains('glyphicon-star'));
        done();
      });
    });
  });

  it('should clear rate if the user click twice in the same element', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');

    var defaultValue = rating.value;
    dom.triggerEvent(elements[4], 'click');
    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function(){
      assert.isTrue(elements[0].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[1].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[2].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[3].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[4].classList.contains('glyphicon-star-empty'));
      assert.strictEqual(rating.value, defaultValue);
      done();
    });
  });

  it('should not reset the rating value if the canReset attribute is false.', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');

    dom.triggerEvent(elements[4], 'click');

    rating.canReset = false;

    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function() {
      assert.strictEqual(rating.value, 4);
      done();
    });
  });

  it('should reset startup attributes to its initial values.', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[4], 'click');
    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function() {
      assert.strictEqual(rating.value, -1);
      assert.strictEqual(rating.ratingClicked_, -1);
      done();
    });
  });

  it('should not change rate attribute if rating is disabled', function(done) {
    rating = new Rating();

    var elements = rating.element.querySelectorAll('.rating-item');
    var defaultValue = rating.value;

    rating.disabled = true;

    dom.triggerEvent(elements[2], 'click');

    rating.once('stateSynced', function() {
      assert.strictEqual(rating.value, defaultValue);
      done();
    });
  });

  it('should options attribute just accept array as value', function() {
    rating = new Rating();

    var defaultOptions = rating.options;

    rating.options = { 'title': 'It isn`t a valid value' };
    assert.strictEqual(rating.options, defaultOptions);

    rating.options = 9999;
    assert.strictEqual(rating.options, defaultOptions);

    rating.options = 'It isn`t a valid value';
    assert.strictEqual(rating.options, defaultOptions);

    rating.options = true;
    assert.strictEqual(rating.options, defaultOptions);
  });

  it('should not highlight options when mouse is over if the component is disabled', function(done) {
    rating = new Rating();
    rating.disabled = true;

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[2], 'mouseover');

    async.nextTick(function(){
      elements = rating.element.querySelectorAll('.rating-item');
      assert.isTrue(elements[0].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[1].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[2].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[3].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[4].classList.contains('glyphicon-star-empty'));
      done();
    });
  });
});
