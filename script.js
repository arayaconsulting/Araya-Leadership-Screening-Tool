// CONFIGURATION - Araya Leadership Strategic Assessment
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgqw0H2zSNeyG5ZOezlmUOvtERKuGacLGWTb7szPzIOZff21NlqppBMWQBeTeEl4Xf5Q/exec"; 
const WHATSAPP_NUMBER = "6285232526003"; 

const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", questions: ["1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.","2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.","3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.","4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.","5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."]},
    { level: 2, name: "Permission (Izin)", group: "L2", questions: ["6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.","7. Saya membangun kepercayaan dengan tim melalui komunikasi yang terbuka dan jujur.","8. Saya secara aktif mendengarkan dan menghargai masukan tim, meskipun berbeda dengan pandangan saya.","9. Saya berfokus untuk menciptakan lingkungan kerja yang positif and kolaboratif.","10. Anggota tim saya bersedia memberikan usaha ekstra karena hubungan baik kami."]},
    { level: 3, name: "Production (Produksi)", group: "L3", questions: ["11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil nyata.","12. Saya bertanggung jawab penuh atas hasil kerja tim, baik keberhasilan maupun kegagalan.","13. Tim saya memiliki momentum yang kuat dan termotivasi oleh keberhasilan yang diraih.","14. Saya menetapkan standar kinerja yang tinggi dengan memberikan teladan hasil kerja nyata.","15. Kredibilitas saya di organisasi didasarkan pada pencapaian, bukan hanya posisi saya."]},
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

    let finalLevel = 1; 
    const threshold = 4.0; 
    for (let i = 1; i <= 5; i++) {
        if (parseFloat(avgs[`L${i}`]) >= threshold) { finalLevel = i; } 
        else { break; }
    }

    const lvlName = questionsData[finalLevel-1].name;
    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(finalLevel, avgs);

    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
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
        <div style="text-align:center; margin-bottom:15px; font-size:14px; color:#444; line-height:1.6;">
            Dapatkan <b>Laporan PDF Lengkap</b> yang berisi: <br>
            ✅ Analisis mendalam karakter Anda <br>
            ✅ Action Plan 90 Hari untuk naik level
        </div>`;
    renderChart(avgs);
    window.currentAvgs = avgs;
    window.currentLvlNum = lvlNum;
}

window.requestAccess = function() {
    const msg = `Halo Mas Ali Mahfud, saya *${userData.name}*. Saya ingin memesan Kode Aktivasi Laporan Leadership.\nNo HP: ${userData.phone}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
};

window.unlockCertificate = function() {
    const code = document.getElementById('access-code').value.toUpperCase();
    if(code.includes("AY") || code.includes("ARAYA")) {
        generatePDF(window.currentLvlNum, window.currentAvgs);
        document.querySelector('.activation-box').classList.add('hidden');
        document.getElementById('cert-area').classList.remove('hidden');
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
        <div id="pdf-container" style="width:794px; height:1122px; background:#fff; border:18px solid #0056b3; box-sizing:border-box; position:relative; font-family:Arial, sans-serif; color: #1a1a1a; overflow: hidden; display: flex; flex-direction: column; margin: 0 !important;">
            
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.02; pointer-events:none; z-index:0; display:flex; flex-wrap:wrap; align-content:space-around; justify-content:space-around; transform: rotate(-25deg) scale(1.2);">
                ${Array(12).fill('<img src="logo-araya.png" style="width:140px; margin:40px;">').join('')}
            </div>

            <div style="position:relative; z-index:1; padding: 40px; flex-grow: 1; display: flex; flex-direction: column;">
                <div style="text-align:center; margin-bottom: 25px;">
                    <img src="logo-araya.png" style="width:170px; margin: 0 auto 10px auto; display:block;">
                    <h2 style="margin:0; font-size:24px; letter-spacing:1px; border-bottom: 2px solid #333; display: inline-block; padding-bottom: 4px;">LAPORAN ANALISIS KEPEMIMPINAN</h2>
                    <p style="margin:15px 0 5px 0; font-size:16px;">Diberikan kepada:</p>
                    <h1 style="margin:0; font-size:42px; font-weight:bold; color:#000; text-transform: uppercase;">${userData.name}</h1>
                    <div style="background:#1e293b; color:#fff; display:inline-block; padding:10px 50px; border-radius:8px; margin-top:20px; font-size:20px; font-weight:bold;">
                        HASIL UTAMA: ${info.title.toUpperCase()}
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <h4 style="margin:0 0 5px 0; font-size:16px; color:#0056b3; text-transform:uppercase; border-bottom:1px solid #eee;">Leadership Insight:</h4>
                    <p style="font-size:14px; line-height:1.6; margin:0; text-align:justify;">${info.desc} ${info.insight}</p>
                </div>

                <div style="margin-bottom: 15px;">
                    <h4 style="margin:0 0 5px 0; font-size:16px; color:#0056b3; text-transform:uppercase; border-bottom:1px solid #eee;">Gaya Komunikasi:</h4>
                    <p style="font-size:14px; line-height:1.6; margin:0;">${info.komunikasi}</p>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 15px;">
                    <div>
                        <h4 style="margin:0 0 5px 0; font-size:16px; color:#28a745; text-transform:uppercase; border-bottom:1px solid #eee;">Kekuatan Utama (+):</h4>
                        <p style="font-size:13px; line-height:1.5;">${info.kekuatan}</p>
                    </div>
                    <div>
                        <h4 style="margin:0 0 5px 0; font-size:16px; color:#dc3545; text-transform:uppercase; border-bottom:1px solid #eee;">Area Pengembangan (-):</h4>
                        <p style="font-size:13px; line-height:1.5;">${info.kelemahan}</p>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <h4 style="margin:0 0 5px 0; font-size:16px; color:#d9534f; text-transform:uppercase; border-bottom:1px solid #eee;">Strategi Pengembangan 90 Hari:</h4>
                    <div style="background:#fffcf5; padding:15px; border-radius:10px; border:1px solid #ffeeba;">
                        <p style="font-size:14px; line-height:1.6; margin:0; font-style:italic; color: #856404;">${info.rec}</p>
                    </div>
                </div>

                <div style="flex-grow: 1;">
                    <h4 style="margin:0 0 5px 0; font-size:16px; color:#0056b3; text-transform:uppercase; border-bottom:1px solid #eee;">Dinamika Skor Kepemimpinan:</h4>
                    <table style="width:100%; font-size:14px; margin-top:10px; border-collapse: collapse;">
                        <tr style="border-bottom:1px solid #f2f2f2;"><td style="padding:6px 0;">Position (Level 1)</td><td style="text-align:right;"><b>${avgs.L1}</b></td></tr>
                        <tr style="border-bottom:1px solid #f2f2f2;"><td style="padding:6px 0;">Permission (Level 2)</td><td style="text-align:right;"><b>${avgs.L2}</b></td></tr>
                        <tr style="border-bottom:1px solid #f2f2f2;"><td style="padding:6px 0;">Production (Level 3)</td><td style="text-align:right;"><b>${avgs.L3}</b></td></tr>
                        <tr style="border-bottom:1px solid #f2f2f2;"><td style="padding:6px 0;">People Development (Level 4)</td><td style="text-align:right;"><b>${avgs.L4}</b></td></tr>
                        <tr style="border-bottom:1px solid #f2f2f2;"><td style="padding:6px 0;">Pinnacle (Level 5)</td><td style="text-align:right;"><b>${avgs.L5}</b></td></tr>
                    </table>
                </div>

                <div style="margin-top:20px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:12px; color:#666;">
                        <p style="margin:0;">ID Laporan: <b>LEAD-${Math.floor(Date.now()/1000)}</b></p>
                        <p style="margin:3px 0;">Tanggal: <b>${dateStr}</b></p>
                        <p style="margin:0; font-weight:bold; color:#0056b3;">Araya Consulting - Your Growth Partner</p>
                    </div>
                    <div style="text-align:center;">
                        <p style="margin:0; font-size:14px; color:#333;">Disahkan secara digital,</p>
                        <img src="ttd.png" style="width:140px; margin: 5px auto; display:block;">
                        <p style="margin:0; font-weight:bold; font-size:18px; border-top:2px solid #000; display:inline-block; padding: 0 15px;">ALI MAHFUD</p>
                        <p style="margin:2px 0 0 0; font-size:12px; color:#666; font-weight:bold;">Founder Araya Consulting</p>
                    </div>
                </div>
            </div>
        </div>`;

    setTimeout(() => {
        const element = document.getElementById('pdf-container');
        const opt = {
            margin: 0,
            filename: 'Laporan_Leadership_' + userData.name + '.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 3, 
                useCORS: true, 
                scrollY: -window.scrollY, 
                x: 0,
                y: 0,
                scrollX: 0,
                windowWidth: document.documentElement.offsetWidth,
                windowHeight: document.documentElement.offsetHeight
            },
            jsPDF: { unit: 'px', format: [794, 1122], orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save().then(() => { 
            wrapper.style.display = 'none'; 
        });
    }, 1000);
}
