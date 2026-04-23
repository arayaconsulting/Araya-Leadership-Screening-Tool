// CONFIGURATION - Araya Leadership Assessment
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzw-wO7nvdSRyVm87qWoJh7rSLTFf5IiBwbmV6JMOuVz-hXY49tbJWY_uIvk89kbDNujw/exec"; 
const WHATSAPP_NUMBER = "6285232526003"; 

const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", questions: ["1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.","2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.","3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.","4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.","5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."]},
    { level: 2, name: "Permission (Izin)", group: "L2", questions: ["6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.","7. Saya membangun kepercayaan dengan tim saya melalui komunikasi yang terbuka dan jujur.","8. Saya secara aktif mendengarkan dan menghargai masukan tim, bahkan jika berbeda dengan pandangan saya.","9. Saya berfokus untuk menciptakan lingkungan kerja yang positif dan kolaboratif.","10. Anggota tim saya bersedia memberikan usaha ekstra untuk saya karena hubungan pribadi kami."]},
    { level: 3, name: "Production (Produksi)", group: "L3", questions: ["11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil yang nyata.","12. Saya bertanggung jawab penuh atas hasil, baik keberhasilan maupun kegagalan.","13. Tim saya memiliki momentum yang kuat dan termotivasi oleh kesuksesan yang kami raih.","14. Saya menetapkan standar kinerja yang tinggi dan memberikan contoh yang baik.","15. Kredibilitas saya di organisasi didasarkan pada pencapaian, bukan hanya posisi saya."]},
    { level: 4, name: "People Development", group: "L4", questions: ["16. Saya secara rutin menyediakan waktu untuk melatih dan membimbing anggota tim agar bisa menggantikan peran saya.","17. Anggota tim yang saya bimbing sering kali berhasil dipromosikan atau memimpin unit/proyek baru.","18. Saya berinvestasi dalam pengembangan orang bahkan jika itu berarti mereka akan pindah ke posisi yang lebih baik di luar tim saya.","19. Saya mendelegasikan tanggung jawab yang signifikan kepada anggota tim agar mereka tumbuh dan mengambil inisiatif kepemimpinan.","20. Saya aktif merekrut individu yang memiliki potensi besar, bukan hanya yang dapat memenuhi tugas saat ini."]},
    { level: 5, name: "Pinnacle (Puncak)", group: "L5", questions: ["21. Pemimpin di luar tim/departemen saya sering mencari nasihat atau panduan strategis dari saya.","22. Kehadiran dan reputasi saya secara konsisten meningkatkan semangat dan kinerja seluruh organisasi.","23. Keputusan dan tindakan saya selalu didasarkan pada prinsip yang diyakini oleh sebagian besar karyawan/stakeholder.","24. Saya telah menciptakan budaya atau sistem kepemimpinan yang akan tetap efektif setelah saya tidak lagi menjabat.","25. Saya dikenal luas di industri atau perusahaan sebagai panutan yang inspiratif dan memiliki integritas tinggi."]}
];

const reportDetails = {
    1: { title: "Level 1: Position", desc: "Kepemimpinan Anda didasarkan pada otoritas jabatan formal. Tim bekerja karena keharusan.", rec: "Bangunlah hubungan personal dan empati untuk mendapatkan kepercayaan sukarela dari tim." },
    2: { title: "Level 2: Permission", desc: "Anda memimpin melalui hubungan baik. Tim merasa nyaman dan senang bekerja dengan Anda.", rec: "Gunakan hubungan baik untuk mulai menetapkan standar hasil tim." },
    3: { title: "Level 3: Production", desc: "Anda memimpin melalui hasil nyata. Reputasi Anda didasarkan pada prestasi tim.", rec: "Mulailah mendelegasikan tanggung jawab besar untuk mengembangkan calon pemimpin baru." },
    4: { title: "Level 4: People Development", desc: "Anda fokus pada pemberdayaan. Anda dikenal sebagai mentor yang mencetak pemimpin baru.", rec: "Pastikan sistem kepemimpinan tetap berjalan mandiri meskipun tanpa kehadiran Anda secara fisik." },
    5: { title: "Level 5: Pinnacle", desc: "Anda memimpin melalui jati diri dan integritas. Anda menjadi panutan lintas generasi.", rec: "Teruslah membangun warisan budaya kerja dan membimbing pemimpin di tingkat strategis." }
};

let userData = { name: "", phone: "" };
let currentQ = 0;
const allQuestionsFlat = [];
const userAnswers = {};
let myChart;

// Inisialisasi Data Pertanyaan
allQuestionsFlat.length = 0;
questionsData.forEach(lvl => {
    lvl.questions.forEach((txt, i) => {
        allQuestionsFlat.push({ id: `${lvl.group}_${i}`, text: txt, levelGroup: lvl.group });
    });
});

window.startTest = function() {
    userData.name = document.getElementById('user-name').value;
    userData.phone = document.getElementById('user-phone').value;
    if(!userData.name || !userData.phone) return alert("Mohon lengkapi Nama dan No WhatsApp.");
    
    document.getElementById('registration-screen').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    renderQuestion();
}

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
        </div>
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#999; margin-top:-10px;">
            <span>Sangat Tidak Setuju</span>
            <span>Sangat Setuju</span>
        </div>`;
    updateNav();
}

window.saveAnswer = function(id, val) { 
    userAnswers[id] = val; 
    updateNav(); 
}

function updateNav() {
    const answered = userAnswers[allQuestionsFlat[currentQ].id] !== undefined;
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');

    nextBtn.disabled = !answered;
    
    // Logika tombol Kembali
    if (currentQ === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }

    // Logika tombol Selanjutnya vs Lihat Hasil
    if (currentQ === allQuestionsFlat.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        submitBtn.disabled = !answered;
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Handler Klik Navigasi
document.getElementById('next-btn').onclick = () => { 
    if (currentQ < allQuestionsFlat.length - 1) {
        currentQ++; 
        renderQuestion(); 
    }
};

document.getElementById('prev-btn').onclick = () => { 
    if (currentQ > 0) {
        currentQ--; 
        renderQuestion(); 
    }
};

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

    // Kirim data ke Spreadsheet (Background)
    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: JSON.stringify({ 
            name: userData.name, 
            phone: userData.phone, 
            levelName: lvlName, 
            avgScore: finalAvg 
        }) 
    });

    // Pindah ke halaman Hasil
    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(mainLvlNum, avgs);
}

function displayResults(lvlNum, avgs) {
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('display-name').innerText = userData.name;
    const lvlName = questionsData[lvlNum-1].name;
    
    document.getElementById('level-result-summary').innerHTML = `
        <div style="text-align:center; margin-bottom:25px; padding:15px; background:#f0f7ff; border-radius:12px;">
            <h2 style="color:#0056b3; margin-bottom:10px;">Level Pengaruh: ${lvlName}</h2>
            <p style="font-size:15px; color:#444; line-height:1.5;">
                Analisis awal selesai. Namun, angka di atas hanyalah indikator permukaan. 
                <br><br>
                Dapatkan <b>Laporan Strategis Lengkap</b> untuk mengetahui:
                <br>✅ Deskripsi Karakter Kepemimpinan Anda secara mendalam.
                <br>✅ Analisis Kekuatan & Celah pengembangan diri.
                <br>✅ <b>Action Plan 90 Hari</b> untuk naik ke level pengaruh berikutnya.
            </p>
        </div>`;
    
    renderChart(avgs);
    
    window.requestAccess = function() {
        const msg = `Halo Mas Ali Mahfud, saya *${userData.name}*. Saya telah menyelesaikan Leadership Assessment.\n\nSaya ingin memesan **Kode Aktivasi** untuk mengunduh Laporan Analisis Lengkap dan Sertifikat Resmi Araya Consulting.\n\nNo WA: ${userData.phone}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
    };

    window.unlockCertificate = function() {
        const codeInput = document.getElementById('access-code').value;
        // Kode akan terbuka jika mengandung teks 'ARAYA' (sesuai database Bapak)
        if(codeInput.toUpperCase().includes("ARAYA")) {
            document.querySelector('.activation-box').classList.add('hidden');
            document.getElementById('cert-area').classList.remove('hidden');
            document.getElementById('download-btn').onclick = () => generatePDF(lvlNum, avgs);
        } else {
            alert("Kode Aktivasi tidak valid.");
        }
    };
}

function renderChart(avgs) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    if(myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['L1', 'L2', 'L3', 'L4', 'L5'],
            datasets: [{ label: 'Skor Anda', data: Object.values(avgs), backgroundColor: ['#ff6384','#36a2eb','#ffce56','#4bc0c0','#9966ff'] }]
        },
        options: { scales: { y: { min: 0, max: 5 } } }
    });
}

function generatePDF(lvlNum, avgs) {
    const wrapper = document.getElementById('certificate-wrapper');
    const info = reportDetails[lvlNum];
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    
    wrapper.style.display = 'block';
    wrapper.innerHTML = `
        <div class="cert-canvas">
            <div style="text-align:center"><img src="logo-araya.png" style="width:180px;"></div>
            <h1 style="text-align:center; color:#0056b3; font-size:24px;">LAPORAN ANALISIS KEPEMIMPINAN</h1>
            <p style="text-align:center">Diberikan kepada: <br><strong style="font-size:24px;">${userData.name}</strong></p>
            <div style="border-top:2px solid #0056b3; margin:15px 0;"></div>
            <h2 style="color:#0056b3; margin-bottom:5px;">${info.title}</h2>
            <div style="margin:20px 0; background:#f9f9f9; padding:20px; border-radius:10px;">
                <p><strong>Interpretasi Karakter:</strong> ${info.desc}</p>
                <p><strong>Rekomendasi Strategis:</strong> ${info.rec}</p>
            </div>
            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                <tr style="background:#0056b3; color:white;"><th style="padding:10px; border:1px solid #ddd;">Dimensi Kepemimpinan</th><th style="padding:10px; border:1px solid #ddd;">Skor Rata-rata</th></tr>
                ${questionsData.map(d => `<tr><td style="border:1px solid #ddd; padding:10px;">${d.name}</td><td style="border:1px solid #ddd; padding:10px; text-align:center; font-weight:bold;">${avgs[d.group]}</td></tr>`).join('')}
            </table>
            <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:flex-end;">
                <div>
                    <p>Tuban, ${dateStr}</p>
                    <img src="ttd.png" style="width:120px;">
                    <p><strong>Ali Mahfud</strong><br>Founder Araya Consulting</p>
                </div>
                <img src="logo-araya-wm.png" style="width:100px; opacity:0.1;">
            </div>
        </div>`;

    html2pdf().set({ margin:0, filename:`Laporan_Leadership_${userData.name}.pdf`, html2canvas:{scale:2, useCORS:true}, jsPDF:{format:'a4', orientation:'portrait'} }).from(wrapper).save().then(() => {
        wrapper.style.display = 'none';
    });
}
