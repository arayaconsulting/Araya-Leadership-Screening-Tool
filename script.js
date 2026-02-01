// Data Pertanyaan & Jawaban Tetap Sama
const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", questions: ["1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.","2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.","3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.","4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.","5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."]},
    { level: 2, name: "Permission (Izin)", group: "L2", questions: ["6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.","7. Saya membangun kepercayaan dengan tim saya melalui komunikasi yang terbuka dan jujur.","8. Saya secara aktif mendengarkan dan menghargai masukan tim, bahkan jika berbeda dengan pandangan saya.","9. Saya berfokus untuk menciptakan lingkungan kerja yang positif dan kolaboratif.","10. Anggota tim saya bersedia memberikan usaha ekstra untuk saya karena hubungan pribadi kami."]},
    { level: 3, name: "Production (Produksi)", group: "L3", questions: ["11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil yang nyata.","12. Saya bertanggung jawab penuh atas hasil, baik keberhasilan maupun kegagalan.","13. Tim saya memiliki momentum yang kuat dan termotivasi oleh kesuksesan yang kami raih.","14. Saya menetapkan standar kinerja yang tinggi dan memberikan contoh yang baik.","15. Kredibilitas saya di organisasi didasarkan pada pencapaian, bukan hanya posisi saya."]},
    { level: 4, name: "People Development (Pengembangan Orang)", group: "L4", questions: ["16. Saya secara rutin menyediakan waktu untuk melatih dan membimbing anggota tim agar bisa menggantikan peran saya.","17. Anggota tim yang saya bimbing sering kali berhasil dipromosikan atau memimpin unit/proyek baru.","18. Saya berinvestasi dalam pengembangan orang bahkan jika itu berarti mereka akan pindah ke posisi yang lebih baik di luar tim saya.","19. Saya mendelegasikan tanggung jawab yang signifikan kepada anggota tim agar mereka tumbuh dan mengambil inisiatif kepemimpinan.","20. Saya aktif merekrut individu yang memiliki potensi besar, bukan hanya yang dapat memenuhi tugas saat ini."]},
    { level: 5, name: "Pinnacle (Puncak)", group: "L5", questions: ["21. Pemimpin di luar tim/departemen saya sering mencari nasihat atau panduan strategis dari saya.","22. Kehadiran dan reputasi saya secara konsisten meningkatkan semangat dan kinerja seluruh organisasi.","23. Keputusan dan tindakan saya selalu didasarkan pada prinsip yang diyakini oleh sebagian besar karyawan/stakeholder.","24. Saya telah menciptakan budaya atau sistem kepemimpinan yang akan tetap efektif setelah saya tidak lagi menjabat.","25. Saya dikenal luas di industri atau perusahaan sebagai panutan yang inspiratif dan memiliki integritas tinggi."]}
];

let userName = "";
let currentQuestionIndex = 0;
const allQuestionsFlat = [];
const userAnswers = {};
let myChart;

function initializeQuestions() {
    allQuestionsFlat.length = 0;
    let globalIndex = 0;
    questionsData.forEach(lvl => {
        lvl.questions.forEach(txt => {
            globalIndex++;
            allQuestionsFlat.push({ index: globalIndex, id: `Q${globalIndex}`, text: txt, levelGroup: lvl.group });
            userAnswers[`Q${globalIndex}`] = 0;
        });
    });
}

// FUNGSI MULAI: Memastikan halaman awal hilang total
function startTest() {
    const input = document.getElementById('user-name');
    if (input.value.trim() === "") return alert("Masukkan nama lengkap.");
    userName = input.value;
    document.getElementById('name-input-screen').classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
    initializeQuestions();
    renderCurrentQuestion();
}

function renderCurrentQuestion() {
    const container = document.getElementById('questions-container');
    const q = allQuestionsFlat[currentQuestionIndex];
    container.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <p style="color:#666;">Pertanyaan ${q.index} dari 25</p>
            <p style="font-size:18px; font-weight:bold; margin:15px 0;">${q.text}</p>
        </div>
        <div style="display:flex; justify-content:space-around; background:#f8f9fa; padding:15px; border-radius:10px;">
            ${[1,2,3,4,5].map(i => `<label><input type="radio" name="${q.id}" value="${i}" ${userAnswers[q.id]==i?'checked':''} onchange="saveAnswer('${q.id}', ${i})"> ${i}</label>`).join('')}
        </div>`;
    updateNavigation();
}

function saveAnswer(id, val) { userAnswers[id] = val; updateNavigation(); }

function updateNavigation() {
    const isAnswered = userAnswers[allQuestionsFlat[currentQuestionIndex].id] !== 0;
    document.getElementById('prev-btn').classList.toggle('hidden', currentQuestionIndex === 0);
    const isLast = currentQuestionIndex === 24;
    document.getElementById('next-btn').classList.toggle('hidden', isLast);
    document.getElementById('submit-btn').classList.toggle('hidden', !isLast);
    document.getElementById('next-btn').disabled = !isAnswered;
}

document.getElementById('next-btn').onclick = () => { currentQuestionIndex++; renderCurrentQuestion(); };
document.getElementById('prev-btn').onclick = () => { currentQuestionIndex--; renderCurrentQuestion(); };
document.getElementById('quiz-form').onsubmit = (e) => { e.preventDefault(); calculateResults(); };

// FUNGSI HASIL: Memastikan kuis hilang total
function calculateResults() {
    const avgs = {};
    questionsData.forEach(lvl => {
        const sum = allQuestionsFlat.filter(q => q.levelGroup === lvl.group).reduce((acc, q) => acc + userAnswers[q.id], 0);
        avgs[lvl.group] = (sum / 5).toFixed(1);
    });
    let mainLvlNum = 1;
    for(let i=5; i>=1; i--) { if(parseFloat(avgs[`L${i}`]) >= 4.0) { mainLvlNum = i; break; } }
    displayResults(mainLvlNum, avgs);
}

function displayResults(lvlNum, avgs) {
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('report-user-name-header').textContent = userName;
    
    const lvlName = questionsData[lvlNum-1].name;
    document.getElementById('level-result').innerHTML = `<h2 style="color:#007bff">Level Utama: ${lvlName}</h2>`;
    
    renderChart(avgs);
    renderTable(avgs);
    document.getElementById('download-cert-btn').onclick = () => generatePDF(lvlName, avgs);
}

// FUNGSI CETAK: Portrait A4 dalam satu halaman utuh
function generatePDF(lvlName, avgs) {
    const wrapper = document.getElementById('certificate-wrapper');
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    
    wrapper.innerHTML = `
        <div class="cert-canvas">
            <div style="text-align:center;"><img src="logo-araya.png" style="width:160px;"></div>
            <h1 style="text-align:center; font-size:24px; color:#0056b3; margin:20px 0;">LAPORAN HASIL ASESMEN KEPEMIMPINAN</h1>
            <p style="text-align:center;">Diberikan secara bangga kepada: <br><strong style="font-size:24px;">${userName}</strong></p>
            
            <div style="border-top:2px solid #0056b3; margin:15px 0;"></div>
            <div style="background:#f0f8ff; padding:15px; border-radius:10px; border:1px solid #b3e0ff; text-align:center;">
                <h2 style="margin:0; color:#0056b3;">Level Utama: ${lvlName}</h2>
            </div>

            <div style="margin-top:20px; font-size:14px; text-align:left;">
                <h3 style="color:#0056b3; font-size:16px;">Rangkuman Skor Detail:</h3>
                <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                    <thead><tr style="background:#007bff; color:white;">
                        <th style="padding:8px; border:1px solid #ddd;">Level</th><th style="padding:8px; border:1px solid #ddd;">Nama Level</th><th style="padding:8px; border:1px solid #ddd;">Skor</th>
                    </tr></thead>
                    <tbody>
                        ${questionsData.map(d => `<tr><td style="padding:8px; border:1px solid #ddd; text-align:center;">Level ${d.level}</td><td style="padding:8px; border:1px solid #ddd;">${d.name}</td><td style="padding:8px; border:1px solid #ddd; text-align:center;">${avgs[d.group]}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>

            <div style="margin-top:auto; width:100%; display:flex; justify-content:space-between; align-items:flex-end;">
                <div style="text-align:left;">
                    <p>Tuban, ${dateStr}</p>
                    <img src="ttd.png" style="width:120px; margin-bottom:-20px; display:block;">
                    <div style="border-top:1px solid #000; width:220px; padding-top:5px;"><strong>Founder Araya Consulting</strong></div>
                </div>
                <img src="logo-araya-wm.png" style="width:90px; opacity:0.3;">
            </div>
        </div>`;

    const opt = { 
        margin: 0, 
        filename: `Laporan_${userName}.pdf`, 
        html2canvas: { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };
    html2pdf().set(opt).from(wrapper).save();
}

// Fungsi Bantu: Chart & Table
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

function renderTable(avgs) {
    const tbody = document.querySelector('#score-table tbody');
    tbody.innerHTML = questionsData.map(d => `<tr><td>Level ${d.level}</td><td>${d.name}</td><td>${avgs[d.group]}</td></tr>`).join('');
}
