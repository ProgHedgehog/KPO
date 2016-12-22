$(function(){
  fillGroups();
})

function concatLesson(lesson){
  let teachers = lesson[1].reduce((acc, s) => acc + s + " ", "");
  let places = lesson[2].reduce((acc, s) => acc + s + " ", "");
  return `${lesson[0]} ${teachers} ${places}`;
}

function load(group){
  eWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  $.get("http://localhost:3000/api/v1/schedule", {group: group}, function(schedule){
    let _week = 1;
    schedule.forEach(week => {
      $(`#week${_week}`).empty();
      $(`#week${_week}`).append(`<h1>${_week} неделя</h1><br />`);
      let _day = 0;
      week.forEach(day => {
        $(`#week${_week}`).append(`<br /><h1>${eWeek[_day]}</h1>`);
        let _lesson = 1;
        day.forEach(lesson => {
          $(`#week${_week}`).append(`<h3>${_lesson} ${concatLesson(lesson)}</h3>`);
          _lesson++;
        })
        _day++;
      })
    _week++;
    })
  })
}

function fillGroups(){
  let groups = [{ id: 1, name: "ПИбд-41" }, { id: 2, name: "ИСЭбд-41" }];
  groups.forEach(group => {
    $('#main-tab').append(`<li><a href="#" class="groups" id="${group.id}">${group.name}</a></li>`);
    $(`#${group.id}`).on('click', function(e){
      let id = e.target.id;
      let group = groups.filter(group => group.id == id)[0];
      load(group.name);
    })
  })
}
