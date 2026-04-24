// CONFIGURATION
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgqw0H2zSNeyG5ZOezlmUOvtERKuGacLGWTb7szPzIOZff21NlqppBMWQBeTeEl4Xf5Q/exec"; 
const WHATSAPP_NUMBER = "6285232526003"; 

const questionsData = [
    { 
        level: 1, name: "Position (Kejelasan Sistem)", group: "L1", 
        questions: [
            "1. Seluruh operasional tim berjalan di atas garis koordinasi dan deskripsi pekerjaan yang tertulis jelas.",
            "2. Setiap anggota tim menjalankan tugas sesuai dengan standar aturan/kontrak kerja yang telah disepakati.",
            "3. Struktur organisasi memastikan tidak ada tumpang tindih wewenang antar departemen atau individu.",
            "4. Tim menunjukkan disiplin tinggi terhadap jadwal dan prosedur administrasi yang ditetapkan perusahaan.",
            "5. Saya memelihara sistem pengawasan yang menjamin instruksi strategis dipatuhi hingga level operasional."
        ]
    },
    { 
        level: 2, name: "Permission (Budaya Kepercayaan)", group: "L2", 
        questions: [
            "6. Anggota tim merasa nyaman untuk memberikan masukan jujur atau kritik kepada saya tanpa rasa takut.",
            "7. Tingkat perputaran karyawan (turnover) di tim saya sangat rendah karena mereka merasa dihargai.",
            "8. Hubungan antar level didasarkan pada rasa saling percaya, bukan karena tekanan jabatan.",
            "9. Saya mengenal dengan baik motivasi dan impian pribadi dari orang-orang kunci di tim saya.",
            "10. Tim bersedia memberikan usaha ekstra secara sukarela karena mereka percaya pada integritas saya."
        ]
    },
    { 
        level: 3, name: "Production (Kredibilitas Hasil)", group: "L3", 
        questions: [
            "11. Organisasi saya memiliki rekam jejak mencapai target pertumbuhan yang signifikan dalam 1 tahun terakhir.",
            "12. Saya memimpin dengan memberikan teladan performa tinggi yang nyata dan bisa ditiru oleh seluruh tim.",
            "13. Masalah besar terselesaikan dengan cepat karena adanya budaya yang fokus pada solusi hasil akhir.",
            "14. Tim saya merasa bangga karena organisasi ini dikenal sebagai 'tim pemenang' di bidangnya.",
            "15. Kredibilitas saya di mata tim dibangun di atas hasil nyata, bukan sekadar janji atau posisi."
        ]
    },
    { 
        level: 4, name: "People Development (Kaderisasi)", group: "L4", 
        questions: [
            "16. Saat ini ada minimal 2 orang di tim yang siap menggantikan peran saya kapanpun jika saya tidak ada.",
            "17. Saya menyediakan waktu dan anggaran khusus untuk melatih staf agar mereka bisa memimpin unitnya sendiri.",
            "18. Keberhasilan saya diukur dari berapa banyak anggota tim yang naik jabatan atau bertumbuh kapasitasnya.",
            "19. Saya mendelegasikan wewenang pengambilan keputusan strategis kepada kader potensial di dalam tim.",
            "20. Sistem regenerasi sudah berjalan sehingga kualitas organisasi tidak hanya bergantung pada sosok saya."
        ]
    },
    { 
        level: 5, name: "Pinnacle (Dampak & Legacy)", group: "L5", 
        questions: [
            "21. Reputasi kepemimpinan saya menjadi alasan utama talenta terbaik ingin bergabung dengan organisasi ini.",
            "22. Budaya kerja tetap unggul dan produktif meskipun saya tidak terlibat operasional selama berbulan-bulan.",
            "23. Saya telah melahirkan pemimpin baru yang saat ini juga sudah sukses mencetak pemimpin lainnya.",
            "24. Nilai-nilai integritas yang saya tanamkan tetap menjadi pedoman meskipun ada pergantian personil.",
            "25. Dampak kepemimpinan saya memberikan manfaat luas bagi industri atau lingkungan di luar bisnis saya."
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
    document.getElementById('quiz-header').innerHTML = `
        <p style="font-size:12px; color:#64748b; font-weight:600; text-transform:uppercase;">Asesmen ${currentQ + 1} / 25</p>
        <h4>${q.text}</h4>`;
    
    document.getElementById('questions-container').innerHTML = `
        <div class="options-grid">
            ${[1,2,3,4,5].map(v => `
                <label class="opt-label">
                    <input type="radio" name="q" value="${v}" ${userAnswers[q.id]==v?'checked':''} onchange="saveAnswer('${q.id}', ${v})">
                    <div class="opt-circle">${v}</div>
                </label>
            `).join('')}
        </div>
        <div style="display:flex; justify-content:space-between; font-size:11px; color:#94a3b8; padding:0 15px; font-weight:bold;">
            <span>SANGAT JARANG / TIDAK PERNAH</span>
            <span>SELALU / MENJADI BUDAYA</span>
        </div>`; 
    updateNav();
}

window.saveAnswer = function(id, val) { 
    userAnswers[id] = val; 
    updateNav(); 
};

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
    const lowThres = 3.8;  
    const highThres = 4.2; 

    if (avgs.L1 >= lowThres) {
        finalLevel = 1; 
        if (avgs.L2 >= lowThres) {
            finalLevel = 2;
            if (avgs.L3 >= highThres) {
                finalLevel = 3;
                if (avgs.L4 >= highThres) {
                    finalLevel = 4;
                    if (avgs.L5 >= highThres) {
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
                        <h4 style="margin:0 0 8px 0; font-size:14px; color:#28a745; text-transform:uppercase;">KEKUATAN UTAMA (+)</h4>
                        <p style="font-size:12px; line-height:1.5; color:#334155; margin:0;">${info.kekuatan}</p>
                    </div>
                    <div>
                        <h4 style="margin:0 0 8px 0; font-size:14px; color:#dc3545; text-transform:uppercase;">AREA PENGEMBANGAN (-)</h4>
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
