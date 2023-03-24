//side navigation bar open and close function
function openNav() {
    document.getElementById("mySidenav").style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
  }
  
  //side navigation bar open and close function
  function openMembershipNav(){
    document.getElementById("membershipNav").style.display = "block";
  }
        
  function closeMembershipNav() {
    document.getElementById("membershipNav").style.display = "none";
  }
  
  //refine search panel open and close function
  function openSearch(){
    document.getElementById("overlay").style.display = "block";
  }
  
  function closeSearch(){
    document.getElementById("overlay").style.display = "none";
  }
  
  //collapsible elements expand view function
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }         
    });
  }
  
  var options = document.getElementsByClassName("option-title");
  for (i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function() {
      this.classList.toggle("active-option");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }  
    });
  }
  
  //redirect to website
  function open_url(website) {
    //location.href = website;
    window.open(website);
  }
  
  //tab change colour
  function changeColor(id){
    var tabs = document.getElementsByClassName('tab')
    for(var i = 0; i < tabs.length ; i++){
      tabs[i].style.backgroundColor = (tabs[i].id == id) ? "#febc18" : "#fff";
      tabs[i].style.color = (tabs[i].id == id) ? "#fff" : "#000";
    }
  }
  //call when user changed the selected hotel
  function changeHotel(value) {
      var url = 'Page2.html?hid=';
      var m_hotel = document.getElementById("mobile-multiple-checkboxes");
      var selectedHotel = '';
      
      for(var i = 0; i < value.length; i++){
          for(var j = 0; j < m_hotel.options.length; j++){
            if(m_hotel.options[j].value === value[i]){
          selectedHotel = m_hotel.options[j].id;
          url = url + selectedHotel + ',';	
            }
          }
      }
          
      var cin = $('#m-dateRange').data('daterangepicker').startDate.format('DD MMM YYYY').toString();
      var cout = $('#m-dateRange').data('daterangepicker').endDate.format('DD MMM YYYY').toString();
      
      url = url + '&cin=' + cin + '&cout=' + cout;
      
      var m_adult = document.getElementById("m-adultNum");
      for(var i = 0; i < m_adult.options.length; i++){
          if(m_adult.options[i].selected){
              url = url + '&adult=' + m_adult.options[i].id;
          }  
      }
      
      var m_child = document.getElementById("m-childNum");
      for(var i = 0; i < m_child.options.length; i++){
        if(m_child.options[i].selected){
              url = url + '&child=' + m_child.options[i].id;
            }  
      }
      
      var m_room = document.getElementById("m-roomNum");
      for(var i = 0; i < m_room.options.length; i++){
          if(m_room.options[i].selected){
              url = url + '&room=' + m_room.options[i].id;
            }
      }
      
      var m_promo = document.getElementById("m-search").value;
      if(m_promo.length > 0){
          url = url + '&promo=' + m_promo;
      }
      window.open(url, "_self");
  }
  
  var counter = 0;
  //room qty plus and minus function
  var plus = document.getElementsByClassName("input-right-btn");
  var plusBtn = document.getElementsByClassName("plus");
  
  for(var i = 0; i < plusBtn.length; i++){
      plusBtn[i].addEventListener("click", function() {
          var row = $(".row").has(this)[0];
      
          //get the "SELECT ROOM" and "RESERVE NOW" button
          var row_parent = $(".collapse").has(row)[0];
          var selectBtn = row_parent.parentElement.getElementsByClassName("selectBtn")[0];
          var reserveBtn = row_parent.parentElement.getElementsByClassName("reserveBtn")[0];
      
          //get the qty of room selected
          var qty = row.getElementsByClassName("input-number")[0];
          var room_mark = row.getElementsByClassName("activeRoom")[0];
      
          if(qty.value == 0){
              //mark the selected room once the qty > 1
              qty.value = parseInt(qty.value) + 1;
              ++counter;
              checkCount();
              row.className = "row NO_MARGIN selectedHotelRoom";
              room_mark.style.display = "block";
              
              //to HIDE "SELECT ROOM" and SHOW "RESERVE NOW"
              selectBtn.style.display = "none";
              reserveBtn.style.display = "block";
          }
          else{
              qty.value = parseInt(qty.value) + 1;
              ++counter;
              checkCount();
          }
      }
    );
  }
  
  var minusBtn = document.getElementsByClassName("minus");
  for(var i = 0; i < minusBtn.length; i++){
    minusBtn[i].addEventListener("click", function() {
      var row = $(".row").has(this)[0];
      
      //get the "SELECT ROOM" and "RESERVE NOW" button
      var row_parent = $(".collapse").has(row)[0];
      var selectBtn = row_parent.parentElement.getElementsByClassName("selectBtn")[0];
      var reserveBtn = row_parent.parentElement.getElementsByClassName("reserveBtn")[0];
      
      //get the qty of room selected
      var qty = row.getElementsByClassName("input-number")[0];
      var room_mark = row.getElementsByClassName("activeRoom")[0];
      
      //unmark the selected room once the qty <= 0
      if(qty.value <= 0){
        qty.value = 0;
        row.className = "row NO_MARGIN";
        room_mark.style.display = "none";
      }
      else{
        qty.value = parseInt(qty.value) - 1;
        --counter;
        checkCount();
        if(qty.value <= 0){
          qty.value = 0;
          row.className = "row NO_MARGIN";
          room_mark.style.display = "none";
        }
      }
      
      //to SHOW "SELECT ROOM" and HIDE "RESERVE NOW" when no more room was selected
      var selectBorder = document.getElementsByClassName("selectedHotelRoom");
      if(selectBorder.length <= 0){
        selectBtn.style.display = "block";
        reserveBtn.style.display = "none";
      }
    });
  }
  
  //room number limitation function (according to room num passed from previous page)
  function checkCount(){
  var urlParam = getAllUrlParams(window.location.href);
  var max_room = urlParam.room;
      if (counter >= parseInt(max_room)) {
          for(var i = 0; i < plus.length; i++){
              plusBtn[i].disabled = "true";
              plus[i].disabled = "true";
          }
      }
      
      if (counter < parseInt(max_room)) {
          for(var i = 0; i < plusBtn.length; i++){
              plusBtn[i].removeAttribute("disabled");
              plus[i].removeAttribute("disabled");
          }
      }
      
  }
  
  //query string
  function selectRoom(e){
      var url = 'Page3.html?hid=';
      var hotel = document.getElementById("multiple-checkboxes");
      var m_hotel = document.getElementById("mobile-multiple-checkboxes");
      var selectedHotel = '';
  
      for(var i = 0; i < hotel.options.length; i++){
          if(hotel.options[i].selected && m_hotel.options[i].selected){
              selectedHotel = hotel.options[i].id;
              url = url + selectedHotel + ',';	
            }
      }
  
      var cin = $('#dateRange').data('daterangepicker').startDate.format('DD MMM YYYY').toString();
      var cout = $('#dateRange').data('daterangepicker').endDate.format('DD MMM YYYY').toString();
      
      url = url + '&cin=' + cin + '&cout=' + cout;
      
      var adult = document.getElementById("adultNum");
      for(var i = 0; i < adult.options.length; i++){
          if(adult.options[i].selected){
              url = url + '&adult=' + adult.options[i].id;
            }
      }
      
      var child = document.getElementById("childNum");
      for(var i = 0; i < child.options.length; i++){
          if(child.options[i].selected){
              url = url + '&child=' + child.options[i].id;
            }
      }
      
      var room = document.getElementById("roomNum");
      for(var i = 0; i < room.options.length; i++){
          if(room.options[i].selected){
              url = url + '&room=' + room.options[i].id;
            }
      }
      
      var promo = document.getElementById("search").value;
      if(promo.length > 0){
          url = url + '&promo=' + promo;
      }
    
    //var roomQty = 
    window.open(url);
  
  }
  
  //receive conditions
  $(document).ready(function() {
      var urlParam = getAllUrlParams(window.location.href);
  
      var selectedHotel = urlParam.hid.split(",");
      var hotel = document.getElementsByClassName("mySelect");
    
      for(var a=0; a < hotel.length; a++){
          for(var i = 0; i < hotel[a].options.length; i++){
            for(var j = 0; j < selectedHotel.length; j++){
              if(hotel[a].options[i].id == selectedHotel[j].toString()){
                  hotel[a].options[i].selected = true;
                }
            }
          }
      }
      
      var adult = urlParam.adult;
      var adultNum = document.getElementsByClassName("adultNum");
    
      for(var a=0; a < adultNum.length; a++){
          for(var i = 0; i < adultNum[a].options.length; i++){
              if(adultNum[a].options[i].id == adult.toString()){
                  adultNum[a].options[i].selected = true;
              }
          }
      }
      
      var child = urlParam.child;
      var childNum = document.getElementsByClassName("childNum");
    
      for(var a=0; a < childNum.length; a++){
          for(var i = 0; i < childNum[a].options.length; i++){
              if(childNum[a].options[i].id == child.toString()){
                  childNum[a].options[i].selected = true;
              }
          }
      }
      
      var room = urlParam.room;
      var roomNum = document.getElementsByClassName("roomNum");
    
      for(var a=0; a < roomNum.length; a++){
          for(var i = 0; i < roomNum[a].options.length; i++){
              if(roomNum[a].options[i].id == room.toString()){
                  roomNum[a].options[i].selected = true;
              }
          }
      }
        
      var promo = urlParam.promo;
      var search = document.getElementsByClassName("searchBox");
      for(var a=0; a < search.length; a++){
          if(promo){
              search[a].value = promo;
          }
      }
  });
  
  $(document).ready(function() {  
    //Hotel Dropdown Multiselect function for Web and Mobile
     $('.mySelect').multiselect({
      includeSelectAllOption: true,
      nonSelectedText: 'All Hotels & Resorts',
      allSelectedText: 'ALL',
      selectAllText: 'ALL',
      numberDisplayed: 2,
     });
  });
  
  //date range picker jQuery function
  $(function() {
    var urlParam = getAllUrlParams(window.location.href);
    var start = new Date(urlParam.cin);
    var end = new Date(urlParam.cout);
    $('input[id="dateRange"]').daterangepicker({
      opens: 'right',
      startDate: start,
      endDate: end,
      locale: {
        format: 'DD MMM YYYY'
      }
    });
    
    $('input[id="m-dateRange"]').daterangepicker({
      opens: 'right',
      startDate: start,
      endDate: end,
      locale: {
        format: 'DD MMM YYYY'
      }
    }); 
  });
  
  //get query string function
  function getAllUrlParams(url) {
  
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      queryString = queryString.split('#')[0];
  
      // split query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
    return obj;
  }