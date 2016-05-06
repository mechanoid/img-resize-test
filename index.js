var ImgResizer = function(contentWrapper, img, options) {
  this.contentWrapper = contentWrapper;
  this.img = img;
  this.options = options || {};

  this.minImageHeight = this.options.minImageHeight || 150;

  this.frameHeight = 0;
  this.offsets = this.options.additionalOffsets || [];
  this.offset = 0;
  this.contentOffset = 0;
  this.contentHeight = 0;
};

ImgResizer.prototype.debug = function() {
  console.log("frameHeight", this.frameHeight);
  console.log("offset", this.offset);
  console.log("content offset", this.contentOffset);
  console.log("content height", this.contentHeight);
  console.log("content bottom line", this.contentBottomLine);
  return this;
};

ImgResizer.prototype.resolveFrameHeight = function() {
  this.frameHeight = $(window).height();
  return this;
};

ImgResizer.prototype.resolveOffset = function() {
  var i = 0;

  for (i; i < this.offsets.length; i++) {
    this.offset += this.offsets[i].outerHeight(true);
  }

  return this;
};

ImgResizer.prototype.resolveContentDimensions = function() {
  this.contentHeight = this.contentWrapper.outerHeight(true);
  this.contentOffset = this.contentWrapper.offset().top;
  this.contentBottomLine = this.contentHeight + this.contentOffset;
  return this;
};

ImgResizer.prototype.resolveImgHeight = function() {
  this.imgWrapperHeight = this.imgWrapper.outerHeight(true);
  this.imgWrapperMarginBottom = this.imgWrapper.css('margin-bottom').slice(0,-2);
  return this;
};

ImgResizer.prototype.adjustImgHeight = function() {
  var newHeight =  this.frameHeight - this.contentBottomLine - this.offset;
  console.log(this.frameHeight, this.contentBottomLine, this.offset);
  if (newHeight < this.minImageHeight) {
    this.img.hide();
  } else {
    this.img.css('max-height', newHeight + 'px')
  }

  return this;
};

ImgResizer.prototype.run = function() {
  this
  .resolveFrameHeight()
  .resolveOffset()
  .resolveContentDimensions()
  .adjustImgHeight()
  ;

  return this;
};

var resizer = new ImgResizer($('.content'), $('img.dispensable'), { additionalOffsets: [$('footer')]});
resizer.run().debug();
