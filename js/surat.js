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
// console.log(nomorsurat)

const loader = document.querySelector(".hidden-loader");
const error = "MAAF SERVER SEDANG BERMASALAH, TRIMAKASIH";

async function getSurat() {
  try {
    loader.classList.remove("hidden-loader");
    await getUiDetail();
  } catch (err) {
    alert(error);
    loader.classList.add("hidden-loader");
  }

  function getUiDetail() {
    return fetch("https://equran.id/api/surat/" + nomorsurat)
      .then((response) => response.json())
      .then((response) => {
        const data = response;

        // Judul Surat
        let cardNamaSurat = judulSurat(data);

        const namaSurat = document.querySelector(".nama-surat");
        namaSurat.innerHTML = cardNamaSurat;

        // Isi Surat
        const surat = data.ayat;
        let isiSurat = "";
        surat.forEach((s) => {
          isiSurat += `
          <div class="card my-4 bg-isi-surat text-white">
          <div class="card-body">
            <p class ="nomor-ayat fw-semibold fs-5">${s.nomor}.</p>
            <h3 class="text-end lh-lg">${s.ar}</h3>
            <p class="mt-3 teks-latin">${s.tr}</p>
            <p>${s.idn}</p>
          </div>
          </div>
      `;;
        });

        const cardIsiSurat = document.querySelector(".isi-surat");
        cardIsiSurat.innerHTML = isiSurat;

        // Play n Pause Audio
        const buttonPlay = document.querySelector(".audio-btn-play");
        const buttonpause = document.querySelector(".audio-btn-pause");
        const audioSurat = document.querySelector("#audio-tag");

        // Play
        buttonPlay.addEventListener("click", function () {
          buttonPlay.classList.add("hidden-btn");
          buttonpause.classList.remove("hidden-btn");
          audioSurat.play();
        });

        // Pause
        buttonpause.addEventListener("click", function () {
          buttonPlay.classList.remove("hidden-btn");
          buttonpause.classList.add("hidden-btn");
          audioSurat.pause();
        });
      })
      .catch((err) => console.log(err));
  }
}
getSurat();

function judulSurat(data) {
  return `
      <strong> ${data.nama_latin} - ${data.nama} </strong>
      <p>Jumlah Ayat: ${data.jumlah_ayat} (${data.arti})</p>

      <button class="btn btn-primary audio-btn-play">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-play-circle-fill mb-1" viewBox="0 0 16 16">
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
        </svg>
        Play
      </button>

      <button class="btn btn-danger audio-btn-pause hidden-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill mb-1" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
    </svg>
        Pause
      </button>

      <audio src="${data.audio}" id="audio-tag"></audio>`;
}
