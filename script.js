// CONFIGURATION
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgqw0H2zSNeyG5ZOezlmUOvtERKuGacLGWTb7szPzIOZff21NlqppBMWQBeTeEl4Xf5Q/exec"; 
const WHATSAPP_NUMBER = "6285232526003"; 

const questionsData = [
    { 
        level: 1, 
        name: "Position (Pondasi Administrasi)", 
        group: "L1", 
        questions: [
            "1. Operasional di organisasi saya dipandu oleh struktur organisasi dan pembagian wewenang yang terdokumentasi secara tertulis.",
            "2. Kebijakan perusahaan dan kontrak kerja menjadi dasar utama bagi setiap anggota tim dalam menjalankan aktivitas profesionalnya.",
            "3. Setiap anggota tim memahami batasan tanggung jawab mereka sesuai dengan aturan formal yang berlaku di organisasi.",
            "4. Ketertiban operasional terjaga karena adanya sistem pengawasan yang memastikan standar prosedur dipatuhi dengan baik.",
            "5. Saya memastikan wewenang kepemimpinan tetap dihormati guna menjamin stabilitas organisasi."
        ]
    },
    { 
        level: 2, 
        name: "Permission (Budaya Kepercayaan)", 
        group: "L2", 
        questions: [
            "6. Budaya organisasi saya memungkinkan setiap anggota tim merasa nyaman untuk menyampaikan masukan secara jujur kepada pemimpin.",
            "7. Tingkat loyalitas anggota tim saya sangat tinggi, bukan karena keterpaksaan, melainkan karena rasa memiliki terhadap organisasi.",
            "8. Hubungan antar level di organisasi saya didasarkan pada rasa saling percaya dan komunikasi yang terbuka.",
            "9. Saya memelihara lingkungan kerja yang suportif, di mana setiap individu merasa dihargai kontribusinya secara personal.",
            "10. Interaksi di organisasi saya tetap terasa hangat dan manusiawi di tengah tuntutan target pekerjaan yang profesional."
        ]
    },
    { 
        level: 3, 
        name: "Production (Kredibilitas Hasil)", 
        group: "L3", 
        questions: [
            "11. Organisasi saya memiliki sejarah pencapaian target strategis yang konsisten dalam kurun waktu 12 bulan terakhir.",
            "12. Masalah besar dalam organisasi terselesaikan dengan cepat karena adanya budaya yang berorientasi pada pencarian solusi.",
            "13. Tim saya diakui sebagai unit yang sangat produktif dan memberikan dampak ekonomi nyata bagi bisnis.",
            "14. Anggota tim merasa percaya diri karena berada di bawah kepemimpinan yang sudah terbukti mampu memenangkan persaingan.",
            "15. Saya selalu memastikan bahwa standar kualitas hasil kerja di organisasi saya adalah yang terbaik di kelasnya."
        ]
    },
    { 
        level: 4, 
        name: "People Development (Investasi Kaderisasi)", 
        group: "L4", 
        questions: [
            "16. Saat ini terdapat sistem kaderisasi yang mampu melahirkan pemimpin-pemimpin baru di dalam organisasi saya secara mandiri.",
            "17. Saya mengalokasikan sumber daya organisasi secara khusus untuk meningkatkan kapasitas dan kompetensi anggota tim.",
            "18. Anggota tim saya diberikan ruang untuk memimpin proyek strategis guna mengasah kemampuan pengambilan keputusan mereka.",
            "19. Keberhasilan kepemimpinan saya diukur dari banyaknya jumlah staf yang naik jabatan atau bertumbuh kapasitasnya.",
            "20. Regenerasi pemimpin adalah prioritas utama yang saya pantau perkembangannya secara berkala di semua level."
        ]
    },
    { 
        level: 5, 
        name: "Pinnacle (Dampak & Legacy)", 
        group: "L5", 
        questions: [
            "21. Organisasi saya memiliki daya tarik tinggi bagi talenta terbaik di luar sana karena reputasi kepemimpinan yang saya bangun.",
            "22. Bisnis dan budaya kerja saya tetap berjalan unggul dan mandiri meskipun saya tidak terlibat secara operasional.",
            "23. Saya telah berhasil membangun 'Ekosistem Pemimpin', di mana para pemimpin yang saya cetak kini telah mendidik pemimpin lainnya.",
            "24. Keputusan-keputusan besar yang saya ambil selalu berlandaskan pada prinsip integritas jangka panjang yang kuat.",
            "25. Warisan kepemimpinan saya memberikan dampak positif bagi industri atau masyarakat luas di luar batas organisasi saya."
        ]
    }
];

const reportDetails = {
    1: { title: "Level 1: Position (Jabatan)", desc: "Kepemimpinan didasarkan pada otoritas formal. Anggota tim mengikuti karena kewajiban kontrak kerja.", insight: "Level awal yang berisiko jika bertahan lama; tim cenderung bekerja dengan standar minimal.", kekuatan: "Struktur otoritas jelas, disiplin terhadap aturan dasar organisasi.", kelemahan: "Kurangnya loyalitas emosional; inovasi sulit muncul karena staf takut salah.", komunikasi: "Searah (Top-Down). Fokus pada instruksi dan kepatuhan prosedur.", rec: "Luangkan waktu mengenal staf secara personal. Berhenti mengandalkan jabatan." },
    2: { title: "Level 2: Permission (Hubungan)", desc: "Anda memimpin melalui hubungan baik. Orang-orang mengikuti karena mereka ingin (sukarela).", insight: "Lingkungan kerja menyenangkan dan kepercayaan mulai tumbuh kuat.", kekuatan: "Budaya harmonis, empati tinggi, komunikasi dua arah lancar.", kelemahan: "Seringkali sungkan menegur staf yang buruk demi menjaga perasaan.", komunikasi: "Dialogis dan suportif. Anda lebih banyak mendengar daripada memerintah.", rec: "Tetapkan standar kinerja yang jelas. Jangan biarkan keramahan menghambat hasil." },
    3: { title: "Level 3: Production (Hasil)", desc: "Anda memimpin melalui hasil nyata. Reputasi didasarkan pada prestasi bersama tim.", insight: "Fokus pada kemenangan melenyapkan masalah kecil. Anda adalah eksekutor handal.", kekuatan: "Kredibilitas tinggi, goal-oriented, mampu menciptakan momentum sukses.", kelemahan: "Risiko burnout jika terus mengejar target tanpa memperhatikan manusia.", komunikasi: "To-the-point dan fokus pada solusi. Menginspirasi melalui teladan hasil.", rec: "Delegasikan tanggung jawab penting agar tim merasa memiliki proyek." },
    4: { title: "Level 4: People Development", desc: "Fokus Anda adalah mencetak pemimpin baru. Anda dikenal sebagai mentor handal.", insight: "Kesuksesan diukur dari seberapa hebat orang yang Anda didik. Anda multiplier.", kekuatan: "Identifikasi potensi, pemberdayaan luar biasa, loyalitas jangka panjang.", kelemahan: "Sulit melepaskan kader terbaik untuk naik ke posisi lebih tinggi di unit lain.", komunikasi: "Coaching & Mentoring. Banyak bertanya untuk memicu pemikiran strategis.", rec: "Berikan otonomi penuh pada kader. Biarkan mereka mengambil keputusan strategis." },
    5: { title: "Level 5: Pinnacle", desc: "Memimpin melalui reputasi dan integritas teruji waktu. Anda adalah simbol organisasi.", insight: "Pengaruh melampaui posisi. Orang mengikuti karena jati diri dan nilai Anda.", kekuatan: "Visi jangka panjang tajam, integritas tak tergoyahkan, membangun legacy.", kelemahan: "Jarak komunikasi dengan frontliner bisa menjauh tanpa sistem aspirasi.", komunikasi: "Inspiratif dan filosofis. Fokus pada nilai inti dan warisan (legacy).", rec: "Fokus pada strategi tingkat tinggi dan kaderisasi direksi. Gunakan pengaruh skala luas." }
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
        const sum = allQuestionsFlat
            .filter(q => q.group === lvl.group)
            .reduce((acc, q) => acc + (userAnswers[q.id] || 0), 0);
        
        avgs[lvl.group] = parseFloat((sum / 5).toFixed(1));
        sumTotal += avgs[lvl.group];
    });

    let finalLevel = 1;
    const threshold = 4.0;

    if (avgs.L1 >= threshold) {
        finalLevel = 1;
        if (avgs.L2 >= threshold) {
            finalLevel = 2;
            if (avgs.L3 >= threshold) {
                finalLevel = 3;
                if (avgs.L4 >= threshold) {
                    finalLevel = 4;
                    if (avgs.L5 >= threshold) {
                        finalLevel = 5;
                    }
                }
            }
        }
    } else {
        finalLevel = 1;
    }

    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: JSON.stringify({ 
            name: userData.name, 
            phone: userData.phone, 
            levelName: questionsData[finalLevel - 1].name, 
            avgScore: (sumTotal / 5).toFixed(1),
            action: "save_score"
        }) 
    });

    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(finalLevel, avgs);
};

function displayResults(lvlNum, avgs) {
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('level-result-summary').innerHTML = `
        <div style="text-align:center; padding-bottom:15px;">
            <h2 style="color:#0056b3; margin:0; font-size:22px;">Analisis Skor Berhasil</h2>
            <p style="font-size:14px; color:#64748b;">Lihat dinamika kepemimpinan Anda pada grafik di bawah ini.</p>
        </div>`;

    document.getElementById('persuasive-call-to-action').innerHTML = `
        <div style="text-align:left; background:#fffcf0; border-left:4px solid #d97706; padding:15px; border-radius:8px;">
            <p style="font-size:14px; color:#92400e; margin:0; line-height:1.6;">
                Bapak/Ibu <b>${userData.name}</b>, grafik menunjukkan kapasitas kepemimpinan Anda saat ini. 
                Untuk mengetahui <b>di level mana Anda berada</b> dan mendapatkan <b>Panduan Strategis 90 Hari</b> 
                guna mencapai level Pinnacle, silakan aktivasi laporan premium Anda.
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
        options: { 
            indexAxis: 'y',
            scales: { x: { min: 0, max: 5 } }, 
            plugins: { legend: { display: false } } 
        }
    });
}

window.requestAccess = function() {
    const msg = `Halo Mas Ali Mahfud, saya *${userData.name}*. Saya ingin aktivasi Kode Laporan Leadership Strategic Assessment.\nNo HP: ${userData.phone}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
};

window.unlockCertificate = function() {
    const code = document.getElementById('access-code').value.toUpperCase();
    if(code.includes("AY") || code.includes("ARAYA")) {
        generatePDF();
        document.querySelector('.premium-box').classList.add('hidden');
        document.getElementById('cert-area').classList.remove('hidden');
    } else { alert("Kode Aktivasi Salah."); }
};

async function generatePDF() {
    const { lvlNum, avgs } = window.currentResults;
    const info = reportDetails[lvlNum];
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    const reportID = `LEAD-${Date.now()}`;
    const wrapper = document.getElementById('certificate-wrapper');

    wrapper.style.display = 'block';
    wrapper.style.position = 'absolute';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    wrapper.style.zIndex = '9999';

    wrapper.innerHTML = `
        <div id="pdf-content" style="width:794px; height:1123px; background:white; padding:0; box-sizing:border-box; font-family:Arial, sans-serif; position:relative; border:1px solid #eee; display:flex; flex-direction:column;">
            
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.03; pointer-events:none; z-index:0; display:flex; flex-wrap:wrap; align-content:space-around; justify-content:space-around; transform: rotate(-25deg) scale(1.2);">
                ${Array(16).fill('<img src="logo-araya.png" style="width:140px; margin:40px;">').join('')}
            </div>

            <div style="position:absolute; top:0; left:0; width:100%; height:15px; background: linear-gradient(90deg, #1e293b, #c5a059);"></div>

            <div style="position:relative; z-index:1; padding: 50px; flex-grow:1; display:flex; flex-direction:column;">
                
                <div style="text-align:center; margin-bottom:30px;">
                    <img src="logo-araya.png" style="width:180px; margin: 0 auto 15px auto; display:block;">
                    <h2 style="margin:0; font-size:24px; letter-spacing:4px; color:#1e293b; border-bottom:2px solid #c5a059; display:inline-block; padding-bottom:5px;">LAPORAN ANALISIS KEPEMIMPINAN</h2>
                </div>

                <div style="text-align:center; margin-bottom:30px;">
                    <p style="margin:0; font-size:16px; color:#64748b;">Diberikan kepada:</p>
                    <h1 style="margin:5px 0; font-size:38px; font-weight:bold; color:#000; text-transform:uppercase; letter-spacing:1px;">${userData.name}</h1>
                    <div style="background:#1e293b; color:#c5a059; display:inline-block; padding:8px 30px; border-radius:5px; margin-top:10px; font-size:18px; font-weight:bold; letter-spacing:2px;">
                        HASIL UTAMA: ${info.title.toUpperCase()}
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; margin-bottom:20px;">
                    <div style="background:#f8fafc; padding:20px; border-radius:10px; border-left:4px solid #1e293b;">
                        <h4 style="margin:0 0 10px 0; color:#1e293b; font-size:14px; text-transform:uppercase; letter-spacing:1px;">Leadership Insight</h4>
                        <p style="font-size:13px; line-height:1.6; margin:0; text-align:justify;">${info.desc} ${info.insight}</p>
                    </div>
                    <div style="background:#f8fafc; padding:20px; border-radius:10px; border-left:4px solid #1e293b;">
                        <h4 style="margin:0 0 10px 0; color:#1e293b; font-size:14px; text-transform:uppercase; letter-spacing:1px;">Gaya Komunikasi</h4>
                        <p style="font-size:13px; line-height:1.6; margin:0;">${info.komunikasi}</p>
                    </div>
                </div>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:25px; margin-bottom:20px;">
                    <div>
                        <h4 style="margin:0 0 8px 0; font-size:14px; color:#28a745; text-transform:uppercase;">Kekuatan Utama (+)</h4>
                        <p style="font-size:12px; line-height:1.5; color:#334155; margin:0;">${info.kekuatan}</p>
                    </div>
                    <div>
                        <h4 style="margin:0 0 8px 0; font-size:14px; color:#dc3545; text-transform:uppercase;">Area Pengembangan (-)</h4>
                        <p style="font-size:12px; line-height:1.5; color:#334155; margin:0;">${info.kelemahan}</p>
                    </div>
                </div>

                <div style="margin-bottom:25px;">
                    <h4 style="margin:0 0 10px 0; font-size:14px; color:#d97706; text-transform:uppercase; letter-spacing:1px;">Strategi Pengembangan 90 Hari</h4>
                    <div style="background:#fffcf5; padding:15px; border-radius:8px; border:1px solid #fde68a;">
                        <p style="font-size:13px; font-style:italic; color:#92400e; margin:0; line-height:1.6;">"${info.rec}"</p>
                    </div>
                </div>

                <div style="flex-grow:1;">
                    <h4 style="margin:0 0 10px 0; color:#1e293b; font-size:13px; border-bottom:1px solid #eee; padding-bottom:5px;">DINAMIKA SKOR KEPEMIMPINAN:</h4>
                    <table style="width:100%; font-size:12px; border-collapse:collapse;">
                        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 0;">Position (L1)</td><td style="text-align:right;"><b>${avgs.L1}</b></td></tr>
                        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 0;">Permission (L2)</td><td style="text-align:right;"><b>${avgs.L2}</b></td></tr>
                        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 0;">Production (L3)</td><td style="text-align:right;"><b>${avgs.L3}</b></td></tr>
                        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 0;">People Development (L4)</td><td style="text-align:right;"><b>${avgs.L4}</b></td></tr>
                        <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:6px 0;">Pinnacle (L5)</td><td style="text-align:right;"><b>${avgs.L5}</b></td></tr>
                    </table>
                </div>

                <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:flex-end; padding-top:20px;">
                    <div style="font-size:11px; color:#64748b; line-height:1.6;">
                        <p style="margin:0;">Report ID: <b>${reportID}</b></p>
                        <p style="margin:0;">Analysis Date: <b>${dateStr}</b></p>
                        <p style="margin:5px 0 0 0; font-weight:bold; color:#0056b3; font-size:12px;">Araya Consulting - Your Growth Partner</p>
                    </div>
                    <div style="text-align:center;">
                        <p style="margin:0; font-size:13px; color:#1e293b;">Disahkan secara digital,</p>
                        <div style="height:70px; display:flex; align-items:center; justify-content:center;">
                            <img src="ttd.png" style="width:120px;">
                        </div>
                        <div style="border-top:1.5px solid #000; padding-top:5px; width:180px; margin:0 auto;">
                            <b style="font-size:16px;">ALI MAHFUD</b><br>
                            <span style="font-size:11px; color:#64748b;">Founder Araya Consulting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    await new Promise(r => setTimeout(r, 1500));

    try {
        const canvas = await html2canvas(document.getElementById('pdf-content'), { 
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
        
        pdf.save(`Laporan_Leadership_${userData.name.replace(/\s+/g, '_')}.pdf`);
        wrapper.style.display = 'none';
        
    } catch (err) {
        alert("Gagal mengunduh laporan. Silakan coba kembali.");
        console.error(err);
        wrapper.style.display = 'none';
    }
}
