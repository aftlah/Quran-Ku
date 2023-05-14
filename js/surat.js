function getURL(e) {
  const pageURL = window.location.search.substring(1);
  //   console.log(pageURL);
  const urlVariable = pageURL.split("&");
  //   console.log(urlVariable);

  for (let i = 0; i < urlVariable.length; i++) {
    const parameterName = urlVariable[i].split("=");
    // console.log(parameterName);
    if (parameterName[0] == e) {
      return parameterName[1];
    }
  }
}
const nomorsurat = getURL("nomorsurat");
// console.log(getURL('nomersurat'))

function getSurat() {
  fetch("https://equran.id/api/v2/surat/" + nomorsurat)
    .then((response) => response.json())
    .then((response) => {
      const data = response.data;

      const cardNamaSurat = `
                    <strong> ${data.namaLatin} - ${data.nama} </strong>
                        <p>Jumlah Ayat: ${data.jumlahAyat} (${data.arti})</p>
                        <button class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                            Dengarkan
                        </button>`;

                        
      const namaSurat = document.querySelector(".nama-surat");
      namaSurat.innerHTML = cardNamaSurat;

      const surat = data.ayat;
      console.log(surat.nomorAyat);
      let isiSurat = "";
      surat.forEach((s) => {
        isiSurat += `
        <div class="card my-4 ">
        <div class="card-body">
          <p>${s.nomorAyat}</p>
          <h3 class="text-end lh-lg">${s.teksArab}</h3>
          <p class="mt-3">${s.teksLatin}</p>
          <p>${s.teksIndonesia}</p>
        </div>
      </div>
    `;
      });

      const cardIsiSurat = document.querySelector(".isi-surat");
      cardIsiSurat.innerHTML = isiSurat;
    })
    .catch((err) => console.log(err));
}
getSurat();
