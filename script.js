const PASSWORD = '13820510';

const data = {
    title: 'ارائه برنامه‌نویسی',
    text: `این یک نمونه ارائه است که شامل متن و کد می‌باشد.

می‌توانید از دکمه ویرایش برای تغییر محتوا استفاده کنید.

رمز عبور: 13820510`,
    codes: [
        { lang: 'python', code: 'def hello():\n    print("سلام دنیا")\n\nhello()' },
        { lang: 'javascript', code: 'function greet() {\n    console.log("Hello World!");\n}\n\ngreet();' }
    ]
};

function loadData() {
    const saved = localStorage.getItem('presentationData');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(data, parsed);
    }
}

function saveData() {
    localStorage.setItem('presentationData', JSON.stringify(data));
}

function renderView() {
    document.getElementById('titleView').textContent = data.title;
    
    let contentHTML = '';
    const paragraphs = data.text.split('\n\n');
    paragraphs.forEach(p => {
        if (p.trim()) {
            contentHTML += `<p>${p}</p>`;
        }
    });
    
    data.codes.forEach(item => {
        contentHTML += `
            <div class="code-container">
                <div class="code-label">${item.lang.toUpperCase()}</div>
                <pre><code class="language-${item.lang}">${escapeHtml(item.code)}</code></pre>
            </div>
        `;
    });
    
    document.getElementById('contentView').innerHTML = contentHTML;
    hljs.highlightAll();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
    
    document.getElementById('titleEdit').value = data.title;
    document.getElementById('textEdit').value = data.text;
    
    const codesText = data.codes.map(c => `${c.lang}|${c.code}`).join('\n---\n');
    document.getElementById('codeEdit').value = codesText;
}

function hideEditMode() {
    document.getElementById('viewMode').style.display = 'block';
    document.getElementById('editMode').style.display = 'none';
    document.getElementById('editBtn').style.display = 'block';
}

function saveChanges() {
    data.title = document.getElementById('titleEdit').value;
    data.text = document.getElementById('textEdit').value;
    
    const codesText = document.getElementById('codeEdit').value;
    const codeBlocks = codesText.split('---').map(b => b.trim()).filter(b => b);
    
    data.codes = codeBlocks.map(block => {
        const [lang, ...codeParts] = block.split('|');
        return {
            lang: lang.trim(),
            code: codeParts.join('|').trim()
        };
    });
    
    saveData();
    renderView();
    hideEditMode();
    alert('تغییرات با موفقیت ذخیره شد!');
}

document.getElementById('editBtn').addEventListener('click', showEditMode);
document.getElementById('saveBtn').addEventListener('click', saveChanges);
document.getElementById('cancelBtn').addEventListener('click', hideEditMode);

loadData();
renderView();
