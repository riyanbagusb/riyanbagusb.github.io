// DATABASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://fnb-wedding-project-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const dataUcapan = ref(database, "ucapan");

// TOAST
const toastLive = document.getElementById('liveToast');
const toastText = document.getElementById('toastText');
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

function showToast(message) {
  toastText.innerHTML = message;
  toastBootstrap.show();
}

// KIRIM UCAPAN
const formUcapan = document.getElementById("formUcapan");

formUcapan.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(formUcapan);

    push(dataUcapan, {
        nama: formData.get('nama'),
        pesan: formData.get('pesan')
    }).then(() => {
        showToast("Ucapan dan doa anda berhasil terkirim.");
        formUcapan.style.display = 'none';
    });
});

// GET UCAPAN
function getData() {
    onValue(dataUcapan, function(data) {
        if(data.val()) {
            const ucapan = data.val();
            updateUcapan(ucapan);
        }
    })
}

getData();

function updateUcapan(data) {
    const viewUcapan = document.getElementById('ucapanList');
    let view = '';
    let val = Object.values(data);
    val.slice().reverse().forEach(data => {
        view += `
        <div class="border rounded-3 py-2 px-3 text-start w-100 d-flex flex-row gap-3">
            <div class="img-box-ucapan border rounded-circle">
                <img src="flower2.svg" alt="Bird Vector Image" height="40px" class="mb-2"
            />
            </div>
            <div>
                <div class="fw-bold">${data.nama}</div>
                <div class="text-justify">${data.pesan}</div>
            </div>
        </div>`
    });
    viewUcapan.innerHTML = view;
}

