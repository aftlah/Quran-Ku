const listSurat = document.querySelector(".list-surat");
const loader = document.querySelector('.loader')
const error = 'MAAF SERVER SEDANG BERMASALAH, TRIMAKASIH'

async function getSurat() {
  try {
    await getUI();
    loader.classList.add('hidden-loader')
  } catch (err) {
    console.log(err)
    // alert(error)
    loader.classList.remove('hidden-loader')
  }
}

function getUI() {
  return fetch("https://equran.id/api/v2/surat")
    .then((response) => response.json())
    .then((response) => {
      
      let cardSurat = "";
      const dataSurat = response.data;
      dataSurat.forEach((surat) => {
        cardSurat += getCardSurat(surat)
      });
      
      listSurat.innerHTML = cardSurat;
    })
    .catch((err) => console.log(err));
}

getSurat();
// console.log(getSurat());

function getCardSurat(surat){
  return `
  <div class="col-lg-3 col-md-4 col-6 ">
       <div class="card card-surat text-white" style="height: 80%;">
       <div class="card-body position-relative " onclick="location.href='surat.html?nomorsurat=${surat.nomor}'">
       <div class="no-surat">
       <div class="fw-semibold surat-nomor">${surat.nomor} </div>
       </div>
            <h5 class="card-title card-titles my-auto">${surat.namaLatin}</h5>
            <p class="card-text opacity-50 mb-3 arti-surat my-autpo">${surat.arti}</p>
          </div>
        </div>
  </div>`;
}