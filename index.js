// need to get data from API and display it
'use strict';

const youtubeEndPoint = "https://www.googleapis.com/youtube/v3/search";

const query = {
    part: 'snippet',
    key: 'AIzaSyD3lm6RFHe9WJKUWD0dsGCF9PcJqJauYjc',
    q: '',
    maxResults: 5,
    pageToken: '',
  }

let getData = {};

// get Object Data from API
function getDataFromApi(searchTerm,callback){

  query.q = searchTerm;

  $.getJSON(youtubeEndPoint, query, callback);
}


// use map method to identify each items
function mapApiArray(JSON_Obj){

  const results = JSON_Obj.items.map(function(item){
    return renderResult(item);
    console.log( renderResult(item) );
  });

  getData = JSON_Obj;
  updateTotalResult(getData);
  console.log(getData);
  // console.log( typeof( renderResult(getData.items[0])) );
  $('.js-result').prop('hidden',false).html( results.join('') );


}

// update total result
function updateTotalResult(Obj) {
  $('.result-number').html(`Total Results: ${Obj.pageInfo.totalResults}`);
}

// display data as HTML
function renderResult(item){
  // console.log(data);
  return `<div class="snippet-block">
            <a href="https://www.youtube.com/watch?v=7TF00hJI78Y${item.id.videoId}" target="_blank"><img src="${item.snippet.thumbnails.medium.url}" class="thumbnail" alt="${item.snippet.title}"></a>
            <div class="textInfo">
              <h1>${item.snippet.title}</h1>
              <p>Published at: ${item.snippet.publishedAt}</p>
              <p>The channelID is: ${item.snippet.channelId}</p>
              <p>${item.snippet.description}</p>
            </div>
          </div>`;
}


// when submit get input value
function getSubmitValue() {
  $('button[type=submit]').on('click',function(event){
    event.preventDefault();
    const Term = $('.search-term').val();
    console.log(`submit success, the Term is ${Term}`);
    $('.search-term').val('');
    getData = getDataFromApi(Term, mapApiArray);
  })
}

// Previous and Next to do here!!
function previousPage(){
    query.pageToken = getData.prevPageToken;

    mapApiArray( getDataFromApi(youtubeEndPoint, query,mapApiArray) );
}

function clickPrevious(){
   $('.previous').on('click',function(event){
     event.preventDefault();

     previousPage(data);
   })
}

function nextPage(data){
  $('.next').on('click',function(event){
    event.preventDefault();
    query.pageToken = getData.nextPageToken;
    console.log( `query.pageToken is ${query.pageToken}`);
    getDataFromApi(youtubeEndPoint, query, mapApiArray);
  })
}

// click to watch video to do here!!
function clickToWatch(){
  $('.thumbnail').on('click',function(){
    
  })
}

function loadAllFunctions(){
  getSubmitValue();
  previousPage();
  nextPage();
}

$(getSubmitValue);
