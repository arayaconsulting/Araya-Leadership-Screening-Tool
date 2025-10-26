// A. DATA PERTANYAAN LENGKAP (REVISI PERILAKU LEVEL 4 & 5)
const questionsData = [
    { level: 1, name: "Position (Jabatan)", group: "L1", 
      description: "Pada level ini, pengaruh Anda berasal dari posisi formal Anda. Orang-orang mengikuti karena mereka HARUS.", 
      questions: [
        "1. Saya mengandalkan otoritas jabatan saya untuk memastikan anggota tim mengikuti arahan.",
        "2. Anggota tim saya cenderung menunggu perintah sebelum memulai pekerjaan baru.",
        "3. Saya percaya hak istimewa kepemimpinan datang secara otomatis dengan posisi.",
        "4. Anggota tim hanya bekerja sesuai deskripsi pekerjaan minimal mereka.",
        "5. Orang-orang mengikuti saya karena mereka harus, bukan karena mereka ingin."
    ]},
    { level: 2, name: "Permission (Izin)", group: "L2", 
      description: "Kepemimpinan dibangun di atas hubungan dan kepercayaan. Orang-orang mengikuti Anda karena mereka INGIN.", 
      questions: [
        "6. Saya meluangkan waktu untuk mengenal anggota tim saya secara pribadi, di luar pekerjaan.",
        "7. Saya membangun kepercayaan dengan tim saya melalui komunikasi yang terbuka dan jujur.",
        "8. Saya secara aktif mendengarkan dan menghargai masukan tim, bahkan jika berbeda dengan pandangan saya.",
        "9. Saya berfokus untuk menciptakan lingkungan kerja yang positif dan kolaboratif.",
        "10. Anggota tim saya bersedia memberikan usaha ekstra untuk saya karena hubungan pribadi kami."
    ]},
    { level: 3, name: "Production (Produksi)", group: "L3", 
      description: "Anda mendapatkan kredibilitas dengan menghasilkan hasil. Orang-orang mengikuti Anda karena apa yang telah Anda lakukan untuk organisasi.", 
      questions: [
        "11. Saya secara konsisten memimpin tim saya untuk mencapai target dan hasil yang nyata.",
        "12. Saya bertanggung jawab penuh atas hasil, baik keberhasilan maupun kegagalan.",
        "13. Tim saya memiliki momentum yang kuat dan termotivasi oleh kesuksesan yang kami raih.",
        "14. Saya menetapkan standar kinerja yang tinggi dan memberikan contoh yang baik.",
        "15. Kredibilitas saya di organisasi didasarkan pada pencapaian, bukan hanya posisi saya."
    ]},
    { level: 4, name: "People Development (Pengembangan Orang)", group: "L4", 
      description: "Fokus Anda beralih dari memimpin orang ke mengembangkan orang. Orang mengikuti Anda karena apa yang telah Anda lakukan UNTUK mereka.", 
      questions: [
        "16. Saya secara rutin menyediakan waktu untuk melatih dan membimbing anggota tim agar bisa menggantikan peran saya.",
        "17. Anggota tim yang saya bimbing sering kali berhasil dipromosikan atau memimpin unit/proyek baru.",
        "18. Saya berinvestasi dalam pengembangan orang bahkan jika itu berarti mereka akan pindah ke posisi yang lebih baik di luar tim saya.",
        "19. Saya mendelegasikan tanggung jawab yang signifikan kepada anggota tim agar mereka tumbuh dan mengambil inisiatif kepemimpinan.",
        "20. Saya aktif merekrut individu yang memiliki potensi besar, bukan hanya yang dapat memenuhi tugas saat ini."
    ]},
    { level: 5, name: "Pinnacle (Puncak)", group: "L5", 
      description: "Pengaruh Anda sangat luas dan dalam, melampaui tim atau organisasi Anda. Orang-orang mengikuti Anda karena siapa diri Anda dan warisan yang Anda ciptakan.", 
      questions: [
        "21. Pemimpin di luar tim/departemen saya sering mencari nasihat atau panduan strategis dari saya.",
        "22. Kehadiran dan reputasi saya secara konsisten meningkatkan semangat dan kinerja seluruh organisasi.",
        "23. Keputusan dan tindakan saya selalu didasarkan pada prinsip yang diyakini oleh sebagian besar karyawan/stakeholder.",
        "24. Saya telah menciptakan budaya atau sistem kepemimpinan yang akan tetap efektif setelah saya tidak lagi menjabat.",
        "25. Saya dikenal luas di industri atau perusahaan sebagai panutan yang inspiratif dan memiliki integritas tinggi."
    ]}
];

let currentQuestionIndex = 0;
const totalQuestions = 25;
const allQuestionsFlat = [];
const userAnswers = {}; 
let myChart; 

// Fungsi untuk meratakan array pertanyaan
function initializeQuestions() {
    let globalIndex = 0;
    questionsData.forEach(levelData => {
        levelData.questions.forEach(questionText => {
            globalIndex++;
            const questionId = `Q${globalIndex}`; // ID unik untuk menyimpan jawaban
            allQuestionsFlat.push({
                index: globalIndex,
                id: questionId, 
                text: questionText,
                levelGroup: levelData.group,
                levelName: levelData.name,
                levelDesc: levelData.description
            });
            // Inisialisasi jawaban ke 0 (belum dijawab)
            userAnswers[questionId] = 0;
        });
    });
}

// B. FUNGSI UNTUK MERENDER KETERANGAN SKALA PENUH
function renderScaleLegend() {
    const legendContainer = document.getElementById('legend-container');
    legendContainer.innerHTML = `
        <div class="legend-item"><strong>1:</strong> Sangat Tidak Setuju / Tidak Pernah</div>
        <div class="legend-item"><strong>2:</strong> Tidak Setuju / Jarang</div>
        <div class="legend-item"><strong>3:</strong> Netral / Kadang-kadang</div>
        <div class="legend-item"><strong>4:</strong> Setuju / Sering</div>
        <div class="legend-item"><strong>5:</strong> Sangat Setuju / Selalu</div>
    `;
}

// C. FUNGSI UNTUK MERENDER PERTANYAAN SAAT INI (Integrity Test Mode)
function renderCurrentQuestion() {
    const container = document.getElementById('questions-container');
    const question = allQuestionsFlat[currentQuestionIndex];
    const questionId = question.id;
    const currentScore = userAnswers[questionId];
    
    let html = `
        <div class="question-group">
            <h3>Pertanyaan ${question.index} dari ${totalQuestions}:</h3>
        </div>

        <div class="question-item">
            <p><strong>${question.text}</strong></p>
            <div class="scale-options">`;
    
    for (let i = 1; i <= 5; i++) {
        const isChecked = (currentScore === i) ? 'checked' : '';
        html += `<input type="radio" id="${questionId}_${i}" name="${questionId}" value="${i}" ${isChecked} required>
                 <label for="${questionId}_${i}">${i}</label>`;
    }
    html += `   </div>
            </div>`;

    container.innerHTML = html;
    
    const radioInputs = container.querySelectorAll(`input[name="${questionId}"]`);
    radioInputs.forEach(input => {
        input.addEventListener('change', enableNextButton);
    });

    updateNavigationButtons();
}

// D. FUNGSI UNTUK MENGAKTIFKAN TOMBOL NEXT
function enableNextButton() {
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const question = allQuestionsFlat[currentQuestionIndex];
    const form = document.getElementById('quiz-form');
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    
    if (checked) {
        userAnswers[question.id] = parseInt(checked.value);
        
        if (currentQuestionIndex < totalQuestions - 1) {
             nextBtn.removeAttribute('disabled');
        } else {
             submitBtn.removeAttribute('disabled');
        }
    }
}


// E. FUNGSI UNTUK MEMPERBARUI TOMBOL NAVIGASI
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (currentQuestionIndex > 0) {
        prevBtn.classList.remove('hidden');
    } else {
        prevBtn.classList.add('hidden');
    }

    if (currentQuestionIndex < totalQuestions - 1) {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
        nextBtn.disabled = userAnswers[allQuestionsFlat[currentQuestionIndex].id] === 0; 
    } else {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
        submitBtn.disabled = userAnswers[allQuestionsFlat[currentQuestionIndex].id] === 0; 
    }
}

// F. FUNGSI UNTUK PINDAH KE PERTANYAAN BERIKUTNYA
function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        renderCurrentQuestion();
    }
}

// G. FUNGSI UNTUK KEMBALI KE PERTANYAAN SEBELUMNYA
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderCurrentQuestion();
    }
}


// H. LOGIKA PENILAIAN
function calculateResults(event) {
    event.preventDefault(); 
    
    // Simpan jawaban Q25
    const question = allQuestionsFlat[currentQuestionIndex];
    const form = document.getElementById('quiz-form');
    const checked = form.querySelector(`input[name="${question.id}"]:checked`);
    
    if (checked) {
        userAnswers[question.id] = parseInt(checked.value);
    } else {
        alert("Harap pilih jawaban untuk Pertanyaan 25 sebelum melihat hasil!");
        return;
    }

    const levelScores = { L1: 0, L2: 0, L3: 0, L4: 0, L5: 0 };
    const levelCounts = { L1: 0, L2: 0, L3: 0, L4: 0, L5: 0 };
    let totalAnswered = 0;

    // 1. Kumpulkan Skor dan Hitung Total per Level dari userAnswers
    allQuestionsFlat.forEach(q => {
        const score = userAnswers[q.id];
        if (score > 0) {
            levelScores[q.levelGroup] += score;
            levelCounts[q.levelGroup]++;
            totalAnswered++;
        }
    });

    if (totalAnswered < totalQuestions) {
        alert("Terjadi kesalahan internal. Pastikan semua 25 pertanyaan sudah dijawab sebelum melihat hasil!");
        return;
    }

    // 2. Hitung Rata-rata Skor per Level
    const finalScores = {};
    for (const group in levelScores) {
        finalScores[group] = (levelScores[group] / levelCounts[group]).toFixed(1);
    }

    // 3. Tentukan Level Utama (Ambang Batas >= 4.0)
    let mainLevel = 1; 
    let mainLevelName = "Position (Jabatan)";
    const AMBANG_BATAS = 4.0;
    const scoresArray = Object.values(finalScores).map(Number); 

    for (let i = 4; i >= 0; i--) { 
        if (scoresArray[i] >= AMBANG_BATAS) {
            mainLevel = i + 1;
            mainLevelName = questionsData[i].name;
            break;
        }
    }

    // 4. Tampilkan Hasil
    displayResults(mainLevel, mainLevelName, finalScores);
}

// I. FUNGSI UNTUK MENYIAPKAN TEKS REKOMENDASI (Sama)
function getReportContent(level) {
    let explanation = "";
    let recommendation = "";

    switch (level) {
        case 1:
            explanation = "Anda memimpin berdasarkan otoritas formal dan peraturan. Orang-orang mengikuti Anda karena mereka HARUS. Ini adalah tempat yang baik untuk memulai, tetapi bukan tempat yang baik untuk berlama-lama.";
            recommendation = "<strong>Fokus ke Level 2: Bangun Hubungan.</strong> Segera hentikan mengandalkan jabatan. Kenali anggota tim Anda secara pribadi, dengarkan masalah mereka, dan tunjukkan kepedulian yang tulus. Mulailah memimpin dengan hati, bukan hanya dengan aturan.";
            break;
        case 2:
            explanation = "Anda memimpin melalui hubungan dan kepercayaan. Orang-orang mengikuti Anda karena mereka INGIN. Anda telah menciptakan lingkungan kerja yang positif. Kekuatan Anda terletak pada kolaborasi dan kepedulian.";
            recommendation = "<strong>Fokus ke Level 3: Hasilkan Hasil.</strong> Setelah hubungan kuat, pindahkan fokus ke pencapaian. Tetapkan tujuan yang jelas, pimpin dengan memberi contoh dalam kerja keras, dan dorong tim untuk meraih kemenangan kecil secara konsisten untuk membangun momentum dan kredibilitas.";
            break;
        case 3:
            explanation = "Anda memimpin melalui hasil nyata dan momentum. Orang-orang mengikuti Anda karena apa yang telah Anda lakukan untuk organisasi. Kredibilitas Anda didasarkan pada prestasi, bukan sekadar jabatan.";
            recommendation = "<strong>Fokus ke Level 4: Kembangkan Orang.</strong> Alihkan fokus dari hanya memproduksi hasil menjadi memproduksi pemimpin. Identifikasi calon pemimpin, latih mereka secara pribadi, delegasikan wewenang proyek besar, dan bantu mereka mencapai kesuksesan yang pada akhirnya akan menjadi milik mereka.";
            break;
        case 4:
            explanation = "Anda memimpin dengan menduplikasi diri Anda. Orang-orang mengikuti Anda karena apa yang telah Anda lakukan untuk mereka secara individu. Anda mengembangkan pemimpin Level 3 di bawah Anda. Ini adalah level yang menjamin pertumbuhan berkelanjutan.";
            recommendation = "<strong>Fokus ke Level 5: Ciptakan Warisan.</strong> Gunakan pengaruh Anda yang luas untuk membantu orang lain di luar tim Anda. Kembangkan pemimpin Level 4 di bawah Anda. Fokus pada integritas, dan rancang strategi serta sistem yang akan memungkinkan organisasi berhasil jauh setelah Anda tidak lagi memegang peran tersebut.";
            break;
        case 5:
            explanation = "Anda memimpin karena jati diri Anda dan nilai-nilai yang Anda perjuangkan. Pengaruh Anda melampaui organisasi, dan Anda fokus meninggalkan warisan kepemimpinan. Kepemimpinan Anda kini menjadi inspirasi bagi banyak orang.";
            recommendation = "<strong>Pertahankan dan Gandakan Pengaruh Anda.</strong> Tugas Anda adalah menggunakan pengaruh ini untuk melakukan hal-hal besar, dan terus mereplikasi Level 4 di berbagai bidang. Konsistenlah dengan nilai-nilai Anda. Selamat, Anda adalah pemimpin Puncak!";
            break;
    }
    return { explanation, recommendation };
}

function displayResults(level, levelName, finalScores) {
    const resultDiv = document.getElementById('results');
    const levelResultDiv = document.getElementById('level-result');
    const recommendationDiv = document.getElementById('recommendation');
    const formDiv = document.getElementById('quiz-form');

    const report = getReportContent(level);

    levelResultDiv.innerHTML = `Level ${level}: ${levelName}`;
    recommendationDiv.innerHTML = `<h3>Penjelasan Level Utama:</h3><p>${report.explanation}</p>
                                 <h3>Rekomendasi Tindakan:</h3><p>${report.recommendation}</p>`;
    
    renderScoreTable(finalScores);
    renderChart(finalScores);
    interpretStrengthsWeaknesses(finalScores, level);

    formDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
}

function renderScoreTable(finalScores) {
    const tableBody = document.querySelector('#score-table tbody');
    tableBody.innerHTML = ''; 

    questionsData.forEach(data => {
        const score = finalScores[data.group];
        const row = tableBody.insertRow();
        row.insertCell().textContent = `Level ${data.level}`;
        row.insertCell().textContent = data.name;
        
        const scoreCell = row.insertCell();
        scoreCell.textContent = score;
        
        if (parseFloat(score) >= 4.0) {
            scoreCell.style.fontWeight = 'bold';
            scoreCell.style.color = '#007bff';
        }
    });
}

function renderChart(finalScores) {
    const ctx = document.getElementById('scoreChart').getContext('2d');

    if (myChart) {
        myChart.destroy();
    }

    const labels = questionsData.map(d => `L${d.level}: ${d.name.split(' ')[0]}`);
    const data = questionsData.map(d => finalScores[d.group]);

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Skor Rata-rata',
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                borderColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Skor Rata-rata (1-5)'
                    }
                }
            },
            plugins: {
              legend: {
                  display: false
              }
            }
        }
    });
}

// J. FUNGSI UNTUK INTERPRETASI KEKUATAN DAN KELEMAHAN (Perbaikan Logika Maxwell)
function interpretStrengthsWeaknesses(finalScores, mainLevel) {
    let strengths = [];
    let weaknesses = [];
    
    for (const group in finalScores) {
        const score = parseFloat(finalScores[group]);
        const levelData = questionsData.find(d => d.group === group);

        if (score >= 4.2) { 
            strengths.push(`Level ${levelData.level}: ${levelData.name} (Skor: ${score})`);
        } 
        
        // LOGIKA PERBAIKAN: Abaikan Level 1 & 2 sebagai kelemahan jika pemimpin sudah di Level 3 ke atas.
        if (score < 3.0) { 
            if (mainLevel >= 3 && (levelData.level === 1 || levelData.level === 2)) {
                // Abaikan L1 & L2 karena skor rendah berarti mereka tidak mengandalkannya (Tanda baik)
                continue; 
            }
            weaknesses.push(`Level ${levelData.level}: ${levelData.name} (Skor: ${score})`);
        }
    }

    const strengthsDisplay = document.getElementById('strengths-display');
    const weaknessesDisplay = document.getElementById('weaknesses-display');
    
    if (strengths.length > 0) {
        strengthsDisplay.innerHTML = `<strong>Kekuatan Anda Terletak Pada:</strong><br><ul style="margin-top:5px; padding-left:20px;"><li>` + strengths.join('</li><li>') + '</li></ul>';
    } else {
        weaknesses.push('Level 3: Production (Skor: ' + finalScores.L3 + ')'); // Tambahkan L3 jika tidak ada strength dan L3 lemah
        strengthsDisplay.innerHTML = '<strong>Kekuatan Anda:</strong> Anda berada pada jalur pertumbuhan. Belum ada level yang menonjol kuat (Skor di bawah 4.2), yang berarti ada peluang peningkatan di semua bidang.';
    }

    if (weaknesses.length > 0) {
        weaknessesDisplay.innerHTML = `<strong>Area yang Perlu Dikembangkan (Kelemahan Dasar):</strong><br><ul style="margin-top:5px; padding-left:20px; color: #dc3545;"><li>` + weaknesses.join('</li><li>') + '</li></ul>';
    } else {
        weaknessesDisplay.innerHTML = '<strong>Area Pengembangan:</strong> Dasar kepemimpinan Anda sangat kuat. Fokus pada upaya untuk mempertahankan dan menggandakan pengaruh.';
    }
}


// INISIALISASI
document.addEventListener('DOMContentLoaded', () => {
    initializeQuestions();
    renderScaleLegend();
    renderCurrentQuestion();
    
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('quiz-form').addEventListener('submit', calculateResults);
});
