// TOAST
const toastLive = document.getElementById('liveToast');
const toastText = document.getElementById('toastText');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

function showToast(message) {
  toastText.innerHTML = message;
  toastBootstrap.show();
}

// FULLSCREEN WEBSITE
const fullscreenButton = document.getElementById('fullscreenButton');

function toggleFullscreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    fullscreenButton.classList.add('bi-fullscreen-exit');
    fullscreenButton.classList.remove('bi-arrows-fullscreen');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    fullscreenButton.classList.add('bi-arrows-fullscreen');
    fullscreenButton.classList.remove('bi-fullscreen-exit');
  }
}

// SCROLL TO TOP
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// PLAY AUDIO
const audio = document.getElementById('audioPlayer');
const musicButton =document.getElementById('musicButton');

function toggleMusic() {
  if(audio.paused){
    audio.play();
    musicButton.classList.add('bi-pause-circle');
    musicButton.classList.remove('bi-play-circle');
  } else {
    audio.pause();
    musicButton.classList.add('bi-play-circle');
    musicButton.classList.remove('bi-pause-circle');
  }
}

function playMusic() {
  audio.play();
  musicButton.classList.add('bi-pause-circle');
  musicButton.classList.remove('bi-play-circle');
  musicButton.style.display = 'inline-block';
}

// DISABLE SCROLL
const rootElement = document.querySelector(":root");

function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  }
  rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
  window.onscroll = function () { }
  rootElement.style.scrollBehavior = 'smooth';
  document.getElementById('navigation').style.display = 'inline-block';
  document.getElementById('backToTopBtn').style.display = 'inline-block';
  playMusic();
}

disableScroll();

// COUNTDOWN
const tanggalTarget = '2024-04-27T09:00:00';
// const tanggalTarget = '2023-12-27T18:00:00';

function hitungMundur(tanggalTarget) {
    const sekarang = new Date().getTime();
    const target = new Date(tanggalTarget).getTime();
    const selisih = target - sekarang;

    if (selisih <= 0) {
      return {
        hari: 0,
        jam: 0,
        menit: 0,
        detik: 0
      };
    }

    const satuHari = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik
    const satuJam = 60 * 60 * 1000; // 1 jam dalam milidetik
    const satuMenit = 60 * 1000; // 1 menit dalam milidetik

    const hari = Math.floor(selisih / satuHari);
    const jam = Math.floor((selisih % satuHari) / satuJam);
    const menit = Math.floor((selisih % satuJam) / satuMenit);
    const detik = Math.floor((selisih % satuMenit) / 1000);

    return {
      hari,
      jam,
      menit,
      detik
    };
}

function updateHitungMundur(tanggalTarget) {
  const waktu = hitungMundur(tanggalTarget);

  document.getElementById('hari').innerText = waktu.hari;
  document.getElementById('jam').innerText = waktu.jam;
  document.getElementById('menit').innerText = waktu.menit;
  document.getElementById('detik').innerText = waktu.detik;
}

setInterval(function() {
  updateHitungMundur(tanggalTarget);
}, 1000);

updateHitungMundur(tanggalTarget);

//URL PARAMETER
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('to');

const namaUndangan = document.getElementById('namaUndangan');
const namaReservation = document.getElementById('nama');
const namaPengirim = document.getElementById('namaPengirim');

namaUndangan.innerText = nama ?? "Undangan";
namaReservation.value = nama ?? "";
namaPengirim.value = nama ?? "";

// COPY TO CLIPBOARD
function copyText(id) {
  const textToCopy = document.getElementById(id).innerText;
  
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Teks berhasil disalin ke clipboard:\n' + textToCopy);
    }).catch(err => {
      console.error('Gagal menyalin ke clipboard:\n', err);
      alert('Gagal menyalin teks ke clipboard.');
    });
  } else {
    const textField = document.createElement('textarea');
    textField.innerText = textToCopy;
    textField.style.position = 'fixed';
    textField.style.opacity = 0;
    document.body.appendChild(textField);

    textField.focus();
    textField.setSelectionRange(0, textField.value.length);

    try {
      const successful = document.execCommand('copy');
      const message = successful ? 'Teks berhasil disalin ke clipboard:\n' + textToCopy : 'Gagal menyalin teks ke clipboard.';
      alert(message);
    } catch (err) {
      console.error('Gagal menyalin teks ke clipboard:\n', err);
      alert('Gagal menyalin teks ke clipboard.');
    }

    document.body.removeChild(textField);
  }
}

// FORM KONFIRMASI KEHADIRAN
window.addEventListener("load", function() {
  const formReservasi = document.getElementById('formReservasi');
  const sectionRsvp = document.getElementById('rsvp');
  const buttonRsvp = document.getElementById('rsvp2');
  formReservasi.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(formReservasi);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      sectionRsvp.style.display = 'none';
      buttonRsvp.style.display = 'none';
      showToast("Konfirmasi berhasil terkirim.");
    })
  });
});