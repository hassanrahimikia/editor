const PASSWORD = '13820510';

let data = {
    title: 'ارائه برنامه‌نویسی',
    cells: [
        { 
            type: 'text', 
            content: 'به ارائه برنامه‌نویسی خوش آمدید!\n\nاین یک سیستم ارائه قدرتمند با قابلیت نمایش متن و کد است.' 
        },
        { 
            type: 'code', 
            lang: 'python', 
            content: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))' 
        },
        { 
            type: 'text', 
            content: 'در بالا یک تابع بازگشتی فیبوناچی به زبان پایتون مشاهده می‌کنید.' 
        },
        { 
            type: 'code', 
            lang: 'javascript', 
            content: 'const greet = (name) => {\n    return `Hello, ${name}!`;\n};\n\nconsole.log(greet("World"));' 
        }
    ]
};

// بارگذاری داده‌ها از LocalStorage
function loadData() {
    const saved = localStorage.getItem('presentationData');
    if (saved) {
        try {
            data = JSON.parse(saved);
            console.log('✅ داده‌ها از LocalStorage بارگذاری شد:', data);
        } catch (e) {
            console.error('❌ خطا در بارگذاری داده‌ها:', e);
        }
    } else {
        console.log('ℹ️ داده‌ای در LocalStorage یافت نشد، از داده‌های پیش‌فرض استفاده می‌شود');
    }
}

// ذخیره‌سازی داده‌ها در LocalStorage
function saveData() {
    localStorage.setItem('presentationData', JSON.stringify(data));
    console.log('✅ داده‌ها در LocalStorage ذخیره شد:', data);
}

// تبدیل متن به HTML امن
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// رندر کردن حالت مشاهده
function renderView() {
    document.getElementById('titleView').textContent = data.title;
    
    let contentHTML = '';
    data.cells.forEach((cell) => {
        if (cell.type === 'text') {
            contentHTML += `<p>${escapeHtml(cell.content)}</p>`;
        } else if (cell.type === 'code') {
            contentHTML += `
                <div class="code-container">
                    <div class="code-label">${escapeHtml(cell.lang.toUpperCase())}</div>
                    <pre><code class="language-${escapeHtml(cell.lang)}">${escapeHtml(cell.content)}</code></pre>
                </div>
            `;
        }
    });
    
    document.getElementById('contentView').innerHTML = contentHTML;
    hljs.highlightAll();
}

// رندر کردن حالت ویرایش
function renderEditMode() {
    document.getElementById('titleEdit').value = data.title;
    
    const container = document.getElementById('cellsContainer');
    container.innerHTML = '';
    
    data.cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        if (cell.type === 'code') cellDiv.classList.add('code-cell');
        
        const langInput = cell.type === 'code' 
            ? `<input type="text" value="${escapeHtml(cell.lang)}" placeholder="زبان (python, javascript, ...)" onchange="updateCellLang(${index}, this.value)">` 
            : '';
        
        cellDiv.innerHTML = `
            <div class="cell-header">
                <span class="cell-type">${cell.type === 'text' ? '📝 متن' : '💻 کد'}</span>
                <div class="cell-actions">
                    <button class="cell-btn move-up" onclick="moveCell(${index}, -1)" ${index === 0 ? 'disabled' : ''}>⬆</button>
                    <button class="cell-btn move-down" onclick="moveCell(${index}, 1)" ${index === data.cells.length - 1 ? 'disabled' : ''}>⬇</button>
                    <button class="cell-btn delete-cell" onclick="deleteCell(${index})">🗑</button>
                </div>
            </div>
            ${langInput}
            <textarea onchange="updateCellContent(${index}, this.value)">${escapeHtml(cell.content)}</textarea>
        `;
        
        container.appendChild(cellDiv);
    });
}

// افزودن سلول متنی
function addTextCell() {
    data.cells.push({ type: 'text', content: 'متن جدید...' });
    renderEditMode();
}

// افزودن سلول کد
function addCodeCell() {
    data.cells.push({ type: 'code', lang: 'python', content: '# کد خود را اینجا بنویسید' });
    renderEditMode();
}

// به‌روزرسانی محتوای سلول
function updateCellContent(index, content) {
    data.cells[index].content = content;
}

// به‌روزرسانی زبان سلول کد
function updateCellLang(index, lang) {
    data.cells[index].lang = lang;
}

// حذف سلول
function deleteCell(index) {
    if (confirm('آیا از حذف این سلول مطمئن هستید؟')) {
        data.cells.splice(index, 1);
        renderEditMode();
    }
}

// جابجایی سلول
function moveCell(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < data.cells.length) {
        [data.cells[index], data.cells[newIndex]] = [data.cells[newIndex], data.cells[index]];
        renderEditMode();
    }
}

// نمایش حالت ویرایش
function showEditMode() {
    const password = prompt('🔒 رمز عبور را وارد کنید:');
    if (password !== PASSWORD) {
        alert('❌ رمز عبور اشتباه است!');
        return;
    }
    
    document.getElementById('viewMode').style.display = 'none';
    document.getElementById('editMode').style.display = 'block';
    
    renderEditMode();
}

// پنهان کردن حالت ویرایش
function hideEditMode() {
    document.getElementById('viewMode').style.display = 'block';
    document.getElementById('editMode').style.display = 'none';
    renderView();
}

// ذخیره تغییرات
function saveChanges() {
    data.title = document.getElementById('titleEdit').value;
    saveData();
    renderView();
    hideEditMode();
    alert('✅ تغییرات با موفقیت ذخیره شد!');
}

// Event Listeners
document.getElementById('editBtn').addEventListener('click', showEditMode);
document.getElementById('saveBtn').addEventListener('click', saveChanges);
document.getElementById('cancelBtn').addEventListener('click', hideEditMode);
document.getElementById('addTextBtn').addEventListener('click', addTextCell);
document.getElementById('addCodeBtn').addEventListener('click', addCodeCell);

// بارگذاری اولیه
loadData();
renderView();
