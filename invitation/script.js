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

  function perbaruiHitungMundur(tanggalTarget) {
    const waktu = hitungMundur(tanggalTarget);

    document.getElementById('hari').innerText = waktu.hari;
    document.getElementById('jam').innerText = waktu.jam;
    document.getElementById('menit').innerText = waktu.menit;
    document.getElementById('detik').innerText = waktu.detik;
  }

  // Contoh penggunaan:
  const tanggalTarget = '2024-04-27T00:00:00'; // Atur tanggal target di sini (format: 'YYYY-MM-DDTHH:mm:ss')

  // Memperbarui setiap detik
  setInterval(function() {
    perbaruiHitungMundur(tanggalTarget);
  }, 1000);

  // Memperbarui untuk pertama kali saat halaman dimuat
  perbaruiHitungMundur(tanggalTarget);

  // SCROLL TO TOP
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Efek smooth scrolling
    });
  }

  // PLAY AUDIO
  const audio = document.getElementById('audioPlayer');
  const playButton = document.getElementById('playButton');
  const pauseButton = document.getElementById('pauseButton');

    function playAudio() {
      audio.play();
      playButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';

    }

    function pauseAudio() {
      audio.pause();
      playButton.style.display = 'inline-block';
      pauseButton.style.display = 'none';
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
      playAudio();
    }

    disableScroll();

    //URL PARAMETER
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get('to');
    
    const namaUndangan = document.getElementById('namaUndangan');
    const namaReservation = document.getElementById('nama');

    namaUndangan.innerText = nama ?? "Undangan";
    namaReservation.value = nama ?? "";

    // COPY TO CLIPBOARD
    function copyText(id) {
      const textToCopy = document.getElementById(id).innerText;
      
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      
      if (navigator.userAgent.match(/ipad|iphone|mac os|android/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }

      try {
        const successful = document.execCommand('copy');
        const message = successful ? 'Teks berhasil disalin ke clipboard: ' + textToCopy : 'Gagal menyalin teks ke clipboard.';
        alert(message);
      } catch (err) {
        console.error('Gagal menyalin teks ke clipboard:', err);
      }

      document.body.removeChild(textArea);
    }