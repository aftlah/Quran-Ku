function getSurat() {
   fetch("https://equran.id/api/v2/surat")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let cardSurat = "";
      const dataSurat = response.data;
      dataSurat.forEach((surat) => {
        cardSurat += `
        <div class="col-lg-3 col-md-4 col-sm-6">
             <div class="card  mb-4 card-surat" style="height: 80%;">
                <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
                  <h5 class="card-title">${surat.nomor}. ${surat.namaLatin}</h5>
                  <h3 class="card-subtitle text-end mb-3 mt-3 text-body-secondary">${surat.nama}</h3>
                  <p class="card-text text-end">${surat.arti}</p>
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

