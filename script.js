// CONFIGURATION - Araya Leadership Strategic Assessment
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgqw0H2zSNeyG5ZOezlmUOvtERKuGacLGWTb7szPzIOZff21NlqppBMWQBeTeEl4Xf5Q/exec"; 
const WHATSAPP_NUMBER = "6285232526003"; 

const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", questions: ["1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.","2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.","3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.","4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.","5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."]},
    { level: 2, name: "Permission (Izin)", group: "L2", questions: ["6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.","7. Saya membangun kepercayaan dengan tim melalui komunikasi yang terbuka dan jujur.","8. Saya secara aktif mendengarkan dan menghargai masukan tim, meskipun berbeda dengan pandangan saya.","9. Saya berfokus untuk menciptakan lingkungan kerja yang positif dan kolaboratif.","10. Anggota tim saya bersedia memberikan usaha ekstra karena hubungan baik kami."]},
    { level: 3, name: "Production (Produksi)", group: "L3", questions: ["11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil nyata.","12. Saya bertanggung jawab penuh atas hasil kerja tim, baik keberhasilan maupun kegagalan.","13. Tim saya memiliki momentum yang kuat dan termotivasi oleh keberhasilan yang diraih.","14. Saya menetapkan standar kinerja yang tinggi dengan memberikan teladan hasil kerja nyata.","15. Kredibilitas saya di organisasi didasarkan pada prestasi yang saya capai."]},
    { level: 4, name: "People Development", group: "L4", questions: ["16. Saya secara rutin menyediakan waktu untuk melatih dan membimbing anggota tim agar berkembang.","17. Anggota tim yang saya bimbing sering kali berhasil dipromosikan atau memimpin unit baru.","18. Saya berinvestasi dalam pengembangan orang meskipun mereka mungkin akan pindah ke posisi lain.","19. Saya mendelegasikan tanggung jawab signifikan agar anggota tim tumbuh dalam kapasitas pemimpin.","20. Saya aktif mencari dan merekrut individu yang memiliki potensi besar untuk masa depan."]},
    { level: 5, name: "Pinnacle (Puncak)", group: "L5", questions: ["21. Pemimpin di luar tim sering mencari nasihat atau panduan strategis dari saya.","22. Kehadiran dan reputasi saya secara konsisten meningkatkan semangat organisasi.","23. Keputusan dan tindakan saya didasarkan pada prinsip yang diyakini oleh organisasi.","24. Saya telah menciptakan budaya kepemimpinan yang tetap efektif meskipun saya tidak hadir.","25. Saya dikenal luas sebagai panutan yang inspiratif dengan integritas tinggi."]}
];

const reportDetails = {
    1: { title: "Level 1: Position", desc: "Kepemimpinan Anda didasarkan pada jabatan formal. Tim bekerja karena keharusan.", rec: "Bangunlah hubungan personal dan empati untuk mendapatkan kepercayaan tim." },
    2: { title: "Level 2: Permission", desc: "Anda memimpin melalui hubungan baik. Orang mengikuti karena mereka ingin bekerja dengan Anda.", rec: "Gunakan hubungan baik untuk mulai menetapkan standar hasil tim." },
    3: { title: "Level 3: Production", desc: "Anda memimpin melalui hasil nyata. Reputasi Anda didasarkan pada prestasi tim.", rec: "Mulai fokus mementori orang lain agar mereka juga berprestasi." },
    4: { title: "Level 4: People Development", desc: "Anda fokus mencetak pemimpin baru. Anda dikenal sebagai mentor yang handal.", rec: "Pastikan sistem kepemimpinan tetap berjalan mandiri meskipun tanpa kehadiran Anda." },
    5: { title: "Level 5: Pinnacle", desc: "Anda memimpin melalui reputasi dan jati diri. Anda adalah panutan lintas generasi.", rec: "Ciptakan warisan budaya kepemimpinan jangka panjang di organisasi." }
};

let userData = { name: "", phone: "" };
let currentQ = 0;
const allQuestionsFlat = [];
const userAnswers = {};
let myChart;

// Inisialisasi Data
allQuestionsFlat.length = 0;
questionsData.forEach(lvl => {
    lvl.questions.forEach((txt, i) => {
        allQuestionsFlat.push({ id: `${lvl.group}_${i}`, text: txt, levelGroup: lvl.group });
    });
});

window.startTest = function() {
    userData.name = document.getElementById('user-name').value;
    userData.phone = document.getElementById('user-phone').value;
    if(!userData.name || !userData.phone) return alert("Mohon lengkapi Nama dan WhatsApp.");
    document.getElementById('registration-screen').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    renderQuestion();
};

function renderQuestion() {
    const q = allQuestionsFlat[currentQ];
    document.getElementById('quiz-header').innerHTML = `<p style="color:#888">Asesmen ${currentQ + 1}/25</p><h4>${q.text}</h4>`;
    document.getElementById('questions-container').innerHTML = `
        <div class="options-grid">
            ${[1,2,3,4,5].map(v => `
                <label class="opt-label">
                    <input type="radio" name="q" value="${v}" ${userAnswers[q.id]==v?'checked':''} onchange="saveAnswer('${q.id}', ${v})">
                    <div class="opt-circle">${v}</div>
                </label>
            `).join('')}
        </div>`;
    updateNav();
}

window.saveAnswer = function(id, val) { userAnswers[id] = val; updateNav(); };

function updateNav() {
    const answered = userAnswers[allQuestionsFlat[currentQ].id] !== undefined;
    document.getElementById('next-btn').disabled = !answered;
    document.getElementById('prev-btn').classList.toggle('hidden', currentQ === 0);
    const last = currentQ === 24;
    document.getElementById('next-btn').classList.toggle('hidden', last);
    document.getElementById('submit-btn').classList.toggle('hidden', !last);
}

document.getElementById('next-btn').onclick = () => { currentQ++; renderQuestion(); };
document.getElementById('prev-btn').onclick = () => { currentQ--; renderQuestion(); };

window.calculateResults = function() {
    const avgs = {};
    let sumTotal = 0;

    questionsData.forEach(lvl => {
        const sum = allQuestionsFlat.filter(q => q.levelGroup === lvl.group).reduce((acc, q) => acc + (userAnswers[q.id] || 0), 0);
        avgs[lvl.group] = (sum / 5).toFixed(1);
        sumTotal += parseFloat(avgs[lvl.group]);
    });

    let mainLvlNum = 1;
    for(let i=5; i>=1; i--) { if(parseFloat(avgs[`L${i}`]) >= 4.0) { mainLvlNum = i; break; } }
    const lvlName = questionsData[mainLvlNum-1].name;
    const finalAvg = (sumTotal / 5).toFixed(1);

    // 1. PINDAH HALAMAN LANGSUNG
    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(mainLvlNum, avgs);

    // 2. KIRIM DATA KE DATABASE
    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        cache: 'no-cache',
        body: JSON.stringify({ name: userData.name, phone: userData.phone, levelName: lvlName, avgScore: finalAvg }) 
    });
};

function displayResults(lvlNum, avgs) {
    document.getElementById('results').classList.remove('hidden');
    const lvlName = questionsData[lvlNum-1].name;
    
    document.getElementById('level-result-summary').innerHTML = `
        <div style="text-align:center; padding:20px; background:#f0f7ff; border-radius:12px; border:1px solid #007bff; margin-bottom:20px;">
            <h3 style="margin-top:0; color:#0056b3;">Hasil Analisis Kepemimpinan</h3>
            <h1 style="font-size:24px; color:#333;">${lvlName}</h1>
            <p style="font-size:15px; color:#555; line-height:1.6;">
                Bapak/Ibu <b>${userData.name}</b>, skor Anda menunjukkan potensi besar. Namun, untuk menjadi pemimpin level strategis, Anda butuh peta jalan yang jelas.
            </p>
        </div>`;

    document.getElementById('persuasive-call-to-action').innerHTML = `
        <p style="font-size:14px; color:#444; margin-bottom:15px; text-align:center;">
            Dapatkan <b>Laporan PDF Lengkap</b> yang berisi: <br>
            ✅ Analisis mendalam karakter Anda <br>
            ✅ Action Plan 90 Hari untuk naik level
        </p>`;
    
    renderChart(avgs);
    window.currentAvgs = avgs;
    window.currentLvlNum = lvlNum;
}

window.requestAccess = function() {
    const msg = `Halo Mas Ali Mahfud, saya *${userData.name}*. Saya ingin memesan Kode Aktivasi untuk Laporan Leadership Assessment saya.\nNo HP: ${userData.phone}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
};

window.unlockCertificate = function() {
    const code = document.getElementById('access-code').value.toUpperCase();
    if(code.includes("AY") || code.includes("ARAYA")) {
        document.querySelector('.activation-box').classList.add('hidden');
        document.getElementById('cert-area').classList.remove('hidden');
        document.getElementById('download-btn').onclick = () => generatePDF(window.currentLvlNum, window.currentAvgs);
    } else {
        alert("Kode Aktivasi Salah.");
    }
};

function renderChart(avgs) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    if(myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['L1', 'L2', 'L3', 'L4', 'L5'],
            datasets: [{ label: 'Skor', data: Object.values(avgs), backgroundColor: '#007bff' }]
        },
        options: { scales: { y: { min: 0, max: 5 } } }
    });
}

function generatePDF(lvlNum, avgs) {
    const wrapper = document.getElementById('certificate-wrapper');
    const info = reportDetails[lvlNum];
    wrapper.style.display = 'block';
    wrapper.innerHTML = `
        <div style="padding:40px; border:10px solid #0056b3; font-family:sans-serif; min-height:1000px; color:#333;">
            <center><img src="logo-araya.png" width="150"></center>
            <h1 style="text-align:center; color:#0056b3;">LAPORAN ANALISIS KEPEMIMPINAN</h1>
            <p style="text-align:center">Diberikan kepada: <b>${userData.name}</b></p>
            <hr>
            <h3>Hasil: ${info.title}</h3>
            <p><b>Interpretasi:</b> ${info.desc}</p>
            <p><b>Rekomendasi 90 Hari:</b> ${info.rec}</p>
            <table border="1" style="width:100%; border-collapse:collapse; margin-top:20px;">
                <tr style="background:#0056b3; color:white;"><th style="padding:10px;">Level</th><th>Skor</th></tr>
                ${questionsData.map(d => `<tr><td style="padding:10px;">${d.name}</td><td align="center"><b>${avgs[d.group]}</b></td></tr>`).join('')}
            </table>
            <div style="margin-top:50px;">
                <p>Tuban, ${new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                <img src="ttd.png" width="120"><br>
                <b>Ali Mahfud</b><br>Founder Araya Consulting
            </div>
        </div>`;
    
    html2pdf().from(wrapper).set({
        margin: 0,
        filename: `Laporan_Leadership_${userData.name}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save().then(() => { wrapper.style.display = 'none'; });
}
