/*
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

"use strict";

(function(exports) {

function sign(number) {
    if (number < 0)
        return -1;
    if (number > 0)
        return 1;
    return 0;
}

function Animator(delegate) {
    this.delegate = delegate;
    this.startTimeStamp = 0;
    this.request_ = null;
};

Animator.prototype.scheduleAnimation = function() {
    if (this.request_)
        return;
    this.request_ = requestAnimationFrame(this.onAnimation_.bind(this));
};

Animator.prototype.startAnimation = function() {
    this.startTimeStamp = 0;
    this.scheduleAnimation();
};

Animator.prototype.stopAnimation = function() {
    cancelAnimationFrame(this.request_);
    this.startTimeStamp = 0;
    this.request_ = null;
};

Animator.prototype.onAnimation_ = function(timeStamp) {
    this.request_ = null;
    if (!this.startTimeStamp)
        this.startTimeStamp = timeStamp;
    if (this.delegate.onAnimation(timeStamp))
        this.scheduleAnimation();
};

function VelocityTracker() {
    this.recentTouchMoves_ = [];
    this.velocityX = 0;
    this.velocityY = 0;
}

VelocityTracker.kTimeWindow = 50;

VelocityTracker.prototype.pruneHistory_ = function(timeStamp) {
    for (var i = 0; i < this.recentTouchMoves_.length; ++i) {
        if (this.recentTouchMoves_[i].timeStamp > timeStamp - VelocityTracker.kTimeWindow) {
            this.recentTouchMoves_ = this.recentTouchMoves_.slice(i);
            return;
        }
    }
    // All touchmoves are old.
    this.recentTouchMoves_ = [];
};

VelocityTracker.prototype.update_ = function(e) {
    this.pruneHistory_(e.timeStamp);
    this.recentTouchMoves_.push(e);

    var oldestTouchMove = this.recentTouchMoves_[0];

    var deltaX = e.changedTouches[0].clientX - oldestTouchMove.changedTouches[0].clientX;
    var deltaY = e.changedTouches[0].clientY - oldestTouchMove.changedTouches[0].clientY;
    var deltaT = e.timeStamp - oldestTouchMove.timeStamp;

    if (deltaT > 0) {
        this.velocityX = deltaX / deltaT;
        this.velocityY = deltaY / deltaT;
    } else {
        this.velocityX = 0;
        this.velocityY = 0;
    }
};

VelocityTracker.prototype.onTouchStart = function(e) {
    this.recentTouchMoves_.push(e);
    this.velocityX = 0;
    this.velocityY = 0;
};

VelocityTracker.prototype.onTouchMove = function(e) {
    this.update_(e);
};

VelocityTracker.prototype.onTouchEnd = function(e) {
    this.update_(e);
    this.recentTouchMoves_ = [];
};

function LinearTimingFunction() {
};

LinearTimingFunction.prototype.scaleTime = function(fraction) {
  return fraction;
};

function CubicBezierTimingFunction(spec) {
  this.map = [];
  for (var ii = 0; ii <= 100; ii += 1) {
    var i = ii / 100;
    this.map.push([
      3 * i * (1 - i) * (1 - i) * spec[0] +
          3 * i * i * (1 - i) * spec[2] + i * i * i,
      3 * i * (1 - i) * (1 - i) * spec[1] +
          3 * i * i * (1 - i) * spec[3] + i * i * i
    ]);
  }
};

CubicBezierTimingFunction.prototype.scaleTime = function(fraction) {
  var fst = 0;
  while (fst !== 100 && fraction > this.map[fst][0]) {
    fst += 1;
  }
  if (fraction === this.map[fst][0] || fst === 0) {
    return this.map[fst][1];
  }
  var yDiff = this.map[fst][1] - this.map[fst - 1][1];
  var xDiff = this.map[fst][0] - this.map[fst - 1][0];
  var p = (fraction - this.map[fst - 1][0]) / xDiff;
  return this.map[fst - 1][1] + p * yDiff;
};

var presetTimingFunctions = {
  'linear': new LinearTimingFunction(),
  'ease': new CubicBezierTimingFunction([0.25, 0.1, 0.25, 1.0]),
  'ease-in': new CubicBezierTimingFunction([0.42, 0, 1.0, 1.0]),
  'ease-out': new CubicBezierTimingFunction([0, 0, 0.58, 1.0]),
  'ease-in-out': new CubicBezierTimingFunction([0.42, 0, 0.58, 1.0]),
};

function DrawerController(options) {
    this.velocityTracker = new VelocityTracker();
    this.animator = new Animator(this);

    this.target = options.target;
    this.left = options.left;
    this.right = options.right;
    this.position = options.position;

    this.width = this.right - this.left;
    this.curve = presetTimingFunctions[options.curve || 'linear'];

    this.willOpenCallback = options.willOpen;
    this.didCloseCallback = options.didClose;
    this.animateCallback = options.onAnimate;

    this.state = DrawerController.kClosed;

    this.defaultAnimationSpeed = (this.right - this.left) / DrawerController.kBaseSettleDurationMS;

    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.target.addEventListener('touchstart', this.onTouchStart.bind(this));
}

DrawerController.kOpened = 'opened';
DrawerController.kClosed = 'closed';
DrawerController.kOpening = 'opening';
DrawerController.kClosing = 'closing';
DrawerController.kDragging = 'dragging';
DrawerController.kFlinging = 'flinging';

DrawerController.kBaseSettleDurationMS = 246;
DrawerController.kMaxSettleDurationMS = 600;

DrawerController.kMinFlingVelocity = 0.4;  // Matches Android framework.
DrawerController.kTouchSlop = 5;  // Matches Android framework.
DrawerController.kTouchSlopSquare = DrawerController.kTouchSlop * DrawerController.kTouchSlop;

DrawerController.prototype.restrictToCurrent = function(offset) {
    return Math.max(this.left, Math.min(this.position, offset));
};

DrawerController.prototype.restrictToBounds = function(offset) {
    return Math.max(this.left, Math.min(this.right, offset));
};

DrawerController.prototype.onTouchStart = function(e) {
    this.velocityTracker.onTouchStart(e);

    var touchX = e.changedTouches[0].clientX;
    var touchY = e.changedTouches[0].clientY;

    if (this.state != DrawerController.kOpened) {
        if (touchX != this.restrictToCurrent(touchX))
            return;
        this.state = DrawerController.kDragging;
    }

    this.animator.stopAnimation();
    this.target.addEventListener('touchmove', this.onTouchMove);
    this.target.addEventListener('touchend', this.onTouchEnd);
    // TODO(abarth): Handle touchcancel.

    this.startX = touchX;
    this.startY = touchY;
    this.startPosition = this.position;
    this.touchBaseX = Math.min(touchX, this.startPosition);
};

DrawerController.prototype.onTouchMove = function(e) {
    this.velocityTracker.onTouchMove(e);

    if (this.state == DrawerController.kOpened) {
        var deltaX = e.changedTouches[0].clientX - this.startX;
        var deltaY = e.changedTouches[0].clientY - this.startY;

        if (deltaX * deltaX + deltaY * deltaY < DrawerController.kTouchSlopSquare) {
            e.preventDefault();
            return;
        }

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            this.target.removeEventListener('touchmove', this.onTouchMove);
            this.target.removeEventListener('touchend', this.onTouchEnd);
            return;
        }

        this.state = DrawerController.kDragging;
    }

    e.preventDefault();
    var touchDeltaX = e.changedTouches[0].clientX - this.touchBaseX;
    this.position = this.restrictToBounds(this.startPosition + touchDeltaX);
    this.animator.scheduleAnimation();
};

DrawerController.prototype.onTouchEnd = function(e) {
    this.velocityTracker.onTouchEnd(e);
    this.target.removeEventListener('touchmove', this.onTouchMove);
    this.target.removeEventListener('touchend', this.onTouchEnd);

    var velocityX = this.velocityTracker.velocityX;
    if (Math.abs(velocityX) > DrawerController.kMinFlingVelocity) {
        this.fling(velocityX);
    } else if (this.isOpen()) {
        this.open();
    } else {
        this.close();
    }
};

DrawerController.prototype.openFraction = function() {
    var width = this.right - this.left;
    var offset = this.position - this.left;
    return offset / width;
};

DrawerController.prototype.isOpen = function() {
    return this.openFraction() >= 0.5;
};

DrawerController.prototype.isOpening = function() {
    return this.state == DrawerController.kOpening ||
        (this.state == DrawerController.kFlinging && this.animationVelocityX > 0);
}

DrawerController.prototype.isClosing = function() {
    return this.state == DrawerController.kClosing ||
        (this.state == DrawerController.kFlinging && this.animationVelocityX < 0);
}

DrawerController.prototype.toggle = function() {
    if (this.isOpen())
        this.close();
    else
        this.open();
};

DrawerController.prototype.open = function() {
    if (!this.position)
        this.willOpenCallback.call(this.target);

    this.animator.stopAnimation();
    this.animationDuration = 400;
    this.state = DrawerController.kOpening;
    this.animate();
};

DrawerController.prototype.close = function() {
    this.animator.stopAnimation();
    this.animationDuration = 400;
    this.state = DrawerController.kClosing;
    this.animate();
};

DrawerController.prototype.fling = function(velocityX) {
    this.animator.stopAnimation();
    this.animationVelocityX = velocityX;
    this.state = DrawerController.kFlinging;
    this.animate();
};

DrawerController.prototype.animate = function() {
    this.positionAnimationBase = this.position;
    this.animator.startAnimation();
};

DrawerController.prototype.targetPosition = function(deltaT) {
    if (this.state == DrawerController.kFlinging)
        return this.positionAnimationBase + this.animationVelocityX * deltaT;
    var targetFraction = this.curve.scaleTime(deltaT / this.animationDuration);
    var animationWidth = this.state == DrawerController.kOpening ?
      this.width - this.positionAnimationBase : -this.positionAnimationBase;
    return this.positionAnimationBase + targetFraction * animationWidth;
};

DrawerController.prototype.onAnimation = function(timeStamp) {
    if (this.state == DrawerController.kDragging) {
        this.animateCallback.call(this.target, this.position);
        return false;
    }

    var deltaT = timeStamp - this.animator.startTimeStamp;
    var targetPosition = this.targetPosition(deltaT);
    this.position = this.restrictToBounds(targetPosition);

    this.animateCallback.call(this.target, this.position);

    if (targetPosition <= this.left && this.isClosing()) {
        this.state = DrawerController.kClosed;
        this.didCloseCallback.call(this.target);
        return false;
    }
    if (targetPosition >= this.right && this.isOpening()) {
        this.state = DrawerController.kOpened;
        return false;
    }

    return true;
};


exports.DrawerController = DrawerController;

})(window);
