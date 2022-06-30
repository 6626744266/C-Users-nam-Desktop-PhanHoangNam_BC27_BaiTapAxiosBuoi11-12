var userList = []
main()


function main() {
    apiGetUser()
        .then((result) => {
            var users = result.data
            for (var i = 0; i < users.length; i++) {
                var user = users[i]
                users[i] = new User(
                    user.id,
                    user.taiKhoan,
                    user.hoTen,
                    user.matKhau,
                    user.email,
                    user.loaiND,
                    user.ngonNgu,
                    user.moTa,
                    user.hinhAnh,
                )
                userList.push(users[i])
            }


            display(users)
        })
        .catch((error) => {
            console.log(error);
        })
}
console.log(userList)
function display(users) {
    var html = ``;
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        html += `
        <tr>
            <td>${i + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#myModal"
                data-type="update"
                data-id="${user.id}"
                
            >
                Cập Nhật
            </button>
            <button
                class="btn btn-danger"
                data-type="delete"
                data-id="${user.id}"
                onclick=deleteUser(${user.id})
            >
                Xoá
            </button>
          </td>
        </tr>`
    }
    document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

function resetForm() {
    document.getElementById("TaiKhoan").value = ""
    document.getElementById("HoTen").value = ""
    document.getElementById("MatKhau").value = ""
    document.getElementById("Email").value = ""
    document.getElementById("HinhAnh").value = ""
    document.getElementById("loaiNguoiDung").value = "default"
    document.getElementById("loaiNgonNgu").value = "default"
    document.getElementById("MoTa").value = ""
    var elems = document.getElementsByClassName('sp-thongbao');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'none';
    }
}


function addUser() {

    var taiKhoan = document.getElementById("TaiKhoan").value;
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;
    var user = new User(null, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh)
    validationAdd(user)
    if (validationAdd(user) !== false) {
        apiAddUser(user)
            .then((result) => {
                main()
                console.log(user)

            })
            .catch((error) => {
                consol.log(error)
            })
        resetForm()
        $("#myModal").modal("hide");

    }


}

document.querySelector(".modal-footer").addEventListener("click", handleClick)
function handleClick(event) {
    var btnType = event.target.getAttribute("btn-type")
    switch (btnType) {
        case "add":
            addUser()
            break;
        case "update":
            updateUser()
            break;

    }
}

document.getElementById("btnThemNguoiDung").addEventListener("click", () => {
    resetForm()

    document.getElementById("btnThemND").disabled = false;
    document.getElementById("btnCapNhat").disabled = true;

})






function deleteUser(userId) {
    apiDeleteUser(userId)
        .then(() => {
            // Xoá thành công
            main();
        })
        .catch((error) => {
            console.log(error);
        });
}

function showUpdateModal(userId) {
    resetForm();
    document.getElementById("btnThemND").disabled = true;
    document.getElementById("btnCapNhat").disabled = false;

    apiGetUserDetail(userId)
        .then((result) => {
            var user = result.data;
            document.getElementById("MaND").value = user.id;
            document.getElementById("TaiKhoan").value = user.taiKhoan;
            document.getElementById("HoTen").value = user.hoTen;
            document.getElementById("MatKhau").value = user.matKhau;
            document.getElementById("Email").value = user.email
            document.getElementById("HinhAnh").value = user.hinhAnh
            document.getElementById("loaiNguoiDung").value = user.loaiND
            document.getElementById("loaiNgonNgu").value = user.ngonNgu
            document.getElementById("MoTa").value = user.moTa
        })
        .catch(function (error) {
            console.log(error);
        });

}

function updateUser() {

    var id = document.getElementById("MaND").value
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;

    var user = new User(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh)
    validationUpdate(user)
    console.log(validationUpdate(user))
    if (validationUpdate(user) !== false) {
        apiUpdateUser(user)
            .then((result) => {
                main()

            })
            .catch((error) => {
                console.log(error);
            });
        resetForm();
        $("#myModal").modal("hide");

    }
}




document
    .getElementById("tblDanhSachNguoiDung")
    .addEventListener("click", handleUserAction);

function handleUserAction(event) {
    var type = event.target.getAttribute("data-type");
    var id = event.target.getAttribute("data-id");

    switch (type) {
        case "delete":
            deleteUser(id);
            break;
        case "update": {
            showUpdateModal(id);
            break;
        }

        default:
            break;
    }
}



//  Validation
function checkDuplicate(TaiKhoan) {

    console.log(userList[0].taiKhoan)

    for (var i = 0; i < userList.length; i++) {
        console.log(userList[i].taiKhoan)
        if (userList[i].taiKhoan === TaiKhoan) {
            return true
        }
        else {
            return false
        }
    }



}




console.log(checkDuplicate("jroberts"))



function isRequired(value) {
    if (!value) {
        return false;
    }

    return true;
}


function minLength(value, limit) {
    if (value.length < limit) {
        return false;
    }

    return true;
}

function maxLength(value, limit) {
    if (value.length > limit) {
        return false;
    }

    return true;
}


function validationAdd(user) {
    var taiKhoan = document.getElementById("TaiKhoan").value;
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;
    var isValid = true;

    //Kiểm tra tài khoản nhập vào có hợp lệ hay không
    if (!isRequired(taiKhoan)) {
        isValid = false;
        document.getElementById('tbTKND').innerHTML = "Tài khoản không được để trống";
        document.getElementById('tbTKND').style = "display:block";
    }

    else if (checkDuplicate(taiKhoan)) {
        isValid = false;
        document.getElementById('tbTKND').innerHTML = "Tài khoản đã tồn tại";
        document.getElementById('tbTKND').style = "display:block";
    }
    else {
        document.getElementById('tbTKND').innerHTML = "";
        document.getElementById('tbTKND').style = "display:none";

    }



    var namePattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$")
    if (!isRequired(hoTen)) {
        isValid = false;
        document.getElementById('tbHoTen').innerHTML = "Tên người dùng không được để trống";
        document.getElementById('tbHoTen').style = "display:block";
    }
    else if (!namePattern.test(hoTen)) {
        isValid = false;
        document.getElementById('tbHoTen').innerHTML = "Tên người dùng chứa kí tự không hợp lệ";
        document.getElementById('tbHoTen').style = "display:block";
    }
    else {
        document.getElementById('tbHoTen').innerHTML = "";
        document.getElementById('tbHoTen').style = "display:none";

    }

    //Kiểm tra password có hợp lệ không

    var pswPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/
    if (!isRequired(matKhau)) {
        isValid = false;
        document.getElementById("tbMatKhau").innerHTML =
            "Mật khẩu không được để trống";
        document.getElementById('tbMatKhau').style = "display:block";

    }
    else if (!minLength(matKhau, 6)) {
        isValid = false;
        document.getElementById('tbMatKhau').innerHTML = "Mật khẩu phải có ít nhất 6 ký tự";
        document.getElementById('tbMatKhau').style = "display:block";
    }
    else if (!maxLength(matKhau, 10)) {
        isValid = false;
        document.getElementById('tbMatKhau').innerHTML = "Mật khẩu có tối đa 10 ký tự";
        document.getElementById('tbMatKhau').style = "display:block";
    }
    else if (!pswPattern.test(matKhau)) {
        isValid = false;
        document.getElementById("tbMatKhau").innerHTML =
            "Mật khẩu phải chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
        document.getElementById('tbMatKhau').style = "display:block";
    }
    else {
        document.getElementById('tbMatKhau').innerHTML = "";
        document.getElementById('tbMatKhau').style = "display:none";

    }

    //Kiểm tra email có hợp lệ không 
    var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
    if (!isRequired(email)) {
        isValid = false;
        document.getElementById("tbEmail").innerHTML =
            "Email không được để trống";
        document.getElementById('tbEmail').style = "display:block";

    } else if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById("tbEmail").innerHTML =
            "Email không đúng định dạng";
        document.getElementById('tbEmail').style = "display:block";

    }
    else {
        document.getElementById('tbEmail').innerHTML = "";
        document.getElementById('tbEmail').style = "display:none";

    }

    //Kiểm tra hình ảnh có hợp lệ không 
    if (!isRequired(hinhAnh)) {
        isValid = false;
        document.getElementById("tbHinhAnh").innerHTML =
            "Hình ảnh không được để trống";
        document.getElementById('tbHinhAnh').style = "display:block";
    }
    else {
        document.getElementById('tbHinhAnh').innerHTML = "";
        document.getElementById('tbHinhAnh').style = "display:none";

    }

    //Kiểm tra loại người dùng có hợp lệ không có
    if (loaiND === "default") {
        isValid = false;
        document.getElementById("tbND").innerHTML =
            "Hãy chọn loại người dùng";
        document.getElementById('tbND').style = "display:block";
    }
    else {
        document.getElementById('tbND').innerHTML = "";
        document.getElementById('tbND').style = "display:none";

    }



    //Kiểm tra ngôn ngữ  có hợp lệ không


    if (ngonNgu === "default") {
        isValid = false;
        document.getElementById("tbNN").innerHTML =
            "Hãy chọn ngôn ngữ";
        document.getElementById('tbNN').style = "display:block";
    }
    else {
        document.getElementById('tbNN').innerHTML = "";
        document.getElementById('tbNN').style = "display:none";

    }

    //Kiểm tra mô tả có hợp lệ không 
    if (!isRequired(moTa)) {
        isValid = false;
        document.getElementById("tbMoTa").innerHTML =
            "Mô tả không được để trống";
        document.getElementById('tbMoTa').style = "display:block";

    }
    else if (!maxLength(moTa, 60)) {
        isValid = false;
        document.getElementById("tbMoTa").innerHTML =
            "Mô tả không vượt quá 60 ký tự";
        document.getElementById('tbMoTa').style = "display:block";
    }
    else {
        document.getElementById('tbMoTa').innerHTML = "";
        document.getElementById('tbMoTa').style = "display:none";

    }


    return isValid



}
function validationUpdate(user) {
    var hoTen = document.getElementById("HoTen").value;
    var matKhau = document.getElementById("MatKhau").value;
    var email = document.getElementById("Email").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var loaiND = document.getElementById("loaiNguoiDung").value;
    var ngonNgu = document.getElementById("loaiNgonNgu").value;
    var moTa = document.getElementById("MoTa").value;
    var isValid = true;




    var namePattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$")
    if (!isRequired(hoTen)) {
        isValid = false;
        document.getElementById('tbHoTen').innerHTML = "Tên người dùng không được để trống";
        document.getElementById('tbHoTen').style = "display:block";
    }
    else if (!namePattern.test(hoTen)) {
        isValid = false;
        document.getElementById('tbHoTen').innerHTML = "Tên người dùng chứa kí tự không hợp lệ";
        document.getElementById('tbHoTen').style = "display:block";
    }
    else {
        document.getElementById('tbHoTen').innerHTML = "";
        document.getElementById('tbHoTen').style = "display:none";

    }

    //Kiểm tra password có hợp lệ không

    var pswPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/
    if (!isRequired(matKhau)) {
        isValid = false;
        document.getElementById("tbMatKhau").innerHTML =
            "Mật khẩu không được để trống";
        document.getElementById('tbMatKhau').style = "display:block";

    }
    else if (!minLength(matKhau, 6)) {
        isValid = false;
        document.getElementById('tbMatKhau').innerHTML = "Mật khẩu phải có ít nhất 6 ký tự";
        document.getElementById('tbMatKhau').style = "display:block";
    }
    else if (!maxLength(matKhau, 10)) {
        isValid = false;
        document.getElementById('tbMatKhau').innerHTML = "Mật khẩu có tối đa 10 ký tự";
        document.getElementById('tbMatKhau').style = "display:block";
    }
    else if (!pswPattern.test(matKhau)) {
        isValid = false;
        document.getElementById("tbMatKhau").innerHTML =
            "Mật khẩu phải chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
        document.getElementById('tbMatKhau').style = "display:block";
    }
    else {
        document.getElementById('tbMatKhau').innerHTML = "";
        document.getElementById('tbMatKhau').style = "display:none";

    }

    //Kiểm tra email có hợp lệ không 
    var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
    if (!isRequired(email)) {
        isValid = false;
        document.getElementById("tbEmail").innerHTML =
            "Email không được để trống";
        document.getElementById('tbEmail').style = "display:block";

    } else if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById("tbEmail").innerHTML =
            "Email không đúng định dạng";
        document.getElementById('tbEmail').style = "display:block";

    }
    else {
        document.getElementById('tbEmail').innerHTML = "";
        document.getElementById('tbEmail').style = "display:none";

    }

    //Kiểm tra hình ảnh có hợp lệ không 
    if (!isRequired(hinhAnh)) {
        isValid = false;
        document.getElementById("tbHinhAnh").innerHTML =
            "Hình ảnh không được để trống";
        document.getElementById('tbHinhAnh').style = "display:block";
    }
    else {
        document.getElementById('tbHinhAnh').innerHTML = "";
        document.getElementById('tbHinhAnh').style = "display:none";

    }

    //Kiểm tra loại người dùng có hợp lệ không có
    if (loaiND === "default") {
        isValid = false;
        document.getElementById("tbND").innerHTML =
            "Hãy chọn loại người dùng";
        document.getElementById('tbND').style = "display:block";
    }
    else {
        document.getElementById('tbND').innerHTML = "";
        document.getElementById('tbND').style = "display:none";

    }



    //Kiểm tra ngôn ngữ  có hợp lệ không


    if (ngonNgu === "default") {
        isValid = false;
        document.getElementById("tbNN").innerHTML =
            "Hãy chọn ngôn ngữ";
        document.getElementById('tbNN').style = "display:block";
    }
    else {
        document.getElementById('tbNN').innerHTML = "";
        document.getElementById('tbNN').style = "display:none";

    }

    //Kiểm tra mô tả có hợp lệ không 
    if (!isRequired(moTa)) {
        isValid = false;
        document.getElementById("tbMoTa").innerHTML =
            "Mô tả không được để trống";
        document.getElementById('tbMoTa').style = "display:block";

    }
    else if (!maxLength(moTa, 60)) {
        isValid = false;
        document.getElementById("tbMoTa").innerHTML =
            "Mô tả không vượt quá 60 ký tự";
        document.getElementById('tbMoTa').style = "display:block";
    }
    else {
        document.getElementById('tbMoTa').innerHTML = "";
        document.getElementById('tbMoTa').style = "display:none";

    }


    return isValid



}
