function getSurat() {
   fetch("https://equran.id/api/v2/surat")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let cardSurat = "";
      const dataSurat = response.data;
      dataSurat.forEach((surat) => {
        cardSurat += `
        <div class="col-lg-3 col-md-4 col-6 ">
             <div class="card card-surat text-white" style="height: 80%;">
             <div class="card-body position-relative " onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
             <div class="no-surat">
             <div class="mt-1 fw-semibold fs-6">${surat.nomor} </div>
             </div>
                  <h5 class="card-title card-titles">${surat.namaLatin}</h5>
                  <p class="card-text opacity-50 mb-3 arti-surat">${surat.arti}</p>
                </div>
              </div>
        </div>`;
      });
      const listSurat = document.querySelector(".list-surat");
      listSurat.innerHTML = cardSurat;
    })
    .catch((err) => console.log(err));
}

getSurat();
console.log(getSurat());

