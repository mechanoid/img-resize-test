var ImgResizer = function(imgWrapper, siblings, options) {
  this.imgWrapper = imgWrapper;
  this.img = this.imgWrapper.find('img');
  this.siblings = siblings || [];
  this.options = options || {};
  this.offset = this.options.offset || 0;
  this.siblingsHeight = 0;
  this.imgWrapperHeight = 0;
  this.imgMarginBottom = 0;
  this.minImageHeight = this.options.minImageHeight || 0;

  console.log("IMG:", this.img);
  console.log("Siblings:", this.siblings);
  console.log("Options:", this.options);
};

ImgResizer.prototype.debug = function() {
  console.log("__DEBUG__");
  console.log("frameHeight", this.frameHeight);
  console.log("siblingsHeight", this.siblingsHeight);
  console.log("imgWrapperHeight", this.imgWrapperHeight);
  return this;
};

ImgResizer.prototype.resolveFrameHeight = function() {
  this.frameHeight = $(window).height();
  return this;
};

ImgResizer.prototype.resolveSiblingsHeight = function() {
  var i = 0;

  for (i; i < this.siblings.length; i++) {
    console.log(this.siblings[i].outerHeight(true));
    this.siblingsHeight += this.siblings[i].outerHeight(true);
  }

  return this;
};

ImgResizer.prototype.resolveImgHeight = function() {
  this.imgWrapperHeight = this.imgWrapper.outerHeight(true);
  this.imgWrapperMarginBottom = this.imgWrapper.css('margin-bottom').slice(0,-2);
  return this;
};

ImgResizer.prototype.adjustImgHeight = function() {
  var newHeight =  this.frameHeight - this.offset - this.siblingsHeight - this.imgWrapperMarginBottom;

  if (newHeight < this.minImageHeight) {
    console.log('hide');
    this.imgWrapper.hide();
  } else {
    console.log('resize to', newHeight);
    this.img.css('max-height', newHeight + 'px')
  }

  return this;
};

ImgResizer.prototype.run = function() {
  this
  .resolveFrameHeight()
  .resolveSiblingsHeight()
  .resolveImgHeight()
  .adjustImgHeight();

  return this;
};

var imgWrapper = $('.img-wrapper');
var columns = $('.columns');
var table = $('.table');
var siblings = [columns, table];

var resizer = new ImgResizer(imgWrapper, siblings, { offset: 125 });
resizer.run().debug();
