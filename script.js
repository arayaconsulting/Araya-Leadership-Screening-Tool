const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", questions: [
        "1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.",
        "2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.",
        "3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.",
        "4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.",
        "5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."
    ]},
    { level: 2, name: "Permission (Izin)", group: "L2", questions: [
        "6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.",
        "7. Saya membangun kepercayaan dengan tim saya melalui komunikasi yang terbuka dan jujur.",
        "8. Saya secara aktif mendengarkan dan menghargai masukan tim, bahkan jika berbeda dengan pandangan saya.",
        "9. Saya berfokus untuk menciptakan lingkungan kerja yang positif dan kolaboratif.",
        "10. Anggota tim saya bersedia memberikan usaha ekstra untuk saya karena hubungan pribadi kami."
    ]},
    { level: 3, name: "Production (Produksi)", group: "L3", questions: [
        "11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil yang nyata.",
        "12. Saya bertanggung jawab penuh atas hasil, baik keberhasilan maupun kegagalan.",
        "13. Tim saya memiliki momentum yang kuat dan termotivasi oleh kesuksesan yang kami raih.",
        "14. Saya menetapkan standar kinerja yang tinggi dan memberikan contoh yang baik.",
        "15. Kredibilitas saya di organisasi didasarkan pada pencapaian, bukan hanya posisi saya."
    ]},
    { level: 4, name: "People Development (Pengembangan Orang)", group: "L4", questions: [
        "16. Saya secara rutin menyediakan waktu untuk melatih dan membimbing anggota tim agar bisa menggantikan peran saya.",
        "17. Anggota tim yang saya bimbing sering kali berhasil dipromosikan atau memimpin unit/proyek baru.",
        "18. Saya berinvestasi dalam pengembangan orang bahkan jika itu berarti mereka akan pindah ke posisi yang lebih baik di luar tim saya.",
        "19. Saya mendelegasikan tanggung jawab yang signifikan kepada anggota tim agar mereka tumbuh dan mengambil inisiatif kepemimpinan.",
        "20. Saya aktif merekrut individu yang memiliki potensi besar, bukan hanya yang dapat memenuhi tugas saat ini."
    ]},
    { level: 5, name: "Pinnacle (Puncak)", group: "L5", questions: [
        "21. Pemimpin di luar tim/departemen saya sering mencari nasihat atau panduan strategis dari saya.",
        "22. Kehadiran dan reputasi saya secara konsisten meningkatkan semangat dan kinerja seluruh organisasi.",
        "23. Keputusan dan tindakan saya selalu didasarkan pada prinsip yang diyakini oleh sebagian besar karyawan/stakeholder.",
        "24. Saya telah menciptakan budaya atau sistem kepemimpinan yang akan tetap efektif setelah saya tidak lagi menjabat.",
        "25. Saya dikenal luas di industri atau perusahaan sebagai panutan yang inspiratif dan memiliki integritas tinggi."
    ]}
];

let userName = "";
let currentQuestionIndex = 0;
const allQuestionsFlat = [];
const userAnswers = {};
let myChart;

function initializeQuestions() {
    allQuestionsFlat.length = 0;
    let globalIndex = 0;
    questionsData.forEach(levelData => {
        levelData.questions.forEach(qText => {
            globalIndex++;
            allQuestionsFlat.push({ index: globalIndex, id: `Q${globalIndex}`, text: qText, levelGroup: levelData.group });
            userAnswers[`Q${globalIndex}`] = userAnswers[`Q${globalIndex}`] || 0;
        });
    });
}

function startTest() {
    const input = document.getElementById('user-name');
    if (input.value.trim() === "") return alert("Mohon masukkan nama lengkap Anda.");
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
        <div class="question-group"><h3>Pertanyaan ${q.index} dari 25:</h3></div>
        <div class="question-item">
            <p style="font-size:18px; margin-bottom:20px;"><strong>${q.text}</strong></p>
            <div class="scale-options" style="display:flex; justify-content:space-around;">
                ${[1,2,3,4,5].map(i => `
                    <label style="display:flex; flex-direction:column; align-items:center; cursor:pointer;">
                        <input type="radio" name="${q.id}" value="${i}" ${userAnswers[q.id] == i ? 'checked' : ''} 
                               onchange="saveAnswer('${q.id}', ${i})" style="width:20px; height:20px;">
                        <span style="margin-top:5px; font-weight:bold;">${i}</span>
                    </label>
                `).join('')}
            </div>
        </div>`;
    updateNavigation();
}

function saveAnswer(id, val) {
    userAnswers[id] = val;
    updateNavigation();
}

function updateNavigation() {
    const isAnswered = userAnswers[allQuestionsFlat[currentQuestionIndex].id] !== 0;
    document.getElementById('prev-btn').classList.toggle('hidden', currentQuestionIndex === 0);
    const isLast = currentQuestionIndex === 24;
    
    document.getElementById('next-btn').classList.toggle('hidden', isLast);
    document.getElementById('submit-btn').classList.toggle('hidden', !isLast);
    
    document.getElementById('next-btn').disabled = !isAnswered;
    document.getElementById('submit-btn').disabled = !isAnswered;
}

// Event Listeners Navigasi
document.getElementById('next-btn').onclick = () => { currentQuestionIndex++; renderCurrentQuestion(); };
document.getElementById('prev-btn').onclick = () => { currentQuestionIndex--; renderCurrentQuestion(); };
document.getElementById('quiz-form').onsubmit = (e) => {
    e.preventDefault();
    calculateResults();
};

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
    document.getElementById('report-user-name-analysis').textContent = userName;
    
    const lvlName = questionsData[lvlNum-1].name;
    document.getElementById('level-result').innerHTML = `<h2 style="color:#007bff">Level Utama: ${lvlName}</h2>`;
    
    renderChart(avgs);
    renderTable(avgs, lvlNum);
    document.getElementById('download-cert-btn').onclick = () => generatePDF(lvlName);
}

// Fungsi Chart & Table tetap sama seperti sebelumnya...

function generatePDF(lvlName) {
    const wrapper = document.getElementById('certificate-wrapper');
    wrapper.style.display = 'block';
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    
    wrapper.innerHTML = `
        <div class="cert-canvas">
            <img src="logo-araya.png" style="width:180px;">
            <div class="cert-title">SERTIFIKAT ASESMEN</div>
            <p style="font-size:20px;">Diberikan kepada:</p>
            <div class="cert-name" style="font-size:36px; font-weight:bold; margin:30px 0;">${userName}</div>
            <p style="font-size:20px;">Atas pencapaian Kepemimpinan Level:</p>
            <div style="font-size:32px; font-weight:bold; color:#0056b3; margin:20px 0;">${lvlName}</div>
            <div class="cert-footer" style="margin-top:auto; width:100%; display:flex; justify-content:space-between; align-items:flex-end;">
                <div style="text-align:left;">
                    <p>Tuban, ${dateStr}</p>
                    <img src="ttd.png" style="width:130px; margin-bottom:-10px;">
                    <div style="border-top:1px solid #000; width:220px; padding-top:5px;"><b>Araya Consulting</b></div>
                </div>
                <img src="logo-araya-wm.png" style="width:100px; opacity:0.3;">
            </div>
        </div>
    `;

    const opt = { margin:0, filename:`Sertifikat_${userName}.pdf`, html2canvas:{scale:2}, jsPDF:{unit:'mm', format:'a4', orientation:'portrait'} };
    html2pdf().set(opt).from(wrapper).save().then(() => wrapper.style.display = 'none');
}

// Inisialisasi Legend
function renderScaleLegend() {
    document.getElementById('legend-container').innerHTML = `
        <div style="display:flex; justify-content:space-around; width:100%; background:#f8f9fa; padding:10px; border-radius:8px;">
            <span>1: Sngt Tdk Setuju</span><span>2: Tdk Setuju</span><span>3: Netral</span><span>4: Setuju</span><span>5: Sngt Setuju</span>
        </div>`;
}

document.addEventListener('DOMContentLoaded', renderScaleLegend);
