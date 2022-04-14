// modal


$("#logoutBtn").click(function(event){
  localStorage.removeItem("token")
  let base_url = window.location.origin
  window.location.href = base_url + "/admin/login.html";   
});

$("#loginBtn").click(function(event){
  // cancels the form submission
  event.preventDefault();
  let email = $('#email').val();
  let password = $('#password').val();
  let base_url = window.location.origin
  var request = $.ajax({
    url: base_url + "/auth/login",
    type: "POST",
    data: {
      email: email,
      password: password
    }
  });
  
  request.done(function(msg) {
    if(msg.status == 'Success'){
      localStorage.setItem("token", msg.data.token)
      window.location.href = "/admin";      
    }
    
  });
  
  request.fail(function(jqXHR, textStatus) {
    // alert( "Request failed: " + textStatus );
    $("#invalidError").show();
  });
  
});
// tabel

$(document).ready(function() {
  let base_url = window.location.origin
  let table = $('#example').DataTable({
    "ajax": base_url + "/auth/getFormData",
    "columns": [
        { "data": "created_at" },
        { "data": "firstName" },
        { "data": "lastName" },
        { "data": "lang" },
        { "data": "phone" },
        { "data": "email" },
        { "data": "companyName" },
        { "data": "companyAddress" },
        { "data": "serviceIndustry" },
        { "data": "timeToCall" },
    ]
  } );  
  table.on( 'draw', function () {
    $(".sorting_asc").click();
 });
} );

// daterange

$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    let base_url = window.location.origin
    let startDate = start.format('YYYY-MM-DD');
    let endDate = end.format('YYYY-MM-DD');
  
  $('#example').DataTable().destroy();
   
  let table = $('#example').DataTable({
    "ajax": base_url + "/auth/getFormData?startDate="+startDate+"&endDate="+endDate,
    "columns": [
        { "data": "created_at" },
        { "data": "firstName" },
        { "data": "lastName" },
        { "data": "lang" },
        { "data": "phone" },
        { "data": "email" },
        { "data": "companyName" },
        { "data": "companyAddress" },
        { "data": "serviceIndustry" },
        { "data": "timeToCall" },
    ]
  } );  
  table.on( 'draw', function () {
    $(".sorting_asc").click();
 });
  });
});