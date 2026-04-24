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
    1: { title: "Level 1: Position", desc: "Kepemimpinan Anda didasarkan pada hak jabatan formal. Orang mengikuti karena harus.", rec: "Mulailah melayani tim, bukan sekadar memerintah melalui otoritas jabatan." },
    2: { title: "Level 2: Permission", desc: "Anda memimpin melalui hubungan. Orang mengikuti karena mereka ingin secara sukarela.", rec: "Bangun standar kinerja yang jelas sambil tetap memelihara hubungan personal." },
    3: { title: "Level 3: Production", desc: "Anda memimpin melalui hasil nyata. Anda telah membangun kredibilitas eksekusi.", rec: "Jangan hanya fokus pada angka, mulailah melatih orang lain untuk melakukan apa yang Anda bisa." },
    4: { title: "Level 4: People Development", desc: "Fokus Anda adalah reproduksi. Anda mencetak pemimpin-pemimpin baru di tim.", rec: "Berdayakan mereka lebih luas untuk mengambil keputusan strategis tanpa Anda." },
    5: { title: "Level 5: Pinnacle", desc: "Level tertinggi. Orang mengikuti karena siapa diri Anda dan apa yang Anda wakili.", rec: "Fokus pada legacy dan pengaruh skala luas untuk kemajuan organisasi jangka panjang." }
};

let userData = { name: "", phone: "" };
let currentQ = 0;
const allQuestionsFlat = [];
const userAnswers = {};
let myChart;

// Flatten questions
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
    document.getElementById('quiz-header').innerHTML = `<p style="font-size:12px; color:#64748b; font-weight:600; text-transform:uppercase;">Pertanyaan ${currentQ + 1} dari 25</p><h4>${q.text}</h4>`;
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

window.saveAnswer = function(id, val) { userAnswers[id] = val; updateNav(); setTimeout(() => { if(currentQ < 24) { currentQ++; renderQuestion(); } }, 300); };

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
    questionsData.forEach(lvl => {
        const sum = allQuestionsFlat.filter(q => q.group === lvl.group).reduce((acc, q) => acc + (userAnswers[q.id] || 0), 0);
        avgs[lvl.group] = (sum / 5).toFixed(1);
    });

    let finalLevel = 1;
    for (let i = 1; i <= 5; i++) { if (avgs[`L${i}`] >= 4.0) finalLevel = i; else break; }

    document.getElementById('quiz-content').classList.add('hidden');
    displayResults(finalLevel, avgs);
};

function displayResults(lvlNum, avgs) {
    document.getElementById('results').classList.remove('hidden');
    const info = reportDetails[lvlNum];
    document.getElementById('level-result-summary').innerHTML = `
        <div style="text-align:center; padding-bottom:20px;">
            <p style="font-size:14px; margin-bottom:5px;">Hasil Analisis Kepemimpinan:</p>
            <h2 style="color:#0056b3; margin:0; font-size:24px;">${info.title}</h2>
        </div>`;

    document.getElementById('persuasive-call-to-action').innerHTML = `
        <p style="font-size:14px; color:#92400e; line-height:1.5;">
            <b>${userData.name.split('')[0]}</b>, Anda berada di ambang transformasi. Dapatkan Action Plan 90 hari untuk mencapai Level tertinggi.
        </p>`;

    renderChart(avgs);
    window.currentResults = { lvlNum, avgs };
}

function renderChart(avgs) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['L1', 'L2', 'L3', 'L4', 'L5'],
            datasets: [{ label: 'Skor', data: Object.values(avgs), backgroundColor: '#0056b3', borderRadius: 8 }]
        },
        options: { scales: { y: { min: 0, max: 5 } }, plugins: { legend: { display: false } } }
    });
}

window.requestAccess = function() {
    const msg = `Halo Mas Ali, saya *${userData.name}*. Ingin memesan Kode Aktivasi Laporan Leadership.\nNo HP: ${userData.phone}`;
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

// ELEGAN PDF GENERATION
async function generatePDF() {
    const { lvlNum, avgs } = window.currentResults;
    const info = reportDetails[lvlNum];
    const wrapper = document.getElementById('certificate-wrapper');
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});

    wrapper.innerHTML = `
        <div id="pdf-content" style="width:794px; height:1123px; background:white; padding:60px; box-sizing:border-box; font-family:'Inter', sans-serif; position:relative; border:20px solid #0056b3;">
            <div style="position:absolute; top:0; left:0; right:0; height:10px; background:#c5a059;"></div>
            
            <div style="text-align:center;">
                <img src="logo-araya.png" style="width:180px; margin-bottom:40px;">
                <h3 style="letter-spacing:4px; color:#64748b; font-weight:400; margin-bottom:10px;">LAPORAN ANALISIS</h3>
                <h1 style="font-size:42px; color:#1e293b; margin:0; font-weight:700;">KEPEMIMPINAN</h1>
            </div>

            <div style="margin:60px 0; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; padding:30px 0; text-align:center;">
                <p style="font-size:18px; color:#64748b; margin-bottom:10px;">Diberikan Kepada:</p>
                <h2 style="font-size:36px; color:#0056b3; margin:0; text-transform:uppercase;">${userData.name}</h2>
            </div>

            <div style="background:#f8fafc; padding:30px; border-radius:15px; margin-bottom:40px;">
                <h4 style="color:#c5a059; margin-top:0; text-transform:uppercase; letter-spacing:1px;">Hasil Utama: ${info.title}</h4>
                <p style="line-height:1.8; color:#334155; font-size:16px;">${info.desc}</p>
            </div>

            <div style="margin-bottom:40px;">
                <h4 style="color:#0056b3; border-bottom:2px solid #0056b3; display:inline-block; padding-bottom:5px;">STRATEGI PENGEMBANGAN</h4>
                <p style="line-height:1.8; font-style:italic; color:#475569;">"${info.rec}"</p>
            </div>

            <table style="width:100%; border-collapse:collapse; margin-top:40px;">
                <tr>
                    <td style="width:60%;">
                        <p style="font-size:12px; color:#94a3b8;">ID Laporan: LEAD-${Date.now()}</p>
                        <p style="font-size:14px; color:#1e293b;">Tanggal Analisis: <b>${dateStr}</b></p>
                    </td>
                    <td style="text-align:center;">
                        <p style="font-size:14px; margin-bottom:10px;">Disahkan secara digital,</p>
                        <img src="ttd.png" style="width:120px; margin-bottom:5px;">
                        <div style="border-top:1.5px solid #1e293b; width:180px; margin:0 auto; padding-top:5px;">
                            <b>ALI MAHFUD</b><br><span style="font-size:11px;">Founder Araya Consulting</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `;

    // PASTI UNDUH DI HP: Menggunakan Blobs
    setTimeout(async () => {
        const element = document.getElementById('pdf-content');
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
        
        // Triggers direct download in mobile browsers
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Leadership_Report_${userData.name.replace(/\s/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1000);
}
