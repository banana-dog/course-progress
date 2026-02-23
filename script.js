let studentsData = null;

async function loadStudents() {
  try {
    const response = await fetch('data/students.json');
    const data = await response.json();
    studentsData = data.students;
    return studentsData;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return [];
  }
}

function renderStudentsList() {
  loadStudents().then(students => {
    const grid = document.getElementById('students-grid');
    grid.innerHTML = students.map(student => {
      const level = getLevel(student.xp);
      const progress = getProgressPercent(student.xp);
      return `
        <a href="student.html?id=${student.id}" class="student-card">
          <div class="avatar-large">${student.avatar}</div>
          <h2>${student.name}</h2>
          <div class="level-badge">${level.name}</div>
          <div class="xp-bar">
            <div class="xp-fill" style="width: ${progress}%"></div>
          </div>
          <div class="xp-text">${student.xp} XP</div>
        </a>
      `;
    }).join('');
  });
}

function renderStudentProfile(studentId) {
  loadStudents().then(students => {
    const student = students.find(s => s.id === studentId);
    if (!student) {
      document.getElementById('student-profile').innerHTML = '<p>Ученик не найден</p>';
      return;
    }

    const level = getLevel(student.xp);
    const nextLevel = getNextLevel(level);
    const xpToNext = getXpToNextLevel(student.xp);
    const progress = getProgressPercent(student.xp);

    const earnedLessonBadges = CONFIG.lessonBadges.filter(b => 
      student.completedLessons.includes(b.lesson)
    );
    
    const availableSpecialBadges = CONFIG.specialBadges.map(b => ({
      ...b,
      earned: student.specialBadges?.includes(b.id)
    }));

    const profile = document.getElementById('student-profile');
    profile.innerHTML = `
      <div class="profile-header">
        <div class="avatar-huge">${student.avatar}</div>
        <h1>${student.name}</h1>
        <div class="level-title">Уровень ${level.level} - ${level.name}</div>
      </div>
      
      <div class="xp-section">
        <div class="xp-info">
          <span class="xp-current">${student.xp} XP</span>
          ${nextLevel ? `<span class="xp-needed">${xpToNext} XP до ${nextLevel.name}</span>` : '<span class="xp-max">Максимальный уровень!</span>'}
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <section class="badges-section">
        <h2>🏅 Бейджи за уроки</h2>
        <div class="badges-grid">
          ${CONFIG.lessonBadges.map(badge => {
            const earned = student.completedLessons.includes(badge.lesson);
            return `
              <div class="badge ${earned ? 'earned' : 'locked'}" title="${badge.desc}">
                <span class="badge-icon">${badge.badge}</span>
                <span class="badge-name">${badge.name}</span>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="badges-section">
        <h2>⭐ Специальные бейджи</h2>
        <div class="badges-grid">
          ${availableSpecialBadges.map(badge => `
            <div class="badge ${badge.earned ? 'earned' : 'locked'}" title="${badge.desc}">
              <span class="badge-icon">${badge.id}</span>
              <span class="badge-name">${badge.name}</span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  });
}
