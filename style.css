const PASSWORD = '13820510';

let data = {
    title: 'ارائه برنامه‌نویسی',
    cells: [
        { type: 'text', content: 'این یک نمونه ارائه است.\n\nمی‌توانید از دکمه ویرایش برای تغییر محتوا استفاده کنید.' },
        { type: 'code', lang: 'python', content: 'def hello():\n    print("سلام دنیا")\n\nhello()' },
        { type: 'text', content: 'در بالا یک کد پایتون دیدید.' },
        { type: 'code', lang: 'javascript', content: 'function greet() {\n    console.log("Hello World!");\n}\n\ngreet();' }
    ]
};

function loadData() {
    const saved = localStorage.getItem('presentationData');
    if (saved) {
        data = JSON.parse(saved);
    }
}

function saveData() {
    localStorage.setItem('presentationData', JSON.stringify(data));
}

function renderView() {
    document.getElementById('titleView').textContent = data.title;
    
    let contentHTML = '';
    data.cells.forEach((cell, index) => {
        if (cell.type === 'text') {
            contentHTML += `<p>${escapeHtml(cell.content)}</p>`;
        } else if (cell.type === 'code') {
            contentHTML += `
                <div class="code-container">
                    <div class="code-label">${cell.lang.toUpperCase()}</div>
                    <pre><code class="language-${cell.lang}">${escapeHtml(cell.content)}</code></pre>
                </div>
            `;
        }
    });
    
    document.getElementById('contentView').innerHTML = contentHTML;
    hljs.highlightAll();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderEditMode() {
    document.getElementById('titleEdit').value = data.title;
    
    const container = document.getElementById('cellsContainer');
    container.innerHTML = '';
    
    data.cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        if (cell.type === 'code') cellDiv.classList.add('code-cell');
        
        cellDiv.innerHTML = `
            <div class="cell-header">
                <span class="cell-type">${cell.type === 'text' ? '📝 متن' : '💻 کد'}</span>
                <div class="cell-actions">
                    <button class="cell-btn move-up" onclick="moveCell(${index}, -1)" ${index === 0 ? 'disabled' : ''}>⬆</button>
                    <button class="cell-btn move-down" onclick="moveCell(${index}, 1)" ${index === data.cells.length - 1 ? 'disabled' : ''}>⬇</button>
                    <button class="cell-btn delete-cell" onclick="deleteCell(${index})">🗑</button>
                </div>
            </div>
            ${cell.type === 'code' ? `<input type="text" value="${cell.lang}" placeholder="زبان (python, js, ...)" onchange="updateCellLang(${index}, this.value)">` : ''}
            <textarea onchange="updateCellContent(${index}, this.value)">${cell.content}</textarea>
        `;
        
        container.appendChild(cellDiv);
    });
}

function addTextCell() {
    data.cells.push({ type: 'text', content: '' });
    renderEditMode();
}

function addCodeCell() {
    data.cells.push({ type: 'code', lang: 'python', content: '' });
    renderEditMode();
}

function updateCellContent(index, content) {
    data.cells[index].content = content;
}

function updateCellLang(index, lang) {
    data.cells[index].lang = lang;
}

function deleteCell(index) {
    if (confirm('آیا از حذف این سلول مطمئن هستید؟')) {
        data.cells.splice(index, 1);
        renderEditMode();
    }
}

function moveCell(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < data.cells.length) {
        [data.cells[index], data.cells[newIndex]] = [data.cells[newIndex], data.cells[index]];
        renderEditMode();
    }
}

function showEditMode() {
    const password = prompt('رمز عبور را وارد کنید:');
    if (password !== PASSWORD) {
        alert('رمز عبور اشتباه است!');
        return;
    }
    
    document.getElementById('viewMode').style.display = 'none';
    document.getElementById('editMode').style.display = 'block';
    document.getElementById('editBtn').style.display = 'none';
    
    renderEditMode();
}

function hideEditMode() {
    document.getElementById('viewMode').style.display = 'block';
    document.getElementById('editMode').style.display = 'none';
    document.getElementById('editBtn').style.display = 'block';
}

function saveChanges() {
    data.title = document.getElementById('titleEdit').value;
    saveData();
    renderView();
    hideEditMode();
    alert('تغییرات با موفقیت ذخیره شد!');
}

document.getElementById('editBtn').addEventListener('click', showEditMode);
document.getElementById('saveBtn').addEventListener('click', saveChanges);
document.getElementById('cancelBtn').addEventListener('click', hideEditMode);
document.getElementById('addTextBtn').addEventListener('click', addTextCell);
document.getElementById('addCodeBtn').addEventListener('click', addCodeBtn);

loadData();
renderView();
