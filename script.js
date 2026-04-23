// CONFIGURATION - Araya Leadership Strategic Assessment
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgqw0H2zSNeyG5ZOezlmUOvtERKuGacLGWTb7szPzIOZff21NlqppBMWQBeTeEl4Xf5Q/exec"; 
const WHATSAPP_NUMBER = "6285232526003"; 

const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", questions: ["1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.","2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.","3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.","4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.","5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."]},
    { level: 2, name: "Permission (Izin)", group: "L2", questions: ["6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.","7. Saya membangun kepercayaan dengan tim melalui komunikasi yang terbuka dan jujur.","8. Saya secara aktif mendengarkan dan menghargai masukan tim, meskipun berbeda dengan pandangan saya.","9. Saya berfokus untuk menciptakan lingkungan kerja yang positif dan kolaboratif.","10. Anggota tim saya bersedia memberikan usaha ekstra because hubungan baik kami."]},
    { level: 3, name: "Production (Produksi)", group: "L3", questions: ["11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil nyata.","12. Saya bertanggung jawab penuh atas hasil kerja tim, baik keberhasilan maupun kegagalan.","13. Tim saya memiliki momentum yang kuat dan termotivasi oleh keberhasilan yang diraih.","14. Saya menetapkan standar kinerja yang tinggi dengan memberikan teladan hasil kerja nyata.","15. Kredibilitas saya di organisasi didasarkan pada prestasi yang saya capai."]},
    { level: 4, name: "People Development", group: "L4", questions: ["16. Saya secara rutin menyediakan waktu untuk melatih dan membimbing anggota tim agar berkembang.","17. Anggota tim yang saya bimbing sering kali berhasil dipromosikan atau memimpin unit baru.","18. Saya berinvestasi dalam pengembangan orang meskipun mereka mungkin akan pindah ke posisi lain.","19. Saya mendelegasikan tanggung jawab signifikan agar anggota tim tumbuh dalam kapasitas pemimpin.","20. Saya aktif mencari dan merekrut individu yang memiliki potensi besar untuk masa depan."]},
    { level: 5, name: "Pinnacle (Puncak)", group: "L5", questions: ["21. Pemimpin di luar tim sering mencari nasihat atau panduan strategis dari saya.","22. Kehadiran dan reputasi saya secara konsisten meningkatkan semangat organisasi.","23. Keputusan dan tindakan saya sesuai prinsip yang diyakini oleh organisasi.","24. Saya telah menciptakan budaya kepemimpinan yang tetap efektif meskipun saya tidak hadir.","25. Saya dikenal luas sebagai panutan yang inspiratif dengan integritas tinggi."]}
];

const reportDetails = {
    1: { title: "Level 1: Position (Jabatan)", desc: "Kepemimpinan didasarkan pada otoritas formal. Anggota tim mengikuti karena kewajiban kontrak kerja.", insight: "Level awal yang berisiko jika bertahan lama; tim cenderung bekerja dengan standar minimal.", kekuatan: "Struktur otoritas jelas, disiplin terhadap aturan dasar organisasi.", kelemahan: "Kurangnya loyalitas emosional; inovasi sulit muncul karena staf takut salah.", komunikasi: "Searah (Top-Down). Fokus pada instruksi dan kepatuhan prosedur.", rec: "Luangkan waktu mengenal staf secara personal. Berhenti mengandalkan jabatan." },
    2: { title: "Level 2: Permission (Hubungan)", desc: "Anda memimpin melalui hubungan baik. Orang-orang mengikuti karena mereka ingin (sukarela).", insight: "Lingkungan kerja menyenangkan dan kepercayaan mulai tumbuh kuat.", kekuatan: "Budaya harmonis, empati tinggi, komunikasi dua arah lancar.", kelemahan: "Seringkali sungkan menegur staf yang buruk demi menjaga perasaan.", komunikasi: "Dialogis dan suportif. Anda lebih banyak mendengar daripada memerintah.", rec: "Tetapkan standar kinerja yang jelas. Jangan biarkan keramahan menghambat hasil." },
    3: { title: "Level 3: Production (Hasil)", desc: "Anda memimpin melalui hasil nyata. Reputasi didasarkan pada prestasi bersama tim.", insight: "Fokus pada kemenangan melenyapkan masalah kecil. Anda adalah eksekutor handal.", kekuatan: "Kredibilitas tinggi, goal-oriented, mampu menciptakan momentum sukses.", kelemahan: "Risiko burnout jika terus mengejar target tanpa memperhatikan manusia.", komunikasi: "To-the-point dan fokus pada solusi. Menginspirasi melalui teladan hasil.", rec: "Delegasikan tanggung jawab penting agar tim merasa memiliki proyek." },
    4: { title: "Level 4: People Development", desc: "Fokus Anda adalah mencetak pemimpin baru. Anda dikenal sebagai mentor handal.", insight: "Kesuksesan diukur dari seberapa hebat orang yang Anda didik. Anda multiplier.", kekuatan: "Identifikasi potensi, pemberdayaan luar biasa, loyalitas jangka panjang.", kelemahan: "Sulit melepaskan kader terbaik untuk naik ke posisi lebih tinggi di unit lain.", komunikasi: "Coaching & Mentoring. Banyak bertanya untuk memicu pemikiran strategis.", rec: "Berikan otonomi penuh pada kader. Biarkan mereka mengambil keputusan strategis." },
    5: { title: "Level 5: Pinnacle (Puncak)", desc: "Memimpin melalui reputasi dan integritas teruji waktu. Anda adalah simbol organisasi.", insight: "Pengaruh melampaui posisi. Orang mengikuti karena jati diri dan nilai Anda.", kekuatan: "Visi jangka panjang tajam, integritas tak tergoyahkan, membangun legacy.", kelemahan: "Jarak komunikasi dengan frontliner bisa menjauh tanpa sistem aspirasi.", komunikasi: "Inspiratif dan filosofis. Fokus pada nilai inti dan warisan (legacy).", rec: "Fokus pada strategi tingkat tinggi dan kaderisasi direksi. Gunakan pengaruh skala luas." }
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
        </div>
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#999; margin-top:-10px; padding:0 10px;">
            <span>Sangat Tidak Setuju</span>
            <span>Sangat Setuju</span>
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

    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(mainLvlNum, avgs);

    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        cache: 'no-cache',
        body: JSON.stringify({ name: userData.name, phone: userData.phone, levelName: lvlName, avgScore: (sumTotal/5).toFixed(1) }) 
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
        document.getElementById('persuasive-call-to-action').innerHTML = "<b>Kode Valid! Menyiapkan Laporan Eksklusif...</b>";
        setTimeout(() => {
            generatePDF(window.currentLvlNum, window.currentAvgs);
            document.querySelector('.activation-box').classList.add('hidden');
            document.getElementById('cert-area').classList.remove('hidden');
        }, 1500);
    } else { alert("Kode Aktivasi Salah."); }
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
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    
    wrapper.style.display = 'block';
    wrapper.innerHTML = `
        <div id="pdf-container" style="width:1120px; height:790px; padding:30px; background:#fff; border:15px solid #0056b3; box-sizing:border-box; position:relative; font-family:'Arial', sans-serif; overflow:hidden; color: #1a1a1a;">
            
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.04; pointer-events:none; z-index:0; display:flex; flex-wrap:wrap; align-content:space-around; justify-content:space-around; transform: rotate(-25deg) scale(1.4); font-weight:bold;">
                ${Array(30).fill('ARAYA CONSULTING ').join(' ')}
            </div>

            <div style="text-align:center; position:relative; z-index:1; margin-bottom: 20px;">
                <img src="logo-araya.png" style="width:160px; margin-bottom: 5px;">
                <h2 style="margin:0; font-size:24px; letter-spacing:2px; border-bottom: 2px solid #333; display: inline-block; padding-bottom: 5px;">SERTIFIKAT ANALISIS LEADERSHIP</h2>
                <p style="margin:10px 0 5px 0; font-size:16px;">Diberikan kepada:</p>
                <h1 style="margin:0; font-size:38px; font-weight:bold; color:#000;">${userData.name.toUpperCase()}</h1>
                
                <div style="background:#1e293b; color:#fff; display:inline-block; padding:8px 40px; border-radius:8px; margin-top:15px; font-size:20px; font-weight:bold;">
                    ${info.title.toUpperCase()}
                </div>
            </div>

            <div style="display:flex; gap:50px; padding:0 20px; position:relative; z-index:1;">
                
                <div style="flex:1;">
                    <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Intisari Karakter:</h4>
                    <p style="font-size:13px; line-height:1.5; margin-bottom:15px; text-align:justify;">
                        ${info.desc} ${info.insight}
                    </p>

                    <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Kekuatan Utama:</h4>
                    <p style="font-size:13px; line-height:1.5; margin-bottom:15px;">
                        ${info.kekuatan}
                    </p>

                    <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Radar Kompetensi:</h4>
                    <div style="background:#fff; padding:10px; border:1px solid #ddd; border-radius:10px; text-align:center;">
                        <canvas id="pdfRadarChart" width="280" height="280"></canvas>
                    </div>
                </div>

                <div style="width:2px; background:#ddd; height:450px;"></div>

                <div style="flex:1;">
                    <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Gaya Komunikasi:</h4>
                    <p style="font-size:13px; line-height:1.5; margin-bottom:15px;">
                        ${info.komunikasi}
                    </p>

                    <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Area Pengembangan:</h4>
                    <p style="font-size:13px; line-height:1.5; margin-bottom:15px;">
                        ${info.kelemahan}
                    </p>

                    <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Rekomendasi Strategis 90 Hari:</h4>
                    <div style="background:#f8fafc; padding:12px; border-radius:8px; border:1px dashed #0056b3;">
                        <p style="font-size:13px; line-height:1.6; margin:0; font-style:italic;">
                            ${info.rec}
                        </p>
                    </div>

                    <div style="margin-top:25px;">
                        <h4 style="margin:0 0 5px 0; font-size:15px; color:#0056b3; text-transform:uppercase;">Dinamika Kepemimpinan:</h4>
                        <ul style="font-size:12px; padding-left:20px; line-height:1.4; color:#555;">
                            <li>Position: <b>${avgs.L1}</b></li>
                            <li>Permission: <b>${avgs.L2}</b></li>
                            <li>Production: <b>${avgs.L3}</b></li>
                            <li>People Development: <b>${avgs.L4}</b></li>
                            <li>Pinnacle: <b>${avgs.L5}</b></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style="position:absolute; bottom:40px; width:100%; left:0; padding:0 60px; box-sizing:border-box; display:flex; justify-content:space-between; align-items:flex-end; z-index:1;">
                <div style="font-size:13px; color:#666;">
                    <p style="margin:0;">ID Mindprint: <b>LEAD-${Math.floor(Date.now()/1000)}</b></p>
                    <p style="margin:2px 0;">Tanggal: <b>${dateStr}</b></p>
                    <p style="margin:0; font-weight:bold; color:#0056b3;">Araya Consulting - Your Growth Partner</p>
                </div>
                <div style="text-align:center;">
                    <p style="margin:0; font-size:14px;">Disahkan oleh,</p>
                    <img src="ttd.png" style="width:140px; margin: 5px 0;">
                    <p style="margin:0; font-weight:bold; font-size:18px; border-bottom:2px solid #000; display:inline-block;">ALI MAHFUD</p>
                    <p style="margin:3px 0 0 0; font-size:13px; color:#666;">Founder Araya Consulting</p>
                </div>
            </div>
        </div>`;

    const ctx = document.getElementById('pdfRadarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Position', 'Permission', 'Production', 'People Dev', 'Pinnacle'],
            datasets: [{
                label: 'Skor Kompetensi',
                data: Object.values(avgs),
                backgroundColor: 'rgba(0, 86, 179, 0.15)',
                borderColor: '#0056b3',
                pointBackgroundColor: '#0056b3',
                pointRadius: 4,
                borderWidth: 3
            }]
        },
        options: { 
            scales: { r: { min: 0, max: 5, ticks: { display: false }, grid: { color: '#e2e8f0' }, angleLines: { color: '#e2e8f0' }, pointLabels: { font: { size: 11, weight: 'bold' } } } },
            plugins: { legend: { display: false } }
        }
    });

    setTimeout(() => {
        const element = document.getElementById('pdf-container');
        html2pdf().from(element).set({
            margin: 0,
            filename: `Laporan_Leadership_Eksklusif_${userData.name}.pdf`,
            html2canvas: { scale: 2.5, useCORS: true, letterRendering: true },
            jsPDF: { unit: 'px', format: [1120, 790], orientation: 'landscape' }
        }).save().then(() => { 
            wrapper.style.display = 'none'; 
        });
    }, 1200);
}
