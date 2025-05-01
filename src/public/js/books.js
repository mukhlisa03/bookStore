console.log("Books frontend javascript file");

$(function () {
  $(".book-collection").on("change", () => {
    const selectedValue = $(".book-collection").val();
    if (selectedValue === "OTHER") {
      $("#book-collection").hide();
      $("#book-volume").show();
    } else {
      $("#book-volume").hide();
      $("#book-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".book-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".book-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  $(".new-book-status").on("change", async function (e) {
    const id = e.target.id;
    const bookStatus = $(`#${id}.new-book-status`).val();

    try {
      const response = await axios.post(`/admin/book/${id}`, {
        bookStatus: bookStatus,
      });
      console.log("response:", response); // axiosdan kladgan toliq datani korsh un
      const result = response.data;
      if (result.data) {
        console.log("Book updated!");
        $(".new-book-status").blur();
      } else alert("Book update failed!");
    } catch (err) {
      console.log(err);
      alert("Book update failed!");
    }
  });
});

function validateForm() {
  // hamma malumotlar togri krtlganni anqlab beradi
  // console.log("EXECUTED validateForm");
  const bookName = $(".book-name").val();
  const bookType = $(".book-type").val();
  const bookLanguage = $(".book-language").val();
  const bookAuthor = $(".book-author").val();
  const bookPrice = $(".book-price").val();
  const bookDesc = $(".book-desc").val();
  const bookStatus = $(".book-status").val();

  if (
    // bosh bolmasligi talab qlngan malumotlar
    bookName === "" || // || => hech bomsa bittasi ham krtlma ERROR beradi
    bookType === "" ||
    bookLanguage === "" ||
    bookAuthor === "" ||
    bookPrice === "" ||
    bookDesc === "" ||
    bookStatus === ""
  ) {
    alert("Please insert all details!");
    return false;
  } else return true;
}

function previewFileHandler(input, order) {
  const imgClassName = input.className;
  console.log("input:", input); // this ni togri olnga tek qlsh
  console.log("imgClassName:", imgClassName);

  const file = $(`.${imgClassName}`).get(0).files[0];
  const fileType = file["type"];
  const validImageType = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageType.includes(fileType)) {
    alert("Please insert only jpeg, jpg and png!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}


//PAUSE => restaran to uni tayyorbolganligiga ishonch hosl qgncha
// shu holatda turadi, bomsa u user page ga chqb ketadi, shuni oldini olsh un ishldi
