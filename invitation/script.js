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
  const tanggalTarget = '2024-04-20T00:00:00'; // Atur tanggal target di sini (format: 'YYYY-MM-DDTHH:mm:ss')

  // Memperbarui setiap detik
  setInterval(function() {
    perbaruiHitungMundur(tanggalTarget);
  }, 1000);

  // Memperbarui untuk pertama kali saat halaman dimuat
  perbaruiHitungMundur(tanggalTarget);


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Efek smooth scrolling
    });
  }

  // Munculkan tombol saat scroll mencapai posisi tertentu
  window.onscroll = function() {
    tampilkanTombol();
  };

  function tampilkanTombol() {
    const tombol = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      tombol.style.display = "block";
    } else {
      tombol.style.display = "none";
    }
  }

  const audio = document.getElementById('audioPlayer');

    function playAudio() {
      audio.play();
      document.getElementById('playButton').style.display = 'none';
      document.getElementById('pauseButton').style.display = 'inline-block';

    }

    function pauseAudio() {
      audio.pause();
      document.getElementById('pauseButton').style.display = 'none';
      document.getElementById('playButton').style.display = 'inline-block';
    }

    const rootElement = document.querySelector(":root");

    function disableScroll() {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      window.onscroll = function () {
        window.scrollTo(scrollTop, scrollLeft);
      }

      rootElement.style.scrollBehavior = 'auto';
    }

    function enableScroll() {
      window.onscroll = function () { }
      rootElement.style.scrollBehavior = 'smooth';
      document.getElementById('navigation').style.display = 'inline-block';
      playAudio();
    }

    disableScroll();