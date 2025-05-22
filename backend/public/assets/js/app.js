/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Version: 4.3.0
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Main Js File
*/

(function () {
	("use strict");

	/**
	 *  global variables
	 */
	var navbarMenuHTML = document.querySelector(".navbar-menu").innerHTML;
	var horizontalMenuSplit = 7; // after this number all horizontal menus will be moved in More menu options
	var default_lang = "en"; // set Default Language
	var language = localStorage.getItem("language");

	function initLanguage() {
		// Set new language
		(language === null) ? setLanguage(default_lang) : setLanguage(language);
		var languages = document.getElementsByClassName("language");
		languages && Array.from(languages).forEach(function (dropdown) {
			dropdown.addEventListener("click", function (event) {
				setLanguage(dropdown.getAttribute("data-lang"));
			});
		});
	}

	function setLanguage(lang) {
		if (document.getElementById("header-lang-img")) {
			if (lang == "en") {
				document.getElementById("header-lang-img").src = "assets/images/flags/us.svg";
			} else if (lang == "sp") {
				document.getElementById("header-lang-img").src = "assets/images/flags/spain.svg";
			} else if (lang == "gr") {
				document.getElementById("header-lang-img").src = "assets/images/flags/germany.svg";
			} else if (lang == "it") {
				document.getElementById("header-lang-img").src = "assets/images/flags/italy.svg";
			} else if (lang == "ru") {
				document.getElementById("header-lang-img").src = "assets/images/flags/russia.svg";
			} else if (lang == "ch") {
				document.getElementById("header-lang-img").src = "assets/images/flags/china.svg";
			} else if (lang == "fr") {
				document.getElementById("header-lang-img").src = "assets/images/flags/french.svg";
			} else if (lang == "ar") {
				document.getElementById("header-lang-img").src = "assets/images/flags/ae.svg";
			}
			localStorage.setItem("language", lang);
			language = localStorage.getItem("language");
			getLanguage();
		}
	}

	// Multi language setting
	function getLanguage() {
		language == null ? setLanguage(default_lang) : false;
		var request = new XMLHttpRequest();
		// Instantiating the request object
		request.open("GET", "assets/lang/" + language + ".json");
		// Defining event listener for readystatechange event
		request.onreadystatechange = function () {
			// Check if the request is compete and was successful
			if (this.readyState === 4 && this.status === 200) {
				var data = JSON.parse(this.responseText);
				Object.keys(data).forEach(function (key) {
					var elements = document.querySelectorAll("[data-key='" + key + "']");
					Array.from(elements).forEach(function (elem) {
						elem.textContent = data[key];
					});
				});
			}
		};
		// Sending the request to the server
		request.send();
	}

	function pluginData() {
		/**
		 * Common plugins
		 */
		/**
		 * Toast UI Notification
		 */
		var toastExamples = document.querySelectorAll("[data-toast]");
		Array.from(toastExamples).forEach(function (element) {
			element.addEventListener("click", function () {
				var toastData = {};
				var isToastVal = element.attributes;
				if (isToastVal["data-toast-text"]) {
					toastData.text = isToastVal["data-toast-text"].value.toString();
				}
				if (isToastVal["data-toast-gravity"]) {
					toastData.gravity = isToastVal["data-toast-gravity"].value.toString();
				}
				if (isToastVal["data-toast-position"]) {
					toastData.position = isToastVal["data-toast-position"].value.toString();
				}
				if (isToastVal["data-toast-className"]) {
					toastData.className = isToastVal["data-toast-className"].value.toString();
				}
				if (isToastVal["data-toast-duration"]) {
					toastData.duration = isToastVal["data-toast-duration"].value.toString();
				}
				if (isToastVal["data-toast-close"]) {
					toastData.close = isToastVal["data-toast-close"].value.toString();
				}
				if (isToastVal["data-toast-style"]) {
					toastData.style = isToastVal["data-toast-style"].value.toString();
				}
				if (isToastVal["data-toast-offset"]) {
					toastData.offset = isToastVal["data-toast-offset"];
				}
				Toastify({
					newWindow: true,
					text: toastData.text,
					gravity: toastData.gravity,
					position: toastData.position,
					className: "bg-" + toastData.className,
					stopOnFocus: true,
					offset: {
						x: toastData.offset ? 50 : 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
						y: toastData.offset ? 10 : 0, // vertical axis - can be a number or a string indicating unity. eg: '2em'
					},
					duration: toastData.duration,
					close: toastData.close == "close" ? true : false,
					style: toastData.style == "style" ? {
						background: "linear-gradient(to right, var(--vz-success), var(--vz-primary))"
					} : "",
				}).showToast();
			});
		});

		/**
		 * Choices Select plugin
		 */
		var choicesExamples = document.querySelectorAll("[data-choices]");
		Array.from(choicesExamples).forEach(function (item) {
			var choiceData = {};
			var isChoicesVal = item.attributes;
			if (isChoicesVal["data-choices-groups"]) {
				choiceData.placeholderValue = "This is a placeholder set in the config";
			}
			if (isChoicesVal["data-choices-search-false"]) {
				choiceData.searchEnabled = false;
			}
			if (isChoicesVal["data-choices-search-true"]) {
				choiceData.searchEnabled = true;
			}
			if (isChoicesVal["data-choices-removeItem"]) {
				choiceData.removeItemButton = true;
			}
			if (isChoicesVal["data-choices-sorting-false"]) {
				choiceData.shouldSort = false;
			}
			if (isChoicesVal["data-choices-sorting-true"]) {
				choiceData.shouldSort = true;
			}
			if (isChoicesVal["data-choices-multiple-remove"]) {
				choiceData.removeItemButton = true;
			}
			if (isChoicesVal["data-choices-limit"]) {
				choiceData.maxItemCount = isChoicesVal["data-choices-limit"].value.toString();
			}
			if (isChoicesVal["data-choices-limit"]) {
				choiceData.maxItemCount = isChoicesVal["data-choices-limit"].value.toString();
			}
			if (isChoicesVal["data-choices-editItem-true"]) {
				choiceData.maxItemCount = true;
			}
			if (isChoicesVal["data-choices-editItem-false"]) {
				choiceData.maxItemCount = false;
			}
			if (isChoicesVal["data-choices-text-unique-true"]) {
				choiceData.duplicateItemsAllowed = false;
			}
			if (isChoicesVal["data-choices-text-disabled-true"]) {
				choiceData.addItems = false;
			}
			isChoicesVal["data-choices-text-disabled-true"] ? new Choices(item, choiceData).disable() : new Choices(item, choiceData);
		});

		/**
		 * flatpickr
		 */
		var flatpickrExamples = document.querySelectorAll("[data-provider]");
		Array.from(flatpickrExamples).forEach(function (item) {
			if (item.getAttribute("data-provider") == "flatpickr") {
				var dateData = {};
				var isFlatpickerVal = item.attributes;
				dateData.disableMobile = "true";
				if (isFlatpickerVal["data-date-format"])
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				if (isFlatpickerVal["data-enable-time"]) {
					(dateData.enableTime = true),
						(dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString() + " H:i");
				}
				if (isFlatpickerVal["data-altFormat"]) {
					(dateData.altInput = true),
						(dateData.altFormat = isFlatpickerVal["data-altFormat"].value.toString());
				}
				if (isFlatpickerVal["data-minDate"]) {
					dateData.minDate = isFlatpickerVal["data-minDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-maxDate"]) {
					dateData.maxDate = isFlatpickerVal["data-maxDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-deafult-date"]) {
					dateData.defaultDate = isFlatpickerVal["data-deafult-date"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-multiple-date"]) {
					dateData.mode = "multiple";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-range-date"]) {
					dateData.mode = "range";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-inline-date"]) {
					(dateData.inline = true),
						(dateData.defaultDate = isFlatpickerVal["data-deafult-date"].value.toString());
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-disable-date"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-disable-date"].value);
					dateData.disable = dates.toString().split(",");
				}
				if (isFlatpickerVal["data-week-number"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-week-number"].value);
					dateData.weekNumbers = true
				}
				flatpickr(item, dateData);
			} else if (item.getAttribute("data-provider") == "timepickr") {
				var timeData = {};
				var isTimepickerVal = item.attributes;
				if (isTimepickerVal["data-time-basic"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i");
				}
				if (isTimepickerVal["data-time-hrs"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.time_24hr = true);
				}
				if (isTimepickerVal["data-min-time"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.minTime = isTimepickerVal["data-min-time"].value.toString());
				}
				if (isTimepickerVal["data-max-time"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.minTime = isTimepickerVal["data-max-time"].value.toString());
				}
				if (isTimepickerVal["data-default-time"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.dateFormat = "H:i"),
						(timeData.defaultDate = isTimepickerVal["data-default-time"].value.toString());
				}
				if (isTimepickerVal["data-time-inline"]) {
					(timeData.enableTime = true),
						(timeData.noCalendar = true),
						(timeData.defaultDate = isTimepickerVal["data-time-inline"].value.toString());
					timeData.inline = true;
				}
				flatpickr(item, timeData);
			}
		});

		// Dropdown
		Array.from(document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]')).forEach(function (element) {
			element.addEventListener("click", function (e) {
				e.stopPropagation();
				bootstrap.Tab.getInstance(e.target).show();
			});
		});
	}

	// on click collapse menu
	function isCollapseMenu() {
		/**
		 * Sidebar menu collapse
		 */
		if (document.querySelectorAll(".navbar-nav .collapse")) {
			var collapses = document.querySelectorAll(".navbar-nav .collapse");
			Array.from(collapses).forEach(function (collapse) {
				// Init collapses
				var collapseInstance = new bootstrap.Collapse(collapse, {
					toggle: false,
				});
				// Hide sibling collapses on `show.bs.collapse`
				collapse.addEventListener("show.bs.collapse", function (e) {
					e.stopPropagation();
					var closestCollapse = collapse.parentElement.closest(".collapse");
					if (closestCollapse) {
						var siblingCollapses = closestCollapse.querySelectorAll(".collapse");
						Array.from(siblingCollapses).forEach(function (siblingCollapse) {
							var siblingCollapseInstance = bootstrap.Collapse.getInstance(siblingCollapse);
							if (siblingCollapseInstance === collapseInstance) {
								return;
							}
							siblingCollapseInstance.hide();
						});
					} else {
						var getSiblings = function (elem) {
							// Setup siblings array and get the first sibling
							var siblings = [];
							var sibling = elem.parentNode.firstChild;
							// Loop through each sibling and push to the array
							while (sibling) {
								if (sibling.nodeType === 1 && sibling !== elem) {
									siblings.push(sibling);
								}
								sibling = sibling.nextSibling;
							}
							return siblings;
						};
						var siblings = getSiblings(collapse.parentElement);
						Array.from(siblings).forEach(function (item) {
							if (item.childNodes.length > 2)
								item.firstElementChild.setAttribute("aria-expanded", "false");
							var ids = item.querySelectorAll("*[id]");
							Array.from(ids).forEach(function (item1) {
								item1.classList.remove("show");
								if (item1.childNodes.length > 2) {
									var val = item1.querySelectorAll("ul li a");
									Array.from(val).forEach(function (subitem) {
										if (subitem.hasAttribute("aria-expanded"))
											subitem.setAttribute("aria-expanded", "false");
									});
								}
							});
						});
					}
				});

				// Hide nested collapses on `hide.bs.collapse`
				collapse.addEventListener("hide.bs.collapse", function (e) {
					e.stopPropagation();
					var childCollapses = collapse.querySelectorAll(".collapse");
					Array.from(childCollapses).forEach(function (childCollapse) {
						childCollapseInstance = bootstrap.Collapse.getInstance(childCollapse);
						childCollapseInstance.hide();
					});
				});
			});
		}
	}


	function elementInViewport(el) {
		if (el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;

			if (el.offsetParent) {
				while (el.offsetParent) {
					el = el.offsetParent;
					top += el.offsetTop;
					left += el.offsetLeft;
				}
			}
			return (
				top >= window.pageYOffset &&
				left >= window.pageXOffset &&
				top + height <= window.pageYOffset + window.innerHeight &&
				left + width <= window.pageXOffset + window.innerWidth
			);
		}
	}

	function initLeftMenuCollapse() {
		/**
		 * Vertical layout menu scroll add
		 */
		if (document.documentElement.getAttribute("data-layout") == "vertical" || document.documentElement.getAttribute("data-layout") == "semibox") {
			document.getElementById("two-column-menu").innerHTML = "";
			if (document.querySelector(".navbar-menu")) {
				document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
			}
			document.getElementById("scrollbar").setAttribute("data-simplebar", "");
			document.getElementById("navbar-nav").setAttribute("data-simplebar", "");
			document.getElementById("scrollbar").classList.add("h-100");
		}

		/**
		 * Two-column layout menu scroll add
		 */
		if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
			document.getElementById("scrollbar").removeAttribute("data-simplebar");
			document.getElementById("scrollbar").classList.remove("h-100");
		}

		/**
		 * Horizontal layout menu
		 */
		if (document.documentElement.getAttribute("data-layout") == "horizontal") {
			updateHorizontalMenus();
		}
	}

	function isLoadBodyElement() {
		var verticalOverlay = document.getElementsByClassName("vertical-overlay");
		if (verticalOverlay) {
			Array.from(verticalOverlay).forEach(function (element) {
				element.addEventListener("click", function () {
					document.body.classList.remove("vertical-sidebar-enable");
					if (sessionStorage.getItem("data-layout") == "twocolumn")
						document.body.classList.add("twocolumn-panel");
					else
						document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
				});
			});
		}
	}

	function windowResizeHover() {
		feather.replace();
		var windowSize = document.documentElement.clientWidth;
		if (windowSize < 1025 && windowSize > 767) {
			document.body.classList.remove("twocolumn-panel");
			if (sessionStorage.getItem("data-layout") == "twocolumn") {
				document.documentElement.setAttribute("data-layout", "twocolumn");
				if (document.getElementById("customizer-layout03")) {
					document.getElementById("customizer-layout03").click();
				}
				twoColumnMenuGenerate();
				initTwoColumnActiveMenu();
				isCollapseMenu();
			}
			if (sessionStorage.getItem("data-layout") == "vertical") {
				document.documentElement.setAttribute("data-sidebar-size", "sm");
			}
			if (sessionStorage.getItem("data-layout") == "semibox") {
				document.documentElement.setAttribute("data-sidebar-size", "sm");
			}
			if (document.querySelector(".hamburger-icon")) {
				document.querySelector(".hamburger-icon").classList.add("open");
			}
		} else if (windowSize >= 1025) {
			document.body.classList.remove("twocolumn-panel");
			if (sessionStorage.getItem("data-layout") == "twocolumn") {
				document.documentElement.setAttribute("data-layout", "twocolumn");
				if (document.getElementById("customizer-layout03")) {
					document.getElementById("customizer-layout03").click();
				}
				twoColumnMenuGenerate();
				initTwoColumnActiveMenu();
				isCollapseMenu();
			}
			if (sessionStorage.getItem("data-layout") == "vertical") {
				document.documentElement.setAttribute(
					"data-sidebar-size",
					sessionStorage.getItem("data-sidebar-size")
				);
			}
			if (sessionStorage.getItem("data-layout") == "semibox") {
				document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
			}
			if (document.querySelector(".hamburger-icon")) {
				document.querySelector(".hamburger-icon").classList.remove("open");
			}
		} else if (windowSize <= 767) {
			document.body.classList.remove("vertical-sidebar-enable");
			document.body.classList.add("twocolumn-panel");
			if (sessionStorage.getItem("data-layout") == "twocolumn") {
				document.documentElement.setAttribute("data-layout", "vertical");
				hideShowLayoutOptions("vertical");
				isCollapseMenu();
			}
			if (sessionStorage.getItem("data-layout") != "horizontal") {
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
			if (document.querySelector(".hamburger-icon")) {
				document.querySelector(".hamburger-icon").classList.add("open");
			}
		}

		var isElement = document.querySelectorAll("#navbar-nav > li.nav-item");
		Array.from(isElement).forEach(function (item) {
			item.addEventListener("click", menuItem.bind(this), false);
			item.addEventListener("mouseover", menuItem.bind(this), false);
		});
	}

	function menuItem(e) {
		if (e.target && e.target.matches("a.nav-link span")) {
			if (elementInViewport(e.target.parentElement.nextElementSibling) == false) {
				e.target.parentElement.nextElementSibling.classList.add("dropdown-custom-right");
				e.target.parentElement.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
				var eleChild = e.target.parentElement.nextElementSibling;
				Array.from(eleChild.querySelectorAll(".menu-dropdown")).forEach(function (item) {
					item.classList.add("dropdown-custom-right");
				});
			} else if (elementInViewport(e.target.parentElement.nextElementSibling) == true) {
				if (window.innerWidth >= 1848) {
					var elements = document.getElementsByClassName("dropdown-custom-right");
					while (elements.length > 0) {
						elements[0].classList.remove("dropdown-custom-right");
					}
				}
			}
		}

		if (e.target && e.target.matches("a.nav-link")) {
			if (elementInViewport(e.target.nextElementSibling) == false) {
				e.target.nextElementSibling.classList.add("dropdown-custom-right");
				e.target.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
				var eleChild = e.target.nextElementSibling;
				Array.from(eleChild.querySelectorAll(".menu-dropdown")).forEach(function (item) {
					item.classList.add("dropdown-custom-right");
				});
			} else if (elementInViewport(e.target.nextElementSibling) == true) {
				if (window.innerWidth >= 1848) {
					var elements = document.getElementsByClassName("dropdown-custom-right");
					while (elements.length > 0) {
						elements[0].classList.remove("dropdown-custom-right");
					}
				}
			}
		}
	}

	function toggleHamburgerMenu() {
		var windowSize = document.documentElement.clientWidth;

		if (windowSize > 767)
			document.querySelector(".hamburger-icon").classList.toggle("open");

		//For collapse horizontal menu
		if (document.documentElement.getAttribute("data-layout") === "horizontal") {
			document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
		}

		//For collapse vertical menu
		if (document.documentElement.getAttribute("data-layout") === "vertical") {
			if (windowSize <= 1025 && windowSize > 767) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
					document.documentElement.setAttribute("data-sidebar-size", "") :
					document.documentElement.setAttribute("data-sidebar-size", "sm");
			} else if (windowSize > 1025) {
				document.body.classList.remove("vertical-sidebar-enable");
				document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
					document.documentElement.setAttribute("data-sidebar-size", "sm") :
					document.documentElement.setAttribute("data-sidebar-size", "lg");
			} else if (windowSize <= 767) {
				document.body.classList.add("vertical-sidebar-enable");
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
		}

		// semibox menu
		if (document.documentElement.getAttribute("data-layout") === "semibox") {
			if (windowSize > 767) {
				// (document.querySelector(".hamburger-icon").classList.contains("open")) ? document.documentElement.setAttribute('data-sidebar-visibility', "show"): '';
				if (document.documentElement.getAttribute('data-sidebar-visibility') == "show") {
					document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
						document.documentElement.setAttribute("data-sidebar-size", "sm") :
						document.documentElement.setAttribute("data-sidebar-size", "lg");
				} else {
					document.getElementById("sidebar-visibility-show").click();
					document.documentElement.setAttribute("data-sidebar-size", document.documentElement.getAttribute("data-sidebar-size"));
				}
			} else if (windowSize <= 767) {
				document.body.classList.add("vertical-sidebar-enable");
				document.documentElement.setAttribute("data-sidebar-size", "lg");
			}
		}

		//Two column menu
		if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
			document.body.classList.contains("twocolumn-panel") ?
				document.body.classList.remove("twocolumn-panel") :
				document.body.classList.add("twocolumn-panel");
		}
	}


	// page topbar class added
	function windowScroll() {
		var pageTopbar = document.getElementById("page-topbar");
		if (pageTopbar) {
			document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add("topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
		}
	}

	// Two-column menu activation
	function initTwoColumnActiveMenu() {
		feather.replace();
		// two column sidebar active js
		var currentPath = location.pathname == "/" ? "index.html" : location.pathname.substring(1);
		currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
		if (currentPath) {
			if (document.body.className == "twocolumn-panel") {
				document.getElementById("two-column-menu").querySelector('[href="' + currentPath + '"]').classList.add("active");
			}
			// navbar-nav
			var a = document.getElementById("navbar-nav").querySelector('[href="' + currentPath + '"]');
			if (a) {
				a.classList.add("active");
				var parentCollapseDiv = a.closest(".collapse.menu-dropdown");
				if (parentCollapseDiv && parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
					parentCollapseDiv.classList.add("show");
					parentCollapseDiv.parentElement.children[0].classList.add("active");
					parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show");
					if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
						var menuIdSub = parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown").getAttribute("id");
						parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show");
						parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.remove("twocolumn-item-show");
						if (document.getElementById("two-column-menu").querySelector('[href="#' + menuIdSub + '"]'))
							document.getElementById("two-column-menu").querySelector('[href="#' + menuIdSub + '"]').classList.add("active");
					}
					var menuId = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown").getAttribute("id");
					if (document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]'))
						document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]').classList.add("active");
				} else {
					a.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show");
					var menuId = parentCollapseDiv.getAttribute("id");
					if (document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]'))
						document.getElementById("two-column-menu").querySelector('[href="#' + menuId + '"]').classList.add("active");
				}
			} else {
				document.body.classList.add("twocolumn-panel");
			}
		}
	}

	// two-column sidebar active js
	function initActiveMenu() {
		var currentPath = location.pathname == "/" ? "index.html" : location.pathname.substring(1);
		currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
		if (currentPath) {
			// navbar-nav
			var a = document.getElementById("navbar-nav").querySelector('[href="' + currentPath + '"]');
			if (a) {
				a.classList.add("active");
				var parentCollapseDiv = a.closest(".collapse.menu-dropdown");
				if (parentCollapseDiv) {
					parentCollapseDiv.classList.add("show");
					parentCollapseDiv.parentElement.children[0].classList.add("active");
					parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
					if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
						parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
						if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
							parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");

						if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
							parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").classList.add("show");
							if (parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling) {

								parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
								if ((document.documentElement.getAttribute("data-layout") == "horizontal") && parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse")) {
									parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active")
								}
							}
						}
					}
				}
			}
		}
	}

	function elementInViewport(el) {
		if (el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;

			if (el.offsetParent) {
				while (el.offsetParent) {
					el = el.offsetParent;
					top += el.offsetTop;
					left += el.offsetLeft;
				}
			}
			return (
				top >= window.pageYOffset &&
				left >= window.pageXOffset &&
				top + height <= window.pageYOffset + window.innerHeight &&
				left + width <= window.pageXOffset + window.innerWidth
			);
		}
	}

	// notification cart dropdown
	function initTopbarComponents() {
		if (document.getElementsByClassName("dropdown-item-cart")) {
			var dropdownItemCart = document.querySelectorAll(".dropdown-item-cart").length;
			Array.from(document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn")).forEach(function (item) {
				item.addEventListener("click", function (e) {
					dropdownItemCart--;
					this.closest(".dropdown-item-cart").remove();
					Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
						e.innerHTML = dropdownItemCart;
					});
					updateCartPrice();
					if (document.getElementById("empty-cart")) {
						document.getElementById("empty-cart").style.display = dropdownItemCart == 0 ? "block" : "none";
					}
					if (document.getElementById("checkout-elem")) {
						document.getElementById("checkout-elem").style.display = dropdownItemCart == 0 ? "none" : "block";
					}
				});
			});
			Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
				e.innerHTML = dropdownItemCart;
			});
			if (document.getElementById("empty-cart")) {
				document.getElementById("empty-cart").style.display = "none";
			}
			if (document.getElementById("checkout-elem")) {
				document.getElementById("checkout-elem").style.display = "block";
			}
			function updateCartPrice() {
				var currencySign = "$";
				var subtotal = 0;
				Array.from(document.getElementsByClassName("cart-item-price")).forEach(function (e) {
					subtotal += parseFloat(e.innerHTML);
				});
				if (document.getElementById("cart-item-total")) {
					document.getElementById("cart-item-total").innerHTML = currencySign + subtotal.toFixed(2);
				}
			}
			updateCartPrice();
		}

		// notification messages
		if (document.getElementsByClassName("notification-check")) {
			function emptyNotification() {
				Array.from(document.querySelectorAll("#notificationItemsTabContent .tab-pane")).forEach(function (elem) {
					if (elem.querySelectorAll(".notification-item").length > 0) {
						if (elem.querySelector(".view-all")) {
							elem.querySelector(".view-all").style.display = "block";
						}
					} else {
						if (elem.querySelector(".view-all")) {
							elem.querySelector(".view-all").style.display = "none";
						}
						var emptyNotificationElem = elem.querySelector(".empty-notification-elem")
						if (!emptyNotificationElem) {
							elem.innerHTML += '<div class="empty-notification-elem">\
							<div class="w-25 w-sm-50 pt-3 mx-auto">\
								<img src="assets/images/svg/bell.svg" class="img-fluid" alt="user-pic">\
							</div>\
							<div class="text-center pb-5 mt-2">\
								<h6 class="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>\
							</div>\
						</div>'
						}
					}
				});
			}
			emptyNotification();


			Array.from(document.querySelectorAll(".notification-check input")).forEach(function (element) {
				element.addEventListener("change", function (el) {
					el.target.closest(".notification-item").classList.toggle("active");

					var checkedCount = document.querySelectorAll('.notification-check input:checked').length;

					if (el.target.closest(".notification-item").classList.contains("active")) {
						(checkedCount > 0) ? document.getElementById("notification-actions").style.display = 'block' : document.getElementById("notification-actions").style.display = 'none';
					} else {
						(checkedCount > 0) ? document.getElementById("notification-actions").style.display = 'block' : document.getElementById("notification-actions").style.display = 'none';
					}
					document.getElementById("select-content").innerHTML = checkedCount
				});

				var notificationDropdown = document.getElementById('notificationDropdown')
				notificationDropdown.addEventListener('hide.bs.dropdown', function (event) {
					element.checked = false;
					document.querySelectorAll('.notification-item').forEach(function (item) {
						item.classList.remove("active");
					})
					document.getElementById('notification-actions').style.display = '';
				});
			});

			var removeItem = document.getElementById('removeNotificationModal');
			removeItem.addEventListener('show.bs.modal', function (event) {
				document.getElementById("delete-notification").addEventListener("click", function () {
					Array.from(document.querySelectorAll(".notification-item")).forEach(function (element) {
						if (element.classList.contains("active")) {
							element.remove();
						}
					});
					emptyNotification();

					document.getElementById("NotificationModalbtn-close").click();
				})
			})
		}
	}

	function initComponents() {
		// tooltip
		var tooltipTriggerList = [].slice.call(
			document.querySelectorAll('[data-bs-toggle="tooltip"]')
		);
		tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});

		// popover
		var popoverTriggerList = [].slice.call(
			document.querySelectorAll('[data-bs-toggle="popover"]')
		);
		popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl);
		});
	}

	// Counter Number
	function counter() {
		var counter = document.querySelectorAll(".counter-value");
		var speed = 250; // The lower the slower
		counter &&
			Array.from(counter).forEach(function (counter_value) {
				function updateCount() {
					var target = +counter_value.getAttribute("data-target");
					var count = +counter_value.innerText;
					var inc = target / speed;
					if (inc < 1) {
						inc = 1;
					}
					// Check if target is reached
					if (count < target) {
						// Add inc to count and output in counter_value
						counter_value.innerText = (count + inc).toFixed(0);
						// Call function every ms
						setTimeout(updateCount, 1);
					} else {
						counter_value.innerText = numberWithCommas(target);
					}
					numberWithCommas(counter_value.innerText);
				}
				updateCount();
			});

		function numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	function updateHorizontalMenus() {
		document.getElementById("two-column-menu").innerHTML = "";
		if (document.querySelector(".navbar-menu")) {
			document.querySelector(".navbar-menu").innerHTML = navbarMenuHTML;
		}
		document.getElementById("scrollbar").removeAttribute("data-simplebar");
		document.getElementById("navbar-nav").removeAttribute("data-simplebar");
		document.getElementById("scrollbar").classList.remove("h-100");

		var splitMenu = horizontalMenuSplit;
		var extraMenuName = "More";
		var menuData = document.querySelectorAll("ul.navbar-nav > li.nav-item");
		var newMenus = "";
		var splitItem = "";

		Array.from(menuData).forEach(function (item, index) {
			if (index + 1 === splitMenu) {
				splitItem = item;
			}
			if (index + 1 > splitMenu) {
				newMenus += item.outerHTML;
				item.remove();
			}

			if (index + 1 === menuData.length) {
				if (splitItem.insertAdjacentHTML) {
					splitItem.insertAdjacentHTML(
						"afterend",
						'<li class="nav-item">\
						<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\
							<i class="ri-briefcase-2-line"></i> <span data-key="t-more">' + extraMenuName + '</span>\
						</a>\
						<div class="collapse menu-dropdown" id="sidebarMore"><ul class="nav nav-sm flex-column">' + newMenus + "</ul></div>\
					</li>");
				}
			}
		});
	}

}