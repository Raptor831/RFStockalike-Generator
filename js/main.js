(function($){

// Responsive functions. Adjust breakpoint(s) as needed
function responsive() {
  // Do these on every screen resize


  // Do these on certain widths
  if ( $(window).width() > 600 ) { // above mobile size
    $('#primary-navigation .menu').removeAttr('style');
    $('#mobile-menu-button').removeClass('has-open');
  } else { // mobile size

  }
}

function onResize() {
  responsive();
}

var resizeTimer;

window.onresize = function() {
	if (resizeTimer){
		clearTimeout(resizeTimer);
	}
	var res;
	res = setTimeout(function(){

		// Fire the onResize function.
		onResize();

	}, 200);
};

// Find a query variable for use in scripts
/*function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}*/

// Nav menu click-to-open functions
function navMenus() {
  // Any click outside of nav, close dropdowns
	$(document).click(function(e){
  	if ( $(e.target).parents().index($('#primary-navigation')) == -1 && $(e.target).parents().index($('#mobile-menu-button')) == -1 ) { // if click anywhere but nav
  	  if ( $('.has-open').length > 0 ) {// if there are any open submenus
    	  $('.menu-item-has-children.has-open .sub-menu').fadeOut(100).parent('.has-open').removeClass('has-open'); // close all submenus
      }
      var el = $('#mobile-menu-button'); // grab the mobile menu button
      if ( el.hasClass('has-open') ) { // if it's open
        $('ul#menu-primary-navigation').fadeOut(100); // close the mobile menu
        el.removeClass('has-open');
        //toggleOpen(el); // toggle the open class
      }
  	}
	});

	// Nav Dropdowns
	$('.menu-item-has-children > a').click(function(e){ // Any menu item with a sub-menu on click...
  	e.preventDefault();
  	$(this).siblings('.sub-menu').fadeToggle(100);

  	// if we click to open a submenu and there is another menu already open, close the old one
  	$(this).parent().siblings('.menu-item-has-children.has-open').each(function(){
    	$(this).removeClass('has-open').find('.sub-menu').fadeOut(100);
    	$(this).find('.menu-item-has-children.has-open').removeClass('has-open');
  	});

  	// mark the parent as having an open menu
  	$(this).parent().toggleClass('has-open');
	});
	// Any click outside of nav, close dropdowns
	$(document).click(function(e){
  	if ( $(e.target).parents().index($('#primary-navigation')) == -1 && $(e.target).parents().index($('#mobile-menu-button')) == -1) {
  	  if ( $('.has-open').length > 0 ) {
    	  $('.menu-item-has-children.has-open .sub-menu').fadeOut(100).parent('.has-open').removeClass('has-open');
      }
      var el = $('#mobile-menu-button');
      if ( el.hasClass('has-open') ) {
        $('ul#menu-primary-navigation').fadeOut(100);
        el.removeClass('has-open');
      }
  	}
	});

	// Mobile Nav Dropdown
	$('#mobile-menu-button').click(function(e){
  	e.preventDefault();
  	$('#primary-navigation .menu').fadeToggle(100);
  	$(this).toggleClass('has-open');
	});
}

function selectButton() {
  $('button#select').click(function(e){
    e.preventDefault();
    selectText('selectable');
  });
}

function selectText(containerid) {
  var range;
  if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection) {
    range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
  }
}

$(window).load( function(){
	onResize();
});

$(document).ready(function(){
	navMenus();
  selectButton();
});

})(jQuery);
