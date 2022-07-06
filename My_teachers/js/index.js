




main()



function main() {
    //gọi api lấy ds sp
    apiGetUsers()
        .then((result) => {
            var users = result.data;
            console.log(users)

            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                user[i] = new User(
                    user.id,
                    user.username,
                    user.name,
                    user.password,
                    user.email,
                    user.type,
                    user.language,
                    user.description,
                    user.image
                )
            }
            display(users)
        })
        .catch((error) => {
            console.log(error)
        })
}

function display(users) {
    var html = "";
    for (var i = 0; i < users.length; i++) {
        var teacher = users[i];
        if (teacher.loaiND === "GV") {
            html += `
        <div class="teachers-col col-xl-3 col-sm-6 col-12">
              <div class="teachers-content">
                <div class="teachers-img">
                  <img style="width: 100%" src="${users[i].hinhAnh}" alt="" />
                </div>
                <div class="teachers-details">
                  <h4>
                    <span class="superHeadLine"> ${users[i].ngonNgu} </span>
                    <span class="headLine"> ${users[i].hoTen} </span>
                  </h4>
                  <p class="teachers-description">
                  ${users[i].moTa}
                  </p>
                </div>
              </div>
            </div>
        `
        }
    }
    document.getElementById("row").innerHTML = html

}






// // document.("row").innerHTML = `
// <div class="teachers-col col-xl-3 col-sm-6 col-12">
//               <div class="teachers-content">
//                 <div class="teachers-img">
//                   <img style="width: 100%" src="./img/teacher_5.jpg" alt="" />
//                 </div>
//                 <div class="teachers-details">
//                   <h4>
//                     <span class="superHeadLine"> RUSSIAN </span>
//                     <span class="headLine"> John Doe </span>
//                   </h4>
//                   <p class="teachers-description">
//                     A new normal that has evolved from generation X.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             `