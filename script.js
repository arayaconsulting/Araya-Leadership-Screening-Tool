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

let userName = "Anda";
let currentQuestionIndex = 0;
const allQuestionsFlat = [];
const userAnswers = {};
let myChart;

function initializeQuestions() {
    let globalIndex = 0;
    questionsData.forEach(levelData => {
        levelData.questions.forEach(qText => {
            globalIndex++;
            allQuestionsFlat.push({ index: globalIndex, id: `Q${globalIndex}`, text: qText, levelGroup: levelData.group });
            userAnswers[`Q${globalIndex}`] = 0;
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
    renderScaleLegend();
    renderCurrentQuestion();
}

function renderScaleLegend() {
    document.getElementById('legend-container').innerHTML = `
        <div class="legend-item"><strong>1:</strong> Sngt Tidak Setuju</div>
        <div class="legend-item"><strong>2:</strong> Tidak Setuju</div>
        <div class="legend-item"><strong>3:</strong> Netral</div>
        <div class="legend-item"><strong>4:</strong> Setuju</div>
        <div class="legend-item"><strong>5:</strong> Sangat Setuju</div>
    `;
}

function renderCurrentQuestion() {
    const container = document.getElementById('questions-container');
    const q = allQuestionsFlat[currentQuestionIndex];
    container.innerHTML = `
        <div class="question-group"><h3>Pertanyaan ${q.index} dari 25:</h3></div>
        <div class="question-item">
            <p><strong>${q.text}</strong></p>
            <div class="scale-options" style="display:flex; justify-content:space-around; margin-top:15px;">
                ${[1,2,3,4,5].map(i => `
                    <label style="cursor:pointer; padding:5px 10px; border:1px solid #ddd; border-radius:50%;">
                        <input type="radio" name="${q.id}" value="${i}" ${userAnswers[q.id]==i?'checked':''} onchange="saveAnswer('${q.id}', ${i})"> ${i}
                    </label>
                `).join('')}
            </div>
        </div>`;
    updateNavigation();
}

function saveAnswer(id, val) {
    userAnswers[id] = val;
}

function updateNavigation() {
    document.getElementById('prev-btn').classList.toggle('hidden', currentQuestionIndex === 0);
    const isLast = currentQuestionIndex === 24;
    document.getElementById('next-btn').classList.toggle('hidden', isLast);
    document.getElementById('submit-btn').classList.toggle('hidden', !isLast);
    document.getElementById('next-btn').disabled = userAnswers[allQuestionsFlat[currentQuestionIndex].id] === 0;
}

document.getElementById('next-btn').onclick = () => { currentQuestionIndex++; renderCurrentQuestion(); };
document.getElementById('prev-btn').onclick = () => { currentQuestionIndex--; renderCurrentQuestion(); };

document.getElementById('quiz-form').onsubmit = (e) => {
    e.preventDefault();
    const avgs = {};
    questionsData.forEach(lvl => {
        const sum = allQuestionsFlat.filter(q => q.levelGroup === lvl.group).reduce((acc, q) => acc + userAnswers[q.id], 0);
        avgs[lvl.group] = (sum / 5).toFixed(1);
    });
    
    let mainLvlNum = 1;
    for(let i=5; i>=1; i--) { if(parseFloat(avgs[`L${i}`]) >= 4.0) { mainLvlNum = i; break; } }
    displayResults(mainLvlNum, avgs);
};

function getReportContent(level) {
    let explanation = "";
    let recommendation = "";
    switch (level) {
        case 1:
            explanation = "Anda memimpin berdasarkan otoritas formal. Orang mengikuti karena mereka HARUS.";
            recommendation = "Fokus ke Level 2: Mulailah mengenal tim secara pribadi dan bangun kepercayaan.";
            break;
        case 2:
            explanation = "Anda memimpin melalui hubungan. Orang mengikuti karena mereka INGIN.";
            recommendation = "Fokus ke Level 3: Mulailah fokus pada hasil nyata dan pencapaian target tim.";
            break;
        case 3:
            explanation = "Anda memimpin melalui hasil. Orang mengikuti karena prestasi Anda bagi organisasi.";
            recommendation = "Fokus ke Level 4: Mulailah mendelegasikan dan melatih orang lain untuk menjadi pemimpin.";
            break;
        case 4:
            explanation = "Anda memimpin melalui reproduksi pemimpin. Orang mengikuti karena apa yang Anda lakukan bagi mereka.";
            recommendation = "Fokus ke Level 5: Teruslah menciptakan pemimpin Level 4 untuk membangun warisan kepemimpinan.";
            break;
        case 5:
            explanation = "Anda memimpin karena jati diri Anda. Pengaruh Anda melampaui posisi formal.";
            recommendation = "Pertahankan integritas dan gunakan pengaruh Anda untuk menciptakan dampak yang lebih luas.";
            break;
    }
    return { explanation, recommendation };
}

function displayResults(lvlNum, avgs) {
    document.getElementById('quiz-content').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('report-user-name-header').textContent = userName;
    document.getElementById('report-user-name-analysis').textContent = userName;
    
    const lvlName = questionsData[lvlNum-1].name;
    const report = getReportContent(lvlNum);

    document.getElementById('level-result').innerHTML = `<h2 style="color:#007bff">Level Utama: ${lvlName}</h2>`;
    document.getElementById('recommendation').innerHTML = `
        <div style="text-align:left; margin-top:20px;">
            <p><strong>Penjelasan Level Utama:</strong> ${report.explanation}</p>
            <p><strong>Rekomendasi Tindakan:</strong> ${report.recommendation}</p>
        </div>`;
    
    let weakList = [];
    Object.keys(avgs).forEach((key, idx) => {
        if(parseFloat(avgs[key]) < 3.0) {
            if(lvlNum >= 3 && (idx === 0 || idx === 1)) return;
            weakList.push(`${questionsData[idx].name} (${avgs[key]})`);
        }
    });

    document.getElementById('weaknesses-display').innerHTML = weakList.length > 0 ? 
        `<b>Area Pengembangan:</b> <ul><li>${weakList.join('</li><li>')}</li></ul>` : 
        "<b>Area Pengembangan:</b> Fondasi kepemimpinan Anda sudah kokoh.";
    
    renderChart(avgs);
    renderTable(avgs);
    document.getElementById('download-cert-btn').onclick = () => generatePDF(lvlName);
}

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

function generatePDF(lvlName) {
    const wrapper = document.getElementById('certificate-wrapper');
    wrapper.style.display = 'block';
    const dateStr = new Date().toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    
    wrapper.innerHTML = `
        <div class="cert-canvas">
            <img src="logo-araya.png" style="width:180px;">
            <div class="cert-title">SERTIFIKAT ASESMEN</div>
            <p style="font-size:18px;">Diberikan secara bangga kepada:</p>
            <div class="cert-name">${userName}</div>
            <p style="font-size:18px;">Atas pencapaian kompetensi kepemimpinan pada level:</p>
            <div style="font-size:32px; font-weight:bold; color:#0056b3; margin:20px 0;">${lvlName}</div>
            <div class="cert-footer">
                <div style="text-align:left;">
                    <p>Tuban, ${dateStr}</p>
                    <img src="ttd.png" style="width:130px; margin-bottom:-20px;">
                    <div style="border-top:1px solid #000; width:220px; padding-top:5px;"><b>Araya Consulting</b></div>
                </div>
                <img src="logo-araya-wm.png" style="width:90px; opacity:0.4;">
            </div>
        </div>
    `;

    const options = { 
        margin: 0, 
        filename: `Leadership_Cert_${userName}.pdf`, 
        html2canvas: { scale: 2 }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };

    html2pdf().set(options).from(wrapper).save().then(() => {
        wrapper.style.display = 'none';
    }).catch(err => {
        alert("Gagal mengunduh sertifikat. Pastikan file ttd.png sudah diunggah.");
    });
}
