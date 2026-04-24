// CONFIGURATION
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

questionsData.forEach(lvl => {
    lvl.questions.forEach((txt, i) => {
        allQuestionsFlat.push({ id: `${lvl.group}_${i}`, text: txt, group: lvl.group });
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
    document.getElementById('progress-bar').style.width = `${((currentQ + 1) / 25) * 100}%`;
    document.getElementById('quiz-header').innerHTML = `<p style="font-size:12px; color:#64748b; font-weight:600; text-transform:uppercase;">Asesmen ${currentQ + 1} / 25</p><h4>${q.text}</h4>`;
    document.getElementById('questions-container').innerHTML = `
        <div class="options-grid">
            ${[1,2,3,4,5].map(v => `
                <label class="opt-label">
                    <input type="radio" name="q" value="${v}" ${userAnswers[q.id]==v?'checked':''} onchange="saveAnswer('${q.id}', ${v})">
                    <div class="opt-circle">${v}</div>
                </label>
            `).join('')}
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8; padding:0 5px;">
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
        const sum = allQuestionsFlat.filter(q => q.group === lvl.group).reduce((acc, q) => acc + (userAnswers[q.id] || 0), 0);
        avgs[lvl.group] = (sum / 5).toFixed(1);
        sumTotal += parseFloat(avgs[lvl.group]);
    });

    let finalLevel = 1;
    for (let i = 1; i <= 5; i++) { if (avgs[`L${i}`] >= 4.0) finalLevel = i; else break; }

    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: JSON.stringify({ name: userData.name, phone: userData.phone, levelName: questionsData[finalLevel-1].name, avgScore: (sumTotal/5).toFixed(1) }) 
    });

    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(finalLevel, avgs);
};

function displayResults(lvlNum, avgs) {
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('level-result-summary').innerHTML = `
        <div style="text-align:center; padding-bottom:15px;">
            <h2 style="color:#0056b3; margin:0; font-size:22px;">Skor Berhasil Dianalisis</h2>
            <p style="font-size:14px; color:#64748b;">Dinamika Kapasitas Kepemimpinan Anda</p>
        </div>`;

    document.getElementById('persuasive-call-to-action').innerHTML = `
        <div style="text-align:left; background:#fffcf0; border:1px solid #fde68a; padding:15px; border-radius:12px;">
            <p style="font-size:14px; color:#92400e; margin:0; line-height:1.6;">
                Bapak/Ibu <b>${userData.name}</b>, grafik menunjukkan potensi besar Anda. 
                Dapatkan <b>Laporan PDF Eksklusif</b> yang berisi analisis mendalam karakter Anda serta <b>Action Plan 90 Hari</b> untuk mencapai level kepemimpinan tertinggi (Pinnacle).
            </p>
        </div>`;

    renderChart(avgs);
    window.currentResults = { lvlNum, avgs };
}

function renderChart(avgs) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['L1', 'L2', 'L3', 'L4', 'L5'],
            datasets: [{ label: 'Skor', data: Object.values(avgs), backgroundColor: '#0056b3', borderRadius: 5 }]
        },
        options: { indexAxis: 'y', scales: { x: { min: 0, max: 5 } }, plugins: { legend: { display: false } } }
    });
}

window.requestAccess = function() {
    const msg = `Halo Mas Ali Mahfud, saya *${userData.name}*. Ingin memesan Kode Aktivasi Laporan Leadership.\nNo HP: ${userData.phone}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
};

window.unlockCertificate = function() {
    const code = document.getElementById('access-code').value.toUpperCase();
    
    // SISTEM 1 KODE 1x PAKAI (Client Side Lock)
    const usedCodes = JSON.parse(localStorage.getItem('araya_used_codes') || "[]");
    if(usedCodes.includes(code)) {
        alert("Maaf, Kode ini sudah pernah digunakan.");
        return;
    }

    if(code.includes("AY") || code.includes("ARAYA")) {
        usedCodes.push(code);
        localStorage.setItem('araya_used_codes', JSON.stringify(usedCodes));
        
        generatePDF();
        document.querySelector('.premium-box').classList.add('hidden');
        document.getElementById('cert-area').classList.remove('hidden');
    } else { alert("Kode Aktivasi Salah."); }
};

async function generatePDF() {
    const { lvlNum, avgs } = window.currentResults;
    const info = reportDetails[lvlNum];
    const wrapper = document.getElementById('certificate-wrapper');
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    const reportID = `LEAD-${Date.now()}`;

    wrapper.innerHTML = `
        <div id="pdf-content" style="width:794px; height:1123px; background:white; padding:0; box-sizing:border-box; font-family:Arial, sans-serif; position:relative; border:1px solid #eee; display:flex; flex-direction:column;">
            
            <div style="position:absolute; top:0; left:0; width:100%; height:15px; background: linear-gradient(90deg, #0056b3, #c5a059);"></div>
            <div style="position:absolute; top:15px; left:30px; width:5px; height:150px; background:#0056b3;"></div>

            <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.03; pointer-events:none; z-index:0; display:flex; flex-wrap:wrap; align-content:space-around; justify-content:space-around; transform: rotate(-25deg) scale(1.2);">
                ${Array(16).fill('<img src="logo-araya.png" style="width:140px; margin:40px;">').join('')}
            </div>

            <div style="position:relative; z-index:1; padding: 60px; flex-grow:1; display:flex; flex-direction:column;">
                <div style="text-align:center; margin-bottom:40px;">
                    <img src="logo-araya.png" style="width:190px; margin: 0 auto 20px auto; display:block;">
                    <h3 style="letter-spacing:5px; color:#64748b; font-size:14px; margin-bottom:10px; font-weight:normal;">LAPORAN ANALISIS STRATEGIS</h3>
                    <h1 style="font-size:32px; color:#1e293b; margin:0; font-weight:bold; border-bottom:2px solid #0056b3; display:inline-block; padding-bottom:10px;">KEPEMIMPINAN</h1>
                </div>

                <div style="text-align:center; margin-bottom:40px;">
                    <p style="font-size:16px; color:#64748b; margin-bottom:5px;">Diberikan Kepada:</p>
                    <h2 style="font-size:36px; color:#000; margin:0; text-transform:uppercase; letter-spacing:1px;">${userData.name}</h2>
                </div>

                <div style="background:#1e293b; color:white; padding:20px; border-radius:12px; margin-bottom:30px; text-align:center; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    <p style="margin:0; font-size:14px; opacity:0.8; letter-spacing:2px;">HASIL EVALUASI UTAMA:</p>
                    <h2 style="margin:5px 0 0 0; font-size:24px; color:#c5a059;">${info.title.toUpperCase()}</h2>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; margin-bottom:25px;">
                    <div style="background:#f8fafc; padding:20px; border-radius:10px; border-left:4px solid #0056b3;">
                        <h4 style="margin:0 0 10px 0; font-size:14px; color:#0056b3;">LEADERSHIP INSIGHT</h4>
                        <p style="font-size:13px; line-height:1.6; margin:0; color:#334155; text-align:justify;">${info.desc} ${info.insight}</p>
                    </div>
                    <div style="background:#f8fafc; padding:20px; border-radius:10px; border-left:4px solid #0056b3;">
                        <h4 style="margin:0 0 10px 0; font-size:14px; color:#0056b3;">GAYA KOMUNIKASI</h4>
                        <p style="font-size:13px; line-height:1.6; margin:0; color:#334155;">${info.komunikasi}</p>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; margin-bottom:25px;">
                    <div>
                        <h4 style="margin:0 0 8px 0; font-size:13px; color:#28a745; text-transform:uppercase;">Kekuatan Utama (+)</h4>
                        <p style="font-size:12px; line-height:1.5; color:#475569; margin:0;">${info.kekuatan}</p>
                    </div>
                    <div>
                        <h4 style="margin:0 0 8px 0; font-size:13px; color:#dc3545; text-transform:uppercase;">Area Pengembangan (-)</h4>
                        <p style="font-size:12px; line-height:1.5; color:#475569; margin:0;">${info.kelemahan}</p>
                    </div>
                </div>

                <div style="background:#fffcf0; padding:20px; border-radius:10px; border:1px solid #fde68a; margin-bottom:30px;">
                    <h4 style="margin:0 0 8px 0; font-size:14px; color:#92400e;">STRATEGI PENGEMBANGAN 90 HARI</h4>
                    <p style="font-size:13px; line-height:1.6; font-style:italic; color:#78350f; margin:0;">"${info.rec}"</p>
                </div>

                <div style="flex-grow:1;">
                    <h4 style="margin:0 0 10px 0; font-size:13px; color:#64748b; border-bottom:1px solid #eee; padding-bottom:5px;">DINAMIKA SKOR KEPEMIMPINAN:</h4>
                    <table style="width:100%; font-size:12px; border-collapse:collapse;">
                        ${Object.keys(avgs).map((key, i) => `
                            <tr style="border-bottom:1px solid #f1f5f9;">
                                <td style="padding:6px 0; color:#475569;">Level ${i+1}: ${questionsData[i].name}</td>
                                <td style="text-align:right; font-weight:bold; color:#1e293b;">${avgs[key]}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>

                <div style="margin-top:40px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:10px; color:#94a3b8; line-height:1.6;">
                        <p style="margin:0;">Report ID: <b>${reportID}</b></p>
                        <p style="margin:0;">Analysis Date: <b>${dateStr}</b></p>
                        <p style="margin:5px 0 0 0; font-weight:bold; color:#0056b3; font-size:11px;">Araya Consulting - Your Growth Partner</p>
                    </div>
                    <div style="text-align:center;">
                        <p style="margin:0 0 5px 0; font-size:12px; color:#334155;">Disahkan secara digital,</p>
                        <div style="height:70px; display:flex; align-items:center; justify-content:center;">
                            <img src="ttd.png" style="width:120px;">
                        </div>
                        <div style="border-top:1.5px solid #000; width:180px; margin:5px auto 0 auto; padding-top:5px;">
                            <b style="font-size:15px; color:#000;">ALI MAHFUD</b><br>
                            <span style="font-size:11px; color:#64748b; font-weight:bold;">Founder Araya Consulting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    setTimeout(async () => {
        const element = document.getElementById('pdf-content');
        const canvas = await html2canvas(element, { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            y: 0,
            scrollY: 0 
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        pdf.save(`Leadership_Report_${userData.name.replace(/\s+/g, '_')}.pdf`);
        wrapper.style.display = 'none';
    }, 1000);
}
