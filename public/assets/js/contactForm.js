$('#contactForm').submit(function(event){
    event.preventDefault();

    let first_name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let phone = $('#phone').val();
    let email = $('#email').val();
    let company_name = $('#company_name').val();
    let company_address = $('#company_address').val();
    let service_industry = $('#service_industry').val();
    let time_to_call = $('#time_to_call').val();
    let lang = localStorage.getItem('language');
    let base_url = window.location.origin
    var request = $.ajax({
        url: base_url + "/auth/submitContactForm",
        type: "POST",
        data: {
          firstName: first_name,
          lastName: last_name,
          phone: phone,
          email: email,
          companyName: company_name,
          companyAddress: company_address,
          serviceIndustry: service_industry,
          timeToCall: time_to_call,
          lang: lang
        }
      });
      
      request.done(function(msg) {
        if(msg.status == 'Success'){
            localStorage.setItem("Name", first_name)
            window.location.href = "/free-consultation.html";     
        }
        
      });
      
      request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " );
      });
    
});