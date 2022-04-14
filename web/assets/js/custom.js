// language data

$(document).ready(function () {
  getLanguage();
});

var language;
function getLanguage() {
  //   alert("hii");
  localStorage.getItem("language") == null ? setLanguage("en") : false;
  $.ajax({
    url: "/assets/language/" + localStorage.getItem("language") + ".json",
    dataType: "json",
    async: false,
    success: function (lang) {
      language = lang;
      $(".header .que .quote").text(language.quote);
      $(".consultation-section h1").text(language.personal_project);
      $(".consultation-section p .yours").text(language.business_deserve);
      $(".consultation-section p .deserve").text(language.business_deserve_sub);
      $(".consultation-section a span").text(language.quote_consultation_call);
      $(".consultation-section a .for-free").text(language.for_free);
      $(".premium-img").attr('src', language.premium_img);
      $(".premium-services h1").text(language.premium_services_title);
      $(".premium-services p .plain-text").text(language.premium_services_subheading);
      $(".premium-services p .clr").text(language.premium_services_subheading_clr);
      $(".service-content .para1").text(language.premium_services_service1);
      $(".service-content .para2").text(language.premium_services_service2);
      $(".service-content .para3").text(language.premium_services_service3);
      $(".guaranted h1").text(language.premium_services_satisfaction);
      $(".schedule-consult p").text(language.premium_services_fotterheading);
      $(".schedule-consult a span").text(language.schedule_consultation);
      $(".schedule-consult a .for-free").text(language.for_free);
      $(".services-offered h1").text(language.services_offered_title);
      $(".services-offered .points .para1").text(language.services_offered_para1);
      $(".services-offered .points .para2").text(language.services_offered_para2);
      $(".services-offered .points .para3").text(language.services_offered_para3);
      $(".services-offered .points .para4").text(language.services_offered_para4);
      $(".services-offered .points .para5").text(language.services_offered_para5);
      $(".services-offered .points .para6").text(language.services_offered_para6);
      $(".services-offered p").text(language.services_offered_fotterheading);
      $(".services-offered a span").text(language.schedule_consultation);
      $(".services-offered a .for-free").text(language.for_free);
      $(".guarantees h1").text(language.our_guarantees_title);
      $(".guarantee .heading-1").text(language.our_guarantees_card1_title);
      $(".guarantee .para-1").text(language.our_guarantees_card1_para);
      $(".guarantee .heading-2").text(language.our_guarantees_card2_title);
      $(".guarantee .para-2").text(language.our_guarantees_card2_para);
      $(".guarantee .heading-3").text(language.our_guarantees_card3_title);
      $(".guarantee .para-3").text(language.our_guarantees_card3_para);
      $(".guarantee .heading-4").text(language.our_guarantees_card4_title);
      $(".guarantee .para-4").text(language.our_guarantees_card4_para);
      $(".guarantees .trusted-partner").text(language.our_guarantees_fotterheading);
      $(".guarantees a span").text(language.schedule_consultation);
      $(".guarantees a .for-free").text(language.for_free);
      $(".contact-section h1").text(language.extraordinary_service);
      $(".contact-form .heading h2").text(language.personal_information);
      $(".contact-form .heading p").text(language.required);
      $(".form-detail .last_name").text(language.last_name);
      $(".form-detail .first_name").text(language.first_name);
      $(".form-detail .phone").text(language.phone);
      $(".form-detail .email").text(language.email);
      $(".contact-form .heading2 h2").text(language.company_information);
      $(".contact-form .heading2 p").text(language.optional);
      $(".form-detail .company-name").text(language.company_name);
      $(".form-detail .company-address").text(language.company_address);
      $(".form-detail .service-industry").text(language.service_industry);
      $(".contact-form .heading3 h2").text(language.best_call_time);
      $(".contact-form .heading3 p").text(language.optional);
      $(".consult-title").text(language.like_free_consultation);
      $(".consultant-desc .heading").text(language.dear_calum);
      $(".consultant-desc .description").text(language.calum_para);
      $(".homepage").text(language.back_to_homepage);
    },
  });
}

// language change buttons

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  getLanguage();
}
var btn = $('#button1,#button2').click(function() { // bind click handler to both button
  $(this).hide(); // hide the clicked button
  btn.not(this).show(); // show the another button which is hidden
});


// aos animation

AOS.init();

function slideSlider(){
  $("#slider-scroller").css({"left":"0%","transition":"all 0s linear"});
  $("#slider-scroller").css({"left": String(parseInt($("#slider-scroller").css("left")) - 500) + "px","transition":"all 5s linear"});
  setTimeout(function(){moveSliderItem()}, 2635);
}

function moveSliderItem(){
  $("#slider-scroller div").first().detach().appendTo($("#slider-scroller"));
  slideSlider();
}

slideSlider();