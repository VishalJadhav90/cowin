Notification.requestPermission().then(function(result) {
    console.log(result);
});

setInterval(()=>{

    var date = new Date()
    var month = date.getMonth()+1
    if (month < 10) {
        month = "0" + month
    }
    var dd = date.getDate()+1
    if (dd < 10) {
        dd = "0" + dd
    }
    var dateString = dd + "-" + month + "-" + date.getFullYear()
    api = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=411027&date=${dateString}`
    //api = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=411027&date=11-05-2021"
    console.log(api);
    fetch(api).then(res => {
        res.json().then(res=>{
            //console.log("actual api response is ....", res);
            for ( let center of res.centers ) {
                if (center.name.indexOf('18-44') != -1) {
                    console.log(center.name);
                    for (let session of center.sessions) {
                        console.log("available_capacity", session.available_capacity)
                        if (session.available_capacity) {
                            var song = document.getElementById("song");
                            song.play();
                            alert("found...");
                            var notification = new Notification('Slot Found', {
                                body: 'Hey there! Slot Found!',
                                });
                            notification.onclick = function() {
                                window.open('https://www.cowin.gov.in/home');
                            };
                            break;
                        }
                    }
                }
            }
        })
    })

}, 5000);
