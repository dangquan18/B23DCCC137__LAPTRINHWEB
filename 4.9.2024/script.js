class Student {
  constructor(
    studentID,
    fullname,
    email,
    phonenumber,
    address,
    dob,
    hometown,
    gender
  ) {
    this.studentID = studentID;
    this.fullname = fullname;
    this.email = email;
    this.phonenumber = phonenumber;
    this.address = address;
    this.dob = dob;
    this.hometown = hometown;
    this.gender = gender;
  }
}

class StudentManager {
  constructor() {
    this.students = this.loadStudents();
    this.renderStudentList();
    this.attachEventListeners();
  }

  loadStudents() {
    const studentsData = localStorage.getItem("students");
    return studentsData ? JSON.parse(studentsData) : [];
  }

  saveStudents() {
    localStorage.setItem("students", JSON.stringify(this.students));
  }

  addStudent(student) {
    this.students.push(student);
    this.saveStudents();
    this.renderStudentList();
  }

  updateStudent(index, student) {
    this.students[index] = student;
    this.saveStudents();
    this.renderStudentList();
  }

  deleteStudent(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
      this.students.splice(index, 1);
      this.saveStudents();
      this.renderStudentList();
    }
  }

  getFormData() {
    return {
      studentID: document.getElementById("studentID").value.trim(),
      fullname: document.getElementById("fullname").value.trim(),
      email: document.getElementById("email").value.trim(),
      phonenumber: document.getElementById("phonenumber").value.trim(),
      address: document.getElementById("address").value.trim(),
      dob: document.getElementById("dob").value.trim(),
      hometown: document.getElementById("hometown").value.trim(),
      gender: document.querySelector('input[name="gender"]:checked')?.value,
    };
  }

  validateForm(data) {
    return Object.values(data).every((value) => value !== "");
  }

  saveStudent() {
    const formData = this.getFormData();
    if (!this.validateForm(formData)) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const {
      studentID,
      fullname,
      email,
      phonenumber,
      address,
      dob,
      hometown,
      gender,
    } = formData;
    const index = document.getElementById("edit-index").value;

    const student = new Student(
      studentID,
      fullname,
      email,
      phonenumber,
      address,
      dob,
      hometown,
      gender
    );

    if (index === "" || index === undefined) {
      this.addStudent(student);
    } else {
      this.updateStudent(parseInt(index, 10), student);
    }

    this.resetForm();
  }

  resetForm() {
    document.getElementById("form-1").reset();
    document.getElementById("edit-index").value = "";
  }

  renderStudentList() {
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = "";

    this.students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${student.studentID}</td>
          <td>${student.fullname}</td>
          <td>${student.email}</td>
          <td>${student.phonenumber}</td>
          <td>${student.address}</td>
          <td>${student.dob}</td>
          <td>${student.hometown}</td>
          <td>${student.gender}</td>
          <td>
            <button data-index="${index}" class="edit-btn" type="button">Sửa</button>
            <button data-index="${index}" class="delete-btn" type="button">Xóa</button>
          </td>
        `;
      tableBody.appendChild(row);
    });
  }

  editStudent(index) {
    const student = this.students[index];
    if (student) {
      document.getElementById("studentID").value = student.studentID;
      document.getElementById("fullname").value = student.fullname;
      document.getElementById("email").value = student.email;
      document.getElementById("phonenumber").value = student.phonenumber;
      document.getElementById("address").value = student.address;
      document.getElementById("dob").value = student.dob;
      document.getElementById("hometown").value = student.hometown;
      document.querySelectorAll('input[name="gender"]').forEach((input) => {
        input.checked = input.value === student.gender;
      });

      document.getElementById("edit-index").value = index;
    } else {
      alert("Không tìm thấy sinh viên để sửa.");
    }
  }

  attachEventListeners() {
    document
      .querySelector(".form-submit")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.saveStudent();
      });

    document
      .querySelector("#student-table")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target;
        const index = target.getAttribute("data-index");

        if (target.classList.contains("edit-btn")) {
          this.editStudent(index);
        } else if (target.classList.contains("delete-btn")) {
          this.deleteStudent(index);
        }
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.studentManager = new StudentManager();
});
