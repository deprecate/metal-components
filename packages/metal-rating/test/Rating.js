'use strict';

import dom from 'metal-dom';
import Rating from '../src/Rating';

describe('Rating', function() {
  var rating;

  afterEach(function() {
    rating.dispose();
  });

  it('should render with default attributes.', function() {
    rating = new Rating().render();
    assert.strictEqual('', rating.element.style.display);
  });

  it('should render specified label.', function() {
    rating = new Rating({
      label: "This is an awesome Metal Component"
    }).render();
    assert.strictEqual("This is an awesome Metal Component", rating.element.textContent);
  });

  it('should highlight until item clicked', function() {
    rating = new Rating().render();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[2], 'click');

    rating.once('stateSynced', function(){
      elements = rating.element.querySelectorAll('.rating-item');
      assert.isTrue(elements[0].classList.contains('glyphicon-star'));
      assert.isTrue(elements[1].classList.contains('glyphicon-star'));
      assert.isTrue(elements[2].classList.contains('glyphicon-star'));
      assert.isTrue(elements[3].classList.contains('glyphicon-star-empty'));
      assert.isTrue(elements[4].classList.contains('glyphicon-star-empty'));
    });
  });

  it('should set the rate value by click', function() {
    rating = new Rating().render();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function(){
      assert.strictEqual(rating.value, 4);
    });
  });

  it('should highlight items until mouseover event target element', function() {
    rating = new Rating().render();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[4], 'mouseover');

    rating.once('stateSynced', function(){
      elements = rating.element.querySelectorAll('.rating-item');
      assert.isTrue(elements[0].classList.contains('glyphicon-star'));
      assert.isTrue(elements[1].classList.contains('glyphicon-star'));
      assert.isTrue(elements[2].classList.contains('glyphicon-star'));
      assert.isTrue(elements[3].classList.contains('glyphicon-star'));
      assert.isTrue(elements[4].classList.contains('glyphicon-star'));
    });
  });

  it('should highlight the element according to current rate after mouseleave event', function() {
    rating = new Rating().render();

    var elements = rating.element.querySelectorAll('.rating-item');
    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function(){
      dom.triggerEvent(rating, 'mouseleave');

      rating.once('stateSynced', function(){
        elements = rating.element.querySelectorAll('.rating-item');
        assert.isTrue(elements[0].classList.contains('glyphicon-star'));
        assert.isTrue(elements[1].classList.contains('glyphicon-star'));
        assert.isTrue(elements[2].classList.contains('glyphicon-star'));
        assert.isTrue(elements[3].classList.contains('glyphicon-star'));
        assert.isTrue(elements[4].classList.contains('glyphicon-star'));
      });
    });
  });

  it('should clear rate if the user click twice in the same element', function() {
    rating = new Rating().render();

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
    });
  });

  it('should not reset the rating value if the canReset attribute is false.', function() {
    rating = new Rating().render();

    var elements = rating.element.querySelectorAll('.rating-item');

    dom.triggerEvent(elements[4], 'click');

    rating.canReset = false;

    dom.triggerEvent(elements[4], 'click');

    rating.once('stateSynced', function() {
      assert.strictEqual(rating.value, 4);
    });
  });

  it('should not change rate attribute if rating is disabled', function() {
    rating = new Rating().render();

    var elements = rating.element.querySelectorAll('.rating-item');
    var defaultValue = rating.value;
    
    rating.disabled = true;

    dom.triggerEvent(elements[2], 'click');

    rating.once('stateSynced', function() {
      assert.strictEqual(rating.value, defaultValue);
    });
  });
});