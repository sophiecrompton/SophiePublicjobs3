/** 
 *------------------------------------------------------------------------------
 * @package       T3 Framework for Joomla!
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2004-2013 JoomlArt.com. All Rights Reserved.
 * @license       GNU General Public License version 2 or later; see LICENSE.txt
 * @authors       JoomlArt, JoomlaBamboo, (contribute to this project at github 
 *                & Google group to become co-author)
 * @Google group: https://groups.google.com/forum/#!forum/t3fw
 * @Link:         http://t3-framework.org 
 *------------------------------------------------------------------------------
 */
const languageCode = createEnum(['en', 'ga']);;

jQuery(document).ready(function() {
    headerSetup();
    navBarSetup();
	jobSearchSetup();
	modalLinksSetup();
	cookiesSetup();
	cookieScriptSetup();
	externalLinkOpensInNewWindow();
	showDialogOnExternalLink();
	addAttributesForAccessibility();		
	regularLabsAccordions();
	swapModuleArticle();
	replaceImageInNewsAndEventsModuleHomePage();
	setUpCustomAccordions();
	resizeBannerInArticles();
	openVideosInPopup();
});

function externalLinkOpensInNewWindow() {
	/* external links will be opened in a new tab */
	jQuery("a:not([data-modals-done='true'])").each(function( index, object ) {
		let linkHrefAttribute = jQuery(this).attr('href');
		let domain = location.hostname;
		
		if (linkHrefAttribute && 
			linkHrefAttribute.includes('http')  &&
			!linkHrefAttribute.includes('www.publicjobs.ie') &&
			!linkHrefAttribute.includes(domain) && 
			!linkHrefAttribute.includes('player.vimeo.com') ) {
			addAttributeToSelector(this,'target','_blank');
		}
	});
}

function showDialogOnExternalLink(){
	jQuery("a[target='_blank']").click(function(event){
		event.preventDefault();
		let linkURL = jQuery(this).attr("href");
		
		if (jQuery('#dialogNewWindow').hasClass('ui-dialog-content')) {
			return;
		}
		
		let modal = "<div id='dialogNewWindow'><br/><p id='dialogContentText'>Please note this link will open in a new window.</p></div>";
		jQuery(modal).dialog({
			  title: 'Link opening in new window',
			  resizable: false,
		      modal: true,
		      width:(window.innerWidth > 650 ) ? 600 : 0.8*window.innerWidth,
			  height: "auto",
			  buttons: {
		          Ok: function() {
					  jQuery( this ).dialog( "destroy" );
					  window.open(linkURL, '_blank');
		          }
			  },
			  close: function() {
				  jQuery( this ).dialog( "destroy" );
			  }
		});	
	});
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	
	return "";
}

function setCookie(cname, value, expireInMinutes, path) {
	var myDate = new Date();
    myDate.setMinutes(myDate.getMinutes() + expireInMinutes);
    document.cookie = cname +"=" + value + ";expires=" + myDate + '; path='+path;
}

function isCategoryAccepted(categoryname) {
	var categorySelected = false;
	var cookieConsent = getCookie("CookieScriptConsent");

	if (cookieConsent!="") {

		var categories = CookieScript.instance.currentState().categories;
		
		for (index = 0; index < categories.length; index++) { 
			
			if (categories[index]==categoryname) {
				categorySelected = true;
			}
		}
	}
	
	return categorySelected;
}

function getLanguageCode(){
	if(window.location.href.indexOf("/en/") > -1 || window.location.href.endsWith('/en')) {
		return languageCode.en;
	}
	
	if(window.location.href.indexOf("/ga/") > -1 || window.location.href.endsWith('/ga')) {
		return languageCode.ga;
	}
	
	return languageCode.en;
}

function makeLayoutMeetPeople() {
	if (jQuery("html").hasClass("meet-people")) {

        jQuery(".doormat_two").insertBefore(".doormat_one");
        jQuery(".doormat_three").insertAfter(".doormat_two");
        jQuery(".doormat_four").insertAfter(".doormat_three");
        jQuery(".doormat_one").insertAfter(".doormat_four");

        jQuery(".t3-sidebar-right").addClass("gradsub-right");
        jQuery("#t3-content").addClass("gradsub-left");

    }
}

function swapModuleArticle() {
	const urlPathName = window.location.pathname;
	
	if (isPathInURL("/stateboards/about-us"))
		jQuery(".t3-mainbody").insertBefore(".container.t3-sl.t3-sl-1");
}

function makeLayoutBestPubService() {
	if (jQuery("html").hasClass("the-best-pub-ser")) {
        jQuery(".doormat_three").insertBefore(".doormat_one");
        jQuery(".doormat_four").insertAfter(".doormat_three");
        jQuery(".doormat_one").insertAfter(".doormat_four");
        //jQuery( ".doormat_five" ).insertAfter( ".doormat_four" );
        //jQuery( ".doormat_six" ).insertAfter( ".doormat_five" );
        jQuery(".t3-sidebar-right").addClass("gradsub-right");
        jQuery("#t3-content").addClass("gradsub-left");
    }	
}

function makeLayoutHowToApply() {
	if (jQuery("html").hasClass("how-to-apply")) {
        jQuery(".doormat_four").insertBefore(".doormat_one");
        jQuery(".doormat_five").insertAfter(".doormat_one");

        jQuery(".t3-sidebar-right").addClass("gradsub-right");
        jQuery("#t3-content").addClass("gradsub-left");

    }
}

function makeLayoutInternationalCareers() {
	if (jQuery("html").hasClass("international-careers")) {
        jQuery(".doormat_five").insertBefore(".doormat_one");
        jQuery(".doormat_six").insertAfter(".doormat_five");

        jQuery(".t3-sidebar-right").addClass("gradsub-right");
        jQuery("#t3-content").addClass("gradsub-left");

    }
}

function makeLayoutGraduate() {
	if (jQuery("html").hasClass("grad-opp")) {

        jQuery(".doormat_five").insertAfter(".doormat_two");
        jQuery(".doormat_six").insertAfter(".doormat_five");

        jQuery(".t3-sidebar-right").addClass("gradsub-right");
        jQuery("#t3-content").addClass("gradsub-left");

    }
}

function makeLayoutInternationalIrish() {
	if (jQuery("html").hasClass("meet-the-international-irish")) {

        jQuery(".doormat_six").insertBefore(".doormat_one");
        jQuery(".doormat_five").insertBefore(".doormat_one");

        jQuery(".t3-sidebar-right").addClass("gradsub-right");
        jQuery("#t3-content").addClass("gradsub-left");

    }

}

function breadcrumbLinkReplace() {
	jQuery(".breadcrumb.bread-crumb li a").each(function() {

        let newUrl = jQuery(this).attr('href').replace('information-hub-blog', 'information-hub');
        jQuery(this).attr('href', newUrl);

        newUrl = jQuery(this).attr('href').replace('information-hub-2', 'information-hub-gae');
        jQuery(this).attr('href', newUrl);

        let nhref = jQuery(this).prop('href');
        if (nhref.indexOf('2-uncategorised') > -1) {
            jQuery(this).parent().remove();
        }

    });
}
	
function headerSetup() {
	addAttributeToSelector('.mod-languages li:first-child','title', 'View page in English language.');	
	addAttributeToSelector('.mod-languages li:last-child','title', 'View page in Irish language.');	
}

function navBarSetup() {
	// add role to allow screen readers to fire js events
	addAttributeToSelector('div.t3-navbar','role', 'application');	
	
	if (isTabletView()) {
		jQuery("a[href$='ga/comhairleoir-leighis']").each((index, element) => {
			let anchorHtml = jQuery(element).html().replace('Comhairleoir Leighis','Comh. Leighis ');
			jQuery(element).html(anchorHtml);
		});
		
		jQuery("a[href$='en/information-hub']").each((index, element) => {
			let anchorHtml = jQuery(element).html().replace('Info Hub','Info');
			jQuery(element).html(anchorHtml);
		});
	}
		
	// Top Menu Items
	jQuery('#t3-mainnav.navbar-default .navbar-nav.level0 > li > a').focusin(function(e) {
		jQuery(this).removeClass("expanded");
		jQuery(this).trigger("mouseleave");
	});
	
	jQuery('#t3-mainnav.navbar-default .navbar-nav.level0 > li.dropdown > a').keydown(function(e) {
	    if(isEnterKey(e)) {
			window.location = jQuery(this).attr('href');
		} else if (isSpaceBarKey(e)) {
			jQuery(this).toggleClass("expanded");
			addAttributeToSelector(this,'aria-expanded', jQuery(this).hasClass("expanded"));
			jQuery(this).trigger( jQuery(this).hasClass("expanded") ? "mouseover" : "mouseleave");
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	jQuery('#t3-mainnav.navbar-default .navbar-nav.level0 > li.dropdown').mouseenter(function(e) {
		jQuery(this).find('> a').first().attr('aria-expanded', true);
	});
	
	jQuery('#t3-mainnav.navbar-default .navbar-nav.level0 > li.dropdown').mouseleave(function(e) {
		jQuery(this).find('> a').first().attr('aria-expanded', false);
		
		jQuery('.t3-megamenu .dropdown-menu .mega-nav.level1 > li.dropdown-submenu > a').each(function(element, index) {
			jQuery(this).first().attr('aria-expanded', false);
		});
	});
	
	jQuery('#t3-mainnav.navbar-default .navbar-nav.level0 > li.dropdown > a').focusout(function(e) {
		jQuery(this).first().attr('aria-expanded', false);
	});
	
	// Sub Menus			
	jQuery('.t3-megamenu .dropdown-menu .mega-nav.level1 > li.dropdown-submenu > a').each(function(element, index) {
		jQuery(this).first().attr('aria-expanded', false);
	});
	
	jQuery('.t3-megamenu .dropdown-menu .mega-nav.level1 > li.dropdown-submenu > a').keydown(function(e) {
	    if(isEnterKey(e)) {
			const linkHref = jQuery(this).attr('href');
			if (linkHref != undefined)
				window.location = jQuery(this).attr('href');
		} else if (isSpaceBarKey(e)) {
			jQuery(this).toggleClass("expanded");
			addAttributeToSelector(this,'aria-expanded', jQuery(this).hasClass("expanded"));
			jQuery(this).trigger( jQuery(this).hasClass("expanded") ? "mouseover" : "mouseleave");
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	jQuery('.t3-megamenu .dropdown-menu .mega-nav.level1 > li:not(.dropdown-submenu)').focusin(function(e) {
		jQuery(this).trigger( "mouseover");	
		
		jQuery('.t3-megamenu .dropdown-menu .mega-nav.level1 > li.dropdown-submenu > a').each(function(element, index) {
			jQuery(this).first().attr('aria-expanded', false);
		});
	});
	
	jQuery('.t3-megamenu .dropdown-menu .mega-nav.level1 > li:last-child').keydown(function(e) {
		const KEY_TAB = 9;
		const KEY_SHIFT = 16;
		
		if (isKeyCode(e, KEY_SHIFT)) {
			jQuery(this).addClass("focusBackward");
			return;
		} else if (isKeyCode(e, KEY_TAB) && jQuery(this).hasClass("focusBackward")) {
			jQuery(this).removeClass("focusBackward");
			return;		
		}
		
		jQuery(this).closest( "ul" ).removeClass("expanded");
		jQuery(this).closest( "ul" ).trigger( "mouseleave");		
	});

	// colapse sub menus on load
	jQuery('.t3-off-canvas .t3-off-canvas-body li.parent ul.dropdown-menu').hide();
	
	// add icon to expand/colapse sub menus
	jQuery('<span class="plm" data-class="plm-data" ><i class="arrow"></span>').insertAfter('.t3-off-canvas .t3-off-canvas-body .parent > a');
	
	jQuery('.plm').click(function() {
		jQuery(this).siblings('a').toggleClass('open');
		jQuery(this).find('i').toggleClass('down');
		jQuery(this).siblings('.dropdown-menu').toggle(500);		
    });
	
	// Off canvas icon
	jQuery(".btn.btn-primary.off-canvas-toggle").insertAfter(".logo-image");
}

function jobSearchSetup() {
		// Enter key on category and keywords field
	jQuery("#category,#keywords").each(function(){
		jQuery(this).keyup(function (e) {
			if(isEnterKey(e)) {
				jQuery("#search").click();
				// This is required to stop the form being submitted
				e.preventDefault();
				return false;
			}
		});
	});

	jQuery('#jobsForm').submit(function(e) {
        jQuery("#search").click();
		e.preventDefault();
        return false;        
    });			

	jQuery( ".avail-appoint .pnt-texts" ).insertBefore( ".avail-appoint .jobSearch-results-container" );
}

function modalLinksSetup() {
    if (jQuery("a.modal_link")) {
		jQuery("a.modal_link").each(function( index, object ) {
			
			if (jQuery(this).data('modal-iframe') && jQuery(this).data('modal-video')) {
				
				jQuery(this).click(function(event) {
					if (!isCategoryAccepted("functionality")) {
						
						addAttributeToSelector(this,'copy-href',jQuery(this).attr('href'));
						addAttributeToSelector(this,'copy-class',jQuery(this).attr('class'));
						addAttributeToSelector(this,'copy-modal-iframe',jQuery(this).attr('data-modal-iframe'));
						addAttributeToSelector(this,'copy-modal-video',jQuery(this).attr('data-modal-video'));
						addAttributeToSelector(this,'copy-modal-done',jQuery(this).attr('data-modal-done'));
						addAttributeToSelector(this,'copy-modal-class-name',jQuery(this).attr('data-modal-class-name'));						
						
						jQuery(this).removeAttr('href');
						jQuery(this).removeAttr('class');
						jQuery(this).removeAttr('data-modal-iframe');
						jQuery(this).removeAttr('data-modal-video');
						jQuery(this).removeAttr('data-modal-done');
						jQuery(this).removeAttr('data-modal-class-name');
						
						alert("Please accept Functionality Cookies to view video content.");						
					} else if ( !jQuery.isEmptyObject(jQuery(this).attr('copy-href')) ) {
						
						addAttributeToSelector(this,'href',jQuery(this).attr('copy-href'));
						addAttributeToSelector(this,'class',jQuery(this).attr('copy-class'));						
						addAttributeToSelector(this,'data-modal-iframe',jQuery(this).attr('copy-modal-iframe'));
						addAttributeToSelector(this,'data-modal-video',jQuery(this).attr('copy-modal-video'));
						addAttributeToSelector(this,'data-modal-done',jQuery(this).attr('copy-modal-done'));
						addAttributeToSelector(this,'data-modal-class-name',jQuery(this).attr('copy-modal-class-name'));
						
						
						jQuery(this).removeAttr('copy-href');
						jQuery(this).removeAttr('copy-class');
						jQuery(this).removeAttr('copy-modal-iframe');
						jQuery(this).removeAttr('copy-modal-video');
						jQuery(this).removeAttr('copy-modal-done');
						jQuery(this).removeAttr('copy-modal-class-name');						
					}
				});				
			}
		});
	}	
}

function cookieScriptSetup() {
	const cookiescriptclosefocus = function() {
		jQuery('#cookiescript_close').focus();
		addAttributeToSelector("#cookiescript_declaration",'aria-label','Cookie declaration Tab');
		addAttributeToSelector("#cookiescript_aboutcookies",'aria-label','About Cookies Tab');
		addAttributeToSelector(".cookiescript_category_strict",'aria-label','Strictly necessary category');
		addAttributeToSelector(".cookiescript_category_performance",'aria-label','Statistics/Analytics category');
		addAttributeToSelector(".cookiescript_category_targeting",'aria-label','Third Party Tracking category');
		addAttributeToSelector(".cookiescript_category_functionality",'aria-label','Functionality category');
		addAttributeToSelector("#cookiescript_injected_wrapper",'aria-modal',true);
		addAttributeToSelector("#cookiescript_injected_wrapper",'role','dialog');
		addAttributeToSelector("#cookiescript_injected_wrapper",'aria-atomic',true);
		jQuery('#cookiescript_header').replaceWith(function () {
			return jQuery("<h2>", {
				id: this.id,
				class: this.className,
				'data-cs-i18n-text': jQuery(this).attr('data-cs-i18n-text'),
				html: jQuery(this).html()
			});
		});
	};

	setTimeout(cookiescriptclosefocus,1000);		

	jQuery(document)
	.on('click','#cookiescript_badge',function(){
		setTimeout(cookiescriptclosefocus,1000);		
	})
	.on('keydown','#cookiescript_badgetext',function (e) {
		if(isEnterKey(e)) {
			event.preventDefault();
			setTimeout(cookiescriptclosefocus,1000);
		}			  
	})
	.on('focus','#cookiescript_declaration, #cookiescript_aboutcookies',function(){
		toggleActiveCookieButtons();
	})
	.on('click','#cookiescript_declaration, #cookiescript_aboutcookies',function(){
		toggleActiveCookieButtons();
	})
	.on('keydown','#cookiescript_declaration, #cookiescript_aboutcookies',function (e) {
		if(isEnterKey(e) || isSpaceBarKey(e))
			toggleActiveCookieButtons();		  
		
		/*if(isKeyCode(e, 9) && !e.shiftKey && this.id == 'cookiescript_declaration') {
			jQuery('.cookiescript_category_strict').first().focus();
		}*/
	})
	.on('focus','.cookiescript_category_strict, .cookiescript_category_performance, .cookiescript_category_targeting, .cookiescript_category_functionality',function(){
		toggleActiveDeclarationCookieButtons();
	})
	.on('click','.cookiescript_category_strict, .cookiescript_category_performance, .cookiescript_category_targeting, .cookiescript_category_functionality',function(){
		toggleActiveDeclarationCookieButtons();
	})
	.on('keydown','.cookiescript_category_strict, .cookiescript_category_performance, .cookiescript_category_targeting, .cookiescript_category_functionality',function (e) {
		if(isEnterKey(e) || isSpaceBarKey(e))
			toggleActiveDeclarationCookieButtons();		  
	});
}

function toggleActiveCookieButtons() {
	toggleActiveButtons('#cookiescript_declaration','#cookiescript_aboutcookies');
}

function toggleActiveDeclarationCookieButtons() {
	toggleActiveButtons('.cookiescript_category_strict','.cookiescript_category_performance', '.cookiescript_category_targeting', '.cookiescript_category_functionality');
}

function toggleActiveButtons(...selectors) {
	selectors.forEach((selector) => {
		let elementSelected = jQuery(selector);
		addAttributeToSelector(selector,'aria-current',elementSelected.hasClass('cookiescript_active'));
	});
}

function cookiesSetup() {
	if (getCookie("login")!=='') {	
		jQuery('.register').hide();
		jQuery('.login').hide();
		jQuery('.myprofile').show();
	} else {
		jQuery('.myprofile').hide();
	};
	
	/* language cookies */
	if (getCookie("lang")!==getLanguageCode()) {
		setCookie("lang",getLanguageCode(), 30, '/');
	}

	if (getCookie("Recite.Persist")==="true") {
		addAttributeToSelector("#accessibilityLink","aria-expanded", true);		
    }
}

function addAttributesForAccessibility() {
	addAttributesToHomePage();
	addAttributesToSiteMapPage();
	addAttributesToDEIPage();
	addRoleToSliders();	
	addSizeToDownloadableLinks();
}

function addAttributesToHomePage() {
	addAttributeToSelector('.uk-position-center-left','aria-label','Previous Item');
	addAttributeToSelector('.uk-position-center-left','title','Previous Item');
	addAttributeToSelector('.uk-position-center-right','aria-label','Next Item');
	addAttributeToSelector('.uk-position-center-right','title','Next Item');
	
	addAttributeToSelector('li[uk-slider-item="0"] > a[href=""]','aria-label','Previous Item');
	addAttributeToSelector('li[uk-slider-item="0"] > a[href=""]','title','Previous Item');
	addAttributeToSelector('li[uk-slider-item="2"] > a[href=""]','aria-label','Next Item');
	addAttributeToSelector('li[uk-slider-item="2"] > a[href=""]','title','Next Item');
	
	jQuery('section.readmore > a').each( function( index, object ) {
		let ariaLabelValue = isEnglishLanguage() && getUrlParam('lang','en')===languageCode.en
			? 'Read More '+jQuery(this).attr('aria-label')
			: 'Léigh tuilleadh '+jQuery(this).attr('aria-label');
		addAttributeToSelector(this,'aria-label',ariaLabelValue);
	});	
	
	let headers = jQuery(":header");
	
	if (jQuery(":header").length > 1) {
		let firstHeader = jQuery(":header").filter( ":visible" ).first();
		
		if (firstHeader.not('h1')) {
			let firstH1Header = jQuery(":header").filter( "h1:visible" ).first();
			let firstH1Text = jQuery(":header").filter( "h1:visible" ).first().length == 0
				? document.title
				: firstH1Header.text();
			jQuery( "<h1 id='firstHeader'></h1>" )
			.addClass( "visuallyhidden" )
			.text(firstH1Text)
			.prependTo( "body" );
		}
	}
	//visuallyhidden
}

function addRoleToSliders() {
	addAttributeToSelector('div.uk-slider.uk-slider-container','role','figure');
	addAttributeToSelector('div.uk-slideshow div.uk-overlay ul.uk-dotnav','role','tablist');
	addAttributeToSelector('div.uk-slideshow div.uk-overlay ul.uk-dotnav > li','role','none');
}

function addAttributesToSiteMapPage() {
	var siteMapFolder = jQuery('ul.jmap_filetree span.folder');
	siteMapFolder.each(function() {
		addAttributeToSelector(this,'role','button');
		addAttributeToSelector(this,'aria-label',jQuery(this).text());
		addAttributeToSelector(this,'tabindex','0');
		performClickOnEnter(this);
	});
	
	jQuery('ul.jmap_filetree div.hitarea.collapsable-hitarea').each(function() {
		addAttributeToSelector(this,'role','button');
		addAttributeToSelector(this,'aria-label','Expand Collapse Icon');
		addAttributeToSelector(this,'tabindex','0');
		performClickOnEnter(this);
	});
}

function addAttributesToDEIPage() {
	if (isPathInURL("/diversity-and-inclusion","/eagsulacht-agus-cuimsiu"))
		setInterval(removeAttributeInTabs,0);
}

function removeAttributeInTabs() {
	jQuery('ul.ui-tabs-nav > li').removeAttr('aria-expanded');
	addAttributeToSelector('ul.ui-tabs-nav > li > a','aria-hidden',true);
}

function addAttributeToSelector(selector, attributeName, attributeValue) {
	jQuery(selector).attr(attributeName,attributeValue);
}

function performClickOnEnter(clickableElement) {
	jQuery(clickableElement).keydown(function (e) {
		if(isEnterKey(e)) {
			event.preventDefault();
			jQuery(clickableElement).click();				
		}			  
	});
}

function regularLabsAccordions() {
	const urlPathName = window.location.pathname;
	
	if (isPathInURL("/capability-framework/","/coras-inniulachta/"))
		window.RegularLabs.TabsAccordions.closeAll();
}

function isPathInURL(...paths) {
	const urlPathName = window.location.pathname;
	const isIncluded = (element) => urlPathName.includes(element);
	
	let isFound = paths.findIndex(isIncluded);
	
	return isFound > -1;
}

function isEnglishLanguage(){
	return getLanguageCode()===languageCode.en;
}

function replaceImageInNewsAndEventsModuleHomePage() {
	jQuery('.home figure.newsflash-image > img').each((index, element) => {
		let currentImage = element.src;
		let pos = element.src.lastIndexOf('.');
		let newImage = currentImage.substring(0,pos) + '_homepage' + currentImage.substring(pos);
		
		//element.src = newImage;
	});
	
	jQuery(".dei-lat-news").appendTo(".diversity-news-container");
}

function setUpCustomAccordions(){
	for(var l=document.querySelectorAll(".custom-accordion .menu1"),e=0;e<l.length;e++)
			l[e].addEventListener("click",n);
	
	function n(){
		for(let e=document.querySelectorAll(".custom-accordion .panel1"),n=0;n<e.length;n++)
			e[n].className="panel1 close";
		
		if(-1==this.className.indexOf("active")){
			for(n=0;n<l.length;n++)
				l[n].className="menu1";
			
			this.className="menu1 active";
			let nextSibling = this.nextElementSibling;
			
			while(nextSibling) {
				if (nextSibling.tagName.toUpperCase()==="DIV") {
				  nextSibling.className="panel1 open";
				}
				nextSibling = nextSibling.nextElementSibling;  
			}
		}else 
			for(n=0;n<l.length;n++)
				l[n].className="menu1"
	}
};

function resizeBannerInArticles(){
	let articleBanner = jQuery(".dei-banner");
	
	if (!isMobileView() || articleBanner.length == 0) 
		return;
	
	let h1Text = (jQuery(".dei-banner-text > h1.hidden-md").length == 0) ?
		jQuery(".dei-banner-text > h1:first-child").html().trim():
		jQuery(".dei-banner-text > h1.hidden-md").html().trim();
	let countBreakLines = h1Text.split("<br").length - 1;
	
	switch (countBreakLines) {
	  case 3:
		setTopArticleBanner(articleBanner, '120px');
		break;
	  case 2: 
		setTopArticleBanner(articleBanner, '100px');
		break;
	  case 1: 
		setTopArticleBanner(articleBanner, '70px');
		break; 
	  default:
		setTopArticleBanner(articleBanner, '50px');	
	}
}

function setTopArticleBanner(banner, topInPixel) {
	banner.css('margin-top', topInPixel);
	jQuery(".dei-banner-text").css('top', '-'+topInPixel);
}

function isTabletView() {
	return window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches;
}

function isMobileView() {
	return window.matchMedia('(max-width: 767px)').matches;
}

function openVideosInPopup() {
	jQuery("a.vimeoVideo").click(function(event){
		if (!isCategoryAccepted("functionality")) {
			alert("Please accept Functionality Cookies to view video content.");
			event.preventDefault();
		} else {
			showDialogVideo(event,this);
		}
	});
}

function showDialogVideo(event,linkElement){
		event.preventDefault();
		let linkURL = jQuery(linkElement).attr("href");		
		let modalContent = '<div style="width:100%;height:100%;"><iframe src="'+linkURL+'?badge=0&amp;autopause=0&amp;quality_selector=1&amp;progress_bar=1&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0" title="Publicjobs video" aria-label="Publicjobs video"></iframe></div>';
		
		jQuery(modalContent).dialog({
			  title: '',
			  resizable: false,
		      modal: true,
		      width: 0.98*window.innerWidth,
			  height: window.innerHeight,
			  left: '0px',
			  top:'0px',
			  dialogClass: 'videoDialog',
			  buttons: {
		          Close: function() {
					  jQuery( this ).dialog( "destroy" );
		          }
			  },
			  close: function() {
				  jQuery( this ).dialog( "destroy" );
			  }
		});	
	
}

function getUrlVars() {
	let vars = {};
	let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});		
	
	return vars;
}

function getUrlParam(paramName, defaultValue = '') {
	return getUrlVars().hasOwnProperty(paramName) ? getUrlVars()[paramName]: defaultValue;
}

function getToday(){
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; //January is 0!
	let yyyy = today.getFullYear();
	
	if(dd < 10)
		dd = '0'+dd;
	
	if(mm < 10)
		mm = '0'+mm;
	
	return dd + '/' + mm + '/' + yyyy;	
}

function isEnterKey(e) {
	return isKeyCode(e, 13);
}

function isSpaceBarKey(e) {
	return isKeyCode(e, 32);
}

function isKeyCode(e, keyValue) {
	let code = e.keyCode || e.which;
	
	return code == keyValue;
}

function getKeyCode(e) {
	let code = e.keyCode || e.which;
	
	return code;
}

function addSizeToDownloadableLinks() {
	jQuery("a")
		.filter( function( index ) { return isExtensionAllowed(this);} )
		.each( function() {	processDownloadableLink(this); });
}

function processDownloadableLink(element) {
	let link = element;
	
	jQuery.ajax({
		type: 'HEAD',
		url: link.href,
		crossDomain: true
	}).done(function(data,textStatus, jqXHR) {
		let size = convertBytesToMB(jqXHR.getResponseHeader('Content-Length'));
		let additionalInfo = ' [ '+link.href.split('.').pop().toUpperCase()+' ' + size + ' Mbs ]';
		const linkText = jQuery(link).text().toString().replace('>','');
		const linkAriaLabel = linkText.toLowerCase().includes('download')
			? linkText
			: 'Download'.concat(' ',linkText);
		
		jQuery(link).append(additionalInfo);
		jQuery(link).attr('aria-label', linkAriaLabel.concat(additionalInfo));
	});
}
	
function convertBytesToMB(bytes, decimals = 2) {
	const MGSize = 1024*1024;
	return (bytes/MGSize).toFixed(decimals);
}

function isExtensionAllowed(link) {
	const extensions = ['pdf','zip','txt','doc','docx','xls','xlsx','ppt','pptx'];
	const extension = link.href.split('.').pop().toLowerCase();
	
	return extensions.includes(extension);
}

function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}