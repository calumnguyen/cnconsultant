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
      {
        'data': 'created_at',
        'render': function (index, row, data) {
          var date = data['created_at'];
          const event = Date.parse(date);
          return moment(event).format('dddd, MMMM Do YYYY, h:mm:ss a');;
        }
      },
        { "data": "firstName" },
        { "data": "lastName" },
        { "data": "lang" },
        { "data": "phone" },
        { "data": "email" },
        { "data": "companyName" },
        { "data": "companyAddress" },
        { "data": "serviceIndustry" },
        { "data": "timeToCall" },
        {
          'data': '_id',
          'render': function (index, row, data) {
            var Id = data['_id'];
            return `<button class='btn btn-danger' onclick='deleteForm("${Id}")'>Delete</button>`
          }
        }
    ]
  } );  

  table.on( 'draw', function () {
    $(".sorting_asc").click();
 });
} );

function deleteForm(formId){

  if (confirm('Are you sure ?')) {
  

    let base_url = window.location.origin
    var request = $.ajax({
      url: base_url + "/auth/deleteForm?formId="+formId,
      type: "GET"
    });
    request.done(function(msg) {
      if(msg.status == 'Success'){
        $('#example').DataTable().destroy();
        let startDate = localStorage.getItem('startDate');
        let endDate = localStorage.getItem('endDate');
        if(startDate && endDate){
          var addUrl = '?startDate='+startDate+'&endDate='+endDate;
        }else{
          var addUrl = '';
        }
        
        let table = $('#example').DataTable({
          "ajax": base_url + "/auth/getFormData"+addUrl,
          "columns": [
            {
              'data': 'created_at',
              'render': function (index, row, data) {
                var date = data['created_at'];
                const event = Date.parse(date);
                return moment(event).format('dddd, MMMM Do YYYY, h:mm:ss a');;
              }
            },
              { "data": "firstName" },
              { "data": "lastName" },
              { "data": "lang" },
              { "data": "phone" },
              { "data": "email" },
              { "data": "companyName" },
              { "data": "companyAddress" },
              { "data": "serviceIndustry" },
              { "data": "timeToCall" },
              {
                'data': '_id',
                'render': function (index, row, data) {
                  var Id = data['_id'];
                  return `<button class='btn btn-danger' onclick='deleteForm("${Id}")'>Delete</button>`
                }
              }
          ]
        } );  
      
        table.on( 'draw', function () {
          $(".sorting_asc").click();
      });     
      }
    });
       
  }else{
    console.log('cancel')
  }

}

// daterange

$(function() {
  $('input[name="daterange"]').daterangepicker({
    opens: 'left'
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    let base_url = window.location.origin
    let startDate = start.format('YYYY-MM-DD');
    let endDate = end.format('YYYY-MM-DD');
    localStorage.setItem('startDate',startDate);
    localStorage.setItem('endDate',endDate);
  
  $('#example').DataTable().destroy();
   
  let table = $('#example').DataTable({
    "ajax": base_url + "/auth/getFormData?startDate="+startDate+"&endDate="+endDate,
    "columns": [
      {
        'data': 'created_at',
        'render': function (index, row, data) {
          var date = data['created_at'];
          const event = Date.parse(date);
          return moment(event).format('dddd, MMMM Do YYYY, h:mm:ss a');;
        }
      },
      { "data": "firstName" },
      { "data": "lastName" },
      { "data": "lang" },
      { "data": "phone" },
      { "data": "email" },
      { "data": "companyName" },
      { "data": "companyAddress" },
      { "data": "serviceIndustry" },
      { "data": "timeToCall" },
      {
        'data': '_id',
        'render': function (index, row, data) {
          var Id = data['_id'];
          return `<button class='btn btn-danger' onclick='deleteForm("${Id}")'>Delete</button>`
        }
      }
    ]
  } );  
  table.on( 'draw', function () {
    $(".sorting_asc").click();
 });
  });
});